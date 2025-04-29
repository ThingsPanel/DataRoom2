<template>
  <div
    style="width: 100%; height: 100%"
    class="bs-design-wrap"
    :style="{ padding: paddingStyle }"
  >
    <div
      :key="updateKey"
      class="custom-border-box"
      :style="{
        opacity: opacity,
        'background-color': colorType === 'single' ? backgroundColor : 'transparent',
        'background-image': colorType === 'gradient' ? `linear-gradient(${gradientDirection}, ${gradientColor0}, ${gradientColor1})` : 'none',
        'border-radius': `${borderRadiusTopLeft}px ${borderRadiusTopRight}px ${borderRadiusBottomRight}px ${borderRadiusBottomLeft}px`,
        'box-shadow': boxShadow
      }"
    />
  </div>
</template>

<script>
import { refreshComponentMixin } from 'data-room-ui/js/mixins/refreshComponent'

export default {
  name: 'Rectangle',
  components: {},
  mixins: [refreshComponentMixin],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    colorType () {
      return this.config.customize.colorType || 'gradient'
    },
    backgroundColor () {
      return this.config.customize.backgroundColor || '#007aff'
    },
    gradientColor0 () {
      return this.config.customize.gradientColor0 || '#83bff6'
    },
    gradientColor1 () {
      return this.config.customize.gradientColor1 || '#188df0'
    },
    gradientDirection () {
      return this.config.customize.gradientDirection || 'to right'
    },
    opacity () {
      const op = this.config.customize.opacity
      return typeof op === 'number' ? Math.min(Math.max(op, 0), 1) : 1
    },
    borderRadiusTopLeft () {
      return this.config.customize.borderRadiusTopLeft || 0
    },
    borderRadiusTopRight () {
      return this.config.customize.borderRadiusTopRight || 0
    },
    borderRadiusBottomLeft () {
      return this.config.customize.borderRadiusBottomLeft || 0
    },
    borderRadiusBottomRight () {
      return this.config.customize.borderRadiusBottomRight || 0
    },
    boxShadow () {
      return this.config.customize.boxShadow || 'none'
    },
    paddingTop () {
      return this.config.customize.paddingTop || 0
    },
    paddingRight () {
      return this.config.customize.paddingRight || 0
    },
    paddingBottom () {
      return this.config.customize.paddingBottom || 0
    },
    paddingLeft () {
      return this.config.customize.paddingLeft || 0
    },
    paddingStyle () {
      return `${this.paddingTop}px ${this.paddingRight}px ${this.paddingBottom}px ${this.paddingLeft}px`
    }
  }
}
</script>

<style lang="scss" scoped>
.bs-design-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
  box-sizing: border-box;

  .custom-border-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
  }
}
</style> 