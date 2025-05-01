// 配置版本号
const version = '2024051501'
// 标题
const title = 'V基础散点图'
// 用于标识，唯一，和文件夹名称一致
const name = 'V基础散点图'
// 组件类型标识
const type = 'customComponent'
// 图表类型标识
const chartType = 'scatter'

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
  // 可选的大小字段
  {
    label: '大小字段',
    type: 'select',
    field: 'sizeField',
    optionField: 'sizeField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  // 可选的颜色字段
  {
    label: '颜色字段',
    type: 'select',
    field: 'colorField',
    optionField: 'colorField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  // 图表样式配置
  {
    label: '点颜色',
    type: 'colorSelect',
    field: 'pointColor',
    optionField: 'color',
    value: ['#5B8FF9'],
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '点大小',
    type: 'inputNumber',
    field: 'pointSize',
    optionField: 'series.0.point.style.size',
    value: 10,
    min: 1,
    max: 50,
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '形状',
    type: 'select',
    field: 'shape',
    optionField: 'series.0.point.style.shape',
    options: [
      { label: '圆形', value: 'circle' },
      { label: '正方形', value: 'square' },
      { label: '三角形', value: 'triangle' },
      { label: '菱形', value: 'diamond' }
    ],
    value: 'circle',
    tabName: 'custom',
    groupName: 'graph'
  }
]

// 示例数据
const data = {
  id: 'scatterData',
  values: [
    { x: 30, y: 44, category: 'A类' },
    { x: 106, y: 84, category: 'A类' },
    { x: 57, y: 96, category: 'A类' },
    { x: 12, y: 62, category: 'B类' },
    { x: 90, y: 32, category: 'B类' },
    { x: 48, y: 22, category: 'B类' },
    { x: 78, y: 76, category: 'C类' },
    { x: 39, y: 21, category: 'C类' },
    { x: 61, y: 55, category: 'C类' }
  ]
};

// 默认 VChart option
const option = {
  type: 'scatter',
  data: [data],
  xField: 'x',
  yField: 'y',
  colorField: 'category',
  axes: [
    {
      orient: 'bottom',
      type: 'linear',
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
      type: 'scatter',
      point: {
        style: {
          size: 10,
          shape: 'circle'
        }
      }
    }
  ],
  legends: {
    visible: true,
    orient: 'right'
  },
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