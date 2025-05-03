// 配置版本号
const version = '2024072420';
// 标题
const title = 'V网格线填充';
// 用于标识，唯一
const name = 'V网格线填充';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  // 网格线配置
  { 
    label: '显示网格线', 
    type: 'switch', 
    field: 'gridVisible', 
    optionField: 'axes.0.grid.visible', 
    value: true, 
    tabName: 'custom', 
    groupName: 'grid' 
  },
  { 
    label: '网格线样式', 
    type: 'select', 
    field: 'gridStyle', 
    optionField: 'axes.0.grid.style.lineDash',
    options: [
      { label: '实线', value: '[]' },
      { label: '虚线', value: '[4,4]' },
      { label: '点线', value: '[2,2]' }
    ],
    value: '[]',
    tabName: 'custom',
    groupName: 'grid'
  },
  { 
    label: '网格线宽度', 
    type: 'inputNumber', 
    field: 'gridLineWidth', 
    optionField: 'axes.0.grid.style.lineWidth',
    value: 1,
    min: 0.5,
    max: 5,
    step: 0.5,
    tabName: 'custom',
    groupName: 'grid'
  },
  { 
    label: '网格线颜色', 
    type: 'colorPicker', 
    field: 'gridStroke', 
    optionField: 'axes.0.grid.style.stroke',
    value: '#E8E8E8',
    tabName: 'custom',
    groupName: 'grid'
  },
  { 
    label: '交替填充', 
    type: 'switch', 
    field: 'alternateColor', 
    optionField: 'axes.0.grid.alternateColor', 
    value: true, 
    tabName: 'custom', 
    groupName: 'grid' 
  },
  { 
    label: '填充颜色', 
    type: 'colorPicker', 
    field: 'fillColor', 
    optionField: 'axes.0.grid.alternateColorValue',
    value: 'rgba(0,0,0,0.04)',
    tabName: 'custom',
    groupName: 'grid',
    when: (value, settings) => settings.find(s => s.field === 'alternateColor').value
  },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { 
    label: 'Option 覆盖 (JSON)', 
    type: 'textarea', 
    field: 'optionOverride', 
    optionField: '', 
    value: '', 
    tabName: 'custom', 
    groupName: 'graph' 
  }
];

// 示例数据
const data = {
  id: 'gridData',
  values: [
    { category: '类别A', value: 340 },
    { category: '类别B', value: 220 },
    { category: '类别C', value: 280 },
    { category: '类别D', value: 190 },
    { category: '类别E', value: 290 },
    { category: '类别F', value: 350 },
    { category: '类别G', value: 420 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'bar',
  data: [data],
  xField: 'category',
  yField: 'value',
  axes: [
    {
      orient: 'left',
      grid: {
        visible: true,
        style: {
          stroke: '#E8E8E8',
          lineWidth: 1,
          lineDash: []
        },
        alternateColor: true,
        alternateColorValue: 'rgba(0,0,0,0.04)'
      }
    }
  ]
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  if (option.axes && option.axes[0]) {
    const axis = option.axes[0];
    const gridVisible = settings.find(s => s.field === 'gridVisible').value;
    const gridStyle = JSON.parse(settings.find(s => s.field === 'gridStyle').value);
    const gridLineWidth = settings.find(s => s.field === 'gridLineWidth').value;
    const gridStroke = settings.find(s => s.field === 'gridStroke').value;
    const alternateColor = settings.find(s => s.field === 'alternateColor').value;
    const fillColor = settings.find(s => s.field === 'fillColor').value;
    
    // 更新网格线配置
    axis.grid = axis.grid || {};
    axis.grid.visible = gridVisible;
    axis.grid.style = {
      stroke: gridStroke,
      lineWidth: gridLineWidth,
      lineDash: gridStyle
    };
    
    // 更新填充配置
    axis.grid.alternateColor = alternateColor;
    if (alternateColor) {
      axis.grid.alternateColorValue = fillColor;
    }
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 