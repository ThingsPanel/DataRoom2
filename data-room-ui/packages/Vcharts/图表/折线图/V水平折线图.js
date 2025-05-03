// 配置版本号
const version = '2024051719';
// 标题
const title = 'V水平折线图';
// 用于标识，唯一
const name = 'V水平折线图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项 (水平折线图)
const setting = [
  { label: '类别轴字段 (Y)', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 time
  { label: '值轴字段 (X)', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  // 样式配置
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
  id: 'horizontalLineData',
  values: [
    { time: '2:00', value: 8 }, { time: '4:00', value: 9 }, { time: '6:00', value: 11 },
    { time: '8:00', value: 14 }, { time: '10:00', value: 16 }, { time: '12:00', value: 17 },
    { time: '14:00', value: 17 }, { time: '16:00', value: 16 }, { time: '18:00', value: 15 }
  ]
};

// 默认 VChart Option (Spec) for Horizontal Line Chart
const option = {
  type: 'line',
  data: [data],
  direction: 'horizontal', // 水平方向
  xField: 'value', // 值轴为 X 轴
  yField: 'time',  // 类别轴为 Y 轴
  point: { // 点配置
    visible: true,
    style: {
      size: 4
    }
  },
  line: { // 线配置
    style: {
      lineWidth: 2
    }
  },
  label: { // 标签配置
    visible: false
  },
  axes: [ // 轴配置 (匹配水平方向)
    { orient: 'left', type: 'band', visible: true }, // Y 轴 (类别)
    { orient: 'bottom', type: 'linear', visible: true } // X 轴 (值)
  ],
  legends: { visible: false },
  tooltip: { visible: true }
};

const dataHandler = `return data;`;
const optionHandler = ``;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 