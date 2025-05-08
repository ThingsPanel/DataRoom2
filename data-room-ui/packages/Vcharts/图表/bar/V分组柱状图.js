// 配置版本号
const version = '2024080101';
// 标题 (组件的元数据标题，非图表SPEC内标题)
const title_const = 'V分组柱状图';
// 用于标识，唯一
const name = 'V分组柱状图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'vchartComponent';

// 右侧配置项
const setting = [
  // --- 数据字段选择 ---
  {
    label: '类别轴字段 (X轴)',
    type: 'select',
    field: 'spec_xField_select',
    optionField: 'spec.xField',
    vchartType: 'array', // xField for grouped bar can be an array
    value: '["type", "country"]', // Default to a single field in an array for simplicity, user can change to e.g. '["type", "country"]'
    tabName: 'data',
    groupName: 'dataMapping',
    multiple: true,
    help: '用于主类别，可为数组如 ["field1", "field2"]'
  },
  {
    label: '值轴字段 (Y轴)',
    type: 'select',
    field: 'spec_yField_select',
    optionField: 'spec.yField',
    vchartType: 'string',
    value: 'value',
    tabName: 'data',
    groupName: 'dataMapping'
  },
  {
    label: '类别轴字段 (X轴)',
    type: 'input',
    field: 'spec_xField_select',
    optionField: 'spec.xField',
    vchartType: 'array', // xField for grouped bar can be an array
    value: '["type", "country"]', // Default to a single field in an array for simplicity, user can change to e.g. '["type", "country"]'
    tabName: 'custom',
    groupName: 'dataMapping',
    multiple: true,
    help: '用于主类别，可为数组如 ["field1", "field2"]'
  },
  {
    label: '值轴字段 (Y轴)',
    type: 'input',
    field: 'spec_yField_select',
    optionField: 'spec.yField',
    vchartType: 'string',
    value: 'value',
    tabName: 'custom',
    groupName: 'dataMapping'
  },
  {
    label: '系列/分组字段',
    type: 'select',
    field: 'spec_seriesField_select',
    optionField: 'spec.seriesField',
    vchartType: 'string',
    value: 'country',
    tabName: 'data',
    groupName: 'dataMapping',
    help: '用于区分子类别并进行分组的字段'
  },
  // --- 图表标题 ---
  {
    label: '显示主标题', type: 'switch', field: 'spec_title_visible', optionField: 'spec.title.visible', vchartType: 'boolean', value: true, tabName: 'custom', groupName: 'chartTitle'
  },
  {
    label: '主标题文字', type: 'input', field: 'spec_title_text', optionField: 'spec.title.text', vchartType: 'string', value: '分组柱状图示例', tabName: 'custom', groupName: 'chartTitle'
  },
  {
    label: '主标题文字颜色', type: 'colorPicker', field: 'spec_title_textStyle_fill', optionField: 'spec.title.textStyle.fill', vchartType: 'string', value: '#333333', tabName: 'custom', groupName: 'chartTitle'
  },
  {
    label: '主标题文字大小', type: 'inputNumber', field: 'spec_title_textStyle_fontSize', optionField: 'spec.title.textStyle.fontSize', vchartType: 'number', value: 18, min: 10, tabName: 'custom', groupName: 'chartTitle'
  },
  // --- 柱体样式 (通用) ---
  {
    label: '柱体最大宽度 (px)', type: 'inputNumber', field: 'spec_bar_barMaxWidth', optionField: 'spec.barMaxWidth', vchartType: 'number', value: 20, placeholder: '自动', min: 0, tabName: 'custom', groupName: 'barStyle'
  },
  {
    label: '柱体最小宽度 (px)', type: 'inputNumber', field: 'spec_bar_barMinWidth', optionField: 'spec.barMinWidth', vchartType: 'number', value: 20, placeholder: '自动', min: 0, tabName: 'custom', groupName: 'barStyle'
  },
  {
    label: '柱体圆角半径 (px)', type: 'inputNumber', field: 'spec_bar_cornerRadius', optionField: 'spec.bar.cornerRadius', vchartType: 'number', value: 0, min: 0, tabName: 'custom', groupName: 'barStyle' // Note: series.bar.cornerRadius in VChart
  },
  // --- X轴样式 ---
  { label: 'X轴类型', type: 'select', field: 'spec_axes_0_type', optionField: 'spec.axes[0].type', vchartType: 'string', value: 'band', options: [{label: '离散轴 (Band)', value: 'band'}], tabName: 'custom', groupName: 'axesStyleX', help:'分组柱状图X轴通常为band类型' },
  { label: '显示X轴标题', type: 'switch', field: 'spec_axes_0_title_visible', optionField: 'spec.axes[0].title.visible', vchartType: 'boolean', value: false, tabName: 'custom', groupName: 'axesStyleX' },
  { label: 'X轴标题文字', type: 'input', field: 'spec_axes_0_title_text', optionField: 'spec.axes[0].title.text', vchartType: 'string', value: '', tabName: 'custom', groupName: 'axesStyleX' },
  { label: '显示X轴标签', type: 'switch', field: 'spec_axes_0_label_visible', optionField: 'spec.axes[0].label.visible', vchartType: 'boolean', value: true, tabName: 'custom', groupName: 'axesStyleX' },
  { label: '显示X轴网格线', type: 'switch', field: 'spec_axes_0_grid_visible', optionField: 'spec.axes[0].grid.visible', vchartType: 'boolean', value: false, tabName: 'custom', groupName: 'axesStyleX' },
  { label: 'X轴网格线颜色', type: 'colorPicker', field: 'spec_axes_0_grid_style_stroke', optionField: 'spec.axes[0].grid.style.stroke', vchartType: 'string', value: '#E5E5E5', tabName: 'custom', groupName: 'axesStyleX' },
  
  // --- Y轴样式 ---
  { label: 'Y轴类型', type: 'select', field: 'spec_axes_1_type', optionField: 'spec.axes[1].type', vchartType: 'string', value: 'linear', options: [{label: '线性轴 (Linear)', value: 'linear'}], tabName: 'custom', groupName: 'axesStyleY' },
  { label: '显示Y轴标题', type: 'switch', field: 'spec_axes_1_title_visible', optionField: 'spec.axes[1].title.visible', vchartType: 'boolean', value: false, tabName: 'custom', groupName: 'axesStyleY' },
  { label: 'Y轴标题文字', type: 'input', field: 'spec_axes_1_title_text', optionField: 'spec.axes[1].title.text', vchartType: 'string', value: '', tabName: 'custom', groupName: 'axesStyleY' },
  { label: '显示Y轴标签', type: 'switch', field: 'spec_axes_1_label_visible', optionField: 'spec.axes[1].label.visible', vchartType: 'boolean', value: true, tabName: 'custom', groupName: 'axesStyleY' },
  { label: '显示Y轴网格线', type: 'switch', field: 'spec_axes_1_grid_visible', optionField: 'spec.axes[1].grid.visible', vchartType: 'boolean', value: true, tabName: 'custom', groupName: 'axesStyleY' },
  { label: 'Y轴网格线颜色', type: 'colorPicker', field: 'spec_axes_1_grid_style_stroke', optionField: 'spec.axes[1].grid.style.stroke', vchartType: 'string', value: '#E5E5E5', tabName: 'custom', groupName: 'axesStyleY' },
  
  // --- 图例 ---
  { label: '显示图例', type: 'switch', field: 'spec_legends_0_visible', optionField: 'spec.legends[0].visible', vchartType: 'boolean', value: true, tabName: 'custom', groupName: 'legendStyle' },
  { label: '图例位置', type: 'select', field: 'spec_legends_0_orient', optionField: 'spec.legends[0].orient', vchartType: 'string', value: 'bottom', options: [{ label: '顶部', value: 'top' }, { label: '底部', value: 'bottom' }, { label: '左侧', value: 'left' }, { label: '右侧', value: 'right' }], tabName: 'custom', groupName: 'legendStyle' },
  { label: '图例对齐方式', type: 'select', field: 'spec_legends_0_position', optionField: 'spec.legends[0].position', vchartType: 'string', value: 'middle', options: [{ label: '起始', value: 'start' }, { label: '居中', value: 'middle' }, { label: '末尾', value: 'end' }], tabName: 'custom', groupName: 'legendStyle' },
  // --- 动画配置 ---
  {
    label: '启用动画',
    type: 'switch',
    field: 'spec_animation',
    optionField: 'spec.animation',
    vchartType: 'boolean',
    value: true,
    activeValue: true,
    inactiveValue: false,
    tabName: 'custom',
    groupName: 'animation'
  },
  // --- 高级 ---
  {
    label: 'Spec处理脚本', type: 'textarea', field: 'specHandler_script_grouped', optionField: 'specHandler',vchartType: 'string', value: '', tabName: 'custom', groupName: 'advanced'
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

// 示例数据
const data = {
  id: 'groupedBarData', // Unique ID for this data source
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
    { type: 'Eyeshadows', country: 'USA', value: 12998 }
  ]
};

// 默认 VChart Option (Spec)
const option = {
  id: data.id,
  spec: {
    type: 'bar',
    data: [data],
    xField: ['type'],
    yField: 'value',
    seriesField: 'country',
    animation: true ,// 由开关控制
    animationAppear: {
      duration: 1500,
      easing: 'linear'
    },
    
    title: {
      visible: true,
      text: '分组柱状图示例',
      textStyle: { fill: '#333333', fontSize: 18 },
      orient: 'top',
      align: 'center'
    },
    bar: {
      cornerRadius: 0,
      style: {}
    },
    axes: [
      {
        orient: 'bottom',
        type: 'band',
        title: { visible: false, text: '' },
        label: { visible: true },
        grid: { visible: false }
      },
      {
        orient: 'left',
        type: 'linear',
        title: { visible: false, text: '' },
        label: {
          visible: true,
          formatMethod_script: "return `${(val * 100).toFixed(2)}%`;"
        },
        grid: { visible: true }
      }
    ],
    legends: [{
      visible: true,
      position: 'middle',
      orient: 'bottom'
    }],
    animationAppear: {
      duration: 500,
      oneByOne: true
    },
  },
  specHandler: ``
};

// 数据处理脚本
const dataHandler = `return data;`; // Default data handler

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