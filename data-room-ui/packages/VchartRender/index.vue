<template>
  <div class="vchart-logic-placeholder">
    <!-- This component now only handles logic, no rendering -->
     <span v-if="isLoading">Processing Config...</span>
     <span v-else>VChart Logic Handler - Ready</span>
     <!-- Restore copy button for debugging the whole config -->
     <button v-if="!isPreview" @click="copyConfig" style="position: absolute; top: 5px; right: 5px; z-index: 10; opacity: 0.8; cursor: pointer; background: #eee; border: 1px solid #ccc; padding: 2px 5px; font-size: 10px; border-radius: 3px;">
       复制配置
     </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import commonMixins from 'data-room-ui/js/mixins/commonMixins';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
// --- Remove VchartCore import ---
// import VchartCore from './VchartCore/index.vue';

export default {
  name: 'VchartRenderLogic', // Restore original name
  // --- Remove VchartCore from components ---
  // components: { VchartCore },
  mixins: [commonMixins],
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      debouncedProcessConfig: null
      // --- Remove currentSpec ---
      // currentSpec: null
    };
  },
  computed: {
    ...mapState('bigScreen', {
      pageInfo: state => state.pageInfo,
      activeCode: state => state.activeCode,
    }),
    isPreview() {
      return this.$route.path === (window?.BS_CONFIG?.routers?.previewUrl || '/big-screen/preview');
    },
  },
  watch: {
    config: {
      handler(newConfig, oldConfig) {
        if (oldConfig && !_.isEqual(newConfig, oldConfig)) {
           console.log(`[VchartRenderLogic] Config changed, debouncing process...`);
           this.debouncedProcessConfig(newConfig);
        } else if (!oldConfig) {
             console.log(`[VchartRenderLogic] Initial config load, debouncing process...`);
             this.debouncedProcessConfig(newConfig);
        }
      },
      deep: true,
    }
  },
  created() {
    this.debouncedProcessConfig = debounce(this.processConfig, 300);

    this.$on('hook:beforeDestroy', () => {
      if (this.debouncedProcessConfig) {
        this.debouncedProcessConfig.cancel();
      }
    });
  },
  mounted() {
    // ... existing mounted (now empty or commented out) ...
     // console.log(`[VchartRenderLogic] Mounted. Watcher will handle initial processing.`);
     // this.processConfig(this.config);
  },
  methods: {
    ...mapMutations('bigScreen', [
      'changeChartConfig',
      'changeActiveItemConfig',
      'changeChartLoading'
    ]),

    async processConfig (config) {
      if (!config) {
          console.warn("[VchartRenderLogic] processConfig called with null config.");
          // --- Remove currentSpec update ---
          // this.currentSpec = null;
          return;
      }
      console.log(`[VchartRenderLogic processConfig] Starting for ${config.code}...`);
      this.isLoading = true;
      this.changeChartLoading({ ...config, loading: true });
      // --- Remove currentSpec update ---
      // this.currentSpec = null;

      let processedConfig = cloneDeep(config);

      try {
        const needsDataFetch = config.code === config.key || this.isPreview;

        if (needsDataFetch && config.dataSource && config.dataSource.source) {
             console.log(`[VchartRenderLogic processConfig] Fetching data by code for ${config.code}...`);
             processedConfig = await this.changeDataByCode(processedConfig);
             console.log(`[VchartRenderLogic processConfig] Data fetched by code. Resulting config:`, processedConfig);
        } else if (!needsDataFetch && config.dataSource && config.dataSource.source) {
             console.log(`[VchartRenderLogic processConfig] Fetching data by change for ${config.code}...`);
             processedConfig = await this.changeData(processedConfig);
              console.log(`[VchartRenderLogic processConfig] Data fetched by change. Resulting config:`, processedConfig);
        } else {
            console.log(`[VchartRenderLogic processConfig] Skipping data fetch for ${config.code}.`);
             if (processedConfig.option?.data?.[0]?.values) { // Check if initial default data exists in the correct place
                 processedConfig = this.dataFormatting(processedConfig, { success: true, data: processedConfig.option.data[0].values });
                 console.log(`[VchartRenderLogic processConfig] Data formatting applied on existing initial data. Resulting config:`, processedConfig);
             } else {
                 console.log('[VchartRenderLogic processConfig] No initial data found in option.data[0].values for formatting.')
             }
        }

        processedConfig = this.applyStylesAndOptionHandler(processedConfig);
        console.log(`[VchartRenderLogic processConfig] Styles and optionHandler applied. Final processed config:`, cloneDeep(processedConfig));

        // --- Remove currentSpec update ---
        // this.currentSpec = processedConfig.option ? cloneDeep(processedConfig.option) : null;
        // console.log(`[VchartRenderLogic processConfig] Updated local currentSpec for rendering:`, this.currentSpec);

        // Commit final processed config to Vuex
        this.changeChartConfig(processedConfig);
        if (processedConfig.code === this.activeCode) {
            this.changeActiveItemConfig(processedConfig);
            console.log(`[VchartRenderLogic processConfig] Committed final config to Vuex for active item ${processedConfig.code}.`);
        }

      } catch (error) {
          console.error(`[VchartRenderLogic processConfig] Error during processing for ${config.code}:`, error);
          // --- Remove currentSpec update ---
          // this.currentSpec = null;
      } finally {
          this.isLoading = false;
           const finalLoadingState = { ...(processedConfig || config), loading: false };
           this.changeChartLoading(finalLoadingState);
           console.log(`[VchartRenderLogic processConfig] Finished processing for ${config.code}. Loading set to false.`);
      }
    },

    applyStylesAndOptionHandler (config) {
        let currentConfig = cloneDeep(config);
        console.log(`[VchartRenderLogic applyStyles] Applying custom settings for ${currentConfig.code}...`);
        currentConfig = this.transformSettingToOption(currentConfig, 'custom');

        const option = currentConfig.option ? cloneDeep(currentConfig.option) : {};

        if (currentConfig.optionHandler && typeof currentConfig.optionHandler === 'string' && currentConfig.optionHandler.trim()) {
            try {
                const optionHandlerFn = new Function('option', 'config', currentConfig.optionHandler + '\n return option;');
                console.log(`[VchartRenderLogic applyStyles] Executing optionHandler for ${currentConfig.code}...`);

                const modifiedOption = optionHandlerFn(option, currentConfig);
                 console.log(`[VchartRenderLogic applyStyles] optionHandler executed successfully for ${currentConfig.code}. Modified option:`, modifiedOption);

                currentConfig.option = modifiedOption;

            } catch (e) {
                console.error(`[VchartRenderLogic applyStyles] Error executing optionHandler for ${currentConfig.code}:`, e);
                console.error(`[VchartRenderLogic applyStyles] optionHandler script:`, currentConfig.optionHandler);
                 console.error(`[VchartRenderLogic applyStyles] Option state before error:`, option);
                currentConfig.option = option;
            }
        } else {
             console.log(`[VchartRenderLogic applyStyles] No optionHandler script found for ${currentConfig.code}.`);
             if (currentConfig.customize?.theme && currentConfig.option) {
                  currentConfig.option.theme = currentConfig.customize.theme;
             }
        }

        const themeSetting = currentConfig.setting?.find(s => s.field === 'chartTheme');
        if (themeSetting?.value && currentConfig.option) {
            console.log(`[VchartRenderLogic applyStyles] Setting option.theme based on setting: ${themeSetting.value}`);
            currentConfig.option.theme = themeSetting.value;
        }

        console.log(`[VchartRenderLogic applyStyles] Finished applying styles/handler for ${currentConfig.code}. Resulting config.option:`, currentConfig.option);
        return currentConfig;
    },

    dataFormatting(config, data) {
        console.log(`[VchartRenderLogic dataFormatting] Starting for ${config?.code}. Success: ${data?.success}`);
        let newConfig = cloneDeep(config);
        if (!newConfig.option) newConfig.option = {}; // Ensure option object exists

        if (data && data.success && data.data) {
            let processedData = cloneDeep(data.data);
            console.log(`[VchartRenderLogic dataFormatting] Raw data received:`, processedData);

            // Execute dataHandler if present
            if (newConfig.dataHandler && typeof newConfig.dataHandler === 'string' && newConfig.dataHandler.trim()) {
                try {
                    const dataHandlerFn = new Function('data', 'option', 'setting', newConfig.dataHandler);
                    console.log(`[VchartRenderLogic dataFormatting] Executing dataHandler for ${newConfig.code}...`);
                    const resultFromHandler = dataHandlerFn(processedData, newConfig.option, newConfig.setting);
                    if (resultFromHandler !== undefined) {
                        processedData = resultFromHandler;
                        console.log(`[VchartRenderLogic dataFormatting] dataHandler returned data:`, processedData);
                    } else {
                         console.log(`[VchartRenderLogic dataFormatting] dataHandler modified data/option in place.`);
                    }
                } catch (e) {
                    console.error(`[VchartRenderLogic dataFormatting] Error executing dataHandler for ${newConfig.code}:`, e);
                     console.error(`[VchartRenderLogic dataFormatting] dataHandler script:`, newConfig.dataHandler);
                }
            } else {
                console.log(`[VchartRenderLogic dataFormatting] No dataHandler script found for ${newConfig.code}.`);
            }

            // Ensure processedData is an array for VChart (most chart types)
            if (!Array.isArray(processedData)) {
               console.warn(`[VchartRenderLogic dataFormatting] Processed data is not an array for ${newConfig.code}, forcing empty array. Original:`, processedData);
               processedData = [];
            }

            // ***** MODIFIED: Directly assign to option.data[0].values *****
            // Ensure option.data structure exists like [{ id: '...' }]
            if (!Array.isArray(newConfig.option.data) || newConfig.option.data.length === 0) {
                 newConfig.option.data = [{ id: 'dataDefaultId' }]; // Use a default ID or get from original config if possible
                 console.log('[VchartRenderLogic dataFormatting] Initialized option.data structure.');
            }
            // Assign the processed data array to the 'values' property of the first data object
            newConfig.option.data[0].values = processedData;
            console.log(`[VchartRenderLogic dataFormatting] Assigned processed data directly to option.data[0].values:`, newConfig.option.data[0].values);
            // Remove the rawData assignment
            // delete newConfig.option.rawData;
            // ***** END OF MODIFICATION *****

        } else {
            console.warn(`[VchartRenderLogic dataFormatting] Data fetch failed or no data returned for ${newConfig.code}. Setting data values to empty array.`);
            // Ensure structure exists even on failure and set values to empty
             if (!Array.isArray(newConfig.option.data) || newConfig.option.data.length === 0) {
                 newConfig.option.data = [{ id: 'dataDefaultId' }];
             }
            newConfig.option.data[0].values = [];
            // delete newConfig.option.rawData;
        }
        console.log(`[VchartRenderLogic dataFormatting] Finished for ${newConfig.code}. Resulting config.option:`, newConfig.option);
        return newConfig;
    },

    transformSettingToOption (config, type) {
      console.log(`[VchartRenderLogic transformSetting] Applying direct settings for type '${type}' on ${config.code}...`);
      let currentConfig = cloneDeep(config);
      if (!currentConfig.option) currentConfig.option = {};

      (currentConfig.setting || []).forEach(set => {
        if (set.tabName === type && set.optionField) {
          try {
              _.set(currentConfig.option, set.optionField, set.value);
          } catch (e) {
               console.error(`[VchartRenderLogic transformSetting] Failed to set optionField '${set.optionField}' for ${currentConfig.code}:`, e);
          }
        }
      });
      console.log(`[VchartRenderLogic transformSetting] Finished direct settings for ${config.code}. Resulting option:`, currentConfig.option);
      return currentConfig;
    },

    async copyConfig() {
       // Copies the current state of the config prop held by this component
       if (!this.config) return;
       try {
         // Copy the entire config object as held by this component
         const configToCopy = cloneDeep(this.config);
         const configStr = JSON.stringify(configToCopy, null, 2);
         await navigator.clipboard.writeText(configStr);
         alert('当前组件配置已复制到剪贴板！');
       } catch (err) {
         console.error('无法复制配置: ', err);
         alert('复制失败！');
       }
     }

    // --- Remove onChartReady and onChartError methods ---
    // onChartReady(chartInstance) { ... },
    // onChartError(error) { ... }
  }
}
</script>

<style scoped>
/* Restore original placeholder styles */
.vchart-logic-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #888;
  border: 1px dashed #ccc; /* Optional: visual indicator */
  box-sizing: border-box;
  padding: 10px;
  text-align: center;
  background-color: rgba(0,0,0,0.02); /* Slight background */
}
</style>
