<template>
  <div class="three-render-simplified" :class="{'light-theme':customTheme === 'light','auto-theme':customTheme !=='light'}">
    <ThreeRenderCore :config="config" :theme="customTheme"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import ThreeRenderCore from './components/ThreeRenderCore.vue'
import _ from 'lodash'

export default {
  name: 'ThreeComponent',
  mixins: [commonMixins, linkageMixins],
  components: {
    ThreeRenderCore
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      pm25Value: 38,
      hasData: false
    }
  },
  computed: {
    ...mapState('bigScreen', {
      chartList: state => state.chartList,
      activeCode: state => state.activeCode,
      customTheme: state => state.customTheme
    })
  },
  methods: {
    ...mapMutations('bigScreen', [
      'changeChartConfig',
      'changeActiveItemConfig',
      'changeChartLoading'
    ]),

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
    // 数据格式化
    dataFormatting (config, data) {
      if (!config) {
        return this.config || {}
      }
      // 确保 config.option 存在
      if (!config.option) {
        config.option = {}
      }
      // 确保customize对象存在
      if (!config.option.customize) {
        config.option.customize = {}
      }
      // 记录接收到的数据

      // --- 再次确保同步逻辑存在 --- 
      try {
          if (config && config.setting) { // 检查 config 和 config.setting
              // 确保调用的是 this 上的方法，并且重新赋值 config
              config = this.transformSettingToOption(config, 'data');
          } 
      } catch (e) {
      }
      // --- 同步逻辑结束 ---

      // --- 获取原始数据源 ---
      let sourceDataForProcessing = data?.data || data;

      try { // Outer try block for the whole data processing section
        // --- 步骤 1: 如果 dataHandler 存在，执行它来修改 sourceDataForProcessing ---
        if (config.dataHandler && sourceDataForProcessing) {
          const option = config.option;
          const setting = config.setting;
          const dataHandlerFn = new Function('data', 'option', 'setting', config.dataHandler);
          dataHandlerFn(sourceDataForProcessing, option, setting);
        }
        // --- 步骤 2: 始终执行默认的绑定映射逻辑（如果数据存在） ---
        if (sourceDataForProcessing) {
          const processedData = [];
          const sourceData = sourceDataForProcessing;

          const bindingConfig = config.option?.customize?.binding;
          const dataPoints = config.option?.customize?.dataPoints;

          if (bindingConfig && dataPoints) {
            if (sourceData) {
              dataPoints.forEach((point, pointIndex) => {
                 if (point.dataStructure && Array.isArray(point.dataStructure)) {
                   point.dataStructure.forEach((structureItem, structIndex) => {
                     const bindingKey = structureItem.bindingKey;
                     const dataField = bindingConfig[bindingKey];

                     if (bindingKey && dataField) {
                       let value = undefined;
                       let found = false;

                       // --- Extract data from sourceData ---
                       if (Array.isArray(sourceData)) {
                          const dataItem = sourceData.find(item => item && (item.id === bindingKey || item.key === bindingKey));
                          if (dataItem && dataItem.hasOwnProperty(dataField)) {
                             value = dataItem[dataField];
                             found = true;
                          } else {
                             if(sourceData.length > 0 && sourceData[0] && sourceData[0].hasOwnProperty(dataField)) {
                                value = sourceData[0][dataField];
                                found = true;
                             } 
                          }
                       } else if (typeof sourceData === 'object' && sourceData !== null) {
                          if (sourceData.hasOwnProperty(dataField)) {
                             value = sourceData[dataField];
                             found = true;
                          } else if (sourceData.hasOwnProperty(bindingKey)) {
                            value = sourceData[bindingKey];
                            found = true;
                          } 
                       } 
                       // --- End data extraction ---

                       if (found && value !== undefined && value !== null) {
                         processedData.push({
                           id: bindingKey,
                           value: Number(value)
                         });
                       } 
                     } 
                   }); // End structureItem loop
                 } 
             }); // End dataPoints loop
           } 

          // --- 更新 config.option.data ---
          if (processedData.length > 0) {
            config.option.data = processedData;
            this.hasData = true;
          } else {
            config.option.data = [];
            this.hasData = false;
          }
        } else {
           config.option.data = [];
           this.hasData = false;
        }
      }
      } catch (error) { // Outer catch for the whole section
        // Ensure data is in a reasonable state even if outer try fails
        config.option.data = config.option.data || [];
        this.hasData = !!(config.option.data && config.option.data.length > 0);
      } // End outer catch

      return config;
    },
    
    // 组件的样式改变，返回改变后的config
    changeStyle (config, isUpdateTheme) {
      try {
        // 确保 config 有值
        if (!config) {
          return this.config || {}
        }

        // 确保 config 有 code 属性
        if (!config.code && this.config && this.config.code) {
          config.code = this.config.code
        }

        config = { ...this.config, ...config }

        // 确保 config.setting 存在
        if (!config.setting) {
          config.setting = []
        }

        config = this.transformSettingToOption(config, 'custom')

        // 只有样式改变时更新主题配置，切换主题时不需要保存
        if (!isUpdateTheme) {
          try {
            config.theme = settingToTheme(_.cloneDeep(config), this.customTheme)
          } catch (e) {
          }
        }

        // 确保 config 有 code 属性再调用 changeChartConfig
        if (config.code) {
          try {
            this.changeChartConfig(config)
            if (config.code === this.activeCode) {
              this.changeActiveItemConfig(config)
            }
          } catch (e) {
          }
        }

        return config
      } catch (error) {
        return config || this.config || {}
      }
    },

    // 转换设置到选项
    transformSettingToOption (config, tabName) {
      try {
        if (!config || !config.setting) {
            return config
        }


        config.setting.filter(item => item.tabName === tabName).forEach(item => {
          if (item.optionField) {
            const fields = item.optionField.split('.')

            if (!config.option) { config.option = {} }
            let current = config.option

            for (let i = 0; i < fields.length - 1; i++) {
              if (!current[fields[i]]) {
                current[fields[i]] = {}
              }
              current = current[fields[i]]
            }

            const lastField = fields[fields.length - 1]
            current[lastField] = item.value
          } 
        })

        return config
      } catch (error) {
        return config
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.three-render-simplified {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  
  &.light-theme {
    background-color: #ffffff;
    color: #333333;
    
    .config-display {
      background-color: rgba(255, 255, 255, 0.8);
      border: 1px solid #e0e0e0;
    }
  }
  
  &.auto-theme {
    background-color: #1e1e1e;
    color: #f0f0f0;
    
    .config-display {
      background-color: rgba(30, 30, 30, 0.8);
      border: 1px solid #444444;
    }
  }
  
  .config-display {
    width: 80%;
    max-width: 500px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    .config-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px dashed rgba(125, 125, 125, 0.3);
      
      &:last-child {
        margin-bottom: 0;
        border-bottom: none;
      }
      
      .label {
        font-weight: bold;
      }
      
      .value {
        max-width: 60%;
        word-break: break-all;
        
        &.pm25-good {
          color: #33cc33;
        }
        
        &.pm25-moderate {
          color: #ffff00;
        }
        
        &.pm25-unhealthy-sensitive {
          color: #ff9900;
        }
        
        &.pm25-unhealthy {
          color: #ff0000;
        }
        
        &.pm25-very-unhealthy {
          color: #800080;
        }
        
        &.pm25-hazardous {
          color: #8b0000;
        }
      }
    }
  }
}
</style>
