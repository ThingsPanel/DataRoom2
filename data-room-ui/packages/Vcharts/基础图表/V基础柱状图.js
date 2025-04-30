// 配置版本号
const version = '2023091901'
// 标题 - 修改
const title = 'V基础柱状图'
// 用于标识，唯一，和文件夹名称一致 - 修改
const name = 'V基础柱状图'
// 组件类型标识 - 修改
const type = 'vchartComponent'
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
    field: 'seriesCustom_barWidth', // 字段
    optionField: 'seriesCustom.barWidth', // 对应options中的字段
    value: 30,
    tabName: 'custom',
    groupName: 'graph'
  }
]

// 配置处理脚本 (保持不变)
const optionHandler = ''

// 数据处理脚本 (保持不变)
const dataHandler = ''

// 图表配置 (简化)
const xData = ['本年话务总量', '本年人工话务量', '每万客户呼入量', '本年话务总量']
const yData = [300, 1230, 425, 300]
// const maxData = [1500, 1500, 1500, 1500] // 不再需要 maxData

const option = {
  animation: false,
  // grid: { // 移除 grid 配置
  xAxis: [ // 简化 xAxis
    {
      type: 'category',
      data: xData,
      axisLabel: { show: true }, // 保留基本显示
      axisLine: { show: true },
      axisTick: { show: true }
    }
  ],
  yAxis: { // 简化 yAxis
    type: 'value',
    axisLabel: { show: true }, // 保留基本显示
    axisLine: { show: true },
    axisTick: { show: true },
    splitLine: { show: true } // 保留分隔线基本显示
  },
  seriesCustom: { // 只保留 barWidth
    barWidth: 30
    // 移除其他 seriesCustom 颜色配置
  },
  series: [ // 简化 series，只保留一个基础 bar
    {
      id: 'barColor', // 可以保留 id 用于可能的 dataHandler/optionHandler
      type: 'bar',
      // barWidth 通过 seriesCustom.barWidth 控制，这里不需要重复设置
      // barWidth: 30, // 移除
      // z: 10, // 移除 z
      // color: '#115ba6', // 颜色可以由默认主题或后续配置控制，移除硬编码
      label: { // 保留基本标签显示
        show: true,
        position: 'inside',
        color: '#fff',
        fontSize: 12
      },
      data: yData
    }
    // 移除 pictorialBar 和 shadow 系列
  ]
}
export default {
  version,
  title, // 已修改
  name,  // 已修改
  type,  // 已修改
  option, // 已简化
  setting, // 已简化
  optionHandler,
  dataHandler
} 