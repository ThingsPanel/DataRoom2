<template>
  <div class="svg-icon-wrapper" :style="wrapperStyle">
    <svg
      :class="getClassName"
      :style="iconStyle"
      aria-hidden="true"
      :stroke-width="strokeWidth"
      :stroke-dasharray="strokeDasharray"
    >
      <use
        :xlink:href="iconName"
        :stroke-width="strokeWidth"
        :stroke-dasharray="strokeDasharray"
      />
    </svg>
    <!-- 文字显示 -->
    <div 
      v-if="showText"
      class="icon-text"
      :style="textStyle"
    >
      {{ config && config.customize && config.customize.text || '' }}
    </div>
  </div>
</template>

<script>
import Icon from './export'
export default {
  name: 'SvgIcon',

  props: {
    config: {
      type: Object,
      default: () => ({})
    },
  },
  mounted() {
    const iconClass = this.config && this.config.customize ? this.config.customize.iconClass : 'check';
  },
  computed: {
    // 从config中获取图标名称
    iconName() {
      const iconClass = this.config && this.config.customize ? this.config.customize.iconClass : 'check';
      return '#icon-' + Icon.getIconByName(iconClass).name;
    },
    // 从config中获取样式
    iconStyle() {
      const color = this.config && this.config.customize ? this.config.customize.color : '#333333';
      return {
        color: color
      }
    },
    // 类名
    getClassName() {
      const iconClass = this.config && this.config.customize ? this.config.customize.iconClass : 'check';
      return [
        'icon-svg',
        `icon-svg__${iconClass}`,
      ]
    },
    // 线条宽度
    strokeWidth() {
      return this.config && this.config.customize && this.config.customize.strokeWidth || 1
    },
    // 虚线样式
    strokeDasharray() {
      return this.config && this.config.customize && this.config.customize.strokeDasharray || ''
    },
    // 是否显示文字
    showText() {
      return this.config && this.config.customize && 
             this.config.customize.showText && 
             this.config.customize.text
    },
    // 文字样式
    textStyle() {
      const textStyle = this.config && this.config.customize && this.config.customize.textStyle || {};
      return {
        color: textStyle.color || '#333333',
        fontSize: textStyle.fontSize || '12px',
        fontWeight: textStyle.fontWeight || 'normal',
      }
    },
    // 容器样式（根据文字位置调整布局）
    wrapperStyle() {
      if (!this.showText) return {};
      
      const textStyle = this.config && this.config.customize && this.config.customize.textStyle || {};
      const position = textStyle.position || 'bottom';
      const offset = textStyle.offset || 5;
      
      // 根据文字位置设置flex方向和间距
      if (position === 'top' || position === 'bottom') {
        return {
          flexDirection: position === 'top' ? 'column-reverse' : 'column',
          gap: `${offset}px`
        }
      } else {
        return {
          flexDirection: position === 'left' ? 'row-reverse' : 'row',
          gap: `${offset}px`,
          alignItems: 'center'
        }
      }
    }
  }
}
</script>

<style scoped>
  .svg-icon-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .icon-svg {
    width: 100%;
    height: 100%;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
    mask-size: cover!important;
    display: inline-block;
  }
  
  .icon-text {
    text-align: center;
    line-height: 1.2;
    white-space: nowrap;
  }
  
  /* 确保SVG元素接收stroke属性 */
  .icon-svg >>> svg, 
  .icon-svg >>> path, 
  .icon-svg >>> g {
    stroke: currentColor;
    vector-effect: non-scaling-stroke; /* 这确保线条宽度不会随缩放变化 */
  }

  /* 强制应用stroke属性到所有SVG元素 */
  .icon-svg >>> use {
    stroke-width: inherit;
    stroke-dasharray: inherit;
  }
</style>
