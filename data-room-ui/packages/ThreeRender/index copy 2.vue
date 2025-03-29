<template>
  <div class="three-render-simplified" :class="{'light-theme':customTheme === 'light','auto-theme':customTheme !=='light'}">
    <div class="config-display">
      <div class="config-item">
        <span class="label">3D模型:</span>
        <span class="value">{{ config.option.modelPath }}</span>
        <span class="value">{{ getModelPath() }}</span>
      </div>
      <div class="config-item">
        <span class="label">配置代码:</span>
        <span class="value">{{ config.code || '未指定' }}</span>
      </div>
      <div class="config-item">
        <span class="label">当前主题:</span>
        <span class="value">{{ customTheme }}</span>
      </div>
      <div class="config-item">
        <span class="label">背景颜色:</span>
        <span class="value" :style="{backgroundColor: getBackgroundColor(), color: '#fff', padding: '2px 5px'}">
          {{ getBackgroundColor() }}
        </span>
      </div>
      <div class="config-item">
        <span class="label">PM2.5值:</span>
        <span class="value" :class="getPM25Class(getPM25Value())">
          {{ getPM25Value() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import _ from 'lodash'

export default {
  name: 'ThreeComponent',
  mixins: [commonMixins, linkageMixins],
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
    
    // 获取模型路径
    getModelPath () {
      if (this.config.option && this.config.option.customize && this.config.option.customize.modelPath) {
        return this.config.option.customize.modelPath
      }
      return '未指定'
    },
    
    // 获取背景颜色
    getBackgroundColor () {
      if (this.config.option && this.config.option.customize && this.config.option.customize.backgroundColor) {
        return this.config.option.customize.backgroundColor
      }
      return '#111111'
    },
    
    // 获取PM2.5值
    getPM25Value () {
      if (this.config.option && this.config.option.customize && this.config.option.customize.pm25Value) {
        return this.config.option.customize.pm25Value
      }
      return 38
    },

    // 根据PM2.5值确定CSS类名
    getPM25Class (value) {
      value = Number(value)
      if (value <= 35) return 'pm25-good'
      if (value <= 75) return 'pm25-moderate'
      if (value <= 115) return 'pm25-unhealthy-sensitive'
      if (value <= 150) return 'pm25-unhealthy'
      if (value <= 250) return 'pm25-very-unhealthy'
      return 'pm25-hazardous'
    },

    // 初始化图表 - 简化版只显示配置
    chartInit () {
      this.changeChartLoading(true)
      
      try {
        // 如果有数据，则格式化数据
        if (this.config.dataSource && this.config.dataSource.data) {
          this.config = this.dataFormatting(this.config, this.config.dataSource)
        } else {
          // 使用默认值
          this.pm25Value = this.getPM25Value()
        }
        
        this.hasData = true
      } catch (e) {
        console.error('初始化图表失败', e)
      } finally {
        this.changeChartLoading(false)
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

      // 确保 config.option.customize 存在
      if (!config.option.customize) {
        config.option.customize = {}
      }

      // 如果有数据，尝试提取 PM2.5 值
      if (data && data.data && Array.isArray(data.data)) {
        // 尝试直接获取第一个数据项的值
        if (data.data.length > 0 && data.data[0].value !== undefined) {
          config.option.customize.pm25Value = data.data[0].value
          this.pm25Value = data.data[0].value
        }
      }

      return config
    },
    
    // 组件的样式改变，返回改变后的config
    changeStyle (config, isUpdateTheme) {
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
    },

    // 转换设置到选项
    transformSettingToOption (config, tabName) {
      if (!config || !config.setting) return config

      const setting = config.setting.filter(item => item.tabName === tabName)
      if (!setting.length) return config

      const newConfig = _.cloneDeep(config)

      setting.forEach(item => {
        if (item.optionField) {
          const fields = item.optionField.split('.')
          let current = newConfig.option

          for (let i = 0; i < fields.length - 1; i++) {
            if (!current[fields[i]]) {
              current[fields[i]] = {}
            }
            current = current[fields[i]]
          }

          current[fields[fields.length - 1]] = item.value
        }
      })

      return newConfig
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
