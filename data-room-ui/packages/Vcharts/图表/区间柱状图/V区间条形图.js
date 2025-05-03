// 配置版本号
const version = '2024072420';
// 标题
const title = 'V区间条形图';
// 用于标识，唯一
const name = 'V区间条形图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'rangeColumn';

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  { label: '最小值字段', type: 'select', field: 'minField', optionField: 'xField.0', multiple: false, value: '', tabName: 'data' },
  { label: '最大值字段', type: 'select', field: 'maxField', optionField: 'xField.1', multiple: false, value: '', tabName: 'data' },
  // 图表方向
  { 
    label: '图表方向', 
    type: 'select', 
    field: 'direction', 
    optionField: 'direction',
    options: [
      { label: '水平', value: 'horizontal' },
      { label: '垂直', value: 'vertical' }
    ],
    value: 'horizontal',
    tabName: 'custom',
    groupName: 'basic'
  },
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
  id: 'rangeData',
  values: [
    { type: 'Category One', min: 76, max: 100 },
    { type: 'Category Two', min: 56, max: 108 },
    { type: 'Category Three', min: 38, max: 129 },
    { type: 'Category Four', min: 58, max: 155 },
    { type: 'Category Five', min: 45, max: 120 },
    { type: 'Category Six', min: 23, max: 99 },
    { type: 'Category Seven', min: 18, max: 56 },
    { type: 'Category Eight', min: 18, max: 34 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'rangeColumn',
  data: [data],
  direction: 'horizontal',
  yField: 'type',
  xField: ['min', 'max'],
  label: {
    visible: true
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 处理图表方向
  const direction = settings.find(s => s.field === 'direction').value;
  option.direction = direction;
  
  // 处理标签显示
  const labelVisible = settings.find(s => s.field === 'labelVisible').value;
  if (option.label) {
    option.label.visible = labelVisible;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 