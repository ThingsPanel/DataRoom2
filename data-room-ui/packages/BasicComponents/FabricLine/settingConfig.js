import { commonConfig, displayOption } from 'data-room-ui/js/config'

export const settingConfig = {
  legend: false,
  isGroup: true,
  data: [], // 用于存储路径数据
  label: {
    // 可手动配置 label 数据标签位置
    position: 'top', // 'top', 'bottom', 'middle',
    // 配置样式
    content: ''
  },
  seriesField: '', // 分组
  displayOption: {
    ...displayOption,
    dataAllocation: { enable: false },
    dataSourceType: { enable: false },
    params: { enable: false },
    metricField: {
      // 指标
      label: '指标',
      enable: false,
      multiple: false // 是否多选
    },
    dimensionField: {
      // 表格列
      label: '表格列', // 维度/查询字段
      enable: false,
      multiple: true // 是否多选
    }
  }
}

// 绘制模式
export const DrawModes = [
  { value: 'none', label: '不绘制' },
  { value: 'manual', label: '手动控制' },
  { value: 'key_ctrl', label: 'Ctrl键控制' },
  { value: 'always', label: '始终绘制' }
]

const customConfig = {
  type: 'fabricLine',
  // 名称
  title: '线条绘制',
  // 将数据存储改为option对象内
  option: {
    legend: false,
    isGroup: true,
    data: [], // 用于存储路径数据
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
        label: '表格列',
        enable: false,
        multiple: true
      }
    }
  },
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
  // 自定义属性
  customize: {
    // 绘制模式
    drawMode: 'key_ctrl',
    // 线条颜色
    lineColor: '#1890ff',
    // 线条宽度
    lineWidth: 2,
    // 点颜色
    pointColor: '#f5222d',
    // 点大小
    pointRadius: 5,
    // 容器ID (自动生成)
    containerId: 'drawing-editor',
    // 点数据存储
    points: []
  }
}

export const dataConfig = {
  ...commonConfig(customConfig)
}
