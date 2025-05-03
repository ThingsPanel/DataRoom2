// 配置版本号
const version = '2024051810';
// 标题
const title = 'V条形图自定义标记';
// 用于标识，唯一
const name = 'V条形图自定义标记';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 条形图

// 右侧配置项
const setting = [
  { label: '类别字段/系列', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 country
  { label: '数值字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  // 样式配置
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: false, tabName: 'custom', groupName: 'label' },
  // 自定义标记和播放器逻辑复杂，建议通过 optionOverride 实现
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { 
    label: 'Option 覆盖 (JSON)', 
    type: 'textarea', 
    field: 'optionOverride', 
    optionField: '', 
    // 提供 customMark 和 player 的示例配置
    value: JSON.stringify({
      customMark: [
        {
          type: 'text',
          // dataId 需要关联到实际数据源 ID
          // dataId: 'year', 
          style: {
            textBaseline: 'bottom',
            fontSize: 100, // 调整大小
            textAlign: 'right',
            fontFamily: 'PingFang SC',
            fontWeight: 600,
            text: `datum => datum.year || ''`, // 需要数据中有 year 字段
            // x, y 需要根据画布动态计算，这里提供一个固定位置示例
            x: 500,
            y: 400,
            fill: 'grey',
            fillOpacity: 0.5
          }
        }
      ],
      // player 配置比较复杂，需要配合多份数据使用
      player: {
        type: 'continuous',
        orient: 'bottom',
        auto: true,
        loop: true,
        // specs 需要包含多份数据配置
        // specs: dataSpecs, 
        slider: { railStyle: { height: 6 } }
      }
    }, null, 2),
    tabName: 'custom', 
    groupName: 'graph' 
  }
];

// 示例数据 (来自参考 spec 的第一份数据)
const data = {
  id: 'customMarkBarData',
  values: [
    { country: 'USA', value: 239, year: 2000 }, // 添加 year 字段供 customMark 使用
    { country: 'CHN', value: 59, year: 2000 },
    { country: 'RUS', value: 88, year: 2000 },
    { country: 'AUS', value: 58, year: 2000 },
    { country: 'GER', value: 56, year: 2000 },
    { country: 'FRA', value: 38, year: 2000 },
    { country: 'ITA', value: 34, year: 2000 },
    { country: 'NED', value: 25, year: 2000 },
    { country: 'CUB', value: 29, year: 2000 },
    { country: 'GBR', value: 28, year: 2000 }
  ]
};

// 默认 VChart Option (Spec) - 基础条形图
const option = {
  type: 'bar',
  data: [data],
  direction: 'horizontal',
  yField: 'country',
  xField: 'value',
  seriesField: 'country',
  label: { visible: false },
  axes: [
    { orient: 'bottom', type: 'linear' },
    { orient: 'left', type: 'band' }
  ],
  legends: { visible: false } // 系列由 Y 轴区分，不需图例
  // customMark 和 player 通过 override 添加
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // 确保 override 中的函数字符串能正确解析和执行
  // 特别是 customMark 中的 x, y 计算需要 vchart 实例 (ctx)
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 