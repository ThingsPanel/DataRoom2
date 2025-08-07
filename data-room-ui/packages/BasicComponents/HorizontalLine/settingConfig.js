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

// 箭头样式选项
export const ArrowStyleOptions = [
  { label: '无', value: 'none' },
  { label: '标准箭头', value: 'arrow' },
  { label: '三角形', value: 'triangle' },
  { label: '圆形', value: 'circle' },
  { label: '方形', value: 'square' },
  { label: '菱形', value: 'diamond' }
]

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

    // 箭头样式设置 - 新增
    startArrowStyle: 'none', // 起点箭头样式：none, arrow, triangle, circle, square, diamond
    startArrowSize: 6,       // 起点箭头大小
    startArrowColor: '',     // 起点箭头颜色，为空时继承线条颜色
    
    endArrowStyle: 'none',   // 终点箭头样式：none, arrow, triangle, circle, square, diamond
    endArrowSize: 6,         // 终点箭头大小
    endArrowColor: '',       // 终点箭头颜色，为空时继承线条颜色
    
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
    flowDensity: 10            // Flow animation density
  }
}
export const dataConfig = {
  ...commonConfig(customConfig)
}
