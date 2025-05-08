// 配置版本号
const version = '2024073101'; // Version for advanced animation example
// 标题 (组件的元数据标题，非图表SPEC内标题)
const title_const = 'V柱状图'; // Renamed to avoid conflict with spec.title
// 用于标识，唯一
const name = 'V柱状图';
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
    vchartType: 'string',
    value: 'x',
    tabName: 'data',
    groupName: 'dataMapping'
  },
  {
    label: '值轴字段 (Y轴)',
    type: 'select',
    field: 'spec_yField_select',
    optionField: 'spec.yField',
    vchartType: 'string',
    value: 'y',
    tabName: 'data',
    groupName: 'dataMapping'
  },
  // --- 图表标题 ---
  {
    label: '显示主标题',
    type: 'switch',
    field: 'spec_title_visible',
    optionField: 'spec.title.visible',
    vchartType: 'boolean',
    value: true,
    tabName: 'custom',
    groupName: 'chartTitle'
  },
  {
    label: '主标题文字',
    type: 'input',
    field: 'spec_title_text',
    optionField: 'spec.title.text',
    vchartType: 'string',
    value: 'V柱状图',
    tabName: 'custom',
    groupName: 'chartTitle'
  },
  {
    label: '主标题文字颜色',
    type: 'colorPicker',
    field: 'spec_title_textStyle_fill',
    optionField: 'spec.title.textStyle.fill',
    vchartType: 'string',
    value: '#333333',
    tabName: 'custom',
    groupName: 'chartTitle'
  },
  {
    label: '主标题文字大小',
    type: 'inputNumber',
    field: 'spec_title_textStyle_fontSize',
    optionField: 'spec.title.textStyle.fontSize',
    vchartType: 'number',
    value: 18,
    min: 10,
    tabName: 'custom',
    groupName: 'chartTitle'
  },
 
  {
    label: '标题整体位置',
    type: 'select',
    field: 'spec_title_orient',
    optionField: 'spec.title.orient',
    vchartType: 'string',
    value: 'top',
    options: [{ label: '顶部', value: 'top' }, { label: '底部', value: 'bottom' }],
    tabName: 'custom',
    groupName: 'chartTitle'
  },
  {
    label: '主标题水平对齐',
    type: 'select',
    field: 'spec_title_align',
    optionField: 'spec.title.align',
    vchartType: 'string',
    value: 'center',
    options: [{ label: '左对齐', value: 'left' }, { label: '居中', value: 'center' }, { label: '右对齐', value: 'right' }],
    tabName: 'custom',
    groupName: 'chartTitle'
  },

  {
    label: '柱体宽度 (px)',
    type: 'inputNumber',
    field: 'spec_bar_barWidth',
    optionField: 'spec.barWidth',
    vchartType: 'number',
    value: 20,
    placeholder: '自动',
    min: 0,
    tabName: 'custom',
    groupName: 'barStyle',
    help: '固定宽度，设置后barMaxWidth/Min将被忽略'
  },
  {
    label: '柱体最大宽度 (px)',
    type: 'inputNumber',
    field: 'spec_bar_barMaxWidth',
    optionField: 'spec.barMaxWidth',
    vchartType: 'number',
    value: 20,
    placeholder: '自动',
    min: 0,
    tabName: 'custom',
    groupName: 'barStyle'
  },
  {
    label: '柱体圆角半径 (px)',
    type: 'inputNumber',
    field: 'spec_bar_cornerRadius',
    optionField: 'spec.bar.style.cornerRadius',
    vchartType: 'number',
    value: 0,
    min: 0,
    tabName: 'custom',
    groupName: 'barStyle'
  },
  {
    label: '柱体描边颜色',
    type: 'colorPicker',
    field: 'spec_bar_style_stroke',
    optionField: 'spec.bar.style.stroke',
    vchartType: 'string',
    value: '',
    tabName: 'custom',
    groupName: 'barStyle'
  },
  {
    label: '柱体描边宽度 (px)',
    type: 'inputNumber',
    field: 'spec_bar_style_lineWidth',
    optionField: 'spec.bar.style.lineWidth',
    vchartType: 'number',
    value: 0,
    min: 0,
    tabName: 'custom',
    groupName: 'barStyle'
  },
  // --- X轴样式 ---
  { label: '显示X轴标题', type: 'switch', field: 'spec_axes_0_title_visible', optionField: 'spec.axes[0].title.visible', vchartType: 'boolean', value: false, tabName: 'custom', groupName: 'axesStyleX' },
  { label: 'X轴标题文字', type: 'input', field: 'spec_axes_0_title_text', optionField: 'spec.axes[0].title.text', vchartType: 'string', value: '', tabName: 'custom', groupName: 'axesStyleX' },
  { label: 'X轴标题文字颜色', type: 'colorPicker', field: 'spec_axes_0_title_style_fill', optionField: 'spec.axes[0].title.style.fill', vchartType: 'string', value: '#333333', tabName: 'custom', groupName: 'axesStyleX' },
  { label: 'X轴标题文字大小', type: 'inputNumber', field: 'spec_axes_0_title_style_fontSize', optionField: 'spec.axes[0].title.style.fontSize', vchartType: 'number', value: 12, min: 8, tabName: 'custom', groupName: 'axesStyleX' },
  { label: '显示X轴标签', type: 'switch', field: 'spec_axes_0_label_visible', optionField: 'spec.axes[0].label.visible', vchartType: 'boolean', value: true, tabName: 'custom', groupName: 'axesStyleX' },
  { label: 'X轴标签文字颜色', type: 'colorPicker', field: 'spec_axes_0_label_style_fill', optionField: 'spec.axes[0].label.style.fill', vchartType: 'string', value: '#666666', tabName: 'custom', groupName: 'axesStyleX' },
  { label: 'X轴标签文字大小', type: 'inputNumber', field: 'spec_axes_0_label_style_fontSize', optionField: 'spec.axes[0].label.style.fontSize', vchartType: 'number', value: 12, min: 8, tabName: 'custom', groupName: 'axesStyleX' },
  { label: '显示X轴网格线', type: 'switch', field: 'spec_axes_0_grid_visible', optionField: 'spec.axes[0].grid.visible', vchartType: 'boolean', value: false, tabName: 'custom', groupName: 'axesStyleX' },
  { label: 'X轴网格线颜色', type: 'colorPicker', field: 'spec_axes_0_grid_style_stroke', optionField: 'spec.axes[0].grid.style.stroke', vchartType: 'string', value: '#E5E5E5', tabName: 'custom', groupName: 'axesStyleX' },
  // --- Y轴样式 ---
  { label: '显示Y轴标题', type: 'switch', field: 'spec_axes_1_title_visible', optionField: 'spec.axes[1].title.visible', vchartType: 'boolean', value: false, tabName: 'custom', groupName: 'axesStyleY' },
  { label: 'Y轴标题文字', type: 'input', field: 'spec_axes_1_title_text', optionField: 'spec.axes[1].title.text', vchartType: 'string', value: '', tabName: 'custom', groupName: 'axesStyleY' },
  { label: 'Y轴标题文字颜色', type: 'colorPicker', field: 'spec_axes_1_title_style_fill', optionField: 'spec.axes[1].title.style.fill', vchartType: 'string', value: '#333333', tabName: 'custom', groupName: 'axesStyleY' },
  { label: 'Y轴标题文字大小', type: 'inputNumber', field: 'spec_axes_1_title_style_fontSize', optionField: 'spec.axes[1].title.style.fontSize', vchartType: 'number', value: 12, min: 8, tabName: 'custom', groupName: 'axesStyleY' },
  { label: '显示Y轴标签', type: 'switch', field: 'spec_axes_1_label_visible', optionField: 'spec.axes[1].label.visible', vchartType: 'boolean', value: true, tabName: 'custom', groupName: 'axesStyleY' },
  { label: 'Y轴标签文字颜色', type: 'colorPicker', field: 'spec_axes_1_label_style_fill', optionField: 'spec.axes[1].label.style.fill', vchartType: 'string', value: '#666666', tabName: 'custom', groupName: 'axesStyleY' },
  { label: 'Y轴标签文字大小', type: 'inputNumber', field: 'spec_axes_1_label_style_fontSize', optionField: 'spec.axes[1].label.style.fontSize', vchartType: 'number', value: 12, min: 8, tabName: 'custom', groupName: 'axesStyleY' },
  { label: '显示Y轴网格线', type: 'switch', field: 'spec_axes_1_grid_visible', optionField: 'spec.axes[1].grid.visible', vchartType: 'boolean', value: true, tabName: 'custom', groupName: 'axesStyleY' },
  { label: 'Y轴网格线颜色', type: 'colorPicker', field: 'spec_axes_1_grid_style_stroke', optionField: 'spec.axes[1].grid.style.stroke', vchartType: 'string', value: '#E5E5E5', tabName: 'custom', groupName: 'axesStyleY' },
  // --- 图例 ---
  { label: '显示图例', type: 'switch', field: 'spec_legends_visible', optionField: 'spec.legends.visible', vchartType: 'boolean', value: false, tabName: 'custom', groupName: 'legendStyle' },
  { label: '图例位置', type: 'select', field: 'spec_legends_orient', optionField: 'spec.legends.orient', vchartType: 'string', value: 'top', options: [{ label: '顶部', value: 'top' }, { label: '底部', value: 'bottom' }, { label: '左侧', value: 'left' }, { label: '右侧', value: 'right' }], tabName: 'custom', groupName: 'legendStyle' },
  { label: '图例对齐方式', type: 'select', field: 'spec_legends_position', optionField: 'spec.legends.position', vchartType: 'string', value: 'middle', options: [{ label: '起始', value: 'start' }, { label: '居中', value: 'middle' }, { label: '末尾', value: 'end' }], tabName: 'custom', groupName: 'legendStyle' },
  { label: '图例文字颜色', type: 'colorPicker', field: 'spec_legends_item_label_style_fill', optionField: 'spec.legends.item.label.style.fill', vchartType: 'string', value: '#333333', tabName: 'custom', groupName: 'legendStyle' },
  { label: '图例文字大小', type: 'inputNumber', field: 'spec_legends_item_label_style_fontSize', optionField: 'spec.legends.item.label.style.fontSize', vchartType: 'number', value: 12, min: 1, tabName: 'custom', groupName: 'legendStyle' },
  { label: '图例项最大宽度 (px)', type: 'inputNumber', field: 'spec_legends_item_maxWidth', optionField: 'spec.legends.item.maxWidth', vchartType: 'number', value: 100, min: 0, tabName: 'custom', groupName: 'legendStyle' },
  { label: '图例内边距 (px)', type: 'inputNumber', field: 'spec_legends_padding', optionField: 'spec.legends.padding', vchartType: 'number', value: 10, min: 0, tabName: 'custom', groupName: 'legendStyle' },
  // --- 动画配置 ---
  {
    label: '启用动画',
    type: 'switch',
    field: 'spec_animation_enabled',
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
    label: 'Spec处理脚本',
    type: 'textarea',
    field: 'specHandler_script',
    optionField: 'specHandler',
    vchartType: 'string',
    value: '',
    tabName: 'custom',
    groupName: 'advanced'
  }
];

// 示例数据
const data = {
  id: 'id0',
  values: [{ x: '1', y: 22 }, { x: '2', y: 43 }, { x: '3', y: 33 }, { x: '4', y: 22 }, { x: '5', y: 10 }, { x: '6', y: 30 }, { x: '7', y: 46 }, { x: '8', y: 21 }, { x: '9', y: 33 }, { x: '10', y: 43 }, { x: '11', y: 42 }, { x: '12', y: 30 }, { x: '13', y: 9 }, { x: '14', y: 46 }]
};

// 默认 VChart Option (Spec)
const option = {
  id: 'id0',
  spec: {
    type: 'bar',
    title: {
      id: 'title',
      visible: true,
      text: 'V柱状图',
      textStyle: { fill: '#333333', fontSize: 18 },
  
      orient: 'top',
      align: 'center'
    },
    data: [{ id: 'id0', values: data.values }],
    xField: 'x',
    yField: 'y',
    bar: {
      style: { cornerRadius: 0, stroke: '', lineWidth: 0 },
    },
    axes: [
      {
        orient: 'bottom', type: 'band',
        title: { visible: false, text: '', style: { fill: '#333333', fontSize: 12 } },
        label: { visible: true, style: { fill: '#666666', fontSize: 12 } },
        grid: { visible: false, style: { stroke: '#E5E5E5', lineDash: [] } }
      },
      {
        orient: 'left', type: 'linear',
        title: { visible: false, text: '', style: { fill: '#333333', fontSize: 12 } },
        label: { visible: true, style: { fill: '#666666', fontSize: 12 } },
        grid: { visible: true, style: { stroke: '#E5E5E5', lineDash: [] } }
      }
    ],
    legends: {
      visible: false,
    },
    
    animation: true,
    animationAppear: {
      duration: 500, // 每个柱子的动画时长为 500ms
      delay: (datum, element, ctx, params) => {
        const seriesIndex = series.findIndex(s => s === datum.country);
        return seriesIndex * (500 + 50); // 柱子延迟为 500ms（之前柱子的动画时长）+ 50ms（动画间隔时间）
      }
    },
  },
  specHandler: ``};

// 数据处理脚本
const dataHandler = `return data;`;

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
