// 配置版本号
const version = '2024051803';
// 标题
const title = 'V柱状图高度渐变';
// 用于标识，唯一
const name = 'V柱状图高度渐变';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 x
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 y
  // 样式配置
  // 渐变色通过 optionOverride 配置，或者可以暴露更复杂的设置项（如 stops）
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: false, tabName: 'custom', groupName: 'label' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', 
    // 提供一个默认的渐变配置示例
    value: JSON.stringify({ 
      bar: {
        style: {
          fill: {
            gradient: 'linear',
            x0: 0.5, y0: 0, x1: 0.5, y1: 1,
            stops: [
              { offset: 0, color: 'blue' },
              { offset: 1, color: 'red' }
            ]
          }
        }
      } 
    }, null, 2),
    tabName: 'custom', groupName: 'graph' 
  }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'gradientHeightBarData',
  values: [
    { x: '2:00', y: 82 }, { x: '4:00', y: 50 }, { x: '6:00', y: 64 },
    { x: '8:00', y: 10 }, { x: '10:00', y: 30 }, { x: '12:00', y: 40 },
    { x: '14:00', y: 56 }, { x: '16:00', y: 40 }, { x: '18:00', y: 64 },
    { x: '20:00', y: 74 }, { x: '22:00', y: 98 }
  ]
};

// 默认 VChart Option (Spec)
const option = {
  type: 'bar',
  data: [data],
  xField: 'x',
  yField: 'y',
  bar: {
    style: {
      // 默认填充，会被 override 覆盖
      fill: {
        gradient: 'linear',
        x0: 0.5, y0: 0, x1: 0.5, y1: 1,
        stops: [
          // 简单的默认渐变，实际颜色由 override 控制
          { offset: 0, color: '#2E67F3' }, 
          { offset: 1, color: '#63C7FA' }
        ]
        // 参考 spec 中包含基于数据的颜色判断逻辑，过于复杂，放入 override 中
        // stops: [
        //   {
        //     offset: 0,
        //     color: data => {
        //       if (data.y > 60) { return 'blue'; }
        //       return 'red';
        //     }
        //   },
        //   { offset: 1, color: 'red' }
        // ]
      }
    }
  },
  label: { visible: false },
  axes: [
    { orient: 'bottom', type: 'band' },
    { orient: 'left', type: 'linear' }
  ]
};

const dataHandler = `return data;`;
const optionHandler = ``; // 渐变逻辑通过 override 实现

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 