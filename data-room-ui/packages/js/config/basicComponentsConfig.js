/*
 * @description: 基础的bigScreen展示组件
 * @Date: 2023-03-13 10:04:59
 * @Author: xing.heng
 * @LastEditors: wujian
 * @LastEditTime: 2023-06-01 15:55:48
 */

// import _ from 'lodash'
import cloneDeep from 'lodash/cloneDeep'
import getComponentConfig from 'data-room-ui/js/utils/getComponentConfig'
// 批量引入配置文件
import { setModules, dataModules } from 'data-room-ui/js/utils/configImport'
const typeList = [
  // 1. 基础文本类
  'texts',
  'numbers', 
  'marquee',
  'currentTime',
  'timeCountDown',
  'linkChart',
  
  // 2. 输入控件类
  'input',
  'select',
  'timePicker',
  'dateTimePicker',
  
  
  // 3. 装饰边框类
  'horizontalLine',
  'verticalLine', 
  'rectangle',
  'svgLine',
  
  // 4. 媒体展示类
  'picture',
  'video',
  'iframeChart',
  'customHtml',
  
  // 5. 数据展示类
  'tables',
  'screenScrollBoard',
  'screenScrollRanking',
  'digitalFlop',
  
  // 6. 指标卡片类
  'indicatorCard',
  'indicatorCard2',
  'indexCard',
  'indexCard2',
  
  // 7. 图表类
  'candlestick',
  'sankey',
  
  // 8. 地图类
  'map',
  'flyMap',
  
  // 9. 其他
  'chartTab',
  'themeSelect'
]
let basicConfigList = []
basicConfigList = typeList.map((type) => {
  return getComponentConfig(type)
})
basicConfigList = basicConfigList.map((item) => {
  return basicComponentsConfig(item)
})
// 生成基本配置
export function basicComponentsConfig (item) {
  return {
    ...item,
    border: { type: '', titleHeight: 60, fontSize: 30, isTitle: true, padding: [0, 0, 0, 0] },
    option: cloneDeep(setModules[item.type]),
    ...cloneDeep(dataModules[item.type])
  }
}
export default basicConfigList
