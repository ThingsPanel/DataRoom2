// 配置版本号
const version = '2024051712';
// 标题
const title = 'V多系列折线图';
// 用于标识，唯一
const name = 'V多系列折线图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'line';

// 右侧配置项 (多系列折线图)
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 country
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应转换后的 value
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应转换后的 name
  { label: '数据转换-字段', type: 'select', field: 'transformFields', optionField: 'data.transforms.0.options.fields', multiple: true, value: [], tabName: 'data' }, // 对应 fold 转换的 fields
  // 样式配置
  { label: '显示点', type: 'switch', field: 'pointVisible', optionField: 'point.visible', value: false, tabName: 'custom', groupName: 'graph' }, // 参考 spec，默认不显示点
  { label: '点的大小', type: 'inputNumber', field: 'pointSize', optionField: 'point.style.size', value: 4, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '线的宽度', type: 'inputNumber', field: 'lineWidth', optionField: 'line.style.lineWidth', value: 2, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.visible', value: true, tabName: 'custom', groupName: 'legend' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (需要是宽表格式，供 fold 转换使用)
// 注意：这里的数据结构与 spec 中的 latestData 不同，需要调整
const data = {
  id: 'multiLineData',
  // 示例数据结构，需要用户提供符合 fold 转换的宽表数据
  values: [
    { country: '2000', Austria: 10, Canada: 12, France: 11, Germany: 13, Japan: 9 },
    { country: '2001', Austria: 11, Canada: 13, France: 12, Germany: 14, Japan: 10 },
    { country: '2002', Austria: 12, Canada: 14, France: 13, Germany: 15, Japan: 11 },
    { country: '2003', Austria: 13, Canada: 12, France: 14, Germany: 13, Japan: 12 },
    { country: '2004', Austria: 14, Canada: 11, France: 15, Germany: 12, Japan: 13 }
  ]
};

// 默认 VChart Option (Spec) for Multi-Series Line Chart
const option = {
  type: 'line',
  data: {
    id: 'multiLineData', // 引用上方定义的 data
    transforms: [ // 数据转换
      {
        type: 'fold',
        options: {
          key: 'name', // 转换后系列字段名
          value: 'value', // 转换后值字段名
          fields: [] // 需要在 setting 中选择要转换的字段
        }
      }
    ]
  },
  xField: 'country', // X 轴字段 (对应原始数据)
  yField: 'value', // Y 轴字段 (对应转换后)
  seriesField: 'name', // 系列字段 (对应转换后)
  point: { // 点配置
    visible: false, // 默认不显示点
    style: {
      size: 4
    }
    // 移除了动态 state 样式
  },
  line: { // 线配置
    style: {
      lineWidth: 2
    }
    // 移除了动态 style 回调
  },
  axes: [ // 简化轴配置
    { orient: 'left', type: 'linear', visible: true, grid: { visible: true } },
    { orient: 'bottom', type: 'band', visible: true, grid: { visible: false } }
  ],
  legends: { visible: true }, // 多系列通常需要图例
  tooltip: { visible: true }
  // 移除了 title 和 crosshair 的复杂配置，保持简洁
};

// 数据处理函数: 确保原始数据被传入
const dataHandler = `
// 多系列折线图通常需要 fold 数据转换
// VChart 会自动处理 data.transforms
// 此处确保原始数据（通常是宽表）被正确传递
return data;
`;

// Option 处理函数: 将 setting 中的 transformFields 应用到 data.transforms
const optionHandler = `
function handleOption(option, config) {
  const fieldsToFold = config.setting.find(s => s.field === 'transformFields')?.value;
  
  if (Array.isArray(fieldsToFold) && option.data?.transforms?.[0]?.options) {
    // 确保是 fold 转换且 fields 是数组
    if (option.data.transforms[0].type === 'fold') {
       option.data.transforms[0].options.fields = fieldsToFold;
       // 如果 fold 的 key 或 value 需要配置，也可以在这里处理
       // option.data.transforms[0].options.key = config.setting.find(s => s.field === 'seriesField').value || 'name';
       // option.data.transforms[0].options.value = config.setting.find(s => s.field === 'yField').value || 'value';
    }
  } else if (option.data?.transforms) {
      // 如果 setting 中没有提供 fields，或者结构不对，最好移除 transform
      // 避免 VChart 因无效 transform 出错
      delete option.data.transforms;
      // 此时 xField, yField, seriesField 可能需要直接对应原始数据字段
      // （但这会失去多系列效果，除非原始数据已经是长表）
  }

  // 确保 X/Y/Series 字段与转换后的数据匹配
  // (如果 key/value 字段名在 transform 中被修改了，这里也要对应修改)
  // option.xField = config.setting.find(s => s.field === 'xField').value;
  // option.yField = config.setting.find(s => s.field === 'yField').value;
  // option.seriesField = config.setting.find(s => s.field === 'seriesField').value;

  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 