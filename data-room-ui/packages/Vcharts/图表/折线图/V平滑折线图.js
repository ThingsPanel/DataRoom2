// 配置版本号
const version = '2024051715';
// 标题
const title = 'V平滑折线图';
// 用于标识，唯一
const name = 'V平滑折线图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项 (平滑折线图)
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 time
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  // 样式配置
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
    value: 'monotone', 
    tabName: 'custom', 
    groupName: 'graph' 
  },
  { label: '显示点', type: 'switch', field: 'pointVisible', optionField: 'point.visible', value: true, tabName: 'custom', groupName: 'graph' }, 
  { label: '点的大小', type: 'inputNumber', field: 'pointSize', optionField: 'point.style.size', value: 4, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '线的宽度', type: 'inputNumber', field: 'lineWidth', optionField: 'line.style.lineWidth', value: 2, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: false, tabName: 'custom', groupName: 'label' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'smoothLineData',
  values: [
    { time: '2:00', value: 38 }, { time: '4:00', value: 56 }, { time: '6:00', value: 10 },
    { time: '8:00', value: 70 }, { time: '10:00', value: 36 }, { time: '12:00', value: 94 },
    { time: '14:00', value: 24 }, { time: '16:00', value: 44 }, { time: '18:00', value: 36 },
    { time: '20:00', value: 68 }, { time: '22:00', value: 22 }
  ]
};

// 默认 VChart Option (Spec) for Smooth Line Chart
const option = {
  type: 'line',
  data: [data],
  xField: 'time',
  yField: 'value',
  line: { // 线配置
    style: {
      curveType: 'monotone', // 默认平滑
      lineWidth: 2
    }
  },
  point: { // 点配置
    visible: true,
    style: {
      size: 4
    }
  },
  label: { // 标签配置
    visible: false
  },
  axes: [ // 基础轴配置
    { orient: 'bottom', type: 'band', visible: true },
    { orient: 'left', type: 'linear', visible: true }
  ],
  legends: { visible: false },
  tooltip: { visible: true }
};

const dataHandler = `return data;`;
const optionHandler = ``; // curveType 直接通过 setting 控制，无需 handler

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 