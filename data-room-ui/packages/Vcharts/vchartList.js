import { dataConfig, settingConfig } from '../VchartRender/settingConfig'
import cloneDeep from 'lodash/cloneDeep'
import sortList from './vchartListSort'

// 遍历图表目录下的所有中文命名文件
const files = require.context('./图表', true, /[一-龥]+.js$/)
const vchartList = getVchartList(files)

function getVchartList(files) {
  const configMapList = {}
  
  // 收集所有图表配置
  files.keys().forEach((key) => {
    const parts = key.split('/')
    const configName = parts[parts.length - 1].replace('.js', '')
    const category = parts[1] // 获取分类名称
    configMapList[configName] = {
      config: files(key).default,
      category
    }
  })
  
  const list = []
  
  // 按照排序列表组织图表
  sortList.forEach((chartName) => {
    if (!configMapList[chartName]) {
      console.warn(`Chart not found: ${chartName}`)
      return
    }
    
    const componentConfig = configMapList[chartName].config
    const category = configMapList[chartName].category
    
    // 基础配置合并
    const baseOption = componentConfig.option ? cloneDeep(componentConfig.option) : {}
    
    // 处理spec结构 - 保持简单
    if (baseOption.spec) {
      // 确保数据存在
      if (baseOption.spec.data && Array.isArray(baseOption.spec.data) && baseOption.spec.data.length > 0) {
        baseOption.spec.data = cloneDeep(baseOption.spec.data)
      }
    }
    
    // 添加到列表
    list.push({
      version: componentConfig.version || 'unknown',
      category,
      name: componentConfig.name || chartName,
      title: componentConfig.title || chartName,
      border: componentConfig.border || { type: '', titleHeight: 60, fontSize: 30, color: ['#5B8FF9'], padding: [16] },
      icon: componentConfig.icon || null,
      img: (() => {
        try {
          return require(`../Vcharts/images/${componentConfig.title || chartName}.png`)
        } catch (e) { return null }
      })(),
      className: 'com.gccloud.dataroom.core.module.chart.components.CustomComponentChart',
      w: componentConfig.w || baseOption?.width || 450,
      h: componentConfig.h || baseOption?.height || 320,
      x: componentConfig.x || 0,
      y: componentConfig.y || 0,
      rotateX: componentConfig.rotateX || 0,
      rotateY: componentConfig.rotateY || 0,
      rotateZ: componentConfig.rotateZ || 0,
      perspective: componentConfig.perspective || 0,
      skewX: componentConfig.skewX || 0,
      skewY: componentConfig.skewY || 0,
      type: componentConfig.type || 'customComponent',
      loading: false,
      option: {
        ...baseOption,
        ...cloneDeep(settingConfig)
      },
      setting: componentConfig.setting || [],
      dataHandler: componentConfig.dataHandler || '',
      optionHandler: componentConfig.optionHandler || '',
      chartType: componentConfig.chartType,
      ...cloneDeep(dataConfig)
    })
  })
  
  return list
}

export default vchartList