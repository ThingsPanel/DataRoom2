// 配置版本号
const version = '2024051501'
// 标题
const title = 'V基础面积图'
// 用于标识，唯一，和文件夹名称一致
const name = 'V基础面积图'
// 组件类型标识
const type = 'customComponent'
// 图表类型标识
const chartType = 'area'

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
  // 图表样式配置
  {
    label: '面积颜色',
    type: 'colorSelect',
    field: 'areaColor',
    optionField: 'color',
    value: ['#5B8FF9'],
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '区域透明度',
    type: 'slider',
    field: 'areaOpacity',
    optionField: 'series.0.area.style.fillOpacity',
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '线条粗细',
    type: 'inputNumber',
    field: 'lineWidth',
    optionField: 'series.0.line.style.lineWidth',
    value: 2,
    min: 0,
    max: 10,
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '曲线类型',
    type: 'select',
    field: 'curveType',
    optionField: 'series.0.line.style.curveType',
    options: [
      { label: '直线', value: 'linear' },
      { label: '平滑曲线', value: 'monotone' },
      { label: '阶梯线', value: 'step' }
    ],
    value: 'linear',
    tabName: 'custom',
    groupName: 'graph'
  }
]

// 示例数据
const data = {
  id: 'areaData',
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
  type: 'area',
  data: [data],
  xField: 'month',
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
  series: [
    {
      type: 'area',
      line: {
        style: {
          lineWidth: 2,
          curveType: 'linear'
        }
      },
      area: {
        style: {
          fillOpacity: 0.5
        }
      }
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