// 配置版本号
const version = '2024072501';
// 标题
const title = 'V带生长动画的折线图';
// 用于标识，唯一
const name = 'V带生长动画的折线图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField.0', multiple: false, value: 'category', tabName: 'data' },
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField.0', multiple: false, value: 'value', tabName: 'data' },
  { label: '分组字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: 'group', tabName: 'data' },
  // 图表方向
  {
    label: '图表方向', 
    type: 'select', 
    field: 'direction', 
    optionField: 'direction',
    options: [
      { label: '水平', value: 'horizontal' },
      { label: '垂直', value: 'vertical' }
    ],
    value: 'vertical', // 默认垂直
    tabName: 'custom',
    groupName: 'basic'
  },
  // 动画配置
  {
    label: '动画时长(ms)', 
    type: 'inputNumber', 
    field: 'duration', 
    // 同时设置 line 和 point 的动画时长
    optionField: 'animationAppear.line.duration,animationAppear.point.duration', 
    value: 1000, 
    min: 100,
    max: 5000,
    step: 100,
    tabName: 'custom', 
    groupName: 'animation' 
  },
  {
    label: '缓动函数',
    type: 'select',
    field: 'easing',
    optionField: 'animationAppear.line.easing,animationAppear.point.easing',
    options: [
      { label: '线性', value: 'linear' }, { label: '缓入', value: 'easeIn' }, 
      { label: '缓出', value: 'easeOut' }, { label: '缓入缓出', value: 'easeInOut' }
      // VChart 支持更多类型，按需添加
    ],
    value: 'linear',
    tabName: 'custom',
    groupName: 'animation'
  },
  {
    label: '生长方向',
    type: 'select',
    field: 'growOrient',
    optionField: 'animationAppear.line.options.orient',
    options: [
      { label: '正向', value: 'positive' }, 
      { label: '负向', value: 'negative' }
    ],
    value: 'negative', // 默认负向
    tabName: 'custom',
    groupName: 'animation'
  },
  // 样式配置
  { 
    label: '显示数据点', 
    type: 'switch', 
    field: 'pointVisible', 
    optionField: 'point.visible', 
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
  id: 'growAnimateData',
  values: [
    { category: 'A', value: 10, group: 'Grp1' }, { category: 'B', value: 20, group: 'Grp1' }, { category: 'C', value: 15, group: 'Grp1' }, { category: 'D', value: 25, group: 'Grp1' }, { category: 'E', value: 30, group: 'Grp1' },
    { category: 'A', value: 12, group: 'Grp2' }, { category: 'B', value: 18, group: 'Grp2' }, { category: 'C', value: 22, group: 'Grp2' }, { category: 'D', value: 20, group: 'Grp2' }, { category: 'E', value: 28, group: 'Grp2' }
  ]
};

// 默认 VChart Option
const option = {
  type: 'line',
  data: [data],
  xField: 'category', // Use simplified field names
  yField: 'value',
  seriesField: 'group',
  direction: 'vertical', // 默认垂直方向
  invalidType: 'break', // 空值断开
  point: {
    visible: true, // 默认显示点
    style: { size: 4 } // 基础点大小
  },
  line: {
    style: { lineWidth: 2 } // 基础线宽
  },
  legends: { visible: true }, // 显示图例
  axes: [
      { orient: 'bottom' }, // 定义 X 轴
      { orient: 'left' }   // 定义 Y 轴
  ],
  // Animation configuration
  animation: true,
  animationAppear: {
    line: {
      type: 'growPointsYIn', // 生长动画
      options: {
        orient: 'negative' // 生长方向
      },
      oneByOne: false, // 非逐个动画
      easing: 'linear', // 缓动函数
      duration: 1000 // 动画时长
    },
    point: {
      type: 'moveIn', // 点动画
      options: { direction: 'y', orient: 'negative' }, // 点移动方向
      easing: 'linear',
      duration: 1000
    }
  }
  // Removed complex animationNormal and detailed style mappings from ref spec
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 处理图表方向
  const direction = settings.find(s => s.field === 'direction')?.value;
  if (direction) {
      option.direction = direction;
      // 根据方向调整 Y 轴生长方向 (如果需要)
      // const growOrient = direction === 'vertical' ? 'negative' : 'positive'; // Example logic
      // if(option.animationAppear?.line?.options) option.animationAppear.line.options.orient = growOrient;
      // if(option.animationAppear?.point?.options) option.animationAppear.point.options.orient = growOrient;
  }

  // 处理动画配置
  const duration = settings.find(s => s.field === 'duration')?.value;
  const easing = settings.find(s => s.field === 'easing')?.value;
  const growOrient = settings.find(s => s.field === 'growOrient')?.value;

  if (option.animationAppear) {
    if (option.animationAppear.line) {
      if (duration !== undefined) option.animationAppear.line.duration = duration;
      if (easing) option.animationAppear.line.easing = easing;
      if (option.animationAppear.line.options && growOrient) {
          option.animationAppear.line.options.orient = growOrient;
      }
    }
    if (option.animationAppear.point) {
      if (duration !== undefined) option.animationAppear.point.duration = duration;
      if (easing) option.animationAppear.point.easing = easing;
       // Point moveIn direction might also need adjustment based on growOrient
      if (option.animationAppear.point.options && growOrient) {
          option.animationAppear.point.options.orient = growOrient;
      }
    }
  }

  // 处理样式配置
  const pointVisible = settings.find(s => s.field === 'pointVisible')?.value;
  if (option.point && pointVisible !== undefined) {
    option.point.visible = pointVisible;
  }
  const lineWidth = settings.find(s => s.field === 'lineWidth')?.value;
  if (option.line?.style && lineWidth !== undefined) {
    option.line.style.lineWidth = lineWidth;
  }

  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 