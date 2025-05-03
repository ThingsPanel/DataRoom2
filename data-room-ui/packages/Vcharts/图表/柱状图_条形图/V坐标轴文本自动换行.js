// 配置版本号
const version = '2024072418';
// 标题
const title = 'V坐标轴文本自动换行';
// 用于标识，唯一
const name = 'V坐标轴文本自动换行';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 柱状图

// 右侧配置项
const setting = [
  { label: '月份字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 month
  { label: '销售字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 sales
  // 样式配置 - Y轴
  { label: 'Y轴文本自动换行', type: 'switch', field: 'yAxisAutoWrap', optionField: 'axes.0.label.autoWrap', value: true, tabName: 'custom', groupName: 'yaxis' },
  { label: 'Y轴文本格式化', type: 'input', field: 'yAxisFormatter', optionField: 'axes.0.label.formatter', value: '+++_{label}_+++', tabName: 'custom', groupName: 'yaxis' },
  // 样式配置 - X轴
  { label: 'X轴文本自动换行', type: 'switch', field: 'xAxisAutoWrap', optionField: 'axes.1.label.autoWrap', value: true, tabName: 'custom', groupName: 'xaxis' },
  { label: 'X轴文本自动隐藏', type: 'switch', field: 'xAxisAutoHide', optionField: 'axes.1.label.autoHide', value: true, tabName: 'custom', groupName: 'xaxis' },
  { label: 'X轴最大行数', type: 'inputNumber', field: 'xAxisLineClamp', optionField: 'axes.1.label.style.lineClamp', value: 2, min: 1, max: 5, tabName: 'custom', groupName: 'xaxis' },
  { label: 'X轴最大高度(%)', type: 'inputNumber', field: 'xAxisMaxHeight', optionField: 'axes.1.maxHeight', value: 20, min: 1, max: 50, tabName: 'custom', groupName: 'xaxis' },
  { label: 'X轴文本格式化', type: 'input', field: 'xAxisFormatter', optionField: 'axes.1.label.formatter', value: '{label}_{label}', tabName: 'custom', groupName: 'xaxis' },
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
  id: 'axisTextWrapData',
  values: [
    { month: 'Monday', sales: 22 },
    { month: 'Tuesday', sales: 13 },
    { month: 'Wednesday', sales: 25 },
    { month: 'Thursday', sales: 29 },
    { month: 'Friday', sales: 38 }
  ]
};

// 默认 VChart Option (Spec) - 带文本自动换行的柱状图
const option = {
  type: 'bar',
  data: [data],
  xField: 'month',
  yField: 'sales',
  axes: [
    {
      orient: 'left',
      label: {
        autoWrap: true, // Y轴文本自动换行
        formatter: '++++++++++++++++++_{label}_++++++++++++++++++'
      }
    },
    {
      orient: 'bottom',
      maxHeight: '20%', // X轴高度限制为图表高度的20%
      sampling: false, // 禁用抽样
      label: {
        formatter: '{label}_{label}', // X轴文本格式化
        autoWrap: true, // X轴文本自动换行
        autoHide: true, // 如果文本太长无法显示，则自动隐藏
        style: {
          wordBreak: 'break-word', // 单词可以在任意字符间断行
          lineClamp: 2 // 最多显示2行
        }
      }
    }
  ]
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // 处理Y轴文本格式化
  const yAxisFormatterSetting = config.setting.find(s => s.field === 'yAxisFormatter');
  if (yAxisFormatterSetting && option.axes && option.axes[0] && option.axes[0].label) {
    option.axes[0].label.formatter = yAxisFormatterSetting.value || '{label}';
  }
  
  // 处理X轴文本格式化
  const xAxisFormatterSetting = config.setting.find(s => s.field === 'xAxisFormatter');
  if (xAxisFormatterSetting && option.axes && option.axes[1] && option.axes[1].label) {
    option.axes[1].label.formatter = xAxisFormatterSetting.value || '{label}';
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