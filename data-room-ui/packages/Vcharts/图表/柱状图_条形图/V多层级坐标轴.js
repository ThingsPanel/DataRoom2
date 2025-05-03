// 配置版本号
const version = '2024072415';
// 标题
const title = 'V多层级坐标轴';
// 用于标识，唯一
const name = 'V多层级坐标轴';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 柱状图

// 右侧配置项
const setting = [
  { label: '类别字段1', type: 'select', field: 'xField1', optionField: 'xField.0', multiple: false, value: '', tabName: 'data' }, // 对应 type
  { label: '类别字段2', type: 'select', field: 'xField2', optionField: 'xField.1', multiple: false, value: '', tabName: 'data' }, // 对应 range
  { label: '类别字段3', type: 'select', field: 'xField3', optionField: 'xField.2', multiple: false, value: '', tabName: 'data' }, // 对应 type2
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 min
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 color
  // 样式配置
  { label: '显示所有层级', type: 'switch', field: 'showAllGroupLayers', optionField: 'axes.0.showAllGroupLayers', value: true, tabName: 'custom', groupName: 'axes' },
  { label: '禁用抽样', type: 'switch', field: 'disableSampling', optionField: 'axes.0.sampling', value: true, tabName: 'custom', groupName: 'axes' },
  { label: '标签位置', type: 'select', field: 'labelPosition', optionField: 'label.position', 
    options: [
      { label: '两端', value: 'bothEnd' },
      { label: '中部', value: 'middle' },
      { label: '顶部', value: 'top' }
    ], 
    value: 'bothEnd', tabName: 'custom', groupName: 'label' 
  },
  { label: '内部填充', type: 'inputNumber', field: 'paddingInner', optionField: 'paddingInner', value: 0.6, min: 0, max: 1, step: 0.1, tabName: 'custom', groupName: 'bar' },
  { label: '组间填充', type: 'inputNumber', field: 'bandPadding', optionField: 'bandPadding', value: 0.6, min: 0, max: 1, step: 0.1, tabName: 'custom', groupName: 'bar' },
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.visible', value: true, tabName: 'custom', groupName: 'legend' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { 
    label: 'Option 覆盖 (JSON)', 
    type: 'textarea', 
    field: 'optionOverride', 
    optionField: '', 
    value: '{}',
    tabName: 'custom', 
    groupName: 'graph' 
  }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'multiLevelAxisData',
  values: [
    { type: 'Category One', min: 76, max: 100, range: 'A', type2: 'p', color: 'A_p' },
    { type: 'Category Two', min: 56, max: 108, range: 'A', type2: 'p', color: 'A_p' },
    { type: 'Category One', min: 56, max: 100, range: 'B', type2: 'p', color: 'B_p' },
    { type: 'Category Two', min: 36, max: 108, range: 'B', type2: 'p', color: 'B_p' },

    { type: 'Category One', min: 76, max: 100, range: 'A', type2: 'k', color: 'A_k' },
    { type: 'Category Two', min: 56, max: 108, range: 'A', type2: 'k', color: 'A_k' },
    { type: 'Category One', min: 56, max: 100, range: 'B', type2: 'k', color: 'B_k' },
    { type: 'Category Two', min: 36, max: 108, range: 'B', type2: 'k', color: 'B_k' }
  ]
};

// 默认 VChart Option (Spec) - 多层级坐标轴柱状图
const option = {
  type: 'bar',
  data: [data],
  xField: ['type', 'range', 'type2'], // 三层级坐标轴
  yField: 'min',
  seriesField: 'color',
  paddingInner: [0.6, 0.6, 0.6], // 每个层级的内部填充
  bandPadding: [0.6, 0.6, 0.6], // 每个层级的组间填充
  label: {
    position: 'bothEnd' // 标签在两端
  },
  axes: [
    {
      orient: 'bottom',
      showAllGroupLayers: true, // 显示所有层级
      sampling: false, // 禁用抽样
      tick: {
        tickCount: 2 // 刻度数量
      }
    }
  ],
  legends: {
    visible: true
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // 处理 paddingInner 和 bandPadding 的统一设置
  const paddingInnerSetting = config.setting.find(s => s.field === 'paddingInner');
  if (paddingInnerSetting) {
    // 对所有三个层级应用相同的值
    option.paddingInner = [paddingInnerSetting.value, paddingInnerSetting.value, paddingInnerSetting.value];
  }
  
  const bandPaddingSetting = config.setting.find(s => s.field === 'bandPadding');
  if (bandPaddingSetting) {
    // 对所有三个层级应用相同的值
    option.bandPadding = [bandPaddingSetting.value, bandPaddingSetting.value, bandPaddingSetting.value];
  }
  
  // 处理抽样开关的反向逻辑 (true 表示禁用抽样，即 sampling: false)
  const disableSamplingSetting = config.setting.find(s => s.field === 'disableSampling');
  if (disableSamplingSetting && option.axes && option.axes[0]) {
    option.axes[0].sampling = !disableSamplingSetting.value;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 