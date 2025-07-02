<template>
  <!-- 设备监控大屏弹窗 - 使用 teleport 渲染到 body -->
  <teleport to="body">
    <div v-if="visible" class="modal-overlay" @click="handleClose">
      <div class="device-monitor-dialog" :key="modalKey" :style="modalStyle" @click.stop>
      <div class="modal-header">
        <h3>设备监控大屏</h3>
        <button class="close-btn" @click="handleClose">&times;</button>
      </div>
      <div class="modal-body device-monitor-body">
        <!-- 左侧区域 -->
        <div class="left-panel">
          <!-- 设备信息 -->
          <DeviceInfoSection
            :device-data="selectedRowData"
            :table-columns="tableColumns"
            :device-info="deviceInfo"
          />

          <!-- 设备汇总统计 -->
          <DeviceSummarySection
            :device-summary="deviceSummary"
            :device-info="deviceInfo"
          />

          <!-- 产量曲线图 -->
          <ProductionChartSection
            ref="productionChart"
            :production-data="productionData"
          />
        </div>

        <!-- 右侧区域 -->
        <div class="right-panel">
          <TelemetryDataSection
            :telemetry-data="telemetryData"
            :current-index="currentTelemetryIndex"
            :is-transitioning="isTelemetryTransitioning"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="handleClose">关闭</button>
      </div>
    </div>
  </div>
  </teleport>
</template>

<script>
import DeviceInfoSection from './DeviceInfoSection.vue'
import DeviceSummarySection from './DeviceSummarySection.vue'
import ProductionChartSection from './ProductionChartSection.vue'
import TelemetryDataSection from './TelemetryDataSection.vue'
import { createDeviceMonitorApi, apiErrorHandler } from '../api'

/**
 * 设备监控弹窗组件
 * 负责设备监控大屏的整体布局和数据管理
 */
export default {
  name: 'DeviceMonitorModal',
  components: {
    DeviceInfoSection,
    DeviceSummarySection,
    ProductionChartSection,
    TelemetryDataSection
  },
  props: {
    // 弹窗显示状态
    visible: {
      type: Boolean,
      default: false
    },
    // 选中的行数据
    selectedRowData: {
      type: Object,
      default: () => ({})
    },
    // 表格列配置
    tableColumns: {
      type: Array,
      default: () => []
    },
    // 弹窗配置
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 设备监控相关数据
      deviceInfo: {}, // 设备详细信息
      deviceSummary: {}, // 设备汇总统计
      telemetryData: [], // 实时遥测数据
      productionData: [], // 产量曲线数据
      telemetryTimer: null, // 遥测数据轮播定时器
      currentTelemetryIndex: 0, // 当前遥测数据轮播索引
      isTelemetryTransitioning: false, // 遥测数据是否正在过渡
      modalKey: 0 // 用于强制重新渲染的 key
    }
  },
  computed: {
    // 弹窗样式 - 使用固定像素值，完全脱离父容器影响
    modalStyle() {
      // 获取屏幕宽度
      const screenWidth = window.innerWidth
      // 使用配置的宽度百分比，如果没有配置则使用默认值 80%
      const dialogWidthPercent = this.config?.customize?.dialogWidth || 80
      // 计算实际像素宽度
      const actualWidth = Math.max(
        screenWidth * (dialogWidthPercent / 100),
        1000 // 最小 1000px，移除最大宽度限制让弹窗可以更宽
      )

      return {
        width: actualWidth + 'px',
        height: Math.min(window.innerHeight * 0.9, 1200) + 'px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        // 强制重置定位上下文，确保相对于视口定位
        marginLeft: 0,
        marginTop: 0
      }
    }
  },
  watch: {
    // 监听配置变化，强制重新计算样式
    'config.customize.dialogWidth': {
      handler() {
        this.modalKey++
      },
      deep: true
    }
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.clearTelemetryCarousel()
      this.destroyProductionChart()
      this.$emit('close')
    },

    // 加载设备监控数据
    async loadDeviceMonitorData(rowData) {
      // 获取设备ID
      const deviceId = this.getDeviceId(rowData)

      // 如果没有设备ID，显示空状态
      if (!deviceId) {
        this.showEmptyState()
        return
      }

      try {
        // 并行加载各种数据
        await Promise.all([
          this.loadDeviceInfo(deviceId),
          this.loadDeviceSummary(),
          this.loadTelemetryData(deviceId),
          this.loadProductionData(deviceId)
        ])

        // 启动遥测数据轮播
        this.startTelemetryCarousel()

        // 渲染产量图表
        this.$nextTick(() => {
          this.renderProductionChart()
        })
      } catch (error) {
        console.error('加载设备监控数据失败:', error)
        this.showErrorState(error)
      }
    },

    // 获取设备ID
    getDeviceId(rowData) {
      // 尝试从多个可能的字段获取设备ID
      return rowData?.device_id || rowData?.deviceId || rowData?.id || rowData?.设备ID || rowData?.设备编号
    },

    // 获取API基础URL
    getApiBaseUrl() {
      const configUrl = this.config?.customize?.apiBaseUrl
      // 确保返回有效的URL，处理null、undefined、空字符串等情况
      return (configUrl && configUrl.trim()) ? configUrl.trim() : 'http://47.92.253.145:9102'
    },

    // 显示空状态
    showEmptyState() {
      this.deviceInfo = apiErrorHandler.createEmptyState('设备信息不存在')
      this.deviceSummary = apiErrorHandler.createEmptyState('设备汇总统计不存在')
      this.telemetryData = apiErrorHandler.createEmptyState('遥测数据不存在')
      this.productionData = apiErrorHandler.createEmptyState('产量数据不存在')
    },

    // 显示错误状态
    showErrorState(error) {
      const errorInfo = apiErrorHandler.handleError(error)
      this.deviceInfo = errorInfo
      this.deviceSummary = errorInfo
      this.telemetryData = errorInfo
      this.productionData = errorInfo
    },

    // 加载设备详细信息
    async loadDeviceInfo(deviceId) {
      try {
        const baseURL = this.getApiBaseUrl()
        const api = createDeviceMonitorApi(baseURL)
        this.deviceInfo = await api.getDeviceInfo(deviceId)
      } catch (error) {
        console.error('加载设备信息失败:', error)
        this.deviceInfo = apiErrorHandler.handleError(error)
      }
    },

    // 加载设备汇总统计
    async loadDeviceSummary() {
      try {
        const baseURL = this.getApiBaseUrl()
        const api = createDeviceMonitorApi(baseURL)
        this.deviceSummary = await api.getDeviceSummary()
      } catch (error) {
        console.error('加载设备汇总统计失败:', error)
        this.deviceSummary = apiErrorHandler.handleError(error)
      }
    },

    // 加载实时遥测数据
    async loadTelemetryData(deviceId) {
      try {
        const baseURL = this.getApiBaseUrl()
        const api = createDeviceMonitorApi(baseURL)
        this.telemetryData = await api.getCurrentTelemetry(deviceId)
      } catch (error) {
        console.error('加载遥测数据失败:', error)
        this.telemetryData = apiErrorHandler.handleError(error)
      }
    },

    // 加载产量曲线数据
    async loadProductionData(deviceId) {
      try {
        const baseURL = this.getApiBaseUrl()
        const api = createDeviceMonitorApi(baseURL)
        const data = await api.getProductionCurve(deviceId, 'hour', 24)

        // 转换数据格式为图表需要的格式
        this.productionData = data.map(item => ({
          timestamp: item.timestamp,
          production: parseFloat(item.production),
          date: new Date(item.timestamp * 1000).toISOString().split('T')[0]
        }))
      } catch (error) {
        console.error('加载产量数据失败:', error)
        this.productionData = apiErrorHandler.handleError(error)
      }
    },



    // 启动遥测数据轮播
    startTelemetryCarousel() {
      if (this.telemetryData.length <= 5) {
        return // 数据不足，不需要轮播
      }

      this.clearTelemetryCarousel()

      this.telemetryTimer = setInterval(() => {
        this.nextTelemetryRow()
      }, 2000)
    },

    // 清除遥测数据轮播
    clearTelemetryCarousel() {
      if (this.telemetryTimer) {
        clearInterval(this.telemetryTimer)
        this.telemetryTimer = null
      }
    },

    // 遥测数据下一行
    nextTelemetryRow() {
      if (this.telemetryData.length <= 5) {
        return
      }

      this.isTelemetryTransitioning = true

      setTimeout(() => {
        this.currentTelemetryIndex = (this.currentTelemetryIndex + 1) % this.telemetryData.length

        setTimeout(() => {
          this.isTelemetryTransitioning = false
        }, 50)
      }, 150)
    },

    // 渲染产量图表
    renderProductionChart() {
      if (this.$refs.productionChart) {
        this.$refs.productionChart.renderChart(this.productionData)
      }
    },

    // 销毁产量图表
    destroyProductionChart() {
      if (this.$refs.productionChart) {
        this.$refs.productionChart.destroyChart()
      }
    }
  },
  watch: {
    // 监听弹窗显示状态
    visible(newVal) {
      if (newVal && this.selectedRowData) {
        // 弹窗打开时加载数据
        this.loadDeviceMonitorData(this.selectedRowData)
      } else if (!newVal) {
        // 弹窗关闭时清理资源
        this.clearTelemetryCarousel()
        this.destroyProductionChart()
      }
    }
  },
  mounted() {
    // 添加窗口大小变化监听器，确保弹窗尺寸响应屏幕变化
    this.handleResize = () => {
      // 强制重新计算 modalStyle
      this.$forceUpdate()
    }
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    // 组件销毁前清理资源
    this.clearTelemetryCarousel()
    this.destroyProductionChart()
    // 移除窗口大小变化监听器
    if (this.handleResize) {
      window.removeEventListener('resize', this.handleResize)
    }
  }
}
</script>

<style scoped>
/* 弹窗遮罩层 - 不使用 flex 布局，让子元素完全独立定位 */
.modal-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9998;
  animation: fadeIn 0.3s ease-out;
  /* 强制重置所有可能影响定位的属性 */
  transform: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* 设备监控弹窗 - 完全独立定位，不受父容器影响 */
.device-monitor-dialog {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideIn 0.3s ease-out;
  /* 确保完全独立，不继承任何父容器样式 */
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
  /* 强制使用固定定位，不受任何父容器transform影响 */
  position: fixed !important;
}

/* 弹窗头部 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  color: #ffffff;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

/* 弹窗主体 */
.device-monitor-body {
  flex: 1;
  display: flex;
  gap: 24px;
  padding: 24px;
  overflow: hidden;
}

/* 左侧面板 */
.left-panel {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
}

/* 右侧面板 */
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 弹窗底部 */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .device-monitor-body {
    flex-direction: column;
    gap: 16px;
  }

  .left-panel,
  .right-panel {
    flex: none;
  }

  .right-panel {
    max-height: 300px;
  }
}

@media (max-width: 768px) {
  .device-monitor-dialog {
    width: 95vw !important;
    height: 90vh !important;
    margin: 20px;
    min-width: auto !important;
    max-width: none !important;
  }

  .modal-header {
    padding: 16px 20px;
  }

  .device-monitor-body {
    padding: 16px 20px;
  }

  .modal-footer {
    padding: 16px 20px;
  }
}
</style>
