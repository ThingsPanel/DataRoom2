// 配置版本号
const version = '2024072601'; // New version for merged file
// 标题
const title = 'V基础柱状条形图';
// 用于标识，唯一
const name = 'V基础柱状条形图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项 (合并后)
const setting = [
  // 数据配置项
  {
    label: '类别轴字段', // Use generic name
    type: 'select',
    field: 'categoryField', // Use generic field name
    optionField: '', // Mapped in handler based on direction
    multiple: false,
    value: 'category', // Match sample data
    tabName: 'data'
  },
  {
    label: '值轴字段', // Use generic name
    type: 'select',
    field: 'valueField', // Use generic field name
    optionField: '', // Mapped in handler based on direction
    multiple: false,
    value: 'value', // Match sample data
    tabName: 'data'
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
    label: '柱/条宽度',
    type: 'inputNumber',
    field: 'barWidth',
    optionField: 'series[0].barWidth', // Assuming one series for basic chart
    value: 20,
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
    optionField: 'series[0].bar.style.cornerRadius', // Target bar style
    value: 0,
    min: 0,
    max: 50, // Adjust max as needed
    step: 1,
    tabName: 'custom',
    groupName: 'graph'
   },
  {
    label: '启用背景条',
    type: 'switch',
    field: 'barBackgroundVisible',
    optionField: 'series[0].barBackground.visible', // Target bar background visibility
    value: false, // Default to false
    tabName: 'custom',
    groupName: 'graph'
  },
  // 标签配置
  {
    label: '显示标签',
    type: 'switch',
    field: 'labelVisible',
    optionField: 'label.visible',
    value: false, // Default to false for basic chart
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
    label: '显示图例', // Although basic chart usually doesn't need it
    type: 'switch',
    field: 'legendVisible',
    optionField: 'legends.visible', // Target common legend property
    value: false,
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
    groupName: 'basic' // Group under basic for overrides
  }
];

// 示例数据 (Use V基础柱状图's data as default)
const data = {
  id: 'basicBarData', // Unique ID
  values: [
    { category: '类别A', value: 150 },
    { category: '类别B', value: 230 },
    { category: '类别C', value: 220 },
    { category: '类别D', value: 270 },
    { category: '类别E', value: 130 }
  ]
};

// 默认 VChart Option (Spec) - Defaulting to vertical (column)
const option = {
  type: 'bar',
  data: [data],
  direction: 'vertical', // Default direction
  xField: 'category', // Default mapping for vertical
  yField: 'value',    // Default mapping for vertical
  axes: [ // Default axes for vertical
    { orient: 'bottom', type: 'band', visible: true }, // Category axis
    { orient: 'left', type: 'linear', visible: true, grid: { visible: true } } // Value axis
  ],
  series: [ // Define series for bar-specific settings
    {
      type: 'bar', // Match chartType
      barWidth: 20, // Default width
      barBackground: { // Default background config
        visible: false,
        style: {
           cornerRadius: 0 // Match default bar corner radius
        }
      },
       bar: { // Default bar style
           style: {
               cornerRadius: 0
           }
       }
    }
  ],
  label: { visible: false }, // Default label visibility
  legends: { visible: false }, // Default legend visibility
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

  // 1. Set direction
  option.direction = direction;

  // 2. Map fields based on direction
  if (categoryField && valueField) {
    if (direction === 'vertical') {
      option.xField = categoryField;
      option.yField = valueField;
    } else { // horizontal
      option.xField = valueField;
      option.yField = categoryField;
    }
  }

  // Ensure series array and first series object exist
  if (!option.series) option.series = [{}];
  if (!option.series[0]) option.series[0] = {};
  option.series[0].type = 'bar'; // Ensure series type is correct

  // 3. Handle axes visibility and grid
  const categoryAxisVisible = settings.find(s => s.field === 'categoryAxisVisible')?.value;
  const valueAxisVisible = settings.find(s => s.field === 'valueAxisVisible')?.value;
  const gridVisible = settings.find(s => s.field === 'gridVisible')?.value;

  // Ensure axes array exists
  if (!option.axes) option.axes = [{}, {}];
  if (!option.axes[0]) option.axes[0] = {};
  if (!option.axes[1]) option.axes[1] = {};

  // Map axes settings based on direction
  let categoryAxis, valueAxis;
  if (direction === 'vertical') {
      // Bottom axis is category (band), Left axis is value (linear)
      option.axes[0].orient = 'bottom';
      option.axes[0].type = 'band';
      option.axes[1].orient = 'left';
      option.axes[1].type = 'linear';
      categoryAxis = option.axes[0];
      valueAxis = option.axes[1];
  } else {
      // Left axis is category (band), Bottom axis is value (linear)
      option.axes[0].orient = 'left';
      option.axes[0].type = 'band';
      option.axes[1].orient = 'bottom';
      option.axes[1].type = 'linear';
      categoryAxis = option.axes[0];
      valueAxis = option.axes[1];
  }

  if (categoryAxisVisible !== undefined) {
      categoryAxis.visible = categoryAxisVisible;
  }
   if (valueAxisVisible !== undefined) {
      valueAxis.visible = valueAxisVisible;
  }
  // Apply grid visibility to the value axis
  if (gridVisible !== undefined) {
      if (!valueAxis.grid) valueAxis.grid = {};
      valueAxis.grid.visible = gridVisible;
  }

  // 4. Handle bar width
  const barWidth = settings.find(s => s.field === 'barWidth')?.value;
  if (barWidth !== undefined) {
    option.series[0].barWidth = barWidth;
  }

  // 5. Handle bar corner radius
  const barCornerRadius = settings.find(s => s.field === 'barCornerRadius')?.value;
  if (barCornerRadius !== undefined) {
      if (!option.series[0].bar) option.series[0].bar = {};
      if (!option.series[0].bar.style) option.series[0].bar.style = {};
      option.series[0].bar.style.cornerRadius = barCornerRadius;
       // Also apply to background if it exists
      if (option.series[0].barBackground?.style) {
           option.series[0].barBackground.style.cornerRadius = barCornerRadius;
      }
  }


  // 6. Handle bar background visibility
  const barBackgroundVisible = settings.find(s => s.field === 'barBackgroundVisible')?.value;
   if (barBackgroundVisible !== undefined) {
      if (!option.series[0].barBackground) option.series[0].barBackground = {};
      option.series[0].barBackground.visible = barBackgroundVisible;
       // Sync corner radius if background is made visible
       if(barBackgroundVisible && barCornerRadius !== undefined && option.series[0].barBackground.style) {
           option.series[0].barBackground.style.cornerRadius = barCornerRadius;
       }
   }

  // 7. Handle label visibility
  const labelVisible = settings.find(s => s.field === 'labelVisible')?.value;
  if (labelVisible !== undefined) {
    if (!option.label) option.label = {};
    option.label.visible = labelVisible;
  }

   // 8. Handle legend visibility
  const legendVisible = settings.find(s => s.field === 'legendVisible')?.value;
  if (legendVisible !== undefined) {
      if(!option.legends) option.legends = {}; // VChart uses legends object or array
      // Handle both object and array cases for flexibility
      if(Array.isArray(option.legends)) {
          if(!option.legends[0]) option.legends[0] = {};
          option.legends[0].visible = legendVisible;
      } else {
         option.legends.visible = legendVisible;
      }
  }

   // 9. Handle tooltip visibility
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