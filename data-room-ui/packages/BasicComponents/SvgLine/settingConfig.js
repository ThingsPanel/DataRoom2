import { commonConfig } from '../../js/config'

export const settingConfig = {
  displayOption: {
    dataAllocation: {
      enable: false
    }
  }
}

const customConfig = {
  type: 'svgLine',
  root: {
    version: '2023071001',
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    perspective: 0,
    skewX: 0,
    skewY: 0
  },
  customize: {
    lineColor: '#1890ff',
    lineWidth: 2,
    opacity: 1,
    dashed: false,
    dashLength: 5,
    lineType: 'straight', // straight, curved, step, smooth, bezier
    points: [], // 存储相对位置的点
    autoSize: true, // 自动调整组件大小
    // 添加动画相关配置
    animation: {
      enable: false,
      type: 'flow', // flow(水流), particle(粒子)
      speed: 5,
      direction: 'forward', // forward(正向), reverse(反向), alternate(交替)
      flowColor: 'rgba(24, 144, 255, 0.6)',
      flowLength: 30,
      particleSize: 3,
      particleColor: '#fff'
    }
  }
}

export const dataConfig = {
  ...commonConfig(customConfig)
} 