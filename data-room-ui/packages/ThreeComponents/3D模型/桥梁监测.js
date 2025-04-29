import BridgeModel from './glbs/bridge-minified.glb'

// 配置版本号
const version = '2024072903' // Updated version
// 标题
const title = '桥梁实时监测'
// 分类 (新增)
const category = '3D模型'
// 用于标识，唯一，title的中文转拼音 (修改)
const name = 'QiaoLiangShiShiJianCe'
// 添加组件类型标识
const chartType = 'threeJs'

// 右侧配置项 (数据配置部分 + 自定义样式配置)
const setting = [
  // --- Data Binding (Select FIELD NAME to use) ---
  // The value here should ideally default to the most common field name, e.g., 'value'
  { label: '结构应力数据字段', type: 'select', field: 'structuralStressDataField', optionField: 'customize.binding.structuralStress', value: 'value', tabName: 'data'},
  { label: '位移(竖)数据字段', type: 'select', field: 'displacementVDataField', optionField: 'customize.binding.displacementV', value: 'value', tabName: 'data'},
  { label: '位移(横)数据字段', type: 'select', field: 'displacementHDataField', optionField: 'customize.binding.displacementH', value: 'value', tabName: 'data'},
  { label: '震动频率数据字段', type: 'select', field: 'vibrationFrequencyDataField', optionField: 'customize.binding.vibrationFrequency', value: 'value', tabName: 'data'},
  { label: '索力数据字段', type: 'select', field: 'cableForceDataField', optionField: 'customize.binding.cableForce', value: 'value', tabName: 'data'},

  // --- Customization ---
  {
    label: '背景颜色',
    type: 'colorPicker',
    field: 'backgroundColor',
    optionField: 'customize.backgroundColor',
    value: '#333366', // Default from HTML
    tabName: 'custom'
  },
   {
    label: '启用阴影',
    type: 'switch',
    field: 'enableShadows',
    optionField: 'customize.enableShadows',
    value: true, // Default from HTML
    activeValue: true,
    inactiveValue: false,
    tabName: 'custom'
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
    tabName: 'custom'
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
    tabName: 'custom'
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
    tabName: 'custom'
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
    tabName: 'custom'
  },
  {
    label: '相机启用阻尼',
    type: 'switch',
    field: 'enableDamping',
    optionField: 'customize.enableDamping',
    value: true, // Default from OrbitControls
    activeValue: true,
    inactiveValue: false,
    tabName: 'custom'
  },
   {
    label: '标签垂直偏移',
    type: 'inputNumber',
    field: 'labelVerticalOffset',
    optionField: 'customize.labelVerticalOffset',
    value: -20, // Default value similar to HTML example's shift
    step: 1,
    tabName: 'custom'
  },
  {
    label: '标签碰撞间距',
    type: 'inputNumber',
    field: 'labelCollisionPadding',
    optionField: 'customize.labelCollisionPadding',
    value: 5, // Default value from HTML example
    min: 0,
    step: 1,
    tabName: 'custom'
  },
  {
    label: '标签字号(结构应力)', // Example Style Control
    type: 'inputNumber',
    field: 'labelFontSize_stress',
    optionField: 'customize.dataPoints[0].dataStructure[0].style.fontSize',
    value: 13, // Default from example
    step: 1,
    tabName: 'custom'
  },
  {
    label: '标签背景色(位移竖)', // Example Style Control
    type: 'colorPicker',
    field: 'labelBgColor_dispV',
    optionField: 'customize.dataPoints[1].dataStructure[0].style.backgroundColor',
    value: 'rgba(40, 40, 70, 0.85)', // Default CSS value
    tabName: 'custom'
  },
  {
    label: '标签文字色(位移横)', // Example Style Control
    type: 'colorPicker',
    field: 'labelColor_dispH',
    optionField: 'customize.dataPoints[1].dataStructure[1].style.color',
    value: '#f0f0f0', // Default CSS value
    tabName: 'custom'
  },
  {
    label: '正常状态颜色',
    type: 'colorPicker',
    field: 'colorNormal',
    optionField: 'customize.statusColors.normal',
    value: '#00f2a1', // From HTML CSS
    tabName: 'custom'
  },
  {
    label: '警告状态颜色',
    type: 'colorPicker',
    field: 'colorWarning',
    optionField: 'customize.statusColors.warning',
    value: '#ffc107', // From HTML CSS
    tabName: 'custom'
  },
  {
    label: '危险状态颜色',
    type: 'colorPicker',
    field: 'colorDanger',
    optionField: 'customize.statusColors.danger',
    value: '#f44336', // From HTML CSS
    tabName: 'custom'
  },
]

// 配置处理脚本 - 暂时为空
const optionHandler = ''

// 数据处理脚本 - 将在此实现
const dataHandler = `

if(data && data.length > 0){ // 检查 data 是否存在且有长度
  data.forEach(item => {
    // 检查 item.value 是否是包含逗号的字符串
    if (item && typeof item.value === 'string' && item.value.includes(',')) {
      
      const splitValues = item.value.split(',');

      // Helper function to safely convert split value to number or return 0
      const getValueOrDefault = (splitArr, index) => {
        const val = splitArr[index]?.trim();
        // Return Number(val) only if val is not empty string, otherwise return 0.
        // Number('') returns 0, which is fine. NaN check handles non-numeric strings.
        return val !== undefined && val !== null ? (Number(val) || 0) : 0;
      };

      // 按顺序赋值，使用默认值 0
      item.structuralStress = getValueOrDefault(splitValues, 0);
      item.displacementV = getValueOrDefault(splitValues, 1);
      item.displacementH = getValueOrDefault(splitValues, 2);
      item.vibrationFrequency = getValueOrDefault(splitValues, 3);
      item.cableForce = getValueOrDefault(splitValues, 4);


    } else {
      // 如果 item.value 不符合分割条件，则赋默认值 0
      item.structuralStress = 0;
      item.displacementV = 0;
      item.displacementH = 0;
      item.vibrationFrequency = 0;
      item.cableForce = 0;
    }
  });
} else {
   console.warn('[dataHandler] Input data is null or empty array.');
}


`

// 模拟数据 (新增，基于 dataPoints 默认值)
const data = [
  { id: 'structuralStress', value: 120 },
  { id: 'displacementV', value: 5 },
  { id: 'displacementH', value: 2 },
  { id: 'vibrationFrequency', value: 10.5 },
  { id: 'cableForce', value: 800 },
];

// --- Helper Function REMOVED as calculation moves to Vue component ---
// function getInitialStatus(point) { ... }

// 默认选项配置
const option = {
  // --- Standard Data Field --- 
  // This will hold the processed data ready for rendering
  // Its structure should ideally be easy for ThreeRenderCore to consume
  // e.g., an array of objects like: [{id: 'structuralStress', value: 150}, ...]
  // or a map: { structuralStress: 150, displacementV: 5, ... }
  // Let's start with null, dataFormatting will populate it.
  data: data, // 修改：指向顶层 data 常量

  customize: {
    // --- Model ---
    modelPath: BridgeModel,

    // --- Data Points Definition with RAW Initial Values & Thresholds ---
    // value and status will be calculated in the Vue component
    dataPoints: [
      {
        id: 'structuralStress',
        name: "结构应力",
        position: { x: -4, y: 12, z: 0.5 },
        dataStructure: [
          {
            bindingKey: "structuralStress",
            unit: "MPa",
            defaultValue: 120,
            thresholds: { warning: [140, 150], dangerMin: 150 },
            currentValue: 120,
            style: {
              fontSize: '13px'
            }
          }
        ],
        description: '当前该部位所承受的应力值，低于设计允许的最大应力值 150MPa，处于正常范围。' // Keep initial description
      },
      {
        id: 'displacement',
        name: "位移",
        position: { x: 4, y: 6, z: -0.5 },
        dataStructure: [
          {
            label: '竖',
            bindingKey: "displacementV",
            unit: 'mm',
            defaultValue: 5,
            thresholds: { normal: [0, 8] },
            currentValue: 5,
            style: {
              backgroundColor: 'rgba(40, 40, 70, 0.85)'
            }
          },
          {
            key: "horizontal",
            label: '横',
            bindingKey: "displacementH",
            unit: 'mm',
            defaultValue: 2,
            thresholds: { normal: [0, 5] },
            currentValue: 2,
            style: {
              color: '#f0f0f0'
            }
          }
        ],
        description: '跨中竖向位移在允许范围内，表明梁体变形正常；桥墩顶部水平位移较小，说明桥墩稳定性良好。'
      },
      {
        id: 'vibrationFrequency',
        name: "振动频率",
        position: { x: -2, y: 9, z: -0.5 },
        dataStructure: [
          {
            bindingKey: "vibrationFrequency",
            unit: "Hz",
            defaultValue: 10.5,
            thresholds: { normal: [9.5, 10.5], warning: [9.0, 11.0] },
            currentValue: 10.5,
            style: {}
          }
        ],
        description: '与桥梁初始设计频率 10Hz 相比，略有变化但在合理波动范围内，结构未出现明显损伤迹象。'
      },
      {
        id: 'cableForce',
        name: "索力",
        position: { x: 4, y: 12, z: 0.5 },
        dataStructure: [
          {
            bindingKey: "cableForce",
            unit: "kN",
            defaultValue: 800,
            thresholds: { normal: [700, 850], warning: [650, 900] },
            currentValue: 800,
            style: {}
          }
        ],
        description: '该斜拉索的拉力值，与设计索力 750kN 相比，偏差在允许范围内，索力分布较为均匀。'
      }
    ],
    // --- REMOVED IIFE wrapper, directly define the array ---

    // --- Data Binding Targets --- 
    binding: { 
        structuralStress: 'value', // Default to using 'value' field
        displacementV: 'value',
        displacementH: 'value',
        vibrationFrequency: 'value',
        cableForce: 'value'
    },
    // Stores the MAPPING from conceptual name to the KEY in the data source  
    
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
  category,
  name,
  chartType,
  option,
  setting,
  optionHandler,
  dataHandler // Still exporting the empty dataHandler
} 