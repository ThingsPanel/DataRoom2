<template>
  <div class="g2plot-logic-placeholder" style="width: 100%; height: 100%;">
    <!-- This component now only handles logic, no rendering -->
    <span v-if="isLoading">Processing G2Plot Config...</span>
    <span v-else>G2Plot Logic Handler - Ready</span>
    <!-- Add copy button for debugging the whole config -->
    <button v-if="!isPreview" @click="copyConfig" style="position: absolute; top: 5px; right: 5px; z-index: 10; opacity: 0.8; cursor: pointer; background: #eee; border: 1px solid #ccc; padding: 2px 5px; font-size: 10px; border-radius: 3px;">
      复制配置
    </button>
  </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { mapState, mapMutations } from 'vuex'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import _ from 'lodash'

export default {
  name: 'GenericLogicHandler',
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
      hasData: false,
    }
  },
  computed: {
    ...mapState('bigScreen', {
      pageInfo: state => state.pageInfo,
      customTheme: state => state.pageInfo.pageConfig.customTheme,
      activeCode: state => state.activeCode
    }),
    isPreview() {
      return this.$route.path === (window?.BS_CONFIG?.routers?.previewUrl || '/big-screen/preview')
    }
  },
  created () {
    this.debouncedProcessConfig = this.processConfig

    this.$on('hook:beforeDestroy', () => {
      if (this.debouncedProcessConfig) {
        this.debouncedProcessConfig.cancel()
      }
    })
  },
  watch: {
    config: {
      handler(newConfig, oldConfig) {
        if (oldConfig && !_.isEqual(newConfig, oldConfig)) {
          this.debouncedProcessConfig(newConfig)
        } else if (!oldConfig) {
          this.debouncedProcessConfig(newConfig)
        }
      },
      deep: true
    }
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    ...mapMutations('bigScreen', ['changeChartConfig', 'changeActiveItemConfig', 'changeChartLoading']),
    async processConfig() {
      if (!this.config) {
        console.warn("[GenericLogicHandler] processConfig called with null config.")
        return
      }
      this.isLoading = true
      this.changeChartLoading({ ...this.config, loading: true })

      let processedConfig = cloneDeep(this.config)

      try {
        const needsDataFetch = this.config.code === this.config.key || this.isPreview
        if (needsDataFetch && this.config.dataSource?.source) {
          processedConfig = await this.changeDataByCode(processedConfig)
        } else if (!needsDataFetch && this.config.dataSource?.source) {
          processedConfig = await this.changeData(processedConfig)
        } else {
          if (processedConfig.option?.data) {
            processedConfig = this.dataFormatting(processedConfig, { success: true, data: processedConfig.option.data })
          }
        }

        processedConfig = this.applyStylesAndOptionHandler(processedConfig)

        this.changeChartConfig(processedConfig)
        if (processedConfig.code === this.activeCode) {
          this.changeActiveItemConfig(processedConfig)
        }
      } catch (error) {
        console.error(`[GenericLogicHandler processConfig] Error:`, error)
      } finally {
        this.isLoading = false
        this.changeChartLoading({ ...(processedConfig || this.config), loading: false })
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
            console.error(`[GenericLogicHandler transformSetting] Failed to set optionField '${set.optionField}':`, e)
          }
        }
      })
      return currentConfig
    },
    dataFormatting(config, data) {
      let newConfig = cloneDeep(config)
      if (!newConfig.option) newConfig.option = {}

      if (data?.success && data.data) {
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
            console.error(`[GenericLogicHandler dataFormatting] Error executing dataHandler:`, e)
          }
        }

        let finalData = Array.isArray(dataToProcess) ? dataToProcess : []
        if (!Array.isArray(dataToProcess)) {
          console.warn(`[GenericLogicHandler dataFormatting] Data after handler is not an array. Using empty array.`)
        }

        newConfig.option.data = finalData

        return newConfig
      } else {
        console.warn(`[GenericLogicHandler dataFormatting] Data fetch failed or no data. Setting option.data to empty array.`)
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
          console.error(`[GenericLogicHandler applyStyles] Error executing optionHandler for ${currentConfig.code}:`, e)
          console.error(`[GenericLogicHandler applyStyles] optionHandler script:`, currentConfig.optionHandler)
          console.error(`[GenericLogicHandler applyStyles] Option state before error:`, option)
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
.g2plot-logic-placeholder {
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
