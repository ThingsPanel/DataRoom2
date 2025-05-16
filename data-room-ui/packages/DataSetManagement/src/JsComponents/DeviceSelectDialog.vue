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

      <!-- 修改表格部分，添加 row-style 属性 -->
      <div class="bs-table-box" :style="tableBoxStyle">
        <el-table
          ref="deviceTable"
          class="bs-el-table"
          v-loading="loading"
          :data="deviceList"
          :height="deviceList.length > 10 ? 350 : null"
          stripe
          cell-style="color: var(--bs-el-text);"
          @row-click="handleRowClick"
          @current-change="handleSelectDevice"
          border
        >
          <el-table-column type="index" width="50" align="center"  />
          <el-table-column prop="device_number" label="设备编号" width="180" show-overflow-tooltip />
          <el-table-column prop="name" label="设备名称" width="180" show-overflow-tooltip />
          <el-table-column prop="protocol_type" label="协议类型" width="100" show-overflow-tooltip />
          <el-table-column prop="current_version" label="固件版本" width="100" show-overflow-tooltip />
          <el-table-column prop="ts" label="上报时间" width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ formatTimestamp(scope.row.ts) }}</span>
            </template>
          </el-table-column>
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
import { color } from 'echarts'
import { getDeviceList } from '../../../js/utils/iotApiService'
import { Message } from 'element-ui'

export default {
  name: 'DeviceSelectDialog',
  data () {
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
      },
      // 添加表格容器样式
      tableBoxStyle: {
        border: '1px solid var(--bs-border-color)',
        borderRadius: '4px',
        margin: '20px 0',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)'
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
    formatTimestamp(timestamp) {
      if (!timestamp) return '未上报';

      try {
        // 处理不同格式的时间戳
        let date;
        if (typeof timestamp === 'number') {
          // 处理毫秒时间戳
          date = new Date(timestamp);
        } else if (typeof timestamp === 'string') {
          // 尝试解析字符串时间戳
          if (/^\d+$/.test(timestamp)) {
            date = new Date(parseInt(timestamp));
          } else {
            date = new Date(timestamp);
          }
        } else {
          return '未上报';
        }

        // 检查日期是否有效
        if (isNaN(date.getTime())) {
          return '未上报';
        }

        // 格式化日期
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      } catch (error) {
        return '未上报';
      }
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
              is_online: device.is_online || device.isOnline,
              ts: device.ts || device.lastActivityTime || device.lastReportTime
            }
          }) : []

          this.pagination.total = deviceData.total || this.deviceList.length

          // 如果有预选设备，找到并选中它
          if (this.selectedDevice) {
            const selectedIndex = this.deviceList.findIndex(device =>
              device.id === this.selectedDevice.id ||
              device.device_number === this.selectedDevice.device_number
            )

            if (selectedIndex >= 0) {
              this.$nextTick(() => {
                this.$refs.deviceTable.setCurrentRow(this.deviceList[selectedIndex])
              })
            }
          }

          if (this.deviceList.length === 0) {
            Message.info('未找到匹配的设备数据')
          }
        }
      } catch (error) {
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
    },
    rowClassName({row}) {
      // 为当前选中的行添加高亮样式
      if (this.selectedDevice && row.id === this.selectedDevice.id) {
        return 'selected-row'
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.device-select-dialog {
  :deep(.el-dialog) {
    background-color: var(--bs-background-1);
    border: 1px solid var(--bs-border-color);
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .el-dialog__header {
      background-color: var(--bs-background-2);
      padding: 12px 16px;
      border-bottom: 1px solid var(--bs-border-color);
      border-radius: 4px 4px 0 0;
      margin: 0;

      .el-dialog__title {
        color: var(--bs-el-text);
        font-size: 16px;
        font-weight: 500;
      }

      .el-dialog__headerbtn {
        top: 12px;
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
      padding: 16px;
      background-color: var(--bs-background-1);
      color: var(--bs-el-text);
    }

    .el-dialog__footer {
      background-color: var(--bs-background-2);
      padding: 12px 16px;
      border-top: 1px solid var(--bs-border-color);
      border-radius: 0 0 4px 4px;
    }
  }
}
.device-dialog-content {
  .filter-container {
    padding: 0 24px 24px 24px;
    .bs-el-input {
      .el-input__inner {
        background-color: var(--bs-background-1);
        border: 1px solid var(--bs-border-color);
        color: var(--bs-el-text);
        height: 32px;
        line-height: 32px;
        border-radius: 2px;

        &:focus {
          border-color: var(--bs-el-color-primary);
        }
      }

      .el-input-group__append {
        background-color: var(--bs-background-2);
        border: 1px solid var(--bs-border-color);
        border-left: none;
        padding: 0 10px;
        border-radius: 0 2px 2px 0;

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
      border: 1px solid var(--bs-border-color);
      background-color: var(--bs-background-1);
      color: var(--bs-el-text);
      border-radius: 2px;

      &:hover {
        color: var(--bs-el-color-primary);
        border-color: var(--bs-el-color-primary);
      }

      &:active {
        background-color: var(--bs-background-2);
      }
    }
  }

  .bs-table-box {
    border: 1px solid var(--bs-border-color);
    border-radius: 2px;
    margin-bottom: 12px;
    overflow: hidden;

    .bs-el-table {
      :deep(.el-table) {
        border: none;

        &::before {
          display: none;
        }

        th {
          background-color: var(--bs-background-2);
          color: var(--bs-el-text);
          font-weight: 500;
          padding: 8px;
          border-bottom: 1px solid var(--bs-border-color);
        }

        td {
          padding: 8px;
          border-bottom: 1px solid var(--bs-border-color);
          color: var(--bs-el-text);
        }

        .el-table__row {
          background-color: var(--bs-background-1);

          &:hover > td {
            background-color: var(--bs-background-2);
          }

          &.current-row > td {
            background-color: rgba(var(--bs-el-color-primary-rgb), 0.1);
            color: var(--bs-el-color-primary);
          }

          &.selected-row > td {
            background-color: rgba(var(--bs-el-color-primary-rgb), 0.1);
            color: var(--bs-el-color-primary);
          }

          &:last-child td {
            border-bottom: none;
          }
        }
      }
    }
  }

  .bs-pagination {
    padding: 8px 0;
    display: flex;
    justify-content: flex-end;

    :deep(.el-pagination) {
      .btn-prev,
      .btn-next,
      .el-pager li {
        background-color: var(--bs-background-1);
        border: 1px solid var(--bs-border-color);
        color: var(--bs-el-text);
        margin: 0 2px;
        min-width: 28px;
        height: 28px;
        line-height: 28px;

        &:hover {
          color: var(--bs-el-color-primary);
          border-color: var(--bs-el-color-primary);
        }

        &.active {
          background-color: var(--bs-el-color-primary);
          color: #fff;
          border-color: var(--bs-el-color-primary);
        }
      }

      .el-pagination__total,
      .el-pagination__sizes {
        color: var(--bs-el-text);
        height: 28px;
        line-height: 28px;
      }

      .el-pagination__sizes .el-input .el-input__inner {
        height: 28px;
        line-height: 28px;
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
    border-radius: 2px;

    &.el-tag--success {
      background-color: rgba(var(--bs-success-rgb), 0.1);
      color: var(--bs-success);
    }

    &.el-tag--info {
      background-color: rgba(var(--bs-info-rgb), 0.1);
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
    background-color: var(--bs-background-1);
    border: 1px solid var(--bs-border-color);
    color: var(--bs-el-text);
    height: 32px;
    line-height: 32px;
    border-radius: 2px;

    &:focus {
      border-color: var(--bs-el-color-primary);
    }
  }

  .el-select-dropdown {
    background-color: var(--bs-background-1);
    border: 1px solid var(--bs-border-color);
    border-radius: 2px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .el-select-dropdown__item {
      color: var(--bs-el-text);
      height: 32px;
      line-height: 32px;

      &:hover {
        background-color: var(--bs-background-2);
      }

      &.selected {
        color: var(--bs-el-color-primary);
        font-weight: 500;
        background-color: rgba(var(--bs-el-color-primary-rgb), 0.1);
      }
    }
  }
}

// 添加新的样式
// 修改全局表格样式部分
:deep(.el-table) {
  --even-row-bg: var(--bs-background-1);
  --odd-row-bg: var(--bs-background-2);
  --hover-bg: rgba(var(--bs-el-color-primary-rgb), 0.05);
  --selected-bg: rgba(var(--bs-el-color-primary-rgb), 0.15);
  --text-color: rgba(255, 255, 255, 0.85);

  .el-table__header-wrapper th {
    background-color: var(--bs-background-3) !important;
    color: rgba(255, 255, 255, 0.9) !important;
    font-weight: 600 !important;
    padding: 12px 8px !important;
    border-bottom: 1px solid var(--bs-border-color) !important;
  }

  .el-table__row {
    transition: all 0.25s ease !important;

    &.even-row td {
      background-color: var(--even-row-bg) !important;
      color: var(--text-color) !important;
    }

    &.odd-row td {
      background-color: var(--odd-row-bg) !important;
      color: var(--text-color) !important;
    }

    &:hover td {
      background-color: var(--hover-bg) !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
    }

    &.current-row td,
    &.selected-row td {
      background-color: var(--selected-bg) !important;
      color: var(--bs-el-color-primary) !important;
      font-weight: 500 !important;
    }
  }

  .el-table__body-wrapper td {
    padding: 12px 8px !important;
    border-bottom: 1px solid var(--bs-border-color) !important;
    color: var(--text-color) !important;
    font-size: 14px !important;
  }
}

// 增强状态指示器样式
.device-status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  .el-tag {
    border: none;
    padding: 3px 8px;
    border-radius: 3px;
    font-weight: 500;

    &.el-tag--success {
      background-color: rgba(var(--bs-success-rgb), 0.15);
      color: var(--bs-success);
    }

    &.el-tag--info {
      background-color: rgba(var(--bs-info-rgb), 0.15);
      color: var(--bs-info);
    }
  }
}

.device-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;

  &.online {
    background-color: var(--bs-success);
    box-shadow: 0 0 4px var(--bs-success);
  }

  &.offline {
    background-color: var(--bs-info);
    box-shadow: 0 0 4px var(--bs-info);
  }
}
</style>