// 配置版本号
const version = '2024072420';
// 标题
const title = 'V非堆叠折线图';
// 用于标识，唯一
const name = 'V非堆叠折线图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项
const setting = [
  { label: '日期字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  { label: '分组字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' },
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
    label: '曲线类型', 
    type: 'select', 
    field: 'curveType', 
    optionField: 'line.style.curveType',
    options: [
      { label: '直线', value: 'linear' },
      { label: '单调', value: 'monotone' },
      { label: '基础', value: 'basis' }
    ],
    value: 'linear',
    tabName: 'custom',
    groupName: 'line'
  },
  // 数据点配置
  { 
    label: '显示数据点', 
    type: 'switch', 
    field: 'pointVisible', 
    optionField: 'point.visible', 
    value: true, 
    tabName: 'custom', 
    groupName: 'point' 
  },
  { 
    label: '数据点大小', 
    type: 'inputNumber', 
    field: 'pointSize', 
    optionField: 'point.style.size',
    value: 4,
    min: 2,
    max: 10,
    step: 1,
    tabName: 'custom',
    groupName: 'point'
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

// 示例数据
const data = {
  values: [
    { date: '2023-01-01', type: 'Product A', value: 99.9 },
    { date: '2023-01-01', type: 'Product B', value: 96.6 },
    { date: '2023-01-01', type: 'Product C', value: 96.2 },
    { date: '2023-01-02', type: 'Product A', value: 96.7 },
    { date: '2023-01-02', type: 'Product B', value: 91.1 },
    { date: '2023-01-02', type: 'Product C', value: 93.4 },
    { date: '2023-01-03', type: 'Product A', value: 100.2 },
    { date: '2023-01-03', type: 'Product B', value: 99.4 },
    { date: '2023-01-03', type: 'Product C', value: 91.7 },
    { date: '2023-01-04', type: 'Product A', value: 104.7 },
    { date: '2023-01-04', type: 'Product B', value: 108.1 },
    { date: '2023-01-04', type: 'Product C', value: 93.1 },
    { date: '2023-01-05', type: 'Product A', value: 95.6 },
    { date: '2023-01-05', type: 'Product B', value: 96.0 },
    { date: '2023-01-05', type: 'Product C', value: 92.3 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'line',
  data: [data],
  xField: 'date',
  yField: 'value',
  seriesField: 'type',
  line: {
    style: {
      lineWidth: 2,
      curveType: 'linear'
    }
  },
  point: {
    visible: true,
    style: {
      size: 4
    }
  },
  legends: {
    visible: true,
    position: 'bottom'
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 处理线条样式
  const lineWidth = settings.find(s => s.field === 'lineWidth').value;
  const curveType = settings.find(s => s.field === 'curveType').value;
  if (option.line && option.line.style) {
    option.line.style.lineWidth = lineWidth;
    option.line.style.curveType = curveType;
  }
  
  // 处理数据点配置
  const pointVisible = settings.find(s => s.field === 'pointVisible').value;
  const pointSize = settings.find(s => s.field === 'pointSize').value;
  if (option.point) {
    option.point.visible = pointVisible;
    if (option.point.style) {
      option.point.style.size = pointSize;
    }
  }
  
  // 处理图例配置
  const legendVisible = settings.find(s => s.field === 'legendVisible').value;
  if (option.legends) {
    option.legends.visible = legendVisible;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 