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
    colorType: 'gradient',
    gradientColor0: '#83bff6',
    gradientColor1: '#188df0',
    gradientDirection: 'to right',
    opacity: 1,
    borderRadiusTopLeft: 4,
    borderRadiusTopRight: 4,
    borderRadiusBottomLeft: 4,
    borderRadiusBottomRight: 4,
    boxShadow: 'none',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0
  }
}

export const dataConfig = {
  ...commonConfig(customConfig)
} 