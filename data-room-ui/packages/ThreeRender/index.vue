<template>
  <div class="three-render-simplified" :class="{'light-theme':customTheme === 'light','auto-theme':customTheme !=='light'}">
    <ThreeRenderCore :config="config" :theme="customTheme"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import ThreeRenderCore from './components/ThreeRenderCore.vue'
import _ from 'lodash'

export default {
  name: 'ThreeComponent',
  mixins: [commonMixins, linkageMixins],
  components: {
    ThreeRenderCore
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      pm25Value: 38,
      hasData: false
    }
  },
  computed: {
    ...mapState('bigScreen', {
      chartList: state => state.chartList,
      activeCode: state => state.activeCode,
      customTheme: state => state.customTheme
    })
  },
  methods: {
    ...mapMutations('bigScreen', [
      'changeChartConfig',
      'changeActiveItemConfig',
      'changeChartLoading'
    ]),

    chartInit () {

      let config = this.config
      console.log('config1',config)
      // key和code相等，说明是一进来刷新，调用list接口
      if (this.config.code === this.config.key || this.isPreview) {
        // 改变样式
        console.log('config2',config)
        config = this.changeStyle(config)
        // 改变数据
        config.loading = true
        this.changeChartLoading(config)
        this.changeDataByCode(config).then((res) => {
          // 初始化图表
          config.loading = false
          this.changeChartLoading(config)
          this.newChart(res)
        }).catch(() => {
        })
      } else {
        config.loading = true
        this.changeChartLoading(config)
        // 否则说明是更新，这里的更新只指更新数据（改变样式时是直接调取changeStyle方法），因为更新数据会改变key,调用chart接口
        this.changeData(config).then((res) => {
          config.loading = false
          this.changeChartLoading(config)
          // 初始化图表
          this.newChart(res)
        })
      }
    },
    // 数据格式化
    dataFormatting (config, data) {
      if (!config) {
        return this.config || {}
      }
      // 确保 config.option 存在
      if (!config.option) {
        config.option = {}
      }
      // 确保customize对象存在
      if (!config.option.customize) {
        config.option.customize = {}
      }
      // 记录接收到的数据
      console.log('ThreeRender接收到数据:', data)
      // 处理数据更新PM2.5值
      try {
        // 如果有基本数据且有dataHandler
        if (config.dataHandler && data) {
          // 执行数据处理函数，类似进度环图
          try {
            // eslint-disable-next-line no-unused-vars
            const option = config.option
            // eslint-disable-next-line no-unused-vars
            const setting = config.setting
            // 创建处理环境
            const dataHandlerFn = new Function('data', 'option', 'setting', config.dataHandler)
            dataHandlerFn(data.data || data, option, setting)
          } catch (e) {
            console.error('执行dataHandler出错:', e)
          }
        } else if (data) {
          // 没有dataHandler时进行简单数据提取
          let pm25Value = null
          // 尝试从不同格式的数据中提取PM2.5值
          if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            // 数据在data.data数组中
            pm25Value = data.data[0].value || data.data[0].pm25Value
          } else if (typeof data === 'object') {
            // 数据可能直接在对象上
            pm25Value = data.value || data.pm25Value
          }
          // 如果找到值，更新配置
          if (pm25Value !== null && pm25Value !== undefined) {
            config.option.customize.pm25Value = Number(pm25Value)
          }
        }
      } catch (error) {
        console.error('处理PM2.5数据失败:', error)
      }
      return config
    },
    
    // 组件的样式改变，返回改变后的config
    changeStyle (config, isUpdateTheme) {
      try {
        // 确保 config 有值
        if (!config) {
          return this.config || {}
        }

        // 确保 config 有 code 属性
        if (!config.code && this.config && this.config.code) {
          config.code = this.config.code
        }

        config = { ...this.config, ...config }

        // 确保 config.setting 存在
        if (!config.setting) {
          config.setting = []
        }

        config = this.transformSettingToOption(config, 'custom')

        // 只有样式改变时更新主题配置，切换主题时不需要保存
        if (!isUpdateTheme) {
          try {
            config.theme = settingToTheme(_.cloneDeep(config), this.customTheme)
          } catch (e) {
            console.error('设置主题失败:', e)
          }
        }

        // 确保 config 有 code 属性再调用 changeChartConfig
        if (config.code) {
          try {
            this.changeChartConfig(config)
            if (config.code === this.activeCode) {
              this.changeActiveItemConfig(config)
            }
          } catch (e) {
            console.error('更新配置失败:', e)
          }
        }

        return config
      } catch (error) {
        console.error('changeStyle方法执行出错:', error)
        return config || this.config || {}
      }
    },

    // 转换设置到选项
    transformSettingToOption (config, tabName) {
      try {
        if (!config || !config.setting) return config

        // 直接在原始对象上操作，不创建新副本
        config.setting.filter(item => item.tabName === tabName).forEach(item => {
          if (item.optionField) {
            const fields = item.optionField.split('.')
            
            // 确保 config.option 存在
            if (!config.option) {
              config.option = {}
            }
            
            let current = config.option
            
            // 创建必要的嵌套对象
            for (let i = 0; i < fields.length - 1; i++) {
              if (!current[fields[i]]) {
                current[fields[i]] = {}
              }
              current = current[fields[i]]
            }
            
            // 设置值
            const lastField = fields[fields.length - 1]
            current[lastField] = item.value
          }
        })
        
        return config
      } catch (error) {
        console.error('transformSettingToOption方法执行出错:', error)
        return config
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.three-render-simplified {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  
  &.light-theme {
    background-color: #ffffff;
    color: #333333;
    
    .config-display {
      background-color: rgba(255, 255, 255, 0.8);
      border: 1px solid #e0e0e0;
    }
  }
  
  &.auto-theme {
    background-color: #1e1e1e;
    color: #f0f0f0;
    
    .config-display {
      background-color: rgba(30, 30, 30, 0.8);
      border: 1px solid #444444;
    }
  }
  
  .config-display {
    width: 80%;
    max-width: 500px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    .config-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px dashed rgba(125, 125, 125, 0.3);
      
      &:last-child {
        margin-bottom: 0;
        border-bottom: none;
      }
      
      .label {
        font-weight: bold;
      }
      
      .value {
        max-width: 60%;
        word-break: break-all;
        
        &.pm25-good {
          color: #33cc33;
        }
        
        &.pm25-moderate {
          color: #ffff00;
        }
        
        &.pm25-unhealthy-sensitive {
          color: #ff9900;
        }
        
        &.pm25-unhealthy {
          color: #ff0000;
        }
        
        &.pm25-very-unhealthy {
          color: #800080;
        }
        
        &.pm25-hazardous {
          color: #8b0000;
        }
      }
    }
  }
}
</style>
