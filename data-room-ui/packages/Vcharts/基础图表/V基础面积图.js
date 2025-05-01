// 配置版本号
const version = '2024050102' // 更新版本号
// 标题
const title = 'V基础面积图'
// 用于标识，唯一，和文件夹名称一致
const name = 'V基础面积图'
// 组件类型标识
const type = 'customComponent'
// 图表类型标识 (VChart type)
const chartType = 'area' // 类型改为 area
// 右侧配置项 (基于折线图调整)
const setting = [
  // 数据配置
  {
    label: 'X轴字段',
    type: 'select',
    field: 'xField',
    optionField: 'xField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  {
    label: 'Y轴字段',
    type: 'select',
    field: 'yField',
    optionField: 'yField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  // 标题配置
  {
    label: '显示标题',
    type: 'switch',
    field: 'titleVisible',
    optionField: 'title.visible',
    value: false,
    tabName: 'custom',
    groupName: 'title'
  },
  {
    label: '标题内容',
    type: 'input',
    field: 'titleText',
    optionField: 'title.text',
    value: '基础面积图', // 默认标题
    tabName: 'custom',
    groupName: 'title'
  },
  // 图表样式配置 - 区域/线条
  {
    label: '区域颜色',
    type: 'colorSelect',
    field: 'areaColor',
    optionField: 'color', // 映射到顶层 color
    value: ['#5B8FF9'], // 默认颜色
    tabName: 'custom',
    groupName: 'graph'
  },
   {
    label: '区域透明度',
    type: 'slider', // 使用滑块控制透明度
    field: 'areaOpacity',
    optionField: 'series.0.area.style.fillOpacity', // 控制区域填充透明度
    value: 0.4, // 默认半透明
    min: 0,
    max: 1,
    step: 0.01,
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '曲线类型',
    type: 'select',
    field: 'curveType',
    optionField: 'series.0.line.style.curveType', // 线条形状
    options: [
      { label: '直线', value: 'linear' },
      { label: '平滑', value: 'monotone' },
      { label: '阶梯(前)', value: 'stepBefore' },
      { label: '阶梯(中)', value: 'step' },
      { label: '阶梯(后)', value: 'stepAfter' }
    ],
    value: 'linear',
    tabName: 'custom',
    groupName: 'graph'
  },
  // 图表样式配置 - 数据点
  {
    label: '显示数据点',
    type: 'switch',
    field: 'showPoint',
    optionField: 'series.0.point.visible',
    value: false, // 面积图默认不显示点
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '数据点大小',
    type: 'inputNumber',
    field: 'pointSize',
    optionField: 'series.0.point.style.size',
    value: 4,
    min: 0,
    tabName: 'custom',
    groupName: 'graph'
  },
   // 图表主题配置
  {
    label: '图表主题',
    type: 'select',
    field: 'chartTheme',
    optionField: 'theme',
    options: [
      { label: '亮色', value: 'light' },
      { label: '暗色', value: 'dark' }
    ],
    value: 'dark', // 默认暗色
    tabName: 'custom',
    groupName: 'graph'
  },
  // 坐标轴配置
  {
    label: 'X轴显隐',
    type: 'switch',
    field: 'xAxisVisible',
    optionField: 'axes.0.visible',
    value: true,
    tabName: 'custom',
    groupName: 'axis'
  },
  {
    label: 'Y轴显隐',
    type: 'switch',
    field: 'yAxisVisible',
    optionField: 'axes.1.visible',
    value: true,
    tabName: 'custom',
    groupName: 'axis'
  },
   {
    label: 'Y轴网格线',
    type: 'switch',
    field: 'yAxisGridVisible',
    optionField: 'axes.1.grid.visible',
    value: true,
    tabName: 'custom',
    groupName: 'axis'
  },
  // Tooltip 配置
  {
    label: '显示Tooltip',
    type: 'switch',
    field: 'tooltipVisible',
    optionField: 'tooltip.visible',
    value: true,
    tabName: 'custom',
    groupName: 'tooltip'
  }
]

// 配置处理脚本 (暂无)
const optionHandler = ''

// 数据处理脚本 (暂无)
const dataHandler = ''

// 示例数据 (来自用户提供)
const data = {
  id: 'areaData', // 更新 ID
  values: [
    { time: '2:00', value: 8 },
    { time: '4:00', value: 9 },
    { time: '6:00', value: 11 },
    { time: '8:00', value: 14 },
    { time: '10:00', value: 16 },
    { time: '12:00', value: 17 },
    { time: '14:00', value: 17 },
    { time: '16:00', value: 16 },
    { time: '18:00', value: 15 }
  ]
};

// 默认 VChart option
const option = {
  type: 'area', // 类型改为 area
  data: [data], // 使用包含ID的数据源数组
  xField: 'time',
  yField: 'value',
  title: {
    visible: false,
    text: '基础面积图'
  },
  legends: {
    visible: false
  },
  axes: [
    {
      orient: 'bottom',
      type: 'band',
      visible: true,
      grid: { visible: false }
    },
    {
      orient: 'left',
      type: 'linear',
      visible: true,
      grid: { visible: true }
    }
  ],
  series: [
    {
      id: 'series0', // 添加系列 ID
      type: 'area', // 系列类型改为 area
      line: { // 线条样式
        style: {
          curveType: 'linear'
        }
      },
      area: { // 区域样式
        style: {
          fillOpacity: 0.4 // 默认透明度
        }
      },
      point: { // 数据点样式
        visible: false, // 面积图默认不显示点
        style: {
          size: 4
        }
      }
    }
  ],
  tooltip: {
    visible: true
  },
  theme: 'dark' // 默认暗色主题
}

// 导出模块
export default {
  version,
  title,
  name,
  type,
  option,
  setting,
  optionHandler,
  dataHandler,
  chartType
} 