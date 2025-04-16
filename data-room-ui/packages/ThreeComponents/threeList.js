import { dataConfig, settingConfig } from '../ThreeRender/settingConfig'
import cloneDeep from 'lodash/cloneDeep'
import sortList from './threeListSort'

// 遍历当前文件夹下的所有文件，找到中文.js文件，然后导出
const files = require.context('./', true, /[\u4e00-\u9fa5]+.js$/)
const threeList = getThreeList(files)

// 获取 three 配置，函数名保持 getThreeList，内部逻辑严格对齐 getPlotList
function getThreeList(files) {
  const configMapList = {}
  files.keys().forEach((key) => {
    // ./3D模型/桥梁监测.js -> configName = '桥梁监测' (与 plotList 保持一致，使用文件名)
    const configName = key.split('/')[2].replace('.js', '')
    configMapList[configName] = files(key).default
  })

  const plotList = [] // 使用 plotList 作为内部数组名，对齐 plotList.js

  // 严格按照 plotList.js 的方式构建对象，直接在循环内完成
  for (const configMapKey in configMapList) {
    const index = sortList.findIndex((item) => item === configMapKey)
    const config = configMapList[configMapKey]
    
    // 直接构建最终配置对象，结构和顺序严格对齐 plotList.js
    plotList[index] = {
      // --- 基础信息 --- (对齐 plotList.js)
      version: config.version,
      category: configMapKey, // 使用文件名作为 category
      name: config.name,
      title: config.title,
      border: { // 与 plotList.js 保持一致或根据需要调整
        type: '',
        titleHeight: 60,
        fontSize: 16, // Align font size with plotList.js
        isTitle: true, // Added from plotList.js
        padding: [16, 16, 16, 16]
      },
      icon: null,
      img: require(`../ThreeComponents/images/${config.title}.png`), // Three.js 图片路径
      className: 'com.gccloud.dataroom.core.module.chart.components.CustomComponentChart',
      w: config?.option?.width || 450, // 对齐 plotList.js 尺寸处理
      h: config?.option?.height || 320,
      x: 0, y: 0,
      rotateX: config.rotateX || 0, rotateY: config.rotateY || 0, rotateZ: config.rotateZ || 0,
      perspective: config.perspective || 0, skewX: config.skewX || 0, skewY: config.skewY || 0,
      type: 'customComponent',
      chartType: config.chartType, // 使用组件定义的 chartType
      loading: false,

      // --- Option 合并 --- (严格对齐 plotList.js)
      option: {
        ...(config.option || {}),    // 组件 option 优先展开
        ...cloneDeep(settingConfig) // 通用 settingConfig 其次展开
                                    // 假设 settingConfig 只包含应合并到 option 的属性
      },

      // --- 组件特定配置 --- (严格对齐 plotList.js)
      setting: config.setting,
      dataHandler: config.dataHandler,
      optionHandler: config.optionHandler,

      // --- 默认数据配置 --- (严格对齐 plotList.js，最后展开)
      ...cloneDeep(dataConfig)
    }
  }

  // plotList.js 后面还有合并 customPlots 等的逻辑，threeList.js 目前没有
  // 如果需要，可以在这里添加类似逻辑
  // const plots = [...plotList, ...customThreePlots, ...otherThreeData];

  // 返回过滤后的列表
  return plotList.filter(item => item) // 使用 plotList 变量名
}

// 保持默认导出名为 threeList
export default threeList