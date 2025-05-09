import { commonConfig, displayOption } from 'data-room-ui/js/config'

export const settingConfig = {
  legend: false,
  isGroup: true,
  data: [],
  label: {
    position: 'top',
    content: ''
  },
  seriesField: '',
  displayOption: {
    ...displayOption,
    dataAllocation: { enable: false },
    dataSourceType: { enable: false },
    params: { enable: false },
    metricField: {
      label: '指标',
      enable: false,
      multiple: false
    },
    dimensionField: {
      label: '维度',
      enable: false,
      multiple: false
    }
  }
}

const customConfig = {
  type: 'fabricLine',
  title: '点击连线',
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
    // 线条基础配置
    lineWidth: 2,
    lineColor: '#409EFF',
    lineOpacity: 1,
    
    // 线条类型配置
    lineType: 'solid', // solid, dashed, dotted, dash-dot
    dashArray: [3, 3], // 虚线配置 [线段长度, 间隙长度]
    
    // 线条样式配置
    lineCap: 'round', // butt, round, square
    lineJoin: 'round', // miter, round, bevel
    
    // 阴影配置
    shadowEnabled: false,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowBlur: 5,
    shadowOffsetX: 0,
    shadowOffsetY: 2,
    
    // 动画配置
    animationEnabled: false,
    animationSpeed: 20, // 速度，数值越小越快
    animationDirection: 'forward', // forward, backward
    animationType: 'flow', // flow, flash, pulse, gradient, neon, scan, arrow
    animationColor: '#ff6700', // 动画特效颜色
    animationIntensity: 5, // 动画强度 1-10
    
    // 箭头配置
    arrowEnabled: false,
    arrowDirection: 'end', // start, end, both
    arrowSize: 10,
    
    // 点的配置
    pointRadius: 5,
    pointColor: '#FF4500',
    
    // 默认始终为添加点模式，按Ctrl或Alt键临时切换为编辑模式
    addingMode: true,
    
    // 保存的点数据
    points: []
  }
}

export const dataConfig = {
  ...commonConfig(customConfig)
} 