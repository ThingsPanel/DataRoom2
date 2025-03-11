<template>
  <div
    style="width: 100%; height: 100%"
    class="bs-design-wrap"
  >
    <div
      :key="updateKey"
      class="custom-border-box"
      :style="{
        opacity: opacity,
        'background-image': `linear-gradient(${gradientDirection}, ${
          gradientColor0 ? gradientColor0 : gradientColor1
        } , ${gradientColor1 ? gradientColor1 : gradientColor0})`
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
    gradientColor0 () {
      return this.config.customize.gradientColor0 || ''
    },
    gradientColor1 () {
      return this.config.customize.gradientColor1 || ''
    },
    gradientDirection () {
      return this.config.customize.gradientDirection || 'to right'
    },
    opacity () {
      return this.config.customize.opacity || 100
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
  border-radius: 4px;
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