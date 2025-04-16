import PM25Monitor from './glbs/PM25_Monitor.glb'

// 配置版本号
const version = '2023091901'
// 标题
const title = 'PM2.5监测器'
// 用于标识，唯一，和文件夹名称一致
const name = 'PM25监测器'
// 添加组件类型标识
const chartType = 'threeJs'

// 右侧配置项
const setting = [
  {
    label: 'PM2.5值',
    // 设置组件类型
    type: 'select',
    // 字段
    field: 'pm25Value',
    // 对应options中的字段
    optionField: 'customize.pm25Value',
    // 是否多选
    multiple: false,
    value: '',
    tabName: 'data'
  },
  {
    label: '旋转速度',
    type: 'slider', // 使用滑块组件
    field: 'rotationSpeed',
    optionField: 'customize.rotationSpeed',
    value: 0,
    min: 0,
    max: 0.05,
    step: 0.001,
    tabName: 'custom',
    groupName: '基础'
  }
  // {
  //   label: '背景颜色',
  //   type: 'colorPicker', // 设置组件类型
  //   field: 'backgroundColor', // 字段
  //   optionField: 'customize.backgroundColor', // 对应options中的字段
  //   value: '#111111',
  //   tabName: 'custom',
  //   groupName: '基础'
  // },
  // {
  //   label: '相机位置X',
  //   type: 'inputNumber', // 设置组件类型
  //   field: 'cameraPosition.x', // 字段
  //   optionField: 'customize.cameraPosition.x', // 对应options中的字段
  //   value: 0,
  //   tabName: 'custom',
  //   groupName: '相机'
  // },
  // {
  //   label: '相机位置Y',
  //   type: 'inputNumber', // 设置组件类型
  //   field: 'cameraPosition.y', // 字段
  //   optionField: 'customize.cameraPosition.y', // 对应options中的字段
  //   value: 3,
  //   tabName: 'custom',
  //   groupName: '相机'
  // },
  // {
  //   label: '相机位置Z',
  //   type: 'inputNumber', // 设置组件类型
  //   field: 'cameraPosition.z', // 字段
  //   optionField: 'customize.cameraPosition.z', // 对应options中的字段
  //   value: 7,
  //   tabName: 'custom',
  //   groupName: '相机'
  // },
  // {
  //   label: '模型缩放',
  //   type: 'inputNumber', // 设置组件类型
  //   field: 'modelScale', // 字段
  //   optionField: 'customize.modelScale', // 对应options中的字段
  //   value: 1,
  //   min: 0.1,
  //   max: 10,
  //   step: 0.1,
  //   tabName: 'custom',
  //   groupName: '模型'
  // },
  // {
  //   label: '模型Y位置',
  //   type: 'inputNumber', // 设置组件类型
  //   field: 'modelPositionY', // 字段
  //   optionField: 'customize.modelPositionY', // 对应options中的字段
  //   value: 0,
  //   step: 0.1,
  //   tabName: 'custom',
  //   groupName: '模型'
  // },
  // {
  //   label: 'PM2.5数据字段',
  //   type: 'input', // 设置组件类型
  //   field: 'pm25Field', // 字段
  //   optionField: 'customize.pm25Field', // 对应options中的字段
  //   value: 'pm25',
  //   tabName: 'data'
  // },
  // {
  //   label: '模型路径',
  //   type: 'input',
  //   field: 'modelPath',
  //   optionField: 'customize.modelPath',
  //   value: option.modelPath,
  //   tabName: 'custom',
  //   groupName: '模型'
  // }
]

// 配置处理脚本
const optionHandler =''

// 数据处理脚本
const dataHandler = `
  console.log('PM25监测器 dataHandler 接收到数据:', data);
  console.log('PM25监测器 dataHandler 接收到数据:', option.customize);
  // 确保customize对象存在
  if (!option.customize) {
    option.customize = {};
  }
  
  // 从数据中获取PM2.5值
  if (data && Array.isArray(data) && data.length > 0) {
    console.log('PM25监测器 处理数据数组:', data);
    
    // 如果数据项直接有 value 属性，直接使用
    if (data[0].value !== undefined) {
      console.log('PM25监测器 直接找到值:', data[0].value);
      option.customize.pm25Value = Number(data[0].value);
      return;
    }
    
    // 如果用户选择了字段，使用该字段的值
    const pm25Setting = setting.find(item => item.field === 'pm25Value');
    if (pm25Setting && pm25Setting.value) {
      const fieldName = pm25Setting.value;
      console.log('PM25监测器 查找字段:', fieldName);
      
      const dataItem = data.find(item => item.key === fieldName || item.name === fieldName);
      if (dataItem && dataItem.value !== undefined) {
        console.log('PM25监测器 按字段名找到值:', dataItem.value);
        option.customize.pm25Value = Number(dataItem.value);
      } else {
        console.warn('PM25监测器 未找到指定字段的值');
      }
    } else {
      // 如果没有选择字段，尝试使用默认字段名
      const dataItem = data.find(item => item.key === 'pm25' || item.name === 'pm25');
      if (dataItem && dataItem.value !== undefined) {
        console.log('PM25监测器 按默认字段名找到值:', dataItem.value);
        option.customize.pm25Value = Number(dataItem.value);
      } else {
        // 如果找不到数据，使用默认值
        console.warn('PM25监测器 未找到默认字段的值，使用默认值');
        option.customize.pm25Value = option.customize.defaultPM25Value || 99;
      }
    }
  } else {
    console.warn('PM25监测器 数据格式不正确:', data);
  }
`

// 使用 require 动态导入
const option = {
  backgroundColor: '#111111',
  cameraPosition: {
    x: 0,
    y: 3,
    z: 7
  },
  customize: {
    rotationSpeed: 0, // 设置为0表示不旋转
    modelScale: 1,
    modelPositionY: 0,
    pm25Value: 99, // 初始默认值
    modelPath: PM25Monitor
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