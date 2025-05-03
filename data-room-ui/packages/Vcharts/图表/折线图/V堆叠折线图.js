// 配置版本号
const version = '2024051713';
// 标题
const title = 'V堆叠折线图';
// 用于标识，唯一
const name = 'V堆叠折线图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项 (堆叠折线图)
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 type
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 country
  // 样式配置
  { label: '启用堆叠', type: 'switch', field: 'stack', optionField: 'stack', value: true, tabName: 'custom', groupName: 'graph' },
  { label: '显示系列标签', type: 'switch', field: 'lineLabelVisible', optionField: 'lineLabel.visible', value: true, tabName: 'custom', groupName: 'label' },
  { label: '显示点', type: 'switch', field: 'pointVisible', optionField: 'point.visible', value: true, tabName: 'custom', groupName: 'graph' }, // 堆叠图通常显示点
  { label: '点的大小', type: 'inputNumber', field: 'pointSize', optionField: 'point.style.size', value: 4, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '线的宽度', type: 'inputNumber', field: 'lineWidth', optionField: 'line.style.lineWidth', value: 2, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.0.visible', value: true, tabName: 'custom', groupName: 'legend' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'stackedLineData',
  values: [
    { type: 'Nail polish', country: 'Africa', value: 4229 }, { type: 'Nail polish', country: 'EU', value: 4376 },
    { type: 'Nail polish', country: 'China', value: 3054 }, { type: 'Nail polish', country: 'USA', value: 12814 },
    { type: 'Eyebrow pencil', country: 'Africa', value: 3932 }, { type: 'Eyebrow pencil', country: 'EU', value: 3987 },
    { type: 'Eyebrow pencil', country: 'China', value: 5067 }, { type: 'Eyebrow pencil', country: 'USA', value: 13012 },
    { type: 'Rouge', country: 'Africa', value: 5221 }, { type: 'Rouge', country: 'EU', value: 3574 },
    { type: 'Rouge', country: 'China', value: 7004 }, { type: 'Rouge', country: 'USA', value: 11624 },
    // ... 更多数据 ...
    { type: 'Mascara', country: 'Africa', value: 18712 }, { type: 'Mascara', country: 'EU', value: 6134 },
    { type: 'Mascara', country: 'China', value: 10419 }, { type: 'Mascara', country: 'USA', value: 11261 }
  ]
};

// 默认 VChart Option (Spec) for Stacked Line Chart
const option = {
  type: 'line',
  data: [data],
  stack: true, // 启用堆叠
  xField: 'type',
  yField: 'value',
  seriesField: 'country',
  lineLabel: { // 系列标签配置
    visible: true // 默认显示
  },
  point: { // 点配置
    visible: true, // 默认显示点
    style: {
      size: 4
    }
  },
  line: { // 线配置
    style: {
      lineWidth: 2
    }
  },
  axes: [ // 基础轴配置
    { orient: 'bottom', type: 'band', visible: true },
    { orient: 'left', type: 'linear', visible: true }
  ],
  legends: [{ // 图例配置 (保留 spec 中的结构)
    visible: true,
    position: 'middle',
    orient: 'bottom'
  }],
  tooltip: { visible: true }
};

const dataHandler = `return data;`;
const optionHandler = ``;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 