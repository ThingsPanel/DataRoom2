// 配置版本号
const version = '2024051812';
// 标题
const title = 'V自定义图例交互';
// 用于标识，唯一
const name = 'V自定义图例交互';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 分组柱状图

// 右侧配置项
const setting = [
  { label: '类别字段1', type: 'select', field: 'xFieldOuter', optionField: 'xField.0', multiple: false, value: '', tabName: 'data' }, // 对应 year
  { label: '类别字段2/系列', type: 'select', field: 'xFieldInner', optionField: 'xField.1', multiple: false, value: '', tabName: 'data' }, // 对应 type
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 type
  // 样式配置
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.0.visible', value: true, tabName: 'custom', groupName: 'legend' }, 
  { label: '图例位置', type: 'select', field: 'legendOrient', optionField: 'legends.0.orient', options:[{label:'左',value:'left'},{label:'顶',value:'top'},{label:'右',value:'right'},{label:'底',value:'bottom'}], value: 'top', tabName: 'custom', groupName: 'legend' },
  // 复杂的图例交互和状态定义建议通过 optionOverride 实现
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: false, tabName: 'custom', groupName: 'label' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { 
    label: 'Option 覆盖 (JSON)', 
    type: 'textarea', 
    field: 'optionOverride', 
    optionField: '', 
    value: JSON.stringify({
      stateDef: {
        legend_hover: { filter: `datum => true` }
      },
      legends: [{
        orient: 'top',
        position: 'middle',
        select: false,
        data: `items => {
          return items.map(item => {
            item.shape.outerBorder = {
              stroke: item.shape.fill,
              distance: 2,
              lineWidth: 1
            };
            return item;
          });
        }`,
        item: {
          shape: { space: 8 },
          background: { visible: false }
        }
      }],
      bar: {
        state: {
          legend_hover_reverse: { fill: '#ccc' }
        }
      }
    }, null, 2),
    tabName: 'custom', 
    groupName: 'graph' 
  }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'customLegendInteractionData',
  values: [
    { year: '2012', type: 'Forest', value: 320 }, { year: '2012', type: 'Steppe', value: 220 },
    { year: '2012', type: 'Desert', value: 150 }, { year: '2012', type: 'Wetland', value: 98 },
    { year: '2013', type: 'Forest', value: 332 }, { year: '2013', type: 'Steppe', value: 182 },
    { year: '2013', type: 'Desert', value: 232 }, { year: '2013', type: 'Wetland', value: 77 },
    { year: '2014', type: 'Forest', value: 301 }, { year: '2014', type: 'Steppe', value: 191 },
    { year: '2014', type: 'Desert', value: 201 }, { year: '2014', type: 'Wetland', value: 101 },
    { year: '2015', type: 'Forest', value: 334 }, { year: '2015', type: 'Steppe', value: 234 },
    { year: '2015', type: 'Desert', value: 154 }, { year: '2015', type: 'Wetland', value: 99 },
    { year: '2016', type: 'Forest', value: 390 }, { year: '2016', type: 'Steppe', value: 290 },
    { year: '2016', type: 'Desert', value: 190 }, { year: '2016', type: 'Wetland', value: 40 }
  ]
};

// 默认 VChart Option (Spec) - 基础分组柱状图
const option = {
  type: 'bar',
  data: [data],
  xField: ['year', 'type'],
  yField: 'value',
  seriesField: 'type',
  label: { visible: false },
  legends: [{ 
    visible: true, 
    orient: 'top', // 与 override 示例保持一致
    position: 'middle' // 与 override 示例保持一致
    // 其他复杂配置在 override 中
  }],
  axes: [
    { orient: 'left', type: 'linear' }, 
    { orient: 'bottom', type: 'band' }
  ]
  // stateDef 和 bar.state 在 override 中
};

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // 确保 override 中的函数字符串能正确解析和执行
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 