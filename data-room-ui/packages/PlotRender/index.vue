<template>
  <div
    style="width: 100%;height: 100%"
    class="bs-design-wrap bs-custom-component"
    :class="{'light-theme':customTheme === 'light','auto-theme':customTheme !=='light'}"
  >
    <div
      :id="chatId"
      style="width: 100%;height: 100%"
    />
    <!--    <span style="color:#ffffff">{{config.option.data}}</span>-->
  </div>
</template>
<script>
import 'insert-css'
import cloneDeep from 'lodash/cloneDeep'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { mapState, mapMutations } from 'vuex'
import * as g2Plot from '@antv/g2plot'
import plotList, { getCustomPlots } from '../G2Plots/plotList'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import _ from 'lodash'

export default {
  name: 'PlotCustomComponent',
  mixins: [commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      chart: null,
      hasData: false,
      plotList,
      isDataHandlerExecuted: false
    }
  },
  computed: {
    ...mapState('bigScreen', {
      pageInfo: state => state.pageInfo,
      customTheme: state => state.pageInfo.pageConfig.customTheme,
      activeCode: state => state.activeCode
    }),
    chatId () {
      let prefix = 'chart_'
      if (this.$route.path === window?.BS_CONFIG?.routers?.previewUrl) {
        prefix = 'preview_chart_'
      }

      if (this.$route.path === window?.BS_CONFIG?.routers?.designUrl) {
        prefix = 'design_chart_'
      }

      if (this.$route.path === window?.BS_CONFIG?.routers?.pageListUrl) {
        prefix = 'management_chart_'
      }
      return prefix + this.config.code
    }
  },
  created () {
    this.plotList = [...this.plotList, ...getCustomPlots()]
  },
  watch: {
    // 监听主题变化手动触发组件配置更新
    'config.option.theme': {
      handler (val) {
        if (val) {
          this.changeStyle(this.config, true)
        }
      }
    }
  },
  mounted () {
  },
  beforeDestroy () {
    if (this.chart) {
      this.chart.destroy()
    }
  },
  methods: {
    ...mapMutations('bigScreen', ['changeChartConfig', 'changeActiveItemConfig', 'changeChartLoading']),
    chartInit () {
      let config = this.config
      // key和code相等，说明是一进来刷新，调用list接口
      if (this.config.code === this.config.key || this.isPreview) {
        // 改变样式
        config = this.changeStyle(config)
        // 改变数据
        config.loading = true
        this.changeChartLoading(config)
        this.changeDataByCode(config).then((res) => {
          // 初始化图表
          config.loading = false
          this.changeChartLoading(config)
          this.newChart(res)
        }).catch(() => {
        })
      } else {
        config.loading = true
        this.changeChartLoading(config)
        // 否则说明是更新，这里的更新只指更新数据（改变样式时是直接调取changeStyle方法），因为更新数据会改变key,调用chart接口
        this.changeData(config).then((res) => {
          config.loading = false
          this.changeChartLoading(config)
          // 初始化图表
          this.newChart(res)
        })
      }
    },
    /**
     * 构造chart
     */
    newChart (config) {
      console.log('newChart初始配置:', JSON.stringify(config.option))
      // 确保在这里执行一次dataHandler
      if (config.dataHandler && !this.isDataHandlerExecuted) {
        try {
          console.log('在newChart中执行dataHandler')
          // 这些变量是为了dataHandler脚本使用
          // eslint-disable-next-line no-unused-vars
          const option = config.option
          // eslint-disable-next-line no-unused-vars
          const setting = config.setting
          // eslint-disable-next-line no-unused-vars
          const data = config.option.data || []
          eval(config.dataHandler)
          this.isDataHandlerExecuted = true
          console.log('dataHandler执行后的配置:', JSON.stringify(config.option))
        } catch (e) {
          console.error('执行dataHandler失败:', e)
        }
      }
      this.chart = new g2Plot[config.chartType](this.chatId, {
        renderer: 'svg',
        // 仪表盘缩放状态下，点击准确
        supportCSSTransform: true,
        ...config.option
      })
      this.chart.render()
      this.registerEvent()
    },
    /**
     * 注册事件
     */
    registerEvent () {
      // 在事件注册后重置标志，以便改变数据时再次执行脚本
      this.isDataHandlerExecuted = false
      // 图表添加事件进行数据联动
      let formData = {}
      // eslint-disable-next-line no-unused-vars
      this.chart.on('tooltip:change', (...args) => {
        formData = {}
        formData = cloneDeep(args[0].data.items[0].data)
      })
      // eslint-disable-next-line no-unused-vars
      this.chart.on('plot:click', (...args) => {
        this.linkage(formData)
      })
    },
    // 将config.setting的配置转化为option里的配置，这里之所以将转化的方法提出来，是因为在改变维度指标和样式的时候都需要转化
    transformSettingToOption (config, type) {
      let option = null
      config.setting.forEach(set => {
        if (set.optionField) {
          // 例 point.style.fill
          const optionField = set.optionField.split('.')
          // 例 [point,style,fill]
          option = config.option
          optionField.forEach((field, index) => {
            if (index === optionField.length - 1) {
              // 数据配置时，必须有值才更新
              if ((set.tabName === type && type === 'data' && set.value) || (set.tabName === type && type === 'custom')) {
                option[field] = set.value
              }
            } else {
              // 如果没有这个属性，则创建该属性，并赋值为空对值
              if (!option[field]) {
                option[field] = {}
              }
              option = option[field]
            }
          })
        }
      })
      return config
    },
    dataFormatting (config, data) {
      // 添加日志记录接收到的数据类型和来源
      console.log('PlotRender组件dataFormatting被调用:', config.type, config.dataSource?.datasetType)
      console.log('PlotRender接收到的数据类型:', typeof data, '数据内容:', data)
      
      // 特殊处理IOT数据集
      if (config.dataSource && config.dataSource.datasetType === 'iot') {
        console.log('PlotRender处理IOT数据集')
        // 确保数据已初始化
        if (!config.option) {
          config.option = {}
        }
        
        // 处理数据 - 获取正确的数据数组
        let processedData = []
        
        // 检查data是否包含data字段(apiDataFormatting已处理过)
        if (data && Array.isArray(data.data)) {
          processedData = data.data
        } else if (data && data.data) {
          // data.data可能是对象或数组
          processedData = Array.isArray(data.data) ? data.data : [data.data]
        } else if (Array.isArray(data)) {
          // 直接是数组
          processedData = data
        } else if (data) {
          // 单个对象，转为数组
          processedData = [data]
        }
        
        console.log('IOT处理后的最终数据:', processedData)
        
        // 设置图表维度和指标字段
        config = this.transformSettingToOption(config, 'data')
        
        // 设置图表数据
        config.option.data = processedData
        
        // 如果没有在数据配置中设置字段映射，根据dataSource配置设置
        if (config.dataSource.dimensionField && !config.option.xField) {
          config.option.xField = config.dataSource.dimensionField
        }
        if (config.dataSource.metricField && !config.option.yField) {
          config.option.yField = config.dataSource.metricField
        }
        if (config.dataSource.seriesField && !config.option.seriesField) {
          config.option.seriesField = config.dataSource.seriesField
        }
        
        console.log('IOT图表最终配置:', config.option)
        return config
      }
      
      // 原有的数据处理逻辑
      // 数据返回成功则赋值
      if (data.success) {
        data = data.data || []
        config = this.transformSettingToOption(config, 'data')
        // 获取到后端返回的数据，有则赋值
        const option = config.option
        const setting = config.setting
        if (config.dataHandler) {
          try {
            // 此处函数处理data
            eval(config.dataHandler)
          } catch (e) {
            console.error(e)
          }
        }
        if (config.chartType == 'Treemap') {
          const xAxis = config.setting.find(item => item.field === 'xField')?.value
          const listData = data.children.map(item => {
            if (xAxis && typeof item[xAxis] === 'number') {
              item[xAxis] = (item[xAxis]).toString()
            }
            return item
          })
          config.option.data = { name: 'root', children: [...listData] }
        } else {
          // 如果维度为数字类型则转化为字符串，否则在不增加其他配置的情况下会导致图标最后一项不显示（g2plot官网已说明）
          const xAxis = config.setting.find(item => item.field === 'xField')?.value
          const yAxis = config.setting.find(item => item.field === 'yField')?.value
          config.option.data = data?.map(item => {
            if (config.chartType !== 'Bar' && xAxis && typeof item[xAxis] === 'number') {
              item[xAxis] = (item[xAxis]).toString()
            } else if (config.chartType === 'Bar' && yAxis && typeof item[yAxis] === 'number') {
              item[yAxis] = (item[yAxis]).toString()
            }
            return item
          })
        }
      } else {
        // 数据返回失败则赋前端的模拟数据
        config.option.data = this.plotList?.find(plot => plot.name === config.name)?.option?.data || config?.option?.data
      }
      return config
    },
    // 组件的样式改变，返回改变后的config
    changeStyle (config, isUpdateTheme) {
      config = { ...this.config, ...config }
      config = this.transformSettingToOption(config, 'custom')
      // 这里定义了option和setting是为了保证在执行eval时,optionHandler、dataHandler里面可能会用到，
      const option = config.option
      const setting = config.setting
      // 执行optionHandler
      if (this.config.optionHandler) {
        try {
          // 此处函数处理config
          console.log('执行optionHandler')
          eval(this.config.optionHandler)
        } catch (e) {
          console.error('执行optionHandler失败:', e)
        }
      }
      // 如果有dataHandler且有数据，确保执行一次
      if (this.config.dataHandler && config.option.data && config.option.data.length && !this.isDataHandlerExecuted) {
        try {
          console.log('在changeStyle中执行dataHandler')
          // eslint-disable-next-line no-unused-vars
          const data = config.option.data
          eval(this.config.dataHandler)
          this.isDataHandlerExecuted = true
          console.log('dataHandler执行后的配置:', config.option)
        } catch (e) {
          console.error('执行dataHandler失败:', e)
        }
      }
      // 只有样式改变时更新主题配置，切换主题时不需要保存
      if (!isUpdateTheme) {
        config.theme = settingToTheme(_.cloneDeep(config), this.customTheme)
      }
      this.changeChartConfig(config)
      if (config.code === this.activeCode) {
        this.changeActiveItemConfig(config)
      }
      if (this.chart) {
        this.chart.update(config.option)
      }
      return config
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/echartStyle';
.light-theme{
  background-color: #ffffff;
  color: #000000;
}
.auto-theme{
  background-color: transparent;
}

</style>
