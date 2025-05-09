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
  type: 'canvasLine',
  title: '连接线',
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
    // 线条起点坐标
    startX: 0,
    startY: 0,
    // 线条终点坐标
    endX: 100,
    endY: 100,
    // 线条样式
    lineWidth: 2,
    lineColor: '#409EFF',
    lineStyle: 'solid', // solid, dashed, dotted
    // 箭头类型
    arrowType: 'end', // none, start, end, both
    // 是否自动调整大小
    autoSize: true
  }
}

export const dataConfig = {
  ...commonConfig(customConfig)
}
