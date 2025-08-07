# DataRoom 数据可视化大屏项目详细说明文档

## 项目概述

DataRoom 是一个基于 Vue.js 的数据可视化大屏设计和展示平台，支持拖拽式组件设计、多种图表渲染引擎、3D 可视化、数据源管理等功能。项目采用模块化架构，提供了丰富的可视化组件和灵活的配置系统。

### 核心特性

- **可视化设计器**: 支持拖拽式组件布局和配置
- **多图表引擎**: 集成 ECharts、G2Plot、VChart 等多种图表库
- **3D 可视化**: 基于 Three.js 的三维场景渲染
- **数据源管理**: 支持多种数据源类型和数据集配置
- **组件化架构**: 高度模块化的组件系统
- **主题系统**: 支持亮色/暗色主题切换
- **响应式布局**: 支持多种自适应模式

## 技术架构

### 前端技术栈

- **框架**: Vue.js 2.x
- **状态管理**: Vuex
- **UI 组件库**: Element UI
- **图表库**: 
  - ECharts (主要图表引擎)
  - G2Plot (AntV 图表库)
  - VChart (字节跳动图表库)
- **3D 渲染**: Three.js
- **构建工具**: Vue CLI / Webpack
- **样式预处理**: SCSS/Less
- **工具库**: Lodash

### 项目结构

```
packages/
├── BasicComponents/          # 基础组件库
├── BigScreenDesign/          # 大屏设计器
├── BigScreenManagement/      # 大屏管理
├── BigScreenRun/            # 大屏运行时
├── DataSourceManagement/    # 数据源管理
├── DataSetManagement/       # 数据集管理
├── Echarts/                 # ECharts 图表组件
├── G2Plots/                 # G2Plot 图表组件
├── Vcharts/                 # VChart 图表组件
├── ThreeComponents/         # Three.js 3D 组件
├── ThreeRender/             # 3D 渲染引擎
├── BorderComponents/        # 边框装饰组件
├── Decorations/             # 装饰组件
├── Render/                  # 渲染引擎
├── assets/                  # 静态资源
└── js/                      # 核心 JS 模块
```

## 核心模块详解

### 1. 基础组件系统 (BasicComponents)

基础组件是整个系统的核心构建块，包含了各种可视化元素：

#### 组件分类

**文本类组件**:
- `Texts`: 基础文本组件
- `Texts01`, `Texts10`: 特殊样式文本
- `Numbers`: 数字显示组件
- `DigitalFlop`: 数字翻牌器
- `CurrentTime`: 当前时间显示
- `Timestamp`: 时间戳组件

**图表类组件**:
- `Candlestick`: K线图
- `Sankey`: 桑基图
- `LinkChart`: 链接图表

**输入类组件**:
- `Input`: 输入框
- `Select`: 下拉选择
- `Button`: 按钮
- `DateTimePicker`: 日期时间选择器
- `TimePicker`: 时间选择器

**展示类组件**:
- `Picture`: 图片组件
- `Video`: 视频组件
- `IframeChart`: 内嵌页面
- `CustomHtml`: 自定义 HTML

**指标卡组件**:
- `IndexCard`, `IndexCard2`: 基础指标卡
- `IndicatorCard`, `IndicatorCard2`, `IndicatorCard5`: 指标展示卡
- `MultiMetricCard`: 多指标卡

**表格组件**:
- `Tables`: 数据表格
- `ScreenScrollBoard`: 滚动看板
- `ScreenScrollRanking`: 滚动排行榜

**地图组件**:
- `Map`: 地图组件
- `FlyMap`: 飞线地图

**线条组件**:
- `HorizontalLine`: 水平线
- `VerticalLine`: 垂直线
- `CanvasLine`: Canvas 线条
- `FabricLine`: Fabric 线条
- `SvgLine`: SVG 线条

**其他组件**:
- `Rectangle`: 矩形
- `Marquee`: 跑马灯
- `WeatherIcon`: 天气图标
- `SvgIcon`: SVG 图标
- `TimeCountDown`: 倒计时
- `ThemeSelect`: 主题选择
- `ThemeSwitcher`: 主题切换
- `SwitchBtn`: 开关按钮
- `ChartTab`: 图表标签页

#### 组件开发规范

每个基础组件遵循统一的开发规范：

**文件结构**:
```
MyComponent/
├── index.vue           # 组件渲染逻辑
├── setting.vue         # 配置面板 UI
├── settingConfig.js    # 配置定义和默认值
├── iconList.js         # (可选) 图标列表
└── icons/              # (可选) 本地 SVG 图标
```

**核心配置**:
- `title`: 组件显示名称
- `type`: 组件唯一标识符
- `defaultView`: 默认配置
- `customConfig`: 自定义配置项
- `displayOption`: 控制配置面板显示

### 2. 图表渲染引擎

#### ECharts 引擎 (Echarts)

ECharts 是项目的主要图表引擎，支持丰富的图表类型：

**图表分类**:
- 基础图表：柱状图、折线图、饼图、散点图
- 高级图表：雷达图、漏斗图、仪表盘、热力图
- 3D 图表：3D 柱状图、3D 饼图、3D 散点图
- 地理图表：地图、热力地图

**配置特点**:
- 动态配置加载
- 主题系统支持
- 数据处理脚本
- 配置处理脚本

#### G2Plot 引擎 (G2Plots)

G2Plot 提供了 AntV 生态的图表支持：

**支持图表**:
- 折线图、柱状图、条形图
- 面积图、饼图、雷达图
- 瀑布图、漏斗图、玉珏图
- 矩形树图、词云图、进度图

#### VChart 引擎 (Vcharts)

VChart 是字节跳动的图表库，提供现代化的图表解决方案：

**特色功能**:
- 丰富的主题系统
- 移动端优化
- 大屏专用主题
- 行业定制主题

**支持图表**:
- V柱状图、V折线图、V分组柱状图
- V水波图等

### 3. 3D 可视化系统

#### Three.js 组件 (ThreeComponents)

3D 组件系统基于 Three.js 构建，支持复杂的三维可视化场景：

**核心组件**:
- 桥梁监测：结构健康监测可视化
- 3D 模型加载：支持 GLTF 格式
- 数据点绑定：将数据映射到 3D 场景

**技术特点**:
- GLTF 模型加载
- 动态数据绑定
- 相机控制
- 光照系统
- 材质系统

#### 3D 渲染引擎 (ThreeRender)

提供统一的 3D 渲染接口：
- 场景管理
- 组件生命周期
- 数据更新机制
- 主题适配

### 4. 大屏设计器 (BigScreenDesign)

可视化设计器是项目的核心功能模块：

#### 核心功能

**布局设计**:
- 拖拽式组件布局
- 网格对齐
- 标尺工具
- 缩放控制

**组件管理**:
- 组件库面板
- 图层管理
- 多选操作
- 复制粘贴

**配置面板**:
- 实时配置更新
- 分类配置管理
- 数据源绑定
- 样式设置

**辅助工具**:
- 小地图导航
- 历史记录
- 快捷键支持
- 鼠标选择

#### 关键组件

- `LeftPanel`: 左侧组件面板
- `SettingPanel`: 右侧配置面板
- `PageDesignTop`: 顶部工具栏
- `Render`: 画布渲染器
- `MouseSelect`: 鼠标选择工具
- `RulerTool`: 标尺工具
- `LayerList`: 图层列表
- `HistoryList`: 历史记录

### 5. 数据管理系统

#### 数据源管理 (DataSourceManagement)

支持多种数据源类型：
- 数据库连接
- API 接口
- 静态数据
- 实时数据流

#### 数据集管理 (DataSetManagement)

提供数据集配置和管理：
- SQL 查询配置
- 参数化查询
- 数据转换
- 缓存策略

#### 地图数据管理 (MapDataManagement)

专门的地图数据管理：
- GeoJSON 数据
- 地图边界数据
- 自定义地图

### 6. 装饰组件系统

#### 边框组件 (BorderComponents)

提供多种边框装饰效果：
- 17 种不同样式的边框
- 动态效果支持
- 自适应尺寸

#### 装饰组件 (Decorations)

各种装饰性元素：
- 12 种装饰图案
- 动画效果
- 主题适配

### 7. 渲染系统 (Render)

统一的组件渲染引擎：
- 组件生命周期管理
- 数据绑定机制
- 事件处理
- 性能优化

### 8. 状态管理系统

#### Vuex Store 结构

**核心状态**:
```javascript
state: {
  pageInfo: {          // 大屏页面信息
    name: '',          // 页面名称
    code: '',          // 页面编码
    pageConfig: {      // 页面配置
      w: 1920,         // 宽度
      h: 1080,         // 高度
      bgColor: '',     // 背景色
      customTheme: '', // 主题
      fitMode: ''      // 自适应模式
    },
    chartList: []      // 组件列表
  },
  activeCode: null,    // 当前选中组件
  activeItemConfig: null, // 当前组件配置
  zoom: 100,          // 缩放比例
  hasGrid: false,     // 网格显示
  dataset: {},        // 数据集缓存
  pollingTimers: {}   // 轮询定时器
}
```

**核心 Mutations**:
- `changeChartConfig`: 更新组件配置
- `changeActiveItemConfig`: 更新选中组件配置
- `changeChartLoading`: 更新加载状态
- `addChart`: 添加组件
- `deleteChart`: 删除组件

**核心 Actions**:
- `changeData`: 更新组件数据
- `changeDataByCode`: 根据编码更新数据
- `savePageInfo`: 保存页面信息

## 配置系统详解

### 组件配置结构

每个组件的配置包含以下部分：

```javascript
{
  // 基础信息
  title: '组件名称',
  type: '组件类型',
  
  // 默认视图配置
  defaultView: {
    w: 400,              // 宽度
    h: 300,              // 高度
    x: 0,                // X 坐标
    y: 0,                // Y 坐标
    customConfig: {      // 自定义配置
      // 组件特有配置项
    }
  },
  
  // 显示选项
  displayOption: {
    dataSourceOption: { enable: true },  // 数据源配置
    eventOption: { enable: true },       // 事件配置
    advancedSetting: { enable: true }    // 高级设置
  }
}
```

### 主题系统

支持亮色和暗色两套主题：

**CSS 变量定义**:
```css
:root {
  --bs-el-color-primary: #409EFF;
  --bs-background-1: #151a26;
  --bs-background-2: #232832;
  --bs-el-background-1: #151A26;
  --bs-el-title: #ffffff;
  --bs-el-text: #ffffff;
}
```

### 路由配置

系统提供自动路由注册功能：

```javascript
const routes = [
  {
    path: '/management',
    component: 'BigScreenHomeLayout',
    children: [
      { path: '/big-screen-list', component: 'BigScreenMag' },
      { path: '/big-screen-dataSource', component: 'DataSourceManagement' },
      { path: '/big-screen-dataSet', component: 'DataSetManagement' }
    ]
  },
  { path: '/big-screen/design', component: 'BigScreenDesign' },
  { path: '/big-screen/preview', component: 'BigScreenRun' }
]
```

## 开发指南

### 环境要求

- Node.js >= 14.0
- Vue CLI >= 4.0
- 现代浏览器支持

### 开发流程

1. **组件开发**:
   - 创建组件目录结构
   - 实现渲染逻辑 (index.vue)
   - 配置面板 UI (setting.vue)
   - 配置定义 (settingConfig.js)
   - 注册到系统

2. **图表开发**:
   - 选择合适的图表引擎
   - 实现图表配置
   - 数据处理逻辑
   - 主题适配

3. **3D 组件开发**:
   - Three.js 场景构建
   - 模型加载逻辑
   - 数据绑定机制
   - 交互控制

### 最佳实践

1. **组件设计**:
   - 保持组件单一职责
   - 提供完整的配置选项
   - 支持主题切换
   - 响应式设计

2. **性能优化**:
   - 使用 Vue 的性能优化特性
   - 图表按需加载
   - 数据缓存策略
   - 避免不必要的重渲染

3. **代码规范**:
   - 遵循 Vue 官方风格指南
   - 使用 ESLint 和 Prettier
   - 组件和文件命名规范
   - 注释和文档完整

## 部署说明

### 构建配置

项目提供多种构建配置：

- `vue.config.example.js`: 示例配置
- `vue.config.package.js`: 包构建配置

### 环境配置

**生产环境配置** (`public/config/index-production.js`):
```javascript
window.ENV = 'production'
var productionConfig = {
  baseURL: 'http://47.115.210.16:9083/bigScreenServer',
  fileUrlPrefix: 'http://47.115.210.16:9083/bigScreenServer/static'
}
window.CONFIG = configDeepMerge(window.CONFIG, productionConfig)
```

### 静态资源

- 图标资源：`packages/assets/images/`
- 字体资源：`packages/BasicComponents/fonts/`
- 3D 模型：`public/static/libs/3d/`

## 扩展开发

### 添加新的图表引擎

1. 创建渲染组件
2. 实现配置系统
3. 注册到组件列表
4. 添加示例和文档

### 自定义主题

1. 定义 CSS 变量
2. 创建主题配置
3. 注册主题选项
4. 测试兼容性

### 集成第三方组件

1. 包装为标准组件格式
2. 实现配置接口
3. 添加到组件库
4. 提供使用文档

## 总结

DataRoom 是一个功能完整、架构清晰的数据可视化平台。其模块化的设计使得系统具有良好的可扩展性和可维护性。通过统一的组件开发规范和配置系统，开发者可以轻松地添加新功能和定制化需求。

项目的核心优势在于：
- 完整的可视化组件生态
- 多图表引擎支持
- 强大的 3D 可视化能力
- 灵活的配置系统
- 良好的开发体验

无论是用于企业级数据大屏展示，还是作为可视化开发平台的基础，DataRoom 都提供了坚实的技术基础和丰富的功能支持。
