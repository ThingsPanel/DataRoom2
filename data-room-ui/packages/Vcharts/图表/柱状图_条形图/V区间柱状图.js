// 配置版本号
const version = '2024072420';
// 标题
const title = 'V区间柱状图';
// 用于标识，唯一
const name = 'V区间柱状图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'rangeColumn'; // 区间柱状图

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 type
  { label: '最小值字段', type: 'select', field: 'yFieldMin', optionField: 'yField.0', multiple: false, value: '', tabName: 'data' }, // 对应 min
  { label: '最大值字段', type: 'select', field: 'yFieldMax', optionField: 'yField.1', multiple: false, value: '', tabName: 'data' }, // 对应 max
  // 样式配置
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: true, tabName: 'custom', groupName: 'label' },
  { label: '标签位置', type: 'select', field: 'labelPosition', optionField: 'label.position', 
    options: [
      { label: '两端', value: 'bothEnd' },
      { label: '最小值端', value: 'min' },
      { label: '最大值端', value: 'max' }
    ], 
    value: 'bothEnd', tabName: 'custom', groupName: 'label' 
  },
  { label: '柱子宽度', type: 'inputNumber', field: 'barWidth', optionField: 'barWidth', value: 0.5, min: 0.1, max: 1, step: 0.1, tabName: 'custom', groupName: 'bar' },
  { label: '显示区间线', type: 'switch', field: 'showRangeLine', optionField: 'rangeLine.visible', value: true, tabName: 'custom', groupName: 'bar' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { 
    label: 'Option 覆盖 (JSON)', 
    type: 'textarea', 
    field: 'optionOverride', 
    optionField: '', 
    value: JSON.stringify({
      rangeLine: {
        visible: true,
        style: {
          stroke: '#000',
          lineWidth: 1,
          lineDash: [2, 2]
        }
      }
    }, null, 2),
    tabName: 'custom', 
    groupName: 'graph' 
  }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'rangeColumnData',
  values: [
    { type: 'Category One', min: 76, max: 100 },
    { type: 'Category Two', min: 56, max: 108 },
    { type: 'Category Three', min: 38, max: 129 },
    { type: 'Category Four', min: 58, max: 155 },
    { type: 'Category Five', min: 45, max: 120 },
    { type: 'Category Six', min: 23, max: 99 },
    { type: 'Category Seven', min: 18, max: 56 },
    { label: 'Category Eight', min: 18, max: 34 }
  ]
};

// 默认 VChart Option (Spec) - 区间柱状图
const option = {
  type: 'rangeColumn',
  data: [data],
  xField: 'type',
  yField: ['min', 'max'],
  barWidth: 0.5,
  label: {
    visible: true,
    position: 'bothEnd',
    style: {
      fill: '#333'
    }
  },
  rangeLine: {
    visible: true,
    style: {
      stroke: '#000',
      lineWidth: 1,
      lineDash: [2, 2]
    }
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // 处理柱子宽度
  const barWidthSetting = config.setting.find(s => s.field === 'barWidth');
  if (barWidthSetting) {
    option.barWidth = barWidthSetting.value;
  }
  
  // 处理区间线开关
  const showRangeLineSetting = config.setting.find(s => s.field === 'showRangeLine');
  if (showRangeLineSetting !== undefined) {
    if (option.rangeLine) {
      option.rangeLine.visible = showRangeLineSetting.value;
    } else {
      option.rangeLine = { visible: showRangeLineSetting.value };
    }
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 