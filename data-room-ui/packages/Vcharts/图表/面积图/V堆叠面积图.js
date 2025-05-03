// 配置版本号
const version = '2024051721';
// 标题
const title = 'V堆叠面积图';
// 用于标识，唯一
const name = 'V堆叠面积图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'area';

// 右侧配置项 (堆叠面积图)
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 type
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 country
  // 样式配置
  { label: '启用堆叠', type: 'switch', field: 'stack', optionField: 'stack', value: true, tabName: 'custom', groupName: 'graph' },
  { label: '显示点', type: 'switch', field: 'pointVisible', optionField: 'point.visible', value: false, tabName: 'custom', groupName: 'graph' }, // 面积图默认不显示点
  { label: '点的大小', type: 'inputNumber', field: 'pointSize', optionField: 'point.style.size', value: 4, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '线的宽度', type: 'inputNumber', field: 'lineWidth', optionField: 'line.style.lineWidth', value: 2, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '显示面积填充', type: 'switch', field: 'areaVisible', optionField: 'area.visible', value: true, tabName: 'custom', groupName: 'graph' },
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.0.visible', value: true, tabName: 'custom', groupName: 'legend' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'stackedAreaData',
  // 包含 fields 配置用于系列排序
  fields: {
    country: {
      domain: ['China', 'USA', 'EU', 'Africa'],
      sortIndex: 0
    }
  },
  values: [
    { type: 'Nail polish', country: 'Africa', value: 4229 }, { type: 'Nail polish', country: 'EU', value: 4376 },
    { type: 'Nail polish', country: 'China', value: 3054 }, { type: 'Nail polish', country: 'USA', value: 12814 },
    // ... 更多数据 ...
    { type: 'Mascara', country: 'Africa', value: 18712 }, { type: 'Mascara', country: 'EU', value: 6134 },
    { type: 'Mascara', country: 'China', value: 10419 }, { type: 'Mascara', country: 'USA', value: 11261 }
  ]
};

// 默认 VChart Option (Spec) for Stacked Area Chart
const option = {
  type: 'area',
  data: data, // 直接引用包含 fields 配置的 data 对象
  stack: true, // 启用堆叠
  xField: 'type',
  yField: 'value',
  seriesField: 'country',
  point: { // 点配置
    visible: false,
    style: {
      size: 4
    }
  },
  line: { // 线配置
    visible: true,
    style: {
      lineWidth: 2
    }
  },
  area: { // 面积配置
    visible: true
  },
  axes: [ // 基础轴配置
    { orient: 'bottom', type: 'band', visible: true },
    { orient: 'left', type: 'linear', visible: true }
  ],
  legends: [{ // 图例配置
    visible: true,
    position: 'middle',
    orient: 'bottom'
  }],
  tooltip: { // 保留 tooltip 自定义
    visible: true,
    dimension: {
      updateContent: data => {
        let sum = 0;
        data.forEach(datum => {
          sum += +datum.value;
        });
        data.push({
          hasShape: 'false',
          key: 'Total',
          value: sum
        });
        return data;
      }
    }
  }
};

// 数据处理函数: 直接返回包含 fields 的 data 对象
const dataHandler = `
// data 对象包含 fields 定义，直接返回即可
return data;
`;

// Option 处理函数: 无需特殊处理
const optionHandler = ``;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 