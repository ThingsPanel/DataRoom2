<template>
  <div class="vchart-logic-placeholder" style="width: 100%; height: 100%;">
    <!-- This component now only handles logic, no rendering -->
    <span v-if="isLoading">Processing Config...</span>
    <span v-else>VChart Logic Handler - Ready</span>
    <!-- Add copy button for debugging the whole config -->
    <button v-if="!isPreview" @click="copyConfig" style="position: absolute; top: 5px; right: 5px; z-index: 10; opacity: 0.8; cursor: pointer; background: #eee; border: 1px solid #ccc; padding: 2px 5px; font-size: 10px; border-radius: 3px;">
      复制配置
    </button>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import cloneDeep from 'lodash/cloneDeep'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import _ from 'lodash'

export default {
  name: 'VchartRenderLogic',
  mixins: [commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isLoading: false,
    }
  },
  computed: {
    ...mapState('bigScreen', {
      pageInfo: state => state.pageInfo,
      activeCode: state => state.activeCode
    }),
    isPreview() {
      return this.$route.path === (window?.BS_CONFIG?.routers?.previewUrl || '/big-screen/preview')
    }
  },
  created () {
  },
  watch: {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    ...mapMutations('bigScreen', ['changeChartConfig', 'changeActiveItemConfig', 'changeChartLoading']),
    async chartInit(configFromCaller) {
      const config = configFromCaller || this.config;

      if (!config || !config.code) {
          console.warn("[VchartRenderLogic] chartInit called with null or invalid config.");
          if (this.config && this.config.code) {
              this.isLoading = false;
              this.changeChartLoading({ ...this.config, code: this.config.code, loading: false });
          }
          return;
      }
      console.log(`[VchartRenderLogic chartInit] Starting for ${config.code}...`);
      this.isLoading = true;
      this.changeChartLoading({ ...config, loading: true });

      let configPassedToMixin = cloneDeep(config);
      let configAfterDataProcessing;

      try {
        let isInitialLoadOrPreview = this.isPreview || config.code === config.key;

        if (isInitialLoadOrPreview && config.dataSource && config.dataSource.source) {
             console.log(`[VchartRenderLogic chartInit] Initial load/preview: Calling changeDataByCode for ${config.code}`);
             configAfterDataProcessing = await this.changeDataByCode(configPassedToMixin);
             console.log(`[VchartRenderLogic chartInit] Received config after changeDataByCode for ${config.code}`);
        } else if (!isInitialLoadOrPreview && config.dataSource && config.dataSource.source) {
             console.log(`[VchartRenderLogic chartInit/update] Calling changeData for ${config.code}`);
             configAfterDataProcessing = await this.changeData(configPassedToMixin);
             console.log(`[VchartRenderLogic chartInit/update] Received config after changeData for ${config.code}`);
        } else {
            console.log(`[VchartRenderLogic chartInit] No dataSource or not initial fetch, processing initial/existing data for ${config.code}`);
            const initialData = configPassedToMixin.option?.data?.[0]?.values || [];
            configAfterDataProcessing = this.dataFormatting(configPassedToMixin, { success: true, data: initialData });
            console.log(`[VchartRenderLogic chartInit] Finished dataFormatting for initial/existing data for ${config.code}`);
        }

        if (!configAfterDataProcessing) {
            console.error(`[VchartRenderLogic chartInit] Config is null/undefined after data processing step for ${config.code}. Aborting further processing.`);
            throw new Error("Configuration became invalid after data processing step.");
        }

        console.log(`[VchartRenderLogic chartInit] Applying styles and optionHandler for ${config.code}`);
        let finalProcessedConfig = this.applyStylesAndOptionHandler(configAfterDataProcessing);
        console.log(`[VchartRenderLogic chartInit] Finished applying styles and optionHandler for ${config.code}`);

        console.log(`[VchartRenderLogic chartInit] Committing final config to Vuex for ${config.code}`);
        this.changeChartConfig(finalProcessedConfig);
        if (finalProcessedConfig.code === this.activeCode) {
            this.changeActiveItemConfig(finalProcessedConfig);
        }

        this.isLoading = false;
        const successLoadingState = { ...(finalProcessedConfig || configAfterDataProcessing || config), loading: false };
        this.changeChartLoading(successLoadingState);
        console.log(`[VchartRenderLogic chartInit] Finished successfully for ${config.code}. Loading set to false.`);

      } catch (error) {
          console.error(`[VchartRenderLogic chartInit] Error during processing for ${config.code}:`, error);
          this.isLoading = false;
          const errorLoadingState = { ...config, loading: false };
          this.changeChartLoading(errorLoadingState);
      }
    },
    transformSettingToOption(config, type) {
      let currentConfig = cloneDeep(config)
      if (!currentConfig.option) currentConfig.option = {}

      (currentConfig.setting || []).forEach(set => {
        if (set.tabName === type && set.optionField) {
          try {
            _.set(currentConfig.option, set.optionField, set.value)
          } catch (e) {
            console.error(`[VchartRenderLogic transformSetting] Failed to set optionField '${set.optionField}' for ${currentConfig.code}:`, e)
          }
        }
      })
      return currentConfig
    },
    dataFormatting(config, data) {
      let newConfig = cloneDeep(config)
      if (!newConfig.option) newConfig.option = {}
      console.log(data,"finalDatafinalData");
      if (data?.success && data.data) {
        console.log(data.data,"finalDatafinalData");
        let dataToProcess = cloneDeep(data.data)
        newConfig = this.transformSettingToOption(newConfig, 'data')
        const option = newConfig.option
        const setting = newConfig.setting

        if (newConfig.dataHandler && typeof newConfig.dataHandler === 'string' && newConfig.dataHandler.trim()) {
          try {
            const handlerScript = newConfig.dataHandler
            const dataHandlerFn = new Function('data', 'setting', 'option', handlerScript)
            const resultFromHandler = dataHandlerFn(dataToProcess, setting, option)
            if (resultFromHandler !== undefined) {
              dataToProcess = resultFromHandler
            }
          } catch (e) {
            console.error(`[VchartRenderLogic dataFormatting] Error executing dataHandler for ${newConfig.code}:`, e)
          }
        }

        let finalData = Array.isArray(dataToProcess) ? dataToProcess : []
        if (!Array.isArray(dataToProcess)) {
          console.warn(`[VchartRenderLogic dataFormatting] Data after handler is not an array. Using empty array.`)
        }

        newConfig.option.data = finalData
    
        
        return newConfig
      } else {
        console.warn(`[VchartRenderLogic dataFormatting] Data fetch failed or no data. Setting option.data to empty array.`)
        newConfig.option.data = []
        return newConfig
      }
    },
    applyStylesAndOptionHandler(config) {
      let currentConfig = cloneDeep(config)
      currentConfig = this.transformSettingToOption(currentConfig, 'custom')

      let option = currentConfig.option || {}
      const setting = currentConfig.setting || []

      if (currentConfig.optionHandler && typeof currentConfig.optionHandler === 'string' && currentConfig.optionHandler.trim()) {
        try {
          const optionHandlerFn = new Function('option', 'config', 'setting', currentConfig.optionHandler + '\n return option;')
          const modifiedOption = optionHandlerFn(cloneDeep(option), currentConfig, setting)
          currentConfig.option = modifiedOption
          option = currentConfig.option
        } catch (e) {
          console.error(`[VchartRenderLogic applyStyles] Error executing optionHandler for ${currentConfig.code}:`, e)
          console.error(`[VchartRenderLogic applyStyles] optionHandler script:`, currentConfig.optionHandler)
          console.error(`[VchartRenderLogic applyStyles] Option state before error:`, option)
        }
      }

      currentConfig.theme = settingToTheme(cloneDeep(currentConfig), this.customTheme)

      return currentConfig
    },
    async copyConfig() {
      if (!this.config) return
      try {
        const configToCopy = cloneDeep(this.config)
        const configStr = JSON.stringify(configToCopy, null, 2)
        await navigator.clipboard.writeText(configStr)
        alert('当前组件配置已复制到剪贴板！')
      } catch (err) {
        console.error('无法复制配置: ', err)
        alert('复制失败！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* Minimal styles for the placeholder */
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
/* Removed previous styles */
/* @import '../assets/style/echartStyle'; ... */
</style>
