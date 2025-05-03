// 配置版本号
const version = '2024051813';
// 标题
const title = 'V图例聚焦模式';
// 用于标识，唯一
const name = 'V图例聚焦模式';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 分组柱状图

// 右侧配置项
const setting = [
  { label: '类别字段1', type: 'select', field: 'xFieldOuter', optionField: 'xField.0', multiple: false, value: '', tabName: 'data' }, // 对应 city
  { label: '类别字段2/系列', type: 'select', field: 'xFieldInner', optionField: 'xField.1', multiple: false, value: '', tabName: 'data' }, // 对应 type
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 type
  // 样式配置
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.0.visible', value: true, tabName: 'custom', groupName: 'legend' }, 
  { label: '图例位置', type: 'select', field: 'legendOrient', optionField: 'legends.0.orient', options:[{label:'左',value:'left'},{label:'顶',value:'top'},{label:'右',value:'right'},{label:'底',value:'bottom'}], value: 'right', tabName: 'custom', groupName: 'legend' },
  { label: '图例对齐', type: 'select', field: 'legendPosition', optionField: 'legends.0.position', options:[{label:'起始',value:'start'},{label:'中间',value:'middle'},{label:'末尾',value:'end'}], value: 'start', tabName: 'custom', groupName: 'legend' },
  { label: '启用图例聚焦', type: 'switch', field: 'legendFocus', optionField: 'legends.0.item.focus', value: true, tabName: 'custom', groupName: 'legend' },
  { label: '允许全部取消', type: 'switch', field: 'legendAllowAllCanceled', optionField: 'legends.0.allowAllCanceled', value: true, tabName: 'custom', groupName: 'legend' },
  // defaultSelected 比较复杂，建议用 override
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: false, tabName: 'custom', groupName: 'label' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', 
    value: JSON.stringify({ legends: [{ defaultSelected: ['specialty snacks', 'rice'] }] }, null, 2), // 提供默认选中示例
    tabName: 'custom', groupName: 'graph' 
  }
];

// 示例数据 (需要包含 city, type, value)
const data = {
  id: 'legendFocusData',
  values: [
    { city: 'City A', type: 'rice', value: 100 }, { city: 'City A', type: 'specialty snacks', value: 120 }, { city: 'City A', type: 'tea', value: 80 },
    { city: 'City B', type: 'rice', value: 150 }, { city: 'City B', type: 'specialty snacks', value: 90 }, { city: 'City B', type: 'tea', value: 110 },
    // ... 更多数据
  ]
};

// 默认 VChart Option (Spec) - 分组柱状图
const option = {
  type: 'bar',
  data: [data],
  xField: ['city', 'type'],
  yField: 'value',
  seriesField: 'type',
  label: { visible: false },
  legends: [{
    visible: true,
    orient: 'right',
    position: 'start',
    allowAllCanceled: true,
    item: {
      focus: true
    }
    // defaultSelected 在 override 中
  }],
  axes: [
    { orient: 'left', type: 'linear' }, 
    { orient: 'bottom', type: 'band' }
  ]
};

const dataHandler = `return data;`;
const optionHandler = ``; // 直接通过 optionField 更新

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 