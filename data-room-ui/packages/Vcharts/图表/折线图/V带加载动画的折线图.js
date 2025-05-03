// 配置版本号
const version = '2024072420';
// 标题
const title = 'V带加载动画的折线图';
// 用于标识，唯一
const name = 'V带加载动画的折线图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项
const setting = [
  { label: '时间字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  // 动画配置
  { 
    label: '动画类型', 
    type: 'select', 
    field: 'animationType', 
    optionField: 'animationAppear.line.type',
    options: [
      { label: '裁剪', value: 'clipIn' },
      { label: '渐显', value: 'fadeIn' },
      { label: '缩放', value: 'scaleIn' }
    ],
    value: 'clipIn',
    tabName: 'custom',
    groupName: 'animation'
  },
  { 
    label: '动画时长(ms)', 
    type: 'inputNumber', 
    field: 'animationDuration', 
    optionField: 'animationAppear.line.duration',
    value: 1000,
    min: 100,
    max: 5000,
    step: 100,
    tabName: 'custom',
    groupName: 'animation'
  },
  { 
    label: '动画缓动函数', 
    type: 'select', 
    field: 'animationEasing', 
    optionField: 'animationAppear.line.easing',
    options: [
      { label: '线性', value: 'linear' },
      { label: '缓入', value: 'easeIn' },
      { label: '缓出', value: 'easeOut' },
      { label: '缓入缓出', value: 'easeInOut' }
    ],
    value: 'linear',
    tabName: 'custom',
    groupName: 'animation'
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
  point: {
    visible: false
  },
  animation: true,
  animationAppear: {
    line: {
      type: 'clipIn',
      duration: 1000,
      easing: 'linear'
    }
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 处理线条样式
  const lineWidth = settings.find(s => s.field === 'lineWidth').value;
  const lineColor = settings.find(s => s.field === 'lineColor').value;
  if (option.line && option.line.style) {
    option.line.style.lineWidth = lineWidth;
    option.line.style.stroke = lineColor;
  }
  
  // 处理动画配置
  const animationType = settings.find(s => s.field === 'animationType').value;
  const animationDuration = settings.find(s => s.field === 'animationDuration').value;
  const animationEasing = settings.find(s => s.field === 'animationEasing').value;
  
  if (option.animationAppear && option.animationAppear.line) {
    option.animationAppear.line.type = animationType;
    option.animationAppear.line.duration = animationDuration;
    option.animationAppear.line.easing = animationEasing;
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