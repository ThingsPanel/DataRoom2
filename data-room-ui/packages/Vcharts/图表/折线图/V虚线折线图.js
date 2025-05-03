// 配置版本号
const version = '2024051717';
// 标题
const title = 'V虚线折线图'; // 名称修正
// 用于标识，唯一
const name = 'V虚线折线图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项 (虚线折线图)
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, 
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, 
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 可选，用于多系列
  // 样式配置
  {
    label: '线型 (数组)',
    type: 'input',
    field: 'lineDash',
    optionField: 'line.style.lineDash',
    value: '[4, 4]',
    placeholder: '例: [4, 4] 或留空表示实线',
    tabName: 'custom',
    groupName: 'graph'
  },
  { label: '显示点', type: 'switch', field: 'pointVisible', optionField: 'point.visible', value: true, tabName: 'custom', groupName: 'graph' },
  { label: '点的大小', type: 'inputNumber', field: 'pointSize', optionField: 'point.style.size', value: 4, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '线的宽度', type: 'inputNumber', field: 'lineWidth', optionField: 'line.style.lineWidth', value: 2, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: false, tabName: 'custom', groupName: 'label' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (基础折线图数据)
const data = {
  id: 'dashedLineData',
  values: [
    { time: '2:00', value: 8, type: '实线' }, { time: '4:00', value: 9, type: '实线' }, 
    { time: '6:00', value: 11, type: '实线' }, { time: '8:00', value: 14, type: '实线' },
    // 假设从 10:00 开始是虚线 (需要数据或 seriesField 配合)
    { time: '8:00', value: 14, type: '虚线' }, // 添加一个点连接实线和虚线
    { time: '10:00', value: 16, type: '虚线' }, { time: '12:00', value: 17, type: '虚线' },
    { time: '14:00', value: 17, type: '虚线' }, { time: '16:00', value: 16, type: '虚线' },
    { time: '18:00', value: 15, type: '虚线' }
  ]
};

// 默认 VChart Option (Spec) for Dashed Line Chart
const option = {
  type: 'line',
  data: [data],
  xField: 'time',
  yField: 'value',
  seriesField: 'type', // 使用 seriesField 区分虚实线段
  line: { // 线配置
    style: {
      lineWidth: 2,
      // lineDash 将在 optionHandler 中处理
      stroke: datum => (datum.type === '虚线' ? undefined : undefined), // 允许主题控制颜色
      lineDash: datum => (datum.type === '虚线' ? [4, 4] : []) // 根据系列设置虚线
    }
  },
  point: { // 点配置
    visible: true,
    style: {
      size: 4
    }
  },
  label: { // 标签配置
    visible: false
  },
  axes: [ // 基础轴配置
    { orient: 'bottom', type: 'band', visible: true },
    { orient: 'left', type: 'linear', visible: true }
  ],
  legends: { visible: true }, // 显示图例区分虚实线
  tooltip: { visible: true }
};

const dataHandler = `return data;`;

// Option 处理函数: 解析 setting 中的 lineDash 字符串
const optionHandler = `
function handleOption(option, config) {
  const lineDashStr = config.setting.find(s => s.field === 'lineDash')?.value;
  
  // 应用全局 lineDash 设置 (如果需要)
  /*
  if (lineDashStr && option.line?.style) {
    try {
      const parsedDash = JSON.parse(lineDashStr);
      if (Array.isArray(parsedDash) && parsedDash.every(n => typeof n === 'number')) {
        option.line.style.lineDash = parsedDash;
      } else {
        console.warn('Invalid lineDash format, expected array of numbers:', lineDashStr);
        delete option.line.style.lineDash;
      }
    } catch (e) {
      console.error('Error parsing lineDash:', e);
      delete option.line.style.lineDash;
    }
  } else if (option.line?.style) {
    // 如果输入为空或无效，确保移除 lineDash 以使用实线
    delete option.line.style.lineDash;
  }
  */
 
  // 保持 spec 中基于 seriesField 的动态 lineDash 设置
  // 如果需要全局控制，需要修改 option 中的 line.style.lineDash
  // 并可能移除 seriesField 的依赖

  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 