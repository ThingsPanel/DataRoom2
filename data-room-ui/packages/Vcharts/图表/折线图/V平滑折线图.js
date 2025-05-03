// 配置版本号
const version = '2024072420';
// 标题
const title = 'V平滑折线图';
// 用于标识，唯一
const name = 'V平滑折线图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项
const setting = [
  { label: '时间字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  // 折线样式配置
  { 
    label: '线条宽度', 
    type: 'inputNumber', 
    field: 'lineWidth', 
    optionField: 'line.style.lineWidth',
    value: 2,
    min: 1,
    max: 10,
    step: 1,
    tabName: 'custom',
    groupName: 'line'
  },
  { 
    label: '线条颜色', 
    type: 'colorPicker', 
    field: 'lineColor', 
    optionField: 'line.style.stroke',
    value: '#1890ff',
    tabName: 'custom',
    groupName: 'line'
  },
  { 
    label: '曲线类型', 
    type: 'select', 
    field: 'curveType', 
    optionField: 'line.style.curveType',
    options: [
      { label: '单调', value: 'monotone' },
      { label: '基础', value: 'basis' },
      { label: '线性', value: 'linear' },
      { label: '阶梯', value: 'stepAfter' }
    ],
    value: 'monotone',
    tabName: 'custom',
    groupName: 'line'
  },
  // 数据点配置
  { 
    label: '显示数据点', 
    type: 'switch', 
    field: 'pointVisible', 
    optionField: 'point.visible', 
    value: false, 
    tabName: 'custom', 
    groupName: 'point' 
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
  values: [
    { time: '2:00', value: 38 },
    { time: '4:00', value: 56 },
    { time: '6:00', value: 10 },
    { time: '8:00', value: 70 },
    { time: '10:00', value: 36 },
    { time: '12:00', value: 94 },
    { time: '14:00', value: 24 },
    { time: '16:00', value: 44 },
    { time: '18:00', value: 36 },
    { time: '20:00', value: 68 },
    { time: '22:00', value: 22 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'line',
  data: [data],
  xField: 'time',
  yField: 'value',
  line: {
    style: {
      lineWidth: 2,
      stroke: '#1890ff',
      curveType: 'monotone'
    }
  },
  point: {
    visible: false
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 处理线条样式
  const lineWidth = settings.find(s => s.field === 'lineWidth').value;
  const lineColor = settings.find(s => s.field === 'lineColor').value;
  const curveType = settings.find(s => s.field === 'curveType').value;
  
  if (option.line && option.line.style) {
    option.line.style.lineWidth = lineWidth;
    option.line.style.stroke = lineColor;
    option.line.style.curveType = curveType;
  }
  
  // 处理数据点配置
  const pointVisible = settings.find(s => s.field === 'pointVisible').value;
  if (option.point) {
    option.point.visible = pointVisible;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 