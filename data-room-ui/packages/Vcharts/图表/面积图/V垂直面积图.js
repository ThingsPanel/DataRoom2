// 配置版本号
const version = '2024051727';
// 标题
const title = 'V垂直面积图';
// 用于标识，唯一
const name = 'V垂直面积图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'area';

// 右侧配置项 (垂直面积图)
const setting = [
  // 注意：由于 direction: 'horizontal'，X/Y 字段在 VChart Spec 中是反的
  { label: '类别轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 time (在图中是垂直轴)
  { label: '数值轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 value (在图中是水平轴)
  // 样式配置
  { label: '显示点', type: 'switch', field: 'pointVisible', optionField: 'point.visible', value: false, tabName: 'custom', groupName: 'graph' },
  { label: '点的大小', type: 'inputNumber', field: 'pointSize', optionField: 'point.style.size', value: 4, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '线的宽度', type: 'inputNumber', field: 'lineWidth', optionField: 'line.style.lineWidth', value: 2, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '显示面积填充', type: 'switch', field: 'areaVisible', optionField: 'area.visible', value: true, tabName: 'custom', groupName: 'graph' },
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: false, tabName: 'custom', groupName: 'label' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'verticalAreaData',
  values: [
    { time: '2:00', value: 8 }, { time: '4:00', value: 9 }, { time: '6:00', value: 11 },
    { time: '8:00', value: 14 }, { time: '10:00', value: 16 }, { time: '12:00', value: 17 },
    { time: '14:00', value: 17 }, { time: '16:00', value: 16 }, { time: '18:00', value: 15 }
  ]
};

// 默认 VChart Option (Spec) for Vertical Area Chart (using direction: 'horizontal')
const option = {
  type: 'area',
  data: [data],
  direction: 'horizontal', // 关键配置：使图表水平布局
  xField: 'value', // 数值轴
  yField: 'time', // 类别轴
  point: {
    visible: false,
    style: { size: 4 }
  },
  line: {
    visible: true,
    style: { lineWidth: 2 }
  },
  area: {
    visible: true
  },
  label: {
    visible: false
  },
  axes: [ // 调整轴的方向
    { orient: 'bottom', type: 'linear', visible: true }, // 数值轴 (xField)
    { orient: 'left', type: 'band', visible: true } // 类别轴 (yField)
  ],
  legends: { visible: false },
  tooltip: { visible: true }
};

const dataHandler = `return data;`;
const optionHandler = ``;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 