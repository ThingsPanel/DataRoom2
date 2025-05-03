// 配置版本号
const version = '2024072420';
// 标题
const title = 'V坐标轴文本自动隐藏';
// 用于标识，唯一
const name = 'V坐标轴文本自动隐藏';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  // 坐标轴配置
  { 
    label: '标签自动隐藏', 
    type: 'switch', 
    field: 'labelAutoHide', 
    optionField: 'axes.0.label.autoHide', 
    value: true, 
    tabName: 'custom', 
    groupName: 'axis' 
  },
  { 
    label: '隐藏方式', 
    type: 'select', 
    field: 'autoHideMethod', 
    optionField: 'axes.0.label.autoHideMethod',
    options: [
      { label: '贪婪算法', value: 'greedy' },
      { label: '等距隐藏', value: 'equidistance' }
    ],
    value: 'greedy',
    tabName: 'custom',
    groupName: 'axis'
  },
  { 
    label: '最小间隔', 
    type: 'inputNumber', 
    field: 'autoHideSeparation', 
    optionField: 'axes.0.label.autoHideSeparation',
    value: 10,
    min: 0,
    max: 100,
    step: 1,
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
  id: 'autoHideData',
  values: [
    { x: '2021-12-21 2:00', y: 82 },
    { x: '2021-12-21 4:00', y: 50 },
    { x: '2021-12-21 6:00', y: 64 },
    { x: '2021-12-21 8:00', y: 30 },
    { x: '2021-12-21 10:00', y: 40 },
    { x: '2021-12-21 12:00', y: 40 },
    { x: '2021-12-21 14:00', y: 56 },
    { x: '2021-12-21 16:00', y: 40 },
    { x: '2021-12-21 18:00', y: 64 },
    { x: '2021-12-21 20:00', y: 74 },
    { x: '2021-12-21 22:00', y: 98 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'bar',
  data: [data],
  xField: 'x',
  yField: 'y',
  axes: [
    {
      orient: 'bottom',
      sampling: false,
      label: {
        autoHide: true,
        autoHideMethod: 'greedy',
        autoHideSeparation: 10
      }
    }
  ]
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // 处理标签自动隐藏
  const labelAutoHideSetting = config.setting.find(s => s.field === 'labelAutoHide');
  const autoHideMethodSetting = config.setting.find(s => s.field === 'autoHideMethod');
  const autoHideSeparationSetting = config.setting.find(s => s.field === 'autoHideSeparation');
  
  if (option.axes && option.axes[0]) {
    option.axes[0].label = option.axes[0].label || {};
    option.axes[0].label.autoHide = labelAutoHideSetting.value;
    option.axes[0].label.autoHideMethod = autoHideMethodSetting.value;
    option.axes[0].label.autoHideSeparation = autoHideSeparationSetting.value;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 