// 配置版本号
const version = '2024051705';
// 标题
const title = 'V渐变圆角柱状图';
// 用于标识，唯一
const name = 'V渐变圆角柱状图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项
const setting = [
  // 数据配置
  { label: '类别轴字段 (X)', type: 'select', field: 'xField', optionField: 'xField.0', multiple: false, value: '', tabName: 'data' },
  { label: '分组字段 (X)', type: 'select', field: 'xGroupField', optionField: 'xField.1', multiple: false, value: '', tabName: 'data' },
  { label: '值轴字段 (Y)', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  { label: '颜色/图例字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' },

  // 样式配置
  {
    label: '柱子样式',
    type: 'group',
    tabName: 'style',
    groupName: 'style',
    children: [
      { label: '圆角半径', type: 'inputNumber', field: 'cornerRadius', optionField: 'bar.style.cornerRadius', value: 10, min: 0 },
      { label: '启用渐变', type: 'switch', field: 'enableGradient', optionField: 'bar.style.fill.gradient', value: true },
      { label: '渐变起始色', type: 'color', field: 'gradientStartColor', optionField: 'bar.style.fill.stops.0.color', value: '#86DF6C' },
      { label: '渐变结束色', type: 'color', field: 'gradientEndColor', optionField: 'bar.style.fill.stops.1.color', value: '#468DFF' }
    ]
  },

  // 通用配置
  {
    label: '通用设置',
    type: 'group',
    tabName: 'general',
    groupName: 'general',
    children: [
      { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light' },
      { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}' }
    ]
  }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'data',
  values: [
    { x: 'Mon', y: 100, type: 'sales' }, { x: 'Tues', y: 66, type: 'sales' }, { x: 'Wed', y: 95, type: 'sales' },
    { x: 'Thus', y: 52, type: 'sales' }, { x: 'Fri', y: 68, type: 'sales' }, { x: 'Sat', y: 52, type: 'sales' },
    { x: 'sun', y: 48, type: 'sales' }, { x: 'Mon', y: 43, type: 'profit' }, { x: 'Tues', y: 80, type: 'profit' },
    { x: 'Wed', y: 68, type: 'profit' }, { x: 'Thus', y: 40, type: 'profit' }, { x: 'Fri', y: 53, type: 'profit' },
    { x: 'Sat', y: 72, type: 'profit' }, { x: 'sun', y: 71, type: 'profit' }
  ]
};

// 默认 VChart Option (Spec) for Gradient Rounded Bar Chart
const option = {
  type: 'bar',
  data: [data],
  xField: ['x', 'type'], // 使用数组表示复合 X 轴 (分组)
  yField: 'y',
  seriesField: 'type', // 用于颜色和图例
  bar: {
    style: {
      cornerRadius: 10, // 默认圆角
      fill: { // 默认渐变
        gradient: 'linear',
        x0: 0.5,
        y0: 0,
        x1: 0.5,
        y1: 1,
        stops: [
          { offset: 0, color: '#86DF6C' }, // 起始色
          { offset: 1, color: '#468DFF' }  // 结束色
        ]
      }
    },
    state: { // 选中状态样式
      selected: {
        stroke: '#000',
        lineWidth: 1
      }
    }
  },
  axes: [
    { // X 轴
      orient: 'bottom',
      domainLine: { visible: false }, // 隐藏轴线
      bandPadding: 0, // 分组间距
      paddingInner: 0.1 // 组内间距
    },
    { // Y 轴
      orient: 'left',
      grid: { visible: false }, // 隐藏网格线
      tick: { visible: true, tickCount: 3 }, // 显示刻度，指定数量
      domainLine: { visible: false } // 隐藏轴线
    }
  ],
  legends: { visible: true }, // 显示图例
  tooltip: { visible: true }
};

const dataHandler = `return data;`;

// Option 处理函数：根据 setting 动态启用/禁用渐变
const optionHandler = `
function handleOption(option, config) {
  const enableGradient = config.setting.find(s => s.field === 'enableGradient')?.value;

  if (option.bar?.style?.fill) {
    if (enableGradient === false) {
      // 如果禁用渐变，删除渐变配置，颜色将由 seriesField 和主题决定
      delete option.bar.style.fill.gradient;
      delete option.bar.style.fill.stops;
      // 或者可以设置一个默认单色，但这可能会覆盖 seriesField 的颜色映射
      // option.bar.style.fill = config.setting.find(s => s.field === 'gradientStartColor')?.value || '#468DFF';
    } else {
      // 确保渐变配置存在（如果之前被删除了）
      option.bar.style.fill.gradient = 'linear';
      option.bar.style.fill.x0 = 0.5;
      option.bar.style.fill.y0 = 0;
      option.bar.style.fill.x1 = 0.5;
      option.bar.style.fill.y1 = 1;
      // 更新渐变颜色（如果 setting 中有配置）
      const startColor = config.setting.find(s => s.field === 'gradientStartColor')?.value;
      const endColor = config.setting.find(s => s.field === 'gradientEndColor')?.value;
      if (!option.bar.style.fill.stops) { option.bar.style.fill.stops = [{offset:0}, {offset:1}]; }
      if (startColor) { option.bar.style.fill.stops[0].color = startColor; }
      if (endColor) { option.bar.style.fill.stops[1].color = endColor; }
    }
  }

  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
};
