import { commonConfig, displayOption } from 'data-room-ui/js/config';

// displayOption is usually not needed for a simple display component
// export const settingConfig = { ... };

// Define and export settingConfig containing displayOption
export const settingConfig = {
  // 设置面板属性的显隐
  displayOption: {
    ...displayOption, // Inherit base settings
    dataSource: {
      enable: true // Enable data source selection
    },
    dataSourceType: {
      enable: true // Enable data source type selection
    },
    title: {
      enable: true,
    },
    // Enable metricField to select the field containing the icon code
    metricField: {
      label: '图标代码字段', // Customize label
      enable: true,
      multiple: false // Usually a single field provides the code
    },
    // Keep others disabled if not needed
    dimensionField: { enable: false },
    params: { enable: false },
    headerField: { enable: false }
  }
};

const customConfig = {
  type: 'weatherIcon', // Changed type
  root: {
    version: '2023102703', // New version
    // Remove text-specific root configs like url, expression
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    perspective: 0,
    skewX: 0,
    skewY: 0
  },
  customize: {
    // Remove text-specific customize configs
    // title: '文本标签占位符',
    // fontSize: 20, 
    // fontWeight: 700,
    // fontFamily: '',
    // color: 'left,#ffffff,#ffffff',
    // align: 'center',
    // letterSpacing: 1

    // Add icon specific configs
    iconCode: '100', // Default QWeather code (e.g., '100' for sunny)
    iconSize: 48,    // Default icon size in pixels
    iconColor: '#673ab7', // Default icon color (purple)
    backgroundColor: 'transparent' // Default background color
  }
};

// Simplify dataConfig
export const dataConfig = {
  ...commonConfig(customConfig)
  // Remove displayOption from here
}; 