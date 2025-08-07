<!--
 * @description: 渲染组件
 * @Date: 2022-08-18 09:42:45
 * @Author: xingheng
-->

<template>
  <div 
    class="render-item-wrap"
    :class="{'special-wrap': isSpecialType}"
    @contextmenu="onContextmenu($event, config)"
  >
    <component
      :is="resolveComponentType(config.type)"
      :id="`${config.code}`"
      :ref="config.code"
      :key="config.key"
      :config="config"
      @styleHandler="styleHandler"
    />
  </div>
</template>
<script>
// import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { mapMutations } from 'vuex'
import { resolveComponentType } from 'data-room-ui/js/utils'
import pcComponent from 'data-room-ui/js/utils/componentImport'
import { dataInit, destroyedEvent } from 'data-room-ui/js/utils/eventBus'
import chartContextMenu from 'data-room-ui/js/mixins/chartContextMenu'
import CustomComponent from '../PlotRender/index.vue'
import Svgs from '../Svgs/index.vue'
import EchartsComponent from '../EchartsRender/index.vue'
import RemoteComponent from 'data-room-ui/RemoteComponents/index.vue'
import Map from 'data-room-ui/BasicComponents/Map/index.vue'
import FlyMap from 'data-room-ui/BasicComponents/FlyMap/index.vue'
import candlestick from 'data-room-ui/BasicComponents/Candlestick/index.vue'
import BasicComponentFabricLine from '../BasicComponents/FabricLine/index.vue'

const components = {}
for (const key in pcComponent) {
  if (Object.hasOwnProperty.call(pcComponent, key)) {
    components[key] = pcComponent[key]
  }
}
export default {
  name: 'RenderCard',
  // mixins: [commonMixins],
  mixins: [chartContextMenu],
  components: {
    ...components,
    CustomComponent,
    Svgs,
    Map,
    FlyMap,
    candlestick,
    RemoteComponent,
    EchartsComponent,
    BasicComponentFabricLine
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
    return {}
  },
  computed: {
    // 判断是否为特殊类型
    isSpecialType() {
      return this.config.type === 'svgLine' || this.config.type === 'canvasLine' || this.config.type === 'fabricLine';
    }
  },
  mounted () {
    // 调用初始化方法
    dataInit(this)
  },
  beforeDestroy () {
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
    }
    // // 打开右侧面板
    // openRightPanel () {
    //   this.$emit('openRightPanel', this.currentChart)
    // }
  }
}
</script>

<style lang="scss" scoped>
.render-item-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  
  // 特殊类型组件样式
  &.special-wrap {
    overflow: visible;
    border: none;
  }
}
</style>
