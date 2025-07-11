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

      <!-- 正常状态 - 使用DvScrollBoard -->
      <div v-else-if="hasData" class="telemetry-scroll-wrapper">
        <dv-scroll-board
          :key="updateKey"
          :config="scrollBoardConfig"
          :style="boardStyle"
          class="telemetry-scroll-board"
        />
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
import DvScrollBoard from '@jiaminghi/data-view/lib/components/scrollBoard/src/main.vue'
import '@jiaminghi/data-view/lib/components/scrollBoard/src/main.css'

/**
 * 遥测数据展示组件
 * 负责显示实时遥测数据，支持数据轮播和状态监控
 */
export default {
  name: 'TelemetryDataSection',
  components: {
    DvScrollBoard
  },
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
      maxDisplayRows: 10, // 最大显示行数
      previousData: [], // 上一次的数据，用于对比变化
      newDataTimestamp: 0, // 新数据时间戳
      updateKey: 0 // 用于强制更新DvScrollBoard组件
    }
  },
  computed: {
    // 是否有数据
    hasData() {
      return this.telemetryData && 
             !this.telemetryData.isEmpty && 
             Array.isArray(this.telemetryData) && 
             this.telemetryData.length > 0
    },

    // 数据是否活跃（最近更新）
    isDataActive() {
      if (!this.hasData) return false

      const now = Date.now() / 1000
      const latestTimestamp = Math.max(...this.telemetryData.map(item => item.timestamp || 0))
      return (now - latestTimestamp) < 300 // 5分钟内的数据认为是活跃的
    },

    // DvScrollBoard配置
    scrollBoardConfig() {
      if (!this.hasData) return { data: [], header: [] }

      // 表头配置
      const header = ['参数', '值', '更新时间']

      // 数据转换为二维数组格式
      const data = this.telemetryData.map(item => [
        item.key || '未知参数',
        `${item.value || '--'} ${item.unit || ''}`.trim(),
        this.formatTimestamp(item.timestamp)
      ])

      // 限制显示行数，但不超过10行
      const limitedData = data.slice(0, Math.min(data.length, this.maxDisplayRows))
      
      // 计算显示行数，确保轮播能够正常工作
      const displayRows = Math.min(limitedData.length, this.maxDisplayRows)
      const actualRowNum = limitedData.length > this.maxDisplayRows ? this.maxDisplayRows : Math.max(1, limitedData.length - 1)

      return {
        header,
        data: limitedData,
        index: false, // 不显示序号
        columnWidth: [120, 120, 100], // 列宽配置
        align: ['left', 'center', 'center'], // 对齐方式
        rowNum: actualRowNum, // 显示行数，确保能够轮播
        waitTime: 2000, // 轮播间隔2秒
        carousel: 'single' // 单行轮播
      }
    },

    // 样式配置
    boardStyle() {
      return {
        '--dv-header-text-color': '#ffffff',
        '--dv-data-text-color': 'rgba(255, 255, 255, 0.8)',
        '--dv-header-font-size': '14px',
        '--dv-data-font-size': '12px'
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
      // 安全检查：确保 item 和 item.key 存在
      if (!item || !item.key || typeof item.key !== 'string') {
        return false
      }

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
      // 安全检查：确保 item 和 item.key 存在
      if (!item || !item.key || typeof item.key !== 'string') {
        return false
      }

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
      // 安全检查：确保 paramName 存在且为字符串
      if (!paramName || typeof paramName !== 'string') {
        return 'icon-default'
      }

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
      // 强制更新DvScrollBoard组件
      this.updateKey++
    }
},
  mounted() {
    // 组件挂载完成
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.section-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  position: relative;
}

.section-header h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 12px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.section-header h4::before {
  content: '';
  width: 6px;
  height: 20px;
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  border-radius: 3px;
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.4);
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

/* DvScrollBoard样式 */
.telemetry-scroll-wrapper {
  height: 300px; /* 固定高度，约30px每行 */
  overflow: hidden;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 8px;
}

.telemetry-scroll-board {
  width: 100%;
  height: 100%;
  background: transparent;
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
  padding: 16px 24px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
  backdrop-filter: blur(5px);
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.summary-item:hover {
  background: rgba(0, 212, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 212, 255, 0.2);
}

.summary-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.summary-item:hover::before {
  left: 100%;
}

.summary-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-value {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}



/* 动画效果 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

@keyframes highlight {
  0% {
    background: rgba(0, 212, 255, 0.4);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }
  100% {
    background: rgba(0, 212, 255, 0.1);
    box-shadow: 0 0 8px rgba(0, 212, 255, 0.1);
  }
}

@keyframes trend {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.3) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(0, 212, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.6), 0 0 30px rgba(0, 212, 255, 0.4);
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
