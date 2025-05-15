<template>
  <svg
    :class="getClassName"
    :style="iconStyle"
    aria-hidden="true"
  >
    <use
      :xlink:href="iconName"
    />
  </svg>
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
    console.log(Icon.getIconByName(this.config?.customize?.iconClass || 'check'))
  },
  computed: {
    // 从config中获取图标名称
    iconName() {
      return `#icon-${ Icon.getIconByName(this.config?.customize?.iconClass || 'check').name }`
    },
    // 从config中获取样式
    iconStyle() {
      const { color } = this.config?.customize || {}
      return {
        color: color || '#333333'
      }
    },
    // 类名
    getClassName() {
      return [
        'icon-svg',
        `icon-svg__${this.config?.customize?.iconClass || 'check'}`,
      ]
    }
    
  }
}
</script>

<style scoped>
  .icon-svg {
    width: 100%;
    height: 100%;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
    mask-size: cover!important;
    display: inline-block;
  }
</style>
