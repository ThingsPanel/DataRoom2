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
  
  // 如果排序列表为空，则显示所有组件
  if (sortList.length === 0) {
    for (const configMapKey in configMapList) {
      const config = configMapList[configMapKey]
      threeList.push({
        version: config.version,
        category: configMapKey,
        name: config.name,
        title: config.title,
        border: { 
          type: '', 
          titleHeight: 60, 
          fontSize: 30, 
          color: ['#5B8FF9', '#61DDAA', '#5D7092', '#F6BD16', '#6F5EF9'], 
          padding: [16, 16, 16, 16] 
        },
        icon: 'kongjian', // 使用图标
        img: undefined, // 不使用图片
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
        type: 'threeComponent',
        loading: false,
        // 把默认右侧配置与自定义右侧配置集合
        option: {
          ...cloneDeep(settingConfig),
          customize: {
            ...cloneDeep(settingConfig.customize),
            ...config.option
          },
          displayOption: {
            ...cloneDeep(settingConfig.displayOption),
            dataAllocation: {
              enable: true
            }
          }
        },
        setting: config.setting, // 右侧面板自定义配置
        dataHandler: config.dataHandler, // 数据自定义处理js脚本
        optionHandler: config.optionHandler, // 配置自定义处理js脚本
        ...cloneDeep(dataConfig)
      })
    }
  } else {
    // 原有逻辑
    for (const configMapKey in configMapList) {
      const index = sortList.findIndex((item) => item === configMapKey)
      if (index === -1) continue // 跳过不在排序列表中的组件
      
      const config = configMapList[configMapKey]

      threeList[index] = {
        version: config.version,
        category: configMapKey,
        name: config.name,
        title: config.title,
        border: { 
          type: '', 
          titleHeight: 60, 
          fontSize: 30, 
          color: ['#5B8FF9', '#61DDAA', '#5D7092', '#F6BD16', '#6F5EF9'], 
          padding: [16, 16, 16, 16] 
        },
        icon: 'kongjian', // 使用图标
        img: undefined, // 不使用图片
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
        type: 'threeComponent',
        loading: false,
        // 把默认右侧配置与自定义右侧配置集合
        option: {
          ...cloneDeep(settingConfig),
          customize: {
            ...cloneDeep(settingConfig.customize),
            ...config.option
          },
          displayOption: {
            ...cloneDeep(settingConfig.displayOption),
            dataAllocation: {
              enable: true
            }
          }
        },
        setting: config.setting, // 右侧面板自定义配置
        dataHandler: config.dataHandler, // 数据自定义处理js脚本
        optionHandler: config.optionHandler, // 配置自定义处理js脚本
        ...cloneDeep(dataConfig)
      }
    }
  }
  
  // 过滤掉空项
  return threeList.filter(item => item)
}

export default threeList 