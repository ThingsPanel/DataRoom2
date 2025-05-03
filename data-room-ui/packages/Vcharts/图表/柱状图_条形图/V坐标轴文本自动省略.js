// 配置版本号
const version = '2024072417';
// 标题
const title = 'V坐标轴文本自动省略';
// 用于标识，唯一
const name = 'V坐标轴文本自动省略';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 柱状图

// 右侧配置项
const setting = [
  { label: '月份字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 month
  { label: '销售字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 sales
  // 样式配置 - Y轴
  { label: 'Y轴文本自动限制', type: 'switch', field: 'yAxisAutoLimit', optionField: 'axes.0.label.autoLimit', value: true, tabName: 'custom', groupName: 'yaxis' },
  { label: 'Y轴文本前缀', type: 'input', field: 'yAxisPrefix', optionField: 'axes.0.label.formatMethod', value: '', tabName: 'custom', groupName: 'yaxis' },
  // 样式配置 - X轴
  { label: 'X轴文本自动限制', type: 'switch', field: 'xAxisAutoLimit', optionField: 'axes.1.label.autoLimit', value: true, tabName: 'custom', groupName: 'xaxis' },
  { label: 'X轴文本自动旋转', type: 'switch', field: 'xAxisAutoRotate', optionField: 'axes.1.label.autoRotate', value: true, tabName: 'custom', groupName: 'xaxis' },
  { label: 'X轴最大高度(%)', type: 'inputNumber', field: 'xAxisMaxHeight', optionField: 'axes.1.maxHeight', value: 20, min: 1, max: 50, tabName: 'custom', groupName: 'xaxis' },
  { label: 'X轴禁用抽样', type: 'switch', field: 'xAxisDisableSampling', optionField: 'axes.1.sampling', value: true, tabName: 'custom', groupName: 'xaxis' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { 
    label: 'Option 覆盖 (JSON)', 
    type: 'textarea', 
    field: 'optionOverride', 
    optionField: '', 
    value: '{}',
    tabName: 'custom', 
    groupName: 'graph' 
  }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'axisTextEllipsisData',
  values: [
    { month: 'Monday', sales: 22 },
    { month: 'Tuesday', sales: 13 },
    { month: 'Wednesday', sales: 25 },
    { month: 'Thursday', sales: 29 },
    { month: 'Friday', sales: 38 }
  ]
};

// 默认 VChart Option (Spec) - 带文本自动省略的柱状图
const option = {
  type: 'bar',
  data: [data],
  xField: 'month',
  yField: 'sales',
  axes: [
    {
      orient: 'left',
      label: {
        autoLimit: true, // Y轴文本自动限制
        formatMethod: val => `+++++++++_${val}_+++++++++` // Y轴文本格式化
      }
    },
    {
      orient: 'bottom',
      maxHeight: '20%', // X轴高度限制为图表高度的20%
      sampling: false, // 禁用抽样
      label: {
        autoRotate: true, // X轴文本自动旋转
        autoLimit: true, // X轴文本自动限制
        autoRotateAngle: [0, 90] // 旋转角度范围
      }
    }
  ]
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // 处理Y轴文本前缀
  const yAxisPrefixSetting = config.setting.find(s => s.field === 'yAxisPrefix');
  if (yAxisPrefixSetting && option.axes && option.axes[0] && option.axes[0].label) {
    if (yAxisPrefixSetting.value && yAxisPrefixSetting.value.trim() !== '') {
      // 如果设置了前缀，使用前缀格式化
      const prefix = yAxisPrefixSetting.value;
      option.axes[0].label.formatMethod = val => \`\${prefix}\${val}\`;
    } else {
      // 如果没有设置前缀，直接显示原值
      option.axes[0].label.formatMethod = undefined;
    }
  }
  
  // 处理X轴最大高度
  const xAxisMaxHeightSetting = config.setting.find(s => s.field === 'xAxisMaxHeight');
  if (xAxisMaxHeightSetting && option.axes && option.axes[1]) {
    option.axes[1].maxHeight = \`\${xAxisMaxHeightSetting.value}%\`;
  }
  
  // 处理抽样开关的反向逻辑 (true 表示禁用抽样，即 sampling: false)
  const xAxisDisableSamplingSetting = config.setting.find(s => s.field === 'xAxisDisableSampling');
  if (xAxisDisableSamplingSetting !== undefined && option.axes && option.axes[1]) {
    option.axes[1].sampling = !xAxisDisableSamplingSetting.value;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 