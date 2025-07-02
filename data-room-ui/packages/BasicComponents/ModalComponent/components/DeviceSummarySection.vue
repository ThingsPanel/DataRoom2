<template>
  <div class="device-summary-section">
    <!-- 空状态 -->
    <div v-if="deviceSummary.isEmpty" class="empty-state">
      <svg class="empty-icon" viewBox="0 0 24 24" fill="none">
        <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z" stroke="currentColor" stroke-width="2"/>
        <path d="M8 12h8M8 8h8M8 16h4" stroke="currentColor" stroke-width="2"/>
      </svg>
      <div class="empty-text">无设备数据</div>
    </div>
    
    <!-- 错误状态 -->
    <div v-else-if="deviceSummary.isError" class="error-state">
      <svg class="error-icon" viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2"/>
      </svg>
      <div class="error-text">{{ deviceSummary.errorMessage || '加载失败' }}</div>
    </div>
    
    <!-- 正常状态 - 极简数据展示 -->
    <div v-else class="summary-layout">
      <!-- 设备状态 -->
      <div class="data-item">
        <svg class="data-icon" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <circle cx="12" cy="12" r="3" fill="currentColor"/>
        </svg>
        <div class="data-content">
          <div class="data-label">状态</div>
          <div class="data-value" :class="getStatusClass(deviceInfo.status)">
            {{ deviceInfo.status || '未知' }}
          </div>
        </div>
      </div>
      
      <!-- 开机率 -->
      <div class="data-item">
        <svg class="data-icon" viewBox="0 0 24 24" fill="none">
          <path d="M8 5v14l11-7z" fill="currentColor"/>
        </svg>
        <div class="data-content">
          <div class="data-label">开机率</div>
          <div class="data-value">
            {{ formatPercentage(deviceSummary.startup_rate) }}
          </div>
        </div>
      </div>
      
      <!-- 今日产量 -->
      <div class="data-item">
        <svg class="data-icon" viewBox="0 0 24 24" fill="none">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
        </svg>
        <div class="data-content">
          <div class="data-label">产量</div>
          <div class="data-value">
            {{ formatNumber(deviceInfo.today_production) }}
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
    },
    
    // 处理图片加载错误
    handleImageError(event) {
      event.target.style.display = 'none'
      const placeholder = event.target.nextElementSibling
      if (placeholder && placeholder.classList.contains('image-placeholder')) {
        placeholder.style.display = 'flex'
      }
    }
  }
}
</script>

<style scoped>
/* 主容器 - 带线框无背景 */
.device-summary-section {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 16px;
}

/* 布局容器 - 水平排列 */
.summary-layout {
  display: flex;
  gap: 20px;
  align-items: center;
}

/* 数据项 - 极简设计 */
.data-item {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

/* SVG图标样式 */
.data-icon {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.7);
  flex-shrink: 0;
}

/* 数据内容 */
.data-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* 数据标签 */
.data-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 数据值 */
.data-value {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.2;
}
/* 状态样式 */
.status-running {
  color: #22c55e;
}

.status-stopped {
  color: #ef4444;
}

.status-error {
  color: #dc2626;
}

.status-maintenance {
  color: #fbbf24;
}

.status-unknown {
  color: #9ca3af;
}

/* 空状态样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.empty-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 12px;
  opacity: 0.6;
}

.empty-text {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
}

/* 错误状态样式 */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: rgba(239, 68, 68, 0.8);
}

.error-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 12px;
  opacity: 0.8;
}

.error-text {
  font-size: 14px;
  font-weight: 500;
  color: #ef4444;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .summary-layout {
    flex-direction: column;
    gap: 16px;
  }
  
  .device-summary-section {
    padding: 12px;
  }
  
  .data-icon {
    width: 18px;
    height: 18px;
  }
  
  .data-value {
    font-size: 13px;
  }
  
  .data-label {
    font-size: 10px;
  }
}
</style>