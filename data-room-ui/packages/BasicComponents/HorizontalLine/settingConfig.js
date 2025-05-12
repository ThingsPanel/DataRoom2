import { commonConfig } from '../../js/config'

export const settingConfig = {
  // 设置面板属性的显隐
  displayOption: {
    dataAllocation: {
      // 是否存在数据配置
      enable: false
    }
  }
}
const customConfig = {
  type: 'horizontalLine',
  root: {
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
    // 边框线颜色
    // borderColor: 'rgba(131, 191, 246, 0)', // Will be handled by lineColor or not at all for a simple line
    // 边框线宽度
    // borderWidth: 1,
    // 边框背景颜色
    // backgroundColor: '#007aff',
    // colorType: 'single',

    lineColor: '#188df0', // Replaces gradientColor0 and gradientColor1 for a solid line
    lineWidth: 4,       // Replaces 'height' for line thickness
    opacity: 1,         // Standard opacity 0-1

    // 渐变色0值 - Removed
    // gradientColor0: '#83bff6',
    // 渐变色1值 - Removed
    // gradientColor1: '#188df0',
    // 渐变色色值改变方向 - Removed, not applicable for solid color line directly
    // gradientDirection: 'to right',
    
    // 透明度 - opacity is already above, this one was 100 based, changing to 0-1
    // opacity: 100, 
    // 长度 - this was line thickness, replaced by lineWidth
    // height: 4

    // Dash properties
    enableLineDash: false,
    lineDashValue: 5,
    lineGapValue: 5,

    // Animation properties (adapted from FabricLine)
    animationActive: false,
    animationType: 'none', // 'none', 'droplet', 'flow'
    animationDirection: 'forward', // 'forward', 'backward'
    animationSpeed: 1,           // Relative speed
    animationLoop: true,         // Loop animation
    dropletColor: '#40a9ff',     // Droplet color
    dropletSize: 3,              // Droplet radius
    flowColor: '#40a9ff',        // Flow animation color (can be same as lineColor)
    flowThickness: 4,          // Flow animation thickness (defaults to lineWidth)
    flowDensity: 10            // Flow animation dash density
  }
}
export const dataConfig = {
  ...commonConfig(customConfig)
}
