<template>
  <div
    style="width: 100%;height: 100%; position: relative;"
    class="bs-design-wrap bs-custom-component"
    :class="{'light-theme':customTheme === 'light','auto-theme':customTheme !=='light'}"
  >
    <button
      @click="copyConfig"
      style="position: absolute; top: 5px; right: 5px; z-index: 10;"
    >
      {{ copyButtonText }}
    </button>
    <pre style="color: red; white-space: pre-wrap; word-wrap: break-word; height: 100%; overflow: auto;">{{ config }}</pre>
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

export default {
    name: 'VchartCustomComponent',
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
      copyButtonText: 'Copy Config'
    }
  },
  computed: {
    ...mapState('bigScreen', {
      pageInfo: state => state.pageInfo,
      customTheme: state => state.pageInfo.pageConfig.customTheme,
      activeCode: state => state.activeCode
    }),
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
 
  },
  methods: {
    ...mapMutations('bigScreen', ['changeChartConfig', 'changeActiveItemConfig', 'changeChartLoading']),
    async copyConfig() {
      try {
        const configString = JSON.stringify(this.config, null, 2);
        await navigator.clipboard.writeText(configString);
        this.copyButtonText = 'Copied!';
        setTimeout(() => {
          this.copyButtonText = 'Copy Config';
        }, 1500);
      } catch (err) {
        console.error('Failed to copy config: ', err);
        this.copyButtonText = 'Copy Failed';
         setTimeout(() => {
          this.copyButtonText = 'Copy Config';
        }, 1500);
      }
    },
    chartInit () {
      let config = this.config
      if (this.config.code === this.config.key || this.isPreview) {
        config = this.changeStyle(config)
        config.loading = true
        this.changeChartLoading(config)
        this.changeDataByCode(config).then((res) => {
          config.loading = false
          this.changeChartLoading(config)
        }).catch(() => {
        })
      } else {
        config.loading = true
        this.changeChartLoading(config)
        this.changeData(config).then((res) => {
          config.loading = false
          this.changeChartLoading(config)
        })
      }
    },
   

    registerEvent () {
      let formData = {}
      this.chart.on('tooltip:change', (...args) => {
        formData = {}
        formData = cloneDeep(args[0].data.items[0].data)
      })
      this.chart.on('plot:click', (...args) => {
        this.linkage(formData)
      })
    },
    transformSettingToOption (config, type) {
      let option = null
      config.setting.forEach(set => {
        if (set.optionField) {
          const optionField = set.optionField.split('.')
          option = config.option
          if (optionField[0] === 'xAxis') {
            optionField.forEach((field, index) => {
              if (index === 0) {
                option = option.xAxis[0]
              } else if (index === optionField.length - 1) {
                if ((set.tabName === type && type === 'data' && set.value) || (set.tabName === type && type === 'custom')) {
                  option[field] = set.value
                }
              } else {
                option = option[field]
              }
            })
          } else if (optionField[0] === 'series') {
            let changeObject = []
            let beforeChange = []
            optionField.forEach((field, index) => {
              if (index === 0) {
                option = option[field]
              } else if (index === 1) {
                changeObject = option.filter(item => item.id.includes(field))
                beforeChange = [...changeObject]
                option = option.filter(item => !(item.id.includes(field)))
              } else if (index === optionField.length - 1) {
                if ((set.tabName === type && type === 'data' && set.value) || (set.tabName === type && type === 'custom')) {
                  changeObject.map(item => {
                    item[field] = set.value
                  })
                }
              } else {
                const changeResult = []
                changeObject.forEach(item => {
                  const result = { ...item[field] }
                  changeResult.push(result)
                })
                changeObject = [...changeResult]
              }
            })
            changeObject.forEach(
              (item, index) => {
                beforeChange[index].label = _.cloneDeep(item)
                option.push(beforeChange[index])
              }
            )
          } else if (optionField[0] === 'graphic') {
            option.graphic.children.forEach(item => {
              item.style.fill = set.value
            })
          } else {
            optionField.forEach((field, index) => {
              if (index === optionField.length - 1) {
                if ((set.tabName === type && type === 'data' && set.value) || (set.tabName === type && type === 'custom')) {
                  option[field] = set.value
                }
              } else {
                option = option[field]
              }
            })
          }
        }
      })
      return config
    },
    dataFormatting (config, data) {
      if (data.success) {
        data = data.data
        const option = config.option
        const setting = config.setting
        if (config.dataHandler) {
          try {
            eval(config.dataHandler)
          } catch (e) {
            console.error(e)
          }
        }
      
        config = this.transformSettingToOption(config, 'data')
      }
      return config
    },
    changeStyle (config, isUpdateTheme) {
      config = { ...this.config, ...config }
      config = this.transformSettingToOption(config, 'custom')
      const option = config.option
      const setting = config.setting
      if (this.config.optionHandler) {
        try {
          eval(this.config.optionHandler)
        } catch (e) {
          console.error(e)
        }
      }

      if (!isUpdateTheme) {
        config.theme = settingToTheme(_.cloneDeep(config), this.customTheme)
      }
      this.changeChartConfig(config)
      if (config.code === this.activeCode) {
        this.changeActiveItemConfig(config)
      }
      if (this.chart) {
        this.chart.setOption(config.option)
      }
      return config
    }
  }
}
</script>

<style lang="scss" scoped>
.light-theme{
  background-color: #ffffff;
  color: #000000;
}
.auto-theme{
  background-color: transparent;
}

</style>
