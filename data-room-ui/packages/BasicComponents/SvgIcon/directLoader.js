/**
 * 直接从文件系统加载SVG图标
 * 此模块用于在运行时直接从文件系统加载SVG图标
 */

import fs from 'fs';
import path from 'path';
import { registerSvgIcon } from './svgLoader';

// 判断是否为浏览器环境
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * 从本地清单文件加载图标
 * 这在浏览器环境中是可行的，因为清单文件会被构建工具打包
 */
export function loadIconsFromManifest() {
  try {
    // 尝试导入清单文件(这需要构建工具支持导入JSON)
    const manifestPath = require.resolve('./iconsManifest.json');
    const manifest = require('./iconsManifest.json');
    console.log(`从清单加载图标: ${manifestPath}`);
    
    if (Array.isArray(manifest) && manifest.length > 0) {
      console.log(`清单包含 ${manifest.length} 个图标`);
      return manifest;
    }
    
    console.warn('图标清单为空或格式错误');
    return [];
  } catch (error) {
    console.warn('加载图标清单失败，请先运行 scanIcons.js 生成清单', error);
    return [];
  }
}

/**
 * 从文件系统直接读取SVG图标
 * 注意: 此函数仅在Node.js环境中有效
 * @param {string} iconDir 图标目录路径
 */
export function loadIconsFromFileSystem(iconDir) {
  if (isBrowser) {
    console.warn('浏览器环境中无法直接读取文件系统');
    return [];
  }
  
  try {
    const readSvgFiles = (dir, prefix = '') => {
      const results = [];
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory()) {
          const subDir = item.name;
          const subResults = readSvgFiles(fullPath, prefix ? `${prefix}-${subDir}` : subDir);
          results.push(...subResults);
        } 
        else if (item.isFile() && item.name.endsWith('.svg')) {
          const content = fs.readFileSync(fullPath, 'utf8');
          const iconName = item.name.replace('.svg', '');
          const id = prefix ? `${prefix}-${iconName}` : iconName;
          
          results.push({
            id,
            category: prefix || 'default',
            name: iconName,
            content
          });
        }
      }
      
      return results;
    };
    
    return readSvgFiles(iconDir);
  } catch (error) {
    console.error('从文件系统读取图标失败:', error);
    return [];
  }
}

/**
 * 注册已从清单或文件系统加载的图标
 * @param {Array} icons 图标数组
 */
export function registerLoadedIcons(icons) {
  if (!Array.isArray(icons) || icons.length === 0) {
    console.warn('没有可注册的图标');
    return;
  }
  
  let registeredCount = 0;
  
  icons.forEach(icon => {
    if (!icon || !icon.id) return;
    
    if (icon.content) {
      // 如果有内容直接注册
      registerSvgIcon(icon.id, icon.content);
      registeredCount++;
    } 
    else if (icon.path && !isBrowser) {
      // 在Node环境尝试读取文件
      try {
        const content = fs.readFileSync(icon.path, 'utf8');
        registerSvgIcon(icon.id, content);
        registeredCount++;
      } catch (error) {
        console.warn(`无法读取图标文件: ${icon.path}`, error);
      }
    }
  });
  
  console.log(`成功注册 ${registeredCount} 个图标`);
  return registeredCount;
}

export default {
  loadIconsFromManifest,
  loadIconsFromFileSystem,
  registerLoadedIcons
}; 