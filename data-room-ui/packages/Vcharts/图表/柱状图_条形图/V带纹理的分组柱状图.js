// 配置版本号
const version = '2024051801';
// 标题
const title = 'V带纹理的分组柱状图';
// 用于标识，唯一
const name = 'V带纹理的分组柱状图';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 柱状图

// 右侧配置项
const setting = [
  { label: 'X轴第一层字段', type: 'select', field: 'xField1', optionField: 'xField.0', multiple: false, value: '', tabName: 'data' },
  { label: 'X轴第二层字段', type: 'select', field: 'xField2', optionField: 'xField.1', multiple: false, value: '', tabName: 'data' },
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' },
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' },
  // 样式配置
  {
    label: '纹理类型',
    type: 'select',
    field: 'textureType',
    optionField: 'scales.0.range', // 影响 texture scale 的 range
    multiple: true,
    options: [
      { label: 'bias-lr', value: 'bias-lr' },
      { label: 'bias-rl', value: 'bias-rl' },
      { label: 'rect', value: 'rect' },
      { label: 'grid', value: 'grid' },
      { label: 'line', value: 'line' },
      { label: 'line-horizontal', value: 'line-horizontal' },
      { label: 'line-vertical', value: 'line-vertical' },
      { label: 'square', value: 'square' },
      { label: 'circle', value: 'circle' },
    ],
    value: ['bias-lr', 'rect', 'grid'], // 参考 spec 默认值
    tabName: 'custom',
    groupName: 'graph'
  },
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: true, tabName: 'custom', groupName: 'label' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'texturedGroupedBarData',
  values: [
    { company: 'Apple', type: 'Total', value: 30 },
    { company: 'Facebook', type: 'Total', value: 35 },
    { company: 'Google', type: 'Total', value: 28 },
    { company: 'Apple', type: 'Non-technical', value: 40 },
    { company: 'Facebook', type: 'Non-technical', value: 65 },
    { company: 'Google', type: 'Non-technical', value: 47 },
    { company: 'Apple', type: 'Technical', value: 23 },
    { company: 'Facebook', type: 'Technical', value: 18 },
    { company: 'Google', type: 'Technical', value: 20 }
  ]
};

// 默认 VChart Option (Spec)
const option = {
  type: 'bar',
  data: [data],
  xField: ['type', 'company'], // 分组
  yField: 'value',
  seriesField: 'company', // 用于颜色和图例，也用于纹理映射
  bar: {
    style: {
      texture: {
        field: 'company', // 使用 seriesField 来映射纹理
        scale: 'texture' // 引用下面的 scale
      }
    }
  },
  scales: [
    {
      id: 'texture', // 纹理 scale
      type: 'ordinal',
      domain: {
        dataId: 'texturedGroupedBarData',
        fields: ['company'] // 根据 company 字段确定 domain
      },
      range: ['bias-lr', 'rect', 'grid'] // 默认纹理范围
    }
  ],
  label: {
    visible: true,
    style: {
      fill: '#000'
    }
  },
  legends: { visible: true } // 默认显示图例
};

const dataHandler = `return data;`;

// Option 处理函数: 根据 setting 更新 texture scale 的 range
const optionHandler = `
function handleOption(option, config) {
  const textureSetting = config.setting.find(s => s.field === 'textureType');
  const textureScaleIndex = option.scales?.findIndex(s => s.id === 'texture');

  if (textureSetting && textureScaleIndex !== -1 && option.scales[textureScaleIndex]) {
    option.scales[textureScaleIndex].range = textureSetting.value;
  }

  // 确保 seriesField 与内层 xField 一致
  const seriesFieldSetting = config.setting.find(s => s.field === 'seriesField');
  const xFieldInnerSetting = config.setting.find(s => s.field === 'xFieldInner');
  if (seriesFieldSetting && xFieldInnerSetting) {
      option.seriesField = xFieldInnerSetting.value;
      option.bar.style.texture.field = xFieldInnerSetting.value;
      if (option.scales && option.scales[textureScaleIndex]) {
          option.scales[textureScaleIndex].domain.fields = [xFieldInnerSetting.value];
      }
  }

  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
};
