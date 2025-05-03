// 配置版本号
const version = '2024051728';
// 标题
const title = 'V流图'; // 或称 河流图
// 用于标识，唯一
const name = 'V流图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'area'; // 流图通过 area 类型实现

// 右侧配置项 (流图)
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 year
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 n
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 name
  // 样式配置
  { label: '启用堆叠', type: 'switch', field: 'stack', optionField: 'stack', value: true, tabName: 'custom', groupName: 'graph' }, // 流图必须启用
  { 
    label: '堆叠偏移', 
    type: 'select', 
    field: 'stackOffset', 
    optionField: 'stackOffset', // 注意：spec 中用了 stackOffsetSilhouette，但 VChart 标准是 stackOffset 属性
    options: [
      { label: '中心对称 (Silhouette)', value: 'silhouette' }, 
      { label: '基线偏移 (Wiggle)', value: 'wiggle' }, 
      { label: '零基线 (Zero)', value: 'zero' }, // 默认的堆叠
      { label: '百分比 (Expand)', value: 'expand' } // 百分比堆叠
    ], 
    value: 'silhouette', // 默认流图样式
    tabName: 'custom', 
    groupName: 'graph' 
  },
  { label: '显示点', type: 'switch', field: 'pointVisible', optionField: 'point.visible', value: false, tabName: 'custom', groupName: 'graph' }, // 流图通常不显示点
  { label: '面积透明度', type: 'inputNumber', field: 'areaOpacity', optionField: 'area.style.fillOpacity', value: 0.4, min: 0, max: 1, step: 0.1, tabName: 'custom', groupName: 'graph' },
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.0.visible', value: true, tabName: 'custom', groupName: 'legend' },
  { label: '隐藏数值轴', type: 'switch', field: 'yAxisVisible', optionField: 'axes.0.visible', value: true, tabName: 'custom', groupName: 'axis' }, // 默认隐藏
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (结构来自参考 spec，数据简化)
const data = {
  id: 'streamgraphData',
  values: [
    { "year": 2000, "n": 10, "name": "A" }, { "year": 2000, "n": 15, "name": "B" }, { "year": 2000, "n": 5, "name": "C" },
    { "year": 2001, "n": 12, "name": "A" }, { "year": 2001, "n": 18, "name": "B" }, { "year": 2001, "n": 8, "name": "C" },
    { "year": 2002, "n": 8, "name": "A" }, { "year": 2002, "n": 20, "name": "B" }, { "year": 2002, "n": 10, "name": "C" },
    { "year": 2003, "n": 15, "name": "A" }, { "year": 2003, "n": 12, "name": "B" }, { "year": 2003, "n": 15, "name": "C" }
  ]
};

// 默认 VChart Option (Spec) for Streamgraph
const option = {
  type: 'area',
  data: [data],
  xField: 'year',
  yField: 'n',
  seriesField: 'name',
  stack: true, // 必须
  stackOffset: 'silhouette', // 流图效果
  point: { visible: false }, // 通常不显示点
  area: { 
    style: { 
      fillOpacity: 0.4 // 默认透明度
    }
  },
  legends: [{ 
    visible: true, 
    position: 'middle', 
    orient: 'bottom' 
  }],
  axes: [
    { 
      orient: 'left', 
      visible: false // 默认隐藏 Y 轴
    },
    { 
      orient: 'bottom', 
      type: 'band', // 假设 xField 是类别或时间
      label: { visible: true }
    }
  ],
  tooltip: { visible: true }
};

const dataHandler = `return data;`;

// Option 处理函数: 根据 setting 调整 stackOffset 和 Y 轴可见性
const optionHandler = `
function handleOption(option, config) {
  const stackOffsetSetting = config.setting.find(s => s.field === 'stackOffset');
  if (stackOffsetSetting) {
    option.stackOffset = stackOffsetSetting.value;
    // 确保 stack 为 true 当 stackOffset 不是 zero 时
    if (option.stackOffset !== 'zero') {
      option.stack = true;
    } else {
       // 如果 stackOffset 是 zero，则 stack 由 stack 设置控制
       const stackSetting = config.setting.find(s => s.field === 'stack');
       if (stackSetting) { option.stack = stackSetting.value; }
    }
  }

  const yAxisVisibleSetting = config.setting.find(s => s.field === 'yAxisVisible');
  const yAxisIndex = option.axes?.findIndex(axis => axis.orient === 'left');
  if (yAxisVisibleSetting && yAxisIndex !== -1 && option.axes[yAxisIndex]) {
    // 注意：设置是"隐藏数值轴"，所以 value 为 true 时，visible 为 false
    option.axes[yAxisIndex].visible = !yAxisVisibleSetting.value;
  }

  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 