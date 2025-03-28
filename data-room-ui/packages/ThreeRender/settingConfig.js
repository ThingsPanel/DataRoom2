import { commonConfig, displayOption } from 'data-room-ui/js/config'

export const settingConfig = {
  displayOption: {
    ...displayOption
  }}

const customConfig = {
  root: {
    contribution: false
  },
  customize: {
    theme: 'dark', // 'light'、'dark'
    modelPath: './glbs/PM25_Monitor.glb',
    backgroundColor: '#111111',
    cameraPosition: {
      x: 0,
      y: 3,
      z: 7
    },
    rotationSpeed: 0.005,
    modelScale: 1,
    modelPositionY: 0,
    pm25Field: 'pm25',
    defaultPM25Value: 99
  }
}

export const dataConfig = {
  ...commonConfig(customConfig)
}
