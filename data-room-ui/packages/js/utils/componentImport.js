/* eslint-disable no-useless-escape */
/*
 * @description: 批量导入pc端大屏组件
 * @Date: 2023-03-13 10:04:58
 * @Author: xing.heng
 * @LastEditors: xing.heng
 * @LastEditTime: 2023-05-17 12:40:25
 */

// 动态导入组件
import EchartsComponent from 'data-room-ui/EchartsRender/index.vue'
import ThreeComponent from 'data-room-ui/ThreeRender/index.vue'
import VchartCustomComponent from 'data-room-ui/VchartRender/index.vue'

const modules = {}
// 排除的组件
const excludeCommponents = []

/**
 * 导入组件
 * @param {*} r 组件上下文
 */
function importComponents (r) {
  r.keys().forEach(key => {
    // 正则，取到./和/之间的字符串
    const reg = new RegExp('(.\\/)(.*)(\\/)')
    const moduleName = key.match(reg) ? key.match(reg)[0].replace(/(\.\/)|(\/)|(src)/g, '') : key.replace(/^\.\/(.*)\.(vue|js)$/, '$1')
    // 如果不在排除列表中，则导入组件
    if (!excludeCommponents.includes(moduleName)) {
      modules[moduleName] = r(key).default
    }
  })
}

// 导入所有组件
importComponents(require.context('data-room-ui/BasicComponents', true, /\index.vue$/))
importComponents(require.context('data-room-ui/Borders', true, /\index.vue$/))
importComponents(require.context('data-room-ui/Decorations', true, /\index.vue$/))
importComponents(require.context('data-room-ui/BorderComponents', true, /\index.vue$/))

// 手动添加额外组件
modules.EchartsComponent = EchartsComponent
modules.ThreeComponent = ThreeComponent
modules.VchartCustomComponent = VchartCustomComponent

export default modules
