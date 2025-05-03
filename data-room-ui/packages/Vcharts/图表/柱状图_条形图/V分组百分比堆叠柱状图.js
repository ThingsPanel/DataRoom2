// 配置版本号
const version = '2024051701'; // 使用今天的日期或适当版本
// 标题
const title = 'V分组百分比堆叠柱状图';
// 用于标识，唯一
const name = 'V分组百分比堆叠柱状图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项 (基于 V分组堆叠柱状图.js 修改)
const setting = [
  { label: '类别轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' },
  { label: '值轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  { label: '堆叠字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' },
  { label: '分组字段', type: 'select', field: 'bandField', optionField: 'axes.0.bandField', multiple: false, value: '', tabName: 'data' },
  { label: '显示百分比', type: 'switch', field: 'showPercentage', optionField: 'label.formatMethod', value: true, tabName: 'custom', groupName: 'label' },
  { label: '柱子宽度', type: 'inputNumber', field: 'barWidth', optionField: 'series.0.barWidth', value: 20, min: 1, max: 50, tabName: 'custom', groupName: 'style' },
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [{label: '浅色', value: 'light'}, {label: '深色', value: 'dark'}], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option覆盖', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec, 截取部分)
const data = {
  id: 'barData',
  values: [
    { State: 'AL', age: 'Under 5 Years', population: 310504, type: 'a' }, { State: 'AL', age: '5 to 13 Years', population: 552339, type: 'a' }, { State: 'AL', age: '14 to 17 Years', population: 259034, type: 'a' },
    { State: 'AL', age: '18 to 24 Years', population: 450818, type: 'b' }, { State: 'AL', age: '25 to 44 Years', population: 1231572, type: 'c' }, { State: 'AL', age: '45 to 64 Years', population: 1215966, type: 'd' }, { State: 'AL', age: '65 Years and Over', population: 641667, type: 'd' },
    { State: 'AK', age: 'Under 5 Years', population: 52083, type: 'a' }, { State: 'AK', age: '5 to 13 Years', population: 85640, type: 'a' }, { State: 'AK', age: '14 to 17 Years', population: 42153, type: 'a' },
    { State: 'AK', age: '18 to 24 Years', population: 74257, type: 'b' }, { State: 'AK', age: '25 to 44 Years', population: 198724, type: 'c' }, { State: 'AK', age: '45 to 64 Years', population: 183159, type: 'd' }, { State: 'AK', age: '65 Years and Over', population: 50277, type: 'd' },
    { State: 'AZ', age: 'Under 5 Years', population: 515910, type: 'a' }, { State: 'AZ', age: '5 to 13 Years', population: 828669, type: 'a' }, { State: 'AZ', age: '14 to 17 Years', population: 362642, type: 'a' },
    { State: 'AZ', age: '18 to 24 Years', population: 601943, type: 'b' }, { State: 'AZ', age: '25 to 44 Years', population: 1804762, type: 'c' }, { State: 'AZ', age: '45 to 64 Years', population: 1523681, type: 'd' }, { State: 'AZ', age: '65 Years and Over', population: 862573, type: 'd' }
    // ... 保持数据与 V分组堆叠柱状图 一致，因为参考 spec 数据相同
  ]
};

// 默认 VChart Option (Spec) for Grouped Percentage Stacked Bar
const option = {
  type: 'bar',
  data: [data],
  xField: 'State',
  yField: 'population',
  seriesField: 'age', // 堆叠/颜色字段
  percent: true,      // **启用百分比**
  stack: true,        // **启用堆叠**
  axes: [
    {
      orient: 'bottom',
      type: 'band',
      visible: true,
      bandField: 'type' // **指定X轴分组字段**
    },
    { // Y 轴标签格式化
      orient: 'left',
      type: 'linear', // 轴类型仍是 linear
      visible: true,
      grid: { visible: true },
      label: {
        formatMethod: val => `${(val * 100).toFixed(0)}%` // 添加百分比格式化
      }
    }
  ],
  legends: { visible: true },
  tooltip: { visible: true, mark: { content: [] }, dimension: { content: [] } } // 保持 tooltip 结构
};

const dataHandler = `return data;`;
const optionHandler = ``;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
};
