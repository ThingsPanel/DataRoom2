// 配置版本号
const version = '2024072501';
// 标题
const title = 'V百分比堆叠折线图';
// 用于标识，唯一
const name = 'V百分比堆叠折线图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项
const setting = [
  { label: '类别轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: 'type', tabName: 'data' },
  { label: '数值轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: 'value', tabName: 'data' },
  { label: '分组字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: 'country', tabName: 'data' },
  // 样式配置
  { 
    label: '显示数据点', 
    type: 'switch', 
    field: 'pointVisible', 
    optionField: 'point.visible', 
    value: true, 
    tabName: 'custom', 
    groupName: 'style' 
  },
  {
    label: '线条宽度',
    type: 'inputNumber',
    field: 'lineWidth',
    optionField: 'line.style.lineWidth',
    value: 2,
    min: 1,
    max: 10,
    step: 1,
    tabName: 'custom',
    groupName: 'style'
  },
  // 图例配置
  { 
    label: '显示图例', 
    type: 'switch', 
    field: 'legendVisible', 
    optionField: 'legends[0].visible', // 配置第一个图例
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
  id: 'percentLineData', // Use a unique ID
  values: [
    { type: 'Nail polish', country: 'Africa', value: 4229 }, { type: 'Nail polish', country: 'EU', value: 4376 }, { type: 'Nail polish', country: 'China', value: 3054 }, { type: 'Nail polish', country: 'USA', value: 12814 },
    { type: 'Eyebrow pencil', country: 'Africa', value: 3932 }, { type: 'Eyebrow pencil', country: 'EU', value: 3987 }, { type: 'Eyebrow pencil', country: 'China', value: 5067 }, { type: 'Eyebrow pencil', country: 'USA', value: 13012 },
    { type: 'Rouge', country: 'Africa', value: 5221 }, { type: 'Rouge', country: 'EU', value: 3574 }, { type: 'Rouge', country: 'China', value: 7004 }, { type: 'Rouge', country: 'USA', value: 11624 },
    { type: 'Lipstick', country: 'Africa', value: 9256 }, { type: 'Lipstick', country: 'EU', value: 4376 }, { type: 'Lipstick', country: 'China', value: 9054 }, { type: 'Lipstick', country: 'USA', value: 8814 },
    { type: 'Eyeshadows', country: 'Africa', value: 3308 }, { type: 'Eyeshadows', country: 'EU', value: 4572 }, { type: 'Eyeshadows', country: 'China', value: 12043 }, { type: 'Eyeshadows', country: 'USA', value: 12998 },
    { type: 'Eyeliner', country: 'Africa', value: 5432 }, { type: 'Eyeliner', country: 'EU', value: 3417 }, { type: 'Eyeliner', country: 'China', value: 15067 }, { type: 'Eyeliner', country: 'USA', value: 12321 },
    { type: 'Foundation', country: 'Africa', value: 13701 }, { type: 'Foundation', country: 'EU', value: 5231 }, { type: 'Foundation', country: 'China', value: 10119 }, { type: 'Foundation', country: 'USA', value: 10342 },
    { type: 'Lip gloss', country: 'Africa', value: 4008 }, { type: 'Lip gloss', country: 'EU', value: 4572 }, { type: 'Lip gloss', country: 'China', value: 12043 }, { type: 'Lip gloss', country: 'USA', value: 22998 },
    { type: 'Mascara', country: 'Africa', value: 18712 }, { type: 'Mascara', country: 'EU', value: 6134 }, { type: 'Mascara', country: 'China', value: 10419 }, { type: 'Mascara', country: 'USA', value: 11261 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'line',
  data: [data], // Reference the data object
  // title: { visible: false }, // Remove title or set visible to false
  percent: true, // Enable percentage calculation
  stack: true, // Stack is required for percentage
  xField: 'type',
  yField: 'value',
  seriesField: 'country',
  point: { // Point configuration
    visible: true // Default visibility from setting
  },
  line: { // Line configuration
    style: {
      lineWidth: 2 // Default line width from setting
    }
  },
  legends: [{ visible: true, position: 'middle', orient: 'bottom' }], // Keep legend config
  axes: [ // Keep axes config
    {
      orient: 'left',
      label: {
        formatMethod(val) {
          return `${(val * 100).toFixed(1)}%`; // Slightly simplified format
        }
      }
    },
    {
      orient: 'bottom' // Define bottom axis
    }
  ]
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 处理数据点显示
  const pointVisible = settings.find(s => s.field === 'pointVisible')?.value;
  if (option.point && pointVisible !== undefined) {
    option.point.visible = pointVisible;
  }

  // 处理线条宽度
  const lineWidth = settings.find(s => s.field === 'lineWidth')?.value;
  if (option.line?.style && lineWidth !== undefined) {
    option.line.style.lineWidth = lineWidth;
  }

  // 处理图例显示
  const legendVisible = settings.find(s => s.field === 'legendVisible')?.value;
  // Assuming only one legend configuration
  if (option.legends && option.legends[0] && legendVisible !== undefined) {
    option.legends[0].visible = legendVisible;
  }
  
  // Ensure stack and percent are true if not explicitly set by overrides
  // (Though they are set in the default option here)
  if (option.percent !== false) { // Allow override to disable
      option.percent = true;
  }
  if (option.stack !== false) { // Allow override to disable
      option.stack = true;
  }

  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 