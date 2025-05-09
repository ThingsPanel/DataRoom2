<template>
  <div class="basic-component-fabric-line" 
      @keydown.alt="toggleTemporaryMode(true, $event)" 
      @keyup.alt="toggleTemporaryMode(false, $event)"
      @keydown.ctrl="toggleTemporaryMode(true, $event)" 
      @keyup.ctrl="toggleTemporaryMode(false, $event)"
      @mousedown="handleContainerMouseDown">
    <div class="canvas-container">
      <canvas ref="fabricCanvas"></canvas>
    </div>
    <div class="tooltip" v-if="selected && !isPreview">
      <div v-if="isAltKeyDown">
        <b>删除模式(Alt)：</b> 点击点或点附近区域可删除点
      </div>
      <div v-else-if="isAddMode">
        <b>添加模式：</b> 【点击空白】添加点 | 【点击线条】在线上添加点
      </div>
      <div v-else>
        <b>编辑模式(Ctrl)：</b> 【拖动】移动点
      </div>
      <div>【Ctrl键】切换编辑模式 | 【Alt键】切换删除模式</div>
    </div>
  </div>
</template>

<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { mapState, mapMutations } from 'vuex'
// 直接导入fabric.js
import * as fabricModule from 'fabric'
// 导入模块化的工具类
import {
  FabricUtils,
  EventHandlers,
  PointHelpers, 
  CanvasManager,
  LinePointManager,
  StateManager
} from './utils'

const fabric = fabricModule.fabric || fabricModule

export default {
  name: 'BasicComponentFabricLine',
  mixins: [commonMixins],
  props: {
    config: {
      type: Object,
      default: () => ({
        customize: {
          lineWidth: 2,
          lineColor: '#409EFF',
          pointRadius: 5,
          pointColor: '#FF4500',
          addingMode: true,
          points: []
        }
      })
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      canvas: null,
      lines: [],
      lastPoint: null,
      isAddMode: true, // 默认为添加模式
      pointObjects: [], // 存储点对象的引用
      isAltKeyDown: false, // 默认Alt键未按下
      animationInterval: null // 动画定时器
    };
  },
  computed: {
    isPreview() {
      return (this.$route.path === window?.BS_CONFIG?.routers?.previewUrl) || (this.$route.path === '/big-screen/preview');
    },
    canvasWidth() {
      return this.config.w || 300;
    },
    canvasHeight() {
      return this.config.h || 200;
    }
  },
  watch: {
    canvasWidth() {
      this.resizeCanvas();
    },
    canvasHeight() {
      this.resizeCanvas();
    },
    'config.customize.points': {
      handler(newPoints) {
        if (this.canvas && newPoints) {
          console.log('检测到points数据变化，重新加载', newPoints);
          this.loadFromConfig();
        }
      },
      deep: true
    },
    selected(val) {
      if (val) {
        // 设置为添加点模式
        this.isAddMode = true;
        this.updateObjectsSelectability();

        // 添加键盘事件
        this.$el.focus();
        this.$el.tabIndex = 0;
      }
    },
    // 监听动画配置变化
    'config.customize.animationEnabled': {
      handler(newVal) {
        if (newVal) {
          this.startAnimation();
        } else {
          this.stopAnimation();
        }
      },
      immediate: true
    },
    'config.customize.animationSpeed': function() {
      if (this.config.customize.animationEnabled) {
        // 重启动画以应用新速度
        this.restartAnimation();
      }
    },
    'config.customize.animationType': function() {
      if (this.config.customize.animationEnabled) {
        // 重启动画以应用新类型
        this.restartAnimation();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log('组件已挂载，初始模式:', this.isAddMode, 'Alt键状态:', this.isAltKeyDown);
      this.initDefaults();
      this.initCanvas();
      window.addEventListener('resize', this.resizeCanvas);
      
      // 添加键盘事件
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
      
      // 设置元素可获取焦点
      this.$el.tabIndex = 0;
      
      // 监听窗口焦点变化，确保按键状态正确
      window.addEventListener('blur', this.resetKeyStates);
      
      // 如果启用了动画，开始动画循环
      if (this.config.customize.animationEnabled) {
        this.startAnimation();
      }
    });
  },
  beforeDestroy() {
    // 移除窗口大小改变监听
    if (window) {
      window.removeEventListener('resize', this.resizeCanvas);
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('keyup', this.handleKeyUp);
      window.removeEventListener('blur', this.resetKeyStates);
    }
    
    // 停止动画
    this.stopAnimation();
    
    // 安全地清理canvas资源
    FabricUtils.disposeCanvas(this.canvas);
    
    // 清空其他资源
    this.lines = [];
    this.lastPoint = null;
    this.pointObjects = [];
  },
  methods: {
    ...mapMutations('bigScreen', [
      'changeChartConfig',
      'changeActiveItemConfig'
    ]),
    
    // 处理容器鼠标按下事件
    handleContainerMouseDown(e) {
      EventHandlers.handleContainerMouseDown(e, this);
    },
    
    // 临时切换模式
    toggleTemporaryMode(keyDown, event) {
      EventHandlers.toggleTemporaryMode(keyDown, event, this);
    },
    
    // 处理键盘删除
    handleKeyDown(e) {
      EventHandlers.handleKeyDown(e, this);
    },
    
    // 处理键盘按键抬起
    handleKeyUp(e) {
      EventHandlers.handleKeyUp(e, this);
    },
    
    // 重置所有键盘状态
    resetKeyStates() {
      EventHandlers.resetKeyStates(this);
    },
    
    // 更新对象的可选择性
    updateObjectsSelectability() {
      PointHelpers.updateObjectsSelectability(this.canvas, this.pointObjects, this.isAddMode);
    },
    
    // 删除选中对象
    deleteSelectedObject(obj) {
      LinePointManager.deleteSelectedObject(this.canvas, obj, this.deletePoint.bind(this), this.saveState.bind(this));
    },
    
    // 删除点及相连的线
    deletePoint(point) {
      const result = LinePointManager.deletePoint(this.canvas, point, this.config.customize.points, this.pointObjects);
      
      if (result.success) {
        // 重新生成线条
        this.regenerateLines();
      }
    },
    
    // 重新生成所有线条
    regenerateLines() {
      LinePointManager.regenerateLines(
        this.canvas, 
        fabric, 
        this.config.customize.points, 
        this.addLine.bind(this)
      );
    },
    
    initDefaults() {
      StateManager.initDefaults(this.config, this.$set);
      this.isAddMode = true;
    },
    
    initCanvas() {
      this.canvas = CanvasManager.initCanvas(
        fabric, 
        this.$refs.fabricCanvas, 
        this.$el, 
        this.isAddMode, 
        this
      );
      
      if (this.canvas) {
        this.loadFromConfig();
        this.resizeCanvas();
      }
    },
    
    resizeCanvas() {
      CanvasManager.resizeCanvas(this.canvas, this.$el, this.canvasWidth, this.canvasHeight);
    },
    
    setupEvents() {
      EventHandlers.setupEvents(this.canvas, this);
    },
    
    // 处理点移动中
    handlePointMoving(point) {
      LinePointManager.handlePointMoving(this.canvas, point);
    },
    
    // 处理点移动完成
    handlePointMoved(point) {
      LinePointManager.handlePointMoved(point, this.config.customize.points, this.saveState.bind(this));
    },
    
    handleCanvasClick(options) {
      const pointer = this.canvas.getPointer(options.e);
      console.log('画布点击 - 添加点坐标:', pointer.x, pointer.y, '模式:', this.isAddMode);
      
      // 只有在添加模式下才添加点
      if (this.isAddMode) {
        this.addLinePoint(pointer.x, pointer.y);
      }
    },
    
    addLinePoint(x, y) {
      const result = LinePointManager.addLinePoint(this.canvas, fabric, x, y, this.config, this.isAddMode);
      
      if (result) {
        this.pointObjects.push(result.point);
        this.config.customize.points.push(result.data);
        
        // 如果已经有上一个点，则添加一条线
        if (this.lastPoint) {
          console.log('连接线条', this.lastPoint.x, this.lastPoint.y, 'to', x, y);
          this.addLine(this.lastPoint.x, this.lastPoint.y, x, y, this.lastPoint.id, result.id);
          this.lastPoint = null; // 重置上一个点
        } else {
          // 记录上一个点的位置
          this.lastPoint = { x, y, id: result.id };
          console.log('记录第一个点', this.lastPoint);
        }
        
        // 保存状态
        this.saveState();
      }
    },
    
    addLine(x1, y1, x2, y2, startPointId, endPointId) {
      const result = LinePointManager.addLine(
        this.canvas, 
        fabric, 
        x1, y1, x2, y2, 
        startPointId, endPointId, 
        this.config
      );
      
      if (result) {
        this.lines.push(result.data);
      }
    },
    
    saveState() {
      StateManager.saveState(
        this.config, 
        this.lines, 
        this.selected,
        this.changeChartConfig,
        this.changeActiveItemConfig
      );
    },
    
    loadFromConfig() {
      CanvasManager.loadFromConfig(
        this.canvas,
        fabric,
        this.config,
        this.isAddMode,
        this.addLine.bind(this),
        this.pointObjects,
        this.lines
      );
    },
    
    // 在线上添加点
    addPointOnLine(line, pointer) {
      const result = LinePointManager.addPointOnLine(
        this.canvas, 
        line, 
        fabric, 
        pointer, 
        this.config, 
        this.isAddMode
      );
      
      if (result) {
        // 使用准确的投影点坐标
        const pointData = { 
          x: result.position.x, 
          y: result.position.y, 
          id: result.newPointId 
        };
        
        // 将新点插入到正确的位置（根据线的顺序）
        LinePointManager.insertPointInOrder(
          this.config.customize.points,
          pointData,
          line.data.startPointId,
          line.data.endPointId
        );
        
        // 保存点对象引用
        this.pointObjects.push(result.newPoint);
        
        // 更新线条数据
        result.newLines.forEach(lineData => {
          this.lines.push({
            x1: lineData.data.x1,
            y1: lineData.data.y1,
            x2: lineData.data.x2,
            y2: lineData.data.y2,
            id: Date.now(),
            startPointId: lineData.data.startPointId,
            endPointId: lineData.data.endPointId
          });
        });
        
        // 保存状态
        this.saveState();
      }
    },
    
    // 找到距离光标最近的点
    findNearestPointToCursor(pointer, threshold = 15) {
      return PointHelpers.findNearestPointToCursor(this.canvas, pointer, threshold);
    },
    
    // 高亮显示最近的点
    highlightNearestPoint(point) {
      PointHelpers.highlightNearestPoint(this.canvas, point);
    },
    
    // 取消所有点的高亮
    unhighlightAllPoints() {
      PointHelpers.unhighlightAllPoints(this.canvas);
    },
    
    // 删除最近的点
    deleteNearestPoint(pointer) {
      PointHelpers.deleteNearestPoint(
        this.canvas, 
        pointer, 
        this.deletePoint.bind(this), 
        this.saveState.bind(this)
      );
    },
    
    // 开始动画
    startAnimation() {
      if (!this.canvas || !this.config.customize.animationEnabled) return;
      
      // 先停止可能存在的动画
      this.stopAnimation();
      
      const animationType = this.config.customize.animationType || 'flow';
      const speed = this.config.customize.animationSpeed || 20;
      const direction = this.config.customize.animationDirection || 'forward';
      
      // 根据动画类型设置不同的动画逻辑
      switch (animationType) {
        case 'flow':
          this.startFlowAnimation(speed, direction);
          break;
        case 'flash':
          this.startFlashAnimation(speed);
          break;
        case 'pulse':
          this.startPulseAnimation(speed, this.config.customize.animationIntensity || 5);
          break;
        case 'gradient':
          this.startGradientAnimation(speed, direction, this.config.customize.animationColor || '#ff6700');
          break;
        case 'neon':
          this.startNeonAnimation(speed, this.config.customize.animationIntensity || 5, this.config.customize.animationColor || '#ff6700');
          break;
        case 'scan':
          this.startScanAnimation(speed, this.config.customize.animationIntensity || 5);
          break;
        case 'arrow':
          this.startArrowAnimation(speed, direction, this.config.customize.animationColor || '#ff6700');
          break;
        default:
          break;
      }
    },
    
    // 停止动画
    stopAnimation() {
      if (this.animationInterval) {
        clearInterval(this.animationInterval);
        this.animationInterval = null;
        
        // 重置所有线条的效果
        if (this.canvas) {
          this.canvas.getObjects().forEach(obj => {
            if (obj.type === 'line' && obj.data && obj.data.isLine) {
              obj.set({ 
                strokeDashOffset: 0,
                stroke: this.config.customize.lineColor,
                strokeWidth: this.config.customize.lineWidth,
                opacity: this.config.customize.lineOpacity || 1
              });
              
              // 删除可能存在的临时动画对象
              if (obj._animationObjects) {
                obj._animationObjects.forEach(animObj => {
                  this.canvas.remove(animObj);
                });
                delete obj._animationObjects;
              }
            }
          });
          this.canvas.renderAll();
        }
      }
    },
    
    // 重启动画
    restartAnimation() {
      this.stopAnimation();
      this.startAnimation();
    },
    
    // 流动动画
    startFlowAnimation(speed, direction) {
      let offset = 0;
      const step = direction === 'forward' ? 1 : -1;
      
      this.animationInterval = setInterval(() => {
        if (!this.canvas) return;
        
        // 获取所有线条
        const lines = this.canvas.getObjects().filter(obj => 
          obj.type === 'line' && obj.data && obj.data.isLine
        );
        
        // 无线条时不进行动画
        if (lines.length === 0) return;
        
        // 更新虚线偏移以实现流动效果
        lines.forEach(line => {
          // 如果线条是实线，先转为虚线
          if (!line.strokeDashArray) {
            // 使用线条长度计算合适的虚线参数
            const dx = line.x2 - line.x1;
            const dy = line.y2 - line.y1;
            const length = Math.sqrt(dx * dx + dy * dy);
            const dashLength = Math.max(5, length / 10);
            
            line.set({
              strokeDashArray: [dashLength, dashLength]
            });
          }
          
          // 设置虚线偏移
          line.set({ strokeDashOffset: offset });
        });
        
        // 更新偏移
        offset += step;
        
        // 渲染画布
        this.canvas.renderAll();
      }, speed);
    },
    
    // 闪烁动画
    startFlashAnimation(speed) {
      let visible = true;
      
      this.animationInterval = setInterval(() => {
        if (!this.canvas) return;
        
        // 获取所有线条
        const lines = this.canvas.getObjects().filter(obj => 
          obj.type === 'line' && obj.data && obj.data.isLine
        );
        
        // 无线条时不进行动画
        if (lines.length === 0) return;
        
        // 更新透明度以实现闪烁效果
        lines.forEach(line => {
          const opacity = visible ? 
            this.config.customize.lineOpacity || 1 : 
            (this.config.customize.lineOpacity || 1) * 0.3;
          
          line.set({ opacity });
        });
        
        // 切换可见状态
        visible = !visible;
        
        // 渲染画布
        this.canvas.renderAll();
      }, speed * 20); // 闪烁速度慢一些
    },
    
    // 脉冲动画
    startPulseAnimation(speed, intensity) {
      let phase = 0;
      const baseWidth = this.config.customize.lineWidth || 2;
      const maxWidth = baseWidth + (intensity * 0.5); // 动画强度影响最大宽度
      
      this.animationInterval = setInterval(() => {
        if (!this.canvas) return;
        
        // 获取所有线条
        const lines = this.canvas.getObjects().filter(obj => 
          obj.type === 'line' && obj.data && obj.data.isLine
        );
        
        // 无线条时不进行动画
        if (lines.length === 0) return;
        
        // 使用正弦函数计算当前宽度
        const width = baseWidth + Math.sin(phase) * (maxWidth - baseWidth);
        
        // 更新线条宽度
        lines.forEach(line => {
          line.set({ strokeWidth: width });
        });
        
        // 更新相位
        phase += 0.1;
        if (phase > Math.PI * 2) phase = 0;
        
        // 渲染画布
        this.canvas.renderAll();
      }, speed);
    },
    
    // 渐变动画
    startGradientAnimation(speed, direction, animationColor) {
      // 创建渐变所需资源
      const baseColor = this.config.customize.lineColor || '#409EFF';
      const step = direction === 'forward' ? 0.02 : -0.02;
      let progress = 0;
      
      this.animationInterval = setInterval(() => {
        if (!this.canvas) return;
        
        // 获取所有线条
        const lines = this.canvas.getObjects().filter(obj => 
          obj.type === 'line' && obj.data && obj.data.isLine
        );
        
        // 无线条时不进行动画
        if (lines.length === 0) return;
        
        // 更新线条颜色
        lines.forEach(line => {
          const length = Math.sqrt(
            Math.pow(line.x2 - line.x1, 2) + 
            Math.pow(line.y2 - line.y1, 2)
          );
          
          // 计算当前渐变位置
          const gradientPosition = (progress % 1);
          
          // 创建渐变对象
          const gradient = new fabric.Gradient({
            type: 'linear',
            coords: {
              x1: line.x1,
              y1: line.y1,
              x2: line.x2,
              y2: line.y2
            },
            colorStops: [
              { offset: Math.max(0, gradientPosition - 0.2), color: baseColor },
              { offset: gradientPosition, color: animationColor },
              { offset: Math.min(1, gradientPosition + 0.2), color: baseColor }
            ]
          });
          
          // 应用渐变
          line.set({ stroke: gradient });
        });
        
        // 更新进度
        progress += step;
        if (progress > 2) progress = 0;
        if (progress < -1) progress = 1;
        
        // 渲染画布
        this.canvas.renderAll();
      }, speed);
    },
    
    // 霓虹灯效果
    startNeonAnimation(speed, intensity, animationColor) {
      let phase = 0;
      const defaultGlow = this.config.customize.shadowEnabled ? 
        this.config.customize.shadowBlur || 0 : 0;
      const maxGlow = intensity * 3;
      
      this.animationInterval = setInterval(() => {
        if (!this.canvas) return;
        
        // 获取所有线条
        const lines = this.canvas.getObjects().filter(obj => 
          obj.type === 'line' && obj.data && obj.data.isLine
        );
        
        // 无线条时不进行动画
        if (lines.length === 0) return;
        
        // 计算当前阴影模糊值
        const glowIntensity = defaultGlow + Math.abs(Math.sin(phase)) * maxGlow;
        
        // 更新线条效果
        lines.forEach(line => {
          // 创建阴影
          const shadow = new fabric.Shadow({
            color: animationColor,
            blur: glowIntensity,
            offsetX: 0,
            offsetY: 0
          });
          
          line.set({ 
            shadow: shadow,
            stroke: animationColor
          });
        });
        
        // 更新相位
        phase += 0.1;
        if (phase > Math.PI * 2) phase = 0;
        
        // 渲染画布
        this.canvas.renderAll();
      }, speed);
    },
    
    // 扫描动画
    startScanAnimation(speed, intensity) {
      let position = 0;
      const scanWidth = intensity * 5; // 动画强度影响扫描线宽度
      
      this.animationInterval = setInterval(() => {
        if (!this.canvas) return;
        
        // 获取所有线条
        const lines = this.canvas.getObjects().filter(obj => 
          obj.type === 'line' && obj.data && obj.data.isLine
        );
        
        // 无线条时不进行动画
        if (lines.length === 0) return;
        
        // 更新每条线的扫描效果
        lines.forEach(line => {
          // 计算线条长度
          const dx = line.x2 - line.x1;
          const dy = line.y2 - line.y1;
          const length = Math.sqrt(dx * dx + dy * dy);
          
          // 计算扫描线当前位置
          const scanPosition = (position % 1) * length;
          
          // 扫描线起点和终点
          const start = Math.max(0, scanPosition - scanWidth / 2);
          const end = Math.min(length, scanPosition + scanWidth / 2);
          
          // 创建用于表示扫描线区域的对象
          if (!line._scanEffect) {
            // 计算单位向量
            const dirX = dx / length;
            const dirY = dy / length;
            
            // 创建用于突出显示扫描线的线条
            const scanLine = new fabric.Line([
              line.x1 + dirX * start,
              line.y1 + dirY * start,
              line.x1 + dirX * end,
              line.y1 + dirY * end
            ], {
              stroke: 'rgba(255, 255, 255, 0.9)',
              strokeWidth: line.strokeWidth * 1.5,
              selectable: false,
              evented: false,
              excludeFromExport: true
            });
            
            // 保存对扫描线的引用
            line._scanEffect = scanLine;
            this.canvas.add(scanLine);
            
            // 确保扫描线位于线条之上
            scanLine.moveTo(999);
            
            // 保存待清理的动画对象
            if (!line._animationObjects) {
              line._animationObjects = [];
            }
            line._animationObjects.push(scanLine);
          } else {
            // 更新扫描线位置
            const dirX = dx / length;
            const dirY = dy / length;
            
            line._scanEffect.set({
              x1: line.x1 + dirX * start,
              y1: line.y1 + dirY * start,
              x2: line.x1 + dirX * end,
              y2: line.y1 + dirY * end
            });
          }
        });
        
        // 更新位置
        position += 0.02;
        if (position > 1) position = 0;
        
        // 渲染画布
        this.canvas.renderAll();
      }, speed);
    },
    
    // 箭头流动动画
    startArrowAnimation(speed, direction, animationColor) {
      // 箭头大小和步长
      const arrowSize = 10;
      const step = direction === 'forward' ? 0.01 : -0.01;
      let position = 0;
      
      this.animationInterval = setInterval(() => {
        if (!this.canvas) return;
        
        // 获取所有线条
        const lines = this.canvas.getObjects().filter(obj => 
          obj.type === 'line' && obj.data && obj.data.isLine
        );
        
        // 无线条时不进行动画
        if (lines.length === 0) return;
        
        // 更新每条线的箭头动画
        lines.forEach(line => {
          // 计算线条长度及方向
          const dx = line.x2 - line.x1;
          const dy = line.y2 - line.y1;
          const length = Math.sqrt(dx * dx + dy * dy);
          
          // 计算当前箭头位置
          const arrowPosition = (position % 1) * length;
          
          // 创建或更新箭头对象
          if (!line._arrowEffect) {
            // 计算单位向量和箭头位置
            const dirX = dx / length;
            const dirY = dy / length;
            const arrowX = line.x1 + dirX * arrowPosition;
            const arrowY = line.y1 + dirY * arrowPosition;
            
            // 计算箭头角度
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            // 创建箭头对象
            const arrow = new fabric.Triangle({
              left: arrowX,
              top: arrowY,
              width: arrowSize,
              height: arrowSize,
              fill: animationColor,
              angle: angle + 90,
              selectable: false,
              evented: false,
              excludeFromExport: true,
              originX: 'center',
              originY: 'center'
            });
            
            // 保存箭头引用
            line._arrowEffect = arrow;
            this.canvas.add(arrow);
            
            // 保存待清理的动画对象
            if (!line._animationObjects) {
              line._animationObjects = [];
            }
            line._animationObjects.push(arrow);
          } else {
            // 更新箭头位置
            const dirX = dx / length;
            const dirY = dy / length;
            const arrowX = line.x1 + dirX * arrowPosition;
            const arrowY = line.y1 + dirY * arrowPosition;
            
            line._arrowEffect.set({
              left: arrowX,
              top: arrowY
            });
          }
        });
        
        // 更新位置
        position += step;
        if (position > 1) position = 0;
        if (position < 0) position = 1;
        
        // 渲染画布
        this.canvas.renderAll();
      }, speed);
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-component-fabric-line {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  
  .canvas-container {
    width: 100% !important;
    height: 100% !important;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    pointer-events: auto !important; // 确保Canvas容器能接收鼠标事件
    
    canvas {
      width: 100% !important;
      height: 100% !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      border: 1px solid #ddd;
      box-sizing: border-box;
    }
  }

  .tooltip {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 20;
    text-align: center;
    line-height: 1.5;
    max-width: 90%;
    pointer-events: none; // 不影响鼠标操作
  }
}
</style> 