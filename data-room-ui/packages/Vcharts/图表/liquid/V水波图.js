// 配置版本号
const version = '2024080101';
// 标题 (组件的元数据标题，非图表SPEC内标题)
const title_const = 'V水波图';
// 用于标识，唯一
const name = 'V水波图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'vchartComponent';

// 示例数据
const data = {
  id: 'liquidData',
  values: [
    {
      value: 0.65
    }
  ]
};

// 右侧配置项
const setting = [
  // --- 数据字段选择 ---


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
    value: '水波图',
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

  // --- 指示器配置 ---
  {
    label: '显示指示器',
    type: 'switch',
    field: 'spec_indicator_visible',
    optionField: 'spec.indicator.visible',
    vchartType: 'boolean',
    value: true,
    tabName: 'custom',
    groupName: 'indicatorStyle'
  },
  {
    label: '指示器标题文字',
    type: 'input',
    field: 'spec_indicator_title_text',
    optionField: 'spec.indicator.title.style.text',
    vchartType: 'string',
    value: '进度',
    tabName: 'custom',
    groupName: 'indicatorStyle'
  },
  {
    label: '指示器标题字体大小',
    type: 'inputNumber',
    field: 'spec_indicator_title_fontSize',
    optionField: 'spec.indicator.title.style.fontSize',
    vchartType: 'number',
    value: 14,
    min: 8,
    tabName: 'custom',
    groupName: 'indicatorStyle'
  },
  {
    label: '指示器标题颜色',
    type: 'colorPicker',
    field: 'spec_indicator_title_fill',
    optionField: 'spec.indicator.title.style.fill',
    vchartType: 'string',
    value: '#666666',
    tabName: 'custom',
    groupName: 'indicatorStyle'
  },
  {
    label: '指示器内容字体大小',
    type: 'inputNumber',
    field: 'spec_indicator_content_fontSize',
    optionField: 'spec.indicator.content[0].style.fontSize',
    vchartType: 'number',
    value: 20,
    min: 8,
    tabName: 'custom',
    groupName: 'indicatorStyle'
  },
  {
    label: '指示器内容颜色',
    type: 'colorPicker',
    field: 'spec_indicator_content_fill',
    optionField: 'spec.indicator.content[0].style.fill',
    vchartType: 'string',
    value: '#ffffff',
    tabName: 'custom',
    groupName: 'indicatorStyle'
  },
  // --- 液体样式配置 ---
  {
    label: '轮廓形状',
    type: 'select',
    field: 'spec_maskShape',
    optionField: 'spec.maskShape',
    vchartType: 'string',
    value: 'circle',
    options: [
      { label: '圆形', value: 'circle' },
      { label: '矩形', value: 'rect' },
      { label: '圆角矩形', value: 'roundRect' },
      { label: '菱形', value: 'diamond' }
    ],
    tabName: 'custom',
    groupName: 'liquidStyle'
  },
  {
    label: '液体颜色',
    type: 'colorPicker',
    field: 'spec_liquid_fill',
    optionField: 'spec.liquid.style.fill',
    vchartType: 'string',
    value: '#4FC3F7',
    tabName: 'custom',
    groupName: 'liquidStyle'
  },
  {
    label: '液体透明度',
    type: 'inputNumber',
    field: 'spec_liquid_opacity',
    optionField: 'spec.liquid.style.opacity',
    vchartType: 'number',
    value: 0.8,
    min: 0,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'liquidStyle'
  },

  // --- 背景配置 ---
  {
    label: '显示背景',
    type: 'switch',
    field: 'spec_liquidBackground_visible',
    optionField: 'spec.liquidBackground.visible',
    vchartType: 'boolean',
    value: true,
    tabName: 'custom',
    groupName: 'backgroundStyle'
  },
  {
    label: '背景颜色',
    type: 'colorPicker',
    field: 'spec_liquidBackground_fill',
    optionField: 'spec.liquidBackground.style.fill',
    vchartType: 'string',
    value: '#E3F2FD',
    tabName: 'custom',
    groupName: 'backgroundStyle'
  },
  {
    label: '背景透明度',
    type: 'inputNumber',
    field: 'spec_liquidBackground_opacity',
    optionField: 'spec.liquidBackground.style.opacity',
    vchartType: 'number',
    value: 0.3,
    min: 0,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'backgroundStyle'
  },

  // --- 轮廓配置 ---
  {
    label: '显示轮廓',
    type: 'switch',
    field: 'spec_liquidOutline_visible',
    optionField: 'spec.liquidOutline.visible',
    vchartType: 'boolean',
    value: true,
    tabName: 'custom',
    groupName: 'outlineStyle'
  },
  {
    label: '轮廓颜色',
    type: 'colorPicker',
    field: 'spec_liquidOutline_stroke',
    optionField: 'spec.liquidOutline.style.stroke',
    vchartType: 'string',
    value: '#1976D2',
    tabName: 'custom',
    groupName: 'outlineStyle'
  },
  {
    label: '轮廓宽度',
    type: 'inputNumber',
    field: 'spec_liquidOutline_lineWidth',
    optionField: 'spec.liquidOutline.style.lineWidth',
    vchartType: 'number',
    value: 2,
    min: 0,
    max: 10,
    tabName: 'custom',
    groupName: 'outlineStyle'
  },
  {
    label: '外轮廓边距',
    type: 'inputNumber',
    field: 'spec_outlineMargin',
    optionField: 'spec.outlineMargin',
    vchartType: 'number',
    value: 2,
    min: 0,
    max: 20,
    tabName: 'custom',
    groupName: 'outlineStyle'
  },
  {
    label: '内轮廓边距',
    type: 'inputNumber',
    field: 'spec_outlinePadding',
    optionField: 'spec.outlinePadding',
    vchartType: 'number',
    value: 2,
    min: 0,
    max: 20,
    tabName: 'custom',
    groupName: 'outlineStyle'
  }


]

// 默认 VChart Option (Spec)
const option = {
  id: data.id,
  spec: {
    type: 'liquid',
    valueField: 'value',
    data: {
      id:  data.id,
      values: data.values
    },

    // 图表标题
    title: {
      visible: true,
      text: '水波图',
      style: {
        fontSize: 16,
        fill: '#333333',
        fontWeight: 'bold'
      },
      align: 'center',
      orient: 'top'
    },

    // 指示器配置
    indicator: {
      visible: true,
      trigger: 'select',
      title: {
        visible: true,
        style: {
          text: '进度',
          fontSize: 14,
          fill: '#666666'
        }
      },
      content: [
        {
          visible: true,
          style: {
            fontSize: 20,
            fill: '#ffffff',
            fontWeight: 'bold',
            smartInvert: true
          }
        }
      ]
    },

    // 轮廓形状
    maskShape: 'circle',

    // 液体样式
    liquid: {
      style: {
        fill: '#4FC3F7',
        opacity: 0.8,
        wave: {
          enable: true,
          amplitude: 0.05,
          frequency: 2
        }
      }
    },

    // 液体背景
    liquidBackground: {
      visible: true,
      style: {
        fill: '#E3F2FD',
        opacity: 0.3
      }
    },

    // 液体轮廓
    liquidOutline: {
      visible: true,
      style: {
        stroke: '#1976D2',
        lineWidth: 2,
        lineDash: []
      }
    },

    // 轮廓边距
    outlineMargin: 2,
    outlinePadding: 2,

    // 动画配置
    animationAppear: {
      duration: 1000,
      delay: 0,
      easing: 'cubicOut'
    },

    // 更新动画
    animationUpdate: {
      duration: 800,
      easing: 'cubicInOut'
    },

    // 图表边距
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    },

    // 响应式配置
    autoFit: true
  },
  specHandler: ""
};

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
