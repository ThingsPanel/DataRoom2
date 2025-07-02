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

    <!-- 正常状态 - 左右布局 -->
    <div v-else class="summary-layout">
      <!-- 左侧数据区域 -->
      <div class="data-section">
        <!-- 设备状态 -->
        <div class="data-item">
          <svg class="data-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
          <div class="data-content">
            <span class="data-label">状态</span>
            <span class="data-value" :class="getStatusClass(deviceInfo.status)">
              {{ deviceInfo.status || '未知' }}
            </span>
          </div>
        </div>

        <!-- 开机率 -->
        <div class="data-item">
          <svg class="data-icon" viewBox="0 0 24 24" fill="none">
            <path d="M8 5v14l11-7z" fill="currentColor"/>
          </svg>
          <div class="data-content">
            <span class="data-label">开机率</span>
            <span class="data-value">
              {{ formatPercentage(deviceSummary.startup_rate) }}
            </span>
          </div>
        </div>

        <!-- 今日产量 -->
        <div class="data-item">
          <svg class="data-icon" viewBox="0 0 24 24" fill="none">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
          </svg>
          <div class="data-content">
            <span class="data-label">产量</span>
            <span class="data-value">
              {{ formatNumber(deviceInfo.today_production) }}
            </span>
          </div>
        </div>
      </div>

      <!-- 右侧图片区域 -->
      <div class="image-section">
        <div class="device-image-container">
          <img
            v-if="deviceInfo.image_url"
            :src="deviceInfo.image_url"
            :alt="deviceInfo.name || '设备图片'"
            class="device-image"
            @error="handleImageError"
          />
          <div v-else class="image-placeholder">
            <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
              <path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span class="placeholder-text">暂无图片</span>
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
      if (value === null || value === undefined) {
        return '-'
      }

      const num = Number(value)
      if (isNaN(num)) {
        return '-'
      }

      if (num <= 1) {
        // 如果是小数形式（0-1），转换为百分比
        return `${(num * 100).toFixed(1)}%`
      } else {
        // 如果已经是百分比形式
        return `${num.toFixed(1)}%`
      }
    },

    // 格式化数字
    formatNumber(value) {
      if (value === null || value === undefined) {
        return '-'
      }

      const num = Number(value)
      if (isNaN(num)) {
        return '-'
      }

      return num.toLocaleString()
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
      // 隐藏失败的图片，显示占位符
      event.target.style.display = 'none'
      const container = event.target.parentElement
      if (container) {
        const placeholder = container.querySelector('.image-placeholder')
        if (placeholder) {
          placeholder.style.display = 'flex'
        }
      }
    }
  }
}
</script>

<style scoped>
/* 主容器 - 带线框无背景，撑满高度 */
.device-summary-section {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 布局容器 - 左右分栏，撑满剩余高度 */
.summary-layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  flex: 1;
}

/* 左侧数据区域 - 居中对齐 */
.data-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* 数据项 - 居中对齐，增大间距 */
.data-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 12px 0;
  width: 100%;
  max-width: 300px;
}

/* SVG图标样式 - 增大尺寸 */
.data-icon {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.7);
  flex-shrink: 0;
}

/* 数据内容 - 水平排列，居中对齐 */
.data-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex: 1;
}

/* 数据标签 - 增大字体 */
.data-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  min-width: 60px;
  text-align: center;
}

/* 数据值 - 显著增大字体 */
.data-value {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
  text-align: center;
}

/* 右侧图片区域 - 增大宽度，撑满高度 */
.image-section {
  width: 280px;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1; /* 撑满剩余高度 */
}

/* 设备图片容器 - 撑满高度 */
.device-image-container {
  width: 100%;
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  display: flex;
  align-items: stretch;
  position: relative;
}

/* 设备图片 */
.device-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.device-image:hover {
  transform: scale(1.05);
}

/* 图片占位符 */
.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
  gap: 6px;
}

.placeholder-icon {
  width: 24px;
  height: 24px;
  opacity: 0.6;
}

.placeholder-text {
  font-size: 11px;
  font-weight: 400;
  opacity: 0.8;
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

/* 空状态样式 - 撑满高度 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  flex: 1;
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

/* 错误状态样式 - 撑满高度 */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: rgba(239, 68, 68, 0.8);
  flex: 1;
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
    gap: 24px;
  }

  .device-summary-section {
    padding: 24px;
    min-height: 160px;
  }

  .data-section {
    gap: 24px;
  }

  .data-item {
    padding: 6px 0;
  }

  .data-icon {
    width: 14px;
    height: 14px;
  }

  .data-value {
    font-size: 14px;
  }

  .data-label {
    font-size: 11px;
    min-width: 45px;
  }

  .image-section {
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
  }

  .device-image-container {
    height: 200px;
  }

  .empty-state,
  .error-state {
    padding: 50px 20px;
    min-height: 160px;
  }
}
</style>
