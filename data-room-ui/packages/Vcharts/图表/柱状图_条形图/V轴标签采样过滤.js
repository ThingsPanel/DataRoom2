// 配置版本号
const version = '2024051805';
// 标题
const title = 'V轴标签采样过滤';
// 用于标识，唯一
const name = 'V轴标签采样过滤';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 分组堆叠柱状图

// 右侧配置项
const setting = [
  { label: '类别字段1', type: 'select', field: 'xFieldOuter', optionField: 'xField.0', multiple: false, value: '', tabName: 'data' }, // 对应 date
  { label: '类别字段2', type: 'select', field: 'xFieldInner', optionField: 'xField.1', multiple: false, value: '', tabName: 'data' }, // 对应 stack
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 group
  // 样式配置
  { label: '启用堆叠', type: 'switch', field: 'stack', optionField: 'stack', value: true, tabName: 'custom', groupName: 'graph' },
  { label: '关闭轴标签采样', type: 'switch', field: 'axisSampling', optionField: 'axes.0.sampling', value: false, tabName: 'custom', groupName: 'axis' },
  // 轴标签 dataFilter 逻辑较为复杂，建议通过 optionOverride 实现
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.0.visible', value: true, tabName: 'custom', groupName: 'legend' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', 
    value: JSON.stringify({
      axes: [
        {
          orient: 'bottom',
          // label 和 tick 的 dataFilter 示例
          label: { dataFilter: `axisData => [axisData[0], axisData[axisData.length - 1]]` },
          tick: { dataFilter: `axisData => [axisData[0], axisData[axisData.length - 1]]` }
        }
      ]
    }, null, 2),
    tabName: 'custom', groupName: 'graph' 
  }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'axisFilterBarData',
  values: [
    { date: '2019-08-29', group: 'Cake', value: 154, stack: 'Dessert' },
    { date: '2019-08-29', group: 'Bread', value: 378, stack: 'Dessert' },
    // ... 大量数据省略 ...
    { date: '2019-09-03', group: 'Coffee', value: 241, stack: 'Drink' }
    // ... 确保数据足够多以显示采样效果
  ]
};

// 默认 VChart Option (Spec)
const option = {
  type: 'bar',
  data: [data],
  xField: ['date', 'stack'],
  yField: 'value',
  seriesField: 'group',
  stack: true,
  axes: [
    {
      orient: 'bottom',
      type: 'band', // 外层是类别轴
      sampling: false, // 默认关闭采样
      // 默认不过滤标签和刻度
      label: { visible: true }, 
      tick: { visible: true }
    },
    {
      orient: 'left',
      type: 'linear'
    }
  ],
  legends: { visible: true }
};

const dataHandler = `return data;`;

// Option 处理函数：根据 setting 应用 sampling，过滤逻辑通过 override 实现
const optionHandler = `
function handleOption(option, config) {
  const samplingSetting = config.setting.find(s => s.field === 'axisSampling');
  const bottomAxisIndex = option.axes?.findIndex(axis => axis.orient === 'bottom');
  
  if (samplingSetting && bottomAxisIndex !== -1 && option.axes[bottomAxisIndex]) {
    option.axes[bottomAxisIndex].sampling = samplingSetting.value;
  }
  // dataFilter 逻辑由 override 控制
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 