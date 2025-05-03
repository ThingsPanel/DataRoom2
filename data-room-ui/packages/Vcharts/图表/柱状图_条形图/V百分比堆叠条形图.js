// 配置版本号
const version = '2024072501';
// 标题
const title = 'V百分比堆叠条形图';
// 用于标识，唯一
const name = 'V百分比堆叠条形图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项
const setting = [
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: 'State', tabName: 'data' },
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: 'Population', tabName: 'data' },
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: 'Age', tabName: 'data' },
  // 堆叠配置
  {
    label: '启用堆叠',
    type: 'switch',
    field: 'stack',
    optionField: 'stack',
    value: true,
    tabName: 'custom',
    groupName: 'stack'
  },
  {
    label: '启用百分比',
    type: 'switch',
    field: 'percent',
    optionField: 'percent',
    value: true,
    tabName: 'custom',
    groupName: 'stack'
  },
  // 条形图样式
  {
    label: '圆角半径',
    type: 'inputNumber',
    field: 'cornerRadius',
    optionField: 'bar.style.cornerRadius',
    value: 0,
    min: 0,
    max: 50,
    step: 1,
    tabName: 'custom',
    groupName: 'barStyle'
  },
  // 标签配置
  {
    label: '显示标签',
    type: 'switch',
    field: 'labelVisible',
    optionField: 'label.visible',
    value: false,
    tabName: 'custom',
    groupName: 'label'
  },
  // 图例配置
  {
    label: '显示图例',
    type: 'switch',
    field: 'legendVisible',
    optionField: 'legends.visible',
    value: true,
    tabName: 'custom',
    groupName: 'legend'
  },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'basic' },
  {
    label: 'Option 覆盖 (JSON)',
    type: 'textarea',
    field: 'optionOverride',
    optionField: '',
    value: '',
    tabName: 'custom',
    groupName: 'basic'
  }
];

// 示例数据
const data = {
  id: 'barData',
  values: [
    { State: 'WY', Age: 'Under 5 Years', Population: 25635 },
    { State: 'WY', Age: '5 to 13 Years', Population: 1890 },
    { State: 'WY', Age: '14 to 17 Years', Population: 9314 },
    { State: 'DC', Age: 'Under 5 Years', Population: 30352 },
    { State: 'DC', Age: '5 to 13 Years', Population: 20439 },
    { State: 'DC', Age: '14 to 17 Years', Population: 10225 },
    { State: 'VT', Age: 'Under 5 Years', Population: 38253 },
    { State: 'VT', Age: '5 to 13 Years', Population: 42538 },
    { State: 'VT', Age: '14 to 17 Years', Population: 15757 },
    { State: 'ND', Age: 'Under 5 Years', Population: 51896 },
    { State: 'ND', Age: '5 to 13 Years', Population: 67358 },
    { State: 'ND', Age: '14 to 17 Years', Population: 18794 },
    { State: 'AK', Age: 'Under 5 Years', Population: 72083 },
    { State: 'AK', Age: '5 to 13 Years', Population: 85640 },
    { State: 'AK', Age: '14 to 17 Years', Population: 22153 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'bar',
  data: [data],
  yField: 'State',
  xField: 'Population',
  seriesField: 'Age',
  direction: 'horizontal', // 保持条形图方向
  stack: true,           // 保持堆叠
  percent: true,         // 保持百分比
  bar: { // 添加 bar 节点用于配置样式
    style: {
      cornerRadius: 0 // 默认圆角为0
    }
  },
  label: { // 添加 label 节点
    visible: false
  },
  legends: { // 保留图例配置
    visible: true
  },
  axes: [ // 保留轴配置
    {
      orient: 'top',
      label: {
        formatMethod: val => {
          return `${(val * 100).toFixed(1)}%`; // 稍微简化百分比格式
        }
      }
    },
    { orient: 'left' } // 添加 Y 轴定义
  ]
  // 移除了参考 spec 中的 stackCornerRadius: 1000
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  const settings = config.setting;

  // 处理条形图样式
  const cornerRadius = settings.find(s => s.field === 'cornerRadius')?.value;
  if (option.bar?.style && cornerRadius !== undefined) {
    option.bar.style.cornerRadius = cornerRadius;
  }

  // 处理标签显示
  const labelVisible = settings.find(s => s.field === 'labelVisible')?.value;
  if (option.label && labelVisible !== undefined) {
    option.label.visible = labelVisible;
  }

  // 处理图例显示
  const legendVisible = settings.find(s => s.field === 'legendVisible')?.value;
  if (option.legends && legendVisible !== undefined) {
    option.legends.visible = legendVisible;
  }

  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
};
