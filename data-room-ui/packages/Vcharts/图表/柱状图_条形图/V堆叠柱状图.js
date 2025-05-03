// 配置版本号
const version = '2024051601';
// 标题
const title = 'V堆叠柱状图';
// 用于标识，唯一
const name = 'V堆叠柱状图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项 (简化版 + seriesField)
const setting = [
  {
    label: '类别轴字段', // 对应 State
    type: 'select',
    field: 'xField',
    optionField: 'xField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  {
    label: '值轴字段', // 对应 Population
    type: 'select',
    field: 'yField',
    optionField: 'yField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  {
    label: '堆叠字段',
    type: 'select',
    field: 'seriesField',
    optionField: 'seriesField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  {
    label: '显示百分比',
    type: 'switch',
    field: 'showPercentage',
    optionField: 'label.formatMethod',
    value: false,
    tabName: 'custom',
    groupName: 'label'
  },
  {
    label: '柱子宽度',
    type: 'inputNumber',
    field: 'barWidth',
    optionField: 'series.0.barWidth',
    value: 20,
    min: 1,
    max: 50,
    tabName: 'custom',
    groupName: 'style'
  },
  {
    label: '主题选择',
    type: 'select',
    field: 'chartTheme',
    optionField: 'theme',
    options: [{label: '浅色', value: 'light'}, {label: '深色', value: 'dark'}],
    value: 'light',
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: 'Option覆盖',
    type: 'textarea',
    field: 'optionOverride',
    optionField: '',
    value: '{}',
    tabName: 'custom',
    groupName: 'graph'
  }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'barData',
  values: [
    { State: 'WY', Age: 'Under 5 Years', Population: 25635 },
    { State: 'WY', Age: '5 to 13 Years', Population: 1890 },
    { State: 'WY', Age: '14 to 17 Years', Population: 9314 },
    { State: 'DC', Age: 'Under 5 Years', Population: 30352 },
    { State: 'DC', Age: '5 to 13 Years', Population: 20439 },
    { State: 'DC', Age: '14 to 17 Years', Population: 10225 },
    { State: 'VT', Age: 'Under 5 Years', Population: 38253 },
    { State: 'VT', Age: '5 to 13 Years', Population: 42538 },
    { State: 'VT', Age: '14 to 17 Years', Population: 15757 },
    { State: 'ND', Age: 'Under 5 Years', Population: 51896 },
    { State: 'ND', Age: '5 to 13 Years', Population: 67358 },
    { State: 'ND', Age: '14 to 17 Years', Population: 18794 },
    { State: 'AK', Age: 'Under 5 Years', Population: 72083 },
    { State: 'AK', Age: '5 to 13 Years', Population: 85640 },
    { State: 'AK', Age: '14 to 17 Years', Population: 22153 }
  ]
};

// 默认 VChart Option (Spec) for Stacked Bar
const option = {
  type: 'bar',
  data: [data],
  xField: 'State',
  yField: 'Population',
  seriesField: 'Age',
  stack: true, // **启用堆叠**
  legends: { visible: true }, // 显示图例
  bar: { // 保留参考 spec 中的 bar 状态样式
    state: {
      hover: { stroke: '#000', lineWidth: 1 }
    }
  },
  // 坐标轴配置可以从参考 spec 继承或使用标准配置
  axes: [
     { orient: 'bottom', type: 'band', visible: true },
     { orient: 'left', type: 'linear', visible: true, grid: { visible: true } }
  ],
  tooltip: { visible: true, mark: { content: [] }, dimension: { content: [] } } // 保持 tooltip 结构
};

const dataHandler = `return data;`;
const optionHandler = ``;

export default {
  version,
  title,
  name,
  type,
  chartType,
  option,
  setting,
  dataHandler,
  optionHandler
};
