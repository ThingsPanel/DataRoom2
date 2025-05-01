// 配置版本号
const version = '2023091901'
// 标题
const title = 'V基础柱状图'
// 用于标识，唯一，和文件夹名称一致
const name = 'V基础柱状图'
// 组件类型标识
const type = 'customComponent'
// 图表类型标识
const chartType = 'bar'
// 右侧配置项 (进一步丰富)
const setting = [
  // 数据配置
  {
    label: '维度(X轴)',
    type: 'select',
    field: 'xField',
    optionField: 'xField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  {
    label: '指标(Y轴)',
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
    value: '图表标题',
    tabName: 'custom',
    groupName: 'title'
  },
  // 图表样式配置
  {
    label: '柱子宽度',
    type: 'inputNumber',
    field: 'barWidth',
    optionField: 'series.0.barWidth',
    value: 30,
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '柱子圆角',
    type: 'inputNumber',
    field: 'barCornerRadius',
    // 注意：VChart spec 中圆角在 style 内
    optionField: 'series.0.bar.style.cornerRadius',
    value: 0,
    min: 0,
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '配色方案',
    type: 'colorSelect',
    field: 'colorScheme',
    optionField: 'color', // 直接映射到顶层 color
    value: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#6F5EF9'],
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '堆叠柱图',
    type: 'switch',
    field: 'stack',
    optionField: 'stack', // VChart spec 中 stack: true 开启堆叠
    value: false,
    tabName: 'custom',
    groupName: 'graph'
  },
  // 标签配置
  {
    label: '显示标签',
    type: 'switch',
    field: 'labelVisible',
    optionField: 'label.visible',
    value: false,
    tabName: 'custom',
    groupName: 'label'
  },
   {
    label: '标签位置',
    type: 'select',
    field: 'labelPosition',
    optionField: 'label.position',
    options: [
      { label: '内部', value: 'inside' },
      { label: '顶部', value: 'top' },
      { label: '底部', value: 'bottom' }
    ],
    value: 'top',
    tabName: 'custom',
    groupName: 'label'
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
    label: 'X轴标题',
    type: 'input',
    field: 'xAxisTitle',
    optionField: 'axes.0.title.text',
    value: '',
    tabName: 'custom',
    groupName: 'axis'
  },
  {
    label: 'X轴网格线',
    type: 'switch',
    field: 'xAxisGridVisible',
    optionField: 'axes.0.grid.visible',
    value: false,
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
    label: 'Y轴标题',
    type: 'input',
    field: 'yAxisTitle',
    optionField: 'axes.1.title.text',
    value: '',
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
  // 图例配置
  {
    label: '图例显隐',
    type: 'switch',
    field: 'legendVisible',
    optionField: 'legends.0.visible',
    value: false,
    tabName: 'custom',
    groupName: 'legend'
  },
  {
    label: '图例位置',
    type: 'select',
    field: 'legendOrient',
    optionField: 'legends.0.orient',
     options: [
      { label: '顶部', value: 'top' },
      { label: '底部', value: 'bottom' },
      { label: '左侧', value: 'left' },
      { label: '右侧', value: 'right' }
    ],
    value: 'bottom',
    tabName: 'custom',
    groupName: 'legend'
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
  },
  // 动画配置
   {
    label: '启用动画',
    type: 'switch',
    field: 'animation',
    optionField: 'animation',
    value: true,
    tabName: 'custom',
    groupName: 'animation'
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
  }
]

// 配置处理脚本
const optionHandler = ''

// 数据处理脚本
const dataHandler = ''

// 示例数据
const data = {
  id: 'id0',
  values: [
    { x: '周一', y: 22 }, { x: '周二', y: 43 }, { x: '周三', y: 33 }, { x: '周四', y: 22 },
    { x: '周五', y: 10 }, { x: '周六', y: 30 }, { x: '周日', y: 46 }
  ]
};

// 更新后的默认 VChart option
const option = {
  type: 'bar',
  data: [data],
  xField: 'x',
  yField: 'y',
  title: {
    visible: false,
    text: '图表标题'
  },
  label: {
    visible: false,
    position: 'top'
  },
  color: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#6F5EF9'], // 默认配色
  legends: [{
    visible: false,
    orient: 'bottom'
  }],
  axes: [
    {
      orient: 'bottom', type: 'band', visible: true,
      title: { visible: false, text: '' },
      grid: { visible: false } // X 轴网格线默认关闭
    },
    {
      orient: 'left', type: 'linear', visible: true,
      title: { visible: false, text: '' },
      grid: { visible: true } // Y 轴网格线默认开启
    }
  ],
  series: [
    {
      id: 'series0',
      type: 'bar',
      barWidth: 30,
      stack: false, // 默认不堆叠
      bar: { // bar 相关样式配置
        style: {
          cornerRadius: 0 // 默认无圆角
        }
      }
    }
  ],
  tooltip: {
    visible: true // 默认显示 tooltip
  },
  animation: true,
  animationNormal: { // 保留默认复杂动画，由 animation 总开关控制
    bar: [
      {
        loop: true,
        startTime: 100,
        oneByOne: 100,
        timeSlices: [
          {
            delay: 1000,
            effects: { channel: { fillOpacity: { to: 0.5 } }, easing: 'linear' },
            duration: 500
          },
          {
            effects: { channel: { fillOpacity: { to: 1 } }, easing: 'linear' },
            duration: 500
          }
        ]
      }
    ]
  }
}

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