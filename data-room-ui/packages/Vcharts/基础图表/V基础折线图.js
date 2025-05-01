// 配置版本号
const version = '2024051501'
// 标题
const title = 'V基础折线图'
// 用于标识，唯一，和文件夹名称一致
const name = 'V基础折线图'
// 组件类型标识
const type = 'customComponent'
// 图表类型标识
const chartType = 'line'

// 右侧配置项
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
    value: '基础折线图', // 默认标题
    tabName: 'custom',
    groupName: 'title'
  },
  // 图表样式配置
  {
    label: '线条颜色',
    type: 'colorSelect',
    field: 'lineColor',
    optionField: 'color',
    value: ['#5B8FF9'],
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '线条粗细',
    type: 'inputNumber',
    field: 'lineWidth',
    optionField: 'series.0.line.style.lineWidth',
    value: 2,
    min: 1,
    max: 10,
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '显示数据点',
    type: 'switch',
    field: 'showPoint',
    optionField: 'series.0.point.visible',
    value: true,
    tabName: 'custom',
    groupName: 'graph'
  },
  // 图表主题配置 (新加)
  {
    label: '图表主题',
    type: 'select',
    field: 'chartTheme',
    optionField: 'theme', // 直接映射到 VChart spec 的顶层 theme
    options: [
      { label: '亮色', value: 'light' },
      { label: '暗色', value: 'dark' }
    ],
    value: 'dark', // 默认暗色主题
    tabName: 'custom',
    groupName: 'graph' // 放在图表分组下
  },
  // 坐标轴配置
  {
    label: 'X轴显隐',
    type: 'switch',
    field: 'xAxisVisible',
    optionField: 'axes.0.visible', // 第一个轴通常是 X 轴
    value: true,
    tabName: 'custom',
    groupName: 'axis'
  },
  {
    label: 'Y轴显隐',
    type: 'switch',
    field: 'yAxisVisible',
    optionField: 'axes.1.visible', // 第二个轴通常是 Y 轴
    value: true,
    tabName: 'custom',
    groupName: 'axis'
  },
   {
    label: 'Y轴网格线',
    type: 'switch',
    field: 'yAxisGridVisible',
    optionField: 'axes.1.grid.visible', // Y 轴网格线
    value: true, // 通常 Y 轴网格线默认需要显示
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

// 示例数据
const data = {
  id: 'lineData',
  values: [
    { month: '1月', value: 3 },
    { month: '2月', value: 4 },
    { month: '3月', value: 3.5 },
    { month: '4月', value: 5 },
    { month: '5月', value: 4.9 },
    { month: '6月', value: 6 },
    { month: '7月', value: 7 },
    { month: '8月', value: 9 },
    { month: '9月', value: 8 },
    { month: '10月', value: 6 },
    { month: '11月', value: 4 },
    { month: '12月', value: 3 }
  ]
};

// 默认 VChart option
const option = {
  type: 'line',
  data: [data],
  xField: 'month',
  yField: 'value',
  title: {
    visible: false,
    text: '基础折线图'
  },
  legends: { // 图例对于单折线图通常不需要
    visible: false
  },
  axes: [
    {
      orient: 'bottom',
      type: 'band',
      visible: true
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
      type: 'line',
      line: {
        style: {
          lineWidth: 2,
          curveType: 'linear'
        }
      },
      point: {
        visible: true,
        style: {
          size: 4
        }
      }
    }
  ],
  tooltip: {
    visible: true
  }
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