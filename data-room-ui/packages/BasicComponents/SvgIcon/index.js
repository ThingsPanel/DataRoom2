/**
 * SvgIcon组件
 * 提供SVG图标显示功能
 */
import SvgIcon from './index.vue'

// 注册为Vue组件
SvgIcon.install = function(Vue) {
  Vue.component(SvgIcon.name, SvgIcon)
}

// 导出组件
export default SvgIcon 