import { commonConfig, displayOption } from 'data-room-ui/js/config'

export const settingConfig = {
  title: '表格弹窗组件',
  data: [
    { name: '张三', age: 28, city: '北京', department: '技术部', salary: 15000 },
    { name: '李四', age: 32, city: '上海', department: '产品部', salary: 18000 },
    { name: '王五', age: 25, city: '深圳', department: '设计部', salary: 12000 },
    { name: '赵六', age: 30, city: '广州', department: '运营部', salary: 14000 },
    { name: '钱七', age: 27, city: '杭州', department: '市场部', salary: 13000 },
    { name: '孙八', age: 35, city: '成都', department: '技术部', salary: 20000 },
    { name: '周九', age: 29, city: '武汉', department: '产品部', salary: 16000 },
    { name: '吴十', age: 26, city: '西安', department: '设计部', salary: 11000 }
  ],
  displayOption: {
    ...displayOption,
    metricField: {
      // 指标
      label: '指标',
      enable: false,
      multiple: false // 是否多选
    },
    dimensionField: {
      // 表格列
      label: '表格列', // 维度/查询字段
      enable: true,
      multiple: true // 是否多选
    },
    params: { enable: false }
  },
  
  // 轮播设置
  isCarousel: false, // 是否启用轮播
  autoPlay: true, // 自动播放
  carouselInterval: 3000, // 轮播间隔（毫秒）
  carouselPageSize: 5, // 每页显示行数
  animationType: 'slide', // 动画类型：slide, fade, zoom, flip
  animationDuration: 300, // 动画持续时间（毫秒）
  
  // 弹窗设置
  enableModal: false, // 启用弹窗
  dialogTitle: '详细信息', // 弹窗标题
  dialogWidth: 50, // 弹窗宽度（百分比）
  
  // 表格设置
  rowHeight: 45, // 行高
  tableSize: 'medium', // 表格尺寸：small, medium, large
  stripe: true, // 斑马纹
  
  // 边框设置
  showBorder: true, // 显示边框
  borderMode: 'inner', // 边框模式：outer, inner, full
  borderWidth: 1, // 边框宽度
  borderColor: '#434343', // 边框颜色
  borderStyle: 'solid', // 边框样式：solid, dashed, dotted, double
  
  // 表头样式
  headerBgColor: '#2D2D2D', // 表头背景色
  headerTextColor: '#E0E0E0', // 表头文字颜色
  headerFontSize: 14, // 表头字体大小
  headerFontWeight: 600, // 表头字体粗细
  headerHeight: 45, // 表头高度
  
  // 单元格样式
  cellBgColor: '#1A1A1A', // 单元格背景色
  cellTextColor: '#C0C4CC', // 单元格文字颜色
  cellFontSize: 13, // 单元格字体大小
  
  // 斑马纹颜色
  oddRowBgColor: '#1F1F1F', // 奇数行背景色
  evenRowBgColor: '#1A1A1A', // 偶数行背景色
  
  // 列配置
  columns: [
    { prop: 'name', label: '姓名', width: 120, align: 'center' },
    { prop: 'age', label: '年龄', width: 80, align: 'center' },
    { prop: 'city', label: '城市', width: 100, align: 'center' },
    { prop: 'department', label: '部门', width: 120, align: 'center' },
    { prop: 'salary', label: '薪资', width: 100, align: 'right' }
  ], // 列配置
  columnSettings: [
    { key: 'name', width: 120, align: 'center' },
    { key: 'age', width: 80, align: 'center' },
    { key: 'city', width: 100, align: 'center' },
    { key: 'department', width: 120, align: 'center' },
    { key: 'salary', width: 100, align: 'right' }
  ] // 列设置
}

const customConfig = {
  type: 'modalComponent',
  title: '表格弹窗组件',
  root: {
    version: '2023071001',
    contribution: false,
    loading: false,
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
    // 表格基础配置
    rowHeight: 45,            // 表格行高
    tableSize: 'small',       // 表格尺寸: medium, small, mini
    stripe: true,             // 是否显示斑马纹
    
    // 轮播模式配置
    isCarousel: false,        // 是否轮播模式
    autoPlay: true,           // 是否自动播放轮播
    carouselInterval: 3000,   // 轮播间隔时间(ms)
    carouselPageSize: 5,      // 轮播每页显示行数
    animationType: 'slide',   // 轮播动画类型: slide, fade, zoom, flip
    animationDuration: 300,   // 动画持续时间(ms)
    
    // 弹窗配置
    enableModal: true,        // 是否启用弹窗
    dialogTitle: '数据详情',
    dialogWidth: 70,          // 适配大屏显示
    
    // 边框配置
    showBorder: true,         // 是否显示边框
    borderMode: 'inner',      // 边框模式: outer(外边框), inner(内边框), full(完整边框)
    borderWidth: 1,           // 边框宽度
    borderColor: '#434343',   // 适配黑色主题的边框颜色
    borderStyle: 'solid',     // 边框样式: solid, dashed, dotted, double
    
    // 表头样式 - 适配黑色主题
    headerBgColor: '#2C2C2C', // 深色表头背景
    headerTextColor: '#E4E7ED',
    headerFontSize: 14,
    headerFontWeight: 'bold',
    
    // 单元格样式 - 适配黑色主题
    cellBgColor: '#1E1E1E',   // 深色单元格背景
    cellTextColor: '#C0C4CC',
    cellFontSize: 13,
    
    // 奇偶行背景色 - 适配黑色主题
    oddRowBgColor: 'rgba(255, 255, 255, 0.02)',   // 微弱的亮色
    evenRowBgColor: 'rgba(255, 255, 255, 0.05)',  // 稍微亮一点
    
    // 列配置
    columns: [],              // 表格列配置数组
    columnSettings: []        // 列设置配置数组 { key: string, name: string, width: number, align: string }
  }
}

export const dataConfig = {
  ...commonConfig(customConfig)
}