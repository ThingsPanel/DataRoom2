// 配置版本号
const version = '2023091901'
// 标题
const title = '3D基础球体'
// 用于标识，唯一，和文件夹名称一致
const name = '3D基础球体'

// 右侧配置项
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
  // 相机设置
  {
    label: '视场角',
    type: 'inputNumber', // 设置组件类型
    field: 'customize_fov', // 字段
    optionField: 'customize.fov', // 对应options中的字段
    value: 75,
    min: 1,
    max: 180,
    tabName: 'custom',
    groupName: 'camera'
  },
  {
    label: '近裁剪面',
    type: 'inputNumber', // 设置组件类型
    field: 'customize_near', // 字段
    optionField: 'customize.near', // 对应options中的字段
    value: 0.1,
    min: 0.1,
    max: 100,
    tabName: 'custom',
    groupName: 'camera'
  },
  {
    label: '远裁剪面',
    type: 'inputNumber', // 设置组件类型
    field: 'customize_far', // 字段
    optionField: 'customize.far', // 对应options中的字段
    value: 1000,
    min: 100,
    max: 10000,
    tabName: 'custom',
    groupName: 'camera'
  },
  {
    label: '相机X位置',
    type: 'inputNumber', // 设置组件类型
    field: 'customize_cameraPositionX', // 字段
    optionField: 'customize.cameraPositionX', // 对应options中的字段
    value: 0,
    tabName: 'custom',
    groupName: 'camera'
  },
  {
    label: '相机Y位置',
    type: 'inputNumber', // 设置组件类型
    field: 'customize_cameraPositionY', // 字段
    optionField: 'customize.cameraPositionY', // 对应options中的字段
    value: 0,
    tabName: 'custom',
    groupName: 'camera'
  },
  {
    label: '相机Z位置',
    type: 'inputNumber', // 设置组件类型
    field: 'customize_cameraPositionZ', // 字段
    optionField: 'customize.cameraPositionZ', // 对应options中的字段
    value: 5,
    tabName: 'custom',
    groupName: 'camera'
  },
  // 背景设置
  {
    label: '背景颜色',
    type: 'colorPicker', // 设置组件类型
    field: 'customize_backgroundColor', // 字段
    optionField: 'customize.backgroundColor', // 对应options中的字段
    value: '#000000',
    tabName: 'custom',
    groupName: 'background'
  },
  // 环境光设置
  {
    label: '环境光颜色',
    type: 'colorPicker', // 设置组件类型
    field: 'customize_ambientLightColor', // 字段
    optionField: 'customize.ambientLightColor', // 对应options中的字段
    value: '#ffffff',
    tabName: 'custom',
    groupName: 'light'
  },
  {
    label: '环境光强度',
    type: 'inputNumber', // 设置组件类型
    field: 'customize_ambientLightIntensity', // 字段
    optionField: 'customize.ambientLightIntensity', // 对应options中的字段
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'light'
  },
  // 平行光设置
  {
    label: '平行光颜色',
    type: 'colorPicker', // 设置组件类型
    field: 'customize_directionalLightColor', // 字段
    optionField: 'customize.directionalLightColor', // 对应options中的字段
    value: '#ffffff',
    tabName: 'custom',
    groupName: 'light'
  },
  {
    label: '平行光强度',
    type: 'inputNumber', // 设置组件类型
    field: 'customize_directionalLightIntensity', // 字段
    optionField: 'customize.directionalLightIntensity', // 对应options中的字段
    value: 0.8,
    min: 0,
    max: 1,
    step: 0.1,
    tabName: 'custom',
    groupName: 'light'
  },
  {
    label: '平行光X位置',
    type: 'inputNumber', // 设置组件类型
    field: 'customize_directionalLightPositionX', // 字段
    optionField: 'customize.directionalLightPositionX', // 对应options中的字段
    value: 1,
    tabName: 'custom',
    groupName: 'light'
  },
  {
    label: '平行光Y位置',
    type: 'inputNumber', // 设置组件类型
    field: 'customize_directionalLightPositionY', // 字段
    optionField: 'customize.directionalLightPositionY', // 对应options中的字段
    value: 1,
    tabName: 'custom',
    groupName: 'light'
  },
  {
    label: '平行光Z位置',
    type: 'inputNumber', // 设置组件类型
    field: 'customize_directionalLightPositionZ', // 字段
    optionField: 'customize.directionalLightPositionZ', // 对应options中的字段
    value: 1,
    tabName: 'custom',
    groupName: 'light'
  }
]

// 配置处理脚本
const optionHandler = `
option = {
  threeData: []
}
`

// 数据处理脚本
const dataHandler = `
// 此方法用于将后台数据转换为前端所需数据
const xField = setting.find(item => item.optionField === 'xField')?.value
const yField = setting.find(item => item.optionField === 'yField')?.value

// 确保有数据和字段配置
if (data && xField && yField) {
  const threeData = []
  
  // 遍历数据，转换为球体的配置
  data.forEach((item, index) => {
    const value = parseFloat(item[yField])
    if (!isNaN(value)) {
      // 根据值创建球体
      threeData.push({
        id: index,
        label: item[xField],
        x: index * 2.5 - (data.length - 1) * 1.25, // 水平排列
        y: 0,
        z: 0,
        radius: value * 0.5, // 使用数值作为半径
        color: '#ff0000', // 默认颜色
        data: item // 存储原始数据，用于事件交互
      })
    }
  })
  
  option.threeData = threeData
}
`

// 默认选项
const option = {
  threeData: []
}

export default {
  version,
  title,
  name,
  option,
  setting,
  optionHandler,
  dataHandler
}
