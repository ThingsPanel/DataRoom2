/**
 * SVG图标加载器
 * 此文件负责收集和管理SVG图标内容
 * 
 * 从文件系统加载SVG图标文件
 */

// 缓存已加载的SVG图标内容
const svgIcons = {};
const iconCategoryMap = {};

// 尝试导入图标清单
let iconManifest = [];
try {
  // 这里使用动态导入，确保打包工具可以正确处理
  // 注：在实际使用中可能需要根据构建工具调整导入方式
  iconManifest = require('./iconsManifest.json');
  console.log(`成功加载图标清单，包含 ${iconManifest.length} 个图标`);
} catch (e) {
  console.warn('无法加载图标清单，可能需要先运行 scanIcons.js');
}

/**
 * 初始化时从文件系统加载SVG图标
 * 
 * 在实际环境中根据构建工具不同有不同实现方式：
 * 1. Webpack环境: 使用require.context动态导入SVG文件
 * 2. Vite环境: 使用import.meta.glob动态导入SVG文件
 */
function loadSvgFromFiles() {
  try {
    // 定义目录结构，与实际文件系统对应
    const categoryDirs = [
      '常用',
      '工程',
      'IT&互联网',
      '智慧城市',
      '电力',
      '能源',
      'actions',
      'arrows'
    ];
    
    let loaded = false;

    // 尝试从清单加载图标
    if (iconManifest && iconManifest.length > 0) {
      try {
        // 在Node.js环境下尝试直接读取文件
        if (typeof fs !== 'undefined' && typeof path !== 'undefined') {
          const fs = require('fs');
          const path = require('path');
          
          iconManifest.forEach(icon => {
            if (icon && icon.path && icon.id) {
              try {
                const content = fs.readFileSync(icon.path, 'utf8');
                registerSvgIcon(icon.id, content);
                iconCategoryMap[icon.id] = icon.category;
              } catch (err) {
                console.warn(`无法读取图标文件: ${icon.path}`);
              }
            }
          });
          loaded = true;
          console.log(`从清单成功加载图标`);
        }
      } catch (e) {
        console.warn('在浏览器环境中无法直接读取文件系统文件');
      }
    }
    
    // Webpack 环境加载
    if (!loaded && typeof require !== 'undefined' && typeof require.context === 'function') {
      try {
        const svgContext = require.context('./icons', true, /\.svg$/);
        
        svgContext.keys().forEach(path => {
          // 从路径中提取图标ID和类别
          // 例如 ./actions/check.svg -> actions/check
          const match = path.match(/\.\/([^/]+)\/([^/]+)\.svg$/);
          if (match) {
            const category = match[1];
            const iconName = match[2];
            const fullIconName = `${category}-${iconName}`;
            
            // 读取SVG文件内容
            const svgContent = svgContext(path);
            
            // 注册图标
            registerSvgIcon(fullIconName, svgContent);
            
            // 记录图标类别
            iconCategoryMap[fullIconName] = category;
          }
        });
        loaded = true;
      } catch (e) {
        console.warn('Webpack require.context加载SVG失败:', e);
      }
    } 
    // Vite 环境加载
    else if (!loaded && typeof import.meta !== 'undefined' && typeof import.meta.glob === 'function') {
      try {
        const modules = import.meta.glob('./icons/**/*.svg', { eager: true });
        
        Object.entries(modules).forEach(([path, module]) => {
          const match = path.match(/\.\/icons\/([^/]+)\/([^/]+)\.svg$/);
          if (match) {
            const category = match[1];
            const iconName = match[2];
            const fullIconName = `${category}-${iconName}`;
            
            // Vite通常将SVG作为字符串或对象导出
            const svgContent = typeof module === 'string' ? module : module.default;
            
            // 注册图标
            registerSvgIcon(fullIconName, svgContent);
            
            // 记录图标类别
            iconCategoryMap[fullIconName] = category;
          }
        });
        loaded = true;
      } catch (e) {
        console.warn('Vite import.meta.glob加载SVG失败:', e);
      }
    }
    
    // 如果没有通过自动导入加载成功，添加一些默认图标
    if (!loaded) {
      console.warn('无法通过自动导入加载SVG图标，将使用默认图标');
      loadDefaultIcons();
    }
  } catch (error) {
    console.error('加载SVG图标失败:', error);
    // 加载默认图标作为备选
    loadDefaultIcons();
  }
}

/**
 * 手动添加一些默认图标，在自动导入失败时使用
 */
function loadDefaultIcons() {
  // 提供一些基本的默认图标
  registerSvgIcon('actions-check', '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l237.44 237.44a32 32 0 0 0 45.248 0l454.656-454.656a32 32 0 1 0-45.248-45.248L406.592 706.944h.064z"></path></svg>');
  registerSvgIcon('actions-close', '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 421.490332 331.092592 240.582924c-24.3984-24.3984-63.898664-24.3984-88.297064 0-24.3984 24.3984-24.3984 63.898664 0 88.297064L421.490332 512 242.795528 690.694804c-24.3984 24.3984-24.3984 63.898664 0 88.297064 24.3984 24.3984 63.898664 24.3984 88.297064 0L512 597.296872l180.907408 180.907408c24.3984 24.3984 63.898664 24.3984 88.297064 0 24.3984-24.3984 24.3984-63.898664 0-88.297064L601.296872 512l178.694804-178.694804c24.3984-24.3984 24.3984-63.898664 0-88.297064-24.3984-24.3984-63.898664-24.3984-88.297064 0L512 424.509668z"></path></svg>');
  
  // 记录默认图标类别
  iconCategoryMap['actions-check'] = 'actions';
  iconCategoryMap['actions-close'] = 'actions';
  
  // 添加一些常用分类的示例图标
  registerSvgIcon('常用-用户', '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 512c123.776 0 224-100.224 224-224S635.776 64 512 64 288 164.224 288 288s100.224 224 224 224z m0 64c-149.504 0-448 75.008-448 224v128c0 35.328 28.672 64 64 64h768c35.328 0 64-28.672 64-64v-128c0-148.992-298.496-224-448-224z"></path></svg>');
  iconCategoryMap['常用-用户'] = '常用';
  
  registerSvgIcon('电力-发电机', '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M832 256h-80v-64c0-35.2-28.8-64-64-64H336c-35.2 0-64 28.8-64 64v64h-80c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32h640c17.6 0 32-14.4 32-32V288c0-17.6-14.4-32-32-32z m-528-16c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v16H304v-16z m48 448c-26.4 0-48-21.6-48-48s21.6-48 48-48 48 21.6 48 48-21.6 48-48 48z m144 0c-26.4 0-48-21.6-48-48s21.6-48 48-48 48 21.6 48 48-21.6 48-48 48z m144 0c-26.4 0-48-21.6-48-48s21.6-48 48-48 48 21.6 48 48-21.6 48-48 48z"></path></svg>');
  iconCategoryMap['电力-发电机'] = '电力';
  
  registerSvgIcon('arrows-up', '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M874.624 609.408 534.4 277.76a32 32 0 0 0-44.672 0L149.376 609.408a32 32 0 0 0 44.544 45.696L512 346.24l318.08 308.864a32 32 0 0 0 44.544-45.696z"></path></svg>');
  iconCategoryMap['arrows-up'] = 'arrows';
  
  // 添加更多示例图标...
}

/**
 * 手动导入SVG内容并注册为图标
 * @param {string} category 图标分类
 * @param {string} name 图标名称
 * @param {string} svgContent SVG内容
 */
export function importSvgIcon(category, name, svgContent) {
  const iconName = `${category}-${name}`;
  registerSvgIcon(iconName, svgContent);
  iconCategoryMap[iconName] = category;
  return iconName;
}

/**
 * 获取指定名称的SVG图标内容
 * @param {string} iconName 图标名称
 * @returns {string} SVG内容
 */
export function getSvgIcon(iconName) {
  return svgIcons[iconName] || svgIcons['actions-check'] || '<svg viewBox="0 0 1024 1024"></svg>';
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
 * 批量导入安全帽等SVG图标
 * 此函数用于从extractSvg.js提取的图标批量导入
 * @param {Array} svgData 包含{title, svg}的数组
 */
export function batchImportSvgs(svgData) {
  if (!Array.isArray(svgData)) {
    console.error('batchImportSvgs: 参数必须是数组');
    return [];
  }

  const importedIcons = [];
  
  svgData.forEach((item, index) => {
    if (item && typeof item === 'object') {
      const category = item.category || '常用';
      const name = item.title || `icon_${index}`;
      const svg = item.svg || '';
      
      if (svg) {
        const iconName = importSvgIcon(category, name, svg);
        importedIcons.push(iconName);
      }
    }
  });
  
  return importedIcons;
}

/**
 * 获取已加载的图标清单
 * @returns {Array} 图标清单数组
 */
export function getIconManifest() {
  return iconManifest;
}

// 初始化时加载SVG图标
loadSvgFromFiles();

export default {
  getSvgIcon,
  getAvailableIcons,
  registerSvgIcon,
  getIconCategory,
  importSvgIcon,
  batchImportSvgs,
  getIconManifest
}; 