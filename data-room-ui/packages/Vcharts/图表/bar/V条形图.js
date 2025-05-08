// 配置版本号
const version = '2024080101';
// 标题 (组件的元数据标题，非图表SPEC内标题)
const title_const = 'V条形图';
// 用于标识，唯一
const name = 'V条形图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'vchartComponent';

// 右侧配置项
const setting = [
  // --- 数据字段选择 ---
  {
    label: '值轴字段 (X轴)', // For horizontal bar, X is value axis
    type: 'select',
    field: 'spec_xField_select',
    optionField: 'spec.xField',
    vchartType: 'string',
    value: 'value', // From current spec
    tabName: 'data',
    groupName: 'dataMapping'
  },
  {
    label: '类别轴字段 (Y轴)', // For horizontal bar, Y is category axis
    type: 'select',
    field: 'spec_yField_select',
    optionField: 'spec.yField',
    vchartType: 'string',
    value: 'type', // From current spec
    tabName: 'data',
    groupName: 'dataMapping'
  },
  {
    label: '值轴字段 (X轴)', // For horizontal bar, X is value axis
    type: 'input',
    field: 'spec_xField_select',
    optionField: 'spec.xField',
    vchartType: 'string',
    value: 'value', // From current spec
    tabName: 'custom',
    groupName: 'dataMapping'
  },
  {
    label: '类别轴字段 (Y轴)', // For horizontal bar, Y is category axis
    type: 'input',
    field: 'spec_yField_select',
    optionField: 'spec.yField',
    vchartType: 'string',
    value: 'type', // From current spec
    tabName: 'custom',
    groupName: 'dataMapping'
  },
  // --- 条形样式 ---
  { label: '条形圆角半径(统)', type: 'inputNumber', field: 'spec_bar_style_cornerRadius_all', optionField: 'spec.bar.style.cornerRadius', vchartType: 'number', value: 5, tabName: 'custom', groupName: 'barStyle', help:'设置一个值将应用于所有角, spec值为数组 e.g., [5,5,5,5]' },
  { label: '条形高度', type: 'inputNumber', field: 'spec_bar_style_height', optionField: 'spec.bar.style.height', vchartType: 'number', value: 10, tabName: 'custom', groupName: 'barStyle' },
  { label: '堆叠圆角半径', type: 'inputNumber', field: 'spec_stackCornerRadius', optionField: 'spec.stackCornerRadius', vchartType: 'number', value: 0, tabName: 'custom', groupName: 'barStyle' },

  // --- 条形背景样式 ---

  // --- 末端文本标签 (ExtensionMark spec.extensionMark[0]) ---
  { label: '显示末端标签', type: 'switch', field: 'spec_extensionMark_0_visible', optionField: 'spec.extensionMark[0].visible', vchartType: 'boolean', value: true, tabName: 'custom', groupName: 'extensionMarkStyle' },

  { label: '标签颜色', type: 'colorPicker', field: 'spec_extensionMark_0_style_fill', optionField: 'spec.extensionMark[0].style.fill', vchartType: 'string', value: '#f050f0', tabName: 'custom', groupName: 'extensionMarkStyle' },

  // --- 准星线 (Crosshair) ---

  // --- 提示框 (Tooltip) ---
  {
    label: 'Spec处理脚本',
    type: 'textarea',
    field: 'specHandler_script_bar_horizontal',
    optionField: 'specHandler',
    vchartType: 'string',
    value: '',
    tabName: 'custom',
    groupName: 'advanced'
  },
  // --- 高级 ---
  {
    label: 'Spec初始数据',
    type: 'textarea',
    field: 'specHandler_sdata_values',
    optionField: 'spec.data[0].values',
    vchartType: 'string',
    value: '',
    tabName: 'custom',
    groupName: 'advanced'
  }
];

// 示例数据
const data = {
  id: 'barData',
  values: [
    {
      
      value: 1200,    // 耗水量
      type: '耗水量'
    },
    {
     
      value: 280,     // 耗电量
      type: '耗电量'
    },
    {
      
      value: 150,     // 热能量
      type: '热能量'
    },
  
  ]
}

// 默认 VChart Option (Spec)
const option = {
  id: data.id,
  spec: {
    type: 'bar',
    data: [
      data
    ],
    direction: 'horizontal',
    xField: 'value',
    yField: 'type',
    seriesField: 'type',
    padding: { right: 50, left: 10 },
    axes: [
      {
        orient: 'bottom',
        visible: false,
        nice: false
      },
      {
        orient: 'left',
        maxWidth: 65,
        label: {
          autoLimit: true
        },
        domainLine: {
          visible: false
        },
        tick: {
          visible: false
        }
      }
    ],
    stackCornerRadius: 0,
    bar: {
      style: {
        cornerRadius: [5, 5, 5, 5],
        height: 10
      }
    },
    barBackground: {
      visible: true,
      style: {
        cornerRadius: [5, 5, 5, 5],
        height: 10
      },
      state: {
        hover: {
          stroke: '#D9D9D9',
          lineWidth: 1
        }
      }
    },
    extensionMark: [
      {
        type: 'text',
        dataId: 'barData',
        visible: true,
        style: {
          text: datum => datum.value,
          fontSize: 12,
          x: (datum, ctx) => {
            return ctx.getRegion().getLayoutRect().width + 10;
          },
          y: (datum, ctx) => {
            return ctx.valueToY([datum.type]) + ctx.yBandwidth() / 2;
          },
          textBaseline: 'middle',
          textAlign: 'left',
          fill: '#595959',
          size: 20
        }
      }
    ],
    crosshair: {
      yField: {
        visible: false
      }
    },
    tooltip: {
      mark: {
        title: {
          visible: false
        }
      },
      dimension: {
        title: {
          visible: false
        }
      },
      style: {
        shape: {
          shapeType: 'circle'
        }
      }
    },
    animationAppear:{
      duration :10000,
      easing :'cubicOut',
      loop :true
    }
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