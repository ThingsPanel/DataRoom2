import { commonConfig, displayOption } from 'data-room-ui/js/config'

// SettingConfig defines the overall structure for the settings panel tabs and sections
export const settingConfig = {

  legend: false,
  isGroup: false,
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
  }
}

// CustomConfig holds the default values for the component's specific properties
const customConfig = {
  type: 'svgIcon', // Matches the component type used in getComponentConfig.js
  title: 'SVG图标',    // Default name/title for the component instance in the layers panel
  root: { // Standard root object for positioning, rotation etc.
    version: '2023120101',
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    perspective: 0,
    skewX: 0,
    skewY: 0
  },
  // Customize object holds the specific, unique properties of the SvgIcon
  customize: {
    iconClass: 'check',     // Default icon ID (e.g., filename without extension, like 'check' for 'check.svg')
    color: '#333333',       // Default icon color
    // 线条样式
    strokeWidth: 1,         // 线条宽度
    strokeDasharray: '',    // 虚线样式，如"5,5"表示5像素实线，5像素空白
    // 文字设置
    showText: false,        // 是否显示文字
    text: '',               // 文字内容
    textStyle: {
      color: '#333333',     // 文字颜色
      fontSize: '12px',     // 文字大小
      fontWeight: 'normal', // 文字粗细
      position: 'bottom',   // 文字位置: 'top', 'bottom', 'left', 'right'
      offset: 5             // 文字与图标的间距
    }
  }
}

// dataConfig is the final configuration object used when the component is added to the canvas.
// It merges commonConfig (which might add global defaults like w, h, x, y, etc.) with our specific customConfig.
export const dataConfig = {
  ...commonConfig(customConfig)
}
