// 配置版本号
const version = '2024051707';
// 标题
const title = 'V带背景的柱状图';
// 用于标识，唯一
const name = 'V带背景的柱状图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项 (复合 X 轴 + 背景)
const setting = [
  { label: '类别轴字段1 (X)', type: 'select', field: 'xField1', optionField: 'xField.0', multiple: false, value: '', tabName: 'data' }, // 对应 date
  { label: '类别轴字段2 (X)', type: 'select', field: 'xField2', optionField: 'xField.1', multiple: false, value: '', tabName: 'data' }, // 对应 stack
  { label: '类别轴字段3 (X)', type: 'select', field: 'xField3', optionField: 'xField.2', multiple: false, value: '', tabName: 'data' }, // 对应 group
  { label: '值轴字段 (Y)', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  { label: '颜色/图例字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 group
  // 样式配置
  { label: '启用柱子背景', type: 'switch', field: 'barBgVisible', optionField: 'barBackground.visible', value: true, tabName: 'custom', groupName: 'graph' },
  { label: '背景填充色', type: 'color', field: 'barBgFill', optionField: 'barBackground.style.fill', value: 'rgba(255,255,255,0.15)', tabName: 'custom', groupName: 'graph' },
  { label: '背景描边宽度', type: 'inputNumber', field: 'barBgLineWidth', optionField: 'barBackground.style.lineWidth', value: 0, min: 0, tabName: 'custom', groupName: 'graph' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'barData',
  values: [
    { date: '2019-08-29', group: 'A', value: 154, stack: 'Dessert' }, { date: '2019-08-29', group: 'B', value: 378, stack: 'Dessert' },
    { date: '2019-08-29', group: 'A', value: 103, stack: 'Drink' },   { date: '2019-08-29', group: 'B', value: 310, stack: 'Drink' },
    { date: '2019-08-30', group: 'A', value: 153, stack: 'Dessert' }, { date: '2019-08-30', group: 'B', value: 398, stack: 'Dessert' },
    { date: '2019-08-30', group: 'A', value: 105, stack: 'Drink' },   { date: '2019-08-30', group: 'B', value: 298, stack: 'Drink' },
    { date: '2019-08-31', group: 'A', value: 151, stack: 'Dessert' }, { date: '2019-08-31', group: 'B', value: 408, stack: 'Dessert' },
    { date: '2019-08-31', group: 'A', value: 110, stack: 'Drink' },   { date: '2019-08-31', group: 'B', value: 302, stack: 'Drink' }
  ]
};

// 默认 VChart Option (Spec) for Bar Chart with Background
const option = {
  type: 'bar',
  data: [data],
  xField: ['date', 'stack', 'group'], // 复合 X 轴
  yField: 'value',
  seriesField: 'group',
  stack: true,
  barBackground: { // 柱子背景配置
    visible: true,
    fieldLevel: 0, // 背景应用于第一层分组
    style: {
      lineWidth: 0,
      fill: 'rgba(255,255,255,0.15)' // 默认背景色
    }
  },
  axes: [
    { // Y 轴
      orient: 'left',
      type: 'linear',
      visible: true,
      title: { visible: false }, // 默认不显示标题，简化配置
      tick: { tickCount: 5 } // 减少刻度数量，保持简洁
    },
    { // X 轴
      orient: 'bottom',
      type: 'band',
      visible: true,
      // showAllGroupLayers: true // 默认即可，无需显式设置
    }
  ],
  legends: { visible: true }, // 显示图例
  tooltip: { visible: true }, // 保持 tooltip 可见
  // animation: false // 默认启用动画
};

const dataHandler = `return data;`;
const optionHandler = ``; // 背景色通过 setting 控制，无需 handler

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 