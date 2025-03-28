// 配置版本号
const version = '2023091901'
// 标题
const title = 'PM2.5监测器'
// 用于标识，唯一，和文件夹名称一致
const name = 'PM25监测器'
const option = {
  backgroundColor: '#111111',
  cameraPosition: {
    x: 0,
    y: 3,
    z: 7
  },
  rotationSpeed: 0.005,
  modelScale: 1,
  modelPositionY: 0,
  pm25Field: 'pm25',
  defaultPM25Value: 99,
  pm25Value: 99,
  modelPath: './glbs/PM25_Monitor.glb'
}
// 右侧配置项
const setting = [
  {
    label: '背景颜色',
    type: 'colorPicker', // 设置组件类型
    field: 'backgroundColor', // 字段
    optionField: 'customize.backgroundColor', // 对应options中的字段
    value: '#111111',
    tabName: 'custom',
    groupName: '基础'
  },
  {
    label: '相机位置X',
    type: 'inputNumber', // 设置组件类型
    field: 'cameraPosition.x', // 字段
    optionField: 'customize.cameraPosition.x', // 对应options中的字段
    value: 0,
    tabName: 'custom',
    groupName: '相机'
  },
  {
    label: '相机位置Y',
    type: 'inputNumber', // 设置组件类型
    field: 'cameraPosition.y', // 字段
    optionField: 'customize.cameraPosition.y', // 对应options中的字段
    value: 3,
    tabName: 'custom',
    groupName: '相机'
  },
  {
    label: '相机位置Z',
    type: 'inputNumber', // 设置组件类型
    field: 'cameraPosition.z', // 字段
    optionField: 'customize.cameraPosition.z', // 对应options中的字段
    value: 7,
    tabName: 'custom',
    groupName: '相机'
  },
  {
    label: '模型旋转速度',
    type: 'inputNumber', // 设置组件类型
    field: 'rotationSpeed', // 字段
    optionField: 'customize.rotationSpeed', // 对应options中的字段
    value: 0.005,
    min: 0,
    max: 0.1,
    step: 0.001,
    tabName: 'custom',
    groupName: '模型'
  },
  {
    label: '模型缩放',
    type: 'inputNumber', // 设置组件类型
    field: 'modelScale', // 字段
    optionField: 'customize.modelScale', // 对应options中的字段
    value: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
    tabName: 'custom',
    groupName: '模型'
  },
  {
    label: '模型Y位置',
    type: 'inputNumber', // 设置组件类型
    field: 'modelPositionY', // 字段
    optionField: 'customize.modelPositionY', // 对应options中的字段
    value: 0,
    step: 0.1,
    tabName: 'custom',
    groupName: '模型'
  },
  {
    label: 'PM2.5数据字段',
    type: 'input', // 设置组件类型
    field: 'pm25Field', // 字段
    optionField: 'customize.pm25Field', // 对应options中的字段
    value: 'pm25',
    tabName: 'data',
    groupName: '数据'
  },
  {
    label: '默认PM2.5值',
    type: 'inputNumber', // 设置组件类型
    field: 'defaultPM25Value', // 字段
    optionField: 'customize.defaultPM25Value', // 对应options中的字段
    value: 99,
    min: 0,
    max: 500,
    step: 1,
    tabName: 'data',
    groupName: '数据'
  },
  {
    label: '模型路径',
    type: 'input',
    field: 'modelPath',
    optionField: 'customize.modelPath',
    value: option.modelPath,
    tabName: 'custom',
    groupName: '模型'
  }
]

// 配置处理脚本
const optionHandler = `
  // 可以在这里对option进行额外的处理
`

// 数据处理脚本
const dataHandler = `
  // 可以在这里对data进行额外的处理
  let pm25Value = 99;
  
  if (data && Array.isArray(data)) {
    const pm25Data = data.find(item => item.key === option.customize.pm25Field || item.name === option.customize.pm25Field);
    if (pm25Data && pm25Data.value !== undefined) {
      pm25Value = pm25Data.value;
    }
  }
  
  option.customize.pm25Value = pm25Value;
`

// 默认选项


export default {
  version,
  title,
  name,
  option,
  setting,
  optionHandler,
  dataHandler
}

