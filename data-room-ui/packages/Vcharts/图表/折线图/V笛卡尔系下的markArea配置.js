// 配置版本号
const version = '2024072501';
// 标题
const title = 'V笛卡尔系下的markArea配置';
// 用于标识，唯一
const name = 'V笛卡尔系下的markArea配置';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: 'x', tabName: 'data' },
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: 'y', tabName: 'data' },
  // MarkArea 基础配置 (以第一个区域为例)
  {
    label: '区域1标签文本',
    type: 'input',
    field: 'markArea1LabelText',
    optionField: 'markArea[0].label.text',
    value: '区域 A-B',
    tabName: 'custom',
    groupName: 'markArea'
  },
  {
    label: '区域1标签位置',
    type: 'select',
    field: 'markArea1LabelPos',
    optionField: 'markArea[0].label.position',
    options: [
      {label: '左上', value: 'leftTop'}, {label: '右上', value: 'rightTop'}, 
      {label: '左下', value: 'leftBottom'}, {label: '右下', value: 'rightBottom'}, 
      {label: '内部', value: 'inside'}, {label: '左侧', value: 'left'}, {label: '右侧', value: 'right'}, 
      {label: '顶部', value: 'top'}, {label: '底部', value: 'bottom'}
    ],
    value: 'leftTop',
    tabName: 'custom',
    groupName: 'markArea'
  },
  {
    label: '区域1填充色',
    type: 'colorPicker',
    field: 'markArea1Fill',
    optionField: 'markArea[0].area.style.fill',
    value: 'rgba(64, 158, 255, 0.15)', // 浅蓝色
    tabName: 'custom',
    groupName: 'markArea'
  },
  {
    label: '区域1标签颜色',
    type: 'colorPicker',
    field: 'markArea1LabelFill',
    optionField: 'markArea[0].label.style.fill',
    value: '#333333',
    tabName: 'custom',
    groupName: 'markArea'
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
  id: 'markAreaData',
  values: [
    { x: 'A', y: 10 }, { x: 'B', y: 20 }, { x: 'C', y: 15 }, { x: 'D', y: 25 },
    { x: 'E', y: 30 }, { x: 'F', y: 12 }, { x: 'G', y: 5 }, { x: 'H', y: -5 }, { x: 'I', y: -10 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'line',
  data: [data],
  xField: 'x',
  yField: 'y',
  // Hide line and points to focus on markArea
  line: { visible: false },
  point: { visible: false },
  // Define axes ranges if necessary, similar to ref spec
  axes: [
    { orient: 'left', max: 35, min: -12 }, // Y-axis from ref spec
    { orient: 'bottom' } // Basic X-axis
  ],
  markArea: [
    {
      x: 'A', x1: 'B', // Define area range
      y: 35, y1: 32,
      area: { // Area style
        style: {
          fill: 'rgba(64, 158, 255, 0.15)', // Default fill
          stroke: '#409EFF',
          lineWidth: 1
        }
      },
      label: { // Label style and position
        text: '区域 A-B', // Default text
        position: 'leftTop', // Default position
        style: {
          fill: '#333333', // Default label color
          fontSize: 12,
          fontWeight: 'bold'
        }
      },
      state: { // Add basic hover state
          hover: {
              area: { style: { fillOpacity: 0.5 } },
              label: { style: { fill: '#000' } }
          }
      }
    },
    // Add a second example area (optional, can be added via override)
    {
      x: 'F', x1: 'H',
      y: 5, y1: -6,
      area: {
        style: {
          fill: 'rgba(103, 194, 58, 0.15)', // Different color
          stroke: '#67C23A',
          lineWidth: 1
        }
      },
      label: {
        text: '区域 F-H',
        position: 'insideBottom',
        style: {
          fill: '#333333',
          fontSize: 12
        }
      }
    }
  ],
  tooltip: { // Disable tooltip as in ref spec
      visible: false
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // Handle first markArea settings
  const markArea1LabelText = settings.find(s => s.field === 'markArea1LabelText')?.value;
  const markArea1LabelPos = settings.find(s => s.field === 'markArea1LabelPos')?.value;
  const markArea1Fill = settings.find(s => s.field === 'markArea1Fill')?.value;
  const markArea1LabelFill = settings.find(s => s.field === 'markArea1LabelFill')?.value;

  if (option.markArea && option.markArea[0]) {
      const area1 = option.markArea[0];
      if (area1.label && markArea1LabelText !== undefined) {
          area1.label.text = markArea1LabelText;
      }
      if (area1.label && markArea1LabelPos) {
          area1.label.position = markArea1LabelPos;
      }
      if (area1.area?.style && markArea1Fill) {
          area1.area.style.fill = markArea1Fill;
      }
      if (area1.label?.style && markArea1LabelFill) {
          area1.label.style.fill = markArea1LabelFill;
      }
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 