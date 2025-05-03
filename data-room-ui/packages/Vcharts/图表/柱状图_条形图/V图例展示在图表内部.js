// 配置版本号
const version = '2024072501';
// 标题
const title = 'V图例展示在图表内部';
// 用于标识，唯一
const name = 'V图例展示在图表内部';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: 'city', tabName: 'data' },
  { label: '数值字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: 'rate', tabName: 'data' },
  { label: '分组字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: 'trend', tabName: 'data' },
  // 图例配置
  { 
    label: '显示图例', 
    type: 'switch', 
    field: 'legendVisible', 
    optionField: 'legends[0].visible', // 配置第一个图例
    value: true, 
    tabName: 'custom', 
    groupName: 'legend' 
  },
  {
    label: '图例X坐标',
    type: 'inputNumber',
    field: 'legendLeft',
    optionField: 'legends[0].left',
    value: 150,
    min: 0,
    step: 10,
    tabName: 'custom',
    groupName: 'legend'
  },
    {
    label: '图例Y坐标',
    type: 'inputNumber',
    field: 'legendTop',
    optionField: 'legends[0].top',
    value: 100,
    min: 0,
    step: 10,
    tabName: 'custom',
    groupName: 'legend'
  },
  {
    label: '显示图例背景',
    type: 'switch',
    field: 'legendBgVisible',
    optionField: 'legends[0].background.visible',
    value: true,
    tabName: 'custom',
    groupName: 'legend'
  },
  // 标签配置（从参考 spec 中提取）
  { 
    label: '显示标签', 
    type: 'switch', 
    field: 'labelVisible', 
    optionField: 'label.visible', 
    value: true, 
    tabName: 'custom', 
    groupName: 'label' 
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
  id: 'legendInsideData',
  values: [
    { city: 'City A', rate: 1.5, trend: 'Increase' }, { city: 'City B', rate: -0.8, trend: 'Decrease' },
    { city: 'City C', rate: 1.2, trend: 'Increase' }, { city: 'City D', rate: -1.1, trend: 'Decrease' },
    { city: 'City E', rate: 0.5, trend: 'Increase' }, { city: 'City F', rate: -0.2, trend: 'Decrease' }
  ]
};

// 默认 VChart Option
const option = {
  type: 'bar',
  data: [data],
  yField: 'city',
  xField: 'rate',
  seriesField: 'trend',
  direction: 'horizontal',
  // color: ['#1890FF', '#2FC25B'], // 移除硬编码颜色
  label: { // 保留标签配置
    visible: true,
    style: {
      text: obj => obj.rate.toFixed(1) + '%', // 保持格式化
      fill: '#333',
      fontWeight: 'bold',
      fontSize: 10
    }
  },
  axes: [ // 保留轴配置
    {
      orient: 'left',
      domainLine: { visible: false },
      tick: { visible: false }
    },
    {
      orient: 'bottom',
      tick: { visible: false, tickCount: 5 },
      label: {
        formatMethod: val => val + '%'
      },
      min: -2,
      max: 2
    }
  ],
  legends: [ // 保留图例核心配置
    {
      visible: true,
      orient: 'top',
      position: 'start',
      layoutType: 'absolute', // 绝对布局
      left: 150, // X 坐标
      top: 100,  // Y 坐标
      item: {
        shape: {
          style: {
            symbolType: 'square'
          }
        }
      },
      background: { // 图例背景
        visible: true,
        padding: 4,
        style: {
          stroke: '#ccc', // 简化背景样式
          lineWidth: 1,
          cornerRadius: 2
          // 移除阴影
        }
      }
    }
  ]
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;
  
  // 处理图例配置
  const legendVisible = settings.find(s => s.field === 'legendVisible')?.value;
  const legendLeft = settings.find(s => s.field === 'legendLeft')?.value;
  const legendTop = settings.find(s => s.field === 'legendTop')?.value;
  const legendBgVisible = settings.find(s => s.field === 'legendBgVisible')?.value;

  if (option.legends && option.legends[0]) {
    if (legendVisible !== undefined) {
      option.legends[0].visible = legendVisible;
    }
    if (legendLeft !== undefined) {
      option.legends[0].left = legendLeft;
    }
    if (legendTop !== undefined) {
      option.legends[0].top = legendTop;
    }
    if (option.legends[0].background && legendBgVisible !== undefined) {
      option.legends[0].background.visible = legendBgVisible;
    }
  }

  // 处理标签显示
  const labelVisible = settings.find(s => s.field === 'labelVisible')?.value;
  if (option.label && labelVisible !== undefined) {
    option.label.visible = labelVisible;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 