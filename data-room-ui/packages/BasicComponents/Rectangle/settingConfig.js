import { commonConfig } from '../../js/config'

export const settingConfig = {
  displayOption: {
    dataAllocation: {
      enable: false
    }
  }
}

const customConfig = {
  type: 'rectangle',
  root: {
    version: '2023071001',
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    perspective: 0,
    skewX: 0,
    skewY: 0
  },
  customize: {
    borderColor: 'rgba(131, 191, 246, 0)',
    borderWidth: 1,
    backgroundColor: '#007aff',
    colorType: 'single',
    gradientColor0: '#83bff6',
    gradientColor1: '#188df0',
    gradientDirection: 'to right',
    opacity: 100
  }
}

export const dataConfig = {
  ...commonConfig(customConfig)
} 