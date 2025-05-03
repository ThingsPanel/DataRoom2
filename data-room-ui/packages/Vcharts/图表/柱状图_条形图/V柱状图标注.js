// 配置版本号
const version = '2024072411';
// 标题
const title = 'V柱状图标注';
// 用于标识，唯一
const name = 'V柱状图标注';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 柱状图

// 右侧配置项
const setting = [
  { label: '时间字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 time
  { label: '成本字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 cost
  // 样式配置
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: true, tabName: 'custom', groupName: 'label' },
  // markPoint 配置复杂，建议通过 optionOverride 实现
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  {
    label: 'Option 覆盖 (JSON)',
    type: 'textarea',
    field: 'optionOverride',
    optionField: '',
    // 提供 markPoint 的简化示例，具体坐标需匹配数据
    value: JSON.stringify({
      markPoint: [
        {
          coordinate: {
            // 需要与 data 中的值匹配
            time: '10:20',
            cost: 2
          },
          itemContent: {
            type: 'text',
            text: {
              text: '标注示例', // 自定义文本
              style: { fill: 'white' },
              labelBackground: { style: { fill: 'black', cornerRadius: 3 } }
            }
          },
          itemLine: {
             endSymbol: { visible: true },
             startSymbol: { visible: false },
             line: { style: { visible: false } } // 可选，是否显示引导线
          }
        }
      ]
    }, null, 2),
    tabName: 'custom',
    groupName: 'graph'
  }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'barDataAnnotation', // 新 ID
  values: [
    { time: '10:20', cost: 2 }, { time: '10:30', cost: 1 }, { time: '10:40', cost: 1 },
    { time: '10:50', cost: 2 }, { time: '11:00', cost: 2 }, { time: '11:10', cost: 2 },
    { time: '11:20', cost: 1 }, { time: '11:30', cost: 1 }, { time: '11:40', cost: 2 },
    { time: '11:50', cost: 1 }
  ]
};

// 默认 VChart Option (Spec) - 基础柱状图，包含标签
const option = {
  type: 'bar',
  data: [{ id: 'barDataAnnotation', values: data.values }], // 使用新 ID 并直接嵌入 values
  xField: 'time',
  yField: 'cost',
  label: {
    visible: true,
    formatMethod: datum => `${datum}分钟` // 保持参考 spec 的格式化
  },
  axes: [ // 保留参考 spec 的轴配置
    { orient: 'left', max: 10, label: { visible: false } },
    { orient: 'bottom', paddingOuter: 0.5, paddingInner: 0 }
  ]
  // markPoint 通过 override 添加
};

const dataHandler = `return data;`; // 返回包含 id 和 values 的对象
const optionHandler = `
function handleOption(option, config) {
  // 确保 override 中的 markPoint coordinate 与实际数据匹配
  // 如果 override 中的 data id 不同，需要适配 option.data[x].id
  if (config.setting.find(s => s.field === 'optionOverride')?.value !== '{}') {
     try {
       const override = JSON.parse(config.setting.find(s => s.field === 'optionOverride').value);
       if (override.markPoint && override.markPoint[0]?.coordinate) {
         // 简单示例：如果 override 中有 markPoint，确保 option 中有 data 引用
         if (!option.data || !option.data.find(d => d.id === 'barDataAnnotation')) {
            option.data = [{ id: 'barDataAnnotation', values: data.values }]; // 确保数据引用存在
         }
       }
     } catch(e) { console.error('Error parsing optionOverride for markPoint', e); }
  }
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 