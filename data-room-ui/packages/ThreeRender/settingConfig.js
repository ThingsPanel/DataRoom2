import { commonConfig, displayOption } from 'data-room-ui/js/config'

export const settingConfig = {
  displayOption: {
    ...displayOption,
    dataAllocation: {
      enable: true
    },
    dataSourceType: {
      enable: true,
      default: 'static'
    },
    dimensionField: {
      enable: false
    },
    metricField: {
      enable: false
    }
  },
  customize: {
    backgroundColor: '#111111',
    cameraPosition: {
      x: 0,
      y: 3,
      z: 7
    },
    rotationSpeed: 0.005,
    modelScale: 1,
    modelPositionY: 0,
    pm25Value: 99
  }
}

const customConfig = {
  root: {
    contribution: false
  },
  customize: {
    theme: 'dark'
  }
}

export const dataConfig = {
  ...commonConfig(customConfig)
}
