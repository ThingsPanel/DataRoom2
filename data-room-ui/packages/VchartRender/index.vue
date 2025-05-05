<template>
  <div
    style="width: 100%; height: 100%"
    class="bs-design-wrap bs-custom-component"
    :class="{ 'light-theme': customTheme === 'light', 'auto-theme': customTheme !== 'light' }"
  >
    <!-- Container for VChart instance -->
    <div :id="chatId" style="width: 100%; height: 100%" />
  </div>
</template>

<script>
// VChart Core
import VChart from '@visactor/vchart';

// Utils
import { cloneDeep, set as _set, isEqual } from 'lodash-es';
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting';
import { EventBus } from 'data-room-ui/js/utils/eventBus'; // Optional, if directly used

// Mixins
import commonMixins from 'data-room-ui/js/mixins/commonMixins';
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins';

// Vuex
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'VchartRender',
  mixins: [commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    // Renamed to avoid conflict with mixin's computed property
    previewMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null, // Holds the VChart instance
    };
  },
  computed: {
    // Vuex state mapping
    ...mapState('bigScreen', {
      pageInfo: (state) => state.pageInfo,
      customTheme: (state) => state.pageInfo.pageConfig.customTheme,
      activeCode: (state) => state.activeCode,
      // plotList: state => state.plotList // Map if needed for default data
    }),
    // Generate unique ID for the chart container DOM element
    chatId() {
      let prefix = 'chart_';
      // Use previewMode prop instead of isPreview computed from mixin
      if (this.previewMode || this.$route.path === window?.BS_CONFIG?.routers?.previewUrl) {
        prefix = 'preview_chart_';
      }
      if (this.$route.path === window?.BS_CONFIG?.routers?.designUrl) {
        prefix = 'design_chart_';
      }
      // Add other prefixes if needed (e.g., for pageListUrl)
      return prefix + (this.config?.code || Math.random().toString(36).substring(7)); // Fallback ID
    },
  },
  watch: {
    // Watch specific VChart option changes if needed, then call this.changeStyle
    // Example: 'config.option.axes': { deep: true, handler() { this.changeStyle(this.config); } }
  },
  // mounted() - Relying on commonMixins mounted hook to call chartInit and watchCacheData
  beforeDestroy() {
    // Release VChart instance (Mixin's beforeDestroy handles polling/debounce)
    if (this.chart) {
      try {
        this.chart.release();
        this.chart = null;
        console.log(`[VchartRender ${this.config?.code}] Chart released.`);
      } catch (error) {
        console.error(`[VchartRender ${this.config?.code}] Error releasing chart:`, error);
      }
    }
    // Disconnect ResizeObserver if it was created in component's mounted
    // If relying solely on mixin's mounted, this might not be needed here.
    // However, Echarts/PlotRender create it in component's mounted.
    if (this.$resizeObserver) { // Assuming we create it in component's mounted
       this.$resizeObserver.disconnect();
    }
  },
  methods: {
    // Vuex mutations mapping
    ...mapMutations('bigScreen', [
      'changeChartConfig',
      'changeActiveItemConfig',
      'changeChartLoading',
      // 'updateDataset', // Used internally by commonMixins
      // 'updateComputedDatas' // Used internally by commonMixins
    ]),

    // --- Core Methods Implementation (based on 开发指南.md) ---

    // Method stubs to be filled in next steps
    chartInit() { /* To be implemented */ },
    changeStyle(newConfig, isUpdateTheme = false) { /* To be implemented */ },
    dataFormatting(config, data) { /* To be implemented */ },
    newChart(config) { /* To be implemented */ },
    applyStylesAndHandlers(config) { /* To be implemented */ },
    applySettingsToVChartSpec(config, settingType) { /* To be implemented */ },
    executeDataHandler(config) { /* To be implemented */ },
    mapDataToVChartSpec(config) { /* To be implemented */ },
    updateVuexWithConfig(configToStore) { /* To be implemented */ },
    dataInit (filterList, isInner = false) { /* To be implemented */ },
    registerEvent() { /* To be implemented */ },
    extractLinkageData(eventParams) { /* To be implemented */ },

    /**
     * Updates Vuex store with the latest config, comparing to avoid unnecessary commits.
     * @param {object} configToStore - The configuration object to store.
     */
    updateVuexWithConfig(configToStore) {
      // Implementation directly based on guide and previous correct logic
      if (!configToStore || !configToStore.code) {
         console.error("[VchartRender] updateVuexWithConfig called with invalid config:", configToStore);
         return;
      }
      const code = configToStore.code;
      // Log: console.log(`[VchartRender ${code}] updateVuexWithConfig running...`);

      const oldConfigFromStore = this.$store.state.bigScreen.pageInfo.chartList.find(
        (chart) => chart && chart.code === code
      );

      // Perform deep comparison
      const hasOptionChanged = !isEqual(oldConfigFromStore?.option, configToStore.option);
      const hasSettingChanged = !isEqual(oldConfigFromStore?.setting, configToStore.setting);
      const hasLayoutChanged = oldConfigFromStore?.w !== configToStore.w ||
                               oldConfigFromStore?.h !== configToStore.h ||
                               oldConfigFromStore?.x !== configToStore.x ||
                               oldConfigFromStore?.y !== configToStore.y; // Add other layout props if needed

      if (hasOptionChanged || hasSettingChanged || hasLayoutChanged || !oldConfigFromStore) { 
        // Log: console.log(`[VchartRender ${code}] Config changed, committing updates to Vuex.`);
        try {
            const configCloneForChart = cloneDeep(configToStore);
            // Log: console.log(`[VchartRender ${code}] comType in configCloneForChart BEFORE changeChartConfig commit:`, configCloneForChart.option?.comType);
            this.changeChartConfig(configCloneForChart);

            if (code === this.activeCode) {
                const configCloneForActive = cloneDeep(configToStore);
                // Log: console.log(`[VchartRender ${code}] comType in configCloneForActive BEFORE changeActiveItemConfig commit:`, configCloneForActive.option?.comType);
                this.changeActiveItemConfig(configCloneForActive);
            }
            // Log: console.log(`[VchartRender ${code}] Vuex commit successful.`);
        } catch(e) { 
           console.error(`[VchartRender ${code}] Error committing to Vuex:`, e);
        }
      } else {
        // Log: console.log(`[VchartRender ${code}] Config unchanged, skipping Vuex commit.`);
      }
    },

    /**
     * Applies settings from config.setting to the VChart spec (config.option).
     * Handles both 'custom' and 'data' type settings.
     * @param {object} config - The chart configuration object.
     * @param {string} settingType - 'custom' or 'data'.
     */
    applySettingsToVChartSpec(config, settingType) {
      // Log: console.log(`[VchartRender ${config?.code}] Applying settings of type '${settingType}'...`);
      if (!config || !config.setting || !config.option) {
         console.warn(`[VchartRender ${config?.code}] Missing config, setting, or option in applySettingsToVChartSpec.`);
         return config;
      }

      let spec = config.option; // Reference to the spec object
      const settingsToApply = config.setting.filter(s => s.tabName === settingType);

      settingsToApply.forEach(setting => {
         // Apply settings with optionField path
         if (setting.optionField) {
            try {
               _set(spec, setting.optionField, setting.value);
               // Log: console.log(`[VchartRender ${config?.code}] Applied setting: ${setting.optionField} =`, setting.value);
            } catch (e) {
               console.error(`[VchartRender ${config?.code}] Error applying setting ${setting.optionField}:`, e);
            }
         }

         // Handle specific field mappings (typically in 'data' settings)
         if (settingType === 'data') {
            if (setting.field === 'xField' && setting.value) {
               spec.xField = setting.value;
               // Log: console.log(`[VchartRender ${config.code}] Dynamically set xField to:`, spec.xField);
            } else if (setting.field === 'yField' && setting.value) {
               spec.yField = setting.value;
               // Log: console.log(`[VchartRender ${config.code}] Dynamically set yField to:`, spec.yField);
            } else if (setting.field === 'seriesField' && setting.value) {
               spec.seriesField = setting.value; // For VChart series grouping
               // Log: console.log(`[VchartRender ${config.code}] Dynamically set seriesField to:`, spec.seriesField);
            }
            // Add other potential field mappings if needed (e.g., categoryField, valueField for specific charts)
         }
      });

      // Ensure spec.data exists if applying data settings (might be needed if data is empty initially)
      if (settingType === 'data' && !spec.data) {
         spec.data = [{ id: 'defaultDataId', values: [] }];
      }
      
      // No need to return config.option = spec as spec is modified by reference
      return config; 
    },

    /**
     * Central place to apply 'custom' styles/settings and execute optionHandler.
     * Called by changeStyle.
     * @param {object} config - The chart configuration object.
     */
    applyStylesAndHandlers(config) {
       if (!config) { 
           console.error(`[VchartRender] applyStylesAndHandlers called with invalid config.`);
           return null; 
       }
       const code = config.code;
       // Ensure option exists
       if (!config.option) config.option = {}; 

       let updatedConfig = cloneDeep(config); // Work on a copy? Or modify directly?
                                               // Let's modify directly like Echarts/Plot for consistency, but be mindful
      
       // 1. Apply 'custom' settings
       updatedConfig = this.applySettingsToVChartSpec(updatedConfig, 'custom');

       // 2. Execute optionHandler script (modifies updatedConfig.option)
       if (updatedConfig.optionHandler && updatedConfig.optionHandler.trim() && !updatedConfig.optionHandler.trim().startsWith('//')) {
          // Log: console.log(`[VchartRender ${code}] Executing optionHandler...`);
          try {
             // Provide option (spec), config, data (current state), setting
             const option = updatedConfig.option;
             const data = updatedConfig.option.data?.[0]?.values; // Pass current data if available
             const setting = updatedConfig.setting;

             const handlerFunc = new Function('option', 'config', 'data', 'setting', updatedConfig.optionHandler);
             const result = handlerFunc(option, updatedConfig, data, setting);
             
             // If handler explicitly returns an option object, use it.
             // Otherwise, assume it modified the 'option' object passed by reference.
             if (result !== undefined && typeof result === 'object') {
                 updatedConfig.option = result; 
             }
             // Log: console.log(`[VchartRender ${code}] optionHandler executed.`);
          } catch (e) {
             console.error(`[VchartRender ${code}] Error executing optionHandler:`, e);
          }
       } else {
           // Log: console.log(`[VchartRender ${code}] Skipping empty or commented out optionHandler.`);
       }
       return updatedConfig; // Return potentially modified config
    },

    /**
     * Overrides commonMixins.changeStyle.
     * Applies 'custom' settings, executes optionHandler, handles theme, updates Vuex.
     * Does NOT render the chart directly.
     * @param {object} newConfig - The updated configuration object.
     * @param {boolean} isUpdateTheme - Flag if the change was triggered by a theme update.
     */
    changeStyle(newConfig, isUpdateTheme = false) {
      // Log: console.log(`[VchartRender ${this.config?.code}] changeStyle called.`);
      let config = cloneDeep(newConfig || this.config); 

      // 1. Apply 'custom' settings and optionHandler
      try {
         config = this.applyStylesAndHandlers(config);
         if (!config) throw new Error("applyStylesAndHandlers returned null");
      } catch (e) {
         console.error(`[VchartRender ${this.config?.code}] Error during applyStylesAndHandlers in changeStyle:`, e);
         // Decide how to proceed. Maybe return original config?
         return cloneDeep(newConfig || this.config); // Return original on error
      }
      
      // 2. Handle Theme (Optional - adapt based on VChart theme needs)
      if (!isUpdateTheme) {
         // Example: Apply theme if VChart spec has a theme property
         // const vchartTheme = settingToTheme(config, this.customTheme); // May need adjustment
         // if (config.option) config.option.theme = vchartTheme.themeName; // Or apply specific theme properties
      }

      // 3. Update Vuex
      this.updateVuexWithConfig(config);

      // DO NOT call newChart or chart.updateSpec here.

      // Log: console.log(`[VchartRender ${config?.code}] changeStyle completed, config prepared for Vuex.`);
      return config; // Return the processed config for chartInit
    },

    // --- Data Handling Helpers ---
    executeDataHandler(config) {
        if (!config) return config;
        const code = config.code;
        // Check if dataHandler exists and is executable code
        if (config.dataHandler && config.dataHandler.trim() && !config.dataHandler.trim().startsWith('//')) {
            // Log: console.log(`[VchartRender ${code}] Executing dataHandler...`);
            try {
                // Data accessible to handler: Mixin result ('data') or potentially pre-processed data
                // Let's assume Mixin result is in config._mixinDataResult or config.data
                const rawData = config._mixinDataResult?.data || config.data?.data || []; 
                const setting = config.setting;
                const option = config.option; // Option might have been modified by changeStyle/optionHandler

                const dataHandlerFunc = new Function('data', 'setting', 'option', config.dataHandler);
                const handlerResult = dataHandlerFunc(rawData, setting, option); 
                
                // Update data based on handler result
                if (Array.isArray(handlerResult)) {
                    // If handler returns an array, assume it's the new data values
                    config.data = { data: handlerResult }; // Store processed data back for mapDataToVChartSpec
                    // Log: console.log(`[VchartRender ${code}] dataHandler returned new data array.`);
                } else if (handlerResult !== undefined) {
                   // If handler modified 'option' by reference (e.g., gauge chart), 
                   // the changes are already in config.option.
                   // Log: console.log(`[VchartRender ${code}] dataHandler potentially modified option object directly.`);
                }
                // Log: console.log(`[VchartRender ${code}] dataHandler executed.`);
            } catch (e) {
                console.error(`[VchartRender ${code}] Error executing dataHandler:`, e);
                // Keep existing data or clear it on error?
                // config.data = { data: [] }; // Option: Clear data on handler error
            }
        } else {
             // Log: console.log(`[VchartRender ${code}] Skipping empty or commented out dataHandler.`);
        }
        return config;
    },

    mapDataToVChartSpec(config) {
        if (!config || !config.option) return config;
        const code = config.code;
        // Log: console.log(`[VchartRender ${code}] Mapping data to VChart spec...`);

        // Get the data processed by executeDataHandler (stored in config.data.data)
        let processedData = config.data?.data || [];

        // Ensure VChart's spec.data structure exists
        if (!config.option.data) {
            config.option.data = [{ id: 'defaultDataId', values: [] }];
        } else if (!Array.isArray(config.option.data)) { // Handle if option.data is not an array
           console.warn(`[VchartRender ${code}] config.option.data is not an array. Resetting.`, config.option.data);
           config.option.data = [{ id: 'defaultDataId', values: [] }];
        } else if (config.option.data.length === 0) { // Handle empty array
           config.option.data.push({ id: 'defaultDataId', values: [] });
        }

        // Ensure processedData is an array before assignment
        if (!Array.isArray(processedData)) {
           console.warn(`[VchartRender ${code}] Processed data for mapping is not an array. Using empty array.`, processedData);
           processedData = [];
        }

        // Assign processed data to the 'values' property of the first data source
        // Assumes VChart primarily uses the first data source object
        config.option.data[0].values = processedData;
        // Log: console.log(`[VchartRender ${code}] Assigned data to spec.data[0].values. Length:`, processedData.length);

        // Optional: Clean up temporary data holder if needed
        // delete config.data; 

        return config;
    },

    /**
     * Overrides commonMixins.dataFormatting.
     * Executes data processing steps for VChart after data is fetched.
     * @param {object} config - The current chart configuration.
     * @param {object} data - The result object from Mixin's API call ({success, data, ...}).
     */
    dataFormatting(config, data) { 
      // Log: console.log(`[VchartRender ${config?.code}] dataFormatting called with data success:`, data?.success);
      let processedConfig = cloneDeep(config); 
      
      if (data.success) {
          // Store original mixin result temporarily if needed by handlers
          processedConfig._mixinDataResult = data; 
          // Standardize raw data location
          processedConfig.data = { data: data.data || [] }; 

          try {
              // Execute dataHandler (modifies processedConfig.data.data or processedConfig.option)
              processedConfig = this.executeDataHandler(processedConfig); 

              // Map processed data into VChart spec structure (processedConfig.option.data[...].values)
              processedConfig = this.mapDataToVChartSpec(processedConfig);

              // Apply 'data' settings (like xField, yField mappings from settings to spec)
              processedConfig = this.applySettingsToVChartSpec(processedConfig, 'data'); 
              
              // Clean up temporary data holder
              delete processedConfig._mixinDataResult; 
          } catch (dataProcessingError) {
              console.error(`[VchartRender ${config.code}] Error during dataFormatting processing steps:`, dataProcessingError);
              // Fallback strategy on error: Use original option, but clear data values
              processedConfig.option = cloneDeep(config.option) || {}; // Restore original option structure
              if(processedConfig.option.data && Array.isArray(processedConfig.option.data) && processedConfig.option.data[0]) {
                  processedConfig.option.data[0].values = []; // Clear data
              } else {
                   processedConfig.option.data = [{ id: 'defaultDataId', values: [] }]; // Ensure data structure exists
              }
          }
      } else {
          // Data fetch failed - use existing option structure but clear data
          // Log: console.warn(`[VchartRender ${config.code}] Data fetch failed in dataFormatting.`);
          processedConfig.option = processedConfig.option || {}; // Ensure option exists
          if(processedConfig.option.data && Array.isArray(processedConfig.option.data) && processedConfig.option.data[0]) {
             processedConfig.option.data[0].values = []; // Clear data
          } else {
             processedConfig.option.data = [{ id: 'defaultDataId', values: [] }]; // Ensure data structure exists
          }
      }

      // Return the fully processed config for the Mixin Promise to resolve
      return processedConfig; 
    },

    /**
     * Overrides commonMixins.newChart.
     * Creates/Updates the VChart instance.
     * @param {object} config - The final, processed config object from dataFormatting.
     */
    newChart(config) { 
       const spec = config?.option;
       const code = config?.code || this.config?.code; 

       if (!config) { console.error(`[VchartRender ${code}] newChart called with null config.`); return; }
       
       // Validate spec more thoroughly
       if (!spec || typeof spec !== 'object') { 
         console.error(`[VchartRender ${code}] Invalid spec received in newChart. Aborting render.`, spec);
         return; 
       }
       if (!spec.type || !spec.xField || !spec.yField) { // Check core fields
          console.warn(`[VchartRender ${code}] Spec might be missing core fields (type, xField, yField).`, spec);
          // Don't necessarily abort, VChart might handle defaults, but log warning
       }
       // Ensure data is at least an empty array within the spec for VChart
       if (!spec.data) spec.data = [{ id: 'defaultDataId', values: [] }];
       else if (!Array.isArray(spec.data)) spec.data = [{ id: 'defaultDataId', values: [] }];
       else if (spec.data.length === 0) spec.data.push({ id: 'defaultDataId', values: [] });
       else if (!spec.data[0].values) spec.data[0].values = [];
       else if (!Array.isArray(spec.data[0].values)) spec.data[0].values = [];
       
       const container = document.getElementById(this.chatId);
       if (!container) { console.error(`[VchartRender ${code}] Container element #${this.chatId} not found.`); return; }

       try {
          // Destroy previous instance if exists (safer update)
          if (this.chart) {
             try { this.chart.release(); } catch (e) { console.warn(`[VchartRender ${code}] Error releasing previous chart:`, e); }
             this.chart = null;
          }
          
          // Log: console.log(`[VchartRender ${code}] Creating new VChart instance with spec:`, cloneDeep(spec));
          this.chart = new VChart(spec, { dom: container });
          this.chart.renderAsync(); 

          // Register events after successful render
          this.registerEvent(); 
       } catch (error) {
          console.error(`[VchartRender ${code}] Error creating VChart instance:`, error, 'Spec:', spec);
          this.chart = null; // Ensure chart is null on error
       }
    },

    /**
     * Overrides commonMixins.chartInit.
     * Orchestrates the initialization and data fetching/processing flow.
     */
    chartInit () {
      let config = cloneDeep(this.config);
      const code = config?.code;
      // Log: console.log(`[VchartRender ${code}] chartInit started.`);
      if (!config || !code) { console.error(`[VchartRender] Invalid initial config in chartInit.`, config); return; }

      // Use previewMode prop
      const isInitialLoad = this.previewMode || config.key === config.code; 
      if (isInitialLoad) { // Initial Load
        // Log: console.log(`[VchartRender ${code}] Initial load path.`);
        try {
           // 1. Apply initial styles ('custom' settings, optionHandler), update Vuex
           config = this.changeStyle(config); 
        } catch (e) { 
            console.error(`[VchartRender ${code}] Error during initial changeStyle:`, e);
            // Optionally return or proceed with potentially unstyled config
        }
        // 2. Set Loading State & Fetch Data
        this.changeChartLoading({ code: code, loading: true });
        // Log: console.log(`[VchartRender ${code}] Calling changeDataByCode...`);
        this.changeDataByCode(config) // Mixin fetches, then calls *overridden* dataFormatting
            .then((processedConfig) => { // resolved value is from dataFormatting
               // Log: console.log(`[VchartRender ${code}] changeDataByCode -> dataFormatting successful. Final config:`, cloneDeep(processedConfig));
               this.changeChartLoading({ code: code, loading: false });
               // 3. Render with the fully processed config
               this.newChart(processedConfig);
            })
            .catch((error) => {
               console.error(`[VchartRender ${code}] changeDataByCode process failed:`, error);
               this.changeChartLoading({ code: code, loading: false });
            });
      } else { // Data Update (e.g., triggered by linkage)
        // Log: console.log(`[VchartRender ${code}] Update data path (changeData).`);
         // This path relies on linkageMixins/events calling this.changeData
         // The actual logic execution happens within the commonMixins.changeData -> this.dataFormatting flow
         // We might not need specific code here if changeData is correctly triggered elsewhere.
         // However, EchartsRender/PlotRender *do* have logic here for direct updates.
         // Let's replicate that pattern for consistency, assuming direct update might be needed.
         this.changeChartLoading({ code: code, loading: true });
         // Log: console.log(`[VchartRender ${code}] Calling changeData (for update)...`);
         this.changeData(config) // Calls Mixin, which calls overridden dataFormatting
             .then((processedConfig) => {
                 // Log: console.log(`[VchartRender ${code}] changeData -> dataFormatting successful. Final config:`, cloneDeep(processedConfig));
                 this.changeChartLoading({ code: code, loading: false });
                 this.newChart(processedConfig);
             })
             .catch((error) => {
                 console.error(`[VchartRender ${code}] changeData process failed:`, error);
                 this.changeChartLoading({ code: code, loading: false });
             });
      }
    },

    /**
     * Overrides linkageMixins.dataInit.
     * Handles data updates triggered by external filters/linkage.
     * @param {Array} filterList - The filter conditions from the event.
     * @param {boolean} isInner - Flag indicating if the trigger was internal.
     */
    dataInit (filterList, isInner = false) {
      const code = this.config?.code;
      // Log: console.log(`[VchartRender ${code}] dataInit called with filterList:`, filterList);
      if (Array.isArray(filterList)) {
         this.changeChartLoading({ code: code, loading: true });
         // Call commonMixins.changeData to fetch and process data with filters
         this.changeData(this.config, filterList)
             .then((processedConfig) => {
                 // Log: console.log(`[VchartRender ${code}] changeData (triggered by dataInit) successful. Final config:`, cloneDeep(processedConfig));
                 this.changeChartLoading({ code: code, loading: false });
                 // Render the chart with the updated, filtered, processed data
                 this.newChart(processedConfig);
             })
             .catch(err => {
                 console.error(`[VchartRender ${code}] Error during changeData triggered by dataInit:`, err);
                 this.changeChartLoading({ code: code, loading: false });
             });
      } else {
          console.warn(`[VchartRender ${code}] dataInit called with invalid filterList:`, filterList);
      }
    },

    /** 
     * Registers VChart event listeners, e.g., for linkage.
     */
    registerEvent() {\n        if (!this.chart) return;\n        const code = this.config?.code;\n        // Remove previous listeners if any (VChart API might differ)\n        // this.chart.off('click'); // Example, check VChart docs for event removal
        // Log: console.log(`[VchartRender ${code}] Registering chart events.`);\n        this.chart.on('click', (params) => {\n            // Log: console.log(`[VchartRender ${code}] VChart clicked:`, params);
            const linkageData = this.extractLinkageData(params); 
            if (linkageData && Object.keys(linkageData).length > 0) { // Ensure data exists
                 // Log: console.log(`[VchartRender ${code}] Triggering linkage with data:`, linkageData);\n                 // Call linkageMixins method
                 this.linkage(linkageData); 
            } else {\n                 // Log: console.log(`[VchartRender ${code}] No linkage data extracted from click event.`);\n            }\n        });\n        // Add other event listeners (e.g., 'selectElement', 'legendItemClick') as needed
    },
    \n    /**
     * Extracts data suitable for linkage from VChart event parameters.
     * Needs specific implementation based on VChart event object structure.
     * @param {object} eventParams - The event object from VChart.
     */
    extractLinkageData(eventParams) {\n        // --- Needs specific implementation based on VChart event structure --- \n        // Example: Assuming the relevant data is in eventParams.datum
        if (eventParams?.datum) {\n           // Return the datum object or specific fields from it
           return eventParams.datum; 
        } \n        // Add more specific checks based on event type if needed
        return null; // Return null if no suitable data found
    },

},
};
</script>

<style lang="scss" scoped>
/* Add component-specific styles if needed */
/* Inherit theme styles */
.light-theme {
  /* background-color: #ffffff; */
  /* color: #000000; */
}
.auto-theme {
  /* background-color: transparent; */
}
.bs-custom-component {
  /* Add any base styles for custom components */
}
</style>
