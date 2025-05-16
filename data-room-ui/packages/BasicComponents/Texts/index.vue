<template>
  <div 
    class="bs-text-wrapper"
    :class="`bs-text-${customTheme}`"
  >
    <div
      class="content-box"
      :style="getContentStyle()"
    >
      <template v-if="config.customize.visible !== false">
        {{ config.customize.title }}
      </template>
      <template v-else>&nbsp;</template>
    </div>
  </div>
</template>
<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import paramsMixins from 'data-room-ui/js/mixins/paramsMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
export default {
  name: 'Texts',
  components: {},
  mixins: [paramsMixins, commonMixins, linkageMixins],
  props: {
    // 卡片的属性
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      customClass: {}
    }
  },

  computed: {
  },
  mounted () {
    this.chartInit()
  },
  methods: {
    // 获取内容样式，包括文字样式和背景色
    getContentStyle() {
      const style = {
        'text-align': this.config.customize.align,
        'letter-spacing': this.config.customize.letterSpacing +'px',
        'font-family': this.config.customize.fontFamily,
        'font-size': this.config.customize.fontSize +'px',
        'font-weight': +this.config.customize.fontWeight,
        'background-image': `-webkit-linear-gradient(${this.config.customize.color})`,
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent'
      }
      
      // 处理背景变色逻辑
      if (this.config.customize.isBackgroundColorChange) {
        const value = String(this.config.customize.title).trim()
        if (value === '1') {
          style['background-color'] = '#E53E3E'
          style['background-image'] = 'none'
          style['-webkit-background-clip'] = 'border-box'
          style['border-radius'] = '4px'
          style['padding'] = '0 8px'
          style['display'] = 'inline-block' // 使用inline-block保持行内特性但可设置内边距
          
          // 文字可见时才设置文字颜色
          if (this.config.customize.visible !== false) {
            style['-webkit-text-fill-color'] = 'white'
            style['color'] = 'white'
          } else {
            // 文字隐藏但保留背景
            style['min-width'] = '30px'
            // 不设置高度，使用padding代替
            style['padding-top'] = '2px'
            style['padding-bottom'] = '2px'
          }
        } else if (value === '0') {
          style['background-color'] = '#38A169'
          style['background-image'] = 'none'
          style['-webkit-background-clip'] = 'border-box'
          style['border-radius'] = '4px'
          style['padding'] = '0 8px'
          style['display'] = 'inline-block' // 使用inline-block保持行内特性但可设置内边距
          
          // 文字可见时才设置文字颜色
          if (this.config.customize.visible !== false) {
            style['-webkit-text-fill-color'] = 'white'
            style['color'] = 'white'
          } else {
            // 文字隐藏但保留背景
            style['min-width'] = '30px'
            // 不设置高度，使用padding代替
            style['padding-top'] = '2px'
            style['padding-bottom'] = '2px'
          }
        }
      } else if (this.config.customize.visible === false) {
        // 当文字隐藏且没有开启背景变色时，只保留一个占位符
        style['display'] = 'inline' // 保持行内特性
      }
      
      return style
    },
    // 通过表达式计算得来的值
    getDataByExpression (config) {
      // 如果表达式是由其他组件的值构成的
      // eslint-disable-next-line no-new-func
      try {
        const result = new Function('dataset', 'computedDatas', this.config.expression)
        config.customize.title = result(this.dataset, this.computedDatas)
      } catch (e) {

      }
      // 同时将计算得来的值保存到公共的数据存储的地方
      this.updateComputedDatas({ code: config.code, title: config.title, data: config.customize.title })
      // this.changeChartConfig(config)
      // }
    },
    dataFormatting (config, data) {
      // 文本数据配置原则：选择数据集则以后端返回的数据为主，否则以设置面板中标题设置为准
      if (config.dataSource.businessKey && config.dataSource.source === 'dataset') {
        config.customize.title = data && data.data && data.data.length ? data.data[0][config.dataSource.metricField] : '暂无数据'
        config.option.data = data && data.data && data.data.length ? data.data : []
      }
      return config
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/fonts/numberFont/stylesheet.css";
  .bs-text-wrapper {
    /* 不设置固定宽度，让内容自适应 */
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .content-box {
    width: 100%;
    height: 100%;
    /* 只保留基本样式，其他通过内联样式控制 */
  }
</style>
