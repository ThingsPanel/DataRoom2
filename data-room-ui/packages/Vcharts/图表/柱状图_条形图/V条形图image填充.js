// 配置版本号
const version = '2024051802';
// 标题
const title = 'V条形图image填充';
// 用于标识，唯一
const name = 'V条形图image填充';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 条形图

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 type
  { label: '数值字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  // 样式配置
  { label: '背景透明度', type: 'inputNumber', field: 'bgOpacity', optionField: 'extensionMark.0.style.opacity', value: 0.1, min: 0, max: 1, step: 0.1, tabName: 'custom', groupName: 'graph' },
  { label: '背景重复方式', type: 'select', field: 'bgRepeat', optionField: 'extensionMark.0.style.repeatX', options:[{label:'重复',value:'repeat'}, {label:'拉伸',value:'stretch'}], value: 'repeat', tabName: 'custom', groupName: 'graph' }, // 控制背景图重复
  { label: '前景重复方式', type: 'select', field: 'fgRepeat', optionField: 'extensionMark.1.style.repeatX', options:[{label:'重复',value:'repeat'}, {label:'拉伸',value:'stretch'}], value: 'repeat', tabName: 'custom', groupName: 'graph' }, // 控制前景图重复
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: true, tabName: 'custom', groupName: 'label' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'imageFillBarData',
  values: [
    { type: '口红', value: 900 },
    { type: '吹风机', value: 613 },
    { type: '化妆刷', value: 329 },
    { type: '洗面仪', value: 500 },
    { type: '手套', value: 400 }
  ]
};

// 预定义图标映射 (来自参考 spec 的 icons 变量)
const icons = {
  口红: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/media/lipstick.png',
  吹风机: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/media/hairdryer.png',
  化妆刷: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/media/brush.png',
  洗面仪: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/media/cleanser.png',
  手套: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/media/gloves.png'
};

// 默认 VChart Option (Spec)
const option = {
  type: 'bar',
  data: [data],
  direction: 'horizontal', // 条形图
  xField: 'value',
  yField: 'type',
  bar: {
    style: {
      // 基础条形图设为灰色背景，实际填充由 extensionMark 控制
      fill: '#e8e8e8'
    }
  },
  label: {
    visible: true,
    style: {
      fill: '#000'
    }
  },
  extensionMark: [
    {
      // 背景 image mark
      type: 'image',
      dataId: 'imageFillBarData',
      visible: true,
      zIndex: 1, // 背景层
      style: {
        opacity: 0.1, // 可配置
        x: (datum, ctx) => ctx.valueToX([0]),
        y: (datum, ctx) => ctx.valueToY([datum.type]),
        width: (datum, ctx) => ctx.getRegion().getBoundsInRect().width, // 占满区域宽度
        height: (datum, ctx) => ctx.yBandwidth(),
        image: datum => icons[datum.type] || '', // 根据 type 获取图标
        repeatX: 'repeat', // 可配置
        repeatY: 'repeat' // 背景图默认 y 方向也重复
      }
    },
    {
      // 前景 image mark (实际值部分)
      type: 'image',
      dataId: 'imageFillBarData',
      visible: true,
      zIndex: 2, // 前景层
      style: {
        x: (datum, ctx) => ctx.valueToX([0]),
        y: (datum, ctx) => ctx.valueToY([datum.type]),
        width: (datum, ctx) => ctx.valueToX([datum.value]) - ctx.valueToX([0]), // 根据 value 计算宽度
        height: (datum, ctx) => ctx.yBandwidth(),
        image: datum => icons[datum.type] || '', // 根据 type 获取图标
        repeatX: 'repeat', // 可配置
        repeatY: 'repeat' // 前景图默认 y 方向也重复
      }
    }
  ],
  axes: [
    { orient: 'bottom', visible: false }, // 隐藏底部轴
    { orient: 'left' } // 显示左侧类别轴
  ]
};

const dataHandler = `return data;`;

// Option 处理函数: 根据 setting 更新重复方式
const optionHandler = `
function handleOption(option, config) {
  const bgRepeatSetting = config.setting.find(s => s.field === 'bgRepeat');
  const fgRepeatSetting = config.setting.find(s => s.field === 'fgRepeat');

  if (bgRepeatSetting && option.extensionMark && option.extensionMark[0]) {
    option.extensionMark[0].style.repeatX = bgRepeatSetting.value;
    // 如果是 stretch，则 Y 方向也 stretch
    option.extensionMark[0].style.repeatY = bgRepeatSetting.value === 'stretch' ? 'stretch' : 'repeat';
  }
  if (fgRepeatSetting && option.extensionMark && option.extensionMark[1]) {
    option.extensionMark[1].style.repeatX = fgRepeatSetting.value;
    // 如果是 stretch，则 Y 方向也 stretch
    option.extensionMark[1].style.repeatY = fgRepeatSetting.value === 'stretch' ? 'stretch' : 'repeat';
  }
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 