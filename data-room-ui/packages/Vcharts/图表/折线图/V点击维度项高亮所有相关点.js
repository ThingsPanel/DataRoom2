// 配置版本号
const version = '2024072501';
// 标题
const title = 'V点击维度项高亮所有相关点';
// 用于标识，唯一
const name = 'V点击维度项高亮所有相关点';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: 'type', tabName: 'data' },
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: 'value', tabName: 'data' },
  { label: '分组字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: 'country', tabName: 'data' },
  // 样式配置
  {
    label: '堆叠显示',
    type: 'switch',
    field: 'stack',
    optionField: 'stack',
    value: true,
    tabName: 'custom',
    groupName: 'style'
  },
  {
    label: '平滑曲线',
    type: 'switch',
    field: 'smoothCurve',
    // 需要在 handler 中处理，将 true/false 映射到 curveType
    optionField: 'line.style.curveType', // 标记关联，但实际处理在 handler
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
  {
    label: '高亮时点大小',
    type: 'inputNumber',
    field: 'highlightPointSize',
    optionField: 'point.state.highlight.size', // 定义 highlight 状态
    value: 6,
    min: 0,
    max: 20,
    step: 1,
    tabName: 'custom',
    groupName: 'interaction'
  },
  {
    label: '未高亮时透明度',
    type: 'inputNumber',
    field: 'blurOpacity',
    optionField: 'point.state.blur.opacity,line.state.blur.opacity', // 定义 blur 状态
    value: 0.3,
    min: 0,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'interaction'
  },
  // 图例配置
  {
    label: '显示图例',
    type: 'switch',
    field: 'legendVisible',
    optionField: 'legends[0].visible',
    value: true,
    tabName: 'custom',
    groupName: 'legend'
  },
  // 交互配置 - 提供一个开关，实际交互逻辑可能需要在外部实现或通过覆盖添加
   {
    label: '启用维度高亮',
    type: 'switch',
    field: 'enableDimensionHighlight',
    optionField: 'interactions[0].enable', // 控制基础交互的开关
    value: true,
    tabName: 'custom',
    groupName: 'interaction'
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
  id: 'highlightData',
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
  data: [data],
  stack: true, // Default stack
  xField: 'type',
  yField: 'value',
  seriesField: 'country',
  line: {
    style: {
      lineWidth: 2, // Default line width
      curveType: 'monotone' // Default smooth curve
    },
    state: { // Define blur state for lines
      blur: {
        opacity: 0.3 // Default blur opacity
      }
      // highlight state is implicitly handled (no change needed for line on point highlight)
    }
  },
  point: {
    style: {
      size: 0, // Default points invisible
      fill: 'white',
      stroke: null,
      lineWidth: 2
    },
    state: {
      highlight: { // State when highlighted
        size: 6 // Default highlight point size
      },
      blur: { // State when blurred (not highlighted)
        opacity: 0.3 // Default blur opacity
      }
    }
  },
  legends: [{ // Keep legend config
    visible: true,
    position: 'middle',
    orient: 'bottom',
    item: { shape: { style: { symbolType: 'roundLine' } } }
  }],
  // Basic dimension interaction (click)
  interactions: [
    {
      type: 'dimension-highlight', // Use built-in dimension highlight interaction
      trigger: 'click', // Trigger on click
      target: ['point'], // Apply states to points (and potentially lines via blur)
      state: 'highlight', // The state to apply on highlight
      blurState: 'blur', // The state to apply to non-highlighted elements
      enable: true // Default enabled state from setting
    }
  ]
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;

  // Handle stack
  const stack = settings.find(s => s.field === 'stack')?.value;
  if (stack !== undefined) {
      option.stack = stack;
  }

  // Handle smooth curve
  const smoothCurve = settings.find(s => s.field === 'smoothCurve')?.value;
  if (option.line?.style) {
      option.line.style.curveType = smoothCurve ? 'monotone' : 'linear';
  }

  // Handle line width
  const lineWidth = settings.find(s => s.field === 'lineWidth')?.value;
  if (option.line?.style && lineWidth !== undefined) {
    option.line.style.lineWidth = lineWidth;
  }

  // Handle highlight point size
  const highlightPointSize = settings.find(s => s.field === 'highlightPointSize')?.value;
  if (option.point?.state?.highlight && highlightPointSize !== undefined) {
      option.point.state.highlight.size = highlightPointSize;
  }

  // Handle blur opacity
  const blurOpacity = settings.find(s => s.field === 'blurOpacity')?.value;
  if (blurOpacity !== undefined) {
      if (option.point?.state?.blur) {
          option.point.state.blur.opacity = blurOpacity;
      }
      if (option.line?.state?.blur) {
          option.line.state.blur.opacity = blurOpacity;
      }
  }

  // Handle legend visibility
  const legendVisible = settings.find(s => s.field === 'legendVisible')?.value;
  if (option.legends && option.legends[0] && legendVisible !== undefined) {
    option.legends[0].visible = legendVisible;
  }

  // Handle interaction enable/disable
  const enableDimensionHighlight = settings.find(s => s.field === 'enableDimensionHighlight')?.value;
  if (option.interactions && option.interactions[0] && enableDimensionHighlight !== undefined) {
      // Assuming the first interaction is dimension-highlight
       if (option.interactions[0].type === 'dimension-highlight') {
           option.interactions[0].enable = enableDimensionHighlight;
       }
  }

  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 