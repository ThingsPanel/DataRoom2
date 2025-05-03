// 配置版本号
const version = '2024072420';
// 标题
const title = 'V基础数据使用';
// 用于标识，唯一
const name = 'V基础数据使用';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  // 坐标轴配置
  { 
    label: '显示X轴', 
    type: 'switch', 
    field: 'xAxisVisible', 
    optionField: 'axes.1.visible', 
    value: true, 
    tabName: 'custom', 
    groupName: 'axis' 
  },
  { 
    label: '显示Y轴', 
    type: 'switch', 
    field: 'yAxisVisible', 
    optionField: 'axes.0.visible', 
    value: true, 
    tabName: 'custom', 
    groupName: 'axis' 
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
  id: 'line',
  values: [
    { x: 'Monday', y: 12 },
    { x: 'Tuesday', y: 13 },
    { x: 'Wednesday', y: 11 },
    { x: 'Thursday', y: 10 },
    { x: 'Friday', y: 12 },
    { x: 'Saturday', y: 14 },
    { x: 'Sunday', y: 17 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'line',
  data: [data],
  xField: 'x',
  yField: 'y',
  axes: [
    { orient: 'left', visible: true },
    { orient: 'bottom', visible: true }
  ]
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 处理坐标轴显示
  const xAxisVisible = settings.find(s => s.field === 'xAxisVisible').value;
  const yAxisVisible = settings.find(s => s.field === 'yAxisVisible').value;
  
  if (option.axes) {
    option.axes[0].visible = yAxisVisible; // Y轴
    option.axes[1].visible = xAxisVisible; // X轴
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 