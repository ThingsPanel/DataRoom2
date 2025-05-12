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
  type: 'verticalLine',
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
    // 线条颜色
    lineColor: '#188df0',
    // 线条宽度
    lineWidth: 4,
    // 透明度
    opacity: 1,

    // 虚线属性
    enableLineDash: false,
    lineDashValue: 5,
    lineGapValue: 5,

    // 动画属性
    animationActive: false,
    animationType: 'none', // 'none', 'droplet', 'flow'
    animationDirection: 'forward', // 'forward', 'backward'
    animationSpeed: 1,           // 相对速度
    animationLoop: true,         // 循环动画
    dropletColor: '#40a9ff',     // 水滴颜色
    dropletSize: 3,              // 水滴半径
    flowColor: '#40a9ff',        // 流水动画颜色
    flowThickness: 4,          // 流水动画线条粗细
    flowDensity: 10            // 流水动画密度
  }
}
export const dataConfig = {
  ...commonConfig(customConfig)
}
