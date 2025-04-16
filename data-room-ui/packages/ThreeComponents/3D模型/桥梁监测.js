import BridgeModel from './glbs/bridge-minified.glb'

// 配置版本号
const version = '2024072901' // 使用当前日期或自定义版本
// 标题
const title = '桥梁实时监测'
// 用于标识，唯一，和文件名建议一致
const name = '桥梁监测'
// 添加组件类型标识
const chartType = 'threeJs'

// 右侧配置项 (数据配置部分)
const setting = [
  {
    label: '震动频率数据',
    type: 'select',
    field: 'vibrationFrequencyDataField', // 用于选择数据源字段的设置项
    optionField: 'customize.binding.vibrationFrequency', // 数据值最终存放的位置
    multiple: false,
    value: '', // 默认不选择任何字段
    tabName: 'data'
  },
  {
    label: '索力数据',
    type: 'select',
    field: 'cableForceDataField',
    optionField: 'customize.binding.cableForce',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  {
    label: '结构应力数据',
    type: 'select',
    field: 'structuralStressDataField',
    optionField: 'customize.binding.structuralStress',
    multiple: false,
    value: '',
    tabName: 'data'
  },
  {
    label: '位移数据',
    type: 'select',
    field: 'displacementDataField',
    optionField: 'customize.binding.displacement',
    multiple: false,
    value: '',
    tabName: 'data'
  }
  // 可以添加自定义样式的配置项，例如旋转速度、光照等
  // {
  //   label: '模型旋转',
  //   type: 'switch',
  //   field: 'enableRotation',
  //   optionField: 'customize.enableRotation',
  //   value: false,
  //   tabName: 'custom',
  //   groupName: '动画'
  // },
  // {
  //   label: '旋转速度',
  //   type: 'slider',
  //   field: 'rotationSpeed',
  //   optionField: 'customize.rotationSpeed',
  //   value: 0.005,
  //   min: 0,
  //   max: 0.05,
  //   step: 0.001,
  //   tabName: 'custom',
  //   groupName: '动画'
  // }
]

// 配置处理脚本 - 暂时为空
const optionHandler = ''

// 数据处理脚本 - 暂时为空，后续实现如何将数据绑定到 optionField
const dataHandler = ``

// 默认选项配置
const option = {
  // 可以添加背景色、相机等默认配置
  // backgroundColor: '#222222',
  // cameraPosition: { // 这个保留或移除皆可，优先使用 initial
  //   x: 0,
  //   y: 10,
  //   z: 30
  // },
  customize: {
    // 存放模型路径
    modelPath: BridgeModel,
    // 存放将来由 dataHandler 处理后的实际数据值
    binding: {
      vibrationFrequency: '--', // 初始默认值
      cableForce: '--',
      structuralStress: '--',
      displacement: '--'
    },
    // --- 添加默认视角 (估算值，可能需要调整) ---
    initialCameraPosition: { x: 5, y: 15, z: 40 }, // 稍微远和高一点
    initialCameraTarget: { x: 0, y: 2, z: 0 }     // 观察桥面中心附近
    // 可以添加其他自定义配置的默认值
    // enableRotation: false,
    // rotationSpeed: 0.005
  }
}

export default {
  version,
  title,
  name,
  chartType,
  option,
  setting,
  optionHandler,
  dataHandler
} 