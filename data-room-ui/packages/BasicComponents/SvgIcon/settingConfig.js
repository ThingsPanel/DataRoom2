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
    color: '#333333',       // Default icon color         // Default icon size (e.g., "32px", "2em")
    // className: ''       // Optional: if you want to allow users to add custom CSS classes to the SvgIcon wrapper
  }
}

// dataConfig is the final configuration object used when the component is added to the canvas.
// It merges commonConfig (which might add global defaults like w, h, x, y, etc.) with our specific customConfig.
export const dataConfig = {
  ...commonConfig(customConfig)
}
