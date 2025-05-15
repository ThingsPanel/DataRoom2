import { commonConfig, displayOption } from 'data-room-ui/js/config'

// SettingConfig defines the overall structure for the settings panel tabs and sections
export const settingConfig = {
  // No theme-specific or direct value settings at this top level for SvgIcon,
  // as core values are in customConfig.customize.
  // General panel structure:
  legend: false,
  isGroup: false, // Not typically a groupable item unless specifically designed for it
  data: [], // SvgIcon does not use datasets directly
  label: false, // No data labels
  seriesField: '', // No series field

  // Controls which standard sections/fields are visible in the settings panel
  displayOption: {
    ...displayOption, // Spread common/default display options

    // Disable data-related fields as they are not applicable to SvgIcon
    dataSource: { enable: false },
    dataAllocation: { enable: false },
    dataSourceType: { enable: false },
    params: { enable: false },
    metricField: { enable: false },
    dimensionField: { enable: false },
    // text: { enable: false }, // SvgIcon doesn't have a primary 'text' content like Texts component
    // expression: { enable: false }, // SvgIcon doesn't use expressions in this context

    // Enable basic styling sections if they are globally handled and make sense for SvgIcon
    // (e.g., opacity, visibility, position - which are often part of commonConfig or root)
    basicStyle: { enable: true }, // Example: if this controls general visibility, tooltip, etc.
    componentBorder: { enable: true } // Example: if a standard border can be applied from the panel
  }
  // Other top-level config sections like 'interaction', 'advanced' could be here
  // if defined by the common structure and applicable.
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
