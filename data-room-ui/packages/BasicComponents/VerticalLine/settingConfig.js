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
    
    // 箭头样式设置 - 新增
    startArrowStyle: 'none', // 起点箭头样式：none, arrow, triangle, circle, square, diamond
    startArrowSize: 6,       // 起点箭头大小
    startArrowColor: '',     // 起点箭头颜色，为空时继承线条颜色
    
    endArrowStyle: 'none',   // 终点箭头样式：none, arrow, triangle, circle, square, diamond
    endArrowSize: 6,         // 终点箭头大小
    endArrowColor: '',       // 终点箭头颜色，为空时继承线条颜色

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
