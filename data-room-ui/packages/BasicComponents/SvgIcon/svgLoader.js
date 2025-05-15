/**
 * SVG图标加载器
 * 负责加载和管理SVG图标
 */

// 缓存已加载的SVG图标内容
const svgIcons = {};
const iconCategoryMap = {};

// 尝试导入图标清单
let iconManifest = [];
try {
  iconManifest = require('./iconsManifest.json');
  console.log(`成功加载图标清单，包含 ${iconManifest.length} 个图标`);
} catch (e) {
  console.warn('无法加载图标清单，可能需要先运行 scanIcons.js');
  iconManifest = [];
}

// 默认图标内容
const defaultIcons = {
  'check': '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l237.44 237.44a32 32 0 0 0 45.248 0l454.656-454.656a32 32 0 1 0-45.248-45.248L406.592 706.944h.064z"></path></svg>',
  'close': '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 421.490332 331.092592 240.582924c-24.3984-24.3984-63.898664-24.3984-88.297064 0-24.3984 24.3984-24.3984 63.898664 0 88.297064L421.490332 512 242.795528 690.694804c-24.3984 24.3984-24.3984 63.898664 0 88.297064 24.3984 24.3984 63.898664 24.3984 88.297064 0L512 597.296872l180.907408 180.907408c24.3984 24.3984 63.898664 24.3984 88.297064 0 24.3984-24.3984 24.3984-63.898664 0-88.297064L601.296872 512l178.694804-178.694804c24.3984-24.3984 24.3984-63.898664 0-88.297064-24.3984-24.3984-63.898664-24.3984-88.297064 0L512 424.509668z"></path></svg>',
  '常用-用户': '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 512c123.776 0 224-100.224 224-224S635.776 64 512 64 288 164.224 288 288s100.224 224 224 224z m0 64c-149.504 0-448 75.008-448 224v128c0 35.328 28.672 64 64 64h768c35.328 0 64-28.672 64-64v-128c0-148.992-298.496-224-448-224z"></path></svg>',
  '常用-设置': '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 640c-70.688 0-128-57.312-128-128s57.312-128 128-128 128 57.312 128 128-57.312 128-128 128z m0-192c-35.392 0-64 28.608-64 64s28.608 64 64 64 64-28.608 64-64-28.608-64-64-64z m384 250.688l-58.816 103.68a32 32 0 0 1-42.88 12.16l-96-55.744a225.28 225.28 0 0 1-74.304 42.88V896a32 32 0 0 1-32 32h-117.824a32 32 0 0 1-32-32v-94.336c-26.88-9.6-51.968-24.064-74.304-42.88l-96 55.744a32 32 0 0 1-42.88-12.16L170.112 698.688a32 32 0 0 1 11.584-43.456l96-55.744a226.368 226.368 0 0 1 0-85.888l-96-55.744a32 32 0 0 1-11.584-43.456l58.816-103.68a32 32 0 0 1 42.88-12.16l96 55.744a225.28 225.28 0 0 1 74.304-42.88V224a32 32 0 0 1 32-32h117.824a32 32 0 0 1 32 32v94.336c26.88 9.6 51.968 24.064 74.304 42.88l96-55.744a32 32 0 0 1 42.88 12.16l58.816 103.68a32 32 0 0 1-11.584 43.456l-96 55.744c5.376 28.48 5.376 57.408 0 85.888l96 55.744a32 32 0 0 1 11.584 43.456z"></path></svg>'
};

// 初始化加载图标
function initIcons() {
  // 加载默认图标
  Object.keys(defaultIcons).forEach(key => {
    registerSvgIcon(key, defaultIcons[key]);
    iconCategoryMap[key] = '常用';
  });

  // 为清单中的图标创建占位符
  iconManifest.forEach(icon => {
    if (icon && icon.id) {
      // 如果没有内容，创建一个占位SVG
      if (!svgIcons[icon.id]) {
        const placeholderSvg = `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <rect width="1024" height="1024" fill="none" stroke="#ccc" stroke-width="1" />
          <text x="512" y="512" font-size="32" text-anchor="middle" alignment-baseline="middle" fill="#999">${icon.name}</text>
        </svg>`;
        registerSvgIcon(icon.id, placeholderSvg);
      }
      iconCategoryMap[icon.id] = icon.category || '常用';
    }
  });
}

/**
 * 获取指定名称的SVG图标内容
 * @param {string} iconName 图标名称
 * @returns {string} SVG内容
 */
export function getSvgIcon(iconName) {
  return svgIcons[iconName] || svgIcons['check'] || '<svg viewBox="0 0 1024 1024"></svg>';
}

/**
 * 获取所有可用的图标名称
 * @returns {string[]} 图标名称列表
 */
export function getAvailableIcons() {
  return Object.keys(svgIcons);
}

/**
 * 注册新的SVG图标
 * @param {string} iconName 图标名称
 * @param {string} svgContent SVG内容
 */
export function registerSvgIcon(iconName, svgContent) {
  if (iconName && svgContent) {
    svgIcons[iconName] = svgContent;
  }
}

/**
 * 获取图标的分类信息
 * @param {string} iconName 图标名称
 * @returns {string} 分类名称
 */
export function getIconCategory(iconName) {
  return iconCategoryMap[iconName] || '其他';
}

/**
 * 获取已加载的图标清单
 * @returns {Array} 图标清单数组
 */
export function getIconManifest() {
  return iconManifest;
}

// 初始化
initIcons();

export default {
  getSvgIcon,
  getAvailableIcons,
  registerSvgIcon,
  getIconCategory,
  getIconManifest
}; 