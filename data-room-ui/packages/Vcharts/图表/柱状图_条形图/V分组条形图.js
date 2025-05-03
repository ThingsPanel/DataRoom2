// 配置版本号
const version = '2024051706';
// 标题
const title = 'V分组条形图';
// 用于标识，唯一
const name = 'V分组条形图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项 (分组条形图)
const setting = [
  { label: '类别轴字段 (Y)', type: 'select', field: 'yField', optionField: 'yField.0', multiple: false, value: '', tabName: 'data' }, // 对应 x
  { label: '分组字段 (Y)', type: 'select', field: 'yGroupField', optionField: 'yField.1', multiple: false, value: '', tabName: 'data' }, // 对应 type (用于分组)
  { label: '值轴字段 (X)', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 y
  { label: '颜色/图例字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 type (用于颜色)
  // 样式配置
  { label: '图例位置', type: 'select', field: 'legendOrient', optionField: 'legends.orient', options: [ { label: '顶部', value: 'top' }, { label: '底部', value: 'bottom' }, { label: '左侧', value: 'left' }, { label: '右侧', value: 'right' } ], value: 'bottom', tabName: 'custom', groupName: 'legend' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'barData',
  values: [
    { x: '2:00', y: 82, type: 'sales' }, { x: '4:00', y: 50, type: 'sales' }, { x: '6:00', y: 64, type: 'sales' },
    { x: '8:00', y: 30, type: 'sales' }, { x: '10:00', y: 40, type: 'sales' }, { x: '12:00', y: 40, type: 'sales' },
    { x: '14:00', y: 56, type: 'sales' }, { x: '16:00', y: 40, type: 'sales' }, { x: '18:00', y: 64, type: 'sales' },
    { x: '20:00', y: 74, type: 'sales' }, { x: '22:00', y: 98, type: 'sales' }, { x: '2:00', y: 62, type: 'profit' },
    { x: '4:00', y: 30, type: 'profit' }, { x: '6:00', y: 32, type: 'profit' }, { x: '8:00', y: 10, type: 'profit' },
    { x: '10:00', y: 20, type: 'profit' }, { x: '12:00', y: 20, type: 'profit' }, { x: '14:00', y: 36, type: 'profit' },
    { x: '16:00', y: 20, type: 'profit' }, { x: '18:00', y: 44, type: 'profit' }, { x: '20:00', y: 74, type: 'profit' },
    { x: '22:00', y: 78, type: 'profit' }
  ]
};

// 默认 VChart Option (Spec) for Grouped Bar Chart (Horizontal)
const option = {
  type: 'bar',
  data: [data],
  direction: 'horizontal',
  xField: 'y', // 值轴
  yField: ['x', 'type'], // 复合 Y 轴 (分组)
  seriesField: 'type', // 颜色/图例
  legends: {
    visible: true,
    orient: 'bottom' // 默认图例在底部
  },
  axes: [
    { // Y 轴
      orient: 'left',
      type: 'band', // 分组条形图的类别轴是 band
      paddingInner: 0, // 参考 spec
      visible: true
    },
    { // X 轴
      orient: 'bottom',
      type: 'linear',
      visible: true
    }
  ],
  tooltip: { visible: true }
};

const dataHandler = `return data;`;
const optionHandler = ``;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 