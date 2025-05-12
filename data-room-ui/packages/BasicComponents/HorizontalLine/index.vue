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
// Assuming animationUtils.js is in a path accessible like this
// Adjust the path if it's different or if you move animationUtils to a shared location
import { startDropletAnimation, startFlowAnimation } from '../FabricLine/utils/animationUtils.js'

export default {
  name: 'HorizontalLine',
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
      svgWidth: 0,
      svgHeight: 0,
      animationElements: [],
      animationRunners: [],
      resizeObserver: null,
      resizeTimer: null // 添加防抖定时器
    }
  },
  computed: {
    // Overall component opacity
    opacity () {
      return this.config.customize.opacity !== undefined ? this.config.customize.opacity : 1;
    },
    // Line specific properties
    lineColor () {
      return this.config.customize.lineColor || '#188df0';
    },
    lineWidth () {
      return this.config.customize.lineWidth || 4;
    },
    // Dash properties
    enableLineDash () {
      return this.config.customize.enableLineDash || false;
    },
    lineDashValue () {
      return this.config.customize.lineDashValue || 5;
    },
    lineGapValue () {
      return this.config.customize.lineGapValue || 5;
    },
    // Animation properties - adapted from FabricLine
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
      return this.config.customize.flowColor || this.lineColor; // Default to line color
    },
    flowThickness() {
      return this.config.customize.flowThickness || this.lineWidth;
    },
    flowDensity() {
      const density = this.config.customize.flowDensity;
      return typeof density === 'number' && density > 0 ? density : 10;
    }
  },
  watch: {
    opacity () { this.updateStyle() },
    lineColor () { this.updateLineStyle() },
    lineWidth () { this.updateLineStyle(); this._updateAnimation(); }, // Width change might affect flow anim
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
    'config.h': 'debouncedHandleResize'
  },
  mounted () {
    this.$nextTick(() => {
      this.initSvg();
      this.handleResize(); // Initial draw
      this.setupResizeObserver();
    });
  },
  beforeDestroy() {
    this._clearAnimation();
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
        console.warn('HorizontalLine: svgContainer ref not found');
        return;
      }
      console.log('HorizontalLine: initSvg - config:', this.config);
      try {
        // 检查是否已经存在 SVG 实例
        if (this.draw) {
          console.log('HorizontalLine: SVG instance already exists, removing it first');
          this._clearAnimation();
          this.draw.remove();
          this.draw = null;
        }
        
        // 创建新的 SVG 实例
        this.draw = SVG().addTo(this.$refs.svgContainer).size('100%', '100%');
        
        // 确保容器尺寸已更新
        this.svgWidth = this.$refs.svgContainer.clientWidth;
        this.svgHeight = this.$refs.svgContainer.clientHeight;
        
        // 创建线条
        this.line = this.draw.line(0, this.svgHeight / 2, this.svgWidth, this.svgHeight / 2)
          .attr({ 
            'stroke-linecap': 'butt',
            'shape-rendering': 'auto', // 使用auto而不是optimizeSpeed，提高渲染质量
            'vector-effect': 'non-scaling-stroke'
          });
          
        console.log('HorizontalLine: SVG initialized - draw:', this.draw, 'line:', this.line);
        this.updateLineStyle();
        
        // 初始化后启动动画
        this._updateAnimation();
      } catch (err) {
        console.error('HorizontalLine: Failed to initialize SVG:', err);
      }
    },
    updateLinePath() {
      if (!this.line || !this.draw) {
        console.warn('HorizontalLine: updateLinePath - line or draw is null');
        return;
      }
      console.log(`HorizontalLine: updateLinePath - svgWidth: ${this.svgWidth}, svgHeight: ${this.svgHeight}`);
      try {
        const yPos = this.svgHeight / 2;
        this.line.plot(0, yPos, this.svgWidth, yPos);
        // 添加平滑渲染提示，减少卡顿
        this.line.attr({
          'shape-rendering': 'auto',
          'vector-effect': 'non-scaling-stroke'
        });
        console.log('HorizontalLine: Line after plot:', this.line.attr(['x1', 'y1', 'x2', 'y2']));
      } catch (err) {
        console.error('HorizontalLine: Failed to update line path:', err);
        // 如果更新路径失败，尝试重新创建线条
        try {
          if (this.line) this.line.remove();
          this.line = this.draw.line(0, this.svgHeight / 2, this.svgWidth, this.svgHeight / 2)
            .attr({ 
              'stroke-linecap': 'butt',
              'shape-rendering': 'auto',
              'vector-effect': 'non-scaling-stroke'
            });
          this.updateLineStyle();
        } catch (e) {
          console.error('HorizontalLine: Failed to recreate line:', e);
        }
      }
    },
    updateLineStyle() {
      if (!this.line) {
        console.warn('HorizontalLine: updateLineStyle - line is null');
        return;
      }
      console.log('HorizontalLine: updateLineStyle - config:', this.config);
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
        console.log('HorizontalLine: Line after stroke:', this.line.attr(['stroke', 'stroke-width', 'stroke-dasharray']));
      } catch (err) {
        console.error('HorizontalLine: Failed to update line style:', err);
      }
    },
    updateStyle(){
      // Opacity is handled by style binding on the root div
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
        console.warn('HorizontalLine: handleResize - svgContainer ref not found');
        return;
      }
      
      const newWidth = this.$refs.svgContainer.clientWidth;
      const newHeight = this.$refs.svgContainer.clientHeight;

      console.log(`HorizontalLine: handleResize - newWidth: ${newWidth}, newHeight: ${newHeight}, old svgWidth: ${this.svgWidth}, old svgHeight: ${this.svgHeight}`);
      
      // 检查尺寸是否有效
      if (newWidth <= 0 || newHeight <= 0) {
        console.warn(`HorizontalLine: handleResize detected invalid dimensions: ${newWidth}x${newHeight}, skipping update`);
        return;
      }

      // 检查尺寸是否实际变化
      if (newWidth === this.svgWidth && newHeight === this.svgHeight) {
        console.log('HorizontalLine: handleResize - dimensions unchanged, skipping update');
        return;
      }

      this.svgWidth = newWidth;
      this.svgHeight = newHeight;
      
      // 确保 SVG 实例存在
      if (!this.draw) {
        console.warn("HorizontalLine: handleResize - SVG instance missing, reinitializing");
        return this.initSvg();
      }
      
      try {
        // 更新 SVG 画布大小
        this.draw.size(this.svgWidth, this.svgHeight);
        console.log('HorizontalLine: SVG size updated:', this.draw.attr(['width', 'height']));
        
        // 确保线条存在
        if (!this.line) {
          console.warn("HorizontalLine: handleResize - line is missing, creating new line");
          this.line = this.draw.line(0, this.svgHeight / 2, this.svgWidth, this.svgHeight / 2)
            .attr({ 'stroke-linecap': 'butt' });
          this.updateLineStyle();
        } else {
          // 更新线条路径
          this.updateLinePath();
        }
        
        // 更新动画
        this._updateAnimation();
      } catch (err) {
        console.error('HorizontalLine: Failed to update SVG during resize:', err);
        // 如果更新失败，尝试完全重新初始化
        this._clearAnimation();
        if (this.draw) {
          try {
            this.draw.remove();
          } catch (e) {
            console.error('HorizontalLine: Error removing draw:', e);
          }
          this.draw = null;
        }
        this.initSvg();
      }
    },
    setupResizeObserver() {
      if (!this.$refs.svgContainer) {
        console.warn('HorizontalLine: setupResizeObserver - svgContainer ref not found');
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
        console.log('HorizontalLine: ResizeObserver setup successfully');
      } catch (err) {
        console.error('HorizontalLine: Failed to setup ResizeObserver:', err);
        // 降级处理：如果ResizeObserver不可用，使用window resize事件
        window.addEventListener('resize', this.debouncedHandleResize);
      }
    },

    // Animation methods (adapted from FabricLine/index.vue)
    _clearAnimation() {
      this.animationRunners.forEach(runner => {
        if (runner && typeof runner.cancel === 'function') {
          try {
            runner.cancel();
          } catch (e) {
            console.error('HorizontalLine: Error canceling animation runner:', e);
          }
        }
      });
      this.animationRunners = [];
      
      this.animationElements.forEach(el => {
        if (el && typeof el.remove === 'function') {
          try {
            el.remove();
          } catch (e) {
            console.error('HorizontalLine: Error removing animation element:', e);
          }
        }
      });
      this.animationElements = [];
    },
    _updateAnimation() {
      console.log('HorizontalLine: _updateAnimation called - draw exists:', !!this.draw, 'line exists:', !!this.line);
      if (!this.draw || !this.line) {
        console.warn('HorizontalLine: _updateAnimation - draw or line is null, clearing animation');
        return this._clearAnimation();
      }
      
      // 清除现有动画
      this._clearAnimation();

      if (!this.animationActive || this.animationType === 'none') {
        console.log('HorizontalLine: _updateAnimation - animation not active or type is none');
        return;
      }

      // 确保线条有有效的路径/长度用于动画
      if (this.lineWidth <= 0 || this.svgWidth <= 0 || this.svgHeight <= 0) {
        console.warn('HorizontalLine: _updateAnimation - invalid dimensions:', { 
          lineWidth: this.lineWidth, 
          svgWidth: this.svgWidth,
          svgHeight: this.svgHeight
        });
        return;
      }

      // 优化：避免在小尺寸下启动动画，减少卡顿
      if (this.svgWidth < 50) {
        console.warn('HorizontalLine: _updateAnimation - component too small for animation');
        return;
      }

      console.log('HorizontalLine: Starting animation with config:', {
        animationActive: this.animationActive,
        animationType: this.animationType,
        animationDirection: this.animationDirection,
        animationSpeed: this.animationSpeed,
        animationLoop: this.animationLoop
      });

      // 确保速度设置正确传递给动画函数
      // 直接使用原始速度值，不再进行额外的调整
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

      // 打印实际传递的速度值，用于调试
      console.log('HorizontalLine: Actual animation speed passed to animation function:', this.animationSpeed);

      let animationResult = { elements: [], runners: [] };

      try {
        // 确保SVG.js已正确加载
        if (!this.draw.circle) {
          console.error('HorizontalLine: SVG.js not properly loaded, draw.circle method missing');
          return;
        }
        
        // 测试创建一个简单的圆形，确认SVG绘图功能正常
        const testCircle = this.draw.circle(5).fill('#ff0000').move(-10, -10);
        testCircle.remove();
        console.log('HorizontalLine: SVG drawing test successful');
        
        switch (this.animationType) {
          case 'droplet':
            animationResult = startDropletAnimation(this.draw, this.line, animationConfig);
            break;
          case 'flow':
            // 直接在此处调试流水动画
            console.log('HorizontalLine: Creating flow animation with line:', 
              this.line.attr(['x1', 'y1', 'x2', 'y2']), 
              'type:', this.line.type);
              
            animationResult = startFlowAnimation(this.draw, this.line, animationConfig);
            break;
        }
        console.log('HorizontalLine: Animation result:', {
          elementsCount: animationResult.elements?.length,
          runnersCount: animationResult.runners?.length
        });

        if (!animationResult.elements?.length) {
          console.warn('HorizontalLine: Animation returned no elements');
        }

        this.animationElements = animationResult.elements || [];
        this.animationRunners = animationResult.runners || [];

        if (this.animationElements.length > 0) {
          this.animationElements.forEach(el => {
            if (el && typeof el.front === 'function') {
              try {
                el.front();
              } catch (e) {
                console.error('HorizontalLine: Error calling front() on animation element:', e);
              }
            }
          });
          if (this.line) {
            try {
              this.line.back();
            } catch (e) {
              console.error('HorizontalLine: Error calling back() on line:', e);
            }
          }
        }
      } catch (e) {
        console.error('HorizontalLine: Error in _updateAnimation:', e);
        this._clearAnimation();
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
</style>
