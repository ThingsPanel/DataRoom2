// 配置版本号
const version = '2024051502'
// 标题
const title = 'V基础雷达图'
// 用于标识，唯一，和文件夹名称一致
const name = 'V基础雷达图'
// 组件类型标识
const type = 'customComponent'
// 图表类型标识
const chartType = 'radar'

// 右侧配置项
const setting = [
  // 数据配置
  {
    label: '维度字段',
    type: 'select',
    field: 'categoryField',
    optionField: 'categoryField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  {
    label: '指标字段',
    type: 'select',
    field: 'valueField',
    optionField: 'valueField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  {
    label: '系列字段',
    type: 'select',
    field: 'seriesField',
    optionField: 'seriesField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  // 图表样式配置
  {
    label: '雷达颜色',
    type: 'colorSelect',
    field: 'radarColors',
    optionField: 'color',
    value: ['#5B8FF9', '#5AD8A6', '#F6BD16'],
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '雷达半径',
    type: 'slider',
    field: 'radius',
    optionField: 'series.0.radar.style.radius',
    value: 0.8,
    min: 0.1,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '线条宽度',
    type: 'inputNumber',
    field: 'lineWidth',
    optionField: 'series.0.line.style.lineWidth',
    value: 2,
    min: 1,
    max: 5,
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '区域填充',
    type: 'switch',
    field: 'showArea',
    optionField: 'series.0.area.visible',
    value: true,
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '填充透明度',
    type: 'slider',
    field: 'fillOpacity',
    optionField: 'series.0.area.style.fillOpacity',
    value: 0.3,
    min: 0.1,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'graph'
  }
]

// 示例数据
const data = {
  id: 'radarData',
  values: [
    { dimension: '销售额', type: '产品A', value: 85 },
    { dimension: '管理', type: '产品A', value: 70 },
    { dimension: '信息技术', type: '产品A', value: 75 },
    { dimension: '客服', type: '产品A', value: 92 },
    { dimension: '研发', type: '产品A', value: 78 },
    { dimension: '市场', type: '产品A', value: 65 },
    
    { dimension: '销售额', type: '产品B', value: 60 },
    { dimension: '管理', type: '产品B', value: 82 },
    { dimension: '信息技术', type: '产品B', value: 68 },
    { dimension: '客服', type: '产品B', value: 75 },
    { dimension: '研发', type: '产品B', value: 95 },
    { dimension: '市场', type: '产品B', value: 70 }
  ]
};

// 默认 VChart option
const option = {
  type: 'radar',
  data: [data],
  categoryField: 'dimension',
  valueField: 'value',
  seriesField: 'type',
  series: [
    {
      type: 'radar',
      radar: {
        style: {
          radius: 0.8
        }
      },
      line: {
        style: {
          lineWidth: 2
        }
      },
      area: {
        visible: true,
        style: {
          fillOpacity: 0.3
        }
      }
    }
  ],
  legends: {
    visible: true,
    orient: 'bottom'
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