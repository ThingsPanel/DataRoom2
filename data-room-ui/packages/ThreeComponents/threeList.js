import { dataConfig, settingConfig } from '../ThreeRender/settingConfig'
import cloneDeep from 'lodash/cloneDeep'
import sortList from './threeListSort'

// 遍历当前文件夹下的所有文件，找到中文.js文件，然后导出
const files = require.context('./', true, /[\u4e00-\u9fa5]+.js$/)
const threeList = getThreeList(files)

// 获取three配置
function getThreeList(files) {
  const configMapList = {}
  files.keys().forEach((key) => {
    // 取到模型名称
    const configName = key.split('/')[2].replace('.js', '')
    configMapList[configName] = files(key).default
  })
  
  const threeList = []
  
  // 统一处理函数 - 最终修正版
  const processConfig = (config, configMapKey) => {
    // 1. 基础配置（严格对齐 plotList, 不含 option, setting 等）
    const baseConfig = {
      version: config.version,
      category: configMapKey,
      name: config.name,
      title: config.title,
      chartType: config.chartType || config.type, // 优先 chartType
      border: { 
        type: '', 
        titleHeight: 60, 
        fontSize: 30, 
        color: ['#5B8FF9', '#61DDAA', '#5D7092', '#F6BD16', '#6F5EF9'], 
        padding: [16, 16, 16, 16] 
      },
      icon: null,
      img: require(`../ThreeComponents/images/${config.title}.png`),
      className: 'com.gccloud.dataroom.core.module.chart.components.CustomComponentChart',
      w: 450,
      h: 320,
      x: 0,
      y: 0,
      rotateX: config.rotateX || 0,
      rotateY: config.rotateY || 0,
      rotateZ: config.rotateZ || 0,
      perspective: config.perspective || 0,
      skewX: config.skewX || 0,
      skewY: config.skewY || 0,
      type: 'customComponent', // 保持 type 为 customComponent (如果需要兼容老逻辑)
      loading: false
    }

    // 2. 严格按照 plotList 模式合并 option
    const mergedOption = {
      ...(config.option || {}),       // 组件 option 在前
      ...cloneDeep(settingConfig)  // 默认 settingConfig (只有 displayOption) 在后
       // 注意：现在 customize 主要由下面的 dataConfig 提供
    }

    // 3. 合并最终对象
    return {
       ...baseConfig,              // 先基础
       option: mergedOption,        // 合并后的 option
       ...cloneDeep(dataConfig),   // 再展开 dataConfig (提供默认 customize 等)
       // --- 关键：确保这些不被 dataConfig 覆盖 --- 
       setting: config.setting,
       dataHandler: config.dataHandler,
       optionHandler: config.optionHandler
    }
  }

  // 如果排序列表为空，则显示所有组件
  if (sortList.length === 0) {
    for (const configMapKey in configMapList) {
      const config = configMapList[configMapKey]
      threeList.push(processConfig(config, configMapKey))
    }
  } else {
    // 原有逻辑
    for (const configMapKey in configMapList) {
      const index = sortList.findIndex((item) => item === configMapKey)
      if (index === -1) continue // 跳过不在排序列表中的组件

      const config = configMapList[configMapKey]
      threeList[index] = processConfig(config, configMapKey)
    }
  }
  
  // 过滤掉空项
  return threeList.filter(item => item)
}

export default threeList 