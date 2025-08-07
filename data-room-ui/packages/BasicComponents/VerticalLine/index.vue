<template>
  <div
    style="width: 100%; height: 100%"
    class="bs-design-wrap"
    :style="{
      opacity: opacity
    }"
  >
    <div ref="svgContainer" style="width: 100%; height: 100%;"></div>
  </div>
</template>
<script>
import { SVG } from '@svgdotjs/svg.js'
import { refreshComponentMixin } from 'data-room-ui/js/mixins/refreshComponent'
// 导入动画工具函数
import { startDropletAnimation, startFlowAnimation } from '../FabricLine/utils/animationUtils.js'

export default {
  name: 'VerticalLine',
  components: {},
  mixins: [refreshComponentMixin],
  props: {
    // 卡片的属性
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      draw: null,
      line: null,
      startArrow: null, // 新增：起点箭头元素
      endArrow: null,   // 新增：终点箭头元素
      svgWidth: 0,
      svgHeight: 0,
      animationElements: [],
      animationRunners: [],
      resizeObserver: null,
      resizeTimer: null // 添加防抖定时器
    }
  },
  computed: {
    // 整体组件透明度
    opacity () {
      return this.config.customize.opacity !== undefined ? this.config.customize.opacity : 1;
    },
    // 线条特定属性
    lineColor () {
      return this.config.customize.lineColor || '#188df0';
    },
    lineWidth () {
      return this.config.customize.lineWidth || 4;
    },
    // 虚线属性
    enableLineDash () {
      return this.config.customize.enableLineDash || false;
    },
    lineDashValue () {
      return this.config.customize.lineDashValue || 5;
    },
    lineGapValue () {
      return this.config.customize.lineGapValue || 5;
    },
    // 动画属性 - 从FabricLine适配
    animationActive() {
      return this.config.customize.animationActive || false;
    },
    animationType() {
      return this.config.customize.animationType || 'none';
    },
    animationDirection() {
      return this.config.customize.animationDirection || 'forward';
    },
    animationSpeed() {
      const speed = this.config.customize.animationSpeed;
      return typeof speed === 'number' && speed > 0 ? speed : 1;
    },
    animationLoop() {
      return this.config.customize.animationLoop === undefined ? true : !!this.config.customize.animationLoop;
    },
    dropletColor() {
      return this.config.customize.dropletColor || '#40a9ff';
    },
    dropletSize() {
      return this.config.customize.dropletSize || 3;
    },
    flowColor() {
      return this.config.customize.flowColor || this.lineColor; // 默认使用线条颜色
    },
    flowThickness() {
      return this.config.customize.flowThickness || this.lineWidth;
    },
    flowDensity() {
      const density = this.config.customize.flowDensity;
      return typeof density === 'number' && density > 0 ? density : 10;
    },
    // 箭头属性 - 起点
    startArrowStyle() {
      return this.config.customize.startArrowStyle || 'none';
    },
    startArrowSize() {
      return this.config.customize.startArrowSize || 6;
    },
    startArrowColor() {
      return this.config.customize.startArrowColor || this.lineColor;
    },
    
    // 箭头属性 - 终点
    endArrowStyle() {
      return this.config.customize.endArrowStyle || 'none';
    },
    endArrowSize() {
      return this.config.customize.endArrowSize || 6;
    },
    endArrowColor() {
      return this.config.customize.endArrowColor || this.lineColor;
    }
  },
  watch: {
    opacity () { this.updateStyle() },
    lineColor () { this.updateLineStyle() },
    lineWidth () { this.updateLineStyle(); this._updateAnimation(); }, // 宽度变化可能影响流动动画
    enableLineDash () { this.updateLineStyle() },
    lineDashValue () { this.updateLineStyle() },
    lineGapValue () { this.updateLineStyle() },

    animationActive() { this._updateAnimation() },
    animationType() { this._updateAnimation() },
    animationDirection() { this._updateAnimation() },
    animationSpeed() { this._updateAnimation() },
    animationLoop() { this._updateAnimation() },
    dropletColor() { if (this.animationActive && this.animationType === 'droplet') this._updateAnimation() },
    dropletSize() { if (this.animationActive && this.animationType === 'droplet') this._updateAnimation() },
    flowColor() { if (this.animationActive && this.animationType === 'flow') this._updateAnimation() },
    flowThickness() { if (this.animationActive && this.animationType === 'flow') this._updateAnimation() },
    flowDensity() { if (this.animationActive && this.animationType === 'flow') this._updateAnimation() },
    'config.w': 'debouncedHandleResize',
    'config.h': 'debouncedHandleResize',
    // 新增箭头样式相关监听
    startArrowStyle() { this.updateArrows() },
    startArrowSize() { this.updateArrows() },
    startArrowColor() { this.updateArrows() },
    endArrowStyle() { this.updateArrows() },
    endArrowSize() { this.updateArrows() },
    endArrowColor() { this.updateArrows() }
  },
  mounted () {
    this.$nextTick(() => {
      this.initSvg();
      this.handleResize(); // 初始绘制
      this.setupResizeObserver();
    });
  },
  beforeDestroy() {
    this._clearAnimation();
    // 清理箭头元素
    if (this.startArrow) {
      this.startArrow.remove();
      this.startArrow = null;
    }
    if (this.endArrow) {
      this.endArrow.remove();
      this.endArrow = null;
    }
    if (this.resizeObserver && this.$refs.svgContainer) {
      this.resizeObserver.unobserve(this.$refs.svgContainer);
      this.resizeObserver = null;
    }
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = null;
    }
    if (this.draw) {
      this.draw.remove();
      this.draw = null;
    }
  },
  methods: {
    initSvg() {
      if (!this.$refs.svgContainer) {
        return;
      }
      try {
        // 检查是否已经存在 SVG 实例
        if (this.draw) {
          this._clearAnimation();
          this.draw.remove();
          this.draw = null;
        }
        
        // 创建新的 SVG 实例
        this.draw = SVG().addTo(this.$refs.svgContainer).size('100%', '100%');
        
        // 确保容器尺寸已更新
        this.svgWidth = this.$refs.svgContainer.clientWidth;
        this.svgHeight = this.$refs.svgContainer.clientHeight;
        
        // 创建线条 - 垂直线是从上到下
        this.line = this.draw.line(this.svgWidth / 2, 0, this.svgWidth / 2, this.svgHeight)
          .attr({ 
            'stroke-linecap': 'butt',
            'shape-rendering': 'auto', // 使用auto而不是optimizeSpeed，提高渲染质量
            'vector-effect': 'non-scaling-stroke'
          });
          
        this.updateLineStyle();
        
        // 初始化箭头
        this.updateArrows();
        
        // 初始化后启动动画
        this._updateAnimation();
      } catch (err) {
      }
    },
    updateLinePath() {
      if (!this.line || !this.draw) {
        return;
      }
      try {
        const xPos = this.svgWidth / 2;
        
        // 如果没有箭头，直接绘制整条线
        if (this.startArrowStyle === 'none' && this.endArrowStyle === 'none') {
          this.line.plot(xPos, 0, xPos, this.svgHeight);
        } else {
          // 有箭头时，在updateArrows中会调整线条，这里不做处理
          // 仅在首次绘制时设置初始位置
          if (!this.startArrow && !this.endArrow) {
            this.line.plot(xPos, 0, xPos, this.svgHeight);
          }
        }
        
        // 添加平滑渲染提示，减少卡顿
        this.line.attr({
          'shape-rendering': 'auto',
          'vector-effect': 'non-scaling-stroke'
        });
        
        // 更新箭头
        this.updateArrows();
      } catch (err) {
        // 如果更新路径失败，尝试重新创建线条
        try {
          if (this.line) this.line.remove();
          this.line = this.draw.line(this.svgWidth / 2, 0, this.svgWidth / 2, this.svgHeight)
            .attr({ 
              'stroke-linecap': 'butt',
              'shape-rendering': 'auto',
              'vector-effect': 'non-scaling-stroke'
            });
          this.updateLineStyle();
          this.updateArrows();
        } catch (e) {
        }
      }
    },
    updateLineStyle() {
      if (!this.line) {
        return;
      }
      try {
        const strokeAttrs = {
          width: this.lineWidth,
          color: this.lineColor
        };
        if (this.enableLineDash && this.lineDashValue > 0 && this.lineGapValue > 0) {
          strokeAttrs.dasharray = `${this.lineDashValue} ${this.lineGapValue}`;
        } else {
          strokeAttrs.dasharray = null;
        }
        this.line.stroke(strokeAttrs);
      } catch (err) {
      }
    },
    updateStyle(){
      // 透明度由根div的样式绑定处理
    },
    debouncedHandleResize() {
      // 防抖处理，避免频繁调整大小导致的性能问题
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(() => {
        this.handleResize();
      }, 150); // 增加延迟时间，减少频繁重绘
    },
    handleResize () {
      if (!this.$refs.svgContainer) {
        return;
      }
      
      const newWidth = this.$refs.svgContainer.clientWidth;
      const newHeight = this.$refs.svgContainer.clientHeight;

      
      // 检查尺寸是否有效
      if (newWidth <= 0 || newHeight <= 0) {
        return;
      }

      // 检查尺寸是否实际变化
      if (newWidth === this.svgWidth && newHeight === this.svgHeight) {
        return;
      }

      this.svgWidth = newWidth;
      this.svgHeight = newHeight;
      
      // 确保 SVG 实例存在
      if (!this.draw) {
        return this.initSvg();
      }
      
      try {
        // 更新 SVG 画布大小
        this.draw.size(this.svgWidth, this.svgHeight);
        
        // 确保线条存在
        if (!this.line) {
          this.line = this.draw.line(this.svgWidth / 2, 0, this.svgWidth / 2, this.svgHeight)
            .attr({ 'stroke-linecap': 'butt' });
          this.updateLineStyle();
        } else {
          // 更新线条路径
          this.updateLinePath();
        }
        
        // 更新动画
        this._updateAnimation();
      } catch (err) {
        // 如果更新失败，尝试完全重新初始化
        this._clearAnimation();
        if (this.draw) {
          try {
            this.draw.remove();
          } catch (e) {
          }
          this.draw = null;
        }
        this.initSvg();
      }
    },
    setupResizeObserver() {
      if (!this.$refs.svgContainer) {
        return;
      }
      
      if (this.resizeObserver) {
        this.resizeObserver.unobserve(this.$refs.svgContainer);
      }
      
      try {
        this.resizeObserver = new ResizeObserver((entries) => {
          // 使用防抖处理
          this.debouncedHandleResize();
        });
        this.resizeObserver.observe(this.$refs.svgContainer);
      } catch (err) {
        // 降级处理：如果ResizeObserver不可用，使用window resize事件
        window.addEventListener('resize', this.debouncedHandleResize);
      }
    },

    // 动画方法（从FabricLine/index.vue适配）
    _clearAnimation() {
      this.animationRunners.forEach(runner => {
        if (runner && typeof runner.cancel === 'function') {
          try {
            runner.cancel();
          } catch (e) {
          }
        }
      });
      this.animationRunners = [];
      
      this.animationElements.forEach(el => {
        if (el && typeof el.remove === 'function') {
          try {
            el.remove();
          } catch (e) {
          }
        }
      });
      this.animationElements = [];
    },
    _updateAnimation() {
      if (!this.draw || !this.line) {
        return this._clearAnimation();
      }
      
      // 清除现有动画
      this._clearAnimation();

      if (!this.animationActive || this.animationType === 'none') {
        return;
      }

      // 确保线条有有效的路径/长度用于动画
      if (this.lineWidth <= 0 || this.svgWidth <= 0 || this.svgHeight <= 0) {
        return;
      }

      // 优化：避免在小尺寸下启动动画，减少卡顿
      if (this.svgHeight < 50) {
        return;
      }

      // 确保速度设置正确传递给动画函数

      // 确保速度设置正确传递给动画函数
      const animationConfig = {
        animationActive: this.animationActive,
        animationType: this.animationType,
        animationDirection: this.animationDirection,
        animationSpeed: this.animationSpeed, // 直接使用原始速度值
        animationLoop: this.animationLoop,
        dropletColor: this.dropletColor,
        dropletSize: this.dropletSize,
        flowColor: this.flowColor,
        flowThickness: this.flowThickness,
        flowDensity: this.flowDensity
      };

    

      let animationResult = { elements: [], runners: [] };

      try {
        // 确保SVG.js已正确加载
        if (!this.draw.circle) {
          return;
        }
        
        // 测试创建一个简单的圆形，确认SVG绘图功能正常
        const testCircle = this.draw.circle(5).fill('#ff0000').move(-10, -10);
        testCircle.remove();
        
        switch (this.animationType) {
          case 'droplet':
            animationResult = startDropletAnimation(this.draw, this.line, animationConfig);
            break;
          case 'flow':
            // 直接在此处调试流水动画
            
              
            animationResult = startFlowAnimation(this.draw, this.line, animationConfig);
            break;
        }


      

        this.animationElements = animationResult.elements || [];
        this.animationRunners = animationResult.runners || [];

        if (this.animationElements.length > 0) {
          this.animationElements.forEach(el => {
            if (el && typeof el.front === 'function') {
              try {
                el.front();
              } catch (e) {
              }
            }
          });
          if (this.line) {
            try {
              this.line.back();
            } catch (e) {
            }
          }
        }
      } catch (e) {
        this._clearAnimation();
      }
    },
    
    // 新增：更新箭头方法
    updateArrows() {
      // 确保绘图实例和线条存在
      if (!this.draw || !this.line) {
        return;
      }
      
      try {
        // 获取线条坐标
        const x = this.svgWidth / 2;
        
        // 清理现有箭头
        if (this.startArrow) {
          this.startArrow.remove();
          this.startArrow = null;
        }
        
        if (this.endArrow) {
          this.endArrow.remove();
          this.endArrow = null;
        }
        
        // 计算箭头偏移量，确保箭头完全在容器内
        const startArrowOffset = this.startArrowStyle === 'none' ? 0 : Math.max(this.startArrowSize * 1.5, this.lineWidth * 2);
        const endArrowOffset = this.endArrowStyle === 'none' ? 0 : Math.max(this.endArrowSize * 1.5, this.lineWidth * 2);
        
        // 调整线条起点和终点，为箭头留出空间
        if (this.line && (startArrowOffset > 0 || endArrowOffset > 0)) {
          const xPos = this.svgWidth / 2;
          this.line.plot(xPos, startArrowOffset, xPos, this.svgHeight - endArrowOffset);
        }
        
        // 创建起点箭头，位置向下偏移确保在容器内
        if (this.startArrowStyle !== 'none') {
          this.startArrow = this.createArrow(
            x, startArrowOffset,         // 箭头位置，向下偏移
            this.startArrowStyle,        // 箭头样式
            this.startArrowSize,         // 箭头大小
            this.startArrowColor,        // 箭头颜色
            'start'                      // 箭头方向
          );
        }
        
        // 创建终点箭头，位置向上偏移确保在容器内
        if (this.endArrowStyle !== 'none') {
          this.endArrow = this.createArrow(
            x, this.svgHeight - endArrowOffset, // 箭头位置，向上偏移
            this.endArrowStyle,                // 箭头样式
            this.endArrowSize,                 // 箭头大小
            this.endArrowColor,                // 箭头颜色
            'end'                              // 箭头方向
          );
        }
      } catch (err) {
      }
    },
    
    // 新增：创建箭头辅助方法
    createArrow(x, y, style, size, color, direction) {
      if (!this.draw) return null;
      
      // 箭头填充颜色，如果未指定则使用线条颜色
      const fillColor = color || this.lineColor;
      
      // 定义向上或向下的箭头，不再依赖旋转
      const isUp = direction === 'start';
      let arrow = null;
      
      try {
        switch (style) {
          case 'arrow': {
            // 标准箭头 - 直接绘制垂直方向的箭头，不再依赖旋转
            const arrowWidth = size * 1.2;
            const arrowHeight = size * 2;
            
            if (isUp) {
              // 向上的箭头，尖端在上
              arrow = this.draw.polygon([
                [0, -arrowHeight], // 顶部尖端
                [-arrowWidth/2, 0], // 左底角
                [0, -arrowHeight*0.4], // 底部中点内凹
                [arrowWidth/2, 0]  // 右底角
              ]).fill(fillColor).stroke({width: 0}).center(x, y);
            } else {
              // 向下的箭头，尖端在下
              arrow = this.draw.polygon([
                [0, arrowHeight], // 底部尖端
                [-arrowWidth/2, 0], // 左上角
                [0, arrowHeight*0.4], // 顶部中点内凹
                [arrowWidth/2, 0]  // 右上角
              ]).fill(fillColor).stroke({width: 0}).center(x, y);
            }
            break;
          }
          
          case 'triangle': {
            // 三角形箭头 - 直接绘制垂直方向的三角形
            const arrowWidth = size * 1.2;
            const arrowHeight = size * 2;
            
            if (isUp) {
              // 向上的三角形
              arrow = this.draw.polygon([
                [0, -arrowHeight], // 顶部尖端
                [-arrowWidth/2, 0], // 左下角 
                [arrowWidth/2, 0]   // 右下角
              ]).fill(fillColor).stroke({width: 0}).center(x, y);
            } else {
              // 向下的三角形
              arrow = this.draw.polygon([
                [0, arrowHeight], // 底部尖端
                [-arrowWidth/2, 0], // 左上角 
                [arrowWidth/2, 0]   // 右上角
              ]).fill(fillColor).stroke({width: 0}).center(x, y);
            }
            break;
          }
          
          case 'circle': {
            // 圆形
            arrow = this.draw.circle(size * 2).fill(fillColor).center(x, y);
            break;
          }
          
          case 'square': {
            // 垂直矩形
            arrow = this.draw.rect(size, size * 2).fill(fillColor).center(x, y);
            break;
          }
          
          case 'diamond': {
            // 垂直指向的菱形 - 上下尖角更长
            arrow = this.draw.polygon([
              [0, -size*1.5], // 上尖角
              [size*0.8, 0],  // 右边
              [0, size*1.5],  // 下尖角
              [-size*0.8, 0]  // 左边
            ]).fill(fillColor).stroke({width: 0}).center(x, y);
            break;
          }
          
          default:
            return null;
        }
        
        // 确保箭头在线条之上
        if (arrow) {
          arrow.front();
        }
        
        return arrow;
      } catch (err) {
        return null;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bs-design-wrap {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

/*滚动条样式*/
::v-deep ::-webkit-scrollbar {
  width: 4px;
  border-radius: 4px;
  height: 4px;
}

::v-deep ::-webkit-scrollbar-thumb {
  background: #dddddd !important;
  border-radius: 10px;
}
</style>
