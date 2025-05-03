// 配置版本号
const version = '2024051710';
// 标题
const title = 'V轴断开柱状图';
// 用于标识，唯一
const name = 'V轴断开柱状图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项 (轴断开)
const setting = [
  { label: '类别轴字段 (X)', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 country
  { label: '值轴字段 (Y)', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 visits
  // 样式配置
  { label: '启用Y轴断开', type: 'switch', field: 'yAxisBreak', optionField: '', value: true, tabName: 'custom', groupName: 'axis' },
  { label: 'Y轴断开范围', type: 'input', field: 'yAxisBreakRanges', optionField: '', value: '2100,22900;700,900', tabName: 'custom', groupName: 'axis', placeholder: '例: 2100,22900;700,900' }, // 用分号分隔多段范围
  { label: 'Y轴不进行nice', type: 'switch', field: 'yAxisNice', optionField: 'axes.0.nice', value: false, tabName: 'custom', groupName: 'axis' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'barData',
  values: [
    { country: 'USA', visits: 23725 }, { country: 'China', visits: 1882 }, { country: 'Japan', visits: 1809 },
    { country: 'Germany', visits: 1322 }, { country: 'UK', visits: 1122 }, { country: 'France', visits: 1114 },
    { country: 'India', visits: 984 }, { country: 'Spain', visits: 711 }, { country: 'Netherlands', visits: 665 },
    { country: 'Russia', visits: 580 }, { country: 'South Korea', visits: 443 }, { country: 'Canada', visits: 441 }
  ]
};

// 默认 VChart Option (Spec) for Bar Chart with Axis Break
const option = {
  type: 'bar',
  data: [data],
  xField: 'country',
  yField: 'visits',
  axes: [
    { // Y 轴
      orient: 'left',
      type: 'linear',
      visible: true,
      nice: false, // 默认 false 以支持精确断开
      // breaks 配置将在 optionHandler 中处理
      domainLine: { visible: true } // 显示轴线
    },
    { // X 轴
      orient: 'bottom',
      type: 'band',
      visible: true,
      grid: { visible: false }
    }
  ],
  legends: { visible: false }, // 单系列不需要图例
  tooltip: { visible: true }
};

const dataHandler = `return data;`;

// Option 处理函数: 根据 setting 配置 Y 轴的 breaks
const optionHandler = `
function handleOption(option, config) {
  const enableBreak = config.setting.find(s => s.field === 'yAxisBreak')?.value;
  const breakRangesStr = config.setting.find(s => s.field === 'yAxisBreakRanges')?.value;
  const yAxisIndex = option.axes?.findIndex(axis => axis.orient === 'left');

  if (yAxisIndex !== -1 && option.axes[yAxisIndex]) {
    if (enableBreak && breakRangesStr) {
      try {
        const ranges = breakRangesStr.split(';').map(rangePair => {
          const parts = rangePair.split(',').map(Number);
          if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[0] < parts[1]) {
            return { range: [parts[0], parts[1]] };
          }
          return null;
        }).filter(Boolean); // 过滤掉无效的范围对
        
        if (ranges.length > 0) {
          option.axes[yAxisIndex].breaks = ranges;
        } else {
          // 如果解析后没有有效范围，则移除 breaks
          delete option.axes[yAxisIndex].breaks;
        }
      } catch (e) {
        console.error('Error parsing Y-axis break ranges:', e);
        delete option.axes[yAxisIndex].breaks; // 解析出错则移除
      }
    } else {
      // 如果禁用或范围字符串为空，则移除 breaks
      delete option.axes[yAxisIndex].breaks;
    }
  }

  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 