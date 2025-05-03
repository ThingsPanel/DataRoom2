// 配置版本号
const version = '2024051601';
// 标题
const title = 'V分组柱状图';
// 用于标识，唯一
const name = 'V分组柱状图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项 (简化版 + seriesField)
const setting = [
  {
    label: '维度(X轴)',
    type: 'select',
    field: 'xField',
    optionField: 'xField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  {
    label: '指标(Y轴)',
    type: 'select',
    field: 'yField',
    optionField: 'yField',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  { // **新增**: 分组/颜色字段
    label: '分组字段',
    type: 'select',
    field: 'seriesField',
    optionField: 'seriesField', // 映射到 seriesField
    multiple: false,
    value: '',
    tabName: 'data'
  },
  {
    label: '柱子宽度',
    type: 'inputNumber',
    field: 'barWidth',
    optionField: 'series.0.barWidth', // 分组柱状图宽度通常在系列里设置
    value: 20, // 默认值可以调整
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: '主题选择',
    type: 'select',
    field: 'chartTheme',
    optionField: 'theme',
    options: [],
    value: 'light',
    tabName: 'custom',
    groupName: 'graph'
  },
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

// 示例数据 (包含分组字段 type)
const data = {
  id: 'groupedBarData',
  values: [
    { category: '类别A', type: '系列1', value: 150 }, { category: '类别A', type: '系列2', value: 120 },
    { category: '类别B', type: '系列1', value: 230 }, { category: '类别B', type: '系列2', value: 180 },
    { category: '类别C', type: '系列1', value: 220 }, { category: '类别C', type: '系列2', value: 200 },
    { category: '类别D', type: '系列1', value: 270 }, { category: '类别D', type: '系列2', value: 150 },
    { category: '类别E', type: '系列1', value: 130 }, { category: '类别E', type: '系列2', value: 190 }
  ]
};

// 默认 VChart Option (Spec) for Grouped Bar
const option = {
  type: 'bar',
  data: [data],
  xField: 'category',
  yField: 'value',
  seriesField: 'type', // **指定分组字段**
  axes: [
    { orient: 'bottom', type: 'band', visible: true },
    { orient: 'left', type: 'linear', visible: true, grid: { visible: true } }
  ],
  series: [ // 系列配置，分组柱状图通常不需要显式写多个 series
    {
      type: 'bar',
      // barWidth: 20, // 宽度可以通过 setting 控制
      label: { visible: false } // 默认不显示标签，避免重叠
    }
  ],
  legends: { visible: true, orient: 'top' }, // 显示图例
  tooltip: { visible: true, mark: { content: [] }, dimension: { content: [] } } // VChart 1.9+ tooltip 写法
};

const dataHandler = `return data;`;
const optionHandler = ``;

export default {
  version,
  title,
  name,
  type,
  chartType,
  option,
  setting,
  dataHandler,
  optionHandler
}; 