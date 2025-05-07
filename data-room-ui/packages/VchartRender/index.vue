<template>
  <div
    style="width: 100%;height: 100%"
    class="bs-design-wrap bs-custom-component"
    :class="{'light-theme':customTheme === 'light','auto-theme':customTheme !=='light'}"
  >
     <VchartCore
      v-if="showChart"
      ref="vchartCore" 
      :config="config"           
      :chart-data="processedData"  
      :initial-option="initialOption" 
      @linkage-trigger="handleLinkageTrigger" 
    />
    <!-- Optional: Display loading or no data message -->
    <div v-else-if="config.loading" class="loading-placeholder">Loading...</div>
    <div v-else class="no-data-placeholder">No data available</div>

  </div>
</template>
<script>
import 'insert-css'
import cloneDeep from 'lodash/cloneDeep'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { mapState, mapMutations } from 'vuex'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import _ from 'lodash'

// Import the new child component
import VchartCore from './VchartCore/index.vue' // Import VchartCore
import { log } from '@antv/g2plot/lib/utils'

export default {
  name: 'VchartsCustomComponent',
  components: {
    VchartCore // Register VchartCore
  },
  mixins: [commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      processedData: null,
      initialOption: null,
      showChart: false
    }
  },
  computed: {
    ...mapState('bigScreen', {
      pageInfo: state => state.pageInfo,
      customTheme: state => state.pageInfo.pageConfig.customTheme,
      activeCode: state => state.activeCode
    }),
    chatId () {
      let prefix = 'chart_parent_'
      if (this.$route.path === window?.BS_CONFIG?.routers?.previewUrl) {
        prefix = 'preview_chart_parent_'
      }

      if (this.$route.path === window?.BS_CONFIG?.routers?.designUrl) {
        prefix = 'design_chart_parent_'
      }

      if (this.$route.path === window?.BS_CONFIG?.routers?.pageListUrl) {
        prefix = 'management_chart_parent_'
      }
      return prefix + this.config.code
    }
  },
  created () {
  },
  watch: {
    'config.option.theme': {
      handler (val) {
        if (val) {
          this.changeStyle(this.config, true)
        }
      }
    }
  },
  mounted () {
    const dragSelect = this.$el
    if (dragSelect) {
        const resizeObserver = new ResizeObserver(entries => {
          this.$nextTick(() => {
            if (this.$refs.vchartCore && this.$refs.vchartCore.resizeChart) {
              this.$refs.vchartCore.resizeChart()
            }
          })
        })
        resizeObserver.observe(dragSelect)
        this.$_resizeObserver = resizeObserver
    } else {
        console.warn(`[VchartRender] Could not find element to observe for resize.`)
    }
  },
  beforeDestroy () {
    if (this.$_resizeObserver) {
       this.$_resizeObserver.disconnect()
    }
  },
  methods: {
    ...mapMutations('bigScreen', ['changeChartConfig', 'changeActiveItemConfig', 'changeChartLoading']),
    // Helper function for debug display
    isDefaultHandler(handlerScript) {
       if (!handlerScript || typeof handlerScript !== 'string') {
           return 'Empty';
       }
       const trimmed = handlerScript.trim();
       // Common default/empty patterns
       if (trimmed === '' || trimmed === '//' || trimmed === 'return data;' || trimmed.includes('handler is now empty')) {
            return 'Default/Empty';
       } 
       return 'Custom';
    },
    chartInit () {
        let config = this.config
        const isInitialLoad = this.previewMode || config.key === config.code

        if (isInitialLoad) {
            config = this.changeStyle(config)
            this.initialOption = cloneDeep(config.option)
            this.showChart = true

            this.setLoading(true)
            this.changeDataByCode(config)
                .then((finalConfig) => {
                    this.setLoading(false)
                    if (finalConfig?.processedDataSource) {
                      this.processedData = finalConfig.processedDataSource
                    } else {
                      this.processedData = []
                    }
                })
                .catch((error) => {
                    this.setLoading(false)
                    this.processedData = []
                    this.showChart = false
                    console.error("[VchartRender chartInit] Error fetching initial data:", error)
                })
        } else {
            this.setLoading(true)
            this.changeData(config)
                .then((finalConfig) => {
                    this.setLoading(false)
                    if (finalConfig?.processedDataSource) {
                      this.processedData = finalConfig.processedDataSource
                    } else {
                      this.processedData = []
                    }
                    this.showChart = true
                })
                .catch(error => {
                    this.setLoading(false)
                    this.processedData = []
                    this.showChart = false
                    console.error("[VchartRender chartInit] Error fetching update data:", error)
                })
        }
    },
    dataInit (filterList) {
      this.setLoading(true)
      this.changeData(this.config, filterList)
        .then(finalConfig => {
          this.setLoading(false)
           if (finalConfig?.processedDataSource) {
             this.processedData = finalConfig.processedDataSource
           } else {
             this.processedData = []
           }
          this.showChart = true
        })
        .catch(error => {
          this.setLoading(false)
          this.processedData = []
          this.showChart = false
          console.error("[VchartRender dataInit] Error fetching linked data:", error)
        })
    },
    dataFormatting (config, data) {
      let processedDataSource = null
      if (data.success) {
        processedDataSource = data.data
        if (config.dataHandler) {
          try {
            const handlerFn = new Function('data', 'config', config.dataHandler)
            const result = handlerFn(processedDataSource, config)
            if (result !== undefined) {
                 processedDataSource = result
            }
          } catch (e) {
            processedDataSource = []
            console.error(`[VchartRender dataFormatting] Error executing dataHandler for ${config.name}:`, e)
          }
        }
        config.processedDataSource = processedDataSource
      } else {
        processedDataSource = []
        console.warn(`[VchartRender dataFormatting] API data fetch failed for ${config.name}`)
        config.processedDataSource = processedDataSource
      }

      this.changeChartConfig(cloneDeep(config))
      return config
    },
    changeStyle (config, isUpdateTheme) {
      config = { ...this.config, ...config }; // Start with a merged config

      if (!isUpdateTheme) {
        config.theme = settingToTheme(cloneDeep(config), this.customTheme);
      }

      if (typeof config.option !== 'object' || config.option === null) {
        config.option = {};
      }

      if (config.setting && Array.isArray(config.setting)) {
        config.setting.forEach(settingItem => {
          if (settingItem && typeof settingItem.optionField === 'string' && settingItem.optionField.trim() !== '' && settingItem.hasOwnProperty('value')) {
            const directPathInOption = settingItem.optionField.trim();
            let valueToProcess = settingItem.value; // Start with the original value
            const isIncrementalUpdate = settingItem.isIncremental === true;
            const settingType = settingItem.type;

            // Attempt to parse valueToProcess if it's a string that might be JSON
            if (typeof valueToProcess === 'string' && valueToProcess.trim().length > 0) {
              // Check if it looks like JSON (starts with { or [ and ends with } or ])
              // This is a basic check; JSON.parse will do the definitive validation.
              const trimmedValue = valueToProcess.trim();
              if ((trimmedValue.startsWith('{') && trimmedValue.endsWith('}')) || 
                  (trimmedValue.startsWith('[') && trimmedValue.endsWith(']'))) {
                try {
                  const parsedValue = JSON.parse(trimmedValue);
                  // If parsing is successful, use the parsed object/array
                  valueToProcess = parsedValue;
                  console.log(`[VchartRender changeStyle] Successfully parsed string to JSON for path ${directPathInOption}:`, valueToProcess);
                } catch (e) {
                  // Not a valid JSON string, or some other error during parse.
                  // Keep valueToProcess as the original string.
                  console.log(`[VchartRender changeStyle] Failed to parse string as JSON for path ${directPathInOption}, using as plain string. Error:`, e.message);
                }
              }
            }
            
            console.log(`[VchartRender changeStyle] Path: ${directPathInOption}, Processed Value:`, valueToProcess, `, Incremental: ${isIncrementalUpdate}, Type: ${settingType}`);

            try {
              if (isIncrementalUpdate) {
                // INCREMENTAL UPDATE LOGIC (now using valueToProcess)
                if (typeof valueToProcess === 'string') { // Check type AFTER potential JSON parse
                  if (valueToProcess !== '' && valueToProcess !== null && valueToProcess !== undefined) {
                    _.set(config.option, directPathInOption, valueToProcess);
                    console.log(`[VchartRender changeStyle] Incremental SET (string) for ${directPathInOption} to:`, valueToProcess);
                  } else {
                    console.log(`[VchartRender changeStyle] Incremental SKIP (empty string) for ${directPathInOption}.`);
                  }
                } else if (typeof valueToProcess === 'object' && valueToProcess !== null && Object.keys(valueToProcess).length > 0) {
                  let targetForMerge = _.get(config.option, directPathInOption);
                  if (typeof targetForMerge === 'object' && targetForMerge !== null) {
                    _.merge(targetForMerge, valueToProcess);
                    console.log(`[VchartRender changeStyle] Incremental MERGE for ${directPathInOption} with:`, valueToProcess);
                  } else {
                    _.set(config.option, directPathInOption, cloneDeep(valueToProcess));
                    console.log(`[VchartRender changeStyle] Incremental SET (object, target not mergeable) for ${directPathInOption} to:`, valueToProcess);
                  }
                } else if (Array.isArray(valueToProcess) && valueToProcess.length > 0) {
                  _.set(config.option, directPathInOption, cloneDeep(valueToProcess));
                  console.log(`[VchartRender changeStyle] Incremental SET (array) for ${directPathInOption} to:`, valueToProcess);
                } else {
                  console.log(`[VchartRender changeStyle] Incremental SKIP (null/undefined/empty obj/array/primitive) for ${directPathInOption}.`);
                }
              } else {
                // OVERWRITE UPDATE LOGIC (using valueToProcess)
                _.set(config.option, directPathInOption, valueToProcess);
                console.log(`[VchartRender changeStyle] Overwrite SET for ${directPathInOption} to:`, valueToProcess);
              }
            } catch (e) {
              console.error(`[VchartRender changeStyle] Error processing path "${directPathInOption}":`, e);
            }
          } else {
            // console.log('[VchartRender changeStyle] Skipping settingItem ...');
          }
        });
      }

      this.changeChartConfig(cloneDeep(config));
      if (config.code === this.activeCode) {
        this.changeActiveItemConfig(cloneDeep(config));
      }
     
      this.initialOption = cloneDeep(config.option); 
      this.showChart = true;
      return config;
    },
    setLoading(isLoading) {
      const loadingConfig = { code: this.config.code, loading: isLoading };
      this.changeChartLoading(loadingConfig);
    },
    handleLinkageTrigger(linkageData) {
      this.linkage(linkageData);
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
.loading-placeholder,
.no-data-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888;
    font-size: 14px;
}
</style>
