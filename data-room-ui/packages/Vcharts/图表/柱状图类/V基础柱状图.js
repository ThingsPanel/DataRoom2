// 配置版本号
const version = '2024051501'
// 标题
const title = 'V基础柱状图'
// 用于标识，唯一，和文件夹名称一致
const name = 'V基础柱状图'
// 组件类型标识
const type = 'customComponent'
// 图表类型标识
const chartType = 'bar'

// 右侧配置项
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
  // 图表样式配置
  {
    label: '柱子宽度',
    type: 'inputNumber',
    field: 'barWidth',
    optionField: 'series.0.barWidth',
    value: 20,
    tabName: 'custom',
    groupName: 'graph'
  },


]

// 示例数据
const data = {
  id: 'barData',
  values: [
    { category: '类别1', value: 34 },
    { category: '类别2', value: 18 },
    { category: '类别3', value: 23 },
    { category: '类别4', value: 47 },
    { category: '类别5', value: 32 }
  ]
};

// 默认 VChart option
const option = {
  type: 'bar',
  data: [data],
  xField: 'category',
  yField: 'value',
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
  theme:'dark',
  series: [
    {
      type: 'bar',
      barWidth: 20
    }
  ],
  tooltip: {
    visible: true
  }
}

export default {
  version,
  title,
  name,
  type,
  option,
  setting,
  optionHandler: '',
  dataHandler: '',
  chartType
} 