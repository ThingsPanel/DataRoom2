// 配置版本号
const version = '2024072413';
// 标题
const title = 'V轴富文本标签';
// 用于标识，唯一
const name = 'V轴富文本标签';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 柱状图

// 右侧配置项
const setting = [
  { label: '名称字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 name
  { label: '数值字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  // 样式配置
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: true, tabName: 'custom', groupName: 'label' },
  { label: '标签位置', type: 'select', field: 'labelPosition', optionField: 'label.position', 
    options: [
      { label: '中心', value: 'center' },
      { label: '左侧', value: 'left' },
      { label: '右侧', value: 'right' }
    ], 
    value: 'center', tabName: 'custom', groupName: 'label' 
  },
  { label: '启用圆角', type: 'switch', field: 'cornerRadiusEnabled', optionField: 'bar.style.cornerRadius', value: true, tabName: 'custom', groupName: 'bar' },
  { label: '启用背景', type: 'switch', field: 'barBgEnabled', optionField: 'barBackground.visible', value: true, tabName: 'custom', groupName: 'bar' },
  { label: '启用轴富文本', type: 'switch', field: 'richTextEnabled', optionField: 'axes.0.label.formatMethod', value: true, tabName: 'custom', groupName: 'axes' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { 
    label: 'Option 覆盖 (JSON)', 
    type: 'textarea', 
    field: 'optionOverride', 
    optionField: '', 
    // 提供富文本格式化配置示例
    value: JSON.stringify({
      axes: [
        {
          orient: 'left',
          minWidth: 50,
          label: {
            formatMethod: `label => {
              // 图标可以替换为实际可用的图标资源
              const rankIcon = {
                'Top 1': 'https://your-domain.com/icons/rank1.png',
                'Top 2': 'https://your-domain.com/icons/rank2.png',
                'Top 3': 'https://your-domain.com/icons/rank3.png'
              };
              
              return {
                type: 'rich',
                text: [
                  // 图标部分，需要实际图标资源
                  { image: rankIcon[label] || '', width: 25, height: 25 },
                  // 文本部分，可以定制样式
                  {
                    text: label,
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontStyle: 'italic'
                  }
                ]
              };
            }`
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
  id: 'richAxisLabelData',
  values: [
    { name: 'Top 1', value: 990 },
    { name: 'Top 2', value: 680 },
    { name: 'Top 3', value: 255 }
  ]
};

// 默认 VChart Option (Spec) - 水平条形图，带富文本轴标签
const option = {
  type: 'bar',
  data: [data],
  direction: 'horizontal', // 水平条形图
  yField: 'name',
  xField: 'value',
  barWidth: 20,
  bar: {
    style: {
      cornerRadius: [0, 10, 10, 0], // 右侧圆角
      fill: {
        gradient: 'linear', // 渐变填充
        x0: 0, y0: 0.5, x1: 1, y1: 0.5,
        stops: [
          { offset: 0, color: 'rgb(255,163,1)' },
          { offset: 1, color: 'rgb(255,4,0)' }
        ]
      }
    }
  },
  barBackground: {
    visible: true // 启用条形图背景
  },
  label: {
    visible: true,
    position: 'center',
    style: {
      fill: 'white',
      stroke: false
    }
  },
  padding: { left: 50 },
  axes: [
    {
      orient: 'left',
      minWidth: 50,
      // formatMethod 将通过 optionOverride 和 optionHandler 处理
    },
    { orient: 'bottom', type: 'linear' }
  ]
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // 处理圆角开关
  const cornerRadiusEnabled = config.setting.find(s => s.field === 'cornerRadiusEnabled');
  if (cornerRadiusEnabled && !cornerRadiusEnabled.value) {
    if (option.bar && option.bar.style) {
      option.bar.style.cornerRadius = [0, 0, 0, 0]; // 取消圆角
    }
  }
  
  // 处理背景开关
  const barBgEnabled = config.setting.find(s => s.field === 'barBgEnabled');
  if (barBgEnabled && !barBgEnabled.value) {
    option.barBackground = { visible: false };
  }
  
  // 处理富文本开关 - 如果禁用，使用普通文本
  const richTextEnabled = config.setting.find(s => s.field === 'richTextEnabled');
  if (richTextEnabled && !richTextEnabled.value) {
    if (option.axes && option.axes[0] && option.axes[0].label) {
      option.axes[0].label.formatMethod = undefined; // 移除富文本格式化
    }
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 