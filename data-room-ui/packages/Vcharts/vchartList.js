import { dataConfig, settingConfig } from '../VchartRender/settingConfig'
import cloneDeep from 'lodash/cloneDeep'
import sortList from './vchartListSort'

// 遍历图表目录下的所有中文命名文件
const files = require.context('./图表', true, /[一-龥]+.js$/)

const themeOptions = [
  { label: '亮色', value: 'light' },
  { label: '暗色', value: 'dark' },
  { label: '移动设备亮色 (mobileLight)', value: 'mobileLight' },
  { label: '移动设备暗色 (mobileDark)', value: 'mobileDark' },
  { label: '简约图例亮色 (legacyLight)', value: 'legacyLight' },
  { label: '简约图例暗色 (legacyDark)', value: 'legacyDark' },
  { label: '大屏-火山蓝', value: 'vScreenVolcanoBlue' },
  { label: '大屏-清新蜡笔', value: 'vScreenClean' },
  { label: '大屏-郊外', value: 'vScreenOutskirts' },
  { label: '大屏-汽车蓝橙', value: 'vScreenBlueOrange' },
  { label: '大屏-金融黄', value: 'vScreenFinanceYellow' },
  { label: '大屏-文旅青', value: 'vScreenWenLvCyan' },
  { label: '大屏-电力绿', value: 'vScreenElectricGreen' },
  { label: '大屏-电商紫', value: 'vScreenECommercePurple' },
  { label: '大屏-红蓝', value: 'vScreenRedBlue' },
  { label: '大屏-党建红', value: 'vScreenPartyRed' },
  // { label: 'Semi Design - 亮色', value: 'semiDesignLight' },
  // { label: 'Semi Design - 暗色', value: 'semiDesignDark' },
  // { label: 'Arco Design - 亮色', value: 'arcoDesignLight' },
  // { label: 'Arco Design - 暗色', value: 'arcoDesignDark' },
  // { label: 'TT Platform - 亮色', value: 'ttPlatformLight' },
  // { label: 'TT Platform - 暗色', value: 'ttPlatformDark' },
  // { label: 'chartHub - 亮色', value: 'chartHubLight' },
  // { label: 'O Design - 亮色', value: 'veODesignLight' },
  // { label: 'O Design - 亮色 - 金融行业', value: 'veODesignLightFinance' },
  // { label: 'O Design - 亮色 - 政府行业', value: 'veODesignLightGovernment' },
  // { label: 'O Design - 亮色 - 大消费行业', value: 'veODesignLightConsumer' },
  // { label: 'O Design - 亮色 - 汽车行业', value: 'veODesignLightAutomobile' },
  // { label: 'O Design - 亮色 - 文旅行业', value: 'veODesignLightCulturalTourism' },
  // { label: 'O Design - 亮色 - 医疗行业', value: 'veODesignLightMedical' },
  // { label: 'O Design - 亮色 - 新能源行业', value: 'veODesignLightNewEnergy' },
  // { label: 'O Design - 暗色', value: 'veODesignDark' },
  // { label: 'O Design - 暗色 - 金融行业', value: 'veODesignDarkFinance' },
  // { label: 'O Design - 暗色 - 政府行业', value: 'veODesignDarkGovernment' },
  // { label: 'O Design - 暗色 - 大消费行业', value: 'veODesignDarkConsumer' },
  // { label: 'O Design - 暗色 - 汽车行业', value: 'veODesignDarkAutomobile' },
  // { label: 'O Design - 暗色 - 文旅行业', value: 'veODesignDarkCulturalTourism' },
  // { label: 'O Design - 暗色 - 医疗行业', value: 'veODesignDarkMedical' },
  // { label: 'O Design - 暗色 - 新能源行业', value: 'veODesignDarkNewEnergy' }
];

const newThemeSetting = {
  label: '主题配置',
  type: 'select',
  field: 'spec_theme',
  optionField: 'spec.theme',
  value: 'light',
  options: themeOptions,
  tabName: 'custom',
  groupName: 'theme'
};

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
      setting: [newThemeSetting,...(componentConfig.setting || [])],
      dataHandler: componentConfig.dataHandler || '',
      optionHandler: componentConfig.optionHandler || '',
      chartType: componentConfig.chartType,
      ...cloneDeep(dataConfig)
    })
  })
  
  return list
}

export default vchartList