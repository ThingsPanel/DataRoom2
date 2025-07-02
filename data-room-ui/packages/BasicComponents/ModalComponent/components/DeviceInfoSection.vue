<template>
  <div class="device-info-section">
    <div class="section-header">
      <h4>设备信息</h4>
    </div>
    <div class="device-info-content">
      <!-- 空状态 -->
      <div v-if="deviceInfo.isEmpty" class="empty-state">
        <div class="empty-icon">📭</div>
        <div class="empty-text">未找到设备ID，无法加载设备信息</div>
        <div class="empty-hint">请确保表格数据中包含设备ID字段</div>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="deviceInfo.isError" class="error-state">
        <div class="error-icon">⚠️</div>
        <div class="error-text">加载设备信息失败</div>
        <div class="error-message">{{ deviceInfo.errorMessage }}</div>
      </div>
      
      <!-- 正常状态 -->
      <div v-else class="info-grid">
        <div 
          v-for="(column, index) in displayColumns" 
          :key="index"
          class="info-item"
        >
          <span class="info-label">{{ column.title }}:</span>
          <span class="info-value">{{ getDisplayValue(column) }}</span>
        </div>
        
        <!-- 额外的设备信息 -->
        <div v-if="deviceInfo.device_id" class="info-item">
          <span class="info-label">设备ID:</span>
          <span class="info-value">{{ deviceInfo.device_id }}</span>
        </div>
        
        <div v-if="deviceInfo.device_number" class="info-item">
          <span class="info-label">设备编号:</span>
          <span class="info-value">{{ deviceInfo.device_number }}</span>
        </div>
        
        <div v-if="deviceInfo.device_name" class="info-item">
          <span class="info-label">设备名称:</span>
          <span class="info-value">{{ deviceInfo.device_name }}</span>
        </div>
        
        <div v-if="deviceInfo.status" class="info-item">
          <span class="info-label">运行状态:</span>
          <span class="info-value status" :class="getStatusClass(deviceInfo.status)">
            {{ deviceInfo.status }}
          </span>
        </div>
        
        <div v-if="deviceInfo.label" class="info-item">
          <span class="info-label">归属:</span>
          <span class="info-value">{{ deviceInfo.label }}</span>
        </div>
        
        <div v-if="deviceInfo.today_production" class="info-item">
          <span class="info-label">今日产量:</span>
          <span class="info-value">{{ deviceInfo.today_production }}</span>
        </div>
        
        <div v-if="deviceInfo.total_runtime" class="info-item">
          <span class="info-label">累计运行时间:</span>
          <span class="info-value">{{ deviceInfo.total_runtime }}</span>
        </div>
        
        <div v-if="deviceInfo.description" class="info-item">
          <span class="info-label">设备描述:</span>
          <span class="info-value">{{ deviceInfo.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 设备信息展示组件
 * 负责显示设备的基本信息和状态
 */
export default {
  name: 'DeviceInfoSection',
  props: {
    // 设备数据（来自表格行）
    deviceData: {
      type: Object,
      default: () => ({})
    },
    // 表格列配置
    tableColumns: {
      type: Array,
      default: () => []
    },
    // 设备详细信息
    deviceInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // 需要显示的列（排除操作列等）
    displayColumns() {
      return this.tableColumns.filter(column => {
        // 排除操作列、序号列等
        const excludeTypes = ['action', 'index', 'selection']
        return !excludeTypes.includes(column.type) && 
               column.prop && 
               column.title
      }).slice(0, 6) // 最多显示6个字段
    }
  },
  methods: {
    // 获取显示值
    getDisplayValue(column) {
      const value = this.deviceData[column.prop]
      
      if (value === null || value === undefined || value === '') {
        return '-'
      }
      
      // 根据列类型格式化值
      if (column.type === 'date' || column.prop.includes('date') || column.prop.includes('time')) {
        return this.formatDate(value)
      }
      
      if (typeof value === 'number') {
        // 如果是数字，保留2位小数
        return Number(value).toLocaleString()
      }
      
      return String(value)
    },
    
    // 格式化日期
    formatDate(value) {
      if (!value) return '-'
      
      try {
        const date = new Date(value)
        if (isNaN(date.getTime())) {
          return String(value)
        }
        
        return date.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      } catch (error) {
        return String(value)
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
.device-info-section {
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
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  border-radius: 2px;
}

.device-info-content {
  padding: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
}

.info-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.info-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 14px;
  color: #ffffff;
  font-weight: 600;
  word-break: break-all;
}

/* 空状态样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #6b7280;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-text {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #374151;
}

.empty-hint {
  font-size: 14px;
  color: #9ca3af;
}

/* 错误状态样式 */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #dc2626;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.8;
}

.error-text {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #dc2626;
}

.error-message {
  font-size: 14px;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

/* 状态样式 */
.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .device-info-content {
    padding: 16px;
  }
  
  .section-header {
    padding: 12px 16px;
  }
  
  .info-item {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .info-grid {
    gap: 8px;
  }
  
  .info-item {
    padding: 8px;
  }
  
  .info-label {
    font-size: 11px;
  }
  
  .info-value {
    font-size: 13px;
  }
}
</style>