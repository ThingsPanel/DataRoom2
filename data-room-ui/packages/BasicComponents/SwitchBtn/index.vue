<template>
  <div class="bs-switch-btn" :style="style">
    <el-switch
      v-model="switchValue"
      :active-color="config.customize.activeColor"
      :inactive-color="config.customize.inactiveColor"
      :active-text="config.customize.showText ? config.customize.activeText : ''"
      :inactive-text="config.customize.showText ? config.customize.inactiveText : ''"
      :active-icon-class="config.customize.activeIconClass"
      :inactive-icon-class="config.customize.inactiveIconClass"
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
      switchValue: false,
      style: {}
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
      const { activeValue, inactiveValue, executeScript } = this.config.customize
      const value = val ? activeValue : inactiveValue
      if (executeScript) {
        try {
          // eslint-disable-next-line no-new-func
          const scriptFn = new Function('activeValue', 'inactiveValue', executeScript)
          scriptFn(activeValue, inactiveValue)
        } catch (error) {
          console.error('执行脚本失败:', error)
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
}
</style>

// 这是一个UTF-8测试注释
