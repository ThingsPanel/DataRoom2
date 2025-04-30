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
  </div>
</template>
<script>
import 'insert-css'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { mapState, mapMutations } from 'vuex'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import _ from 'lodash'
// import * as echarts from 'echarts' // 移除 Echarts 引用
import VChart from '@visactor/vchart' // 引入 VChart
import CloneDeep from 'lodash-es/cloneDeep'

export default {
  name: 'VchartCustomComponent', // 修改组件名称
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
      hasData: false
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
    const dragSelect = document.querySelector('#' + this.chatId)
    const resizeObserver = new ResizeObserver(entries => {
      if (this.chart) {
        // TODO: VChart API 替换
        this.chart.resize()
        if(this.config.name.includes('3D')){
          // TODO: VChart 适配 - 此处逻辑与 Echarts 3D 柱状图强相关，需要重写
          let config = this.observeChart(entries)
          config = this.seriesStyle(config)
          // TODO: VChart API 替换 (updateSpec)
          config.option && this.chart.setOption(config.option)
        }
      }
    })
    resizeObserver.observe(dragSelect)
  },
  beforeDestroy () {
    if (this.chart) {
      // TODO: VChart API 替换 (release or dispose)
      this.chart.dispose()
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
      const chartDom = document.getElementById(this.chatId)
      // TODO: VChart API 替换 (new VChart)
      // this.chart = echarts.init(chartDom)
      // TODO: VChart API 替换 (updateSpec or initial spec)
      // config.option && this.chart.setOption(config.option)
      console.log('TODO: Implement VChart instantiation with spec:', config.option)
    },
    /**
     * 控制底部阴影大小
     * TODO: VChart 适配 - 此方法与 Echarts 3D 柱状图强相关，需要重写或移除
     */
    observeChart (entries) {
      const width = entries[0].contentRect.width
      const height = entries[0].contentRect.height
      const option = this.config.option
      // 调整长方形的大小
      option.graphic.children[0].shape.width = width * 0.9
      // 调整多边形的大小
      option.graphic.children[1].shape.points = [[width / 10, -height / 6], [width - width / 6, -height / 6], [width * 0.9, 0], [0, 0]]
      return this.config
    },
    /**
     * 注册事件
     * TODO: VChart API 替换 - 需要使用 VChart 的事件机制
     */
    registerEvent () {
      // 图表添加事件进行数据联动
      let formData = {}
      // eslint-disable-next-line no-unused-vars
      // this.chart.on('tooltip:change', (...args) => {
      //   formData = {}
      //   formData = cloneDeep(args[0].data.items[0].data)
      // })
      // eslint-disable-next-line no-unused-vars
      // this.chart.on('plot:click', (...args) => {
      //   this.linkage(formData)
      // })
      console.log('TODO: Register VChart events for linkage')
    },
    // 将config.setting的配置转化为option里的配置，这里之所以将转化的方法提出来，是因为在改变维度指标和样式的时候都需要转化
    // TODO: VChart 适配 - 此方法需要调整以修改 VChart spec (config.option)
    transformSettingToOption (config, type) {
      let option = null
      config.setting.forEach(set => {
        if (set.optionField) {
          const optionField = set.optionField.split('.')
          option = config.option // 这里的 option 就是 VChart spec
          // 判断是不是关于x轴的相关配置，x轴叠加了两层坐标轴，如果是x轴相关配置则作用于xAxis[0]
          // TODO: 移除或适配 Echarts 特定的 xAxis[0] 逻辑
          if (optionField[0] === 'xAxis') {
            optionField.forEach((field, index) => {
              if (index === 0) {
                // VChart 可能只有一个 xAxis 或需要不同方式访问
                 if (option.axes && option.axes.some(axis => axis.orient === 'bottom')) {
                   // 尝试查找 VChart 的 x 轴
                   option = option.axes.find(axis => axis.orient === 'bottom')
                 } else {
                   // 如果找不到，或者结构不同，需要调整逻辑
                   console.warn('Cannot find VChart x-axis in spec for setting:', set.optionField)
                   option = null // 阻止后续修改
                 }
                 if (!option) return // 如果没找到轴，则跳过此设置
               } else if (index === optionField.length - 1) {
                 // 数据配置时，必须有值才更新
                 if ((set.tabName === type && type === 'data' && set.value) || (set.tabName === type && type === 'custom')) {
                   if (option) option[field] = set.value
                 }
               } else {
                 if (option) option = option[field]
               }
             })
          } else if (optionField[0] === 'series') {
            // TODO: VChart 适配 - Echarts series ID 逻辑可能不适用，需要根据 VChart series 结构调整
            let changeObject = []
            let beforeChange = []
            // 如果要配置数据标签相关信息
            optionField.forEach((field, index) => {
              if (index === 0) {
                option = option[field] // VChart series 数组
              } else if (index === 1) {
                // VChart series 可能没有 id 或 id 规则不同
                // 这里的 field 可能是 series 类型或索引，需要确定
                // 假设 field 指的是 series 类型，例如 'bar'
                 if (Array.isArray(option)) {
                   // 假设我们要修改所有 bar 类型的 series
                   changeObject = option.filter(item => item.type === field)
                   beforeChange = CloneDeep(changeObject) // 深拷贝
                   // 保留非目标类型的 series
                   option = option.filter(item => item.type !== field)
                 } else {
                   changeObject = []
                   beforeChange = []
                   option = []
                 }
              } else if (index === optionField.length - 1) {
                if ((set.tabName === type && type === 'data' && set.value) || (set.tabName === type && type === 'custom')) {
                  changeObject.forEach(item => {
                     // 假设修改 series 根属性
                     item[field] = set.value
                   })
                }
              } else {
                // 假设要修改 series 内部的属性，如 label
                 changeObject.forEach(item => {
                   if (item && item[field]) {
                     // 示例：假设要改 item.label.xxx
                     // 需要递归查找或固定结构
                   } else {
                     // 如果路径不存在，可能需要创建
                   }
                 })
              }
            })
            // 合并修改后的series对象
            // TODO: VChart 适配 - 合并逻辑需要验证
             if (Array.isArray(option)) {
               option.push(...beforeChange) // 将修改后的 series 加回去
             } else {
               option = beforeChange
             }

          } else if (optionField[0] === 'graphic') {
            // TODO: VChart 适配 - VChart 没有完全对应的 graphic 概念，此段逻辑需移除或大幅修改
            // 配置底部阴影颜色
            // option.graphic.children.forEach(item => {
            //   item.style.fill = set.value
            // })
            console.warn('Graphic setting ignored for VChart:', set.optionField)

          } else {
             // 处理顶层属性或 seriesCustom 等（假设它们在 VChart spec 中仍然有效）
            let currentLevel = config.option // 从 spec 根开始
            for (let i = 0; i < optionField.length - 1; i++) {
              if (currentLevel && typeof currentLevel === 'object' && optionField[i] in currentLevel) {
                currentLevel = currentLevel[optionField[i]];
              } else {
                currentLevel = null;
                break;
              }
            }
             if (currentLevel && typeof currentLevel === 'object') {
               const finalField = optionField[optionField.length - 1];
               if ((set.tabName === type && type === 'data' && set.value !== undefined) || (set.tabName === type && type === 'custom')) {
                 currentLevel[finalField] = set.value;
               }
             } else {
               // console.warn('Path not found in VChart spec for setting:', set.optionField)
             }
          }
        }
      })
      return config
    },
    // TODO: VChart 适配 - 此方法需要完全重写以处理 VChart 数据绑定
    dataFormatting (config, data) {
      // config = this.config
      // 数据返回成功则赋值
      if (data.success) {
        data = data.data
        // 获取到后端返回的数据，有则赋值
        // const option = config.option // option is VChart spec
        // const setting = config.setting

        // TODO: 移除 eval, 使用安全的数据处理方式
        if (config.dataHandler) {
          try {
            // 此处函数处理data, 需要适配 VChart
            // eval(config.dataHandler)
             console.warn('dataHandler eval needs VChart adaptation')
          } catch (e) {
            console.error(e)
          }
        }
        // TODO: VChart 数据绑定 - 直接将数据赋值给 spec 的 data 字段
        // config.option = this.echartsOptionFormatting(config, data)
        config.option.data = { values: data } // 假设数据可以直接放入 values

        config = this.transformSettingToOption(config, 'data')
      } else {
        // 数据返回失败则赋前端的模拟数据
        // config.option.data = this.plotList?.find(plot => plot.name === config.name)?.option?.data || config?.option?.data
         console.warn('Data fetch failed, using default data if available.')
         // 可选：从 V基础柱状图.js 读取默认数据?
         // config.option.data = { values: [...] }
      }
      // TODO: VChart 适配 - 移除或重写 seriesStyle
      // config = this.seriesStyle(config)
      return config
    },
    // TODO: VChart 适配 - 此方法可能不再需要，VChart 通过 spec 的 data 和 encoding/fields 绑定数据
    getxDataAndYData (xField, yField, data) {
      let xData = []
      let yData = []

      // 获取所有x轴的分类
      data.forEach(item => {
        xData.push(item[xField])
      })
      xData = [...new Set(xData)]
      xData.forEach(x => {
        let max = 0
        data.forEach(item => {
          if (item[xField] === x) {
            max = item[yField] > max ? item[yField] : max
          }
        })
        yData.push(max)
      })
      return { xData, yData }
    },
    // TODO: VChart 适配 - 此方法是 Echarts 特定的，需要完全移除
    // 格式化echarts的配置
    echartsOptionFormatting (config, data) {
      // ... Echarts specific logic ...
      console.error('echartsOptionFormatting should be removed for VChart')
      return config.option // 返回原始 spec 以避免错误
    },
    // TODO: VChart 适配 - 此方法是 Echarts 特定的 (尤其是3D柱状图)，需要完全移除或重写
    // 对series里面的样式进行配置
    seriesStyle (config) {
      // if(!config.name.includes('3D')){
      //   return config
      // }
      // ... Echarts specific logic ...
      console.warn('seriesStyle needs adaptation or removal for VChart')
      return config
    },
    // 组件的样式改变，返回改变后的config
    changeStyle (config, isUpdateTheme) {
      config = { ...this.config, ...config }
      config = this.transformSettingToOption(config, 'custom')
      // 这里定义了option和setting是为了保证在执行eval时,optionHandler、dataHandler里面可能会用到，
      // const option = config.option // option is VChart spec
      // const setting = config.setting
      // TODO: 移除 eval, 使用安全的方式处理 optionHandler
      if (this.config.optionHandler) {
        try {
          // 此处函数处理config, 需要适配 VChart spec
          // eval(this.config.optionHandler)
          console.warn('optionHandler eval needs VChart adaptation')
        } catch (e) {
          console.error(e)
        }
      }
      // 此时，setting中的部分变量映射到了option.seriesCustom中，但未映射到series的具体配置中
      // TODO: VChart 适配 - 移除或重写 seriesStyle 调用
      // config = this.seriesStyle(config)
      // 只有样式改变时更新主题配置，切换主题时不需要保存
      // TODO: VChart 主题适配 - settingToTheme 可能需要调整
      if (!isUpdateTheme) {
        config.theme = settingToTheme(_.cloneDeep(config), this.customTheme)
      }
      this.changeChartConfig(config)
      if (config.code === this.activeCode) {
        this.changeActiveItemConfig(config)
      }
      if (this.chart) {
        // TODO: VChart API 替换 (updateSpec)
        // this.chart.setOption(config.option)
        this.chart.updateSpec(config.option) // 假设可以直接更新
      }
      return config
    }
  }
}
</script>

<style lang="scss" scoped>
/* 保留样式，后续可能需要调整或替换 */
@import '../assets/style/echartStyle';
.light-theme{
  background-color: #ffffff;
  color: #000000;
}
.auto-theme{
  background-color: transparent;
}

</style> 