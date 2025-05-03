// 配置版本号
const version = '2024051809';
// 标题
const title = 'V纵向滚动条';
// 用于标识，唯一
const name = 'V纵向滚动条';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 条形图

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 year
  { label: '数值字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 sales
  // 样式配置
  { 
    label: '滚动条位置', 
    type: 'select', 
    field: 'scrollBarOrient', 
    optionField: 'scrollBar.0.orient', 
    options: [{label:'左侧', value:'left'}, {label:'右侧', value:'right'}], 
    value: 'right', 
    tabName: 'custom', 
    groupName: 'scrollBar' 
  },
  { label: '允许漫游', type: 'switch', field: 'scrollBarRoam', optionField: 'scrollBar.0.roam', value: true, tabName: 'custom', groupName: 'scrollBar' },
  // startValue / endValue 比 start / end 优先级高，这里暴露 startValue / endValue
  { label: '起始值', type: 'input', field: 'scrollBarStartValue', optionField: 'scrollBar.0.startValue', value: '2011', tabName: 'custom', groupName: 'scrollBar' },
  { label: '结束值', type: 'input', field: 'scrollBarEndValue', optionField: 'scrollBar.0.endValue', value: '2014', tabName: 'custom', groupName: 'scrollBar' },
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: false, tabName: 'custom', groupName: 'label' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'verticalScrollBarData',
  values: [
    { year: '2000', sales: 22 }, { year: '2001', sales: 13 }, { year: '2002', sales: 25 },
    { year: '2003', sales: 29 }, { year: '2004', sales: 38 }, { year: '2005', sales: 49 },
    { year: '2006', sales: 58 }, { year: '2007', sales: 29 }, { year: '2008', sales: 78 },
    { year: '2009', sales: 19 }, { year: '2010', sales: 23 }, { year: '2011', sales: 20 },
    { year: '2012', sales: 98 }, { year: '2013', sales: 49 }, { year: '2014', sales: 28 }
  ]
};

// 默认 VChart Option (Spec)
const option = {
  type: 'bar',
  data: [data],
  direction: 'horizontal',
  yField: 'year',
  xField: 'sales',
  scrollBar: [
    {
      orient: 'right', // 可配置
      // 优先使用 startValue/endValue
      startValue: '2011', // 可配置
      endValue: '2014', // 可配置
      roam: true // 可配置
    }
  ],
  label: { visible: false },
  axes: [
    { orient: 'bottom', type: 'linear' },
    { orient: 'left', type: 'band' }
  ]
};

const dataHandler = `return data;`;
// Option 处理函数：确保 startValue/endValue 生效时，清除 start/end
const optionHandler = `
function handleOption(option, config) {
  const scrollBar = option.scrollBar && option.scrollBar[0];
  if (!scrollBar) return option;

  const startValueSetting = config.setting.find(s => s.field === 'scrollBarStartValue');
  const endValueSetting = config.setting.find(s => s.field === 'scrollBarEndValue');

  // 如果设置了 startValue 或 endValue，则清除 start 和 end，因为 value 优先级更高
  if (startValueSetting?.value || endValueSetting?.value) {
    delete scrollBar.start;
    delete scrollBar.end;
    if (startValueSetting) { scrollBar.startValue = startValueSetting.value; }
    if (endValueSetting) { scrollBar.endValue = endValueSetting.value; }
  } else {
    // 如果没有设置 value，则使用 start/end 百分比
    delete scrollBar.startValue;
    delete scrollBar.endValue;
    const startSetting = config.setting.find(s => s.field === 'scrollBarStart'); // 假设有 start/end 设置项
    const endSetting = config.setting.find(s => s.field === 'scrollBarEnd');
    if (startSetting) { scrollBar.start = startSetting.value; }
    if (endSetting) { scrollBar.end = endSetting.value; }
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 