// 配置版本号
const version = '2024051601'; // 使用一个统一的版本号或日期
// 标题
const title = 'V基础柱状图';
// 用于标识，唯一
const name = 'V基础柱状图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // <-- 根据步骤2确定

// 右侧配置项 (简化版)
const setting = [
  // --- 数据配置项 (保留必要部分) ---
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
  // --- 图表样式配置项 (仅保留一个示例) ---
  {
    label: '柱子宽度', // 柱状图特有示例
    type: 'inputNumber',
    field: 'barWidth',
    optionField: 'series.0.barWidth', // 映射到第一个系列
    value: 20,
    tabName: 'custom',
    groupName: 'graph' // 保持分组信息
  },
  // --- 固定配置项 (保留) ---
  {
    label: '主题选择',
    type: 'select',
    field: 'chartTheme',
    optionField: 'theme',
    options: [], // 由 VchartCustomSetting 动态生成
    value: 'light', // 默认主题
    tabName: 'custom',
    groupName: 'graph'
  },
  {
    label: 'Option 覆盖 (JSON)',
    type: 'textarea',
    field: 'optionOverride',
    optionField: '', // 不直接映射
    value: '{}',
    tabName: 'custom',
    groupName: 'graph'
  }
];

// 示例数据
const data = {
  id: 'barData', // 数据源 ID
  values: [
    { category: '类别A', value: 150 },
    { category: '类别B', value: 230 },
    { category: '类别C', value: 220 },
    { category: '类别D', value: 270 },
    { category: '类别E', value: 130 }
  ]
};

// 默认 VChart Option (Spec)
const option = {
  type: 'bar', // <-- 与 chartType 一致
  data: [data], // 引用上方定义的 data 对象
  xField: 'category', // 默认 X 轴字段
  yField: 'value',    // 默认 Y 轴字段
  axes: [ // 基础坐标轴配置
    { orient: 'bottom', type: 'band', visible: true },
    { orient: 'left', type: 'linear', visible: true, grid: { visible: true } }
  ],
  series: [ // 基础系列配置
    {
      type: 'bar', // <-- 与 chartType 一致
      // 可以添加该图表类型特有的默认系列配置
      barWidth: 20 // <-- 与 setting 中的默认值匹配
    }
  ],
  tooltip: { visible: true } // 默认启用 tooltip
  // theme: 'light' // 主题由 setting 控制，这里不写死，或写默认值
};

// 数据处理脚本
const dataHandler = `return data;`; // 默认不处理，直接返回

// Option 处理脚本
const optionHandler = ``; // 默认不处理

// 导出配置对象
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