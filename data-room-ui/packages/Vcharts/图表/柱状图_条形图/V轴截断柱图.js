// 配置版本号
const version = '2024072412';
// 标题
const title = 'V轴截断柱图';
// 用于标识，唯一
const name = 'V轴截断柱图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 柱状图

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 country
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 visits
  // 样式配置
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: false, tabName: 'custom', groupName: 'label' },
  { label: '启用轴截断', type: 'switch', field: 'breaksEnabled', optionField: 'axes.0.breaks', value: true, tabName: 'custom', groupName: 'axes' },
  // 轴截断配置较复杂，建议通过 optionOverride 实现详细配置
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { 
    label: 'Option 覆盖 (JSON)', 
    type: 'textarea', 
    field: 'optionOverride', 
    optionField: '', 
    // 提供 axes breaks 配置示例
    value: JSON.stringify({
      axes: [
        {
          orient: 'left',
          breaks: [
            {
              scopeType: 'length',
              range: [2100, 22900]
            },
            {
              range: [700, 900]
            }
          ],
          nice: false,
          tick: {
            tickMode: 'd3'
          },
          domainLine: {
            visible: true
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
  id: 'axisBreakData',
  values: [
    { country: 'USA', visits: 23725 },
    { country: 'China', visits: 1882 },
    { country: 'Japan', visits: 1809 },
    { country: 'Germany', visits: 1322 },
    { country: 'UK', visits: 1122 },
    { country: 'France', visits: 1114 },
    { country: 'India', visits: 984 },
    { country: 'Spain', visits: 711 },
    { country: 'Netherlands', visits: 665 },
    { country: 'Russia', visits: 580 },
    { country: 'South Korea', visits: 443 },
    { country: 'Canada', visits: 441 }
  ]
};

// 默认 VChart Option (Spec) - 基础柱状图，带轴截断
const option = {
  type: 'bar',
  data: [data],
  xField: 'country',
  yField: 'visits',
  label: { visible: false },
  axes: [
    {
      orient: 'left',
      breaks: [
        {
          scopeType: 'length',
          range: [2100, 22900]
        },
        {
          range: [700, 900]
        }
      ],
      nice: false,
      tick: {
        tickMode: 'd3'
      },
      domainLine: {
        visible: true
      }
    },
    { orient: 'bottom', type: 'band' }
  ]
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // 处理 breaksEnabled 开关
  const breaksEnabledSetting = config.setting.find(s => s.field === 'breaksEnabled');
  if (breaksEnabledSetting && !breaksEnabledSetting.value) {
    // 如果关闭轴截断，则移除 breaks 配置
    if (option.axes && option.axes[0]) {
      option.axes[0].breaks = undefined;
    }
  }
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 