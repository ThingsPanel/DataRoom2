// 配置版本号
const version = '2024080201';
// 标题 (组件的元数据标题，非图表SPEC内标题)
const title_const = 'V折线图'; // 文件名是百分比堆叠条形图，但 spec 当前是折线图
// 用于标识，唯一
const name = 'V折线图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'vchartComponent';
const data = {
  id:'line-data',
  values: [
    { type: 'Nail polish', country: 'Africa', value: 4229 },
    { type: 'Nail polish', country: 'EU', value: 4376 },
    { type: 'Nail polish', country: 'China', value: 3054 },
    { type: 'Nail polish', country: 'USA', value: 12814 },
    { type: 'Eyebrow pencil', country: 'Africa', value: 3932 },
    { type: 'Eyebrow pencil', country: 'EU', value: 3987 },
    { type: 'Eyebrow pencil', country: 'China', value: 5067 },
    { type: 'Eyebrow pencil', country: 'USA', value: 13012 },
    { type: 'Rouge', country: 'Africa', value: 5221 },
    { type: 'Rouge', country: 'EU', value: 3574 },
    { type: 'Rouge', country: 'China', value: 7004 },
    { type: 'Rouge', country: 'USA', value: 11624 },
    { type: 'Lipstick', country: 'Africa', value: 9256 },
    { type: 'Lipstick', country: 'EU', value: 4376 },
    { type: 'Lipstick', country: 'China', value: 9054 },
    { type: 'Lipstick', country: 'USA', value: 8814 },
    { type: 'Eyeshadows', country: 'Africa', value: 3308 },
    { type: 'Eyeshadows', country: 'EU', value: 4572 },
    { type: 'Eyeshadows', country: 'China', value: 12043 },
    { type: 'Eyeshadows', country: 'USA', value: 12998 },
    { type: 'Eyeliner', country: 'Africa', value: 5432 },
    { type: 'Eyeliner', country: 'EU', value: 3417 },
    { type: 'Eyeliner', country: 'China', value: 15067 },
    { type: 'Eyeliner', country: 'USA', value: 12321 },
    { type: 'Foundation', country: 'Africa', value: 13701 },
    { type: 'Foundation', country: 'EU', value: 5231 },
    { type: 'Foundation', country: 'China', value: 10119 },
    { type: 'Foundation', country: 'USA', value: 10342 },
    { type: 'Lip gloss', country: 'Africa', value: 4008 },
    { type: 'Lip gloss', country: 'EU', value: 4572 },
    { type: 'Lip gloss', country: 'China', value: 12043 },
    { type: 'Lip gloss', country: 'USA', value: 22998 },
    { type: 'Mascara', country: 'Africa', value: 18712 },
    { type: 'Mascara', country: 'EU', value: 6134 },
    { type: 'Mascara', country: 'China', value: 10419 },
    { type: 'Mascara', country: 'USA', value: 11261 }
  ]
}
// 默认 VChart Option (Spec)
const option = {
  id: data.id, // 使用一个固定的ID
  spec:  {
    type: 'line',
    data:[data],
    xField: 'time',
    yField: 'value',
    seriesField: 'country',
    animationAppear: {
      duration: 1500,
      easing: 'linear',
      loop: true

    },
    legends: [{ visible: true, position: 'middle', orient: 'bottom' }],
  
  },
  specHandler: "" 
};

// 右侧配置项
const setting = [
  // --- 数据字段选择 ---
  {
    label: 'X轴字段',
    type: 'select',
    field: 'spec_xField_select',
    optionField: 'spec.xField',
    vchartType: 'string',
    value: 'time', // From option.spec.xField
    tabName: 'data',
    groupName: 'dataMapping'
  },
  {
    label: 'Y轴字段',
    type: 'select',
    field: 'spec_yField_select',
    optionField: 'spec.yField',
    vchartType: 'string',
    value: 'value', // From option.spec.yField
    tabName: 'data',
    groupName: 'dataMapping'
  },
  {
    label: '系列字段',
    type: 'select',
    field: 'spec_seriesField_select',
    optionField: 'spec.seriesField',
    vchartType: 'string',
    value: 'country', // From option.spec.seriesField
    tabName: 'data',
    groupName: 'dataMapping'
  },

  // --- 图表标题 (Not in current spec, but common to add) ---
  {
    label: '显示主标题', 
    type: 'switch', 
    field: 'spec_title_visible', 
    optionField: 'spec.title.visible', 
    vchartType: 'boolean', 
    value: false, // Default to false as not in spec
    tabName: 'custom', 
    groupName: 'chartTitle'
  },
  {
    label: '主标题文字', 
    type: 'input', 
    field: 'spec_title_text', 
    optionField: 'spec.title.text', 
    vchartType: 'string', 
    value: '折线图示例', // Default text
    tabName: 'custom', 
    groupName: 'chartTitle'
  },

  // --- Y轴/左轴 (spec.axes[0] based on current spec which only has one axis) ---
  // Assuming the first axis in spec is the primary Y-axis for configuration if only one is present.
  // If X-axis settings are also desired, they would need to be added and potentially mapped to spec.axes[1] or a new object if not in spec.
  {
    label: '显示Y轴', 
    type: 'switch', 
    field: 'spec_axes_0_visible', 
    optionField: 'spec.axes[0].visible', 
    vchartType: 'boolean', 
    value: true, // Default for an axis if `visible:false` is not set
    tabName: 'custom', 
    groupName: 'axesStyleY'
  },
  {
    label: 'Y轴方向', 
    type: 'select', 
    field: 'spec_axes_0_orient', 
    optionField: 'spec.axes[0].orient', 
    vchartType: 'string', 
    value: 'left', // From option.spec.axes[0].orient
    options: [{label:'left', value:'left'}, {label:'right', value:'right'}],
    tabName: 'custom', 
    groupName: 'axesStyleY'
  },

  // Add common X-axis settings (assuming it would be spec.axes[1] or a new object)
  {
    label: '显示X轴', 
    type: 'switch', 
    field: 'spec_axes_1_visible', // Targeting a potential second axis for X
    optionField: 'spec.axes[1].visible', 
    vchartType: 'boolean', 
    value: true, // Default to true
    tabName: 'custom', 
    groupName: 'axesStyleX'
  },
   {
    label: 'X轴方向', 
    type: 'select', 
    field: 'spec_axes_1_orient', // Targeting a potential second axis for X
    optionField: 'spec.axes[1].orient', 
    vchartType: 'string', 
    value: 'bottom', // Default for X-axis
    options: [{label:'bottom', value:'bottom'}, {label:'top', value:'top'}],
    tabName: 'custom', 
    groupName: 'axesStyleX'
  },

  // --- 图例 (spec.legends[0]) ---
  {
    label: '显示图例', 
    type: 'switch', 
    field: 'spec_legends_0_visible', 
    optionField: 'spec.legends[0].visible', 
    vchartType: 'boolean', 
    value: true, // From option.spec.legends[0].visible
    tabName: 'custom', 
    groupName: 'legendStyle'
  },
  {
    label: '图例位置', 
    type: 'select', 
    field: 'spec_legends_0_orient', 
    optionField: 'spec.legends[0].orient', 
    vchartType: 'string', 
    value: 'bottom', // From option.spec.legends[0].orient
    options: [
      { label: '顶部', value: 'top' }, { label: '底部', value: 'bottom' }, 
      { label: '左侧', value: 'left' }, { label: '右侧', value: 'right' }
    ],
    tabName: 'custom', 
    groupName: 'legendStyle'
  },
  {
    label: '图例对齐方式', 
    type: 'select', 
    field: 'spec_legends_0_position', 
    optionField: 'spec.legends[0].position', 
    vchartType: 'string', 
    value: 'middle', // From option.spec.legends[0].position
    options: [
      { label: '起始', value: 'start' }, { label: '居中', value: 'middle' }, { label: '末尾', value: 'end' }
    ],
    tabName: 'custom', 
    groupName: 'legendStyle'
  },

  // --- 动画配置 (Only animationAppear is in spec) ---
  {
    label: '启用图表动画', // This would control spec.animation overall if present
    type: 'switch',
    field: 'spec_animation', // General animation toggle, spec currently doesn't have this at top level
    optionField: 'spec.animation',
    vchartType: 'boolean',
    value: true, // Default to true if allowing this control
    tabName: 'custom',
    groupName: 'animation'
  },
  {
    label: '入场动画时长(ms)',
    type: 'inputNumber',
    field: 'spec_animationAppear_duration',
    optionField: 'spec.animationAppear.duration',
    vchartType: 'number',
    value: 1500, // From option.spec.animationAppear.duration
    min: 0,
    tabName: 'custom',
    groupName: 'animation'
  },
  {
    label: '入场动画缓动',
    type: 'select',
    field: 'spec_animationAppear_easing',
    optionField: 'spec.animationAppear.easing',
    vchartType: 'string',
    value: 'linear', // From option.spec.animationAppear.easing
    options: ['linear', 'quadIn', 'quadOut', 'quadInOut', 'cubicIn', 'cubicOut', 'cubicInOut', 'backIn', 'backOut', 'backInOut', 'elasticOut'].map(e => ({label:e, value:e})),
    tabName: 'custom',
    groupName: 'animation'
  },
  
  // --- 点、线样式 (Common for line charts, not in current spec) ---
  { 
    label: '显示点', 
    type: 'switch', 
    field: 'spec_point_visible', 
    optionField: 'spec.point.visible', // Example path
    vchartType: 'boolean', 
    value: true, 
    tabName: 'custom', 
    groupName: 'markStyle' 
  },
  { 
    label: '点形状', 
    type: 'select', 
    field: 'spec_point_shape', 
    optionField: 'spec.point.style.shape', // Example path
    vchartType: 'string', 
    value: 'circle', 
    options: ['circle', 'square', 'diamond', 'triangle'].map(e => ({label:e, value:e})), 
    tabName: 'custom', 
    groupName: 'markStyle' 
  },
  { 
    label: '点大小', 
    type: 'inputNumber', 
    field: 'spec_point_size', 
    optionField: 'spec.point.style.size', // Example path
    vchartType: 'number', 
    value: 3, 
    min: 0, 
    tabName: 'custom', 
    groupName: 'markStyle' 
  },
  { 
    label: '线条宽度', 
    type: 'inputNumber', 
    field: 'spec_line_width', 
    optionField: 'spec.line.style.lineWidth', // Example path
    vchartType: 'number', 
    value: 2, 
    min: 0, 
    tabName: 'custom', 
    groupName: 'markStyle' 
  },

  // --- 高级 ---
  {
    label: 'Spec处理脚本',
    type: 'textarea',
    field: 'specHandler_script_line',
    optionField: 'specHandler',
    vchartType: 'string',
    value: '',
    tabName: 'custom',
    groupName: 'advanced'
  },
  {
    label: 'Spec初始数据',
    type: 'textarea',
    field: 'specHandler_sdata_values',
    optionField: 'spec.data[0].values',
    vchartType: 'string',
    value: JSON.stringify(data.values),
    tabName: 'custom',
    groupName: 'advanced'
  }
];

// 数据处理脚本
const dataHandler = ``;

// 导出配置对象
export default {
  version,
  title: title_const,
  name,
  type,
  chartType,
  option,
  setting,
  dataHandler,
}; 