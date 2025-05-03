// 配置版本号
const version = '2024051722';
// 标题
const title = 'V百分比堆叠面积图';
// 用于标识，唯一
const name = 'V百分比堆叠面积图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'area';

// 右侧配置项 (百分比堆叠面积图)
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 type
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 country
  // 样式配置
  { label: '启用百分比堆叠', type: 'switch', field: 'percent', optionField: 'percent', value: true, tabName: 'custom', groupName: 'graph' },
  { label: '显示点', type: 'switch', field: 'pointVisible', optionField: 'point.visible', value: false, tabName: 'custom', groupName: 'graph' },
  { label: '点的大小', type: 'inputNumber', field: 'pointSize', optionField: 'point.style.size', value: 4, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '线的宽度', type: 'inputNumber', field: 'lineWidth', optionField: 'line.style.lineWidth', value: 2, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '显示面积填充', type: 'switch', field: 'areaVisible', optionField: 'area.visible', value: true, tabName: 'custom', groupName: 'graph' },
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.0.visible', value: true, tabName: 'custom', groupName: 'legend' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (与堆叠面积图相同)
const data = {
  id: 'percentStackedAreaData',
  values: [
    { type: 'Nail polish', country: 'Africa', value: 4229 }, { type: 'Nail polish', country: 'EU', value: 4376 },
    // ... 更多数据 ...
    { type: 'Mascara', country: 'Africa', value: 18712 }, { type: 'Mascara', country: 'EU', value: 6134 },
    { type: 'Mascara', country: 'China', value: 10419 }, { type: 'Mascara', country: 'USA', value: 11261 }
  ]
};

// 默认 VChart Option (Spec) for Percentage Stacked Area Chart
const option = {
  type: 'area',
  data: [data],
  percent: true, // 启用百分比堆叠
  stack: true,   // 百分比堆叠需要 stack: true
  xField: 'type',
  yField: 'value',
  seriesField: 'country',
  point: { // 点配置
    visible: false,
    style: {
      size: 4
    }
  },
  line: { // 线配置
    visible: true,
    style: {
      lineWidth: 2
    }
  },
  area: { // 面积配置
    visible: true
  },
  axes: [ // 轴配置
    { orient: 'bottom', type: 'band', visible: true },
    { 
      orient: 'left', 
      type: 'linear', 
      visible: true,
      label: { 
        // formatMethod 将在 optionHandler 中处理
      } 
    }
  ],
  legends: [{ // 图例配置
    visible: true,
    position: 'middle',
    orient: 'bottom'
  }],
  tooltip: { visible: true }
};

const dataHandler = `return data;`;

// Option 处理函数: 根据 percent 设置 Y 轴标签格式化
const optionHandler = `
function handleOption(option, config) {
  const isPercent = config.setting.find(s => s.field === 'percent')?.value;
  const yAxisIndex = option.axes?.findIndex(axis => axis.orient === 'left');

  if (yAxisIndex !== -1 && option.axes[yAxisIndex]) {
    if (!option.axes[yAxisIndex].label) { option.axes[yAxisIndex].label = {}; }
    
    if (isPercent) {
      option.axes[yAxisIndex].label.formatMethod = (val) => {
        const num = Number(val);
        if (isNaN(num)) { return val; }
        return \`\${(num * 100).toFixed(0)}%\`; // 显示整数百分比
      };
      // 确保 stack 为 true
      option.stack = true;
    } else {
      // 如果不启用百分比，移除格式化方法
      delete option.axes[yAxisIndex].label.formatMethod;
      // 假设非百分比时也不堆叠
      // delete option.stack;
    }
  }

  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 