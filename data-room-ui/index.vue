<template>
  <div
    style="width: 100%;height: 100%"
    class="bs-design-wrap bs-custom-component"
    :class="{'light-theme':customTheme === 'light','auto-theme':customTheme !=='light'}"
  >
    {{chatId  }}
    <button v-if="!isPreview" @click="copyConfig" style="position: absolute; top: 5px; right: 5px; z-index: 10; opacity: 0.8; cursor: pointer; background: #eee; border: 1px solid #ccc; padding: 2px 5px; font-size: 10px; border-radius: 3px;">
      复制配置
    </button>
  </div>
</template>
<script>
import 'insert-css'
import cloneDeep from 'lodash/cloneDeep'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { mapState, mapMutations } from 'vuex'
// import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting' // ECharts theme logic, likely needs replacement
import _ from 'lodash' // Keep lodash if used elsewhere, otherwise remove if only set is needed
import VChart, { registerMap, registerWordCloudShape, registerLiquid } from '@visactor/vchart'; // Import VChart and registry functions
import { set } from 'lodash-es'; // Import lodash set for deep path setting

// Optional: Register extensions if needed globally or conditionally later
// registerWordCloudShape();
// registerLiquid();

export default {
  name: 'VChartCustomComponent', // Renamed component
  mixins: [commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      // chart: null, // Removed old ECharts instance reference
      vchartInstance: null, // Added VChart instance reference
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
  watch: {
    // Watch for external config changes (needs careful implementation to avoid loops)
    config: {
        handler(newConfig, oldConfig) {
            // Only update if the instance exists and the spec (in config.option) has actually changed
            // Note: Using JSON.stringify for comparison might be inefficient for large specs
            if (this.vchartInstance && newConfig.option && JSON.stringify(newConfig.option) !== JSON.stringify(oldConfig?.option)) {
                 console.log("Detected config change via watch, updating VChart spec (from config.option).");
                 // Pass the VChart spec, which is stored in config.option
                 this.vchartInstance.updateSpec(newConfig.option)
                    .catch(err => console.error("Error updating spec on config watch:", err));
            }
            // Avoid re-init in watch unless absolutely necessary and loop-safe
        },
        deep: true
    }
  },
  mounted () {
    this.chartInit(); // Initialize VChart on mount
  },
  beforeDestroy () {
    if (this.vchartInstance) {
      this.vchartInstance.release(); // Destroy VChart instance using release()
      this.vchartInstance = null;
    }
  },
  methods: {
    ...mapMutations('bigScreen', ['changeChartConfig', 'changeActiveItemConfig', 'changeChartLoading']),

    async chartInit () {
      let config = cloneDeep(this.config); // Work with a copy

      // Ensure config.option exists (this will hold the VChart spec)
      if (!config.option) config.option = {};

      // 1. Apply initial custom settings from config.setting to config.option (VChart spec)
      this.applySettingsToVChartSpec(config, 'custom');

      // 2. Load data
      config.loading = true;
      this.changeChartLoading(config);
      let dataResult = { success: false, data: null };
      try {
          // Determine data fetching method based on key/code or preview status
          if (config.key === config.code || this.isPreview) {
              dataResult = await this.changeDataByCode(config);
          } else {
              dataResult = await this.changeData(config);
          }
          // 3. Format data and apply data-related settings to config.option (VChart spec)
          this.dataFormatting(config, dataResult); // This now modifies config.option directly
      } catch (error) {
          console.error("Error fetching or processing data:", error);
          this.dataFormatting(config, { success: false, data: null }); // Handle error case
      } finally {
          config.loading = false;
          this.changeChartLoading(config); // Update loading state
      }

      // 4. Initialize or update VChart instance using config.option as the spec
      const finalSpec = config.option; // Use config.option as the VChart spec
      if (this.vchartInstance) {
          // Instance exists, update its spec
          console.log("Updating existing VChart spec (from config.option).");
          this.vchartInstance.updateSpec(finalSpec)
              .catch(err => console.error("Error updating spec during init/re-init:", err));
      } else {
          // Instance doesn't exist, create it
          console.log("Initializing new VChart with spec (from config.option):", JSON.stringify(finalSpec));
          try {
              // Add registration logic here if needed based on finalSpec.type
              // e.g., if (finalSpec.type === 'wordCloud') { registerWordCloudShape(); }

              // Create VChart instance using config.option as the spec
              this.vchartInstance = new VChart(finalSpec, {
                  dom: this.$el, // Use component's root DOM element
                  // theme: 'yourThemeName', // Apply theme if configured
              });
              await this.vchartInstance.renderAsync(); // Use async rendering
              // Check if data exists within the spec (in config.option.data)
              this.hasData = !!(finalSpec?.data?.[0]?.values?.length);
              this.registerVChartEvents(); // Register events after successful render
          } catch (error) {
              console.error("VChart initialization failed:", error);
              // Optionally, destroy instance if creation failed partially
              if (this.vchartInstance) {
                  this.vchartInstance.release();
                  this.vchartInstance = null;
              }
          }
      }

       // 5. Update Vuex store with the final config object (which now contains VChart spec in config.option)
      this.changeChartConfig(config);
      if (config.code === this.activeCode) {
          this.changeActiveItemConfig(config);
      }
    },

    registerVChartEvents() {
        if (!this.vchartInstance) return;

        // Clean up previous listeners before adding new ones
        this.vchartInstance.off('click');
        // ... off other event types as needed ...

        // Example: Click event for linkage
        this.vchartInstance.on('click', (params) => {
            console.log('VChart click event:', params);
            // Check if the click was on a chart element with data
            if (params.element && params.datum) {
                 const datum = params.datum;
                 console.log('Clicked datum:', datum);
                 // Trigger linkage if configured
                 if (this.config?.linkage?.length > 0) {
                     this.handleLinkage(this.config.code, datum);
                 }
            } else {
                 console.log('Click occurred on non-data element or background.');
            }
        });

        // Add other event listeners as required by your application
        // this.vchartInstance.on('legendItemHover', (params) => { /* ... */ });
    },

    /**
     * Applies settings from config.setting to the VChart spec object (stored in config.option).
     * Assumes setting.optionField contains valid VChart spec paths (e.g., 'a.b', 'a[0].b').
     */
    applySettingsToVChartSpec (config, type) {
      // Target config.option, which now holds the VChart spec
      if (!config.option) {
        console.warn("[applySettingsToVChartSpec] config.option (holding VChart spec) is missing. Initializing.");
        config.option = {};
      }
      // Use 'spec' internally for clarity, but it refers to config.option
      const spec = config.option;

      // Ensure config.setting is an array before iterating
      if (!Array.isArray(config.setting)) {
          console.warn("[applySettingsToVChartSpec] config.setting is not an array. Skipping application.");
          return;
      }

      config.setting.forEach(set => {
        // Basic validation for the setting item and optionField
        if (set && typeof set.optionField === 'string' && set.optionField.length > 0) {
          // Determine if the setting should be applied based on type and value presence (for 'data' type)
          const shouldApply = (set.tabName === type) &&
                              (type === 'custom' || (type === 'data' && set.value !== undefined && set.value !== null && set.value !== ''));

          if (shouldApply) {
            try {
              // Use lodash.set to apply the value to the spec (config.option) using the VChart path
              set(spec, set.optionField, cloneDeep(set.value)); // Use cloneDeep for objects/arrays in value
            } catch (e) {
              console.error(`[applySettingsToVChartSpec] Error setting path "${set.optionField}" in config.option (VChart spec) with value:`, set.value, e);
            }
          }
        } else if (set && !set.optionField) {
           // Log settings without an optionField for debugging if needed
           // console.log("[applySettingsToVChartSpec] Skipping setting item without 'optionField':", set);
        }
      });
      // No need to return config as spec (config.option) is modified by reference
    },

    // Handles data formatting and applies data-related settings to config.option (VChart spec)
    dataFormatting (config, dataResult) {
      if (dataResult.success) {
        let formattedData = dataResult.data; // Raw data from backend

        // Execute dataHandler script if provided
        if (config.dataHandler) {
          try {
            // IMPORTANT: Ensure eval script correctly processes data for VChart
            // and modifies `formattedData` appropriately.
             // It might also need access to 'config' or 'config.option' if it modifies the spec directly.
            const option = config.option; // Make spec available if eval needs it
            eval(config.dataHandler);
          } catch (e) {
            console.error('Error executing dataHandler:', e);
            formattedData = []; // Example: Set empty data on handler error
          }
        }

        // Ensure config.option (VChart spec) and its data array exist
        if (!config.option) config.option = {};
        if (!config.option.data) config.option.data = [];

        // Update or add the primary data source in config.option.data
        const dataId = config.option.data[0]?.id || 'data-0';
        const existingDataIndex = config.option.data.findIndex(d => d.id === dataId);
        const newDataEntry = { id: dataId, values: formattedData };

        if (existingDataIndex > -1) {
          config.option.data[existingDataIndex] = newDataEntry;
        } else {
          config.option.data.push(newDataEntry);
        }

        // Apply settings with tabName: 'data' to config.option (VChart spec)
        this.applySettingsToVChartSpec(config, 'data');

      } else {
          // Handle data fetch failure
          console.error("Data fetching failed:", dataResult);
          if(config.option) {
              // Clear existing data in config.option.data on failure
              if(config.option.data) config.option.data = [{ id: 'data-0', values: [] }];
          }
      }
      // No return needed, config modified directly
    },

    // Handles style changes and applies custom settings to config.option (VChart spec)
    changeStyle (config, isUpdateTheme) {
      // Apply settings with tabName: 'custom' to config.option (VChart spec)
      this.applySettingsToVChartSpec(config, 'custom');

      // Make spec (config.option) and setting available for optionHandler
      const option = config.option; // This is the VChart spec
      const setting = config.setting;

      // Execute optionHandler script if provided
      if (this.config.optionHandler) {
        try {
          // IMPORTANT: Ensure eval script operates on `option` (the VChart spec) if needed
          eval(this.config.optionHandler);
        } catch (e) {
          console.error('Error executing optionHandler:', e);
        }
      }

      // Handle VChart theme logic separately - this part needs custom implementation
      if (!isUpdateTheme) {
        console.warn("VChart theme application logic in changeStyle needs implementation.");
        // config.theme = generateVChartTheme(setting); // Example placeholder for VChart theme object
      } else {
        // Apply theme update if instance and VChart theme object exist
        // if (this.vchartInstance && config.theme) {
        //   this.vchartInstance.updateTheme(config.theme);
        // }
      }

      // Update Vuex store
      this.changeChartConfig(config);
      if (config.code === this.activeCode) {
        this.changeActiveItemConfig(config);
      }

      // Update the VChart instance with the modified spec (from config.option)
      if (this.vchartInstance) {
         this.vchartInstance.updateSpec(config.option) // Pass config.option as the spec
             .catch(err => console.error("VChart updateSpec failed during style change:", err));
      }
      // No return needed
    },

    // Copy configuration (config.option now contains VChart spec)
    async copyConfig() {
      if (!this.config) return;
      try {
        const configToCopy = cloneDeep(this.config);
        // config.option now holds the VChart spec, so this copies the right thing
        const configStr = JSON.stringify(configToCopy, null, 2);
        await navigator.clipboard.writeText(configStr);
        alert('配置已复制到剪贴板！(包含 VChart spec 在 option 字段)'); // Updated feedback
      } catch (err) {
        console.error('无法复制配置: ', err);
        alert('复制配置失败！');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/echartStyle'; /* Review if these styles are still relevant */
.light-theme{
  background-color: #ffffff;
  color: #000000;
}
.auto-theme{
  background-color: transparent;
}
</style>
