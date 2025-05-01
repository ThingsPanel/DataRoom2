# VChart图表进度清单

## 已实现图表
- [x] V基础柱状图
- [x] V基础折线图
- [x] V基础面积图
- [x] V基础散点图
- [x] V气泡散点图
- [x] V基础饼图
- [x] V环形图
- [x] V基础雷达图
- [x] V基础漏斗图

## 待实现图表（根据visactor.io/vchart示例）

### 基础图表类
- [ ] 散点图 (Scatter Plot)
  - [x] 基础散点图 (Basic Scatter Chart)
  - [x] 气泡散点图 (Bubble Scatter Chart)
  - [ ] 抖动散点图 (Jitter Scatter Plot)
  - [ ] 一维散点图 (One-Dimensional Scatter Chart)
  - [ ] 堆叠散点图 (Stacked Scatter Plot)
  - [ ] 不同形状散点图 (Scatter Chart of different shape)

- [ ] 饼图 (Pie Chart)
  - [x] 基础饼图 (Basic Pie Chart)
  - [ ] 嵌套饼图 (Nested Pie Chart)
  - [ ] 带指示卡片的饼图 (Pie Chart with Indicator Card)
  - [x] 环形图 (Ring Chart)
  - [ ] 渐变色饼图 (Linear Gradient Color Pie Chart)

- [ ] 雷达图 (Radar Chart)
  - [x] 基础雷达图 (Basic Radar Chart)
  - [ ] 分组雷达图 (Grouped Radar Chart)
  - [ ] 空心雷达图 (Hollow Radar Chart)
  - [ ] 百分比堆叠雷达图 (Percentage Stacked Radar Chart)
  - [ ] 堆叠雷达图 (Stacked Radar Chart)

- [ ] 漏斗图 (Funnel Chart)
  - [x] 基础漏斗图 (Basic Funnel Chart)
  - [ ] 自定义漏斗图 (Custom Funnel Chart)
  - [ ] 矩形转化漏斗图 (Rectangular Conversion Funnel Chart)
  - [ ] 转化漏斗图 (Conversion Funnel Chart)

- [ ] 直方图 (Histogram Chart)
  - 基础直方图 (Basic Histogram)
  - 不同范围直方图 (Histogram with Different Bin Ranges)
  - 堆叠直方图 (Stacked Histogram)
  - 水平堆叠直方图 (Horizontal Stacked Histogram)

- [ ] 玫瑰图 (Rose Chart)
  - 基础玫瑰图 (Basic Rose Chart)
  - 分组玫瑰图 (Grouped Rose Chart)
  - 堆叠玫瑰图 (Stacked Rose Chart)
  - 分组堆叠玫瑰图 (Grouped Stacked Rose Chart)

- [ ] 瀑布图 (Waterfall Chart)
  - 基础瀑布图 (Basic Waterfall Chart)
  - 分解瀑布图 (Decomposition Waterfall Chart)
  - 水平瀑布图 (Horizontal Waterfall Chart)
  - 堆叠瀑布图 (Stacked Waterfall Chart)

- [ ] 范围柱图 (Range Column Chart)
  - 范围条形图 (Range Bar Chart)
  - 范围柱状图 (Range Column Chart)

### 高级图表类
- [ ] 桑基图 (Sankey Chart)
- [ ] 序列图 (Sequence Chart)
- [ ] 词云图 (Word Cloud)
- [ ] 仪表盘 (Gauge Chart)
- [ ] 进度图 (Progress Chart)
- [ ] 热力图 (Heatmap)
- [ ] 矩形树图 (Treemap)
- [ ] 环形打包图 (Circle Packing)
- [ ] 旭日图 (Sunburst Chart)
- [ ] 相关性图 (Correlation Chart)
- [ ] 组合图表 (Combination Chart)
- [ ] 水波图 (Liquid Chart)
- [ ] 韦恩图 (Venn Chart)
- [ ] 马赛克图 (Mosaic Chart)
- [ ] 象形图 (Pictogram Chart)
- [ ] 透视图 (Pivot Chart)
- [ ] 日历图 (Calendar Chart)
- [ ] 甘特图 (Gantt Chart)
- [ ] 地图 (Map)
- [ ] 3D图表 (3D Chart)

## 图表组件
- [ ] 标题 (Title)
- [ ] 坐标轴 (Axis)
- [ ] 提示框 (Tooltip)
- [ ] 图例 (Legend)
- [ ] 十字准线 (Crosshair)
- [ ] 数据缩放 (Data Zoom)
- [ ] 滚动条 (Scrollbar)
- [ ] 播放器 (Player)
- [ ] 刷选 (Brush)
- [ ] 标记 (Marker)
- [ ] 数据 (Data)
- [ ] 标签 (Label)
- [ ] 布局 (Layout)
- [ ] 渐变 (Gradient)
- [ ] 主题 (Theme)
- [ ] 自定义标记 (Custom Mark)
- [ ] 纹理 (Pattern)
- [ ] 交互 (Interaction)
- [ ] 动画和讲述 (Animation & Storytelling)

## 开发备注
1. 当前已完成3个基础图表的实现
2. 图表实现优先级遵循vchartListSort.js中的顺序
3. 每个图表实现需包含：
   - JS配置文件（在基础图表目录中）
   - 对应的预览图（在images目录中）
   - 在vchartListSort.js中添加排序信息

## 添加新图表流程
1. 在"基础图表"目录下创建新的图表配置文件（如"V基础饼图.js"）
2. 在images目录下添加对应的预览图片
3. 在vchartListSort.js中添加图表名称到数组中
4. 确保图表配置遵循现有图表的格式和结构 