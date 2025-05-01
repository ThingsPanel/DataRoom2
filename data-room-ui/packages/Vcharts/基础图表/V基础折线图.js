// 配置版本号
const version = '2024050101' // 使用当前日期作为示例版本
// 标题
const title = 'V基础折线图'
// 用于标识，唯一，和文件夹名称一致
const name = 'V基础折线图'
// 组件类型标识
const type = 'customComponent'
// 图表类型标识 (VChart type)
const chartType = 'line'
// 右侧配置项
const setting = [
  // 数据配置
  {
    label: 'X轴字段',
    type: 'select',
    field: 'xField',
    optionField: 'xField', // 直接映射 VChart spec 的 xField
    multiple: false,
    value: '',
    tabName: 'data'
  },
  {
    label: 'Y轴字段',
    type: 'select',
    field: 'yField',
    optionField: 'yField', // 直接映射 VChart spec 的 yField
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
  // 图表样式配置 - 线条
  {
    label: '线条颜色',
    type: 'colorSelect',
    field: 'lineColor',
    optionField: 'color', // 映射到顶层 color 影响所有系列，或 series.0.line.style.stroke
    value: ['#5B8FF9'], // VChart 默认色板的第一个颜色
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '曲线类型',
    type: 'select',
    field: 'curveType',
    optionField: 'series.0.line.style.curveType', // 控制线条形状
    options: [
      { label: '直线', value: 'linear' },
      { label: '平滑', value: 'monotone' },
      { label: '阶梯(前)', value: 'stepBefore' },
      { label: '阶梯(中)', value: 'step' },
      { label: '阶梯(后)', value: 'stepAfter' }
    ],
    value: 'linear', // 默认直线
    tabName: 'custom',
    groupName: 'graph'
  },
  // 图表样式配置 - 数据点
  {
    label: '显示数据点',
    type: 'switch',
    field: 'showPoint',
    optionField: 'series.0.point.visible', // 控制数据点显隐
    value: true, // 默认显示数据点
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '数据点大小',
    type: 'inputNumber',
    field: 'pointSize',
    optionField: 'series.0.point.style.size', // 控制数据点大小
    value: 4,
    min: 0,
    tabName: 'custom',
    groupName: 'graph'
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

// 示例数据 (来自用户提供)
const data = {
  id: 'lineData', // 给数据源一个 ID
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
  type: 'line',
  data: data, // 使用上面的示例数据
  xField: 'time',
  yField: 'value',
  title: {
    visible: false,
    text: '基础折线图'
  },
  legends: { // 图例对于单折线图通常不需要
    visible: false
  },
  axes: [ // 定义坐标轴
    {
      orient: 'bottom',
      type: 'band', // 对于时间类别，'band' 轴适用；如果 time 是时间戳，可用 'time'
      visible: true,
      grid: { visible: false } // X 轴网格线通常不需要
    },
    {
      orient: 'left',
      type: 'linear',
      visible: true,
      grid: { visible: true } // Y 轴网格线默认开启
    }
  ],
  series: [ // 系列配置
    {
      type: 'line', // 确保系列类型是 line
      line: { // 线条样式
        style: {
          curveType: 'linear' // 默认直线
        }
      },
      point: { // 数据点样式
        visible: true, // 默认显示
        style: {
          size: 4 // 默认大小
        }
      }
    }
  ],
  tooltip: { // 提示信息
    visible: true // 默认显示
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