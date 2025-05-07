// 配置版本号
const version = '2024072903'; // Version for ultra-ultra-simplified bar
// 标题
const title = 'V基础柱状图'; // Super Simplified Title
// 用于标识，唯一
const name = 'V基础柱状图'; // Super Simplified Name
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'vchartComponent'; // Changed from 'bar'

// 右侧配置项 (最最简化)
const setting = [
  // --- 只保留数据字段选择 ---
  {
    label: '类别轴字段 (X轴)', // Specify axis for clarity
    type: 'select',
    field: 'spec_xField',
    optionField: 'spec.xField', // Correctly map to spec.xField
    multiple: false,
    value: 'category', // Default data field name
    tabName: 'data',
  },
  {
    label: '值轴字段 (Y轴)', // Specify axis for clarity
    type: 'select',
    field: 'spec_yField',
    optionField: 'spec.yField', // Correctly map to spec.yField
    multiple: false,
    value: 'value', // Default data field name
    tabName: 'data',
  },
  {
    label: 'spec',
    type: 'textarea',
    field: 'spec',
    optionField: 'spec', // Maps to VChart spec: spec.label.visible
    value:  '{"type":"line"}', // Default to hidden
    tabName: 'custom',
    isIncremental: true,
    groupName: 'label' // Group for UI clarity
  },
  {
    label: 'spec脚本',
    type: 'input',
    field: 'specHandler',
    optionField: 'specHandler', // Maps to VChart spec: spec.label.visible
    value: '', // Default to hidden
    tabName: 'custom',
    groupName: 'label' // Group for UI clarity
  },
  // {
  //   label: 'spec测试',
  //   type: 'input',
  //   field: 'spec_a[0]_b',
  //   optionField: 'spec.a[0].b', // Maps to VChart spec: spec.label.visible
  //   value: '', // Default to hidden
  //   tabName: 'custom',
  //   groupName: 'label' // Group for UI clarity
  // }
];

// 示例数据 (保持简单)
const data = {
  id: 'minimalBarData',
  values: [
    { category: 'A', value: 150 },
    { category: 'B', value: 230 },
    { category: 'C', value: 220 },
    { category: 'D', value: 270 },
    { category: 'E', value: 130 }
  ]
};

// 默认 VChart Option (Spec) - 最最简化
const option = {
  id: 'minimalBarData',
  spec: {
    type: 'bar', // Specify the chart type
    data: [data], // Provide the data
    // direction defaults to 'vertical' in VChart
    // --- 直接设置 xField 和 yField --- 
    xField: 'category', // Use default from setting
    yField: 'value',   // Use default from setting
  // --- 添加 label 结构，对应 setting --- 
  label: {
      visible: false // Default corresponds to setting's value
    }
  },
  specHandler: `
  // This handler is now empty.
  `
  // All other components (axes, series, legends, tooltip, label) rely on VChart defaults
};

// 数据处理脚本 (保持不变)
const dataHandler = `return data;`;



// 导出配置对象
export default {
  version,
  title,
  name,
  type,
  chartType, // Still useful to export chartType
  option,
  setting,
  dataHandler,
}; 