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
      console.log('config1',config)
      // key和code相等，说明是一进来刷新，调用list接口
      if (this.config.code === this.config.key || this.isPreview) {
        // 改变样式
        console.log('config2',config)
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
      console.log('ThreeRender接收到数据:', data)

      // --- 再次确保同步逻辑存在 --- 
      console.log('[dataFormatting] 开始，准备同步 bindingConfig...');
      try {
          if (config && config.setting) { // 检查 config 和 config.setting
              console.log('[dataFormatting] 调用 transformSettingToOption(config, \'data\')...');
              // 确保调用的是 this 上的方法，并且重新赋值 config
              config = this.transformSettingToOption(config, 'data');
              console.log('[dataFormatting] transformSettingToOption 调用结束。');
              console.log('[dataFormatting] 同步后的 bindingConfig (config.option.customize.binding):', JSON.parse(JSON.stringify(config.option?.customize?.binding || null)));
          } else {
              console.warn('[dataFormatting] config 或 config.setting 缺失，无法同步 bindingConfig。');
              // 如果 setting 缺失，bindingConfig 肯定不会被更新
              console.log('[dataFormatting] 当前 config.option.customize.binding:', JSON.parse(JSON.stringify(config?.option?.customize?.binding || null)));
          }
      } catch (e) {
          console.error('[dataFormatting] 调用 transformSettingToOption 时出错:', e);
      }
      // --- 同步逻辑结束 ---

      // --- 获取原始数据源 ---
      let sourceDataForProcessing = data?.data || data;
      console.log('[dataFormatting] Initial sourceDataForProcessing:', JSON.parse(JSON.stringify(sourceDataForProcessing)));

      try { // Outer try block for the whole data processing section
        // --- 步骤 1: 如果 dataHandler 存在，执行它来修改 sourceDataForProcessing ---
        if (config.dataHandler && sourceDataForProcessing) {
          const option = config.option;
          const setting = config.setting;
          const dataHandlerFn = new Function('data', 'option', 'setting', config.dataHandler);
          console.log('[dataFormatting] Executing dataHandler...');
          dataHandlerFn(sourceDataForProcessing, option, setting);
          console.log('[dataFormatting] dataHandler finished. sourceDataForProcessing potentially modified:', JSON.parse(JSON.stringify(sourceDataForProcessing)));
        } else {
          console.log('[dataFormatting] No dataHandler or no initial data, skipping dataHandler execution.');
        }

        // --- 步骤 2: 始终执行默认的绑定映射逻辑（如果数据存在） ---
        if (sourceDataForProcessing) {
          console.log('[dataFormatting] Starting default binding logic...');
          const processedData = [];
          const sourceData = sourceDataForProcessing;
          console.log('[dataFormatting] Default binding logic using sourceData:', JSON.parse(JSON.stringify(sourceData)));

          const bindingConfig = config.option?.customize?.binding;
          const dataPoints = config.option?.customize?.dataPoints;

          if (bindingConfig && dataPoints) {
            console.log('[dataFormatting] bindingConfig and dataPoints exist, proceeding with mapping.');
            if (sourceData) {
              console.log('dataFormatting: Entering default data processing loop...');
              dataPoints.forEach((point, pointIndex) => {
                console.log(`dataFormatting: Processing dataPoint ${pointIndex}, id: ${point.id}`);
                 if (point.dataStructure && Array.isArray(point.dataStructure)) {
                   point.dataStructure.forEach((structureItem, structIndex) => {
                     console.log(`dataFormatting:   Processing structureItem ${structIndex}`);
                     const bindingKey = structureItem.bindingKey;
                     const dataField = bindingConfig[bindingKey];
                     console.log(`dataFormatting:     bindingKey: ${bindingKey}, dataField: ${dataField}`);

                     if (bindingKey && dataField) {
                       let value = undefined;
                       let found = false;

                       // --- Extract data from sourceData ---
                       if (Array.isArray(sourceData)) {
                          console.log('dataFormatting:       sourceData is array');
                          const dataItem = sourceData.find(item => item && (item.id === bindingKey || item.key === bindingKey));
                          if (dataItem && dataItem.hasOwnProperty(dataField)) {
                             value = dataItem[dataField];
                             found = true;
                             console.log(`dataFormatting:         Found in array (id/key=${bindingKey}), field ${dataField}, value: ${value}`);
                          } else {
                             console.warn(`dataFormatting:       Cannot find item for ${bindingKey} or field ${dataField} in array.`);
                             if(sourceData.length > 0 && sourceData[0] && sourceData[0].hasOwnProperty(dataField)) {
                                console.warn(`dataFormatting:         Attempting fallback using first array item for field '${dataField}'`);
                                value = sourceData[0][dataField];
                                found = true;
                                console.log(`dataFormatting:         Fallback value extracted: ${value}`);
                             } else {
                                console.warn(`dataFormatting:         Fallback failed.`);
                             }
                          }
                       } else if (typeof sourceData === 'object' && sourceData !== null) {
                         console.log('dataFormatting:       sourceData is object');
                          if (sourceData.hasOwnProperty(dataField)) {
                             value = sourceData[dataField];
                             found = true;
                             console.log(`dataFormatting:         Found field ${dataField} in object, value: ${value}`);
                          } else if (sourceData.hasOwnProperty(bindingKey)) {
                            value = sourceData[bindingKey];
                            found = true;
                             console.log(`dataFormatting:         Found field ${bindingKey} (as fallback) in object, value: ${value}`);
                          } else {
                            console.warn(`dataFormatting:       Object lacks field '${dataField}' and fallback '${bindingKey}'`);
                          }
                       } else {
                         console.warn('dataFormatting:       sourceData is neither array nor valid object.');
                       }
                       // --- End data extraction ---

                       if (found && value !== undefined && value !== null) {
                         processedData.push({
                           id: bindingKey,
                           value: Number(value)
                         });
                         console.log(`dataFormatting:     Successfully added { id: ${bindingKey}, value: ${Number(value)} } to processedData`);
                       } else {
                         console.warn(`dataFormatting:     Failed to extract valid value for bindingKey '${bindingKey}' (field: '${dataField}'). found=${found}, value=${value}`);
                       }
                     } else {
                       console.warn(`dataFormatting:   Missing bindingKey or dataField config for point '${point.id}'/structure ${structIndex}.`);
                     }
                   }); // End structureItem loop
                 } else {
                   console.warn(`dataFormatting: dataPoint ${pointIndex} (id: ${point.id}) missing dataStructure or not an array.`);
                 }
             }); // End dataPoints loop
             console.log('dataFormatting: Default data processing loop finished.');
           } else {
              console.warn('[dataFormatting] sourceData is null or undefined, cannot perform default mapping.');
           }

          // --- 更新 config.option.data ---
          console.log('[dataFormatting] Default binding produced processedData:', JSON.parse(JSON.stringify(processedData)));
          if (processedData.length > 0) {
            config.option.data = processedData;
            this.hasData = true;
            console.log('[dataFormatting] Successfully updated config.option.data:', JSON.parse(JSON.stringify(config.option.data)));
          } else {
            config.option.data = [];
            this.hasData = false;
            console.warn('[dataFormatting] Default binding logic resulted in empty processedData. config.option.data cleared.');
          }
        } else {
          console.log('[dataFormatting] No sourceDataForProcessing available after dataHandler step, skipping default binding logic.');
           config.option.data = [];
           this.hasData = false;
        }
      }
      } catch (error) { // Outer catch for the whole section
        console.error('dataFormatting: Unexpected outer error:', error);
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
            console.error('设置主题失败:', e)
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
            console.error('更新配置失败:', e)
          }
        }

        return config
      } catch (error) {
        console.error('changeStyle方法执行出错:', error)
        return config || this.config || {}
      }
    },

    // 转换设置到选项
    transformSettingToOption (config, tabName) {
      console.log(`[transformSettingToOption] 开始执行，tabName: ${tabName}`); // <-- 新增日志
      try {
        if (!config || !config.setting) {
            console.warn(`[transformSettingToOption] config 或 config.setting 不存在，返回原始 config。`); // <-- 新增日志
            return config
        }

        console.log(`[transformSettingToOption] 检查 config.setting (tabName=${tabName}):`, JSON.parse(JSON.stringify(config.setting.filter(item => item.tabName === tabName)))); // <-- 新增日志

        config.setting.filter(item => item.tabName === tabName).forEach(item => {
          console.log(`[transformSettingToOption] 处理 setting项:`, JSON.parse(JSON.stringify(item))); // <-- 新增日志
          if (item.optionField) {
            console.log(`  > Found optionField: ${item.optionField}, value: ${item.value}`); // <-- 新增日志
            const fields = item.optionField.split('.')

            if (!config.option) { config.option = {} }
            let current = config.option

            for (let i = 0; i < fields.length - 1; i++) {
              if (!current[fields[i]]) {
                console.log(`    > Creating missing path: ${fields[i]}`); // <-- 新增日志
                current[fields[i]] = {}
              }
              current = current[fields[i]]
            }

            const lastField = fields[fields.length - 1]
            console.log(`    > 设置 config.option.${item.optionField.substring(item.optionField.indexOf('.')+1)} = ${item.value}`); // <-- 修改日志
            current[lastField] = item.value
          } else {
             console.log(`  > No optionField found for this item.`); // <-- 新增日志
          }
        })

        console.log(`[transformSettingToOption] 执行完毕，返回的 config.option.customize.binding:`, JSON.parse(JSON.stringify(config.option?.customize?.binding || null))); // <-- 新增日志
        return config
      } catch (error) {
        console.error('transformSettingToOption方法执行出错:', error)
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
