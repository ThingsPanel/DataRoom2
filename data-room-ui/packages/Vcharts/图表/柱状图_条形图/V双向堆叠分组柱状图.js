// 配置版本号
const version = '2024051702';
// 标题
const title = 'V双向堆叠分组柱状图';
// 用于标识，唯一
const name = 'V双向堆叠分组柱状图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 基础类型仍是 bar

// 右侧配置项 (调整以适应双向条形图结构)
const setting = [
  { label: '类别轴字段 (Y)', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 date
  { label: '值轴字段 (X)', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  { label: '堆叠/颜色字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 group
  { label: '分组字段 (Y轴)', type: 'select', field: 'groupBy', optionField: '', multiple: false, value: '', tabName: 'data' }, // 对应 stack, 用于 dataHandler 分组
  { label: '指定分组为负值', type: 'input', field: 'negativeGroupValue', optionField: '', value: '', tabName: 'data' }, // 用于 dataHandler 指定哪一组的值变负
  { label: '柱子宽度', type: 'inputNumber', field: 'barWidth', optionField: 'series.0.barWidth', value: 20, tabName: 'custom', groupName: 'graph' },
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'barData',
  values: [
    { date: '2019-08-29', group: 'Cake', value: 154, stack: 'Dessert' },
    { date: '2019-08-29', group: 'Bread', value: 378, stack: 'Dessert' },
    { date: '2019-08-29', group: 'Tea', value: 103, stack: 'Drink' },
    { date: '2019-08-29', group: 'Coffee', value: 310, stack: 'Drink' },
    { date: '2019-08-29', group: 'Rib', value: 419, stack: 'Meat dishes' },
    { date: '2019-08-29', group: 'Crayfish', value: 810, stack: 'Meat dishes' },
    { date: '2019-08-30', group: 'Cake', value: 153, stack: 'Dessert' },
    { date: '2019-08-30', group: 'Bread', value: 398, stack: 'Dessert' },
    { date: '2019-08-30', group: 'Tea', value: 105, stack: 'Drink' },
    { date: '2019-08-30', group: 'Coffee', value: 298, stack: 'Drink' },
    { date: '2019-08-30', group: 'Rib', value: 416, stack: 'Meat dishes' },
    { date: '2019-08-30', group: 'Crayfish', value: 796, stack: 'Meat dishes' },
    // ... 更多数据 ...
  ]
};

// 默认 VChart Option (Spec) for Bidirectional Stacked Grouped Bar (Horizontal)
const option = {
  type: 'bar',
  data: { id: 'transformedData' }, // 使用 dataHandler 处理后的数据
  direction: 'horizontal', // 设置为水平方向 (条形图)
  xField: 'value', // 值轴
  yField: 'date',  // 类别轴
  seriesField: 'group', // 颜色/堆叠字段
  stack: true,
  axes: [
    { // Y 轴 (类别轴)
      orient: 'left',
      type: 'band',
      // bandField: 'stack', // 不直接用 bandField 分组，依赖 dataHandler 处理
      visible: true
    },
    { // X 轴 (值轴 - 底部，正值)
      orient: 'bottom',
      type: 'linear',
      visible: true,
      inverse: false // 正向
    },
    { // X 轴 (值轴 - 顶部，负值)
      orient: 'top',
      type: 'linear',
      visible: true,
      inverse: true // 反向
    }
  ],
  legends: { visible: true },
  tooltip: { visible: true, mark: { content: [] }, dimension: { content: [] } }
};

// 数据处理函数：根据 groupBy 字段的值，将 value 变为负数实现双向效果
const dataHandler = `
function processData(data, config) {
  const groupByField = config.setting.find(s => s.field === 'groupBy')?.value;
  const negativeGroup = config.setting.find(s => s.field === 'negativeGroupValue')?.value;
  
  if (!groupByField || !negativeGroup || !Array.isArray(data.values)) {
    // 如果没有配置分组字段或负值分组，或者数据格式不对，直接返回原始数据
    // 或者可以只返回空数据，避免图表渲染错误
    // return { id: 'transformedData', values: [] }; 
    return data; 
  }

  const transformedValues = data.values.map(item => {
    const newItem = { ...item };
    if (newItem[groupByField] === negativeGroup) {
      newItem[config.setting.find(s => s.field === 'xField').value] *= -1; // 将 xField (值轴) 设为负数
    }
    return newItem;
  });

  return {
    id: 'transformedData',
    values: transformedValues
  };
}
return processData(data, config);
`;

const optionHandler = ``;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 