// 配置版本号
const version = '2024072420';
// 标题
const title = 'V柱状图标签状态配置';
// 用于标识，唯一
const name = 'V柱状图标签状态配置';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  // 标签基础配置
  { 
    label: '显示标签', 
    type: 'switch', 
    field: 'labelVisible', 
    optionField: 'label.visible', 
    value: true, 
    tabName: 'custom', 
    groupName: 'label' 
  },
  { 
    label: '标签位置', 
    type: 'select', 
    field: 'labelPosition', 
    optionField: 'label.position',
    options: [
      { label: '顶部', value: 'top' },
      { label: '中间', value: 'middle' },
      { label: '底部', value: 'bottom' }
    ],
    value: 'top',
    tabName: 'custom',
    groupName: 'label'
  },
  // 默认状态
  { 
    label: '默认字体大小', 
    type: 'inputNumber', 
    field: 'defaultFontSize', 
    optionField: 'label.style.fontSize',
    value: 12,
    min: 8,
    max: 24,
    step: 1,
    tabName: 'custom',
    groupName: 'defaultState'
  },
  { 
    label: '默认字体颜色', 
    type: 'colorPicker', 
    field: 'defaultFontColor', 
    optionField: 'label.style.fill',
    value: '#666666',
    tabName: 'custom',
    groupName: 'defaultState'
  },
  // 悬停状态
  { 
    label: '悬停字体大小', 
    type: 'inputNumber', 
    field: 'hoverFontSize', 
    optionField: 'label.state.hover.fontSize',
    value: 14,
    min: 8,
    max: 24,
    step: 1,
    tabName: 'custom',
    groupName: 'hoverState'
  },
  { 
    label: '悬停字体颜色', 
    type: 'colorPicker', 
    field: 'hoverFontColor', 
    optionField: 'label.state.hover.fill',
    value: '#1890ff',
    tabName: 'custom',
    groupName: 'hoverState'
  },
  { 
    label: '悬停字体加粗', 
    type: 'switch', 
    field: 'hoverFontWeight', 
    optionField: 'label.state.hover.fontWeight', 
    value: true,
    active: 'bold',
    inactive: 'normal',
    tabName: 'custom',
    groupName: 'hoverState'
  },
  // 选中状态
  { 
    label: '选中字体大小', 
    type: 'inputNumber', 
    field: 'selectedFontSize', 
    optionField: 'label.state.selected.fontSize',
    value: 14,
    min: 8,
    max: 24,
    step: 1,
    tabName: 'custom',
    groupName: 'selectedState'
  },
  { 
    label: '选中字体颜色', 
    type: 'colorPicker', 
    field: 'selectedFontColor', 
    optionField: 'label.state.selected.fill',
    value: '#ff4d4f',
    tabName: 'custom',
    groupName: 'selectedState'
  },
  { 
    label: '选中字体加粗', 
    type: 'switch', 
    field: 'selectedFontWeight', 
    optionField: 'label.state.selected.fontWeight', 
    value: true,
    active: 'bold',
    inactive: 'normal',
    tabName: 'custom',
    groupName: 'selectedState'
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
  id: 'labelStateData',
  values: [
    { category: '产品A', value: 340, state: 'default' },
    { category: '产品B', value: 220, state: 'hover' },
    { category: '产品C', value: 280, state: 'selected' },
    { category: '产品D', value: 190, state: 'default' },
    { category: '产品E', value: 290, state: 'default' }
  ]
};

// 默认 VChart Option
const option = {
  type: 'bar',
  data: [data],
  xField: 'category',
  yField: 'value',
  label: {
    visible: true,
    position: 'top',
    style: {
      fontSize: 12,
      fill: '#666666'
    },
    state: {
      hover: {
        fontSize: 14,
        fill: '#1890ff',
        fontWeight: 'bold'
      },
      selected: {
        fontSize: 14,
        fill: '#ff4d4f',
        fontWeight: 'bold'
      }
    }
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 基础配置
  const labelVisible = settings.find(s => s.field === 'labelVisible').value;
  const labelPosition = settings.find(s => s.field === 'labelPosition').value;
  
  // 默认状态
  const defaultFontSize = settings.find(s => s.field === 'defaultFontSize').value;
  const defaultFontColor = settings.find(s => s.field === 'defaultFontColor').value;
  
  // 悬停状态
  const hoverFontSize = settings.find(s => s.field === 'hoverFontSize').value;
  const hoverFontColor = settings.find(s => s.field === 'hoverFontColor').value;
  const hoverFontWeight = settings.find(s => s.field === 'hoverFontWeight').value;
  
  // 选中状态
  const selectedFontSize = settings.find(s => s.field === 'selectedFontSize').value;
  const selectedFontColor = settings.find(s => s.field === 'selectedFontColor').value;
  const selectedFontWeight = settings.find(s => s.field === 'selectedFontWeight').value;
  
  // 更新配置
  option.label = {
    visible: labelVisible,
    position: labelPosition,
    style: {
      fontSize: defaultFontSize,
      fill: defaultFontColor
    },
    state: {
      hover: {
        fontSize: hoverFontSize,
        fill: hoverFontColor,
        fontWeight: hoverFontWeight ? 'bold' : 'normal'
      },
      selected: {
        fontSize: selectedFontSize,
        fill: selectedFontColor,
        fontWeight: selectedFontWeight ? 'bold' : 'normal'
      }
    }
  };
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 