import BridgeModel from './glbs/bridge-minified.glb'

// 配置版本号
const version = '2024072903' // Updated version
// 标题
const title = '桥梁实时监测'
// 用于标识，唯一，和文件名建议一致
const name = '桥梁监测'
// 添加组件类型标识
const chartType = 'threeJs'

// 右侧配置项 (数据配置部分 + 自定义样式配置)
const setting = [
  // --- Data Binding ---
  {
    label: '结构应力数据',
    type: 'select',
    field: 'structuralStressDataField',
    optionField: 'customize.binding.structuralStress', // Binding target path
    multiple: false,
    value: '',
    tabName: 'data',
    groupName: '数据绑定' // Group data bindings
  },
  {
    label: '位移数据(竖向)', // Separate binding for vertical displacement
    type: 'select',
    field: 'displacementVDataField',
    optionField: 'customize.binding.displacementV',
    multiple: false,
    value: '',
    tabName: 'data',
    groupName: '数据绑定'
  },
    {
    label: '位移数据(水平)', // Separate binding for horizontal displacement
    type: 'select',
    field: 'displacementHDataField',
    optionField: 'customize.binding.displacementH',
    multiple: false,
    value: '',
    tabName: 'data',
    groupName: '数据绑定'
  },
  {
    label: '震动频率数据',
    type: 'select',
    field: 'vibrationFrequencyDataField',
    optionField: 'customize.binding.vibrationFrequency',
    multiple: false,
    value: '',
    tabName: 'data',
    groupName: '数据绑定'
  },
  {
    label: '索力数据',
    type: 'select',
    field: 'cableForceDataField',
    optionField: 'customize.binding.cableForce',
    multiple: false,
    value: '',
    tabName: 'data',
    groupName: '数据绑定'
  },

  // --- Customization ---
  {
    label: '背景颜色',
    type: 'colorPicker',
    field: 'backgroundColor',
    optionField: 'customize.backgroundColor',
    value: '#333366', // Default from HTML
    tabName: 'custom',
    groupName: '环境'
  },
   {
    label: '启用阴影',
    type: 'switch',
    field: 'enableShadows',
    optionField: 'customize.enableShadows',
    value: true, // Default from HTML
    activeValue: true,
    inactiveValue: false,
    tabName: 'custom',
    groupName: '环境'
  },
  {
    label: '环境光强度',
    type: 'slider',
    field: 'ambientLightIntensity',
    optionField: 'customize.ambientLightIntensity',
    value: 0.5, // Default from HTML
    min: 0,
    max: 2,
    step: 0.1,
    tabName: 'custom',
    groupName: '光照'
  },
  {
    label: '主方向光强度',
    type: 'slider',
    field: 'directionalLightIntensity',
    optionField: 'customize.directionalLightIntensity',
    value: 0.8, // Default from HTML
    min: 0,
    max: 2,
    step: 0.1,
    tabName: 'custom',
    groupName: '光照'
  },
   {
    label: '填充方向光强度', // Adding the second directional light control
    type: 'slider',
    field: 'directionalLight2Intensity',
    optionField: 'customize.directionalLight2Intensity',
    value: 0.4, // Default from HTML
    min: 0,
    max: 2,
    step: 0.1,
    tabName: 'custom',
    groupName: '光照'
  },
  {
    label: '初始缩放因子',
    type: 'inputNumber',
    field: 'initialZoomFactor',
    optionField: 'customize.initialZoomFactor',
    value: 0.083, // Corresponds to /= 12 in HTML for closeup
    min: 0.01,
    max: 5,
    step: 0.01,
    tabName: 'custom',
    groupName: '相机'
  },
  {
    label: '相机启用阻尼',
    type: 'switch',
    field: 'enableDamping',
    optionField: 'customize.enableDamping',
    value: true, // Default from OrbitControls
    activeValue: true,
    inactiveValue: false,
    tabName: 'custom',
    groupName: '相机'
  },
   {
    label: '标签垂直偏移',
    type: 'inputNumber',
    field: 'labelVerticalOffset',
    optionField: 'customize.labelVerticalOffset',
    value: -20, // Default value similar to HTML example's shift
    step: 1,
    tabName: 'custom',
    groupName: '标签样式'
  },
  {
    label: '标签碰撞间距',
    type: 'inputNumber',
    field: 'labelCollisionPadding',
    optionField: 'customize.labelCollisionPadding',
    value: 5, // Default value from HTML example
    min: 0,
    step: 1,
    tabName: 'custom',
    groupName: '标签样式'
  },
  {
    label: '正常状态颜色',
    type: 'colorPicker',
    field: 'colorNormal',
    optionField: 'customize.statusColors.normal',
    value: '#00f2a1', // From HTML CSS
    tabName: 'custom',
    groupName: '标签样式'
  },
  {
    label: '警告状态颜色',
    type: 'colorPicker',
    field: 'colorWarning',
    optionField: 'customize.statusColors.warning',
    value: '#ffc107', // From HTML CSS
    tabName: 'custom',
    groupName: '标签样式'
  },
  {
    label: '危险状态颜色',
    type: 'colorPicker',
    field: 'colorDanger',
    optionField: 'customize.statusColors.danger',
    value: '#f44336', // From HTML CSS
    tabName: 'custom',
    groupName: '标签样式'
  },
]

// 配置处理脚本 - 暂时为空
const optionHandler = ''

// 数据处理脚本 - 将在此实现
const dataHandler = ``

// --- Helper Function REMOVED as calculation moves to Vue component ---
// function getInitialStatus(point) { ... }

// 默认选项配置
const option = {
  customize: {
    // --- Model ---
    modelPath: BridgeModel,

    // --- Data Points Definition with RAW Initial Values & Thresholds ---
    // value and status will be calculated in the Vue component
    dataPoints: [
      {
        id: 'structuralStress',
        name: "结构应力",
        position: { x: -15, y: 18, z: 3 }, 
        unit: "MPa",
        thresholds: { warning: [140, 150], dangerMin: 150 }, 
        currentValue: 120, // Raw initial value
        value: '--', // Placeholder, will be calculated
        status: 'normal', // Placeholder, will be calculated
        description: '当前该部位所承受的应力值，低于设计允许的最大应力值 150MPa，处于正常范围。' // Keep initial description
      },
      {
        id: 'displacement',
        name: "位移",
        position: { x: 20, y: -10, z: -3 }, 
        verticalUnit: "mm",
        horizontalUnit: "mm",
        thresholds: { verticalNormal: [0, 8], horizontalNormal: [0, 5] }, 
        verticalValue: 5, // Raw initial value
        horizontalValue: 2, // Raw initial value
        value: '--', // Placeholder
        status: 'normal', // Placeholder
        description: '跨中竖向位移在允许范围内，表明梁体变形正常；桥墩顶部水平位移较小，说明桥墩稳定性良好。'
      },
      {
        id: 'vibrationFrequency',
        name: "振动频率",
        position: { x: -15, y: 15, z: -3 }, 
        unit: "Hz",
        thresholds: { normal: [9.5, 10.5], warning: [9.0, 11.0] }, 
        currentValue: 10.5, // Raw initial value
        value: '--', // Placeholder
        status: 'normal', // Placeholder
        description: '与桥梁初始设计频率 10Hz 相比，略有变化但在合理波动范围内，结构未出现明显损伤迹象。'
      },
      {
        id: 'cableForce',
        name: "索力",
        position: { x: 15, y: 18, z: 3 }, 
        unit: "kN",
        thresholds: { normal: [700, 850], warning: [650, 900] }, 
        currentValue: 800, // Raw initial value
        value: '--', // Placeholder
        status: 'normal', // Placeholder
        description: '该斜拉索的拉力值，与设计索力 750kN 相比，偏差在允许范围内，索力分布较为均匀。'
      }
    ],
    // --- REMOVED IIFE wrapper, directly define the array ---

    // --- Data Binding Targets --- 
    binding: {
      structuralStress: '1',
      displacementV: '1',
      displacementH: '2',
      vibrationFrequency: '2',
      cableForce: '2'
    },
    
    // --- Environment & Lighting --- 
    backgroundColor: '#333366',
    enableShadows: true,
    ambientLightIntensity: 0.5,
    directionalLightIntensity: 0.8,
    directionalLight2Intensity: 0.4,
    
    // --- Camera --- 
    initialCameraPosition: { x: 5, y: 15, z: 40 },
    initialCameraTarget: { x: 0, y: 2, z: 0 },
    initialZoomFactor: 0.083,
    enableDamping: true,
    
    // --- Label Styling --- 
    labelVerticalOffset: -20, // Default vertical offset
    labelCollisionPadding: 5, // Default padding between colliding labels
    statusColors: {
        normal: '#00f2a1',
        warning: '#ffc107',
        danger: '#f44336'
    }
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
  dataHandler // Still exporting the empty dataHandler
} 