// 配置版本号
const version = '2024051703';
// 标题
const title = 'V基础条形图';
// 用于标识，唯一
const name = 'V基础条形图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项 (条形图结构)
const setting = [
  { label: '类别轴字段 (Y)', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 name
  { label: '值轴字段 (X)', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  // 条形图特定样式配置
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: true, tabName: 'custom', groupName: 'label' },
  { label: '显示底部轴', type: 'switch', field: 'bottomAxisVisible', optionField: 'axes.0.visible', value: false, tabName: 'custom', groupName: 'axis' }, // 参考 spec，默认隐藏底部轴
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'barData',
  values: [
    { name: 'Apple', value: 214480 }, { name: 'Google', value: 155506 }, { name: 'Amazon', value: 100764 },
    { name: 'Microsoft', value: 92715 }, { name: 'Coca-Cola', value: 66341 }, { name: 'Samsung', value: 59890 },
    { name: 'Toyota', value: 53404 }, { name: 'Mercedes-Benz', value: 48601 }, { name: 'Facebook', value: 45168 },
    { name: "McDonald's", value: 43417 }, { name: 'Intel', value: 43293 }, { name: 'IBM', value: 42972 },
    { name: 'BMW', value: 41006 }, { name: 'Disney', value: 39874 }, { name: 'Cisco', value: 34575 },
    { name: 'GE', value: 32757 }, { name: 'Nike', value: 30120 }, { name: 'Louis Vuitton', value: 28152 },
    { name: 'Oracle', value: 26133 }, { name: 'Honda', value: 23682 }
  ]
};

// 默认 VChart Option (Spec) for Basic Bar Chart (Horizontal)
const option = {
  type: 'bar',
  data: [data],
  direction: 'horizontal',
  xField: 'value',
  yField: 'name',
  axes: [
    { // X 轴 (值轴)
      orient: 'bottom',
      visible: false // 默认隐藏
    },
    { // Y 轴 (类别轴)
      orient: 'left',
      type: 'band',
      visible: true // 默认显示
    }
  ],
  label: {
    visible: true // 默认显示标签
  },
  legends: { visible: false }, // 基础条形图通常不需要图例
  tooltip: { visible: true } // 保持 tooltip 可见
};

const dataHandler = `return data;`;
const optionHandler = ``;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 