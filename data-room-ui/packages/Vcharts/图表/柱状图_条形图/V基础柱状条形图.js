// 配置版本号
const version = '2024072602'; // Incremented version
// 标题
const title = 'V基础柱状条形图';
// 用于标识，唯一
const name = 'V基础柱状条形图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项 (基本保持不变，结构很好)
const setting = [
  // 数据配置项
  {
    label: '类别轴字段',
    type: 'select',
    field: 'categoryField',
    optionField: '', // Mapped in handler
    multiple: false,
    value: 'category',
    tabName: 'data'
  },
  {
    label: '值轴字段',
    type: 'select',
    field: 'valueField',
    optionField: '', // Mapped in handler
    multiple: false,
    value: 'value',
    tabName: 'data'
  },
  // 图表方向
  {
    label: '方向',
    type: 'radio',
    field: 'direction',
    optionField: 'direction', // Direct mapping
    value: 'vertical',
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
    // Use a path VChart understands for a basic single bar series
    optionField: 'series[0].barWidth',
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
    // Path to the style property for the bar mark itself
    optionField: 'series[0].bar.style.cornerRadius',
    value: 0,
    min: 0,
    max: 50,
    step: 1,
    tabName: 'custom',
    groupName: 'graph'
   },
  {
    label: '启用背景条',
    type: 'switch',
    field: 'barBackgroundVisible',
    // Path to the visibility of the bar background
    optionField: 'series[0].barBackground.visible',
    value: false,
    tabName: 'custom',
    groupName: 'graph'
  },
  // 标签配置
  {
    label: '显示标签',
    type: 'switch',
    field: 'labelVisible',
    // Can be top-level or series specific, top-level is simpler here
    optionField: 'label.visible',
    value: false,
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
    // Path for legend visibility (VChart often uses object for single legend)
    optionField: 'legends.visible',
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
    optionField: 'theme', // VChart spec can have a top-level theme field
    options: [],
    value: 'light',
    tabName: 'custom',
    groupName: 'basic'
  },
  {
    label: 'Spec 覆盖 (JSON)', // Renamed for clarity
    type: 'textarea',
    field: 'optionOverride', // Keep field name for compatibility
    optionField: '', // Handled in optionHandler
    value: '{}',
    tabName: 'custom',
    groupName: 'basic'
  }
];

// 示例数据
const data = {
  id: 'basicBarData',
  values: [
    { category: '类别A', value: 150 },
    { category: '类别B', value: 230 },
    { category: '类别C', value: 220 },
    { category: '类别D', value: 270 },
    { category: '类别E', value: 130 }
  ]
};

// 默认 VChart Option (Spec)
const option = {
  type: 'bar',
  data: [data],
  direction: 'vertical',
  // Field mapping will be set by optionHandler based on settings
  // xField: 'category', // Set dynamically
  // yField: 'value',    // Set dynamically
  axes: [
    // Axes configuration will be set by optionHandler based on direction
    // { orient: 'bottom', type: 'band', visible: true },
    // { orient: 'left', type: 'linear', visible: true, grid: { visible: true } }
  ],
  series: [
    {
      type: 'bar',
      // barWidth will be applied by applySettingsToVChartSpec
      barBackground: {
        visible: false, // Default value matches setting
        style: {
           cornerRadius: 0 // Default value matches setting
        }
      },
       bar: {
           style: {
               cornerRadius: 0 // Default value matches setting
           }
       }
    }
  ],
  label: { visible: false },   // Default value matches setting
  legends: { visible: false }, // Default value matches setting
  tooltip: { visible: true }   // Default value matches setting
};

// 数据处理脚本
const dataHandler = `return data;`; // Keep simple pass-through

// Option 处理脚本 (Refined)
const optionHandler = `
// Helper function to safely merge deep objects
function deepMerge(target, source) {
  target = target || {};
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (typeof targetValue === 'object' && targetValue !== null && !Array.isArray(targetValue) &&
          typeof sourceValue === 'object' && sourceValue !== null && !Array.isArray(sourceValue)) {
        deepMerge(targetValue, sourceValue);
      } else {
        // Assign value (might overwrite arrays, which is usually intended for spec overrides)
        target[key] = sourceValue;
      }
    }
  }
  return target;
}

// Main handler function
function handleOption(option, config) {
  // Ensure option is an object
  option = option || {};
  const settings = config.setting || [];

  // Get key values from settings
  const direction = settings.find(s => s.field === 'direction')?.value || 'vertical';
  const categoryField = settings.find(s => s.field === 'categoryField')?.value;
  const valueField = settings.find(s => s.field === 'valueField')?.value;
  const categoryAxisVisible = settings.find(s => s.field === 'categoryAxisVisible')?.value;
  const valueAxisVisible = settings.find(s => s.field === 'valueAxisVisible')?.value;
  const gridVisible = settings.find(s => s.field === 'gridVisible')?.value;
  const barCornerRadius = settings.find(s => s.field === 'barCornerRadius')?.value;
  const optionOverrideJson = settings.find(s => s.field === 'optionOverride')?.value;

  // 1. Set direction (applySettingsToVChartSpec should handle this too if optionField is 'direction')
  option.direction = direction;

  // 2. Set field mappings based on direction
  if (categoryField && valueField) {
    if (direction === 'vertical') {
      option.xField = categoryField;
      option.yField = valueField;
    } else { // horizontal
      option.xField = valueField;
      option.yField = categoryField;
    }
  }

  // 3. Configure Axes based on direction and visibility settings
  option.axes = option.axes || [{}, {}]; // Ensure axes array exists
  let categoryAxis, valueAxis;

  if (direction === 'vertical') {
      // Bottom = Category (band), Left = Value (linear)
      categoryAxis = option.axes[0] = { ...option.axes[0], orient: 'bottom', type: 'band' };
      valueAxis = option.axes[1] = { ...option.axes[1], orient: 'left', type: 'linear' };
  } else { // horizontal
      // Left = Category (band), Bottom = Value (linear)
      categoryAxis = option.axes[0] = { ...option.axes[0], orient: 'left', type: 'band' };
      valueAxis = option.axes[1] = { ...option.axes[1], orient: 'bottom', type: 'linear' };
  }

  // Apply visibility
  if (categoryAxisVisible !== undefined) categoryAxis.visible = categoryAxisVisible;
  if (valueAxisVisible !== undefined) valueAxis.visible = valueAxisVisible;

  // Apply grid visibility to the value axis
  if (gridVisible !== undefined) {
      valueAxis.grid = valueAxis.grid || {};
      valueAxis.grid.visible = gridVisible;
  }

  // Ensure axes array has exactly two elements if modified
  option.axes = [categoryAxis, valueAxis];

  // 4. Ensure series structure and sync cornerRadius for barBackground
  option.series = option.series || [{}];
  option.series[0] = option.series[0] || {};
  option.series[0].type = 'bar'; // Make sure type is set

  if (barCornerRadius !== undefined) {
    // Ensure nested structures exist before setting cornerRadius
    option.series[0].bar = option.series[0].bar || {};
    option.series[0].bar.style = option.series[0].bar.style || {};
    option.series[0].bar.style.cornerRadius = barCornerRadius;

    // Sync to background if it exists or is being made visible
    const barBackgroundVisible = settings.find(s => s.field === 'barBackgroundVisible')?.value;
    if (option.series[0].barBackground || barBackgroundVisible) {
      option.series[0].barBackground = option.series[0].barBackground || {};
      option.series[0].barBackground.style = option.series[0].barBackground.style || {};
      option.series[0].barBackground.style.cornerRadius = barCornerRadius;
    }
  }

  // 5. Handle legend visibility (Simplified)
  // applySettingsToVChartSpec handles legends.visible directly.
  // This handler doesn't need to explicitly set it unless more complex logic is needed.

  // 6. Handle tooltip visibility (Simplified)
  // applySettingsToVChartSpec handles tooltip.visible directly.

  // 7. Apply Option Override (Deep Merge)
  if (optionOverrideJson) {
    try {
      const override = JSON.parse(optionOverrideJson);
      if (typeof override === 'object' && override !== null) {
        // Use deepMerge to apply overrides without overwriting entire objects
        option = deepMerge(option, override);
      }
    } catch (e) {
      console.error('Error parsing Option Override JSON:', e);
    }
  }

  return option; // Return the modified spec
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