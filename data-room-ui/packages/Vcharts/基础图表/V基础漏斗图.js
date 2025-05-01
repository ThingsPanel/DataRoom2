// 配置版本号
const version = '2024051502'
// 标题
const title = 'V基础漏斗图'
// 用于标识，唯一，和文件夹名称一致
const name = 'V基础漏斗图'
// 组件类型标识
const type = 'customComponent'
// 图表类型标识
const chartType = 'funnel'

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
    label: '漏斗颜色',
    type: 'colorSelect',
    field: 'funnelColors',
    optionField: 'color',
    value: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#6F5EF9', '#E8684A'],
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '对齐方式',
    type: 'select',
    field: 'align',
    optionField: 'series.0.funnel.style.align',
    options: [
      { label: '居中', value: 'center' },
      { label: '左对齐', value: 'left' },
      { label: '右对齐', value: 'right' }
    ],
    value: 'center',
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '最大宽度比例',
    type: 'slider',
    field: 'maxSize',
    optionField: 'series.0.funnel.style.maxSize',
    value: 0.8,
    min: 0.1,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '最小宽度比例',
    type: 'slider',
    field: 'minSize',
    optionField: 'series.0.funnel.style.minSize',
    value: 0.1,
    min: 0.1,
    max: 1,
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
      { label: '外部', value: 'outside' }
    ],
    value: 'inside',
    tabName: 'custom',
    groupName: 'label'
  }
]

// 示例数据
const data = {
  id: 'funnelData',
  values: [
    { stage: '访问', value: 100 },
    { stage: '浏览', value: 80 },
    { stage: '点击', value: 60 },
    { stage: '咨询', value: 40 },
    { stage: '购买', value: 20 }
  ]
};

// 默认 VChart option
const option = {
  type: 'funnel',
  data: [data],
  categoryField: 'stage',
  valueField: 'value',
  series: [
    {
      type: 'funnel',
      funnel: {
        style: {
          align: 'center',
          maxSize: 0.8,
          minSize: 0.1
        }
      },
      label: {
        visible: true,
        position: 'inside'
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