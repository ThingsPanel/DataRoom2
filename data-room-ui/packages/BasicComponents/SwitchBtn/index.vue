<template>
  <div class="bs-switch-btn" :style="style">
    <el-switch
      v-model="switchValue"
      :active-color="config.customize.activeColor"
      :inactive-color="config.customize.inactiveColor"
      :active-text="config.customize.showText ? config.customize.activeText : ''"
      :inactive-text="config.customize.showText ? config.customize.inactiveText : ''"
      :active-icon-class="loading ? 'el-icon-loading' : config.customize.activeIconClass"
      :inactive-icon-class="loading ? 'el-icon-loading' : config.customize.inactiveIconClass"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { getFieldValue } from 'data-room-ui/js/utils'

export default {
  name: 'SwitchBtn',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      switchValue: true,
      style: {},
      loading: false
    }
  },
  watch: {
    'config.data': {
      handler (val) {
        this.initData()
      },
      deep: true
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      if (!this.config.data) return
      const { data } = this.config
      const { dataSourceType } = data
      if (dataSourceType === 'static') {
        this.handleStaticData(data)
      } else if (dataSourceType === 'real') {
        this.handleRealData(data)
      }
    },
    handleStaticData (data) {
      const { staticData } = data
      if (!staticData || !staticData.length) return
      const value = getFieldValue(staticData[0], data.metricField[0])
      this.updateSwitchValue(value)
    },
    handleRealData (data) {
      const { realData } = data
      if (!realData || !realData.length) return
      const value = getFieldValue(realData[0], data.metricField[0])
      this.updateSwitchValue(value)
    },
    updateSwitchValue (value) {
      const { thresholdValue, activeValue } = this.config.customize
      if (thresholdValue !== undefined) {
        this.switchValue = value >= thresholdValue
      } else {
        this.switchValue = value === activeValue
      }
    },
    handleChange (val) {
      const { activeValue, inactiveValue, executeScript, loadingDuration } = this.config.customize
      const value = val ? activeValue : inactiveValue
      
      // 启用loading状态
      this.loading = true
      
      // 根据配置的loadingDuration或默认1000ms后关闭loading状态
      setTimeout(() => {
        this.loading = false
      }, loadingDuration || 1000)
      
      if (executeScript) {
        try {
          // eslint-disable-next-line no-new-func
          const scriptFn = new Function('activeValue', 'inactiveValue', executeScript)
          scriptFn(activeValue, inactiveValue)
        } catch (error) {
        }
      }
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.bs-switch-btn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  :deep(.el-switch) {
    .el-icon-loading {
      animation: rotate 1s linear infinite;
      display: inline-block;
      font-size: 14px;
    }
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>

// 这是一个UTF-8测试注释
