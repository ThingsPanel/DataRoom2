// 配置版本号
const version = '2024051815';
// 标题
const title = 'V分组条形图动态标签位置';
// 用于标识，唯一
const name = 'V分组条形图动态标签位置';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 分组条形图

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  { label: '数值字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' },
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: true, tabName: 'custom', groupName: 'label' },
  { label: '标签偏移', type: 'inputNumber', field: 'labelOffset', optionField: 'label.offset', value: 0, min: -100, max: 100, tabName: 'custom', groupName: 'label' },
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.0.visible', value: true, tabName: 'custom', groupName: 'legend' },
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [{label: '浅色', value: 'light'}, {label: '深色', value: 'dark'}], value: 'light', tabName: 'custom', groupName: 'graph' },
  {
    label: 'Option覆盖',
    type: 'textarea',
    field: 'optionOverride',
    optionField: '',
    value: JSON.stringify({
      label: {
        position: `datum => { return datum.year === '2000' ? 'top-right' : 'bottom-right'; }`
      }
    }, null, 2),
    tabName: 'custom',
    groupName: 'graph'
  }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'dynamicLabelPosBarData',
  values: [
    { type: 'A', year: '2000', value: 16727 }, { type: 'B', year: '2000', value: 12546 },
    { type: 'C', year: '2000', value: 11085 }, { type: 'D', year: '2000', value: 13506 },
    { type: 'E', year: '2000', value: 5765 }, { type: 'A', year: '2010', value: 5546 },
    { type: 'B', year: '2010', value: 1505 }, { type: 'C', year: '2010', value: 8375 },
    { type: 'D', year: '2010', value: 3375 }, { type: 'E', year: '2010', value: 5960 }
  ]
};

// 默认 VChart Option (Spec) - 基础分组条形图
const option = {
  type: 'bar',
  data: [data],
  direction: 'horizontal',
  yField: 'year',
  xField: 'value',
  seriesField: 'type',
  label: {
    visible: true,
    offset: 0,
    // 默认标签位置，动态位置通过 override 实现
    position: 'right'
  },
  legends: { visible: true },
  axes: [
    { orient: 'left', type: 'band' },
    { orient: 'bottom', type: 'linear' }
  ]
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // 确保 override 中的函数字符串能正确解析和执行
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
};
