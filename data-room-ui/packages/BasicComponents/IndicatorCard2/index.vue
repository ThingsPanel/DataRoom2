<template>
  <div
    :class="`bs-indexCard`"
    style="width: 100%;height: 100%;position: relative;"
  >
    <div
      :style="{
        'background-image': `linear-gradient(${customize.gradientDirection}, ${
          gradientColor0 ? gradientColor0 : gradientColor1
        } , ${gradientColor1 ? gradientColor1 : gradientColor0})`,
        'border-radius':customize.borderRadius + 'px',
        border:`${customize.borderWidth}px solid ${customize.borderColor}`,
      }"
      class="content"
    >
      <div
        class="content-right-first"
        :style="{
          'font-size': customize.firstSize + 'px',
          'height':customize.firstSize + 'px',
          color:customize.firstColor,
          'font-weight':customize.firstWeight,
          'margin-bottom':customize.lineDistance +'px'
        }"
      >
        66{{ customize.secondLine }}
      </div>
      <div
        :style="{
          'height': customize.secondSize + 'px',
        }"
        class="content-right-second"
      >
        <span
          :style="{
            'font-family': config.customize.fontFamily,
            'font-size': customize.secondSize + 'px',
            color:customize.secondColor,
            'font-weight':customize.secondWeight,
          }"
        >
          {{ optionData }}
        </span>
        <span
          :style="{
            'margin-left':'10px',
            'font-size': customize.unitSize + 'px',
            'line-height':customize.unitSize + 'px',
            color:customize.unitColor,
          }"
        >
          {{ unit }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import paramsMixins from 'data-room-ui/js/mixins/paramsMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'

export default {
  name: 'Card',
  components: {},
  mixins: [paramsMixins, commonMixins, linkageMixins],
  props: {
    // 卡片的属性
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      customClass: {},
      dynamicValue: null
    }
  },
  watch: {
    'config.dynamicData': {
      handler: 'initDynamicData',
      immediate: true,
      deep: true
    }
  },
  mounted () {
    // this.chartInit()
  },
  computed: {
    gradientColor0 () {
      return this.config.customize.gradientColor0 || this.config.customize.gradientColor1 || 'transparent'
    },
    gradientColor1 () {
      return this.config.customize.gradientColor1 || this.config.customize.gradientColor0 || 'transparent'
    },
    unit () {
      return this.config?.customize.unit || ''
    },
    option () {
      return this.config?.option
    },
    optionData () {
      return this.dynamicValue ?? this.option?.data ?? 80
    },
    customize () {
      return this.config?.customize
    }
    // tableData () {
    //   let dataList = ''
    //   if (this.optionData instanceof Array && this.optionData.length > 0) {
    //     dataList = this.option?.yField
    //       ? this.optionData[0][this.option.yField]
    //       : this.optionData[0]?.value
    //   } else {
    //     dataList = this.optionData ? this.optionData[this.option.yField] : ''
    //   }
    //   return dataList
    // }
  },
  methods: {
    dataFormatting (config, data) {
      let dataList = ''
      if (data.success) {
        if (data.data instanceof Array) {
          dataList = config.dataSource.dimensionField
            ? data.data[0][config.dataSource.dimensionField]
            : data.data[0].value
        } else {
          dataList = data.data[config.dataSource.dimensionField]
        }
      } else {
        dataList = 0
      }
      config.option = {
        ...config.option,
        data: dataList
      }
      return config
    },
    async initDynamicData () {
      if (!this.config.dynamicData?.api) return
      
      try {
        const response = await fetch(this.config.dynamicData.api, {
          method: this.config.dynamicData.method || 'GET'
        })
        const data = await response.json()
        
        // 根据配置的数据路径获取数据
        let value = data
        if (this.config.dynamicData.dataPath) {
          const paths = this.config.dynamicData.dataPath.split('.')
          for (const path of paths) {
            value = value[path]
          }
        }
        
        // 根据映射关系更新数据
        if (this.config.dynamicData.mapping?.value) {
          this.dynamicValue = value[this.config.dynamicData.mapping.value]
        }

        // 如果配置了轮询，设置定时器
        if (this.config.dynamicData.polling?.enable) {
          this.setupPolling()
        }
      } catch (error) {
        console.error('动态数据获取失败:', error)
      }
    },
    setupPolling () {
      if (this.pollingTimer) {
        clearInterval(this.pollingTimer)
      }
      
      const interval = (this.config.dynamicData.polling.interval || 30) * 1000
      this.pollingTimer = setInterval(() => {
        this.initDynamicData()
      }, interval)
    }
  },
  beforeDestroy () {
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/fonts/numberFont/stylesheet.css";
.content{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  text-align: center;
  justify-content: center;
  .content-right-first{
    width: 100%;
    text-align: center;
    padding-bottom: 5px;
  }
  .content-right-second{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
