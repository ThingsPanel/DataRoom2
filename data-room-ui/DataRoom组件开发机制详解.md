# DataRoom 组件开发机制详解

基于对 `DataRoom2` 项目源码的深入研究，本文档详细说明了该项目的组件开发机制，包括组件架构、开发流程、注册机制和最佳实践。

## 1. 项目架构概述

### 1.1 核心目录结构

```
packages/
├── BasicComponents/         # 基础组件库
│   ├── Button/             # 按钮组件
│   ├── Input/              # 输入框组件
│   ├── Tables/             # 表格组件
│   └── ...                 # 其他基础组件
├── BigScreenDesign/        # 大屏设计器
├── BigScreenRun/           # 大屏运行时
├── js/
│   ├── config/             # 配置文件
│   │   ├── basicComponentsConfig.js  # 基础组件配置
│   │   └── ...
│   ├── mixins/             # 混入
│   ├── utils/              # 工具函数
│   │   ├── getComponentConfig.js     # 组件配置工具
│   │   └── configImport.js           # 配置导入工具
│   └── store/              # 状态管理
└── assets/                 # 静态资源
```

### 1.2 组件分类体系

```javascript
// 基础组件分类
const typeList = [
  // 1. 基础文本类
  'texts', 'numbers', 'currentTime', 'marquee', 'digitalFlop',
  
  // 2. 输入控件类
  'input', 'button', 'select', 'switchBtn', 'timePicker',
  
  // 3. 装饰边框类
  'horizontalLine', 'verticalLine', 'rectangle', 'svgLine',
  
  // 4. 媒体展示类
  'picture', 'video', 'iframeChart', 'customHtml',
  
  // 5. 数据展示类
  'tables', 'screenScrollBoard', 'screenScrollRanking',
  
  // 6. 指标卡片类
  'indicatorCard', 'indexCard', 'multiMetricCard',
  
  // 7. 图表类
  'candlestick', 'sankey',
  
  // 8. 地图类
  'map', 'flyMap'
]
```

## 2. 组件开发机制详解

### 2.1 组件文件结构

每个基础组件必须包含以下文件：

```
ComponentName/
├── index.vue          # 组件主文件（必需）
├── setting.vue        # 配置面板UI（必需）
├── settingConfig.js   # 配置定义（必需）
└── icons/             # 图标资源（可选）
    └── *.svg
```

### 2.2 组件主文件 (index.vue)

#### 基本结构

```vue
<template>
  <div class="component-wrapper" :style="wrapperStyle">
    <!-- 组件内容 -->
  </div>
</template>

<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'

export default {
  name: 'ComponentName',  // 必须使用PascalCase
  mixins: [commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    wrapperStyle() {
      return {
        width: `${this.config.w || 200}px`,
        height: `${this.config.h || 100}px`
      }
    }
  },
  mounted() {
    this.chartInit()  // 来自 commonMixins
  }
}
</script>
```

### 2.3 配置定义文件 (settingConfig.js)

```javascript
import { commonConfig, displayOption } from 'data-room-ui/js/config'

export const settingConfig = {
  title: '组件显示名称',
  displayOption: {
    ...displayOption,
    dataAllocation: { enable: true },
    dataSourceType: { enable: false }
  }
}

const customConfig = {
  type: 'componentType',
  title: '默认标题',
  root: {
    version: '2023071001',
    rotateX: 0, rotateY: 0, rotateZ: 0,
    perspective: 0, skewX: 0, skewY: 0
  },
  customize: {
    // 组件特有的配置项
    backgroundColor: '#ffffff',
    fontSize: 14,
    color: '#333333'
  }
}

export const dataConfig = {
  ...commonConfig(customConfig)
}
```

### 2.4 配置面板 (setting.vue)

```vue
<template>
  <div class="bs-setting-wrap">
    <el-form :model="config" label-width="100px" class="setting-body bs-el-form">
      <SettingTitle>基础设置</SettingTitle>
      <div class="lc-field-body">
        <el-form-item label="标题">
          <el-input v-model="config.title" class="bs-el-input" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import SettingTitle from 'data-room-ui/SettingTitle'
import ColorPicker from 'data-room-ui/ColorPicker'

export default {
  name: 'ComponentNameSetting',
  components: { SettingTitle, ColorPicker },
  props: {
    config: { type: Object, required: true }
  }
}
</script>
```

## 3. 组件注册机制

### 3.1 在 getComponentConfig.js 中定义组件

```javascript
// packages/js/utils/getComponentConfig.js
export default function getComponentConfig (type) {
  switch (type) {
    case 'customComponent':  // 你的组件类型
      return {
        name: '弹窗列表组件',
        title: '弹窗列表组件',
        icon: Icon.getNameList()[0],
        className: 'com.gccloud.dataroom.core.module.chart.components.CustomComponentChart',
        w: 400, h: 300, x: 0, y: 0, type
      }
  }
}
```

### 3.2 在 basicComponentsConfig.js 中注册

```javascript
const typeList = [
  // ... 现有组件
  'customComponent'  // 添加新组件类型
]
```

### 3.3 自动配置导入机制

系统使用 `configImport.js` 自动导入组件配置：

```javascript
// 自动扫描并导入所有组件的配置
importComponentSettingConfig(require.context('data-room-ui/BasicComponents', true, /\.js$/))
```

## 4. 数据绑定机制详解

### 4.1 数据绑定架构

DataRoom 提供了一套完整的数据绑定机制，让组件能够连接后端数据集并实时更新数据。以下是基于 Numbers 组件的深度分析。

#### 4.1.1 核心文件和配置

**1. 通用数据源配置 (`commonConfig.js`)**
```javascript
export default function (customConfig) {
  return {
    dataSource: {
      className: 'com.gccloud.dataroom.core.module.chart.components.datasource.DataSetDataSource',
      dataSourceKey: '',      // 数据源，选择不同数据库
      businessKey: '',        // 数据集标识（ID）
      metricField: '',        // 指标字段名
      dimensionField: '',     // 维度字段名  
      dimensionFieldList: [], // 维度字段列表
      metricFieldList: [],    // 指标字段列表
      seriesField: '',        // 分类字段
      serverPagination: false, // 服务端分页
      pageSize: 10,
      params: {},             // 参数配置
      dataSetType: '',        // 数据集类型
      source: 'dataset'       // 数据来源（dataset/expression/static）
    }
  }
}
```

**2. 显示选项配置 (`displayOption`)**
```javascript
export const displayOption = {
  metricField: {
    label: '指标',
    enable: true,          // 是否启用指标选择
    multiple: true         // 是否支持多选
  },
  dimensionField: {
    label: '维度',
    enable: true,          // 是否启用维度选择  
    multiple: true
  },
  dataAllocation: {
    enable: true           // 是否启用数据配置
  },
  dataSourceType: {
    enable: true           // 是否启用数据源类型选择
  }
}
```

#### 4.1.2 数据获取流程

**1. 初始化阶段** (`commonMixins.js`)
```javascript
mounted() {
  this.chartInit()  // 初始化组件
}

methods: {
  chartInit() {
    // 预览模式直接获取数据
    if (this.isPreview) {
      config = this.changeDataByCode(config)
    } else {
      // 编辑模式使用防抖版本
      config = this.debouncedChangeData(config) 
    }
  }
}
```

**2. 数据请求** (`changeDataByCode`)
```javascript
changeDataByCode(config) {
  return getChatInfo({
    chartCode: config.code,      // 组件唯一标识
    pageCode: this.pageCode,     // 页面标识
    current: currentPage,        // 当前页
    size: size,                  // 页面大小
    type: config.type            // 组件类型
  }).then(res => {
    // 更新数据集到 Vuex
    this.updateDataset({ 
      code: config.code, 
      title: config.title, 
      data: res.data 
    })
    
    // 格式化数据
    config = this.dataFormatting(config, res)
    return config
  })
}
```

**3. 数据格式化** (组件自定义)
```javascript
// Numbers组件示例
dataFormatting(config, data) {
  // 检查是否绑定了数据集
  if (config.dataSource.businessKey && config.dataSource.source === 'dataset') {
    // 提取指标字段的值更新显示
    config.customize.title = data && data.data && data.data.length 
      ? data.data[0][config.dataSource.metricField]  // 取第一行指标字段值
      : '暂无数据'
    config.option.data = data && data.data && data.data.length ? data.data : []
  }
  return config
}
```

#### 4.1.3 右侧配置面板 (`DataSetting.vue`)

```vue
<!-- 数据来源选择 -->
<el-form-item label="数据来源">
  <el-select v-model="config.dataSource.source">
    <el-option value="dataset" label="数据集" />
    <el-option value="expression" label="表达式" />
    <el-option value="static" label="静态值" />
  </el-select>
</el-form-item>

<!-- 数据集选择 -->
<el-form-item v-if="config.dataSource.source === 'dataset'" label="数据集">
  <el-select v-model="config.dataSource.businessKey">
    <!-- 数据集选项从后端动态获取 -->
  </el-select>
</el-form-item>

<!-- 指标字段选择 -->
<el-form-item 
  v-if="config.option.displayOption.metricField?.enable"
  label="指标"
>
  <el-select v-model="config.dataSource.metricField">
    <el-option 
      v-for="field in dataSourceDataList" 
      :value="field.name"
      :label="field.comment"
    />
  </el-select>
</el-form-item>
```

#### 4.1.4 实现数据绑定的完整步骤

**步骤1：在 `settingConfig.js` 中启用数据配置**
```javascript
export const settingConfig = {
  displayOption: {
    ...displayOption,
    metricField: {
      label: '指标',
      enable: true,         // 启用指标选择
      multiple: false       // 单选模式
    },
    dataAllocation: { 
      enable: true         // 启用数据配置面板
    },
    dataSourceType: { 
      enable: true         // 启用数据源类型选择
    }
  }
}
```

**步骤2：在组件中引入 mixins**
```javascript
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'

export default {
  mixins: [commonMixins, linkageMixins],
  mounted() {
    this.chartInit()  // 来自 commonMixins
  }
}
```

**步骤3：实现 `dataFormatting` 方法**
```javascript
methods: {
  dataFormatting(config, data) {
    // 检查数据源配置
    if (config.dataSource.businessKey && config.dataSource.source === 'dataset') {
      // 根据业务逻辑处理数据
      if (data && data.data && data.data.length) {
        // 示例：更新组件显示内容
        config.customize.content = data.data[0][config.dataSource.metricField]
        config.option.data = data.data
      } else {
        config.customize.content = '暂无数据'
      }
    }
    return config
  }
}
```

**步骤4：监听数据变化 (由 commonMixins 自动提供)**
```javascript
watch: {
  // 数据集变化时自动重新获取数据
  'config.dataSource.businessKey'(val) {
    if (val) {
      this.chartInit()
    }
  }
}
```

#### 4.1.5 完整数据流程图

```
用户操作 → 配置更新 → 数据请求 → 数据处理 → 界面更新
   ↓           ↓           ↓           ↓           ↓
选择数据集 → businessKey → getChatInfo → dataFormatting → 组件重渲染
选择字段   → metricField → 后端数据     → 提取字段值    → 显示新数据
```

#### 4.1.6 Numbers 组件数据绑定实战解析

**配置启用数据绑定** (`Numbers/settingConfig.js`):
```javascript
export const settingConfig = {
  displayOption: {
    ...displayOption,
    metricField: {
      label: '指标',
      enable: true,          // 启用指标选择
      multiple: false        // 数字组件只需要单个指标
    },
    dimensionField: {
      enable: false          // 数字组件不需要维度
    }
  }
}
```

**数据处理逻辑** (`Numbers/index.vue`):
```javascript
dataFormatting(config, data) {
  // 文本数据配置原则：选择数据集则以后端返回的数据为主
  if (config.dataSource.businessKey && config.dataSource.source === 'dataset') {
    config.customize.title = data && data.data && data.data.length 
      ? data.data[0][config.dataSource.metricField]  // 👈 关键：提取指标字段值
      : '暂无数据'
    config.option.data = data && data.data && data.data.length ? data.data : []
  }
  return config
}
```

#### 4.1.7 不同组件类型的数据绑定模式

**文本/数字类组件**：
- 单指标字段，取第一行数据
- 适用于：Numbers, Texts, CurrentTime 等

**表格类组件**：
- 多字段配置，显示全部数据
- 支持分页和筛选
- 适用于：Tables, ScreenScrollBoard 等

**图表类组件**：
- 维度 + 指标配置
- 支持系列字段分组
- 适用于：Echarts 图表组件

## 5. 组件示例：弹窗列表组件

### 5.1 创建组件目录结构

```bash
mkdir packages/BasicComponents/ModalComponent
cd packages/BasicComponents/ModalComponent
```

### 5.2 index.vue - 组件主文件

```vue
<template>
  <div class="custom-component-wrapper" :style="wrapperStyle">
    <el-button 
      @click="dialogVisible = true"
      :type="config.customize.buttonType"
      :style="buttonStyle"
    >
      {{ config.customize.buttonText }}
    </el-button>
    
    <el-dialog
      :title="config.customize.dialogTitle"
      :visible.sync="dialogVisible"
      :width="config.customize.dialogWidth + '%'"
    >
      <el-table 
        :data="tableData" 
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" v-if="config.customize.showSelection"></el-table-column>
        <el-table-column 
          v-for="column in config.customize.columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
        ></el-table-column>
      </el-table>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'

export default {
  name: 'CustomComponent',
  mixins: [commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogVisible: false,
      selectedRows: []
    }
  },
  computed: {
    wrapperStyle() {
      return {
        width: `${this.config.w || 400}px`,
        height: `${this.config.h || 300}px`
      }
    },
    buttonStyle() {
      return {
        backgroundColor: this.config.customize.buttonColor,
        borderColor: this.config.customize.buttonColor
      }
    },
    tableData() {
      return this.config.data || []
    }
  },
  mounted() {
    this.chartInit()
  },
  methods: {
    handleSelectionChange(selection) {
      this.selectedRows = selection
    },
    handleConfirm() {
      // 触发联动
      this.linkage({
        [this.config.code]: this.selectedRows
      })
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-component-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

### 5.3 settingConfig.js - 配置定义

```javascript
import { commonConfig, displayOption } from 'data-room-ui/js/config'

export const settingConfig = {
  title: '弹窗列表组件',
  displayOption: {
    ...displayOption,
    dataAllocation: { enable: true },
    dataSourceType: { enable: true }
  }
}

const customConfig = {
  type: 'customComponent',
  title: '弹窗列表',
  root: {
    version: '2023071001',
    rotateX: 0, rotateY: 0, rotateZ: 0,
    perspective: 0, skewX: 0, skewY: 0
  },
  customize: {
    buttonText: '打开列表',
    buttonType: 'primary',
    buttonColor: '#409EFF',
    dialogTitle: '数据列表',
    dialogWidth: 60,
    showSelection: true,
    columns: [
      { prop: 'name', label: '姓名', width: 120 },
      { prop: 'age', label: '年龄', width: 80 },
      { prop: 'address', label: '地址', width: 200 }
    ]
  }
}

export const dataConfig = {
  ...commonConfig(customConfig)
}
```

### 5.4 setting.vue - 配置面板

```vue
<template>
  <div class="bs-setting-wrap">
    <el-form :model="config" label-width="100px" class="setting-body bs-el-form">
      <SettingTitle>位置</SettingTitle>
      <div class="lc-field-body">
        <PosWhSetting :config="config" />
      </div>
      
      <SettingTitle>按钮设置</SettingTitle>
      <div class="lc-field-body">
        <el-form-item label="按钮文字">
          <el-input v-model="config.customize.buttonText" class="bs-el-input" />
        </el-form-item>
        
        <el-form-item label="按钮类型">
          <el-select v-model="config.customize.buttonType" class="bs-el-select">
            <el-option label="默认" value="default"></el-option>
            <el-option label="主要" value="primary"></el-option>
            <el-option label="成功" value="success"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="按钮颜色">
          <ColorPicker v-model="config.customize.buttonColor" />
        </el-form-item>
      </div>
      
      <SettingTitle>弹窗设置</SettingTitle>
      <div class="lc-field-body">
        <el-form-item label="弹窗标题">
          <el-input v-model="config.customize.dialogTitle" class="bs-el-input" />
        </el-form-item>
        
        <el-form-item label="弹窗宽度(%)">
          <el-input-number 
            v-model="config.customize.dialogWidth" 
            class="bs-el-input-number"
            :min="30" :max="90" 
          />
        </el-form-item>
        
        <el-form-item label="显示选择框">
          <el-switch v-model="config.customize.showSelection" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import ColorPicker from 'data-room-ui/ColorPicker'
import SettingTitle from 'data-room-ui/SettingTitle'
import PosWhSetting from 'data-room-ui/BigScreenDesign/RightSetting/PosWhSetting'

export default {
  name: 'CustomComponentSetting',
  components: { ColorPicker, SettingTitle, PosWhSetting },
  props: {
    config: { type: Object, required: true }
  }
}
</script>

<style lang="scss" scoped>
.lc-field-body {
  width: 97%;
  padding: 12px 16px;
}
</style>
```

### 5.5 注册组件

在 `packages/js/utils/getComponentConfig.js` 中添加：

```javascript
case 'customComponent':
  return {
    name: '弹窗列表',
    title: '弹窗列表',
    icon: Icon.getNameList()[0],
    className: 'com.gccloud.dataroom.core.module.chart.components.CustomComponentChart',
    w: 200, h: 60, x: 0, y: 0, type
  }
```

在 `packages/js/config/basicComponentsConfig.js` 中添加：

```javascript
const typeList = [
  // ... 现有组件
  'customComponent'
]
```

## 6. 开发步骤总结

1. **创建组件目录和文件**
2. **实现组件主要功能** (index.vue)
3. **定义组件配置** (settingConfig.js)
4. **创建配置面板** (setting.vue)
5. **注册组件** (getComponentConfig.js 和 basicComponentsConfig.js)
6. **测试组件功能**

## 7. 核心概念解释

### 7.1 组件配置对象 (config)

```javascript
{
  code: 'unique-id',           // 唯一标识
  type: 'customComponent',     // 组件类型
  title: '组件标题',
  w: 400, h: 300,             // 尺寸
  x: 0, y: 0,                 // 位置
  customize: {                // 自定义配置
    // 组件特有属性
  },
  data: [],                   // 组件数据
  dataSource: {               // 数据源配置
    // 数据源相关配置
  }
}
```

### 7.2 Mixins 说明

- **commonMixins**: 通用功能混入
  - `chartInit()`: 组件初始化
  - `changeChartConfig()`: 更新组件配置
  - `changeActiveItemConfig()`: 更新当前选中组件配置

- **linkageMixins**: 数据联动混入
  - `linkage()`: 触发联动事件
  - 数据绑定和传递机制

### 7.3 后端类名 (className)

每个组件都需要指定对应的后端Java类名，用于后端数据处理：

```javascript
className: 'com.gccloud.dataroom.core.module.chart.components.CustomComponentChart'
```

## 7. 最佳实践

1. **命名规范**
   - 组件名: PascalCase (`CustomComponent`)
   - 类型: camelCase (`customComponent`)
   - CSS类: kebab-case (`custom-component`)

2. **性能优化**
   - 合理使用 `v-if` 和 `v-show`
   - 组件销毁时清理资源
   - 避免不必要的深度监听

3. **用户体验**
   - 提供合理的默认值
   - 添加适当的错误处理
   - 支持主题切换

## 8. 常见问题

1. **组件不显示**: 检查是否正确注册和配置
2. **配置面板不显示**: 检查 setting.vue 的实现
3. **数据联动不工作**: 检查 linkageMixins 的使用
4. **样式问题**: 检查 CSS 作用域和命名冲突

通过这个详细的指南，你现在应该能够理解并实现 DataRoom 项目的组件开发机制了。 