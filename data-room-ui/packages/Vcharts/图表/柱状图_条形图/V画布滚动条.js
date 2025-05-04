// 配置版本号
const version = '2024051807';
// 标题
const title = 'V画布滚动条';
// 用于标识，唯一
const name = 'V画布滚动条';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 条形图

// 右侧配置项
const setting = [
  // 数据配置
  { label: '类别字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  { label: '数值字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },

  // 滚动条配置
  {
    label: '滚动条位置',
    type: 'select',
    field: 'scrollBarOrient',
    optionField: 'scrollBar.0.orient',
    options: [{label:'底部', value:'bottom'}, {label:'顶部', value:'top'}, {label:'左侧', value:'left'}, {label:'右侧', value:'right'}],
    value: 'right',
    tabName: 'scrollBar',
    groupName: 'scrollBar'
  },
  {
    label: '滚动条行为',
    type: 'group',
    tabName: 'scrollBar',
    groupName: 'scrollBar',
    children: [
      { label: '启用滚轮滚动', type: 'switch', field: 'scrollBarRoamScroll', optionField: 'scrollBar.0.roamScroll.enable', value: true },
      { label: '滚轮滚动速率', type: 'inputNumber', field: 'scrollBarRoamRate', optionField: 'scrollBar.0.roamScroll.rate', value: 0.05, step: 0.01 },
      { label: '滚轮方向反转', type: 'switch', field: 'scrollBarRoamReverse', optionField: 'scrollBar.0.roamScroll.reverse', value: true },
      { label: '起始位置(%)', type: 'inputNumber', field: 'scrollBarStart', optionField: 'scrollBar.0.start', value: 0, min: 0, max: 1, step: 0.01 },
      { label: '结束位置(%)', type: 'inputNumber', field: 'scrollBarEnd', optionField: 'scrollBar.0.end', value: 0.4, min: 0, max: 1, step: 0.01 }
    ]
  },

  // 标签配置
  {
    label: '标签',
    type: 'group',
    tabName: 'label',
    groupName: 'label',
    children: [
      { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: true }
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
  id: 'scrollBarRoamData',
  values: [
    { name: 'Apple', value: 214480 }, { name: 'Google', value: 155506 },
    { name: 'Amazon', value: 100764 }, { name: 'Microsoft', value: 92715 },
    { name: 'Coca-Cola', value: 66341 }, { name: 'Samsung', value: 59890 },
    { name: 'Toyota', value: 53404 }, { name: 'Mercedes-Benz', value: 48601 },
    { name: 'Facebook', value: 45168 }, { name: "McDonald's", value: 43417 },
    { name: 'Intel', value: 43293 }, { name: 'IBM', value: 42972 },
    { name: 'BMW', value: 41006 }, { name: 'Disney', value: 39874 },
    { name: 'Cisco', value: 34575 }, { name: 'GE', value: 32757 },
    { name: 'Nike', value: 30120 }, { name: 'Louis Vuitton', value: 28152 },
    { name: 'Oracle', value: 26133 }, { name: 'Honda', value: 23682 }
  ]
};

// 默认 VChart Option (Spec)
const option = {
  type: 'bar',
  data: [data],
  direction: 'horizontal',
  xField: 'value',
  yField: 'name',
  label: { visible: true },
  axes: [
    { orient: 'bottom', visible: false }, // 隐藏数值轴
    { orient: 'left', type: 'band' } // 显示类别轴
  ],
  scrollBar: [
    {
      orient: 'right', // 可配置
      start: 0, // 可配置
      end: 0.4, // 可配置
      roamScroll: { // 滚轮滚动配置
        enable: true, // 可配置
        rate: 0.05, // 可配置
        reverse: true // 可配置
      }
    }
  ]
};

const dataHandler = `return data;`;
const optionHandler = ``; // 直接通过 optionField 更新

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
};
