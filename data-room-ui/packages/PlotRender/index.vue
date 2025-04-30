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
      plotList
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

      if (this.chart) {
        try {
            this.chart.destroy();
        } catch (destroyError) {
            console.error(`[PlotRender newChart] Error destroying previous chart instance for ${config?.code}:`, destroyError);
        }
        this.chart = null; // Reset chart instance variable
      }

      try {
          this.chart = new g2Plot[config.chartType](this.chatId, {
            renderer: 'canvas',
            supportCSSTransform: true,
            ...config.option
          });
          this.chart.render();
          this.registerEvent();
      } catch (renderError) {
          console.error(`[PlotRender newChart] Error during G2Plot instantiation or rendering for ${config?.name || config?.code}:`, renderError);
          console.error(`[PlotRender newChart] Config option that caused the error:`, config.option); // Log config again on error
      }
    },
    /**
     * 注册事件
     */
    registerEvent () {
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
       // --- Add Log: Identify component ---
       // --- End Log ---

      // 数据返回成功则赋值
      if (data.success) {
        let rawData = data.data || []; // 使用 rawData 存储原始数据
        config = this.transformSettingToOption(config, 'data')
        const option = config.option
        const setting = config.setting
        const yField = option?.yField; // 获取 y 轴字段名
        const xField = option?.xField; // 获取 x 轴字段名

        // --- Add Log: Inspect data before eval ---
        console.log(`[PlotRender dataFormatting] Raw data before eval for ${config?.name}:`, JSON.stringify(rawData));
        console.log(`[PlotRender dataFormatting] config.dataHandler for ${config?.name}:`, config.dataHandler);
        // --- End Log ---

        if (config.dataHandler || config.name === 'YiBiaoPan') { // 如果有 handler 或者 是仪表盘，就尝试执行
          // --- Wrap execution in try...catch --- 
          try {
            let handlerScript = config.dataHandler;
            // --- Runtime Fix: Force correct handler for YiBiaoPan --- 
            if (config.name === 'YiBiaoPan') {
              console.log(`[PlotRender dataFormatting] Applying runtime fix: Using corrected dataHandler for YiBiaoPan.`);
              handlerScript = `
                let value = 0; 
                try {
                  const fieldNameItem = setting.find(item => item.field === 'percent');
                  const fieldName = fieldNameItem?.value;
                  if (typeof fieldName === 'string' && fieldName.length > 0) {
                    if (Array.isArray(data) && data.length > 0 && data[0] !== null && data[0] !== undefined) {
                      let rawValue = data[0][fieldName];
                      if (typeof rawValue === 'object' && rawValue !== null && rawValue.hasOwnProperty('value')) {
                         rawValue = rawValue.value;
                      } else if (typeof rawValue === 'object' && rawValue !== null) {
                         rawValue = 0;
                      }
                      if (rawValue !== undefined) {
                         const parsedValue = parseFloat(rawValue);
                         if (!isNaN(parsedValue)) {
                           value = parsedValue;
                           if (value > 1) { value = value / 100; if (value > 1) value = 1; }
                           if (value < 0) value = 0;
                         } else { value = 0; }
                      } else { value = 0; }
                    } else { value = 0; }
                  } else { value = 0; }
                } catch (scriptError) {
                    console.error('YiBiaoPan dataHandler (runtime fix): Unexpected error during execution:', scriptError);
                    value = 0;
                }
                option.percent = value;
              `;
            }
            // --- End Runtime Fix ---

            if (handlerScript) { // 确保有脚本再执行
              const dataHandlerFn = new Function('data', 'setting', 'option', handlerScript);
              console.log(`[PlotRender dataFormatting] Executing dataHandlerFn for ${config?.name}...`);
              dataHandlerFn(rawData, setting, option);
              console.log(`[PlotRender dataFormatting] Raw data *after* successful dataHandlerFn execution for ${config?.name}:`, JSON.stringify(rawData));
               // --- Add Final Check for option.percent (Gauge) --- 
               if (config.name === 'YiBiaoPan') {
                  if (typeof option.percent !== 'number' || isNaN(option.percent) || option.percent < 0 || option.percent > 1) {
                    option.percent = 0;
                  }
               }
               // --- End Final Check ---
            }
          } catch (e) {
            console.error(`[PlotRender dataFormatting] Error during dataHandlerFn execution for ${config?.name}:`, e);
             // --- Add Final Check for option.percent (Gauge) even on error --- 
             if (config.name === 'YiBiaoPan') {
                if (typeof option.percent !== 'number' || isNaN(option.percent) || option.percent < 0 || option.percent > 1) {
                  option.percent = 0;
                }
             }
             // --- End Final Check ---
          }
          // --- End wrap --- 
        }

        let processedData = []; // 存储处理后的数据
        if (Array.isArray(rawData)) { 
           processedData = rawData.map((item, index) => { // 添加 index 用于日志
              const newItem = { ...item }; 

              // --- 校验和处理 yField --- 
              if (yField && newItem.hasOwnProperty(yField)) {
                  const originalValue = newItem[yField];
                  let numericValue = typeof originalValue === 'number' ? originalValue : parseFloat(originalValue);
                  if (isNaN(numericValue)) {
                      newItem[yField] = 0;
                  } else {
                      newItem[yField] = numericValue;
                      // --- Add Log: Verify conversion inside map ---
                      if (index < 5) { // 只打印前几个，避免日志过多
                         console.log(`[PlotRender dataFormatting] Item ${index} for ${config?.name} - yField '${yField}' converted: ${originalValue} -> ${newItem[yField]} (Type: ${typeof newItem[yField]})`);
                      }
                      // --- End Log ---
                  }
              }
              // --- 结束：校验和处理 yField ---

              // --- 处理 xField/yField 为数字转字符串的逻辑 (逻辑不变) ---
              if (config.chartType !== 'Bar' && xField && typeof newItem[xField] === 'number') {
                 newItem[xField] = (newItem[xField]).toString();
              }
              if (config.chartType === 'Bar' && yField && typeof item[yField] === 'number') {
                 newItem[yField] = (newItem[yField]).toString();
              }
              // --- 结束：处理 xField/yField --- 

              return newItem;
           });
             // --- Add Log: Verify processedData before assignment ---
             console.log(`[PlotRender dataFormatting] Processed data for ${config?.name} (first 5 items):`, JSON.stringify(processedData.slice(0, 5)));
             // --- End Log ---
        } else {
           // --- Add Log: Handle case where rawData is not an array --- 
           console.error(`[PlotRender dataFormatting] rawData is not an array after potential eval for ${config?.name}. Assigning empty array. rawData:`, rawData);
           processedData = []; // 如果不是数组，则使用空数组，防止 map 报错
        }
         // --- End Modify --- 

        if (config.chartType == 'Treemap') {
          // TODO: Treemap 的 value 字段也需要类似的 NaN 检查
          const listData = processedData.map(item => {
            // Treemap xField 转换逻辑
            if (xField && typeof item[xField] === 'number') { // 使用 xField 变量
              item[xField] = (item[xField]).toString()
            }
            return item
          })
          config.option.data = { name: 'root', children: [...listData] }
        } else {
          // --- Modify: Ensure assignment happens --- 
          config.option.data = processedData; 
          console.log(`[PlotRender dataFormatting] Assigned processedData to config.option.data for ${config?.name}`);
          // --- End Modify ---
        }
      } else {
        // 数据返回失败则赋前端的模拟数据
        config.option.data = this.plotList?.find(plot => plot.name === config.name)?.option?.data || config?.option?.data
        const _xField = this.plotList?.find(plot => plot.name === config.name)?.option?.xField || config?.option?.xField
        const _yField = this.plotList?.find(plot => plot.name === config.name)?.option?.yField || config?.option?.yField
        const _seriesField = this.plotList?.find(plot => plot.name === config.name)?.option?.seriesField || config?.option?.seriesField
        config.option = _seriesField ? { ...config.option, xField: _xField, yField: _yField, seriesField: _seriesField } : { ...config.option, xField: _xField, yField: _yField }
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
      if (this.config.optionHandler) {
        try {
          // 此处函数处理config
          eval(this.config.optionHandler)
        } catch (e) {
          console.error(e)
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
