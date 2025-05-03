// 配置版本号
const version = '2024051817';
// 标题
const title = 'V百分比堆叠柱图动态纹理';
// 用于标识，唯一
const name = 'V百分比堆叠柱图动态纹理';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 百分比堆叠柱状图

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 State
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 Population
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 Age
  // 样式配置
  { label: '启用堆叠', type: 'switch', field: 'stack', optionField: 'stack', value: true, tabName: 'custom', groupName: 'graph' }, // 必须
  { label: '启用百分比', type: 'switch', field: 'percent', optionField: 'percent', value: true, tabName: 'custom', groupName: 'graph' }, // 必须
  { label: '基础纹理类型', type: 'select', field: 'baseTexture', optionField: 'bar.style.texture', 
    options: [ // 提供一些基础选项，动态的在 override 里
      { label: '无', value: undefined }, 
      { label: '方形', value: 'square' }, 
      { label: '圆形', value: 'circle' }, 
      { label: '线条', value: 'line' }
    ], 
    value: 'square', // 参考 spec 用了 square
    tabName: 'custom', groupName: 'graph' 
  },
  { label: '纹理大小', type: 'inputNumber', field: 'textureSize', optionField: 'bar.style.textureSize', value: 10, min: 1, tabName: 'custom', groupName: 'graph' },
  { label: '纹理间距', type: 'inputNumber', field: 'texturePadding', optionField: 'bar.style.texturePadding', value: 1, min: 0, tabName: 'custom', groupName: 'graph' },
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.0.visible', value: true, tabName: 'custom', groupName: 'legend' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { 
    label: 'Option 覆盖 (JSON)', 
    type: 'textarea', 
    field: 'optionOverride', 
    optionField: '', 
    // 提供动态纹理示例
    value: JSON.stringify({
      bar: {
        style: {
          // 动态纹理函数非常复杂，需要用户提供完整实现
          textureOptions: `datum => {
            // 需要在此处定义 VCHART_MODULE 或相关函数
            // const VCHART_MODULE = window.VCHART_MODULE; 
            const func = datum.Age === 'Under 5 Years'
              ? (ctx, r, c, rc, cc, rat, gra) => VCHART_MODULE.randomOpacity(ctx, r, c, rc, cc, rat, gra, 0.3)
              : datum.Age === '5 to 13 Years'
              ? (ctx, r, c, rc, cc, rat, gra) => VCHART_MODULE.columnLeftToRight(ctx, r, c, rc, cc, rat, gra)
              : (ctx, r, c, rc, cc, rat, gra) => VCHART_MODULE.columnRightToLeft(ctx, r, c, rc, cc, rat, gra);
            return {
              dynamicTexture: (ctx, r, c, rc, cc, rat, gra) => {
                const _r = func(ctx, r, c, rc, cc, rat, gra);
                ctx.globalAlpha = _r;
                ctx.fillStyle = datum.Age === 'Under 5 Years' ? 'red' : datum.Age === '5 to 13 Years' ? 'blue' : 'green';
                ctx.fill();
              }
            };
          }`
        }
      },
      animationAppear: {
        bar: {
          channel: { textureRatio: { from: 0, to: 1 } },
          easing: 'linear', duration: 3000, loop: true
        }
      }
    }, null, 2),
    tabName: 'custom', 
    groupName: 'graph' 
  }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'dynamicTextureData',
  values: [
    { State: 'WY', Age: 'Under 5 Years', Population: 25635 }, { State: 'WY', Age: '5 to 13 Years', Population: 1890 },
    { State: 'WY', Age: '14 to 17 Years', Population: 9314 }, { State: 'DC', Age: 'Under 5 Years', Population: 30352 },
    { State: 'DC', Age: '5 to 13 Years', Population: 20439 }, { State: 'DC', Age: '14 to 17 Years', Population: 10225 },
    // ... 更多数据
  ]
};

// 默认 VChart Option (Spec) - 百分比堆叠柱状图
const option = {
  type: 'bar',
  data: [data],
  xField: 'State',
  yField: 'Population',
  seriesField: 'Age',
  stack: true,
  percent: true,
  bar: {
    style: {
      texture: 'square', // 默认基础纹理
      textureSize: 10,
      texturePadding: 1
      // textureOptions 在 override 中
    }
  },
  label: { visible: false },
  legends: { visible: true },
  axes: [
    { orient: 'left', label: { formatMethod: v => `${(v * 100).toFixed(0)}%` } }, // Y轴百分比
    { orient: 'bottom', type: 'band' }
  ]
  // animationAppear 在 override 中
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // 确保 override 中的函数字符串能正确解析和执行
  // 特别是 textureOptions 需要 VCHART_MODULE
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 