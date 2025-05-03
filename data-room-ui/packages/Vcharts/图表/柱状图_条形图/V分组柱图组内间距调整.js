// 配置版本号
const version = '2024072501';
// 标题
const title = 'V分组柱图组内间距调整';
// 用于标识，唯一
const name = 'V分组柱图组内间距调整';
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
    label: '柱子宽度', 
    type: 'inputNumber', 
    field: 'barWidth', 
    optionField: 'barWidth', 
    value: 10, 
    min: 1,
    max: 100,
    step: 1,
    tabName: 'custom', 
    groupName: 'style' 
  },
  {
    label: '组内间距',
    type: 'inputNumber',
    field: 'barGapInGroup',
    optionField: 'barGapInGroup',
    value: 0,
    min: 0,
    max: 50,
    step: 1,
    tabName: 'custom',
    groupName: 'style'
  },
  // 图例配置
  { 
    label: '显示图例', 
    type: 'switch', 
    field: 'legendVisible', 
    optionField: 'legends.visible', 
    value: true, 
    tabName: 'custom', 
    groupName: 'legend' 
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
    { type: 'Autocracies', year: '1930', value: 129 }, { type: 'Autocracies', year: '1940', value: 133 }, { type: 'Autocracies', year: '1950', value: 130 },
    { type: 'Autocracies', year: '1960', value: 126 }, { type: 'Autocracies', year: '1970', value: 117 }, { type: 'Autocracies', year: '1980', value: 114 },
    { type: 'Autocracies', year: '1990', value: 111 }, { type: 'Autocracies', year: '2000', value: 89 }, { type: 'Autocracies', year: '2010', value: 80 },
    { type: 'Autocracies', year: '2018', value: 80 }, { type: 'Democracies', year: '1930', value: 22 }, { type: 'Democracies', year: '1940', value: 13 },
    { type: 'Democracies', year: '1950', value: 25 }, { type: 'Democracies', year: '1960', value: 29 }, { type: 'Democracies', year: '1970', value: 38 },
    { type: 'Democracies', year: '1980', value: 41 }, { type: 'Democracies', year: '1990', value: 57 }, { type: 'Democracies', year: '2000', value: 87 },
    { type: 'Democracies', year: '2010', value: 98 }, { type: 'Democracies', year: '2018', value: 99 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'bar',
  data: [data],
  xField: ['year', 'type'],
  yField: 'value',
  seriesField: 'type',
  barWidth: 10, // 控制柱子宽度
  barGapInGroup: 0, // 控制组内柱子间距
  legends: { // 保留图例配置
    visible: true,
    orient: 'top',
    position: 'start'
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 处理柱子宽度
  const barWidth = settings.find(s => s.field === 'barWidth')?.value;
  if (barWidth !== undefined) {
    option.barWidth = barWidth;
  }

  // 处理组内间距
  const barGapInGroup = settings.find(s => s.field === 'barGapInGroup')?.value;
  if (barGapInGroup !== undefined) {
    option.barGapInGroup = barGapInGroup;
  }

  // 处理图例显示
  const legendVisible = settings.find(s => s.field === 'legendVisible')?.value;
  if (option.legends && legendVisible !== undefined) {
    option.legends.visible = legendVisible;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 