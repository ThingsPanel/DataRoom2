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
  // 1. 基础文本类 - 数据展示类
  'texts', // 文本组件
  'texts10', // 文本组件10
  'numbers', // 数字组件
  'marquee', // 跑马灯/文字滚动
  'currentTime', // 当前时间
  'timeCountDown', // 倒计时
  'linkChart', // 链接图表
  'digitalFlop', // 数字翻牌器

  // 2. 输入控件类 - 交互组件
  'input', // 输入框
  'button', // 按钮
  'select', // 选择器
  'switchBtn', // 开关
  'timePicker', // 时间选择器
  'dateTimePicker', // 日期时间选择器
  'chartTab', // 图表选项卡

  // 3. 装饰边框类 - 装饰和布局元素
  'horizontalLine', // 水平线
  'verticalLine', // 垂直线
  'rectangle', // 矩形
  'fabricLine',
  'svgLine', // SVG线条
  'svgIcon', // SVG图标
 
  // 4. 媒体展示类 - 媒体和嵌入元素
  'picture', // 图片
  'video', // 视频
  'iframeChart', // Iframe嵌入图表
  'customHtml', // 自定义HTML
  'weatherIcon', 
  // 5. 数据展示类 - 表格和滚动列表
  'tables', // 表格
  'screenScrollBoard', // 滚动面板
  'screenScrollRanking', // 滚动排行榜

  // 6. 指标卡片类 - 数据展示类
  'indicatorCard', // 指标卡
  'indicatorCard2', // 指标卡2
  'indexCard', // 指数卡
  'indexCard2', // 指数卡2
  'multiMetricCard', // 添加多指标卡片

  // 7. 图表类
  'candlestick', // K线图
  'sankey', // 桑基图

  // 8. 地图类
  'map', // 地图
  'flyMap', // 飞线地图

  // 9. 主题控制
  'themeSelect', // 主题选择器
  'themeSwitcher' // 主题切换器
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
