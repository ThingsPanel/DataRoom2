// 配置版本号
const version = '2024072414';
// 标题
const title = 'V不同风格主题注册切换';
// 用于标识，唯一
const name = 'V不同风格主题注册切换';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar'; // 柱状图

// 右侧配置项
const setting = [
  { label: '年份字段', type: 'select', field: 'xFieldYear', optionField: 'xField.0', multiple: false, value: '', tabName: 'data' }, // 对应 year
  { label: '类型字段', type: 'select', field: 'xFieldType', optionField: 'xField.1', multiple: false, value: '', tabName: 'data' }, // 对应 type
  { label: '数值字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: '', tabName: 'data' }, // 对应 value
  { label: '系列字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: '', tabName: 'data' }, // 对应 type
  // 样式配置
  { label: '显示图例', type: 'switch', field: 'legendVisible', optionField: 'legends.visible', value: true, tabName: 'custom', groupName: 'legend' },
  { label: '图例位置', type: 'select', field: 'legendOrient', optionField: 'legends.orient', 
    options: [
      { label: '顶部', value: 'top' },
      { label: '底部', value: 'bottom' },
      { label: '左侧', value: 'left' },
      { label: '右侧', value: 'right' }
    ], 
    value: 'top', tabName: 'custom', groupName: 'legend' 
  },
  { label: '图例对齐', type: 'select', field: 'legendPosition', optionField: 'legends.position', 
    options: [
      { label: '起始', value: 'start' },
      { label: '中间', value: 'middle' },
      { label: '末尾', value: 'end' }
    ], 
    value: 'start', tabName: 'custom', groupName: 'legend' 
  },
  // 主题配置 - 核心功能
  {
    label: '主题选择',
    type: 'select',
    field: 'chartTheme',
    optionField: 'theme',
    options: [
      { label: '浅色', value: 'light' },
      { label: '深色', value: 'dark' },
      { label: 'VChart默认', value: 'default' },
      { label: 'Semi Design浅色', value: 'semiDesignLight' },
      { label: 'Semi Design深色', value: 'semiDesignDark' },
      { label: 'Ant Design浅色', value: 'antDesignLight' },
      { label: 'Ant Design深色', value: 'antDesignDark' },
      { label: '自定义主题1', value: 'customTheme1' },
      { label: '自定义主题2', value: 'customTheme2' }
    ],
    value: 'light',
    tabName: 'custom',
    groupName: 'theme'
  },
  {
    label: 'Option 覆盖 (JSON)',
    type: 'textarea',
    field: 'optionOverride',
    optionField: '',
    // 提供自定义主题示例
    value: JSON.stringify({
      // 主题定义需要在应用初始化时通过 VChart.ThemeManager.registerTheme 注册
      // 这里只提供一个使用现有主题的示例
      theme: 'light'
    }, null, 2),
    tabName: 'custom',
    groupName: 'theme'
  }
];

// 示例数据 (来自参考 spec)
const data = {
  id: 'themeToggleData',
  values: [
    { type: 'Autocracies', year: '1930', value: 129 },
    { type: 'Autocracies', year: '1940', value: 133 },
    { type: 'Autocracies', year: '1950', value: 130 },
    { type: 'Autocracies', year: '1960', value: 126 },
    { type: 'Autocracies', year: '1970', value: 117 },
    { type: 'Autocracies', year: '1980', value: 114 },
    { type: 'Autocracies', year: '1990', value: 111 },
    { type: 'Autocracies', year: '2000', value: 89 },
    { type: 'Autocracies', year: '2010', value: 80 },
    { type: 'Autocracies', year: '2018', value: 80 },
    { type: 'Democracies', year: '1930', value: 22 },
    { type: 'Democracies', year: '1940', value: 13 },
    { type: 'Democracies', year: '1950', value: 25 },
    { type: 'Democracies', year: '1960', value: 29 },
    { type: 'Democracies', year: '1970', value: 38 },
    { type: 'Democracies', year: '1980', value: 41 },
    { type: 'Democracies', year: '1990', value: 57 },
    { type: 'Democracies', year: '2000', value: 87 },
    { type: 'Democracies', year: '2010', value: 98 },
    { type: 'Democracies', year: '2018', value: 99 }
  ]
};

// 默认 VChart Option (Spec) - 分组柱状图，支持主题切换
const option = {
  type: 'bar',
  data: [data],
  xField: ['year', 'type'],
  yField: 'value',
  seriesField: 'type',
  legends: {
    visible: true,
    orient: 'top',
    position: 'start'
  },
  theme: 'light' // 默认浅色主题
};

// 主题注册相关的代码示例 (注释形式，需要在应用初始化时执行)
const themeRegistrationExample = `
// 这段代码需要在应用初始化时执行，例如在 main.js 或专门的主题配置文件中
// 引入 VChart 和所有预定义主题
import VChart from '@visactor/vchart';
import allThemeMap from '@visactor/vchart-theme';

// 注册所有预定义主题
Object.keys(allThemeMap).forEach(themeType => {
  const theme = allThemeMap[themeType];
  VChart.ThemeManager.registerTheme(themeType, theme);
});

// 注册自定义主题示例
VChart.ThemeManager.registerTheme('customTheme1', {
  // 主题定义对象
  color: ['#FF6B3B', '#626681', '#FFC100', '#9FB40F', '#76523B', '#DAD5B5', '#0E8E89', '#E19348', '#F383A2', '#247FEA'],
  category10: ['#FF6B3B', '#626681', '#FFC100', '#9FB40F', '#76523B', '#DAD5B5', '#0E8E89', '#E19348', '#F383A2', '#247FEA'],
  // 更多主题配置...
});
`;

const dataHandler = `return data;`;
const optionHandler = `
function handleOption(option, config) {
  // 主题切换处理
  const chartThemeSetting = config.setting.find(s => s.field === 'chartTheme');
  if (chartThemeSetting) {
    option.theme = chartThemeSetting.value;
  }
  
  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
};

// 注：以下是主题注册示例代码，仅供参考，不是组件的一部分
/*
${themeRegistrationExample}
*/ 