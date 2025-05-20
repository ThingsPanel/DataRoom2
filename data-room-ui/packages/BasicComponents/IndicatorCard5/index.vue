<template>
  <div
    :class="`bs-indexCard`"
    style="width: 100%;height: 100%;position: relative;"
  >
    <div
      :style="{
        'border-radius':customize.borderRadius + 'px',
        border:`${customize.borderWidth}px solid ${customize.borderColor}`,
      }"
      class="content"
    >
   
        <div 
          v-for="key in this.customize.secondLine.split(',') " 
          :key="key" 
          style="text-align: left"
          :style="{
            'font-size': customize.fontSize + 'px',
            color: customize.fontColor,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
          }"
        ><div>
          <span>{{ getKeyName(key) }}</span>
        </div>
        <div>
          <span>{{ optionData[0][key] }}</span>
        </div>
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
      dynamicValue: null,
      listkey:{
        LA:'Ia',LB:'Ib',LC:'Ic',Q:'Q',P:'P',COS:'cosφ‌'
      }
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
      console.log(this.dynamicValue,77);
      console.log(this.option?.data,770);
      const data = this.dynamicValue ?? this.option?.data ?? 80
      
      // 判断是否为JSON字符串
      if (typeof data === 'string') {
        try {
          // 尝试解析JSON
          return JSON.parse(data);
        } catch (e) {
          // 如果解析失败，说明不是有效的JSON字符串，直接返回原数据
          return data;
        }
      }
      
      // 如果不是字符串，直接返回
      return data;
    },
    customize () {
      return this.config?.customize
    },
    filteredKeys() {
      // 确保 optionData 是对象
      if (typeof this.optionData !== 'object' || this.optionData === null) {
        return [];
      }
      
      // 如果 secondLine 为空，则显示所有键
      if (!this.customize.secondLine) {
        return Object.keys(this.optionData);
      }
      
      // 分割 secondLine 字符串获取需要显示的键列表
      const keyList = this.customize.secondLine.split(',').map(key => key.trim());
      
      // 筛选出对象中存在的键
      return keyList.filter(key => 
        Object.prototype.hasOwnProperty.call(this.optionData, key)
      );
    }
  },
  methods: {
    getKeyName(key) {
      try {
        const listKeyObj = JSON.parse(this.customize.unit);
        return listKeyObj[key] || key;
      } catch (e) {
        return key;
      }
    },
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
color:#fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  text-align: left;
  justify-content: flex-start;
  padding: 10px;
  .content-right-first{
    width: 100%;
    text-align: left;
    padding-bottom: 5px;
  }
  .content-right-second{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
