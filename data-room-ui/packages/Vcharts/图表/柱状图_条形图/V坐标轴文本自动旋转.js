// 配置版本号
const version = '2024072419';
// 标题
const title = 'V坐标轴文本自动旋转';
// 用于标识，唯一
const name = 'V坐标轴文本自动旋转';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 柱状图

// 右侧配置项
const setting = [
  { label: '月份字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 month
  { label: '销售字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 sales
  // 样式配置 - X轴
  { label: 'X轴文本自动旋转', type: 'switch', field: 'xAxisAutoRotate', optionField: 'axes.0.label.autoRotate', value: true, tabName: 'custom', groupName: 'xaxis' },
  { label: 'X轴最小旋转角度', type: 'inputNumber', field: 'xAxisMinRotateAngle', optionField: 'axes.0.label.autoRotateAngle.0', value: 0, min: 0, max: 90, tabName: 'custom', groupName: 'xaxis' },
  { label: 'X轴最大旋转角度', type: 'inputNumber', field: 'xAxisMaxRotateAngle', optionField: 'axes.0.label.autoRotateAngle.1', value: 90, min: 0, max: 90, tabName: 'custom', groupName: 'xaxis' },
  { label: 'X轴禁用抽样', type: 'switch', field: 'xAxisDisableSampling', optionField: 'axes.0.sampling', value: true, tabName: 'custom', groupName: 'xaxis' },
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
  id: 'axisTextRotateData',
  values: [
    { month: 'Monday', sales: 22 },
    { month: 'Tuesday', sales: 13 },
    { month: 'Wednesday', sales: 25 },
    { month: 'Thursday', sales: 29 },
    { month: 'Friday', sales: 38 }
  ]
};

// 默认 VChart Option (Spec) - 带文本自动旋转的柱状图
const option = {
  type: 'bar',
  data: [data],
  xField: 'month',
  yField: 'sales',
  axes: [
    {
      orient: 'bottom',
      sampling: false, // 禁用抽样
      label: {
        autoRotate: true, // X轴文本自动旋转
        autoRotateAngle: [0, 90] // 旋转角度范围：0到90度
      }
    }
  ]
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // 处理X轴旋转角度范围
  const minAngleSetting = config.setting.find(s => s.field === 'xAxisMinRotateAngle');
  const maxAngleSetting = config.setting.find(s => s.field === 'xAxisMaxRotateAngle');
  
  if (option.axes && option.axes[0] && option.axes[0].label) {
    // 初始化数组（如果不存在）
    if (!option.axes[0].label.autoRotateAngle) {
      option.axes[0].label.autoRotateAngle = [0, 90];
    }
    
    // 更新最小角度
    if (minAngleSetting) {
      option.axes[0].label.autoRotateAngle[0] = minAngleSetting.value;
    }
    
    // 更新最大角度
    if (maxAngleSetting) {
      option.axes[0].label.autoRotateAngle[1] = maxAngleSetting.value;
    }
    
    // 确保最小角度不大于最大角度
    if (option.axes[0].label.autoRotateAngle[0] > option.axes[0].label.autoRotateAngle[1]) {
      option.axes[0].label.autoRotateAngle[0] = option.axes[0].label.autoRotateAngle[1];
    }
  }
  
  // 处理抽样开关的反向逻辑 (true 表示禁用抽样，即 sampling: false)
  const xAxisDisableSamplingSetting = config.setting.find(s => s.field === 'xAxisDisableSampling');
  if (xAxisDisableSamplingSetting !== undefined && option.axes && option.axes[0]) {
    option.axes[0].sampling = !xAxisDisableSamplingSetting.value;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 