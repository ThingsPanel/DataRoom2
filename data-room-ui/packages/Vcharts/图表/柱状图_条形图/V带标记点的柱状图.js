// 配置版本号
const version = '2024051708';
// 标题
const title = 'V带标记点的柱状图';
// 用于标识，唯一
const name = 'V带标记点的柱状图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项 (简化版，标记点通过 override 配置)
const setting = [
  { label: '类别轴字段 (X)', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 time
  { label: '值轴字段 (Y)', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 cost
  // 样式配置
  { label: '显示柱子标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: true, tabName: 'custom', groupName: 'label' },
  { label: '柱子颜色', type: 'color', field: 'barFill', optionField: 'bar.style.fill', value: 'rgb(85,208,93)', tabName: 'custom', groupName: 'graph' },
  { label: '柱子宽度', type: 'inputNumber', field: 'barWidth', optionField: 'bar.style.width', value: 30, min: 1, tabName: 'custom', groupName: 'graph' },
  { label: '柱顶圆角', type: 'inputNumber', field: 'barRadiusTop', optionField: 'bar.style.cornerRadius.0', value: 4, min: 0, tabName: 'custom', groupName: 'graph' }, // 分开控制圆角
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'barData',
  values: [
    { time: '10:20', cost: 2 }, { time: '10:30', cost: 1 }, { time: '10:40', cost: 1 },
    { time: '10:50', cost: 2 }, { time: '11:00', cost: 2 }, { time: '11:10', cost: 2 },
    { time: '11:20', cost: 1 }, { time: '11:30', cost: 1 }, { time: '11:40', cost: 2 },
    { time: '11:50', cost: 1 }
  ]
};

// 默认 VChart Option (Spec) for Bar Chart with MarkPoint
const option = {
  type: 'bar',
  data: [data],
  xField: 'time',
  yField: 'cost',
  label: {
    visible: true,
    formatMethod: datum => `${datum}分钟` // 示例标签格式化
  },
  bar: {
    style: {
      fill: 'rgb(85,208,93)', // 默认颜色
      cornerRadius: [4, 4, 0, 0], // 默认顶部圆角
      width: 30 // 默认宽度
    }
  },
  markPoint: [ // 保留一个默认的标记点示例，用户可通过 override 修改
    {
      coordinate: {
        time: '10:20', // 标记点 X 坐标 (需匹配数据)
        cost: 2        // 标记点 Y 坐标 (需匹配数据)
      },
      itemContent: {
        type: 'text',
        autoRotate: false,
        offsetY: -10,
        text: {
          text: '示例标记', // 标记文本
          style: { fill: 'white', fontSize: 12 },
          labelBackground: { 
            padding: [4, 8, 4, 8],
            style: { fill: '#000', cornerRadius: 3 }
          }
        }
      },
      itemLine: { // 连接线和符号
        endSymbol: { visible: true, style: { angle: Math.PI, fill: '#000', dy: 4, stroke: '#000' } },
        startSymbol: { visible: false },
        line: { style: { visible: false } }
      }
    }
  ],
  axes: [ // 简化轴配置，移除复杂格式化和样式
    { orient: 'left', type: 'linear', visible: true, grid: { visible: true } },
    { orient: 'bottom', type: 'band', visible: true, grid: { visible: false } }
  ],
  legends: { visible: false }, // 通常单系列不需要图例
  tooltip: { visible: true },
  // crosshair: { ... } // 默认不启用 crosshair，简化配置
};

const dataHandler = `return data;`;

// Option 处理函数: 分别处理圆角
const optionHandler = `
function handleOption(option, config) {
  const radiusTop = config.setting.find(s => s.field === 'barRadiusTop')?.value;
  // 假设底部圆角也需要控制，可以添加 barRadiusBottom
  // const radiusBottom = config.setting.find(s => s.field === 'barRadiusBottom')?.value ?? 0;
  if (option.bar?.style) {
    option.bar.style.cornerRadius = [radiusTop ?? 0, radiusTop ?? 0, 0, 0]; // 仅顶部圆角
  }
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 