// import { dataConfig, settingConfig } from '../VchartRender/settingConfig' // 暂时注释掉依赖
import cloneDeep from 'lodash/cloneDeep'
import sortList from './vchartListSort'

const files = require.context('./', true, /[\u4e00-\u9fa5]+.js$/)
const vchartList = getVchartList(files)

function getVchartList (files) {
  const configMapList = {}
  files.keys().forEach((key) => {
    const configName = key.split('/')[2].replace('.js', '')
    configMapList[configName] = files(key).default
  })
  const list = []
  for (const configMapKey in configMapList) {
    const index = sortList.findIndex((item) => item === configMapKey)
    const config = configMapList[configMapKey]

    list[index] = {
      version: config.version,
      category: configMapKey,
      name: config.name,
      title: config.title,
      border: { type: '', titleHeight: 60, fontSize: 30, color: ['#5B8FF9', '#61DDAA', '#5D7092', '#F6BD16', '#6F5EF9'], padding: [16, 16, 16, 16] },
      icon: null,
      img: require(`../Vcharts/images/${config.title}.png`),
      className:
        'com.gccloud.dataroom.core.module.chart.components.CustomComponentChart',
      w: config?.option?.width || 450,
      h: config?.option?.height || 320,
      x: 0,
      y: 0,
      rotateX: config.rotateX || 0,
      rotateY: config.rotateY || 0,
      rotateZ: config.rotateZ || 0,
      perspective: config.perspective || 0,
      skewX: config.skewX || 0,
      skewY: config.skewY || 0,
      type: 'vchartComponent',
      loading: false,
      option: {
        ...config.option,
        // ...cloneDeep(settingConfig) // 暂时注释掉合并
      },
      setting: config.setting,
      dataHandler: config.dataHandler,
      optionHandler: config.optionHandler,
      // ...cloneDeep(dataConfig) // 暂时注释掉合并
    }
  }
  return list.filter(item => item !== undefined && item !== null)
}

export default vchartList 