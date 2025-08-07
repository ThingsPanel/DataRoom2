<!-- 数据标识选择器组件 -->
<template>
  <div class="metrics-select-container">
    <el-select
      v-model="selectedKey"
      class="bs-el-select metrics-select"
      popper-class="bs-el-select"
      filterable
      placeholder="请选择数据标识"
      :loading="loading"
      @change="handleChange"
      value-key="uniqueId"
    >
      <el-option
        v-if="loading"
        disabled
        value=""
        label="加载中..."
      />

      <template v-if="!loading && Object.keys(metricsDataByType).length === 0">
        <el-option
          disabled
          value=""
          label="暂无数据"
        >
          <div class="empty-metrics">
            <i class="el-icon-warning-outline" />
            <span>暂无可用的数据标识</span>
          </div>
        </el-option>
      </template>

      <template v-else>
        <template v-for="(items, type) in metricsDataByType">
          <el-option-group
            :key="type"
            :label="type"
          >
            <el-option
              v-for="item in items"
              :key="item.uniqueId || item.key"
              :label="item.name || item.key"
              :value="item"
            >
              <div class="metrics-option-content">
                <div class="metrics-info">
                  <span class="metrics-name">{{ item.name || item.key }}</span>
                  <span class="metrics-key" v-if="item.key">({{ item.key }})</span>
                </div>
                <span class="metrics-data-type" v-if="item.data_type">{{ item.data_type }}</span>
              </div>
            </el-option>
          </el-option-group>
        </template>
      </template>
    </el-select>
  </div>
</template>

<!-- 保持 template 部分不变 -->

<script>
import { getDeviceMetrics } from '../../../js/utils/iotApiService'
import { Message } from 'element-ui'

export default {
  name: 'MetricsSelect',
  props: {
    deviceId: {
      type: [String, Number],
      default: ''
    },
    value: {
      type: [String, Object],
      default: ''
    },
    dataType: {
      type: String,
      default: 'telemetry'
    },
    placeholder: {
      type: String,
      default: '请选择数据标识'
    }
  },
  data() {
    return {
      loading: false,
      selectedKey: '',
      metricsDataByType: {},
      keyList: []
    }
  },
  watch: {
    deviceId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.fetchMetrics()
        } else {
          this.clearMetrics()
        }
      }
    },
    value: {
      immediate: true,
      handler(newVal) {

        // 处理不同类型的值
        if (typeof newVal === 'object' && newVal !== null) {
          // 如果收到的是对象，直接设置为选中项
          this.selectedKey = newVal
        } else if (newVal) {
          // 如果是字符串类型的key，尝试在keyList中查找对应的对象
          if (this.keyList && this.keyList.length > 0) {
            const foundMetric = this.keyList.find(item => 
              item.key === newVal || 
              item.name === newVal
            )

            if (foundMetric) {
              this.selectedKey = foundMetric
            } else {
              // 如果找不到匹配项，创建一个临时对象
              this.selectedKey = {
                key: newVal,
                name: newVal,
                uniqueId: `temp_${newVal}`
              }
            }
          } else {
            // 如果还没有加载选项列表，创建一个临时对象
            this.selectedKey = {
              key: newVal,
              name: newVal,
              uniqueId: `temp_${newVal}`
            }
          }
        } else {
          this.selectedKey = ''
        }
      }
    },
    // 添加对 keyList 的监听，当选项列表加载完成后，尝试重新匹配选中项
    keyList: {
      handler(newList) {
        if (newList && newList.length > 0 && this.value && typeof this.value === 'string') {
          // 如果有值且是字符串类型，在新加载的选项中查找匹配项
          const foundMetric = newList.find(item => 
            item.key === this.value || 
            item.name === this.value
          )
          
          if (foundMetric) {
            this.selectedKey = foundMetric
          }
        }
      }
    }
  },
  methods: {
    clearMetrics() {
      this.keyList = []
      this.metricsDataByType = {}
      this.selectedKey = ''
    },
    async fetchMetrics() {
      if (!this.deviceId) {
        this.clearMetrics()
        return
      }

      this.loading = true

      try {
        const res = await getDeviceMetrics(this.deviceId)

        // 处理分组格式的数据，如示例中的 telemetry, attributes, event, command 分组
        if (res && typeof res === 'object' && !Array.isArray(res)) {
          // 如果是分组数据格式 {telemetry: [...], attributes: [...], ...}
          if (Object.keys(res).some(key => Array.isArray(res[key]))) {
            this.metricsDataByType = {}
            this.keyList = []

            // 遍历每个分组
            Object.keys(res).forEach(groupKey => {
              if (Array.isArray(res[groupKey])) {
                const metrics = res[groupKey]
                this.metricsDataByType[groupKey] = metrics.map(metric => ({
                  ...metric,
                  data_source_type: groupKey,
                  uniqueId: metric.uniqueId || `${groupKey}_${metric.key}`
                }))

                this.keyList = [...this.keyList, ...this.metricsDataByType[groupKey]]
              }
            })
            return
          }

          // 如果是API响应嵌套格式
          let metricsData = null

          // 处理各种可能的响应格式
          if (res.data) {
            // 标准API响应格式 {code: 0, data: {...}}
            if (res.data.code === 0 || res.data.code === 200) {
              metricsData = res.data.data
            } else {
              metricsData = res.data
            }
          } else if (res.code === 0 || res.code === 200) {
            // 直接响应格式 {code: 0, result: {...}}
            metricsData = res.result
          } else if (res.result && typeof res.result === 'object') {
            // 结果在result字段
            metricsData = res.result
          } else {
            // 其他情况，尝试直接使用
            metricsData = res
          }

          // 如果metricsData本身就是分组格式
          if (metricsData && typeof metricsData === 'object' && !Array.isArray(metricsData) &&
              Object.keys(metricsData).some(key => Array.isArray(metricsData[key]))) {
            this.metricsDataByType = {}
            this.keyList = []

            // 遍历每个分组
            Object.keys(metricsData).forEach(groupKey => {
              if (Array.isArray(metricsData[groupKey])) {
                const metrics = metricsData[groupKey]
                this.metricsDataByType[groupKey] = metrics.map(metric => ({
                  ...metric,
                  data_source_type: groupKey,
                  uniqueId: metric.uniqueId || `${groupKey}_${metric.key}`
                }))

                this.keyList = [...this.keyList, ...this.metricsDataByType[groupKey]]
              }
            })
            return
          }
        }

        // 如果不是分组格式，使用原来的处理逻辑
        let metricsData = null

        if (res && Array.isArray(res.data)) {
          metricsData = res.data
        } else if (res && res.data && Array.isArray(res.data.data)) {
          metricsData = res.data.data
        } else if (res && Array.isArray(res)) {
          metricsData = res
        } else if (res && res.result && Array.isArray(res.result)) {
          metricsData = res.result
        } else {
          this.metricsDataByType = {}
          this.keyList = []
          return
        }


        if (metricsData && Array.isArray(metricsData)) {
          this.metricsDataByType = {}
          this.keyList = []

          metricsData.forEach((category, categoryIndex) => {
            const type = category.data_source_type || '未分类'

            if (!this.metricsDataByType[type]) {
              this.metricsDataByType[type] = []
            }

            if (category.options && Array.isArray(category.options)) {
              category.options.forEach((option, optionIndex) => {
                const item = {
                  key: option.key,
                  name: option.name || option.key,
                  data_type: option.data_type || 'unknown',
                  data_source_type: type,
                  uniqueId: `${type}_${categoryIndex}_${optionIndex}`
                }

                this.metricsDataByType[type].push(item)
                this.keyList.push(item)
              })
            }
          })
        } else {
          this.metricsDataByType = {}
          this.keyList = []
        }
      } catch (error) {
        Message.error('获取设备指标数据失败')
      } finally {
        this.loading = false
      }
    },
    handleChange(value) {

      // 确保不会传递undefined
      const selectedValue = value || ''
      
      // 如果父组件只需要 key，则只传递 key
      const emitValue = selectedValue && typeof selectedValue === 'object' 
        ? selectedValue.key  // 只传递 key 值
        : selectedValue
      
      
      // 发出事件通知父组件
      this.$emit('input', emitValue)
      this.$emit('select', selectedValue)  // 这里保留完整对象，以便父组件需要时使用
      this.$emit('change', emitValue)
    }
  }
}
</script>

<!-- 保持 style 部分不变 -->