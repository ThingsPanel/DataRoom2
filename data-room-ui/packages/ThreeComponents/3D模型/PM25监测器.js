import PM25Monitor from './glbs/PM25_Monitor.glb'

// 配置版本号
const version = '2024073001'
// 标题
const title = 'PM2.5监测器'
// 用于标识，唯一，和文件夹名称一致
const name = 'PM25监测器'
// 添加组件类型标识
const chartType = 'threeJs'
// 分类 (新增，与桥梁监测对齐)
const category = '3D模型'

// 右侧配置项
const setting = [
  {
    label: 'PM2.5数据字段',
    type: 'select',
    field: 'pm25ValueDataField',
    optionField: 'customize.binding.pm25Value',
    value: 'value',
    tabName: 'data',
    groupName: '数据绑定'
  },
  {
    label: '背景颜色',
    type: 'colorPicker',
    field: 'backgroundColor',
    optionField: 'customize.backgroundColor',
    value: '#1a1a1a',
    tabName: 'custom',
    groupName: '环境'
  },
  {
    label: '启用阴影',
    type: 'switch',
    field: 'enableShadows',
    optionField: 'customize.enableShadows',
    value: true,
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
    value: 0.7,
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
    value: 0.6,
    min: 0,
    max: 2,
    step: 0.1,
    tabName: 'custom',
    groupName: '光照'
  },
  {
    label: '填充方向光强度',
    type: 'slider',
    field: 'directionalLight2Intensity',
    optionField: 'customize.directionalLight2Intensity',
    value: 0.4,
    min: 0,
    max: 2,
    step: 0.1,
    tabName: 'custom',
    groupName: '光照'
  },
  {
    label: '模型旋转速度',
    type: 'slider',
    field: 'rotationSpeed',
    optionField: 'customize.rotationSpeed',
    value: 0,
    min: -0.05,
    max: 0.05,
    step: 0.001,
    tabName: 'custom',
    groupName: '动画'
  },
  {
    label: '模型缩放',
    type: 'inputNumber',
    field: 'modelScale',
    optionField: 'customize.modelScale',
    value: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
    tabName: 'custom',
    groupName: '模型'
  },
  {
    label: '模型Y轴位置',
    type: 'inputNumber',
    field: 'modelPositionY',
    optionField: 'customize.modelPositionY',
    value: 0,
    step: 0.1,
    tabName: 'custom',
    groupName: '模型'
  },
  {
    label: '初始缩放因子',
    type: 'inputNumber',
    field: 'initialZoomFactor',
    optionField: 'customize.initialZoomFactor',
    value: 1.5,
    min: 0.1,
    max: 10,
    step: 0.1,
    tabName: 'custom',
    groupName: '相机'
  },
  {
    label: '相机启用阻尼',
    type: 'switch',
    field: 'enableDamping',
    optionField: 'customize.enableDamping',
    value: true,
    activeValue: true,
    inactiveValue: false,
    tabName: 'custom',
    groupName: '相机'
  },
  {
    label: '初始相机 X',
    type: 'inputNumber',
    field: 'initialCameraPositionX',
    optionField: 'customize.initialCameraPosition.x',
    value: 0,
    step: 0.1,
    tabName: 'custom',
    groupName: '相机'
  },
  {
    label: '初始相机 Y',
    type: 'inputNumber',
    field: 'initialCameraPositionY',
    optionField: 'customize.initialCameraPosition.y',
    value: 3,
    step: 0.1,
    tabName: 'custom',
    groupName: '相机'
  },
  {
    label: '初始相机 Z',
    type: 'inputNumber',
    field: 'initialCameraPositionZ',
    optionField: 'customize.initialCameraPosition.z',
    value: 7,
    step: 0.1,
    tabName: 'custom',
    groupName: '相机'
  },
  {
    label: '正常状态颜色',
    type: 'colorPicker',
    field: 'colorNormal',
    optionField: 'customize.statusColors.normal',
    value: '#00E400',
    tabName: 'custom',
    groupName: '状态颜色'
  },
  {
    label: '警告状态颜色',
    type: 'colorPicker',
    field: 'colorWarning',
    optionField: 'customize.statusColors.warning',
    value: '#FFFF00',
    tabName: 'custom',
    groupName: '状态颜色'
  },
  {
    label: '危险状态颜色',
    type: 'colorPicker',
    field: 'colorDanger',
    optionField: 'customize.statusColors.danger',
    value: '#FF0000',
    tabName: 'custom',
    groupName: '状态颜色'
  }
]

// 配置处理脚本
const optionHandler = ''

// 数据处理脚本 - Keep empty
const dataHandler = ''

// 默认选项配置
const option = {
  data: null,

  customize: {
    modelPath: PM25Monitor,
    modelScale: 1,
    modelPositionY: 0,
    rotationSpeed: 0,
    backgroundColor: '#1a1a1a',
    enableShadows: true,
    ambientLightIntensity: 0.7,
    directionalLightIntensity: 0.6,
    directionalLight2Intensity: 0.4,
    binding: {
      pm25Value: 'value'
    },
    dataPoints: [
      {
        id: 'pm25',
        name: "PM2.5",
        position: { x: 0, y: 2.5, z: 0 },
        dataStructure: [
          {
            bindingKey: "pm25Value",
            unit: "µg/m³",
            defaultValue: 25,
            thresholds: { normal: [0, 50], warning: [51, 100], dangerMin: 101 },
            style: {}
          }
        ],
        description: '实时 PM2.5 浓度值'
      }
    ],
    initialCameraPosition: { x: 0, y: 3, z: 7 },
    initialCameraTarget: { x: 0, y: 1, z: 0 },
    initialZoomFactor: 1.5,
    enableDamping: true,
    statusColors: {
        normal: '#00E400',
        warning: '#FFFF00',
        danger: '#FF0000'
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
  dataHandler
}