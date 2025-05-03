// 配置版本号
const version = '2024051811';
// 标题
const title = 'V分组柱状图(自定义图例UI)';
// 用于标识，唯一
const name = 'V分组柱状图自定义图例UI';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 分组柱状图

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 x
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 y
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 c
  // 样式配置
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.0.visible', value: true, tabName: 'custom', groupName: 'legend' }, // 默认显示，参考 spec 是隐藏的
  { label: '图例位置', type: 'select', field: 'legendOrient', optionField: 'legends.0.orient', options:[{label:'左',value:'left'},{label:'顶',value:'top'},{label:'右',value:'right'},{label:'底',value:'bottom'}], value: 'bottom', tabName: 'custom', groupName: 'legend' },
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: false, tabName: 'custom', groupName: 'label' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'customLegendUIData',
  values: [
    { x: 'Round 1', y: 21, c: 'Role A' }, { x: 'Round 1', y: 38, c: 'Role B' },
    { x: 'Round 2', y: 28, c: 'Role A' }, { x: 'Round 2', y: 45, c: 'Role B' },
    { x: 'Round 3', y: 22, c: 'Role A' }, { x: 'Round 3', y: 56, c: 'Role B' },
    { x: 'Round 4', y: 34, c: 'Role A' }, { x: 'Round 4', y: 48, c: 'Role B' },
    { x: 'Round 5', y: 34, c: 'Role A' }, { x: 'Round 5', y: 64, c: 'Role B' },
    { x: 'Round 6', y: 44, c: 'Role A', latest: true }, { x: 'Round 6', y: 72, c: 'Role B', latest: true },
    { x: 'Round 7', y: 38, c: 'Role A', latest: true }, { x: 'Round 7', y: 65, c: 'Role B', latest: true },
    { x: 'Round 8', y: 24, c: 'Role A', latest: true }, { x: 'Round 8', y: 70, c: 'Role B', latest: true },
    { x: 'Round 9', y: 28, c: 'Role A', latest: true }, { x: 'Round 9', y: 62, c: 'Role B', latest: true }
  ]
};

// 默认 VChart Option (Spec) - 基础分组柱状图
const option = {
  type: 'bar',
  data: [data],
  xField: 'x',
  yField: 'y',
  seriesField: 'c',
  label: { visible: false },
  legends: { 
    visible: true, // 默认显示
    orient: 'bottom' // 默认底部
  },
  axes: [
    { orient: 'left', type: 'linear' }, 
    { orient: 'bottom', type: 'band' }
  ]
};

const dataHandler = `return data;`;
const optionHandler = ``; // 基础配置，无特殊处理

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 