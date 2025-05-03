// 配置版本号
const version = '2024072420';
// 标题
const title = 'V自定义样式标题';
// 用于标识，唯一
const name = 'V自定义样式标题';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项
const setting = [
  { label: '时间字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  // 标题配置
  { 
    label: '标题文本', 
    type: 'input', 
    field: 'titleText', 
    optionField: 'title.text',
    value: 'Line Chart',
    tabName: 'custom',
    groupName: 'title'
  },
  { 
    label: '副标题文本', 
    type: 'textarea', 
    field: 'subtitleText', 
    optionField: 'title.subtext',
    value: 'This is a line chart with customized title style',
    tabName: 'custom',
    groupName: 'title'
  },
  { 
    label: '标题对齐方式', 
    type: 'select', 
    field: 'titleAlign', 
    optionField: 'title.align',
    options: [
      { label: '左对齐', value: 'left' },
      { label: '居中', value: 'center' },
      { label: '右对齐', value: 'right' }
    ],
    value: 'left',
    tabName: 'custom',
    groupName: 'title'
  },
  { 
    label: '标题垂直对齐', 
    type: 'select', 
    field: 'titleVerticalAlign', 
    optionField: 'title.verticalAlign',
    options: [
      { label: '顶部', value: 'top' },
      { label: '中部', value: 'middle' },
      { label: '底部', value: 'bottom' }
    ],
    value: 'top',
    tabName: 'custom',
    groupName: 'title'
  },
  { 
    label: '标题字体大小', 
    type: 'inputNumber', 
    field: 'titleFontSize', 
    optionField: 'title.textStyle.fontSize',
    value: 24,
    min: 12,
    max: 48,
    step: 1,
    tabName: 'custom',
    groupName: 'title'
  },
  { 
    label: '标题颜色', 
    type: 'colorPicker', 
    field: 'titleColor', 
    optionField: 'title.textStyle.fill',
    value: '#468DFF',
    tabName: 'custom',
    groupName: 'title'
  },
  { 
    label: '副标题斜体', 
    type: 'switch', 
    field: 'subtitleItalic', 
    optionField: 'title.subtextStyle.fontStyle',
    value: true, 
    tabName: 'custom', 
    groupName: 'title' 
  },
  { 
    label: '副标题下划线', 
    type: 'switch', 
    field: 'subtitleUnderline', 
    optionField: 'title.subtextStyle.underline',
    value: true, 
    tabName: 'custom', 
    groupName: 'title' 
  },
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
    { time: '2:00', value: 8 },
    { time: '4:00', value: 9 },
    { time: '6:00', value: 11 },
    { time: '8:00', value: 14 },
    { time: '10:00', value: 16 },
    { time: '12:00', value: 17 },
    { time: '14:00', value: 17 },
    { time: '16:00', value: 16 },
    { time: '18:00', value: 15 }
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
      stroke: '#1890ff'
    }
  },
  title: {
    visible: true,
    text: 'Line Chart',
    subtext: 'This is a line chart with customized title style',
    align: 'left',
    verticalAlign: 'top',
    textStyle: {
      stroke: '#333',
      lineWidth: 3,
      fill: '#468DFF',
      fontSize: 24
    },
    subtextStyle: {
      visible: true,
      fontStyle: 'italic',
      underline: 1
    }
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 处理标题配置
  const titleText = settings.find(s => s.field === 'titleText').value;
  const subtitleText = settings.find(s => s.field === 'subtitleText').value;
  const titleAlign = settings.find(s => s.field === 'titleAlign').value;
  const titleVerticalAlign = settings.find(s => s.field === 'titleVerticalAlign').value;
  const titleFontSize = settings.find(s => s.field === 'titleFontSize').value;
  const titleColor = settings.find(s => s.field === 'titleColor').value;
  const subtitleItalic = settings.find(s => s.field === 'subtitleItalic').value;
  const subtitleUnderline = settings.find(s => s.field === 'subtitleUnderline').value;
  
  if (option.title) {
    option.title.text = titleText;
    option.title.subtext = subtitleText;
    option.title.align = titleAlign;
    option.title.verticalAlign = titleVerticalAlign;
    
    if (option.title.textStyle) {
      option.title.textStyle.fontSize = titleFontSize;
      option.title.textStyle.fill = titleColor;
    }
    
    if (option.title.subtextStyle) {
      option.title.subtextStyle.fontStyle = subtitleItalic ? 'italic' : 'normal';
      option.title.subtextStyle.underline = subtitleUnderline ? 1 : 0;
    }
  }
  
  // 处理线条样式
  const lineWidth = settings.find(s => s.field === 'lineWidth').value;
  const lineColor = settings.find(s => s.field === 'lineColor').value;
  if (option.line && option.line.style) {
    option.line.style.lineWidth = lineWidth;
    option.line.style.stroke = lineColor;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 