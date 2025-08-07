<template>
  <div class="device-info-section">
    <!-- 紧凑的设备信息展示 -->
    <div class="device-info-compact">
      <!-- 设备编号和状态 -->
      <div class="info-item device-number-row">
        <span class="info-label">设备编号</span>
        <span class="info-value device-number">{{ deviceInfo.device_number || deviceData.device_number || '-' }}</span>
        <span class="status-indicator" :class="getStatusClass(deviceInfo.status || deviceData.status)">
          {{ deviceInfo.status || deviceData.status || '-' }}
        </span>
      </div>
      

      
      <!-- 归属 -->
      <div class="info-item medium">
        <span class="info-label">归属</span>
        <span class="info-value">{{ deviceInfo.label || deviceData.label || '-' }}</span>
      </div>
      
      <!-- 累积运行时间 -->
      <div class="info-item medium">
        <span class="info-label">累积运行时间</span>
        <span class="info-value">{{ deviceInfo.total_runtime || deviceData.total_runtime || '-' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 设备信息展示组件 - 紧凑版
 * 负责显示设备的基本信息和状态，采用紧凑布局减少高度占用
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
  methods: {
    // 获取状态样式类
    getStatusClass(status) {
      if (!status) return 'status-unknown'
      
      const statusMap = {
        '运行中': 'status-running',
        '正常': 'status-running',
        '在线': 'status-running',
        '运行': 'status-running',
        '停机': 'status-stopped',
        '离线': 'status-stopped',
        '停止': 'status-stopped',
        '故障': 'status-error',
        '异常': 'status-error',
        '错误': 'status-error',
        '维护中': 'status-maintenance',
        '维护': 'status-maintenance',
        '保养': 'status-maintenance'
      }
      
      return statusMap[status] || 'status-unknown'
    },


  }
}
</script>

<style scoped>
/* 紧凑的设备信息组件样式 */
.device-info-section {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(0, 153, 204, 0.05));
  border-radius: 8px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  padding: 8px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.device-info-section:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 212, 255, 0.12);
}

.device-info-compact {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  min-height: 28px;
  white-space: nowrap;
}

.info-item:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(0, 212, 255, 0.3);
}

/* 根据内容长度调整宽度 */
.info-item.short {
  flex: 0 0 auto;
  min-width: 100px;
}

.info-item.medium {
  flex: 0 0 auto;
  min-width: 140px;
}

.info-item.long {
  flex: 1;
  min-width: 200px;
}

.info-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  white-space: nowrap;
}

.info-value {
  font-size: 12px;
  color: #ffffff;
  font-weight: 600;
  margin-left: auto;
  text-align: right;
}

/* 设备编号行样式 */
.device-number-row {
  flex: 1;
  min-width: 300px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.device-number-row .info-label {
  flex-shrink: 0;
}

.device-number-row .device-number {
  flex: 1;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  margin-left: 0;
}



/* 状态指示器样式 - 移到设备编号右侧 */
.status-indicator {
  flex-shrink: 0;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  min-width: 50px;
  margin-left: auto;
}

.status-indicator.status-running {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.2));
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.4);
  box-shadow: 0 2px 4px rgba(34, 197, 94, 0.2);
}

.status-indicator.status-stopped {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.2));
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.4);
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
}

.status-indicator.status-error {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.3), rgba(220, 38, 38, 0.2));
  color: #dc2626;
  border: 1px solid rgba(220, 38, 38, 0.4);
  box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
}

.status-indicator.status-maintenance {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(251, 191, 36, 0.2));
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.4);
  box-shadow: 0 2px 4px rgba(251, 191, 36, 0.2);
}

.status-indicator.status-unknown {
  background: linear-gradient(135deg, rgba(156, 163, 175, 0.3), rgba(156, 163, 175, 0.2));
  color: #9ca3af;
  border: 1px solid rgba(156, 163, 175, 0.4);
  box-shadow: 0 2px 4px rgba(156, 163, 175, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .device-info-compact {
    flex-direction: column;
    gap: 4px;
  }
  
  .device-info-section {
    padding: 6px;
    margin-bottom: 8px;
  }
  
  .info-item {
    padding: 3px 6px;
    min-height: 24px;
    width: 100%;
  }
  
  .info-item.short,
  .info-item.medium,
  .info-item.long {
    flex: none;
    min-width: auto;
  }
  
  .info-label {
    font-size: 10px;
  }
  
  .info-value {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .device-info-compact {
    gap: 3px;
  }
  
  .info-item {
    padding: 2px 4px;
    min-height: 20px;
  }
  
  .info-label {
    font-size: 9px;
  }
  
  .info-value {
    font-size: 10px;
  }
  
  .status-indicator {
    padding: 1px 4px;
    font-size: 9px;
    min-width: 40px;
  }
  
  .device-number-row {
    min-width: auto;
    flex-wrap: wrap;
  }
}
</style>