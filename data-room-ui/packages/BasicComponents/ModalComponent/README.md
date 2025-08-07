# 设备监控弹窗组件 (ModalComponent)

## 概述

设备监控弹窗组件是一个用于显示设备详细信息、汇总统计、产量曲线和实时遥测数据的模态对话框组件。该组件支持可配置的API接口，并提供完善的错误处理和空状态显示。

## 文件结构

```
ModalComponent/
├── api.js                          # 设备监控API接口定义
├── index.vue                       # 主组件入口
├── setting.vue                     # 组件配置面板
├── README.md                       # 说明文档
└── components/
    ├── DeviceMonitorModal.vue       # 设备监控弹窗主体
    ├── DeviceInfoSection.vue        # 设备信息展示区域
    ├── DeviceSummarySection.vue     # 设备汇总统计区域
    ├── ProductionChartSection.vue   # 产量曲线图区域
    └── TelemetryDataSection.vue     # 实时遥测数据区域
```

## API 配置

### 基础配置

在组件设置面板中，可以配置以下参数：

- **API基础URL**: 设备监控API的基础地址，默认为 `http://47.92.253.145:9102`
- **弹窗标题**: 自定义弹窗标题
- **弹窗宽度**: 设置弹窗宽度（像素或百分比）

### API 接口说明

`api.js` 文件提供了以下接口：

#### 1. 设备汇总统计
```javascript
api.getDeviceSummary(deviceId)
```
- **接口路径**: `/api/device/summary`
- **请求方法**: GET
- **参数**: `device_id` - 设备ID
- **返回**: 设备汇总统计数据

#### 2. 设备详细信息
```javascript
api.getDeviceInfo(deviceId)
```
- **接口路径**: `/api/device/info`
- **请求方法**: GET
- **参数**: `device_id` - 设备ID
- **返回**: 设备详细信息

#### 3. 产量曲线数据
```javascript
api.getProductionCurve(deviceId, days)
```
- **接口路径**: `/api/device/production-curve`
- **请求方法**: GET
- **参数**: 
  - `device_id` - 设备ID
  - `days` - 天数（7, 30, 90）
- **返回**: 产量曲线数据

#### 4. 实时遥测数据
```javascript
api.getCurrentTelemetry(deviceId)
```
- **接口路径**: `/api/device/telemetry/current`
- **请求方法**: GET
- **参数**: `device_id` - 设备ID
- **返回**: 实时遥测数据

#### 5. 告警历史记录
```javascript
api.getAlarmHistory(deviceId, limit)
```
- **接口路径**: `/api/device/alarms/history`
- **请求方法**: GET
- **参数**: 
  - `device_id` - 设备ID
  - `limit` - 记录数量限制
- **返回**: 告警历史记录

## 使用方法

### 1. 基本使用

```vue
<template>
  <ModalComponent
    :config="modalConfig"
    :selectedRowData="selectedDevice"
    :visible="showModal"
    @close="handleClose"
  />
</template>

<script>
import ModalComponent from '@/packages/BasicComponents/ModalComponent'

export default {
  components: {
    ModalComponent
  },
  data() {
    return {
      showModal: false,
      selectedDevice: null,
      modalConfig: {
        customize: {
          apiBaseUrl: 'http://47.92.253.145:9102',
          dialogTitle: '设备监控详情',
          dialogWidth: '80%'
        }
      }
    }
  },
  methods: {
    handleClose() {
      this.showModal = false
    }
  }
}
</script>
```

### 2. 设备ID 识别

组件会自动从 `selectedRowData` 中识别设备ID，支持以下字段：
- `deviceId`
- `device_id`
- `id`
- `equipmentId`
- `equipment_id`

### 3. 错误处理

组件提供了完善的错误处理机制：

#### 空状态处理
- 当设备ID不存在时，显示友好的空状态提示
- 每个子组件都有独立的空状态显示

#### 错误状态处理
- 当API调用失败时，显示具体的错误信息
- 统一的错误处理机制，提供用户友好的错误提示

#### 网络错误处理
- 自动识别网络连接问题
- 提供重试机制和用户友好的错误提示

## 自定义配置

### 修改API基础URL

可以通过以下方式修改API基础URL：

1. **组件配置面板**: 在设计器中直接修改
2. **代码配置**: 通过 `config.customize.apiBaseUrl` 属性
3. **环境变量**: 在不同环境中使用不同的配置

### 自定义样式

每个子组件都提供了完整的CSS类名，可以通过覆盖样式来自定义外观：

```css
/* 自定义弹窗样式 */
.device-monitor-modal {
  /* 自定义样式 */
}

/* 自定义设备信息区域样式 */
.device-info-section {
  /* 自定义样式 */
}
```

## 开发指南

### 添加新的API接口

1. 在 `api.js` 文件中添加新的接口方法
2. 在相应的组件中调用新接口
3. 添加错误处理和降级方案

### 添加新的数据展示区域

1. 创建新的子组件
2. 在 `DeviceMonitorModal.vue` 中引入并使用
3. 添加相应的数据加载方法
4. 实现空状态和错误状态处理

### 性能优化建议

1. **数据缓存**: 对于不经常变化的数据，可以添加缓存机制
2. **懒加载**: 只在弹窗打开时才加载数据
3. **防抖处理**: 对于频繁的API调用添加防抖处理
4. **虚拟滚动**: 对于大量数据的列表使用虚拟滚动

## 故障排除

### 常见问题

1. **API调用失败**
   - 检查API基础URL是否正确
   - 确认网络连接是否正常
   - 查看浏览器控制台的错误信息

2. **设备ID无法识别**
   - 确认 `selectedRowData` 中包含有效的设备ID字段
   - 检查字段名是否符合支持的格式

3. **数据显示异常**
   - 检查API返回的数据格式是否符合预期
   - 确认数据转换逻辑是否正确

### 调试技巧

1. 开启浏览器开发者工具的网络面板，查看API请求和响应
2. 在组件中添加 `console.log` 输出关键数据
3. 使用Vue开发者工具查看组件状态

## 更新日志

### v1.0.0
- 初始版本发布
- 支持设备信息、汇总统计、产量曲线和遥测数据展示
- 提供完善的错误处理和空状态显示
- 支持可配置的API基础URL