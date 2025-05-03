// 配置版本号
const version = '2024072420';
// 标题
const title = 'V纵排轴标签';
// 用于标识，唯一
const name = 'V纵排轴标签';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  // 标签配置
  { 
    label: '标签方向', 
    type: 'select', 
    field: 'labelDirection', 
    optionField: 'axes.0.label.style.direction',
    options: [
      { label: '水平', value: 'horizontal' },
      { label: '垂直', value: 'vertical' }
    ],
    value: 'vertical',
    tabName: 'custom',
    groupName: 'label'
  },
  { 
    label: '标签对齐', 
    type: 'select', 
    field: 'labelAlign', 
    optionField: 'axes.0.label.style.textAlign',
    options: [
      { label: '左对齐', value: 'left' },
      { label: '居中', value: 'center' },
      { label: '右对齐', value: 'right' }
    ],
    value: 'center',
    tabName: 'custom',
    groupName: 'label'
  },
  { 
    label: '字体大小', 
    type: 'inputNumber', 
    field: 'fontSize', 
    optionField: 'axes.0.label.style.fontSize',
    value: 12,
    min: 8,
    max: 24,
    step: 1,
    tabName: 'custom',
    groupName: 'label'
  },
  { 
    label: '字体颜色', 
    type: 'colorPicker', 
    field: 'fontColor', 
    optionField: 'axes.0.label.style.fill',
    value: '#666666',
    tabName: 'custom',
    groupName: 'label'
  },
  { 
    label: '标签间距', 
    type: 'inputNumber', 
    field: 'labelSpace', 
    optionField: 'axes.0.label.space',
    value: 8,
    min: 0,
    max: 50,
    step: 1,
    tabName: 'custom',
    groupName: 'label'
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
  id: 'verticalLabelData',
  values: [
    { category: '第一季度销售额', value: 2500 },
    { category: '第二季度销售额', value: 3500 },
    { category: '第三季度销售额', value: 4200 },
    { category: '第四季度销售额', value: 3800 },
    { category: '年度累计销售额', value: 14000 }
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
      orient: 'bottom',
      label: {
        space: 8,
        style: {
          direction: 'vertical',
          textAlign: 'center',
          fontSize: 12,
          fill: '#666666'
        }
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
    const labelDirection = settings.find(s => s.field === 'labelDirection').value;
    const labelAlign = settings.find(s => s.field === 'labelAlign').value;
    const fontSize = settings.find(s => s.field === 'fontSize').value;
    const fontColor = settings.find(s => s.field === 'fontColor').value;
    const labelSpace = settings.find(s => s.field === 'labelSpace').value;
    
    // 更新标签配置
    axis.label = axis.label || {};
    axis.label.space = labelSpace;
    axis.label.style = {
      direction: labelDirection,
      textAlign: labelAlign,
      fontSize: fontSize,
      fill: fontColor
    };
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 