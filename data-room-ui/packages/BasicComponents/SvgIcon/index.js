import SvgIcon from './index.vue';
import SvgIconSetting from './setting.vue';
import { registerSvgIcon, getSvgIcon, getAvailableIcons } from './svgLoader';
import { iconList, categoryHierarchy, generateCategoryTree } from './iconList';

// 注册组件
SvgIcon.install = function(Vue) {
  Vue.component(SvgIcon.name, SvgIcon);
};

// 导出组件
export {
  SvgIcon,
  SvgIconSetting
};

// 导出组件、图标加载功能和相关API
export {
  registerSvgIcon,
  getSvgIcon,
  getAvailableIcons,
  iconList,
  categoryHierarchy,
  generateCategoryTree
};

// 默认导出组件
export default SvgIcon; 