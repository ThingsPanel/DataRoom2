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
