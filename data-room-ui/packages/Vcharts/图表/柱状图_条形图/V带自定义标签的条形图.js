// 配置版本号
const version = '2024051709';
// 标题
const title = 'V带自定义标签的条形图';
// 用于标识，唯一
const name = 'V带自定义标签的条形图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项 (条形图 + 自定义标签)
const setting = [
  { label: '类别轴字段 (Y)', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 province
  { label: '值轴字段 (X)', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  { label: '颜色字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 province
  // 样式配置
  { label: '显示自定义标签', type: 'switch', field: 'extLabelVisible', optionField: 'extensionMark.0.visible', value: true, tabName: 'custom', groupName: 'label' },
  { label: '标签字体大小', type: 'inputNumber', field: 'extLabelFontSize', optionField: 'extensionMark.0.style.fontSize', value: 12, min: 8, tabName: 'custom', groupName: 'label' },
  { label: '标签颜色', type: 'color', field: 'extLabelFill', optionField: 'extensionMark.0.style.fill', value: '#595959', tabName: 'custom', groupName: 'label' },
  { label: '条形图高度', type: 'inputNumber', field: 'barHeight', optionField: 'bar.style.height', value: 10, min: 1, tabName: 'custom', groupName: 'graph' },
  { label: '条形图圆角', type: 'inputNumber', field: 'barRadius', optionField: 'bar.style.cornerRadius', value: 5, min: 0, tabName: 'custom', groupName: 'graph' }, // 统一设置圆角
  { label: '启用背景条', type: 'switch', field: 'barBgVisible', optionField: 'barBackground.visible', value: true, tabName: 'custom', groupName: 'graph' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'barData',
  values: [
    { province: '北京', value: 3080, type: 'top1' }, { province: '天津', value: 2880, type: 'top2' },
    { province: '重庆', value: 880, type: 'top3' }, { province: '深圳', value: 780, type: 'common' },
    { province: '广州', value: 680, type: 'common' }, { province: '山东', value: 580, type: 'common' },
    { province: '浙江', value: 480, type: 'common' }, { province: '福建', value: 100, type: 'common' },
    { province: '石家庄', value: 100, type: 'common' }, { province: '广西壮族自治区', value: 100, type: 'common' }
  ]
};

// 默认 VChart Option (Spec) for Bar Chart with Custom Labels
const option = {
  type: 'bar',
  data: [data],
  direction: 'horizontal',
  xField: 'value',
  yField: 'province',
  seriesField: 'province',
  padding: { right: 50, left: 10 }, // 保留右侧 padding 给标签
  axes: [
    { orient: 'bottom', visible: false }, // 隐藏 X 轴
    { orient: 'left', visible: true, domainLine: { visible: false }, tick: { visible: false }, label: { autoLimit: true } } // 简化 Y 轴
  ],
  bar: {
    style: {
      cornerRadius: 5, // 统一圆角
      height: 10 // 固定高度
    }
  },
  barBackground: { // 背景条
    visible: true,
    style: {
      cornerRadius: 5, // 与 bar 保持一致
      height: 10 // 与 bar 保持一致
    }
  },
  extensionMark: [ // 保留默认的扩展标签配置
    {
      type: 'text',
      dataId: 'barData',
      visible: true,
      style: {
        text: datum => datum.value, // 标签内容为 value
        fontSize: 12, // 默认字体大小
        x: (datum, ctx) => ctx.getRegion().getLayoutRect().width + 10, // 定位到条形图右侧
        y: (datum, ctx) => ctx.valueToY([datum.province]) + ctx.yBandwidth() / 2, // 垂直居中
        textBaseline: 'middle',
        textAlign: 'left',
        fill: '#595959' // 默认颜色
      }
    }
  ],
  legends: { visible: false }, // 通常 seriesField 和 yField 相同时不需要图例
  tooltip: { visible: true } // 保持 tooltip 可见
};

const dataHandler = `return data;`;

// Option 处理函数: 统一处理圆角
const optionHandler = `
function handleOption(option, config) {
  const radius = config.setting.find(s => s.field === 'barRadius')?.value;
  if (radius !== undefined && option.bar?.style) {
    option.bar.style.cornerRadius = radius;
  }
  if (radius !== undefined && option.barBackground?.style) {
    option.barBackground.style.cornerRadius = radius;
  }
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 