<template>
  <div class="basic-component-canvas-line">
    <canvas
      ref="canvasLine"
      :width="canvasWidth"
      :height="canvasHeight"
      :style="{
        width: '100%',
        height: '100%'
      }"
    ></canvas>
  </div>
</template>

<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { mapState, mapMutations } from 'vuex'
import { EventBus } from 'data-room-ui/js/utils/eventBus'

export default {
  name: 'BasicComponentCanvasLine',
  mixins: [commonMixins],
  computed: {
    ...mapState({
      chartList: state => state.bigScreen.pageInfo.chartList,
      scale: state => state.bigScreen.zoom / 100
    }),
    canvasWidth() {
      // 添加防御性检查，确保customize对象存在
      if (!this.config || !this.config.customize) {
        return 100; // 默认宽度
      }
      return Math.max(
        isNaN(this.config.customize.endX) ? 0 : this.config.customize.endX, 
        isNaN(this.config.customize.startX) ? 0 : this.config.customize.startX
      ) + 20;
    },
    canvasHeight() {
      // 添加防御性检查，确保customize对象存在
      if (!this.config || !this.config.customize) {
        return 100; // 默认高度
      }
      return Math.max(
        isNaN(this.config.customize.endY) ? 0 : this.config.customize.endY, 
        isNaN(this.config.customize.startY) ? 0 : this.config.customize.startY
      ) + 20;
    }
  },
  props: {
    // 卡片的属性
    config: {
      type: Object,
      default: () => ({
        customize: {
          startX: 0,
          startY: 0,
          endX: 100,
          endY: 100,
          lineWidth: 2,
          lineColor: '#409EFF',
          lineStyle: 'solid',
          arrowType: 'none',
          autoSize: true
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
      isInitialized: false
    };
  },
  watch: {
    'config.customize': {
      handler(newVal, oldVal) {
        if (!newVal) return; // 如果customize不存在，直接返回
        
        this.$nextTick(() => {
          this.drawLine();
          
          // 确保组件已初始化且customize对象存在
          if (this.isInitialized && newVal && oldVal && newVal.autoSize && 
              (newVal.startX !== oldVal.startX || 
               newVal.startY !== oldVal.startY || 
               newVal.endX !== oldVal.endX || 
               newVal.endY !== oldVal.endY)) {
            this.updateComponentSize();
          }
        });
      },
      deep: true,
      immediate: true
    },
    selected(val) {
      if (val && this.isInitialized) {
        this.updateComponentSize();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 确保config和customize对象都存在
      if (this.config && this.config.customize) {
        this.drawLine();
        
        // 确保customize中有必要的属性
        if (!this.config.customize.hasOwnProperty('autoSize')) {
          this.$set(this.config.customize, 'autoSize', true);
        }
        
        // 初始加载时更新一次尺寸
        if (this.config.customize.autoSize) {
          this.updateComponentSize();
        }
        
        // 标记组件已初始化
        this.isInitialized = true;
        
        // 监听画布缩放事件
        EventBus.$on('canvas-zoom-change', this.handleCanvasZoom);
      }
    });
  },
  beforeDestroy() {
    // 移除事件监听
    EventBus.$off('canvas-zoom-change', this.handleCanvasZoom);
  },
  methods: {
    ...mapMutations('bigScreen', [
      'changeChartConfig',
      'changeActiveItemConfig',
      'changeActiveItemWH'
    ]),
    
    // 处理画布缩放变化
    handleCanvasZoom() {
      this.$nextTick(() => {
        if (this.config && this.config.customize) {
          this.drawLine();
          if (this.config.customize.autoSize) {
            this.updateComponentSize();
          }
        }
      });
    },
    
    drawLine() {
      const canvas = this.$refs.canvasLine;
      if (!canvas || !this.config || !this.config.customize) return;
      
      const ctx = canvas.getContext('2d');
      const customize = this.config.customize;
      const startX = isNaN(customize.startX) ? 0 : customize.startX;
      const startY = isNaN(customize.startY) ? 0 : customize.startY;
      const endX = isNaN(customize.endX) ? 100 : customize.endX;
      const endY = isNaN(customize.endY) ? 100 : customize.endY;
      const lineWidth = isNaN(customize.lineWidth) ? 2 : customize.lineWidth;
      const lineColor = customize.lineColor || '#409EFF';
      const lineStyle = customize.lineStyle || 'solid';
      const arrowType = customize.arrowType || 'none';
      
      // 计算实际的画布宽高
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      
      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 设置线条样式
      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      
      // 设置线条样式（实线、虚线、点线等）
      if (lineStyle === 'dashed') {
        ctx.setLineDash([5, 5]);
      } else if (lineStyle === 'dotted') {
        ctx.setLineDash([2, 2]);
      } else {
        ctx.setLineDash([]);
      }
      
      // 绘制线条
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // 如果需要绘制箭头
      if (arrowType !== 'none') {
        this.drawArrow(ctx, startX, startY, endX, endY, arrowType);
      }
    },
    
    drawArrow(ctx, fromX, fromY, toX, toY, arrowType) {
      if (!this.config || !this.config.customize) return;
      
      const lineWidth = isNaN(this.config.customize.lineWidth) ? 2 : this.config.customize.lineWidth;
      const headLength = Math.max(10, lineWidth * 4);  // 箭头长度与线宽关联
      const angle = Math.atan2(toY - fromY, toX - fromX);
      
      // 根据箭头类型绘制不同的箭头
      if (arrowType === 'start' || arrowType === 'both') {
        // 绘制起点箭头
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(fromX + headLength * Math.cos(angle - Math.PI / 6), fromY + headLength * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(fromX + headLength * Math.cos(angle + Math.PI / 6), fromY + headLength * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
      }
      
      if (arrowType === 'end' || arrowType === 'both') {
        // 绘制终点箭头
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
      }
    },
    
    // 更新组件尺寸
    updateComponentSize() {
      if (!this.config || !this.config.customize || !this.config.customize.autoSize) return;
      
      // 计算组件所需的实际宽高
      const newWidth = this.canvasWidth;
      const newHeight = this.canvasHeight;
      
      // 直接更新组件配置
      this.changeChartConfig({
        ...this.config,
        w: newWidth,
        h: newHeight
      });
      
      // 如果当前组件是活动状态，同步更新右侧面板显示
      if (this.selected) {
        this.changeActiveItemConfig({
          ...this.config,
          w: newWidth,
          h: newHeight
        });
        
        this.changeActiveItemWH({
          code: this.config.code,
          w: newWidth,
          h: newHeight
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-component-canvas-line {
  width: 100%;
  height: 100%;
  overflow: visible;
  position: relative;
}
</style>
