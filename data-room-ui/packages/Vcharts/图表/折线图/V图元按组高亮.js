// 配置版本号
const version = '2024072420';
// 标题
const title = 'V图元按组高亮';
// 用于标识，唯一
const name = 'V图元按组高亮';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
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
  // 高亮配置
  { 
    label: '高亮透明度', 
    type: 'inputNumber', 
    field: 'highlightOpacity', 
    optionField: 'state.highlight.opacity',
    value: 1,
    min: 0,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'highlight'
  },
  { 
    label: '非高亮透明度', 
    type: 'inputNumber', 
    field: 'unhighlightOpacity', 
    optionField: 'state.unhighlight.opacity',
    value: 0.2,
    min: 0,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'highlight'
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
    { type: 'Nail polish', country: 'Africa', value: 4229 },
    { type: 'Nail polish', country: 'EU', value: 4376 },
    { type: 'Nail polish', country: 'China', value: 3054 },
    { type: 'Nail polish', country: 'USA', value: 12814 },
    { type: 'Eyebrow pencil', country: 'Africa', value: 3932 },
    { type: 'Eyebrow pencil', country: 'EU', value: 3987 },
    { type: 'Eyebrow pencil', country: 'China', value: 5067 },
    { type: 'Eyebrow pencil', country: 'USA', value: 13012 },
    { type: 'Rouge', country: 'Africa', value: 5221 },
    { type: 'Rouge', country: 'EU', value: 3574 },
    { type: 'Rouge', country: 'China', value: 7004 },
    { type: 'Rouge', country: 'USA', value: 11624 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'line',
  data: [data],
  xField: 'country',
  yField: 'value',
  seriesField: 'type',
  line: {
    style: {
      lineWidth: 2
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
  },
  state: {
    highlight: {
      opacity: 1
    },
    unhighlight: {
      opacity: 0.2
    }
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 处理线条样式
  const lineWidth = settings.find(s => s.field === 'lineWidth').value;
  if (option.line && option.line.style) {
    option.line.style.lineWidth = lineWidth;
  }
  
  // 处理高亮配置
  const highlightOpacity = settings.find(s => s.field === 'highlightOpacity').value;
  const unhighlightOpacity = settings.find(s => s.field === 'unhighlightOpacity').value;
  if (option.state) {
    if (option.state.highlight) {
      option.state.highlight.opacity = highlightOpacity;
    }
    if (option.state.unhighlight) {
      option.state.unhighlight.opacity = unhighlightOpacity;
    }
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