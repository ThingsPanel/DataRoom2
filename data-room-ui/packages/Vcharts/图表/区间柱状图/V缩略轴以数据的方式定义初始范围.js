// 配置版本号
const version = '2024072420';
// 标题
const title = 'V缩略轴以数据的方式定义初始范围';
// 用于标识，唯一
const name = 'V缩略轴以数据的方式定义初始范围';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  // 缩略轴配置
  { 
    label: '显示缩略轴', 
    type: 'switch', 
    field: 'scrollbarVisible', 
    optionField: 'scrollbar.visible', 
    value: true, 
    tabName: 'custom', 
    groupName: 'scrollbar' 
  },
  { 
    label: '起始位置', 
    type: 'inputNumber', 
    field: 'start', 
    optionField: 'scrollbar.start',
    value: 0.2,
    min: 0,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'scrollbar'
  },
  { 
    label: '结束位置', 
    type: 'inputNumber', 
    field: 'end', 
    optionField: 'scrollbar.end',
    value: 0.8,
    min: 0,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'scrollbar'
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
  id: 'scrollData',
  values: [
    { category: 'A', value: 45 },
    { category: 'B', value: 67 },
    { category: 'C', value: 89 },
    { category: 'D', value: 34 },
    { category: 'E', value: 78 },
    { category: 'F', value: 56 },
    { category: 'G', value: 90 },
    { category: 'H', value: 45 },
    { category: 'I', value: 67 },
    { category: 'J', value: 89 },
    { category: 'K', value: 34 },
    { category: 'L', value: 78 },
    { category: 'M', value: 56 },
    { category: 'N', value: 90 },
    { category: 'O', value: 45 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'bar',
  data: [data],
  xField: 'category',
  yField: 'value',
  scrollbar: {
    visible: true,
    start: 0.2,
    end: 0.8,
    style: {
      trackColor: '#f0f0f0',
      thumbColor: '#d9d9d9'
    }
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 处理缩略轴配置
  const scrollbarVisible = settings.find(s => s.field === 'scrollbarVisible').value;
  const start = settings.find(s => s.field === 'start').value;
  const end = settings.find(s => s.field === 'end').value;
  
  if (option.scrollbar) {
    option.scrollbar.visible = scrollbarVisible;
    option.scrollbar.start = start;
    option.scrollbar.end = end;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 