// 配置版本号
const version = '2024072416';
// 标题
const title = 'V坐标轴动画';
// 用于标识，唯一
const name = 'V坐标轴动画';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 柱状图

// 右侧配置项
const setting = [
  { label: '国家字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 country
  { label: '数值字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 max
  // 样式配置
  { label: '水平方向', type: 'switch', field: 'directionHorizontal', optionField: 'direction', value: true, tabName: 'custom', groupName: 'bar' },
  { label: 'X轴动画', type: 'switch', field: 'xAxisAnimation', optionField: 'axes.0.animation', value: true, tabName: 'custom', groupName: 'animation' },
  { label: 'Y轴动画', type: 'switch', field: 'yAxisAnimation', optionField: 'axes.1.animation', value: true, tabName: 'custom', groupName: 'animation' },
  { label: '初始动画时长', type: 'inputNumber', field: 'appearDuration', optionField: 'animationAppear.axis.duration', value: 1000, min: 0, tabName: 'custom', groupName: 'animation' },
  { label: '更新动画时长', type: 'inputNumber', field: 'updateDuration', optionField: 'animationUpdate.axis.duration', value: 800, min: 0, tabName: 'custom', groupName: 'animation' },
  { label: '启用纹理', type: 'switch', field: 'textureEnabled', optionField: 'bar.style.texture', value: true, tabName: 'custom', groupName: 'bar' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { 
    label: 'Option 覆盖 (JSON)', 
    type: 'textarea', 
    field: 'optionOverride', 
    optionField: '', 
    value: JSON.stringify({
      animationAppear: {
        bar: {
          type: 'growWidthIn',
          duration: 1000
        },
        axis: {
          duration: 1000,
          easing: 'linear'
        }
      },
      animationUpdate: {
        bar: {
          duration: 1000,
          easing: 'linear'
        },
        axis: {
          duration: 800,
          easing: 'linear'
        }
      }
    }, null, 2),
    tabName: 'custom', 
    groupName: 'graph' 
  }
];

// 示例数据 (由于参考 spec 数据为空数组，这里创建一些示例数据)
const data = {
  id: 'axisAnimationData',
  values: [
    { country: 'China', max: 1400 },
    { country: 'India', max: 1300 },
    { country: 'USA', max: 330 },
    { country: 'Indonesia', max: 270 },
    { country: 'Brazil', max: 210 },
    { country: 'Pakistan', max: 200 },
    { country: 'Nigeria', max: 190 },
    { country: 'Bangladesh', max: 160 }
  ]
};

// 默认 VChart Option (Spec) - 带坐标轴动画的水平条形图
const option = {
  type: 'bar',
  data: [data],
  direction: 'horizontal', // 水平条形图
  yField: 'country',
  xField: 'max',
  padding: {
    top: 12,
    right: 100,
    bottom: 12,
    left: 100
  },
  axes: [
    {
      animation: true, // X轴动画
      orient: 'bottom',
      type: 'linear',
      visible: true,
      grid: { visible: true }
    },
    {
      animation: true, // Y轴动画
      orient: 'left',
      tick: { visible: false },
      label: { visible: true },
      type: 'band',
      grid: { visible: true }
    }
  ],
  animationAppear: {
    bar: {
      type: 'growWidthIn',
      duration: 1000
    },
    axis: {
      duration: 1000,
      easing: 'linear'
    }
  },
  animationUpdate: {
    bar: {
      duration: 1000,
      easing: 'linear'
    },
    axis: {
      duration: 800,
      easing: 'linear'
    }
  },
  bar: {
    style: {
      texture: 'circle',
      texturePadding: 1,
      textureSize: 5,
      textureColor: 'red'
    }
  }
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // 处理方向切换
  const directionHorizontalSetting = config.setting.find(s => s.field === 'directionHorizontal');
  if (directionHorizontalSetting) {
    option.direction = directionHorizontalSetting.value ? 'horizontal' : 'vertical';
    
    // 如果切换到垂直方向，需要调整轴的类型
    if (!directionHorizontalSetting.value) {
      if (option.axes && option.axes.length >= 2) {
        // 交换轴类型
        const temp = option.axes[0].type;
        option.axes[0].type = option.axes[1].type;
        option.axes[1].type = temp;
      }
    }
  }
  
  // 处理纹理开关
  const textureEnabledSetting = config.setting.find(s => s.field === 'textureEnabled');
  if (textureEnabledSetting && !textureEnabledSetting.value) {
    if (option.bar && option.bar.style) {
      option.bar.style.texture = undefined; // 禁用纹理
    }
  }
  
  // 处理动画时长
  const appearDurationSetting = config.setting.find(s => s.field === 'appearDuration');
  if (appearDurationSetting) {
    if (option.animationAppear) {
      if (option.animationAppear.bar) {
        option.animationAppear.bar.duration = appearDurationSetting.value;
      }
      if (option.animationAppear.axis) {
        option.animationAppear.axis.duration = appearDurationSetting.value;
      }
    }
  }
  
  const updateDurationSetting = config.setting.find(s => s.field === 'updateDuration');
  if (updateDurationSetting) {
    if (option.animationUpdate && option.animationUpdate.axis) {
      option.animationUpdate.axis.duration = updateDurationSetting.value;
      
      // 通常 bar 更新动画与 axis 同步或略长
      if (option.animationUpdate.bar) {
        option.animationUpdate.bar.duration = updateDurationSetting.value * 1.25;
      }
    }
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 