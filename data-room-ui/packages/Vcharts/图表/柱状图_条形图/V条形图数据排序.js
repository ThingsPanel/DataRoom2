// 配置版本号
const version = '2024051814';
// 标题
const title = 'V条形图数据排序';
// 用于标识，唯一
const name = 'V条形图数据排序';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 条形图

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 industry
  { label: '数值字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 gdp
  // 样式配置
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: false, tabName: 'custom', groupName: 'label' },
  // 数据排序建议通过 optionOverride 实现
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { 
    label: 'Option 覆盖 (JSON)', 
    type: 'textarea', 
    field: 'optionOverride', 
    optionField: '', 
    // 提供数据排序示例
    value: JSON.stringify({
      data: [{
        // 需要确保 id 与 option.data[0].id 匹配
        id: 'sortedBarData', 
        fields: {
          // 假设按数值字段 'gdp' 降序排列
          gdp: { sortIndex: 1, sortReverse: true }
        }
      }]
    }, null, 2),
    tabName: 'custom', 
    groupName: 'graph' 
  }
];

// 示例数据 (来自参考 spec，无排序)
const data = {
  id: 'sortedBarData', // 确保 ID 与 override 中的匹配
  values: [
    { industry: 'Agriculture, Forestry, Animal Husbandry and Fishery', gdp: 92582 },
    { industry: 'Industry', gdp: 401644 },
    { industry: 'manufacturing', gdp: 335215 },
    { industry: 'construction industry', gdp: 83383 },
    { industry: 'Wholesale and retail trade', gdp: 114518 },
    { industry: 'Transportation, storage and postal industry', gdp: 49674 },
    { industry: 'accommodation and catering industry', gdp: 17855 },
    { industry: 'financial industry', gdp: 96811 },
    { industry: 'real estate', gdp: 73821 },
    { industry: 'information transmission, software and information technology services', gdp: 1247934 },
    { industry: 'leasing and business services', gdp: 39153 },
    { industry: 'Other industries', gdp: 192831 }
  ]
};

// 默认 VChart Option (Spec) - 基础水平条形图
const option = {
  type: 'bar',
  data: [data], // 引用数据对象
  direction: 'horizontal',
  xField: 'gdp',
  yField: 'industry',
  label: { visible: false },
  axes: [
    { orient: 'left', type: 'band' },
    { orient: 'bottom', type: 'linear' }
  ]
  // 排序在 override 的 data.fields 中定义
};

const dataHandler = `return data;`;
// Option 处理函数：确保 override 中的 data id 正确，并且 fields 中的字段名与 xField/yField 匹配
const optionHandler = `
function handleOption(option, config) {
  // 排序逻辑由 override 控制，这里可做一些校验或适配
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 