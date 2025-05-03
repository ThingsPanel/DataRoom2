// 配置版本号
const version = '2024072501';
// 标题
const title = 'V标签触发图元_Tooltip';
// 用于标识，唯一
const name = 'V标签触发图元_Tooltip';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项
const setting = [
  { label: 'X轴第一层字段', type: 'select', field: 'xField1', optionField: 'xField.0', multiple: false, value: 'year', tabName: 'data' },
  { label: 'X轴第二层字段', type: 'select', field: 'xField2', optionField: 'xField.1', multiple: false, value: 'type', tabName: 'data' },
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: 'value', tabName: 'data' },
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: 'type', tabName: 'data' },
  // 标签配置
  {
    label: '显示标签',
    type: 'switch',
    field: 'labelVisible',
    optionField: 'label.visible',
    value: true,
    tabName: 'custom',
    groupName: 'label'
  },
  {
    label: '标签交互',
    type: 'switch',
    field: 'labelInteractive',
    optionField: 'label.interactive',
    value: true,
    tabName: 'custom',
    groupName: 'label'
  },
  {
    label: '标签触发Tooltip',
    type: 'switch',
    field: 'labelShowTooltip',
    optionField: 'label.showRelatedMarkTooltip',
    value: true,
    tabName: 'custom',
    groupName: 'label'
  },
  // Tooltip 配置
  {
    label: 'Tooltip 可进入',
    type: 'switch',
    field: 'tooltipEnterable',
    optionField: 'tooltip.enterable',
    value: true,
    tabName: 'custom',
    groupName: 'tooltip'
  },
  // 图例配置
  {
    label: '显示图例',
    type: 'switch',
    field: 'legendVisible',
    optionField: 'legends.visible',
    value: true,
    tabName: 'custom',
    groupName: 'legend'
  },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'basic' },
  {
    label: 'Option 覆盖 (JSON)',
    type: 'textarea',
    field: 'optionOverride',
    optionField: '',
    value: '',
    tabName: 'custom',
    groupName: 'basic'
  }
];

// 示例数据 - 需要创建符合 xField: ['year', 'type'] 结构的数据
const data = {
  id: 'labelTooltipData',
  values: [
    { year: '2020', type: 'A', value: 100 }, { year: '2020', type: 'B', value: 120 }, { year: '2020', type: 'C', value: 80 },
    { year: '2021', type: 'A', value: 110 }, { year: '2021', type: 'B', value: 130 }, { year: '2021', type: 'C', value: 90 },
    { year: '2022', type: 'A', value: 105 }, { year: '2022', type: 'B', value: 125 }, { year: '2022', type: 'C', value: 85 },
  ]
};

// 模拟计算总和，用于 Tooltip 百分比（简化版）
const aggregation = data.values.reduce((acc, cur) => {
  acc[cur.year] = (acc[cur.year] || 0) + cur.value;
  return acc;
}, {});

// 默认 VChart Option
const option = {
  type: 'bar',
  data: [data],
  xField: ['year', 'type'], // 多层级 X 轴
  yField: 'value',
  seriesField: 'type',
  label: {
    visible: true,
    interactive: true,
    showRelatedMarkTooltip: true
  },
  legends: {
    visible: true
  },
  tooltip: { // 简化 Tooltip 配置，保留核心交互
    mark: {
      title: {
        value: (datum, { node }) => (node.type === 'text' ? `Label: ${datum['year']}` : datum['type'])
      },
      content: [
        {
          key: datum => datum['type'],
          value: datum => datum['value']
        },
        {
          hasShape: false,
          key: 'Proportion',
          value: (datum) => {
            const total = aggregation[datum['year']];
            return total ? `${Math.round((datum['value'] / total) * 10000) / 100}%` : 'N/A';
          }
        }
      ]
    },
    dimension: {
      title: {
        value: datum => `${datum['year']}` // 简化标题
      },
      content: [
        {
          key: datum => datum['type'],
          value: datum => datum['value']
        },
        {
          hasShape: false,
          key: datum => `${datum['type']} Proportion`,
          value: datum => {
            const total = aggregation[datum['year']];
            return total ? `${Math.round((datum['value'] / total) * 10000) / 100}%` : 'N/A';
          }
        }
      ]
    },
    enterable: true // 保留可进入配置
  }
  // 移除了 bar.state 配置
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;

  // 处理标签配置
  const labelVisible = settings.find(s => s.field === 'labelVisible')?.value;
  const labelInteractive = settings.find(s => s.field === 'labelInteractive')?.value;
  const labelShowTooltip = settings.find(s => s.field === 'labelShowTooltip')?.value;
  if (option.label) {
    if(labelVisible !== undefined) option.label.visible = labelVisible;
    if(labelInteractive !== undefined) option.label.interactive = labelInteractive;
    if(labelShowTooltip !== undefined) option.label.showRelatedMarkTooltip = labelShowTooltip;
  }

  // 处理 Tooltip 配置
  const tooltipEnterable = settings.find(s => s.field === 'tooltipEnterable')?.value;
  if (option.tooltip && tooltipEnterable !== undefined) {
    option.tooltip.enterable = tooltipEnterable;
  }

  // 处理图例显示
  const legendVisible = settings.find(s => s.field === 'legendVisible')?.value;
  if (option.legends && legendVisible !== undefined) {
    option.legends.visible = legendVisible;
  }

  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
};
