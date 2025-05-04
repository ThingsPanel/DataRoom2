// 配置版本号
const version = '2024072601'; // New version for merged file
// 标题
const title = 'V分组柱状条形图';
// 用于标识，唯一
const name = 'V分组柱状条形图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项 (合并后)
const setting = [
  // 数据配置项
  {
    label: '类别轴字段', // Generic name (e.g., 'category' in vertical, 'x' in horizontal example)
    type: 'select',
    field: 'categoryField', // Generic field name
    optionField: '', // Mapped in handler
    multiple: false,
    value: 'category', // Default from vertical example
    tabName: 'custom',
    groupName: 'data'
  },
  {
    label: '值轴字段', // Generic name (e.g., 'value' in vertical, 'y' in horizontal example)
    type: 'select',
    field: 'valueField', // Generic field name
    optionField: '', // Mapped in handler
    multiple: false,
    value: 'value', // Default from vertical example
    tabName: 'custom',
    groupName: 'data'
  },
  {
    label: '分组字段', // Series field (for grouping and color)
    type: 'select',
    field: 'seriesField',
    optionField: 'seriesField', // Directly mapped
    multiple: false,
    value: 'type', // Default from examples
    tabName: 'custom',
    groupName: 'data'
  },
  // 图表方向
  {
    label: '方向',
    type: 'radio',
    field: 'direction',
    optionField: 'direction',
    value: 'vertical', // Default to vertical (column chart)
    options: [
      { label: '垂直(柱状)', value: 'vertical' },
      { label: '水平(条形)', value: 'horizontal' }
    ],
    tabName: 'custom',
    groupName: 'basic'
  },
  // 图表样式配置
  {
    label: '柱/条宽度', // Grouped bar width might behave differently (auto vs fixed)
    type: 'inputNumber',
    field: 'barWidth',
    optionField: 'series[0].barWidth', // May need adjustment in handler if auto width is desired
    value: undefined, // Default to undefined (auto width for grouped)
    placeholder: '留空则自动计算',
    min: 1,
    max: 100,
    step: 1,
    tabName: 'custom',
    groupName: 'graph'
  },
   {
    label: '柱/条圆角',
    type: 'inputNumber',
    field: 'barCornerRadius',
    optionField: 'series[0].bar.style.cornerRadius',
    value: 0,
    min: 0,
    max: 50,
    step: 1,
    tabName: 'custom',
    groupName: 'graph'
   },
  // 标签配置
  {
    label: '显示标签',
    type: 'switch',
    field: 'labelVisible',
    optionField: 'series[0].label.visible', // Target label within series
    value: false, // Default to false for grouped to avoid overlap
    tabName: 'custom',
    groupName: 'label'
  },
  // 坐标轴配置
   {
    label: '显示类别轴',
    type: 'switch',
    field: 'categoryAxisVisible',
    optionField: '', // Mapped in handler
    value: true,
    tabName: 'custom',
    groupName: 'axes'
  },
  {
    label: '显示值轴',
    type: 'switch',
    field: 'valueAxisVisible',
    optionField: '', // Mapped in handler
    value: true,
    tabName: 'custom',
    groupName: 'axes'
  },
   {
    label: '显示网格线',
    type: 'switch',
    field: 'gridVisible',
    optionField: '', // Mapped in handler
    value: true,
    tabName: 'custom',
    groupName: 'axes'
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
   {
    label: '图例方向',
    type: 'select',
    field: 'legendOrient',
    optionField: 'legends.orient',
    options: [
      { label: '顶部', value: 'top' },
      { label: '底部', value: 'bottom' },
      { label: '左侧', value: 'left' },
      { label: '右侧', value: 'right' }
    ],
    value: 'top', // Default from vertical example
    tabName: 'custom',
    groupName: 'legend'
  },
  // 提示信息配置
  {
    label: '显示提示信息',
    type: 'switch',
    field: 'tooltipVisible',
    optionField: 'tooltip.visible',
    value: true,
    tabName: 'custom',
    groupName: 'tooltip'
  },
  // 通用配置
  {
    label: '主题选择',
    type: 'select',
    field: 'chartTheme',
    optionField: 'theme',
    options: [], // Should be populated externally
    value: 'light',
    tabName: 'custom',
    groupName: 'basic'
  },
  {
    label: 'Option 覆盖 (JSON)',
    type: 'textarea',
    field: 'optionOverride',
    optionField: '', // Not directly mapped
    value: '{}',
    tabName: 'custom',
    groupName: 'basic'
  }
];

// 示例数据 (Use V分组柱状图's data as default)
const data = {
  id: 'groupedBarData', // Unique ID
  values: [
    { category: '类别A', type: '系列1', value: 150 }, { category: '类别A', type: '系列2', value: 120 },
    { category: '类别B', type: '系列1', value: 230 }, { category: '类别B', type: '系列2', value: 180 },
    { category: '类别C', type: '系列1', value: 220 }, { category: '类别C', type: '系列2', value: 200 },
    { category: '类别D', type: '系列1', value: 270 }, { category: '类别D', type: '系列2', value: 150 },
    { category: '类别E', type: '系列1', value: 130 }, { category: '类别E', type: '系列2', value: 190 }
  ]
};

// 默认 VChart Option (Spec) - Defaulting to vertical (column)
const option = {
  type: 'bar',
  data: [data],
  direction: 'vertical', // Default direction
  xField: 'category',    // Default mapping for vertical
  yField: 'value',       // Default mapping for vertical
  seriesField: 'type',   // Grouping field
  axes: [ // Default axes for vertical
    { orient: 'bottom', type: 'band', visible: true }, // Category axis
    { orient: 'left', type: 'linear', visible: true, grid: { visible: true } } // Value axis
  ],
  series: [ // Series config for grouped bar
    {
      type: 'bar',
      // barWidth: undefined, // Default to auto width
      label: { visible: false }, // Default label visibility
       bar: { // Default bar style
           style: {
               cornerRadius: 0
           }
       }
    }
  ],
  legends: { visible: true, orient: 'top' }, // Default legend visibility and orientation
  tooltip: { visible: true } // Default tooltip visibility
};

// 数据处理脚本
const dataHandler = `return data;`;

// Option 处理脚本
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  const direction = settings.find(s => s.field === 'direction')?.value || 'vertical';
  const categoryField = settings.find(s => s.field === 'categoryField')?.value;
  const valueField = settings.find(s => s.field === 'valueField')?.value;
  const seriesField = settings.find(s => s.field === 'seriesField')?.value; // Get series field

  // 1. Set direction and seriesField
  option.direction = direction;
  if (seriesField) {
      option.seriesField = seriesField;
  }

  // 2. Map fields based on direction
  // IMPORTANT: For grouped horizontal bar, yField might need to be an array [categoryField, seriesField]
  if (categoryField && valueField) {
    if (direction === 'vertical') {
      option.xField = categoryField;
      option.yField = valueField;
    } else { // horizontal
      option.xField = valueField;
      // Check if seriesField is also provided for correct horizontal grouping
      option.yField = seriesField ? [categoryField, seriesField] : categoryField;
    }
  }

  // Ensure series array and first series object exist
  if (!option.series) option.series = [{}];
  if (!option.series[0]) option.series[0] = {};
  option.series[0].type = 'bar';

  // 3. Handle axes visibility and grid
  const categoryAxisVisible = settings.find(s => s.field === 'categoryAxisVisible')?.value;
  const valueAxisVisible = settings.find(s => s.field === 'valueAxisVisible')?.value;
  const gridVisible = settings.find(s => s.field === 'gridVisible')?.value;

  if (!option.axes) option.axes = [{}, {}];
  if (!option.axes[0]) option.axes[0] = {};
  if (!option.axes[1]) option.axes[1] = {};

  let categoryAxis, valueAxis;
   if (direction === 'vertical') {
      option.axes[0].orient = 'bottom';
      option.axes[0].type = 'band';
      option.axes[1].orient = 'left';
      option.axes[1].type = 'linear';
      categoryAxis = option.axes[0];
      valueAxis = option.axes[1];
  } else {
       option.axes[0].orient = 'left';
       option.axes[0].type = 'band'; // Category axis is band type
       option.axes[1].orient = 'bottom';
       option.axes[1].type = 'linear';
       categoryAxis = option.axes[0];
       valueAxis = option.axes[1];
  }

  if (categoryAxisVisible !== undefined) categoryAxis.visible = categoryAxisVisible;
  if (valueAxisVisible !== undefined) valueAxis.visible = valueAxisVisible;
  if (gridVisible !== undefined) {
      if (!valueAxis.grid) valueAxis.grid = {};
      valueAxis.grid.visible = gridVisible;
  }

  // 4. Handle bar width (allow setting or keep auto)
  const barWidth = settings.find(s => s.field === 'barWidth')?.value;
  // Only set barWidth if a value is provided, otherwise let VChart calculate
  if (barWidth !== undefined && barWidth !== null && barWidth !== '') {
    option.series[0].barWidth = barWidth;
  } else {
     // Explicitly remove barWidth if user clears the input to revert to auto
     if (option.series[0].hasOwnProperty('barWidth')) {
         delete option.series[0].barWidth;
     }
  }

  // 5. Handle bar corner radius
  const barCornerRadius = settings.find(s => s.field === 'barCornerRadius')?.value;
  if (barCornerRadius !== undefined) {
      if (!option.series[0].bar) option.series[0].bar = {};
      if (!option.series[0].bar.style) option.series[0].bar.style = {};
      option.series[0].bar.style.cornerRadius = barCornerRadius;
  }

  // 6. Handle label visibility (target series label)
  const labelVisible = settings.find(s => s.field === 'labelVisible')?.value;
  if (labelVisible !== undefined) {
      if (!option.series[0].label) option.series[0].label = {};
      option.series[0].label.visible = labelVisible;
       // Optionally set a default position if enabling labels
       // if(labelVisible && !option.series[0].label.position) {
       //    option.series[0].label.position = direction === 'vertical' ? 'top' : 'right';
       // }
  }

  // 7. Handle legend visibility and orientation
  const legendVisible = settings.find(s => s.field === 'legendVisible')?.value;
  const legendOrient = settings.find(s => s.field === 'legendOrient')?.value;
   if(!option.legends) option.legends = {};
   if(Array.isArray(option.legends)) { // Handle potential array format
       if(!option.legends[0]) option.legends[0] = {};
       if (legendVisible !== undefined) option.legends[0].visible = legendVisible;
       if (legendOrient) option.legends[0].orient = legendOrient;
   } else { // Handle object format
       if (legendVisible !== undefined) option.legends.visible = legendVisible;
       if (legendOrient) option.legends.orient = legendOrient;
   }


   // 8. Handle tooltip visibility
   const tooltipVisible = settings.find(s => s.field === 'tooltipVisible')?.value;
   if (tooltipVisible !== undefined) {
       if(!option.tooltip) option.tooltip = {};
       option.tooltip.visible = tooltipVisible;
   }

  return option;
}
`;

// 导出配置对象
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