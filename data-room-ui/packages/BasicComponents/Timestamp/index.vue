<template>
  <div
    class="bs-design-wrap"
    :class="`bs-text-${customTheme}`"
  >
    <div
      class="content-box"
      :style="{'text-align': config.customize.align,'font-family': 'ds-digitalbold','font-size': config.customize.fontSize +'px','font-weight': +config.customize.fontWeight,'background-image': `-webkit-linear-gradient(${config.customize.color})`}"
    >
      {{ config.customize.title }}
    </div>
  </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import paramsMixins from 'data-room-ui/js/mixins/paramsMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
export default {
  name: 'Timestamp',
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
    // 格式化时间戳为指定格式
    formatTimestamp (timestamp, format) {
      if (!timestamp) return ''
      
      // 如果是字符串数字，转换为数字
      const ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp
      
      // 如果时间戳长度为10位，转换为13位（毫秒）
      const date = new Date(ts.toString().length === 10 ? ts * 1000 : ts)
      
      if (isNaN(date.getTime())) return timestamp.toString()
      
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      
      return format
        .replace(/YYYY/g, year)
        .replace(/MM/g, month)
        .replace(/DD/g, day)
        .replace(/HH/g, hours)
        .replace(/mm/g, minutes)
        .replace(/ss/g, seconds)
    },
    // 数字转换逻辑：1转为5，0显示0
    transformNumber (value) {
      const str = value.toString()
      if (str === '1') return '5'
      if (str === '0') return '0'
      return str
    },
    changeStyle (config) {
      let title = config.customize.title
      
      // 根据letterSpacing字段（复用作为数字转换开关）决定转换逻辑
      if (config.customize.letterSpacing === true) {
        // 开启数字转换：1转为5，0显示0
        title = this.transformNumber(title)
      } else {
        // 关闭数字转换：使用时间戳转换逻辑
        if (config.customize.fontFamily && title) {
          // 检查是否为时间戳（纯数字且长度为10或13位）
          const titleStr = title.toString()
          if (/^\d{10,13}$/.test(titleStr)) {
            title = this.formatTimestamp(title, config.customize.fontFamily)
          }
        }
      }
      
      config.customize.title = config.customize.thousands ? title?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : title
      this.changeChartConfig(config)
      config = { ...this.config, ...config }
      // 样式改变时更新主题配置
      config.theme = settingToTheme(cloneDeep(config), this.customTheme)
      this.changeChartConfig(config)
      if (config.code === this.activeCode) {
        this.changeActiveItemConfig(config)
      }
      return config
    },
    // 通过表达式计算得来的值
    getDataByExpression (config) {
      const result = new Function('dataset', 'computedDatas', this.config.expression)
      config.customize.title = result(this.dataset, this.computedDatas)
      // 同时将计算得来的值保存到公共的数据存储的地方
      this.updateComputedDatas({ code: config.code, title: config.title, data: config.customize.title })
    },
    dataFormatting (config, data) {
      // 文本数据配置原则：选择数据集则以后端返回的数据为主，否则以设置面板中标题设置为准
      if (config.dataSource.businessKey && config.dataSource.source === 'dataset') {
        let title = data && data.data && data.data.length ? data.data[0][config.dataSource.metricField] : '暂无数据'
        
        // 根据letterSpacing字段（复用作为数字转换开关）决定转换逻辑
        if (title && title !== '暂无数据') {
          if (config.customize.letterSpacing === true) {
            // 开启数字转换：1转为5，0显示0
            title = this.transformNumber(title)
          } else {
            // 关闭数字转换：使用时间戳转换逻辑
            if (config.customize.fontFamily) {
              const titleStr = title.toString()
              if (/^\d{10,13}$/.test(titleStr)) {
                title = this.formatTimestamp(title, config.customize.fontFamily)
              }
            }
          }
        }
        
        config.customize.title = title
        config.option.data = data && data.data && data.data.length ? data.data : []
      }
      return config
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/fonts/numberFont/stylesheet.css";
  .bs-design-wrap{
    width: 100%;
    display: flex;
    align-items: center;
    //justify-content: center;
  }
  .content-box{
    width: 100%;
    text-align: center;
    /* 将背景设为渐变 */
    /*background-image: -webkit-linear-gradient(left, #6294F7, #C85D14);*/
    /* 规定背景绘制区域 */
    -webkit-background-clip: text;
    /* 将文字隐藏 */
    -webkit-text-fill-color: transparent;
  }
</style>
