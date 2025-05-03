// 配置版本号
const version = '2024051718';
// 标题
const title = 'V带空值的折线图';
// 用于标识，唯一
const name = 'V带空值的折线图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项 (带空值)
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 year
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 count
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 medalType
  // 样式配置
  {
    label: '空值处理',
    type: 'select',
    field: 'invalidType',
    optionField: 'invalidType',
    options: [
      { label: '连接', value: 'link' },
      { label: '视为0', value: 'zero' },
      { label: '断开', value: 'break' }
    ],
    value: 'link', // 参考 spec，默认为 link
    tabName: 'custom',
    groupName: 'graph'
  },
  { label: '显示点', type: 'switch', field: 'pointVisible', optionField: 'point.visible', value: true, tabName: 'custom', groupName: 'graph' },
  { label: '点的大小', type: 'inputNumber', field: 'pointSize', optionField: 'point.style.size', value: 4, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '线的宽度', type: 'inputNumber', field: 'lineWidth', optionField: 'line.style.lineWidth', value: 2, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.visible', value: true, tabName: 'custom', groupName: 'legend' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec，包含 null 值)
const data = {
  id: 'nullValueLineData',
  values: [
    { medalType: 'Gold Medals', count: 40, year: '1952' }, { medalType: 'Gold Medals', count: 32, year: '1956' },
    // ... 其他数据 ...
    { medalType: 'Gold Medals', count: null, year: '1980' }, // 空值示例
    { medalType: 'Gold Medals', count: 83, year: '1984' },
    // ... 其他系列数据，也包含 null ...
    { medalType: 'Silver Medals', count: 35, year: '1976' }, { medalType: 'Silver Medals', count: null, year: '1980' }, { medalType: 'Silver Medals', count: 60, year: '1984' },
    { medalType: 'Bronze Medals', count: 25, year: '1976' }, { medalType: 'Bronze Medals', count: null, year: '1980' }, { medalType: 'Bronze Medals', count: 30, year: '1984' },
    // ... 完整数据 ...
    { medalType: 'Gold Medals', count: 34, year: '1960' }, { medalType: 'Gold Medals', count: 36, year: '1964' },
    { medalType: 'Gold Medals', count: 45, year: '1968' }, { medalType: 'Gold Medals', count: 33, year: '1972' },
    { medalType: 'Gold Medals', count: 34, year: '1976' }, { medalType: 'Gold Medals', count: 36, year: '1988' },
    { medalType: 'Gold Medals', count: 37, year: '1992' }, { medalType: 'Gold Medals', count: 44, year: '1996' },
    { medalType: 'Gold Medals', count: 37, year: '2000' }, { medalType: 'Gold Medals', count: 35, year: '2004' },
    { medalType: 'Gold Medals', count: 36, year: '2008' }, { medalType: 'Gold Medals', count: 46, year: '2012' },
    { medalType: 'Silver Medals', count: 19, year: '1952' }, { medalType: 'Silver Medals', count: 25, year: '1956' },
    { medalType: 'Silver Medals', count: 21, year: '1960' }, { medalType: 'Silver Medals', count: 26, year: '1964' },
    { medalType: 'Silver Medals', count: 28, year: '1968' }, { medalType: 'Silver Medals', count: 31, year: '1972' },
    { medalType: 'Silver Medals', count: 31, year: '1988' }, { medalType: 'Silver Medals', count: 34, year: '1992' },
    { medalType: 'Silver Medals', count: 32, year: '1996' }, { medalType: 'Silver Medals', count: 24, year: '2000' },
    { medalType: 'Silver Medals', count: 40, year: '2004' }, { medalType: 'Silver Medals', count: 38, year: '2008' },
    { medalType: 'Silver Medals', count: 29, year: '2012' }, { medalType: 'Bronze Medals', count: 17, year: '1952' },
    { medalType: 'Bronze Medals', count: 17, year: '1956' }, { medalType: 'Bronze Medals', count: 16, year: '1960' },
    { medalType: 'Bronze Medals', count: 28, year: '1964' }, { medalType: 'Bronze Medals', count: 34, year: '1968' },
    { medalType: 'Bronze Medals', count: 30, year: '1972' }, { medalType: 'Bronze Medals', count: 27, year: '1988' },
    { medalType: 'Bronze Medals', count: 37, year: '1992' }, { medalType: 'Bronze Medals', count: 25, year: '1996' },
    { medalType: 'Bronze Medals', count: 33, year: '2000' }, { medalType: 'Bronze Medals', count: 26, year: '2004' },
    { medalType: 'Bronze Medals', count: 36, year: '2008' }, { medalType: 'Bronze Medals', count: 29, year: '2012' }
  ]
};

// 默认 VChart Option (Spec) for Line Chart with Null Values
const option = {
  type: 'line',
  data: [data],
  xField: 'year',
  yField: 'count',
  seriesField: 'medalType',
  invalidType: 'link', // 默认连接空值点
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
  axes: [ // 基础轴配置
    { orient: 'bottom', type: 'band', visible: true },
    { orient: 'left', type: 'linear', visible: true }
  ],
  legends: { visible: true },
  tooltip: { visible: true }
};

const dataHandler = `return data;`;
const optionHandler = ``; // invalidType 直接通过 setting 控制

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 