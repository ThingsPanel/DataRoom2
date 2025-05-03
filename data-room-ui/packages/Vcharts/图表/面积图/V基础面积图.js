// 配置版本号
const version = '2024051720';
// 标题
const title = 'V基础面积图';
// 用于标识，唯一
const name = 'V基础面积图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'area'; // 修改为 area

// 右侧配置项 (基础面积图)
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 time
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  // 样式配置
  { label: '显示点', type: 'switch', field: 'pointVisible', optionField: 'point.visible', value: false, tabName: 'custom', groupName: 'graph' }, // 面积图默认不显示点
  { label: '点的大小', type: 'inputNumber', field: 'pointSize', optionField: 'point.style.size', value: 4, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '线的宽度', type: 'inputNumber', field: 'lineWidth', optionField: 'line.style.lineWidth', value: 2, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '显示面积填充', type: 'switch', field: 'areaVisible', optionField: 'area.visible', value: true, tabName: 'custom', groupName: 'graph' }, // 默认显示面积
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: false, tabName: 'custom', groupName: 'label' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'areaData',
  values: [
    { time: '2:00', value: 8 }, { time: '4:00', value: 9 }, { time: '6:00', value: 11 },
    { time: '8:00', value: 14 }, { time: '10:00', value: 16 }, { time: '12:00', value: 17 },
    { time: '14:00', value: 17 }, { time: '16:00', value: 16 }, { time: '18:00', value: 15 }
  ]
};

// 默认 VChart Option (Spec) for Basic Area Chart
const option = {
  type: 'area', // 图表类型为 area
  data: [data],
  xField: 'time',
  yField: 'value',
  point: { // 点配置
    visible: false, // 面积图默认不显示点
    style: {
      size: 4
    }
  },
  line: { // 线配置
    visible: true, // 面积图通常也显示顶部的线
    style: {
      lineWidth: 2
    }
  },
  area: { // 面积配置
    visible: true // 默认显示面积填充
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
const optionHandler = ``;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 