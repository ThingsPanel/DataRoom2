// 配置版本号
const version = '2024051806';
// 标题
const title = 'V基础滚动条';
// 用于标识，唯一
const name = 'V基础滚动条';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 右侧配置项
const setting = [
  { label: '类别字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: '', tabName: 'data' }, // 对应 year
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 sales
  // 样式配置
  { 
    label: '滚动条位置', 
    type: 'select', 
    field: 'scrollBarOrient', 
    optionField: 'scrollBar.0.orient', 
    options: [{label:'底部', value:'bottom'}, {label:'顶部', value:'top'}, {label:'左侧', value:'left'}, {label:'右侧', value:'right'}], 
    value: 'bottom', 
    tabName: 'custom', 
    groupName: 'scrollBar' 
  },
  { label: '允许漫游', type: 'switch', field: 'scrollBarRoam', optionField: 'scrollBar.0.roam', value: true, tabName: 'custom', groupName: 'scrollBar' },
  { label: '起始位置(%)', type: 'inputNumber', field: 'scrollBarStart', optionField: 'scrollBar.0.start', value: 0, min: 0, max: 1, step: 0.01, tabName: 'custom', groupName: 'scrollBar' },
  { label: '结束位置(%)', type: 'inputNumber', field: 'scrollBarEnd', optionField: 'scrollBar.0.end', value: 0.5, min: 0, max: 1, step: 0.01, tabName: 'custom', groupName: 'scrollBar' },
  { label: '显示标签', type: 'switch', field: 'labelVisible', optionField: 'label.visible', value: false, tabName: 'custom', groupName: 'label' },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'graph' },
  { label: 'Option 覆盖 (JSON)', type: 'textarea', field: 'optionOverride', optionField: '', value: '{}', tabName: 'custom', groupName: 'graph' }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'scrollBarBaseData',
  values: [
    { year: '2000', sales: 22 }, { year: '2001', sales: 13 }, { year: '2002', sales: 25 },
    { year: '2003', sales: 29 }, { year: '2004', sales: 38 }, { year: '2005', sales: 49 },
    { year: '2006', sales: 58 }, { year: '2007', sales: 29 }, { year: '2008', sales: 78 },
    { year: '2009', sales: 19 }, { year: '2010', sales: 23 }, { year: '2011', sales: 20 },
    { year: '2012', sales: 98 }, { year: '2013', sales: 49 }, { year: '2014', sales: 28 }
  ]
};

// 默认 VChart Option (Spec)
const option = {
  type: 'bar',
  data: [data],
  xField: 'year',
  yField: 'sales',
  scrollBar: [
    {
      orient: 'bottom', // 可配置
      start: 0, // 可配置
      end: 0.5, // 可配置
      roam: true // 可配置
    }
  ],
  label: { visible: false },
  axes: [
    { orient: 'bottom', type: 'band' },
    { orient: 'left', type: 'linear' }
  ]
};

const dataHandler = `return data;`;
const optionHandler = ``; // ScrollBar 配置直接通过 optionField 更新

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 