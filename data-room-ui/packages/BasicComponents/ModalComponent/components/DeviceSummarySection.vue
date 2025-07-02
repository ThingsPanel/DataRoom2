<template>
  <div class="device-summary-section">
    <div class="section-header">
      <h4>设备汇总统计</h4>
    </div>
    <div class="summary-content">
      <!-- 空状态 -->
      <div v-if="deviceSummary.isEmpty" class="empty-state">
        <div class="empty-icon">📊</div>
        <div class="empty-text">无法加载设备汇总统计</div>
        <div class="empty-hint">请检查设备ID是否正确</div>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="deviceSummary.isError" class="error-state">
        <div class="error-icon">⚠️</div>
        <div class="error-text">加载汇总统计失败</div>
        <div class="error-message">{{ deviceSummary.errorMessage }}</div>
      </div>
      
      <!-- 正常状态 -->
      <div v-else class="summary-grid">
        <!-- 设备总数 -->
        <div class="summary-card">
          <div class="card-icon total-icon">
            <i class="icon-total"></i>
          </div>
          <div class="card-content">
            <div class="card-label">设备总数</div>
            <div class="card-value">
              {{ formatNumber(deviceSummary.total_devices) }}
              <span class="unit">台</span>
            </div>
          </div>
        </div>
        
        <!-- 在线设备 -->
        <div class="summary-card">
          <div class="card-icon online-icon">
            <i class="icon-online"></i>
          </div>
          <div class="card-content">
            <div class="card-label">在线设备</div>
            <div class="card-value">
              {{ formatNumber(deviceSummary.online_devices) }}
              <span class="unit">台</span>
            </div>
          </div>
        </div>
        
        <!-- 运行设备 -->
        <div class="summary-card">
          <div class="card-icon running-icon">
            <i class="icon-running"></i>
          </div>
          <div class="card-content">
            <div class="card-label">运行设备</div>
            <div class="card-value">
              {{ formatNumber(deviceSummary.running_devices) }}
              <span class="unit">台</span>
            </div>
          </div>
        </div>
        
        <!-- 开机率 -->
        <div class="summary-card">
          <div class="card-icon startup-icon">
            <i class="icon-startup"></i>
          </div>
          <div class="card-content">
            <div class="card-label">开机率</div>
            <div class="card-value">
              {{ formatPercentage(deviceSummary.startup_rate) }}
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill startup-progress" 
                :style="{ width: getPercentageWidth(deviceSummary.startup_rate) }"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- 利用率 -->
        <div class="summary-card">
          <div class="card-icon utilization-icon">
            <i class="icon-utilization"></i>
          </div>
          <div class="card-content">
            <div class="card-label">利用率</div>
            <div class="card-value">
              {{ formatPercentage(deviceSummary.utilization_rate) }}
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill utilization-progress" 
                :style="{ width: getPercentageWidth(deviceSummary.utilization_rate) }"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- 离线设备 -->
        <div class="summary-card">
          <div class="card-icon offline-icon">
            <i class="icon-offline"></i>
          </div>
          <div class="card-content">
            <div class="card-label">离线设备</div>
            <div class="card-value">
              {{ formatNumber(deviceSummary.offline_devices) }}
              <span class="unit">台</span>
            </div>
          </div>
        </div>
        
        <!-- 运行效率 -->
        <div class="summary-card">
          <div class="card-icon efficiency-icon">
            <i class="icon-efficiency"></i>
          </div>
          <div class="card-content">
            <div class="card-label">运行效率</div>
            <div class="card-value">
              {{ formatPercentage(deviceSummary.efficiency) }}
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill efficiency-progress" 
                :style="{ width: getPercentageWidth(deviceSummary.efficiency) }"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- 累计运行时间 -->
        <div class="summary-card" v-if="deviceInfo.total_runtime">
          <div class="card-icon runtime-icon">
            <i class="icon-runtime"></i>
          </div>
          <div class="card-content">
            <div class="card-label">累计运行</div>
            <div class="card-value">
              {{ formatRuntime(deviceInfo.total_runtime) }}
            </div>
          </div>
        </div>
        
        <!-- 故障次数 -->
        <div class="summary-card" v-if="deviceInfo.fault_count !== undefined">
          <div class="card-icon fault-icon">
            <i class="icon-fault"></i>
          </div>
          <div class="card-content">
            <div class="card-label">故障次数</div>
            <div class="card-value fault-count">
              {{ deviceInfo.fault_count || 0 }}
              <span class="unit">次</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 设备汇总统计组件
 * 负责显示设备的运行统计数据和关键指标
 */
export default {
  name: 'DeviceSummarySection',
  props: {
    // 设备汇总统计数据
    deviceSummary: {
      type: Object,
      default: () => ({})
    },
    // 设备详细信息
    deviceInfo: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    // 格式化百分比
    formatPercentage(value) {
      if (value === null || value === undefined || isNaN(value)) {
        return '-'
      }
      
      const percentage = Number(value)
      if (percentage <= 1) {
        // 如果是小数形式（0-1），转换为百分比
        return `${(percentage * 100).toFixed(1)}%`
      } else {
        // 如果已经是百分比形式
        return `${percentage.toFixed(1)}%`
      }
    },
    
    // 格式化数字
    formatNumber(value) {
      if (value === null || value === undefined || isNaN(value)) {
        return '-'
      }
      
      return Number(value).toLocaleString()
    },
    
    // 获取百分比宽度（用于进度条）
    getPercentageWidth(value) {
      if (value === null || value === undefined || isNaN(value)) {
        return '0%'
      }
      
      const percentage = Number(value)
      if (percentage <= 1) {
        return `${(percentage * 100)}%`
      } else {
        return `${Math.min(percentage, 100)}%`
      }
    },
    
    // 格式化运行时间
    formatRuntime(hours) {
      if (!hours || isNaN(hours)) {
        return '-'
      }
      
      const totalHours = Number(hours)
      const days = Math.floor(totalHours / 24)
      const remainingHours = Math.floor(totalHours % 24)
      
      if (days > 0) {
        return `${days}天${remainingHours}小时`
      } else {
        return `${remainingHours}小时`
      }
    },
    
    // 获取状态样式类
    getStatusClass(status) {
      const statusMap = {
        '运行中': 'status-running',
        '正常': 'status-running',
        '在线': 'status-running',
        '停机': 'status-stopped',
        '离线': 'status-stopped',
        '故障': 'status-error',
        '异常': 'status-error',
        '维护中': 'status-maintenance',
        '维护': 'status-maintenance'
      }
      
      return statusMap[status] || 'status-unknown'
    }
  }
}
</script>

<style scoped>
.device-summary-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.section-header {
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 2px;
}

.summary-content {
  padding: 20px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.summary-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.summary-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.summary-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.summary-card:hover::before {
  transform: translateX(100%);
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.status-icon {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.startup-icon {
  background: linear-gradient(135deg, #10b981, #059669);
}

.production-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.efficiency-icon {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.runtime-icon {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
}

.fault-icon {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.card-icon i {
  width: 20px;
  height: 20px;
  background: #ffffff;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}

.icon-status {
  mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>');
}

.icon-startup {
  mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>');
}

.icon-production {
  mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>');
}

.icon-efficiency {
  mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>');
}

.icon-runtime {
  mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>');
}

.icon-fault {
  mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>');
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-value {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
}

.unit {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  margin-left: 4px;
}

.fault-count {
  color: #ef4444;
}

/* 状态样式 */
.status {
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-running {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.status-stopped {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.status-error {
  background: rgba(220, 38, 38, 0.2);
  color: #dc2626;
  border: 1px solid rgba(220, 38, 38, 0.3);
}

.status-maintenance {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.status-unknown {
  background: rgba(156, 163, 175, 0.2);
  color: #9ca3af;
  border: 1px solid rgba(156, 163, 175, 0.3);
}

/* 进度条 */
.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 8px;
}

.progress-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.6s ease;
  position: relative;
}

.startup-progress {
  background: linear-gradient(90deg, #10b981, #059669);
}

.efficiency-progress {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

.utilization-progress {
  background: linear-gradient(90deg, #3b82f6, #2563eb);
}

/* 空状态样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
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
  padding: 60px 20px;
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

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .summary-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }
  
  .summary-content {
    padding: 16px;
  }
  
  .section-header {
    padding: 12px 16px;
  }
  
  .summary-card {
    padding: 12px;
  }
  
  .card-icon {
    width: 32px;
    height: 32px;
  }
  
  .card-value {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .summary-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .summary-card {
    padding: 10px;
    gap: 8px;
  }
  
  .card-icon {
    width: 28px;
    height: 28px;
  }
  
  .card-value {
    font-size: 14px;
  }
  
  .card-label {
    font-size: 11px;
  }
}
</style>