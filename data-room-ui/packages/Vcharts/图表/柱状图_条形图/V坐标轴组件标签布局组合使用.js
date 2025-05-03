// 配置版本号
const version = '2024072420';
// 标题
const title = 'V坐标轴组件标签布局组合使用';
// 用于标识，唯一
const name = 'V坐标轴组件标签布局组合使用';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  // 坐标轴标签布局配置
  { 
    label: '自动旋转', 
    type: 'switch', 
    field: 'autoRotate', 
    optionField: 'axes.0.label.autoRotate', 
    value: true, 
    tabName: 'custom', 
    groupName: 'axis' 
  },
  { 
    label: '旋转角度', 
    type: 'inputNumber', 
    field: 'rotateAngle', 
    optionField: 'axes.0.label.rotateAngle',
    value: 45,
    min: -90,
    max: 90,
    step: 5,
    tabName: 'custom',
    groupName: 'axis',
    when: (value, settings) => settings.find(s => s.field === 'autoRotate').value
  },
  { 
    label: '自动隐藏', 
    type: 'switch', 
    field: 'autoHide', 
    optionField: 'axes.0.label.autoHide', 
    value: true, 
    tabName: 'custom', 
    groupName: 'axis' 
  },
  { 
    label: '自动省略', 
    type: 'switch', 
    field: 'autoLimit', 
    optionField: 'axes.0.label.autoLimit', 
    value: true, 
    tabName: 'custom', 
    groupName: 'axis' 
  },
  { 
    label: '最大高度占比', 
    type: 'inputNumber', 
    field: 'maxHeightRatio', 
    optionField: 'axes.0.maxHeight',
    value: 20,
    min: 0,
    max: 100,
    step: 5,
    formatter: value => `${value}%`,
    parser: value => value.replace('%', ''),
    tabName: 'custom',
    groupName: 'axis'
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
  id: 'labelLayoutData',
  values: [
    { month: '非常长的一月份标签', sales: 22 },
    { month: '非常长的二月份标签', sales: 13 },
    { month: '非常长的三月份标签', sales: 25 },
    { month: '非常长的四月份标签', sales: 29 },
    { month: '非常长的五月份标签', sales: 38 },
    { month: '非常长的六月份标签', sales: 42 },
    { month: '非常长的七月份标签', sales: 35 },
    { month: '非常长的八月份标签', sales: 31 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'bar',
  data: [data],
  xField: 'month',
  yField: 'sales',
  axes: [
    {
      orient: 'bottom',
      maxHeight: '20%',
      sampling: false,
      label: {
        autoRotate: true,
        autoLimit: true,
        autoHide: true,
        autoRotateAngle: [0, 45, 90],
        style: {
          fontSize: 12,
          fill: '#666'
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
    const autoRotate = settings.find(s => s.field === 'autoRotate').value;
    const rotateAngle = settings.find(s => s.field === 'rotateAngle').value;
    const autoHide = settings.find(s => s.field === 'autoHide').value;
    const autoLimit = settings.find(s => s.field === 'autoLimit').value;
    const maxHeightRatio = settings.find(s => s.field === 'maxHeightRatio').value;
    
    // 更新标签配置
    axis.label = axis.label || {};
    axis.label.autoRotate = autoRotate;
    axis.label.autoRotateAngle = autoRotate ? [0, rotateAngle] : [0];
    axis.label.autoHide = autoHide;
    axis.label.autoLimit = autoLimit;
    
    // 更新最大高度
    axis.maxHeight = \`\${maxHeightRatio}%\`;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 