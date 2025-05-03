// 配置版本号
const version = '2024051808';
// 标题
const title = 'V分组柱状图Tooltip格式化';
// 用于标识，唯一
const name = 'V分组柱状图Tooltip格式化';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 分组柱状图

// 右侧配置项
const setting = [
  { label: '类别字段1', type: 'select', field: 'xFieldOuter', optionField: 'xField.0', multiple: false, value: '', tabName: 'data' }, // 对应 year
  { label: '类别字段2/系列', type: 'select', field: 'xFieldInner', optionField: 'xField.1', multiple: false, value: '', tabName: 'data' }, // 对应 type (也作为 seriesField)
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 type
  // 样式配置
  { label: '启用Tooltip', type: 'switch', field: 'tooltipVisible', optionField: 'tooltip.visible', value: true, tabName: 'custom', groupName: 'tooltip' },
  { label: 'Tooltip可进入', type: 'switch', field: 'tooltipEnterable', optionField: 'tooltip.enterable', value: true, tabName: 'custom', groupName: 'tooltip' },
  { label: 'Tooltip最大高度', type: 'inputNumber', field: 'tooltipMaxHeight', optionField: 'tooltip.style.maxContentHeight', value: 120, min: 0, tabName: 'custom', groupName: 'tooltip' },
  // Tooltip 格式化逻辑复杂，建议通过 optionOverride 实现
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.0.visible', value: true, tabName: 'custom', groupName: 'legend' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', 
    value: JSON.stringify({
      tooltip: {
        mark: {
          title: { value: `datum => \`Y\${datum[\'year\']}\`` },
          content: [
            { key: `datum => datum[\'type\']`, value: `datum => datum[\'value\']` },
            { hasShape: false, key: 'Proportion', value: `datum => { /* 计算总和的逻辑需要在此处或外部定义 aggregation */ const total = 1000; return Math.round((datum[\'value\'] / total) * 10000) / 100 + \'%\'; }` }
          ]
        },
        dimension: {
          title: { value: `datum => \`Y\${datum[\'year\']} (mouse scrolling available)\`` },
          content: [
            { key: `datum => datum[\'type\']`, value: `datum => datum[\'value\']` },
            { hasShape: false, key: `datum => datum[\'type\'] + \' Proportion\'`, value: `datum => { /* 计算总和的逻辑需要在此处或外部定义 aggregation */ const total = 1000; return Math.round((datum[\'value\'] / total) * 10000) / 100 + \'%\'; }` }
          ]
        }
      }
    }, null, 2),
    tabName: 'custom', groupName: 'graph' 
  }
];

// 示例数据 (需要包含 year, type, value)
const data = {
  id: 'tooltipFormatData',
  values: [
    { year: '2012', type: 'Forest', value: 900 }, { year: '2012', type: 'Steppe', value: 1100 }, { year: '2012', type: 'Desert', value: 1500 }, { year: '2012', type: 'Wetland', value: 200 },
    { year: '2013', type: 'Forest', value: 1000 }, { year: '2013', type: 'Steppe', value: 1000 }, { year: '2013', type: 'Desert', value: 1300 }, { year: '2013', type: 'Wetland', value: 300 },
    // ...更多数据
  ]
};

// 默认 VChart Option (Spec)
const option = {
  type: 'bar',
  data: [data],
  xField: ['year', 'type'],
  yField: 'value',
  seriesField: 'type',
  legends: { visible: true },
  tooltip: {
    visible: true,
    enterable: true,
    style: { maxContentHeight: 120 },
    // 默认 Tooltip，格式化通过 override 实现
  },
  axes: [
    { orient: 'bottom', type: 'band' },
    { orient: 'left', type: 'linear' }
  ]
};

const dataHandler = `return data;`;
// 格式化依赖外部数据 (aggregation)，需要在 optionHandler 或 override 中处理
const optionHandler = `
function handleOption(option, config) {
  // 复杂的 tooltip 格式化建议通过 override 实现
  // 如果要在 override 中使用函数字符串，需要确保执行环境能访问到所需变量（如 aggregation）
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 