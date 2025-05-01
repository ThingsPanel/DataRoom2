// 配置版本号
const version = '2024051502'
// 标题
const title = 'V环形图'
// 用于标识，唯一，和文件夹名称一致
const name = 'V环形图'
// 组件类型标识
const type = 'customComponent'
// 图表类型标识
const chartType = 'pie'

// 右侧配置项
const setting = [
  // 数据配置
  {
    label: '类别字段',
    type: 'select',
    field: 'categoryField',
    optionField: 'categoryField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  {
    label: '值字段',
    type: 'select',
    field: 'valueField',
    optionField: 'valueField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  // 图表样式配置
  {
    label: '环形颜色',
    type: 'colorSelect',
    field: 'pieColors',
    optionField: 'color',
    value: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#6F5EF9', '#E8684A', '#6DC8EC', '#9270CA'],
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '外半径',
    type: 'slider',
    field: 'radius',
    optionField: 'series.0.pie.style.radius',
    value: 0.8,
    min: 0.1,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '内半径',
    type: 'slider',
    field: 'innerRadius',
    optionField: 'series.0.pie.style.innerRadius',
    value: 0.5,
    min: 0.1,
    max: 0.9,
    step: 0.1,
    tabName: 'custom',
    groupName: 'graph'
  },
  // 标签配置
  {
    label: '显示标签',
    type: 'switch',
    field: 'labelVisible',
    optionField: 'series.0.label.visible',
    value: true,
    tabName: 'custom',
    groupName: 'label'
  },
  {
    label: '标签位置',
    type: 'select',
    field: 'labelPosition',
    optionField: 'series.0.label.position',
    options: [
      { label: '内部', value: 'inside' },
      { label: '外部', value: 'outside' },
      { label: '外部连接线', value: 'spider' }
    ],
    value: 'outside',
    tabName: 'custom',
    groupName: 'label'
  },
  // 中心文本
  {
    label: '显示中心文本',
    type: 'switch',
    field: 'showCenterText',
    optionField: 'series.0.outerRadius',  // 实际不影响配置，仅作为标记
    value: true,
    tabName: 'custom',
    groupName: 'centerText'
  },
  {
    label: '中心文本',
    type: 'input',
    field: 'centerText',
    optionField: 'series.0.centerText',
    value: '总计',
    tabName: 'custom',
    groupName: 'centerText'
  }
]

// 示例数据
const data = {
  id: 'ringData',
  values: [
    { category: '类别1', value: 27 },
    { category: '类别2', value: 25 },
    { category: '类别3', value: 18 },
    { category: '类别4', value: 15 },
    { category: '类别5', value: 10 },
    { category: '其他', value: 5 }
  ]
};

// 默认 VChart option
const option = {
  type: 'pie',
  data: [data],
  categoryField: 'category',
  valueField: 'value',
  series: [
    {
      type: 'pie',
      centerText: '总计',
      pie: {
        style: {
          radius: 0.8,
          innerRadius: 0.5
        }
      },
      label: {
        visible: true,
        position: 'outside'
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