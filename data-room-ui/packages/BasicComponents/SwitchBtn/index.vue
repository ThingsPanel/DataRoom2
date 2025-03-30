<template>
  <div class="basic-component-switchbtn">
    <el-switch
      :key="config.code"
      v-model="value"
      :active-color="config.customize.activeColor"
      :inactive-color="config.customize.inactiveColor"
      :active-text="config.customize.showText ? config.customize.activeText : ''"
      :inactive-text="config.customize.showText ? config.customize.inactiveText : ''"
      :active-value="config.customize.activeValue"
      :inactive-value="config.customize.inactiveValue"
      :width="config.customize.switchWidth"
      @change="handleChange"
      :disabled="config.customize.disabled || isLoading"
      :loading="isLoading"
    ></el-switch>
  </div>
</template>

<script>
import { DEFAULT_CONFIG } from './settingConfig'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import paramsMixins from 'data-room-ui/js/mixins/paramsMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import { cloneDeep } from 'lodash'

export default {
  name: 'BasicComponentSwitchBtn',
  mixins: [commonMixins, paramsMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      // 组件配置
      value: null,
      isLoading: false
    }
  },
  created () {
  },
  mounted () {
    this.chartInit()
  },
  beforeDestroy () {},
  methods: {
    chartInit () {
      this.config = Object.assign({}, DEFAULT_CONFIG, this.defaultConfig)
      this.fetchData()
    },
    async fetchData () {
      this.onRequestComplete({ isSuccess: true, data: null })
    },
    onRequestComplete ({ isSuccess, data }) {
      if (isSuccess) {
        // 样式改变时更新主题配置
        this.config.theme = settingToTheme(cloneDeep(this.config), this.customTheme)
        // 设置文字样式
        if (data) {
          // 数据返回成功则赋值
          // 获取到后端返回的数据，有则赋值
          try {
            data = this.handlerDimension(data)
            // 此处函数处理data
          } catch (e) {
            console.log(e)
          }
          // 如果有数据，设置开关的初始状态
          if (data) {
            // 获取指标字段
            // const metricField = this.config.data.metricField
            // 使用阈值判断：当数据大于等于阈值时开关为开，小于阈值时为关
            if (data?.value >= this.config.customize.thresholdValue) {
              this.value = this.config.customize.activeValue
            } else {
              this.value = this.config.customize.inactiveValue
            }
          }
        } else {
          // 数据返回失败则赋前端的模拟数据
          // mock数据在settingConfig.DEFAULT_MOCK_DATA
          this.value = this.config.customize.activeValue
        }
      }
    },

    handleChange () {
      // 开关切换
      try {
        // 显示加载状态
        this.isLoading = true
        // 延迟执行，模拟加载效果
        setTimeout(() => {
          if (this.config.customize.executeScript) {
            if (this.config.customize.scriptString) {
              // 获取当前值对应的变量
              const variableName = this.value === this.config.customize.activeValue
                ? this.config.customize.activeVariable
                : this.config.customize.inactiveVariable
              // 执行脚本代码，将变量传入脚本环境
              try {
                window.basicChartRenderEnv.VARIABLE = variableName
                eval(this.config.customize.scriptString)
              } catch (error) {
                console.error('执行脚本错误：', error)
              }
            }
          }
          // 取消加载状态
          this.isLoading = false
        }, 800) // 800毫秒后取消加载状态
      } catch (e) {
        console.log(e)
        this.isLoading = false
      }
    },
    changeStyle (config) {
      config = { ...this.config, ...config }
      // 样式改变时更新主题配置
      config.theme = settingToTheme(cloneDeep(config), this.customTheme)
      this.changeChartConfig(config)
      this.innerConfig = config
    }
  },
  watch: {
    defaultConfig: {
      handler (newVal) {
        if (newVal && newVal.customize) {
          // 组件联动
          if (newVal.customize?.linkageConfig?.feildMap) {
            this.handleLinkage(newVal.customize.linkageConfig.feildMap, this.handlerLinkageCharts)
          }
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-component-switchbtn {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  --switch-width: v-bind('config.customize.switchWidth + "px"');
  --switch-height: v-bind('config.customize.switchHeight + "px"');

  ::v-deep .el-switch {
    height: var(--switch-height);

    .el-switch__label {
      height: var(--switch-height);
      font-size: v-bind('config.customize.fontSize + "px"');
      color: v-bind('config.customize.fontColor');
    }

    .el-switch__label * {
      font-size: v-bind('config.customize.fontSize + "px"');
      color: v-bind('config.customize.fontColor');
    }

    .el-switch__core {
      height: var(--switch-height);
      width: var(--switch-width) !important;
      border-radius: calc(var(--switch-height) / 2);
    }
  }

  /* 调整开关滑动位置 */
  ::v-deep .el-switch.is-checked .el-switch__core::after {
    margin-left: calc(var(--switch-width) - var(--switch-height) + 2px) !important;
  }

  /* 确保按钮在正确位置 */
  ::v-deep .el-switch__core::after {
    left: 2px;
    top: 2px;
    border-radius: 100%;
    transition: all 0.3s;
    height: calc(var(--switch-height) - 4px) !important;
    width: calc(var(--switch-height) - 4px) !important;
  }
}
</style>

// 这是一个UTF-8测试注释
