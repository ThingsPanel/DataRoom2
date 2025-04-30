// 配置版本号
const version = '2023091901'
// 标题 - 修改
const title = 'V基础柱状图'
// 用于标识，唯一，和文件夹名称一致 - 修改
const name = 'V基础柱状图'
// 组件类型标识 - 修改
const type = 'customComponent'
// 右侧配置项 (简化)
const setting = [
  {
    label: '维度',
    type: 'select', // 设置组件类型
    field: 'xField', // 字段
    optionField: 'xField', // 对应options中的字段
    // 是否多选
    multiple: false,
    value: '',
    tabName: 'data'
  },

  {
    label: '指标',
    type: 'select', // 设置组件类型
    field: 'yField', // 字段
    optionField: 'yField', // 对应options中的字段
    // 是否多选
    multiple: false,
    value: '',
    tabName: 'data'
  },
  //  样式配置 (简化)
  {
    label: '柱子宽度',
    type: 'inputNumber', // 设置组件类型
    field: 'bar.barWidth', // 字段
    optionField: 'bar.barWidth', // 对应options中的字段
    value: 30,
    tabName: 'custom',
    groupName: 'graph'
  }
]

// 配置处理脚本 (保持不变)
const optionHandler = ''

// 数据处理脚本 (保持不变)
const dataHandler = ''

// VChart 规范的数据
const data = [
  { x: '本年话务总量', y: 300 },
  { x: '本年人工话务量', y: 1230 },
  { x: '每万客户呼入量', y: 425 },
  { x: '本年话务总量', y: 300 }
]

const option = {
  type: 'bar',
  data,
  xField: 'x',
  yField: 'y',
  bar: {
    barWidth: 30,
    style: {
      fill: '#5B8FF9'
    }
  },
  axes: [
    { orient: 'bottom', type: 'band', visible: true },
    { orient: 'left', type: 'linear', visible: true }
  ],
  legends: [
    { visible: false }
  ],
  animation: false
}

// 图表类型标识
const chartType = 'Column'
// 组件大类标识
const comType = 'vchartComponent'

export default {
  version,
  title, // 已修改
  name,  // 已修改
  type,  // 已修改
  option, // 已简化
  setting, // 已简化
  optionHandler,
  dataHandler,
  chartType, // 新增
  comType    // 新增
} 