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
              :key="item.uniqueId"
              :label="item.name || item.key"
              :value="item.key"
            >
              <div class="metrics-option-content">
                <div class="metrics-info">
                  <span class="metrics-name">{{ item.name || item.key }}</span>
                  <span class="metrics-key">({{ item.key }})</span>
                </div>
                <span class="metrics-data-type">{{ item.data_type }}</span>
              </div>
            </el-option>
          </el-option-group>
        </template>
      </template>
    </el-select>
  </div>
</template>

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
      type: String,
      default: ''
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
        this.selectedKey = newVal
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
        console.log('获取设备指标数据, 设备ID:', this.deviceId)
        const res = await getDeviceMetrics(this.deviceId)
        console.log('设备指标数据响应:', res)
        
        // 处理分组格式的数据，如示例中的 telemetry, attributes, event, command 分组
        if (res && typeof res === 'object' && !Array.isArray(res)) {
          // 如果是分组数据格式 {telemetry: [...], attributes: [...], ...}
          if (Object.keys(res).some(key => Array.isArray(res[key]))) {
            console.log('处理分组格式数据')
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
            console.log('指标数据分组:', this.metricsDataByType)
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
            console.log('在响应内找到分组格式数据')
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
            console.log('指标数据分组:', this.metricsDataByType)
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
          console.warn('无法识别的指标数据格式:', res)
          this.metricsDataByType = {}
          this.keyList = []
          return
        }
        
        console.log('指标数据:', metricsData)
        
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
          
          console.log('指标数据分组:', this.metricsDataByType)
        } else {
          console.warn('未获取到指标数据')
          this.metricsDataByType = {}
          this.keyList = []
        }
      } catch (error) {
        console.error('获取设备指标数据失败:', error)
        Message.error('获取设备指标数据失败')
      } finally {
        this.loading = false
      }
    },
    handleChange(value) {
      if (!value) return
      this.$emit('change', value)
    },
    selectKey(key) {
      if (!key) return
      
      this.selectedKey = key
      
      this.$nextTick(() => {
        this.$emit('change', key)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.metrics-select-container {
  width: 100%;
  
  .metrics-select {
    width: 100%;
  }
}

.empty-metrics {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: var(--bs-el-text-secondary);
  
  i {
    margin-right: 8px;
    font-size: 16px;
  }
  
  span {
    font-size: 13px;
  }
}

.metrics-option-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  
  .metrics-info {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .metrics-name {
      color: var(--bs-el-text);
    }
    
    .metrics-key {
      color: var(--bs-el-text-secondary);
      font-size: 12px;
    }
  }
  
  .metrics-data-type {
    color: var(--bs-el-text-secondary);
    font-size: 12px;
  }
}

:deep(.bs-el-select) {
  .el-input__inner {
    background-color: var(--bs-background-2) !important;
    border-color: var(--bs-border-color) !important;
    color: var(--bs-el-text) !important;
    
    &:focus {
      border-color: var(--bs-el-color-primary) !important;
    }
  }
}
</style> 