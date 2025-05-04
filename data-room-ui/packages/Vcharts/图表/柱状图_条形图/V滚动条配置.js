// 配置版本号
const version = '2024072601'; // New version for merged file
// 标题
const title = 'V滚动条配置'; // Generic title
// 用于标识，唯一
const name = 'V滚动条配置';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // Example base chart type

// 右侧配置项
const setting = [
  // 数据配置
  {
    label: '类别轴字段', type: 'select', field: 'categoryField', optionField: '', multiple: false, value: 'year', tabName: 'custom', groupName: 'data'
  },
  {
    label: '值轴字段', type: 'select', field: 'valueField', optionField: '', multiple: false, value: 'sales', tabName: 'custom', groupName: 'data'
  },
  // 图表方向 (影响滚动条默认方向)
  {
    label: '方向', type: 'radio', field: 'direction', optionField: 'direction', value: 'vertical',
    options: [ { label: '垂直(柱状)', value: 'vertical' }, { label: '水平(条形)', value: 'horizontal' } ],
    tabName: 'custom', groupName: 'basic'
  },
  // 滚动条配置
  {
    label: '启用滚动条', type: 'switch', field: 'scrollBarEnabled', optionField: '', value: true, // Control overall scrollbar presence
    tabName: 'custom', groupName: 'scrollBar'
  },
  {
    label: '滚动条方向', type: 'select', field: 'scrollBarOrient', optionField: 'scrollBar[0].orient',
    options: [ {label:'自动(基于图表方向)', value: 'auto'}, {label:'底部', value:'bottom'}, {label:'顶部', value:'top'}, {label:'左侧', value:'left'}, {label:'右侧', value:'right'} ],
    value: 'auto', // Default to auto-detect based on chart direction
    tabName: 'custom', groupName: 'scrollBar'
  },
  {
    label: '控制方式', type: 'radio', field: 'scrollBarControlType', optionField: '', value: 'percent', // Default to percentage
    options: [ { label: '百分比', value: 'percent' }, { label: '数据值', value: 'value' } ],
    tabName: 'custom', groupName: 'scrollBar'
  },
  // -- Percentage Control --
  {
    label: '起始位置(%)', type: 'inputNumber', field: 'scrollBarStart', optionField: 'scrollBar[0].start',
    value: 0, min: 0, max: 1, step: 0.01,
    tabName: 'custom', groupName: 'scrollBar',
    vif: 'scrollBarControlType=="percent"' // Conditional visibility
  },
  {
    label: '结束位置(%)', type: 'inputNumber', field: 'scrollBarEnd', optionField: 'scrollBar[0].end',
    value: 0.5, min: 0, max: 1, step: 0.01,
    tabName: 'custom', groupName: 'scrollBar',
    vif: 'scrollBarControlType=="percent"'
  },
  // -- Value Control --
  {
    label: '起始值', type: 'input', field: 'scrollBarStartValue', optionField: 'scrollBar[0].startValue',
    value: '', placeholder: '例如 2010',
    tabName: 'custom', groupName: 'scrollBar',
    vif: 'scrollBarControlType=="value"'
  },
  {
    label: '结束值', type: 'input', field: 'scrollBarEndValue', optionField: 'scrollBar[0].endValue',
    value: '', placeholder: '例如 2014',
    tabName: 'custom', groupName: 'scrollBar',
    vif: 'scrollBarControlType=="value"'
  },
  // -- Roaming --
  {
    label: '允许漫游', type: 'switch', field: 'scrollBarRoam', optionField: 'scrollBar[0].roam',
    value: true,
    tabName: 'custom', groupName: 'scrollBar'
  },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'basic' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'basic' }
];

// 示例数据 (来自 V基础滚动条.js)
const data = {
  id: 'scrollBarData',
  values: [
    { year: '2000', sales: 22 }, { year: '2001', sales: 13 }, { year: '2002', sales: 25 },
    { year: '2003', sales: 29 }, { year: '2004', sales: 38 }, { year: '2005', sales: 49 },
    { year: '2006', sales: 58 }, { year: '2007', sales: 29 }, { year: '2008', sales: 78 },
    { year: '2009', sales: 19 }, { year: '2010', sales: 23 }, { year: '2011', sales: 20 },
    { year: '2012', sales: 98 }, { year: '2013', sales: 49 }, { year: '2014', sales: 28 }
  ]
};

// 默认 VChart Option (Spec) - Defaulting to vertical bar chart
const option = {
  type: 'bar',
  data: [data],
  direction: 'vertical', // Default direction
  xField: 'year', // Default category field
  yField: 'sales', // Default value field
  scrollBar: [ // Default scrollbar config
    {
      orient: 'bottom', // Default based on vertical direction
      start: 0,
      end: 0.5,
      roam: true
    }
  ],
  axes: [
    { orient: 'bottom', type: 'band' },
    { orient: 'left', type: 'linear' }
  ]
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  const direction = settings.find(s => s.field === 'direction')?.value || 'vertical';
  const categoryField = settings.find(s => s.field === 'categoryField')?.value;
  const valueField = settings.find(s => s.field === 'valueField')?.value;
  const scrollBarEnabled = settings.find(s => s.field === 'scrollBarEnabled')?.value;

  // 1. Set direction and fields
  option.direction = direction;
  if (categoryField && valueField) {
    if (direction === 'vertical') {
      option.xField = categoryField;
      option.yField = valueField;
    } else {
      option.xField = valueField;
      option.yField = categoryField;
    }
  }

  // 2. Handle scrollBar presence
  if (scrollBarEnabled === false) {
    delete option.scrollBar; // Remove scrollBar if disabled
    return option;
  }

  // Ensure scrollBar array and first object exist if enabled
  if (!option.scrollBar) option.scrollBar = [{}];
  if (!option.scrollBar[0]) option.scrollBar[0] = {};
  const scrollBar = option.scrollBar[0];

  // 3. Handle scrollBar orientation
  let scrollBarOrient = settings.find(s => s.field === 'scrollBarOrient')?.value;
  if (!scrollBarOrient || scrollBarOrient === 'auto') {
      scrollBarOrient = (direction === 'vertical') ? 'bottom' : 'right';
  }
  scrollBar.orient = scrollBarOrient;

  // 4. Handle control type (percent vs value)
  const controlType = settings.find(s => s.field === 'scrollBarControlType')?.value;
  const startValue = settings.find(s => s.field === 'scrollBarStartValue')?.value;
  const endValue = settings.find(s => s.field === 'scrollBarEndValue')?.value;
  const startPercent = settings.find(s => s.field === 'scrollBarStart')?.value;
  const endPercent = settings.find(s => s.field === 'scrollBarEnd')?.value;

  if (controlType === 'value' && (startValue || endValue)) {
    // Use value control, remove percent control
    delete scrollBar.start;
    delete scrollBar.end;
    if (startValue !== undefined && startValue !== null) scrollBar.startValue = startValue;
    if (endValue !== undefined && endValue !== null) scrollBar.endValue = endValue;
  } else { // Default to percent control
    delete scrollBar.startValue;
    delete scrollBar.endValue;
     if (startPercent !== undefined) scrollBar.start = startPercent;
     if (endPercent !== undefined) scrollBar.end = endPercent;
  }

  // 5. Handle roaming
  const roam = settings.find(s => s.field === 'scrollBarRoam')?.value;
  if (roam !== undefined) {
    scrollBar.roam = roam;
  }

  // 6. Adjust axes based on direction
  if (!option.axes) option.axes = [{}, {}];
  if (!option.axes[0]) option.axes[0] = {};
  if (!option.axes[1]) option.axes[1] = {};
  if (direction === 'vertical') {
      option.axes[0].orient = 'bottom'; option.axes[0].type = 'band';
      option.axes[1].orient = 'left'; option.axes[1].type = 'linear';
  } else {
      option.axes[0].orient = 'left'; option.axes[0].type = 'band';
      option.axes[1].orient = 'bottom'; option.axes[1].type = 'linear';
  }

  return option;
}
`;

// 导出配置对象
export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 