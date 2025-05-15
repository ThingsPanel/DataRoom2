import SvgIcon from './SvgIcon.vue';
import SvgIconSetting from './setting.vue';
import { registerSvgIcon, getSvgIcon, getAvailableIcons, importSvgIcon, batchImportSvgs } from './svgLoader';
import { iconList, categoryHierarchy, generateCategoryTree } from './iconList';

// 注册组件
SvgIcon.install = function(Vue) {
  Vue.component(SvgIcon.name, SvgIcon);
};

// 导出组件、图标加载功能和相关API
export {
  SvgIcon,
  SvgIconSetting,
  registerSvgIcon,
  getSvgIcon,
  getAvailableIcons,
  iconList,
  categoryHierarchy,
  generateCategoryTree,
  importSvgIcon,
  batchImportSvgs
};

// 默认导出组件
export default SvgIcon; 