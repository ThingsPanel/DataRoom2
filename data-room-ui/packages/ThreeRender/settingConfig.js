import { commonConfig, displayOption } from 'data-room-ui/js/config'

export const settingConfig = {
  displayOption: { ...displayOption }
}

const customConfig = {
  type: 'threeComponent',
  root: {
    contribution: false,
    version: '2023071001',
    // 绕x轴旋转角度
    rotateX: 0,
    // 绕y轴旋转角度
    rotateY: 0,
    // 绕z轴旋转角度
    rotateZ: 0,
    // 透视距离
    perspective: 0,
    skewX: 0,
    skewY: 0
  },
  customize: {
    theme: 'dark', // 'light'、'dark'
    backgroundColor: '#000000',
    // 相机设置
    fov: 75,
    near: 0.1,
    far: 1000,
    cameraPositionX: 0,
    cameraPositionY: 0,
    cameraPositionZ: 5,
    // 环境光设置
    ambientLightColor: '#ffffff',
    ambientLightIntensity: 0.5,
    // 平行光设置
    directionalLightColor: '#ffffff',
    directionalLightIntensity: 0.8,
    directionalLightPositionX: 1,
    directionalLightPositionY: 1,
    directionalLightPositionZ: 1
  }
}

export const dataConfig = {
  ...commonConfig(customConfig)
}
