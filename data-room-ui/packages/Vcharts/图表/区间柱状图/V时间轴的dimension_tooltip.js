// 配置版本号
const version = '2024072420';
// 标题
const title = 'V时间轴的dimension_tooltip';
// 用于标识，唯一
const name = 'V时间轴的dimension_tooltip';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项
const setting = [
  { label: '时间字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  // Tooltip配置
  { 
    label: '显示Tooltip', 
    type: 'switch', 
    field: 'tooltipVisible', 
    optionField: 'tooltip.visible', 
    value: true, 
    tabName: 'custom', 
    groupName: 'tooltip' 
  },
  // 十字辅助线配置
  { 
    label: '显示辅助线', 
    type: 'switch', 
    field: 'crosshairVisible', 
    optionField: 'crosshair.xField.visible', 
    value: true, 
    tabName: 'custom', 
    groupName: 'crosshair' 
  },
  { 
    label: '辅助线类型', 
    type: 'select', 
    field: 'crosshairType', 
    optionField: 'crosshair.xField.line.type',
    options: [
      { label: '矩形', value: 'rect' },
      { label: '线条', value: 'line' }
    ],
    value: 'rect',
    tabName: 'custom',
    groupName: 'crosshair'
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

// 示例数据
const data = {
  id: 'timeData',
  values: [
    { time: '10:20', cost: 2 },
    { time: '10:30', cost: 1 },
    { time: '10:40', cost: 1 },
    { time: '10:50', cost: 2 },
    { time: '11:00', cost: 2 },
    { time: '11:10', cost: 2 },
    { time: '11:20', cost: 1 },
    { time: '11:30', cost: 1 },
    { time: '11:40', cost: 2 },
    { time: '11:50', cost: 1 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'bar',
  data: [data],
  xField: 'time',
  yField: 'cost',
  crosshair: {
    xField: {
      visible: true,
      line: {
        type: 'rect',
        style: {
          fill: 'rgb(85,208,93)',
          fillOpacity: 0.1
        }
      }
    }
  },
  tooltip: {
    visible: true,
    dimension: {
      title: {
        key: 'title',
        value: '时间'
      },
      items: [
        {
          key: '时间',
          value: datum => datum.time
        },
        {
          key: '花费',
          value: datum => datum.cost + '分钟'
        }
      ]
    }
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 处理Tooltip显示
  const tooltipVisible = settings.find(s => s.field === 'tooltipVisible').value;
  if (option.tooltip) {
    option.tooltip.visible = tooltipVisible;
  }
  
  // 处理十字辅助线配置
  const crosshairVisible = settings.find(s => s.field === 'crosshairVisible').value;
  const crosshairType = settings.find(s => s.field === 'crosshairType').value;
  if (option.crosshair && option.crosshair.xField) {
    option.crosshair.xField.visible = crosshairVisible;
    option.crosshair.xField.line.type = crosshairType;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 