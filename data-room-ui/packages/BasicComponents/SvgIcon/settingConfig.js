import { commonConfig, displayOption } from 'data-room-ui/js/config'

// SettingConfig defines the overall structure for the settings panel tabs and sections
export const settingConfig = {
  // Tabs and sections relevant to a simple SvgIcon
  // Most data-related tabs/sections are disabled as they don't apply
  legend: false,
  isGroup: false, // Not typically a groupable item unless specifically designed for it
  data: [], // No direct data binding for the icon itself
  label: false, // No data labels
  seriesField: '', // No series field

  displayOption: {
    ...displayOption, // Spread common display options
    // Override/disable options not relevant to SvgIcon
    dataSource: { enable: false },
    dataAllocation: { enable: false },
    dataSourceType: { enable: false },
    params: { enable: false },
    metricField: { enable: false },
    dimensionField: { enable: false },
    // Keep basic styling options if they are globally handled and applicable
    // For SvgIcon, specific styling like color and size is in customize
    basicStyle: { enable: true }, // Assuming this might control general component visibility, opacity etc.
    componentBorder: { enable: true } // Assuming this allows standard border settings from the design system
  }
  // Other common sections like 'interaction', 'advanced' might be here
  // depending on the design system's commonConfig structure.
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
    size: '32px',          // Default icon size (e.g., "32px", "2em")
    // className: ''       // Optional: if you want to allow users to add custom CSS classes to the SvgIcon wrapper
  }
}

// dataConfig is the final configuration object used when the component is added to the canvas.
// It merges commonConfig (which might add global defaults like w, h, x, y, etc.) with our specific customConfig.
export const dataConfig = {
  ...commonConfig(customConfig)
}
