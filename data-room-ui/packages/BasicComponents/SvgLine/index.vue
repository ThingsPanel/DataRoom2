<template>
  <div
    class="bs-design-wrap"
    :style="{
      pointerEvents: 'auto',
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'visible'
    }"
  >
    <div
      ref="svgContainer"
      style="width: 100%; height: 100%; overflow: visible;"
    ></div>
  </div>
</template>

<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import paramsMixins from 'data-room-ui/js/mixins/paramsMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import { EventBus } from 'data-room-ui/js/utils/eventBus'
import { SVG } from '@svgdotjs/svg.js'
// 引入工具函数，从各个文件中直接引入
import { 
  createFlowAnimation, 
  createParticleAnimation, 
  clearAnimation
} from './utils/animation'
import {
  generatePathData,
  findClickedLineSegment,
  getDistanceToLineSegment,
  getProjectionPoint
} from './utils/path'
import {
  realTimeAdjustSize,
  adjustContainerSize,
  throttle
} from './utils/container'
import {
  handleMouseMove,
  handleMouseUp,
  handleSvgClick,
  deletePoint as deletePointUtil,
  simulateVdrResize,
  triggerContainerResize
} from './utils/events'
import {
  clearControlPoints,
  updateControlPoints as updateControlPointsUtil,
  enableDraggableItem,
  getRenderComponent,
  initPointsFromConfig,
  savePoints
} from './utils/controls'
// 移除拖拽插件导入
// import '@svgdotjs/svg.draggable.js'

export default {
  name: 'SvgLine',
  mixins: [paramsMixins, commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      svgDraw: null,
      path: null,
      points: [],
      circles: [],
      isDragging: false,
      isAdjustingSize: false,
      draggedPointIndex: -1,
      dragStartPos: { x: 0, y: 0 },
      animationElements: [],
      justFinishedDragging: false,
      dragTimeoutId: null,
    }
  },
  computed: {
    isEditing() {
      return this.selected;
    },
    lineColor() {
      return this.config.customize?.lineColor || '#1890ff'
    },
    lineWidth() {
      return this.config.customize?.lineWidth || 2
    },
    opacity() {
      return this.config.customize?.opacity || 1
    },
    dashArray() {
      if (!this.config.customize?.dashed) return 'none'
      const dashLength = this.config.customize?.dashLength || 5
      return `${dashLength},${dashLength}`
    },
    animation() {
      return this.config.customize?.animation || {
        enable: false,
        type: 'flow',
        speed: 5,
        flowColor: 'rgba(24, 144, 255, 0.6)',
        flowLength: 30,
        particleSize: 3,
        particleColor: '#fff',
        glowColor: 'rgba(24, 144, 255, 0.3)',
        glowWidth: 10
      }
    },
    lineType() {
      // 如果有lineType属性，直接使用
      if (this.config.customize?.lineType) {
        return this.config.customize.lineType;
      }
      // 兼容旧版本，根据curved属性返回lineType
      return this.config.customize?.curved ? 'curved' : 'straight';
    }
  },
  watch: {
    config: {
      handler(newVal, oldVal) {
        if (newVal._fromSvgDrag) {
          return;
        }

        if (newVal.x !== oldVal.x || newVal.y !== oldVal.y) {
          return;
        }

        if (newVal.w !== oldVal.w || newVal.h !== oldVal.h) {
          if (!this.isDragging && !this.isAdjustingSize) {
            this.initFromConfig();
          }
        } else if (JSON.stringify(newVal.customize?.points) !== JSON.stringify(oldVal.customize?.points)) {
          if (!this.isDragging && !this.isAdjustingSize) {
            this.initFromConfig();
          }
        }
      },
      deep: true
    },
    lineColor() {
      this.updatePathStyle();
      this.refreshAnimation();
    },
    lineWidth() {
      this.updatePathStyle();
      this.refreshAnimation();
    },
    opacity() {
      this.updatePathStyle();
    },
    dashArray() {
      this.updatePathStyle();
      this.refreshAnimation();
    },
    isEditing(val) {
      this.updateControlPoints();
    },
    'animation.enable'() {
      this.updateAnimation();
    },
    'animation.type'() {
      this.updateAnimation();
    },
    'animation.speed'() {
      this.updateAnimation();
    },
    'animation.flowColor'() {
      this.refreshAnimation();
    },
    'animation.particleColor'() {
      this.refreshAnimation();
    },
    'config.customize.lineType'() {
      this.updatePath();
      this.refreshAnimation();
    },
    'config.customize.curved'() {
      this.updatePath();
      this.refreshAnimation();
    },
    'animation.direction'() {
      this.updateAnimation();
    },
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get('ticket');

    if (ticket) {
      localStorage.setItem('ticket', ticket);
    }

    if (!this.config.customize) {
      this.$set(this.config, 'customize', {})
    }

    if (!this.config.customize.points) {
      this.$set(this.config.customize, 'points', [
        { x: 0.2, y: 0.5 },
        { x: 0.8, y: 0.5 }
      ])
    }

    // 创建节流版本的调整大小函数
    this.throttledCheckAndAdjustSize = this.throttle(this.realTimeAdjustSize, 100);

    // 监听刷新动画事件
    EventBus.$on('svgline-refresh-animation', this.refreshAnimation);

    // 添加更新路径的事件监听
    EventBus.$on('svgline-update-path', this.handleUpdatePath);
  },
  mounted() {
    if (this.$refs.svgContainer) {
      this.$refs.svgContainer.addEventListener('mousedown', this.notifyParentDisableDrag);
    }

    this.initSVG();
    this.animationElements = [];
    this.updateAnimation();
  },
  beforeDestroy() {
    if (this.svgDraw) {
      this.svgDraw.remove();
    }

    if (this.$refs.svgContainer) {
      this.$refs.svgContainer.removeEventListener('mousedown', this.notifyParentDisableDrag);
    }

    // 移除事件监听
    EventBus.$off('svgline-refresh-animation', this.refreshAnimation);
    EventBus.$off('svgline-update-path', this.handleUpdatePath);

    // 清除拖拽相关的定时器
    if (this.dragTimeoutId) {
      clearTimeout(this.dragTimeoutId);
      this.dragTimeoutId = null;
    }

    this.clearAnimation();
  },
  methods: {
    initSVG() {
      this.svgDraw = SVG().addTo(this.$refs.svgContainer).size('100%', '100%');

      this.path = this.svgDraw.path('').fill('none');
      this.updatePathStyle();

      this.initFromConfig();

      let mouseDownTime = 0;
      let mouseDownPos = { x: 0, y: 0 };

      this.svgDraw.mousedown((event) => {
        if (!this.selected) return;

        // 如果是右键点击，不记录时间和位置
        if (event.button === 2) return;

        mouseDownTime = Date.now();
        mouseDownPos = { x: event.clientX, y: event.clientY };
      });

      this.svgDraw.mouseup((event) => {
        if (!this.selected) return;

        // 如果是右键点击，不处理
        if (event.button === 2) return;

        if (this.justFinishedDragging) return;

        const timeDiff = Date.now() - mouseDownTime;
        const distanceX = Math.abs(event.clientX - mouseDownPos.x);
        const distanceY = Math.abs(event.clientY - mouseDownPos.y);

        if (timeDiff < 300 && distanceX < 5 && distanceY < 5) {
          this.handleSvgClick(event);
        }
      });

      this.path.on('mousedown', (e) => {
        if (!this.selected) {
          return;
        }

        return;
      });
    },

    initFromConfig() {
      this.points = [];
      this.clearControlPoints();

      this.points = initPointsFromConfig(this.config);
      
      // 如果点不够，保存默认点
      if (this.points.length < 2) {
        this.points = [
          { x: this.config.w * 0.2, y: this.config.h * 0.5 },
          { x: this.config.w * 0.8, y: this.config.h * 0.5 }
        ];
        this.savePoints();
      }
      
      this.updatePath();
      this.updateControlPoints();
    },

    updatePathStyle() {
      if (!this.path) return;

      this.path.stroke({
        color: this.lineColor,
        width: this.lineWidth,
        opacity: this.opacity
      });

      if (!this.animation.enable || this.animation.type !== 'dash') {
        this.path.attr('stroke-dasharray', this.dashArray);
      }
    },

    updatePath() {
      if (!this.path || this.points.length < 2) return;

      // 使用提取的工具函数生成路径数据
      const pathData = generatePathData(this.points, this.lineType);
      this.path.plot(pathData);
    },

    clearControlPoints() {
      this.circles = clearControlPoints(this.circles);
    },

    updateControlPoints() {
      this.clearControlPoints();

      // 使用工具函数更新控制点
      this.circles = updateControlPointsUtil(
        this.points, 
        this.selected, 
        this.svgDraw, 
        this.config,
        this.deletePoint,
        () => getRenderComponent(this),
        this.handleControlPointMouseDown
      );
    },

    handleControlPointMouseDown(e, index) {
      this.isDragging = true;
      this.draggedPointIndex = index;
      this.dragStartPos = {
        x: e.clientX,
        y: e.clientY
      };

      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    },

    handleMouseMove(e) {
      const result = handleMouseMove(
        e, 
        this.isDragging, 
        this.draggedPointIndex, 
        this.dragStartPos, 
        this.points, 
        this.config, 
        this.updatePath, 
        this.circles, 
        this.throttledCheckAndAdjustSize
      );

      this.points = result.points;
      this.dragStartPos = result.dragStartPos;
    },

    handleMouseUp() {
      const result = handleMouseUp(
        this.isDragging,
        this.points,
        this.config,
        this.realTimeAdjustSize,
        this.savePoints,
        this.updatePath,
        this.updateControlPoints
      );

      this.isDragging = result.isDragging;
      this.draggedPointIndex = result.draggedPointIndex;
      this.justFinishedDragging = result.justFinishedDragging;
      
      // 保存超时ID，用于组件销毁时清除
      if (result.timeoutId) {
        // 清除之前可能存在的定时器
        if (this.dragTimeoutId) {
          clearTimeout(this.dragTimeoutId);
        }
        
        // 使用我们自己的定时器而不是events.js中的
        this.dragTimeoutId = setTimeout(() => {
          this.justFinishedDragging = false;
        }, 300);
      } else {
        // 如果没有返回timeoutId，也要设置一个定时器确保标志被重置
        this.dragTimeoutId = setTimeout(() => {
          this.justFinishedDragging = false;
        }, 300);
      }

      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);

      // 启用拖拽项
      enableDraggableItem(() => getRenderComponent(this), this.config);
      
      // 调整容器大小
      this.adjustContainerSize();

      // 拖拽结束时保存时间线
      const renderComponent = getRenderComponent(this);
      if (renderComponent) {
        renderComponent.saveTimeLine(`调整${this.config.title || '组件'}大小`);
      }
    },

    handleSvgClick(event) {
      // 使用渲染组件检查是否在预览模式
      const renderComponent = getRenderComponent(this);
      
      // 查找是否是预览模式
      let isPreviewMode = false;
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.name === 'BigScreenRun') {
          isPreviewMode = true;
          break;
        }
        parent = parent.$parent;
      }
      
      // 如果是预览模式，不允许添加点
      if (isPreviewMode) return;
      
      // 如果是右键点击，不添加新点
      if (event.button === 2) return;

      // 如果不是编辑状态或正在拖拽，不添加新点
      if (!this.isEditing || this.isDragging) return;
      
   
      
      // 手动强制重置justFinishedDragging标志，确保它不会阻止添加点
      this.justFinishedDragging = false;
      
      event.stopPropagation();

      // 获取点击位置
      const point = this.svgDraw.point(event.clientX, event.clientY);
      
      // 查找被点击的线段
      let clickedSegmentIndex = this.findClickedLineSegment(point.x, point.y);
      
      // 如果没有找到线段，对于特殊线型使用更简单的距离计算再次尝试
      if (clickedSegmentIndex === -1 && (this.lineType === 'smooth' || this.lineType === 'step')) {
        // 寻找距离最近的线段
        let minDist = Number.MAX_VALUE;
        for (let i = 0; i < this.points.length - 1; i++) {
          const p1 = this.points[i];
          const p2 = this.points[i + 1];
          
          // 特殊线型对距离的处理
          let dist;
          if (this.lineType === 'step') {
            // 阶梯线分为水平和垂直两段，分别计算最小距离
            const midX = p2.x;
            const midY = p1.y;
            
            // 水平段距离
            const distH = this.getDistanceToLineSegment(point.x, point.y, p1, {x: midX, y: midY});
            // 垂直段距离
            const distV = this.getDistanceToLineSegment(point.x, point.y, {x: midX, y: midY}, p2);
            
            // 取最小值
            dist = Math.min(distH, distV);
          } else {
            // 平滑曲线，简化为直线距离的2倍阈值
            dist = this.getDistanceToLineSegment(point.x, point.y, p1, p2);
            if (dist < 20) { // 使用较大阈值
              dist = dist / 2; // 降低距离，提高优先级
            }
          }
          
          if (dist < minDist) {
            minDist = dist;
            clickedSegmentIndex = i;
          }
        }
        
        // 确保距离在合理范围内
        if (minDist > 20) {
          clickedSegmentIndex = -1;
        }
        
      }

      // 复制点数组并添加新点
      const newPoints = [...this.points];
      
      if (clickedSegmentIndex !== -1) {
        const p1 = this.points[clickedSegmentIndex];
        const p2 = this.points[clickedSegmentIndex + 1];

        // 获取投影点 - 特殊处理阶梯线
        let newPoint;
        if (this.lineType === 'step') {
          // 阶梯线的投影点处理，判断是在水平段还是垂直段
          const midX = p2.x;
          const midY = p1.y;
          const distH = this.getDistanceToLineSegment(point.x, point.y, p1, {x: midX, y: midY});
          const distV = this.getDistanceToLineSegment(point.x, point.y, {x: midX, y: midY}, p2);
          
          if (distH <= distV) {
            // 在水平段，固定y坐标
            newPoint = { x: point.x, y: p1.y };
          } else {
            // 在垂直段，固定x坐标
            newPoint = { x: p2.x, y: point.y };
          }
        } else {
          // 其他类型线条使用标准投影
          newPoint = this.getProjectionPoint(point.x, point.y, p1, p2);
        }
        

        // 在点击的线段后插入新点
        newPoints.splice(clickedSegmentIndex + 1, 0, newPoint);
      } else {
        // 在末尾添加新点
        newPoints.push({ x: point.x, y: point.y });
      }
      
      // 更新点数组
      this.points = newPoints;
      
      // 更新路径和控制点
      this.updatePath();
      this.updateControlPoints();
      this.savePoints();
      this.checkAndAdjustSize();
      this.refreshAnimation();
      
    },

    deletePoint(index) {
      this.points = deletePointUtil(
        index,
        this.points,
        this.updatePath,
        this.updateControlPoints,
        this.savePoints,
        this.refreshAnimation
      );
    },

    savePoints() {
      savePoints(
        this.points,
        this.config,
        (newConfig) => this.$emit('update:config', newConfig),
        (newConfig) => {
          let renderComponent = getRenderComponent(this);
          if (renderComponent) {
            renderComponent.changeChartConfig(newConfig);
          }
        }
      );
    },

    checkAndAdjustSize() {
      // 如果已经在实时调整，则不需要再次调整
      if (this.isAdjustingSize) return;

      this.realTimeAdjustSize();
    },

    findClickedLineSegment(x, y, threshold = 8) {
      // 对于平滑曲线和阶梯线，增大点击检测的阈值
      let adjustedThreshold = threshold;
      if (this.lineType === 'smooth' || this.lineType === 'step') {
        adjustedThreshold = threshold * 1.5; // 增加50%的检测范围
      }
      
      return findClickedLineSegment(x, y, this.points, adjustedThreshold);
    },

    getDistanceToLineSegment(x, y, p1, p2) {
      return getDistanceToLineSegment(x, y, p1, p2);
    },

    getProjectionPoint(x, y, p1, p2) {
      return getProjectionPoint(x, y, p1, p2);
    },

    notifyParentDisableDrag(e) {
      return;
    },

    simulateVdrResize(vdrInstance, handle, distance) {
      this.isAdjustingSize = true;
      
      const success = simulateVdrResize(vdrInstance, handle, distance);
      
      setTimeout(() => {
        this.isAdjustingSize = false;
      }, 100);
      
      return success;
    },

    triggerContainerResize(direction, distance) {
      return triggerContainerResize(
        direction, 
        distance, 
        this.config, 
        () => getRenderComponent(this), 
        this.simulateVdrResize
      );
    },

    updateAnimation() {
      // 清除现有动画
      this.clearAnimation();

      if (!this.animation.enable) {
        // 如果禁用动画，确保恢复原始样式
        this.updatePathStyle();
        return;
      }

      // 根据动画类型创建新动画
      switch (this.animation.type) {
        case 'flow':
          this.animationElements = createFlowAnimation(this.svgDraw, this.path, this.animation);
          break;
        case 'particle':
          this.animationElements = createParticleAnimation(this.svgDraw, this.path, this.animation);
          break;
      }
    },

    clearAnimation() {
      // 使用工具函数清除动画
      clearAnimation(this.animationElements, this.path, this.dashArray);
      this.animationElements = [];
    },

    realTimeAdjustSize() {
      // 标记正在调整大小，避免触发watch
      this.isAdjustingSize = true;
      
      // 获取渲染组件和画布尺寸
      let renderComponent = this.$parent;
      while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
        renderComponent = renderComponent.$parent;
      }
      
      const canvasWidth = renderComponent?.pageConfig?.w || 1920;
      const canvasHeight = renderComponent?.pageConfig?.h || 1080;
      
      // 使用工具函数调整大小
      const { updatedConfig, updatedPoints, hasChanges } = realTimeAdjustSize(
        this.points, 
        this.config, 
        canvasWidth, 
        canvasHeight
      );
      
      // 如果有变化，更新配置
      if (hasChanges) {
        // 更新点位置
        this.points = updatedPoints;
        
        // 添加标记，避免触发watch
        updatedConfig._fromSvgDrag = true;
        
        // 更新组件配置
        this.$emit('update:config', updatedConfig);
        
        // 更新渲染组件中的配置
        if (renderComponent) {
          renderComponent.changeChartConfig(updatedConfig);
          renderComponent.changeActiveItemConfig(updatedConfig);
          renderComponent.changeActiveItemWH({
            code: updatedConfig.code,
            w: updatedConfig.w,
            h: updatedConfig.h,
            x: updatedConfig.x,
            y: updatedConfig.y
          });
        }
        
        // 更新路径和控制点
        this.updatePath();
        this.updateControlPoints();
      }
      
      // 重置调整大小标记
      setTimeout(() => {
        this.isAdjustingSize = false;
      }, 50);
    },

    adjustContainerSize() {
      // 标记正在调整大小，避免触发watch
      this.isAdjustingSize = true;

      // 使用工具函数调整容器大小
      const { updatedConfig, updatedPoints, hasChanges } = adjustContainerSize(this.points, this.config);
      
      // 如果有变化，更新配置
      if (hasChanges) {
        // 更新点位置
        this.points = updatedPoints;
        
        // 添加标记，避免触发watch
        updatedConfig._fromSvgDrag = true;

        // 更新组件配置
        this.$emit('update:config', updatedConfig);

        // 更新渲染组件中的配置
        let renderComponent = this.$parent;
        while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
          renderComponent = renderComponent.$parent;
        }

        if (renderComponent) {
          renderComponent.changeChartConfig(updatedConfig);
          renderComponent.changeActiveItemConfig(updatedConfig);
          renderComponent.changeActiveItemWH({
            code: updatedConfig.code,
            w: updatedConfig.w,
            h: updatedConfig.h,
            x: updatedConfig.x,
            y: updatedConfig.y
          });
        }

        // 更新路径和控制点
        this.updatePath();
        this.updateControlPoints();
      }

      // 重置调整大小标记
      setTimeout(() => {
        this.isAdjustingSize = false;
      }, 50);
    },

    // 使用工具函数替换节流函数
    throttle: throttle,

    // 刷新动画时使用工具函数
    refreshAnimation() {
      if (this.animation.enable) {
        this.updateAnimation();
      }
    },

    // 添加处理更新路径的方法
    handleUpdatePath() {
      this.updatePath();
      this.refreshAnimation();
    },

    // 添加重置拖拽标志的方法
    resetDragFlag() {
      this.justFinishedDragging = false;
    },
  }
}
</script>

<style lang="scss" scoped>
.bs-design-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible;
}
</style>
