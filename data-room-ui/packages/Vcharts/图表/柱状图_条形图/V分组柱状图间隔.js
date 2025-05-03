// 配置版本号
const version = '2024072501';
// 标题
const title = 'V分组柱状图间隔';
// 用于标识，唯一
const name = 'V分组柱状图间隔';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项
const setting = [
  { label: 'X轴第一层字段', type: 'select', field: 'xField1', optionField: 'xField.0', multiple: false, value: 'year', tabName: 'data' },
  { label: 'X轴第二层字段', type: 'select', field: 'xField2', optionField: 'xField.1', multiple: false, value: 'type', tabName: 'data' },
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: 'value', tabName: 'data' },
  { label: '分组字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: 'type', tabName: 'data' },
  // 样式配置
  { 
    label: '组间间隔', 
    type: 'inputNumber', 
    field: 'paddingInner', 
    // 注意：这里配置的是 X 轴的 paddingInner，通常索引为 0 或 1 (取决于轴定义顺序)
    // 假设 X 轴 (orient: 'bottom') 在 axes 数组的第一个位置
    optionField: 'axes[0].paddingInner', 
    value: 0.3, 
    min: 0,
    max: 1,
    step: 0.05,
    tabName: 'custom', 
    groupName: 'style' 
  },
  {
    label: '柱子透明度',
    type: 'inputNumber',
    field: 'fillOpacity',
    optionField: 'bar.style.fillOpacity',
    value: 0.9,
    min: 0,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'style'
  },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'basic' },
  { 
    label: 'Option 覆盖 (JSON)', 
    type: 'textarea', 
    field: 'optionOverride', 
    optionField: '', 
    value: '', 
    tabName: 'custom', 
    groupName: 'basic' 
  }
];

// 示例数据
const data = {
  id: 'barData',
  values: [
    { type: 'A', year: '2000', value: 25 }, { type: 'A', year: '2010', value: 28 }, { type: 'A', year: '2018', value: 18 },
    { type: 'B', year: '2000', value: 23 }, { type: 'B', year: '2010', value: 32 }, { type: 'B', year: '2018', value: 22 },
    { type: 'C', year: '2000', value: 18 }, { type: 'C', year: '2010', value: 18 }, { type: 'C', year: '2018', value: 18 },
    { type: 'D', year: '2000', value: 15 }, { type: 'D', year: '2010', value: 22 }, { type: 'D', year: '2018', value: 19 },
    { type: 'E', year: '2000', value: 5 }, { type: 'E', year: '2010', value: 12 }, { type: 'E', year: '2018', value: 5 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'bar',
  data: [data],
  // color: ['#becef3', '#6a8edc', '#77caeb', '#52c93b', '#d3f5e8'], // 移除硬编码颜色
  xField: ['year', 'type'],
  yField: 'value',
  seriesField: 'type',
  axes: [
    {
      orient: 'bottom', // X 轴
      paddingInner: 0.3 // 控制组间间隔
    },
    {
      orient: 'left' // Y 轴
    }
  ],
  bar: {
    style: {
      fillOpacity: 0.9 // 柱子透明度
    }
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 处理组间间隔
  const paddingInner = settings.find(s => s.field === 'paddingInner')?.value;
  // 假设 X 轴是第一个轴
  if (option.axes && option.axes[0] && paddingInner !== undefined) {
    option.axes[0].paddingInner = paddingInner;
  }

  // 处理柱子透明度
  const fillOpacity = settings.find(s => s.field === 'fillOpacity')?.value;
  if (option.bar?.style && fillOpacity !== undefined) {
    option.bar.style.fillOpacity = fillOpacity;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 