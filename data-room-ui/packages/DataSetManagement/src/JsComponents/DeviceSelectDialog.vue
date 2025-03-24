<!-- 设备选择弹窗组件 -->
<template>
  <el-dialog
    title="选择设备"
    :visible.sync="visible"
    width="70%"
    append-to-body
    class="bs-el-dialog device-select-dialog"
    :close-on-click-modal="false"
  >
    <div class="device-dialog-content">
      <div class="filter-container">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-input
              v-model="deviceSearchKeyword"
              placeholder="请输入设备名称或编号搜索"
              class="bs-el-input"
              clearable
              @keyup.enter.native="handleDeviceSearch"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="handleDeviceSearch"
              />
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-select
              v-model="deviceOnlineFilter"
              placeholder="在线状态"
              class="bs-el-select"
              popper-class="bs-el-select"
              clearable
              @change="handleDeviceSearch"
            >
              <el-option label="在线" value="1">
                <div class="device-status-indicator">
                  <span>在线</span>
                  <i class="device-status-dot online" />
                </div>
              </el-option>
              <el-option label="离线" value="0">
                <div class="device-status-indicator">
                  <span>离线</span>
                  <i class="device-status-dot offline" />
                </div>
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button
              class="bs-el-button-default reset-button"
              @click="resetDeviceSearch"
            >
              重置
            </el-button>
          </el-col>
        </el-row>
      </div>

      <div class="bs-table-box">
        <el-table
          class="bs-el-table"
          v-loading="loading"
          :data="deviceList"
          height="350"
          highlight-current-row
          @row-click="handleRowClick"
          @current-change="handleSelectDevice"
          border
        >
          <el-table-column type="index" width="50" align="center" />
          <el-table-column prop="device_number" label="设备编号" width="220" show-overflow-tooltip />
          <el-table-column prop="name" label="设备名称" width="220" show-overflow-tooltip />
          <el-table-column prop="protocol_type" label="协议类型" width="100" show-overflow-tooltip />
          <el-table-column prop="current_version" label="固件版本" width="100" show-overflow-tooltip />
          <el-table-column prop="is_online" label="在线状态" width="80" align="center">
            <template slot-scope="scope">
              <div class="device-status-indicator">
                <el-tag :type="scope.row.is_online === '1' || scope.row.is_online === true || scope.row.is_online === 1 ? 'success' : 'info'" size="mini">
                  {{ scope.row.is_online === '1' || scope.row.is_online === true || scope.row.is_online === 1 ? '在线' : '离线' }}
                </el-tag>
                <i 
                  :class="[
                    'device-status-dot',
                    {'online': scope.row.is_online === '1' || scope.row.is_online === true || scope.row.is_online === 1,
                     'offline': scope.row.is_online !== '1' && scope.row.is_online !== true && scope.row.is_online !== 1}
                  ]"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      
      <div class="bs-pagination">
        <el-pagination
          class="bs-el-pagination"
          popper-class="bs-el-pagination"
          background
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page="pagination.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagination.page_size"
          :total="pagination.total"
          prev-text="上一页"
          next-text="下一页"
          layout="total, prev, pager, next, sizes"
        />
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel" class="bs-el-button-default">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getDeviceList } from '../../../js/utils/iotApiService'
import { Message } from 'element-ui'

export default {
  name: 'DeviceSelectDialog',
  data() {
    return {
      visible: false,
      loading: false,
      deviceSearchKeyword: '',
      deviceOnlineFilter: '',
      deviceList: [],
      selectedDevice: null,
      pagination: {
        page: 1,
        page_size: 10,
        total: 0
      }
    }
  },
  methods: {
    show(preSelectedDevice) {
      this.visible = true
      this.deviceSearchKeyword = ''
      this.pagination.page = 1
      
      if (preSelectedDevice) {
        this.selectedDevice = preSelectedDevice
      }
      
      this.fetchDeviceList()
    },
    close() {
      this.visible = false
    },
    handleCancel() {
      this.close()
    },
    async fetchDeviceList() {
      this.loading = true
      try {
        const params = {
          page: this.pagination.page,
          page_size: this.pagination.page_size
        }
        
        if (this.deviceSearchKeyword && this.deviceSearchKeyword.trim() !== '') {
          params.search = this.deviceSearchKeyword.trim()
        }
        
        if (this.deviceOnlineFilter !== '') {
          params.is_online = this.deviceOnlineFilter
        }
        
        const res = await getDeviceList(params)
        let deviceData = null
        
        if (res && res.data) {
          if (res.data.code === 0 || res.data.code === 200) {
            deviceData = res.data.data
          } else {
            deviceData = res.data
          }
        } else {
          deviceData = { list: res, total: res.length }
        }
        
        if (deviceData && deviceData.list) {
          this.deviceList = Array.isArray(deviceData.list) ? deviceData.list.map(device => {
            return {
              id: device.id || device.device_id,
              device_number: device.device_number || device.deviceNumber,
              name: device.name,
              protocol_type: device.protocol_type || device.protocolType,
              current_version: device.current_version || device.currentVersion,
              is_online: device.is_online || device.isOnline
            }
          }) : []
          
          this.pagination.total = deviceData.total || this.deviceList.length
          
          if (this.deviceList.length === 0) {
            Message.info('未找到匹配的设备数据')
          }
        }
      } catch (error) {
        console.error('获取设备列表失败:', error)
        Message.error('获取设备列表失败')
      } finally {
        this.loading = false
      }
    },
    handleDeviceSearch() {
      this.pagination.page = 1
      this.fetchDeviceList()
    },
    handlePageChange(page) {
      this.pagination.page = page
      this.fetchDeviceList()
    },
    handleSizeChange(size) {
      this.pagination.page_size = size
      this.pagination.page = 1
      this.fetchDeviceList()
    },
    handleSelectDevice(row) {
      this.selectedDevice = row
    },
    handleRowClick(row) {
      this.handleSelectDevice(row)
      this.$emit('select', {
        id: row.id,
        name: row.name || row.device_number,
        device_number: row.device_number
      })
      this.close()
    },
    resetDeviceSearch() {
      this.deviceSearchKeyword = ''
      this.deviceOnlineFilter = ''
      this.pagination.page = 1
      this.fetchDeviceList()
    }
  }
}
</script>

<style lang="scss" scoped>
.device-select-dialog {
  :deep(.el-dialog) {
    background-color: var(--bs-background-1);
    border: 1px solid var(--bs-border-color);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    .el-dialog__header {
      background-color: var(--bs-background-2);
      padding: 16px 20px;
      border-bottom: 1px solid var(--bs-border-color);
      border-radius: 8px 8px 0 0;
      margin: 0;
      
      .el-dialog__title {
        color: var(--bs-el-text);
        font-size: 16px;
        font-weight: 500;
      }
      
      .el-dialog__headerbtn {
        top: 16px;
        right: 16px;
        
        .el-dialog__close {
          color: var(--bs-el-text-secondary);
          
          &:hover {
            color: var(--bs-el-color-primary);
          }
        }
      }
    }
    
    .el-dialog__body {
      padding: 20px;
      background-color: var(--bs-background-1);
      color: var(--bs-el-text);
    }
    
    .el-dialog__footer {
      background-color: var(--bs-background-2);
      padding: 16px 20px;
      border-top: 1px solid var(--bs-border-color);
      border-radius: 0 0 8px 8px;
    }
  }
}

.device-dialog-content {
  .filter-container {
    margin-bottom: 16px;
    
    .bs-el-input {
      .el-input__inner {
        background-color: var(--bs-background-2);
        border-color: var(--bs-border-color);
        color: var(--bs-el-text);
        height: 32px;
        line-height: 32px;
        
        &:focus {
          border-color: var(--bs-el-color-primary);
        }
      }
      
      .el-input-group__append {
        background-color: var(--bs-background-3);
        border-color: var(--bs-border-color);
        padding: 0 12px;
        
        .el-button {
          padding: 7px 0;
          border: none;
          background: transparent;
          color: var(--bs-el-text);
          
          &:hover {
            color: var(--bs-el-color-primary);
          }
        }
      }
    }
    
    .reset-button {
      width: 100%;
      height: 32px;
      padding: 0;
      border-color: var(--bs-border-color);
      background-color: var(--bs-background-2);
      color: var(--bs-el-text);
      
      &:hover {
        background-color: var(--bs-background-3);
        border-color: var(--bs-el-color-primary);
        color: var(--bs-el-color-primary);
      }
    }
  }
  
  .bs-table-box {
    background-color: var(--bs-background-2);
    border-radius: 4px;
    padding: 1px;
    margin-bottom: 16px;
    
    .bs-el-table {
      background-color: transparent;
      
      :deep(.el-table) {
        background-color: transparent;
        
        &::before {
          display: none;
        }
        
        th, td {
          background-color: var(--bs-background-2);
          border-color: var(--bs-border-color);
          color: var(--bs-el-text);
          padding: 8px;
        }
        
        th {
          background-color: var(--bs-background-3);
          font-weight: 500;
        }
        
        .el-table__row {
          &:hover > td {
            background-color: var(--bs-background-3);
          }
          
          &.current-row > td {
            background-color: var(--bs-background-4);
          }
        }
      }
    }
  }
  
  .bs-pagination {
    background-color: var(--bs-background-2);
    border-radius: 4px;
    padding: 12px;
    display: flex;
    justify-content: flex-end;
    
    :deep(.el-pagination) {
      .btn-prev,
      .btn-next,
      .el-pager li {
        background-color: var(--bs-background-3);
        border-color: var(--bs-border-color);
        color: var(--bs-el-text);
        
        &:hover {
          color: var(--bs-el-color-primary);
        }
        
        &.active {
          background-color: var(--bs-el-color-primary);
          color: #fff;
        }
      }
      
      .el-pagination__total,
      .el-pagination__sizes {
        color: var(--bs-el-text);
      }
    }
  }
}

.device-status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  
  .el-tag {
    border: none;
    padding: 2px 6px;
    
    &.el-tag--success {
      background-color: var(--bs-success-light);
      color: var(--bs-success);
    }
    
    &.el-tag--info {
      background-color: var(--bs-info-light);
      color: var(--bs-info);
    }
  }
}

.device-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  
  &.online {
    background-color: var(--bs-success);
  }
  
  &.offline {
    background-color: var(--bs-info);
  }
}

:deep(.bs-el-select) {
  width: 100%;
  
  .el-input__inner {
    background-color: var(--bs-background-2);
    border-color: var(--bs-border-color);
    color: var(--bs-el-text);
    height: 32px;
    line-height: 32px;
    
    &:focus {
      border-color: var(--bs-el-color-primary);
    }
  }
  
  .el-select-dropdown {
    background-color: var(--bs-background-1);
    border: 1px solid var(--bs-border-color);
    
    .el-select-dropdown__item {
      color: var(--bs-el-text);
      
      &:hover,
      &.selected {
        background-color: var(--bs-background-3);
      }
      
      &.selected {
        color: var(--bs-el-color-primary);
      }
    }
  }
}
</style> 