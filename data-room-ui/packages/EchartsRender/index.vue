<template>
  <div
    style="width: 100%;height: 100%"
    class="bs-design-wrap bs-custom-component"
    :class="{'light-theme':customTheme === 'light','auto-theme':customTheme !=='light'}"
  >
    <!-- Use the EchartsCore component for rendering -->
    <EchartsCore
      v-if="showChart"
      ref="echartsCore"
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
import EchartsCore from './EchartsCore.vue'

export default {
  name: 'EchartsCustomComponent',
  components: {
    EchartsCore // Register the child component
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
            if (this.$refs.echartsCore && this.$refs.echartsCore.resizeChart) {
              this.$refs.echartsCore.resizeChart()
            }
          })
        })
        resizeObserver.observe(dragSelect)
        this.$_resizeObserver = resizeObserver
    } else {
        console.warn(`[EchartsRender] Could not find element to observe for resize.`)
    }
  },
  beforeDestroy () {
    if (this.$_resizeObserver) {
       this.$_resizeObserver.disconnect()
    }
  },
  methods: {
    ...mapMutations('bigScreen', ['changeChartConfig', 'changeActiveItemConfig', 'changeChartLoading']),
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
                    console.error("[EchartsRender chartInit] Error fetching initial data:", error)
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
                    console.error("[EchartsRender chartInit] Error fetching update data:", error)
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
          console.error("[EchartsRender dataInit] Error fetching linked data:", error)
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
            console.error(`[EchartsRender dataFormatting] Error executing dataHandler for ${config.name}:`, e)
          }
        }
        config.processedDataSource = processedDataSource
      } else {
        processedDataSource = []
        console.warn(`[EchartsRender dataFormatting] API data fetch failed for ${config.name}`)
        config.processedDataSource = processedDataSource
      }

      this.changeChartConfig(cloneDeep(config))
      return config
    },
    changeStyle (config, isUpdateTheme) {
      config = { ...this.config, ...config }
      if (!isUpdateTheme) {
        config.theme = settingToTheme(cloneDeep(config), this.customTheme)
      }
      this.changeChartConfig(cloneDeep(config))
      if (config.code === this.activeCode) {
        this.changeActiveItemConfig(cloneDeep(config))
      }
      this.initialOption = cloneDeep(config.option)
      this.showChart = true
      return config
    },
    setLoading(isLoading) {
        const loadingConfig = { code: this.config.code, loading: isLoading }
        this.changeChartLoading(loadingConfig)
    },
    handleLinkageTrigger(linkageData) {
        this.linkage(linkageData)
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
