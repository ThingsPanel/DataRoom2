<!--
 * @description: 渲染组件
 * @Date: 2022-08-18 09:42:45
 * @Author: xingheng
-->

<template>
  <div class="content">
    <!-- 旋转控制器 -->
    <div 
      v-if="isSelected" 
      class="rotate-handler"
      @mousedown.stop="startRotate"
    >
      <i class="el-icon-refresh-right"></i>
    </div>

    <component
      :is="resolveComponentType(config.border.type)"
      v-if="config.border&&config.border.type"
      :id="`border${config.code}`"
      :ref="`border${config.code}`"
      :key="`border${config.key}`"
      :config="config"
    />
    <div
      class="render-item-wrap"
      :style="wrapStyle"
    >
      <component
        :is="resolveComponentType(config.type)"
        :id="`${config.code}`"
        :ref="config.code"
        :key="config.key"
        :config="config"
        :selected="isSelected"
        @styleHandler="styleHandler"
        @error="handleError"
      />
    </div>
  </div>
</template>
<script>
// import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { mapMutations } from 'vuex'
import { resolveComponentType } from 'data-room-ui/js/utils'
import pcComponent from 'data-room-ui/js/utils/componentImport'
import { dataInit, destroyedEvent } from 'data-room-ui/js/utils/eventBus'
import CustomComponent from '../PlotRender/index.vue'
import EchartsComponent from '../EchartsRender/index.vue'
import Svgs from '../Svgs/index.vue'
import RemoteComponent from 'data-room-ui/RemoteComponents/index.vue'
const components = {}
for (const key in pcComponent) {
  if (Object.hasOwnProperty.call(pcComponent, key)) {
    components[key] = pcComponent[key]
  }
}
export default {
  name: 'RenderCard',
  // mixins: [commonMixins],
  components: {
    ...components,
    CustomComponent,
    Svgs,
    RemoteComponent,
    EchartsComponent
  },
  props: {
    // 卡片的属性
    config: {
      type: Object,
      default: () => ({})
    },
    ruleKey: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      height: 0,
      isRotating: false,
      startAngle: 0,
      currentRotateZ: 0
    }
  },
  computed: {
    // 添加计算属性判断当前组件是否被选中
    isSelected() {
      return this.$store.state.bigScreen.activeCodes.includes(this.config.code);
    },
    wrapStyle() {
      return this.getWrapStyle()
    }
  },
  mounted () {
    // 调用初始化方法
    dataInit(this)
  },
  beforeDestroy () {
    // 清理事件监听
    document.removeEventListener('mousemove', this.handleRotate)
    document.removeEventListener('mouseup', this.stopRotate)
    destroyedEvent()
  },
  methods: {
    ...mapMutations('bigScreen', [
      'changeChartConfig'
    ]),
    resolveComponentType,
    // 切换主题时针对远程组件触发样式修改的方法
    styleHandler (config) {
      this.$emit('styleHandler', config)
    },
    startRotate (e) {
      e.preventDefault()
      this.isRotating = true
      
      // 获取元素中心点
      const rect = this.$el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // 计算初始角度
      this.startAngle = Math.atan2(
        e.clientY - centerY,
        e.clientX - centerX
      ) * 180 / Math.PI
      
      // 获取当前旋转角度
      this.currentRotateZ = this.config.rotateZ || 0

      // 添加事件监听
      document.addEventListener('mousemove', this.handleRotate)
      document.addEventListener('mouseup', this.stopRotate)
    },
    handleRotate (e) {
      if (!this.isRotating) return

      // 获取元素中心点
      const rect = this.$el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // 计算当前角度
      const angle = Math.atan2(
        e.clientY - centerY,
        e.clientX - centerX
      ) * 180 / Math.PI

      // 计算角度差
      let deltaAngle = angle - this.startAngle
      
      // 更新组件配置
      const newRotateZ = (this.currentRotateZ + deltaAngle) % 360
      this.changeChartConfig({
        ...this.config,
        rotateZ: newRotateZ
      })
    },
    stopRotate () {
      this.isRotating = false
      document.removeEventListener('mousemove', this.handleRotate)
      document.removeEventListener('mouseup', this.stopRotate)
    },
    handleError(error) {
      console.warn('Chart render error:', error)
      // 可以在这里添加错误处理逻辑，比如显示错误提示或重置图表
    },
    getWrapStyle() {
      try {
        return {
          height: `calc(100% - ${this.getTitleHeight()}px)`,
          padding: this.getPadding()
        }
      } catch (error) {
        console.warn('Style calculation error:', error)
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;

  // 添加旋转按钮样式
  .rotate-handler {
    position: absolute;
    top: -24px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 24px;
    background-color: var(--bs-el-color-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999;
    
    i {
      color: #fff;
      font-size: 16px;
    }

    &:hover {
      background-color: var(--bs-el-color-primary-light-3);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 6px;
      background-color: var(--bs-el-color-primary);
    }
  }
}
.render-item-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  padding-bottom: 15px;
}
</style>
