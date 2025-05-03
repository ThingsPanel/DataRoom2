// 配置版本号
const version = '2024051726'; // 更新版本号
// 标题
const title = 'V带空值的面积图'; // 更新标题
// 用于标识，唯一
const name = 'V带空值的面积图'; // 更新名称
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'area';

// 右侧配置项 (与基础面积图类似，保持一致)
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 time
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  // 样式配置
  { label: '显示点', type: 'switch', field: 'pointVisible', optionField: 'point.visible', value: false, tabName: 'custom', groupName: 'graph' },
  { label: '点的大小', type: 'inputNumber', field: 'pointSize', optionField: 'point.style.size', value: 4, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '线的宽度', type: 'inputNumber', field: 'lineWidth', optionField: 'line.style.lineWidth', value: 2, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '显示面积填充', type: 'switch', field: 'areaVisible', optionField: 'area.visible', value: true, tabName: 'custom', groupName: 'graph' },
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: false, tabName: 'custom', groupName: 'label' },
  // VChart 如何处理空值通常是默认行为 (断开)，也可以通过 defined 属性控制，这里暂不添加设置
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (包含 null 值)
const data = {
  id: 'nullAreaData', // 更新 ID
  values: [
    { time: '2:00', value: 8 }, { time: '4:00', value: 9 }, { time: '6:00', value: 11 },
    { time: '8:00', value: 14 }, { time: '10:00', value: null }, // 空值
    { time: '12:00', value: 17 }, { time: '14:00', value: 17 },
    { time: '16:00', value: null }, { time: '18:00', value: 15 } // 空值
  ]
};

// 默认 VChart Option (Spec) for Area Chart with Null Values
const option = {
  type: 'area',
  data: [data],
  xField: 'time',
  yField: 'value',
  point: {
    visible: false,
    style: { size: 4 }
    // VChart 默认会跳过 null 值绘制点
  },
  line: {
    visible: true,
    style: { lineWidth: 2 }
    // VChart 默认会断开 null 值处的线段
  },
  area: {
    visible: true
  },
  label: {
    visible: false
  },
  axes: [ // 基础轴配置
    { orient: 'bottom', type: 'band', visible: true },
    { orient: 'left', type: 'linear', visible: true, zero: false } // 根据数据范围自动调整，不强制包含0
  ],
  legends: { visible: false },
  tooltip: { visible: true }
  // VChart tooltip 默认会跳过 null 值
};

const dataHandler = `return data;`;
const optionHandler = ``;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 