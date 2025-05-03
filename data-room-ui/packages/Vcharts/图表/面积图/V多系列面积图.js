// 配置版本号
const version = '2024051729';
// 标题
const title = 'V多系列面积图';
// 用于标识，唯一
const name = 'V多系列面积图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'area';

// 右侧配置项 (多系列面积图)
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 time
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 type
  // 样式配置
  { label: '禁用堆叠', type: 'switch', field: 'stack', optionField: 'stack', value: false, tabName: 'custom', groupName: 'graph' }, // 多系列通常不堆叠
  { 
    label: '曲线类型', 
    type: 'select', 
    field: 'curveType', 
    optionField: 'line.style.curveType', 
    options: [
      { label: '直线', value: 'linear' }, 
      { label: '平滑 (monotone)', value: 'monotone' },
      { label: '平滑 (basis)', value: 'basis' }, 
      { label: '阶梯', value: 'step' }, 
      { label: '阶梯 (前)', value: 'stepBefore' }, 
      { label: '阶梯 (后)', value: 'stepAfter' }
    ], 
    value: 'monotone', // 参考 spec 使用了 monotone
    tabName: 'custom', 
    groupName: 'graph' 
  },
  { label: '显示点', type: 'switch', field: 'pointVisible', optionField: 'point.visible', value: false, tabName: 'custom', groupName: 'graph' },
  { label: '面积透明度', type: 'inputNumber', field: 'areaOpacity', optionField: 'area.style.fillOpacity', value: 0.1, min: 0, max: 1, step: 0.1, tabName: 'custom', groupName: 'graph' }, // 参考 spec 使用了 0.1
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.0.visible', value: true, tabName: 'custom', groupName: 'legend' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'multiAreaChartData',
  values: [
    { time: '0:00', value: 0, type: 'A' }, { time: '1:00', value: 1000, type: 'A' },
    { time: '2:00', value: 4500, type: 'A' }, { time: '3:00', value: 6000, type: 'A' },
    { time: '4:00', value: 4500, type: 'A' }, { time: '5:00', value: 1000, type: 'A' },
    { time: '6:00', value: 0, type: 'A' },
    { time: '4:00', value: 0, type: 'B' }, { time: '5:00', value: 1000, type: 'B' },
    { time: '6:00', value: 7000, type: 'B' }, { time: '7:00', value: 8500, type: 'B' },
    { time: '8:00', value: 7000, type: 'B' }, { time: '9:00', value: 1000, type: 'B' },
    { time: '10:00', value: 0, type: 'B' },
    { time: '8:00', value: 0, type: 'C' }, { time: '9:00', value: 1000, type: 'C' },
    { time: '10:00', value: 6500, type: 'C' }, { time: '11:00', value: 8000, type: 'C' },
    { time: '12:00', value: 6500, type: 'C' }, { time: '13:00', value: 1000, type: 'C' },
    { time: '14:00', value: 0, type: 'C' }
  ]
};

// 默认 VChart Option (Spec) for Multi Series Area Chart
const option = {
  type: 'area',
  data: [data],
  xField: 'time',
  yField: 'value',
  seriesField: 'type',
  stack: false, // 不堆叠
  point: { visible: false },
  line: {
    visible: true,
    style: {
      curveType: 'monotone' // 平滑曲线
    }
  },
  area: {
    visible: true,
    style: {
      fillOpacity: 0.1 // 较低的透明度以显示重叠
    }
  },
  axes: [
    { orient: 'bottom', type: 'band' }, // 假设 time 是类别轴
    { orient: 'left', type: 'linear' }
  ],
  legends: [{ visible: true, position: 'middle', orient: 'bottom' }],
  tooltip: { visible: true }
  // 移除参考 spec 中的 markLine，简化配置
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // stack 状态由 setting 控制
  const stackSetting = config.setting.find(s => s.field === 'stack');
  if (stackSetting) {
    option.stack = stackSetting.value;
  }
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 