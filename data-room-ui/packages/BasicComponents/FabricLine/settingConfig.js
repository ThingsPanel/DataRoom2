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

// 绘制模式 (将被删除)
// export const DrawModes = [
//   { value: 'none', label: '不绘制' },
//   { value: 'manual', label: '手动控制' },
//   { value: 'key_ctrl', label: 'Ctrl键控制' },
//   { value: 'always', label: '始终绘制' }
// ]

// Re-adding: Line Cap Options (will be removed)
// export const LineCapOptions = [
//   { value: 'butt', label: 'butt (默认, 方形末端)' },
//   { value: 'round', label: 'round (圆形末端)' },
//   { value: 'square', label: 'square (方形末端, 带延伸)' }
// ];

// Re-adding: Line Join Options (will be removed)
// export const LineJoinOptions = [
//   { value: 'miter', label: 'miter (默认, 尖角)' },
//   { value: 'round', label: 'round (圆角)' },
//   { value: 'bevel', label: 'bevel (斜角)' }
// ];

// 新增：线条形状类型选项
export const LineShapeTypeOptions = [
  { value: 'straight', label: '直线' },
  { value: 'cubicBezier', label: '三次贝塞尔曲线' },
  { value: 'stepBefore', label: '阶梯线 (先水平)' },
  { value: 'stepAfter', label: '阶梯线 (先垂直)' },
  { value: 'stepMiddle', label: '阶梯线 (中点)' }
];

// 新增：动画类型选项
export const AnimationTypeOptions = [
  { value: 'none', label: '无动画' },
  { value: 'droplet', label: '水珠动画' },
  { value: 'flow', label: '流水动画' }
];

// 新增：动画方向选项
export const AnimationDirectionOptions = [
  { value: 'forward', label: '正向' },
  { value: 'backward', label: '反向' }
];

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
    // 新增：设置默认宽度
    w: 400,
    // 新增：设置默认高度
    h: 300,
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
    // 线条颜色
    lineColor: '#1890ff',
    // 线条宽度
    lineWidth: 2,
    // 点颜色
    pointColor: '#f5222d',
    // 点大小
    pointRadius: 5,
    // 点数据存储
    points: [ // 新增：添加两个初始点
      { x: 50, y: 50 },
      { x: 350, y: 250 }
    ],
    // 新增：是否启用虚线
    enableLineDash: false,
    // 新增：虚线段长度 (已有默认值 5)
    lineDashValue: 5,
    // 新增：虚线间隔长度 (已有默认值 5)
    lineGapValue: 5,
    // 新增：线条形状类型
    lineShapeType: 'straight', // 默认为直线
    // --- 动画相关配置 ---
    animationActive: false,      // 动画总开关
    animationType: 'none',       // 动画类型: none, droplet, flow
    animationDirection: 'forward', // 动画方向: forward, backward
    animationSpeed: 1,           // 动画速度 (相对值，例如 1, 2, 0.5)
    animationLoop: true,         // 是否循环
    dropletColor: '#40a9ff',     // 水珠颜色
    dropletSize: 3,              // 水珠大小 (半径)
    flowColor: '#40a9ff',        // 流水动画颜色 (如果需要区别于线条颜色)
    flowThickness: 2,          // 流水动画线条的粗细
    flowDensity: 10            // 流水密度 (例如虚线的长度)
    // Re-adding: Line Cap Style (will be removed)
    // lineCap: 'butt', 
    // Re-adding: Line Join Style (will be removed)
    // lineJoin: 'miter', 
    // New: Stroke Miter Limit (will be removed)
    // strokeMiterlimit: 4 
  }
}

export const dataConfig = {
  ...commonConfig(customConfig)
}
