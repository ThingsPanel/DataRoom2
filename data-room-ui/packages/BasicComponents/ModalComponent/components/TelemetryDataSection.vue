<template>
  <div class="telemetry-data-section">
    <div class="section-header">
      <h4>实时遥测数据</h4>
      <div class="data-status">
        <div class="status-indicator" :class="{ 'active': isDataActive }"></div>
        <span class="status-text">{{ isDataActive ? '实时' : '离线' }}</span>
      </div>
    </div>
    <div class="telemetry-content">
      <!-- 空状态 -->
      <div v-if="telemetryData.isEmpty" class="empty-state">
        <div class="empty-icon">📡</div>
        <div class="empty-text">无法加载遥测数据</div>
        <div class="empty-hint">请检查设备ID是否正确</div>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="telemetryData.isError" class="error-state">
        <div class="error-icon">⚠️</div>
        <div class="error-text">加载遥测数据失败</div>
        <div class="error-message">{{ telemetryData.errorMessage }}</div>
      </div>
      
      <!-- 正常状态 -->
      <div v-else-if="hasData" class="telemetry-table-wrapper">
        <div 
          class="telemetry-table" 
          :class="{ 'transitioning': isTransitioning }"
          :style="tableTransform"
        >
          <div class="table-header">
            <div class="header-cell">参数名称</div>
            <div class="header-cell">当前值</div>
            <div class="header-cell">更新时间</div>
          </div>
          <div class="table-body">
            <div 
              v-for="(item, index) in displayData" 
              :key="index"
              class="table-row"
              :class="{ 
                'highlight': isNewData(item),
                'warning': isWarningValue(item),
                'error': isErrorValue(item)
              }"
            >
              <div class="table-cell param-name">
                <span class="param-icon" :class="getParamIconClass(item.key)"></span>
                {{ item.key }}
              </div>
              <div class="table-cell param-value">
                <span class="value-text">{{ item.value }}</span>
                <span v-if="getTrend(item)" class="trend-indicator" :class="getTrend(item)">
                  {{ getTrendSymbol(item) }}
                </span>
              </div>
              <div class="table-cell update-time">
                {{ formatTimestamp(item.timestamp) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 无数据状态 -->
      <div v-else class="no-data">
        <div class="no-data-icon">📡</div>
        <div class="no-data-text">暂无遥测数据</div>
        <div class="no-data-desc">设备可能处于离线状态</div>
      </div>
      
      <!-- 数据统计 -->
      <div v-if="hasData" class="data-summary">
        <div class="summary-item">
          <span class="summary-label">总参数:</span>
          <span class="summary-value">{{ telemetryData.length }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">异常参数:</span>
          <span class="summary-value error">{{ errorCount }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">最后更新:</span>
          <span class="summary-value">{{ lastUpdateTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 遥测数据展示组件
 * 负责显示实时遥测数据，支持数据轮播和状态监控
 */
export default {
  name: 'TelemetryDataSection',
  props: {
    // 遥测数据
    telemetryData: {
      type: Array,
      default: () => []
    },
    // 当前轮播索引
    currentIndex: {
      type: Number,
      default: 0
    },
    // 是否正在过渡
    isTransitioning: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      maxDisplayRows: 5, // 最大显示行数
      previousData: [], // 上一次的数据，用于对比变化
      newDataTimestamp: 0 // 新数据时间戳
    }
  },
  computed: {
    // 是否有数据
    hasData() {
      return this.telemetryData && this.telemetryData.length > 0
    },
    
    // 数据是否活跃（最近更新）
    isDataActive() {
      if (!this.hasData) return false
      
      const now = Date.now() / 1000
      const latestTimestamp = Math.max(...this.telemetryData.map(item => item.timestamp || 0))
      return (now - latestTimestamp) < 300 // 5分钟内的数据认为是活跃的
    },
    
    // 显示的数据（支持轮播）
    displayData() {
      if (!this.hasData) return []
      
      if (this.telemetryData.length <= this.maxDisplayRows) {
        return this.telemetryData
      }
      
      // 轮播显示
      const startIndex = this.currentIndex
      const endIndex = startIndex + this.maxDisplayRows
      
      if (endIndex <= this.telemetryData.length) {
        return this.telemetryData.slice(startIndex, endIndex)
      } else {
        // 处理循环轮播
        const firstPart = this.telemetryData.slice(startIndex)
        const secondPart = this.telemetryData.slice(0, endIndex - this.telemetryData.length)
        return [...firstPart, ...secondPart]
      }
    },
    
    // 表格变换样式（用于轮播动画）
    tableTransform() {
      if (!this.isTransitioning) {
        return {
          transform: 'translateY(0)',
          transition: 'transform 0.3s ease-in-out'
        }
      }
      
      return {
        transform: 'translateY(-10px)',
        transition: 'transform 0.15s ease-in-out',
        opacity: '0.7'
      }
    },
    
    // 异常参数数量
    errorCount() {
      return this.telemetryData.filter(item => this.isErrorValue(item)).length
    },
    
    // 最后更新时间
    lastUpdateTime() {
      if (!this.hasData) return '-'
      
      const latestTimestamp = Math.max(...this.telemetryData.map(item => item.timestamp || 0))
      return this.formatTimestamp(latestTimestamp)
    }
  },
  methods: {
    // 格式化时间戳
    formatTimestamp(timestamp) {
      if (!timestamp) return '-'
      
      try {
        const date = new Date(timestamp * 1000)
        const now = new Date()
        const diff = now - date
        
        if (diff < 60000) { // 1分钟内
          return '刚刚'
        } else if (diff < 3600000) { // 1小时内
          return `${Math.floor(diff / 60000)}分钟前`
        } else if (diff < 86400000) { // 24小时内
          return date.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
          })
        } else {
          return date.toLocaleDateString('zh-CN', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      } catch (error) {
        return '-'
      }
    },
    
    // 判断是否为新数据
    isNewData(item) {
      const now = Date.now()
      return (now - this.newDataTimestamp) < 2000 && // 2秒内
             this.previousData.some(prev => 
               prev.key === item.key && prev.value !== item.value
             )
    },
    
    // 判断是否为警告值
    isWarningValue(item) {
      // 这里可以根据实际业务逻辑判断
      const value = parseFloat(item.value)
      if (isNaN(value)) return false
      
      // 示例：温度超过40度为警告
      if (item.key.includes('温度') && value > 40) {
        return true
      }
      
      // 示例：压力超过3MPa为警告
      if (item.key.includes('压力') && value > 3) {
        return true
      }
      
      return false
    },
    
    // 判断是否为错误值
    isErrorValue(item) {
      // 这里可以根据实际业务逻辑判断
      const value = parseFloat(item.value)
      if (isNaN(value)) return false
      
      // 示例：温度超过50度为错误
      if (item.key.includes('温度') && value > 50) {
        return true
      }
      
      // 示例：压力超过4MPa为错误
      if (item.key.includes('压力') && value > 4) {
        return true
      }
      
      return false
    },
    
    // 获取参数图标类
    getParamIconClass(paramName) {
      const iconMap = {
        '温度': 'icon-temperature',
        '压力': 'icon-pressure',
        '转速': 'icon-speed',
        '电流': 'icon-current',
        '电压': 'icon-voltage',
        '功率': 'icon-power',
        '流量': 'icon-flow',
        '液位': 'icon-level'
      }
      
      for (const [key, className] of Object.entries(iconMap)) {
        if (paramName.includes(key)) {
          return className
        }
      }
      
      return 'icon-default'
    },
    
    // 获取趋势
    getTrend(item) {
      const prevItem = this.previousData.find(prev => prev.key === item.key)
      if (!prevItem) return null
      
      const currentValue = parseFloat(item.value)
      const prevValue = parseFloat(prevItem.value)
      
      if (isNaN(currentValue) || isNaN(prevValue)) return null
      
      const diff = currentValue - prevValue
      const threshold = Math.abs(prevValue) * 0.05 // 5%的变化阈值
      
      if (Math.abs(diff) < threshold) return null
      
      return diff > 0 ? 'trend-up' : 'trend-down'
    },
    
    // 获取趋势符号
    getTrendSymbol(item) {
      const trend = this.getTrend(item)
      if (trend === 'trend-up') return '↗'
      if (trend === 'trend-down') return '↘'
      return ''
    },
    
    // 更新数据
    updateData(newData) {
      this.previousData = [...this.telemetryData]
      this.newDataTimestamp = Date.now()
    }
  },
  watch: {
    // 监听遥测数据变化
    telemetryData: {
      handler(newData, oldData) {
        if (oldData && oldData.length > 0) {
          this.updateData(newData)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.telemetry-data-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.section-header {
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.section-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-header h4::before {
  content: '';
  width: 4px;
  height: 16px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  border-radius: 2px;
}

.data-status {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  transition: all 0.3s ease;
}

.status-indicator.active {
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
  animation: pulse 2s infinite;
}

.status-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.telemetry-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.telemetry-table-wrapper {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.telemetry-table {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.telemetry-table.transitioning {
  opacity: 0.7;
  transform: translateY(-5px);
}

.table-header {
  display: flex;
  background: rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.header-cell {
  flex: 1;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.header-cell:last-child {
  border-right: none;
}

.table-body {
  flex: 1;
  overflow: hidden;
}

.table-row {
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.03);
}

.table-row.highlight {
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.3);
  animation: highlight 1s ease-out;
}

.table-row.warning {
  background: rgba(251, 191, 36, 0.1);
  border-color: rgba(251, 191, 36, 0.3);
}

.table-row.error {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
}

.table-cell {
  flex: 1;
  padding: 12px 16px;
  font-size: 13px;
  color: #ffffff;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  gap: 8px;
}

.table-cell:last-child {
  border-right: none;
}

.param-name {
  font-weight: 500;
}

.param-icon {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  flex-shrink: 0;
}

.icon-temperature {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.icon-pressure {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.icon-speed {
  background: linear-gradient(135deg, #10b981, #059669);
}

.icon-current {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.icon-voltage {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.icon-power {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
}

.icon-flow {
  background: linear-gradient(135deg, #14b8a6, #0d9488);
}

.icon-level {
  background: linear-gradient(135deg, #84cc16, #65a30d);
}

.icon-default {
  background: linear-gradient(135deg, #6b7280, #4b5563);
}

.param-value {
  font-weight: 600;
  justify-content: space-between;
}

.value-text {
  flex: 1;
}

.trend-indicator {
  font-size: 14px;
  font-weight: bold;
  animation: trend 0.5s ease-in-out;
}

.trend-up {
  color: #22c55e;
}

.trend-down {
  color: #ef4444;
}

.update-time {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  justify-content: flex-end;
}

.no-data {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.5);
  padding: 40px 20px;
}

.no-data-icon {
  font-size: 48px;
  opacity: 0.3;
}

.no-data-text {
  font-size: 14px;
  font-weight: 500;
}

.no-data-desc {
  font-size: 12px;
  opacity: 0.7;
}

.data-summary {
  display: flex;
  justify-content: space-around;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.03);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.summary-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-value {
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
}

.summary-value.error {
  color: #ef4444;
}

/* 动画效果 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes highlight {
  0% {
    background: rgba(0, 212, 255, 0.3);
  }
  100% {
    background: rgba(0, 212, 255, 0.1);
  }
}

@keyframes trend {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* 空状态样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.8;
}

.empty-text {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.8);
}

.empty-hint {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

/* 错误状态样式 */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
  text-align: center;
  color: rgba(239, 68, 68, 0.8);
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.9;
}

.error-text {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #ef4444;
}

.error-message {
  font-size: 14px;
  color: rgba(239, 68, 68, 0.7);
  max-width: 300px;
  word-wrap: break-word;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .section-header {
    padding: 12px 16px;
  }
  
  .header-cell,
  .table-cell {
    padding: 8px 12px;
    font-size: 11px;
  }
  
  .param-icon {
    width: 12px;
    height: 12px;
  }
  
  .data-summary {
    padding: 8px 16px;
  }
  
  .summary-label {
    font-size: 9px;
  }
  
  .summary-value {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .table-row {
    flex-direction: column;
    gap: 4px;
  }
  
  .table-cell {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding: 6px 12px;
  }
  
  .table-cell:last-child {
    border-bottom: none;
  }
  
  .header-cell {
    display: none;
  }
  
  .table-cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    margin-right: 8px;
    min-width: 60px;
  }
}
</style>