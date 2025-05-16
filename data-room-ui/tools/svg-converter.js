#!/usr/bin/env node

/**
 * SVG颜色转换工具
 * 将项目中所有SVG图标的固定颜色替换为currentColor，使图标能够通过CSS颜色属性动态改变颜色
 * 同时保留stroke-width和stroke-dasharray等属性，使其可以通过组件配置动态修改
 * 
 * 用法: 在命令行执行 node tools/svg-converter.js [SVG图标目录路径]
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// 正则表达式匹配各种颜色格式
const COLOR_PATTERNS = [
  // stroke 属性颜色匹配
  /stroke="(rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-zA-Z]+)"/g,  // stroke="rgba(x,x,x,x)" 或 "#xxx" 或 "blue"
  /stroke='(rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-zA-Z]+)'/g,  // 单引号版本
  
  // fill 属性颜色匹配
  /fill="(rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-zA-Z]+)"/g,    // fill="rgba(x,x,x,x)" 或 "#xxx" 或 "blue"
  /fill='(rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-zA-Z]+)'/g,    // 单引号版本
  
  // style 属性内的颜色匹配
  /stroke:(rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-zA-Z]+)/g,    // style="stroke:rgba(x,x,x,x)" 或 "stroke:#xxx"
  /fill:(rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-zA-Z]+)/g,      // style="fill:rgba(x,x,x,x)" 或 "fill:#xxx"
];

// 需要保留的颜色值（不替换为currentColor）
const PRESERVE_COLORS = ['none', 'transparent'];

/**
 * 处理单个SVG文件
 * @param {string} filePath - SVG文件路径
 * @returns {Promise<boolean>} - 是否处理成功
 */
async function processSvgFile(filePath) {
  try {
    // 读取SVG文件内容
    let content = await readFile(filePath, 'utf8');
    let modified = false;

    // 已经包含currentColor就不处理颜色
    const alreadyHasCurrentColor = content.includes('currentColor');
    
    // 对每种颜色模式进行处理(如果还没有currentColor)
    if (!alreadyHasCurrentColor) {
      for (const pattern of COLOR_PATTERNS) {
        // 重置正则表达式
        pattern.lastIndex = 0;

        // 检查特定模式是否存在
        if (pattern.test(content)) {
          // 重置正则表达式
          pattern.lastIndex = 0;

          // 根据不同类型的模式进行替换
          if (pattern.toString().includes('stroke="')) {
            content = content.replace(pattern, (match, color) => {
              if (PRESERVE_COLORS.includes(color)) return match;
              modified = true;
              return 'stroke="currentColor"';
            });
          } else if (pattern.toString().includes('fill="')) {
            content = content.replace(pattern, (match, color) => {
              if (PRESERVE_COLORS.includes(color) || color === 'none') return match;
              modified = true;
              return 'fill="currentColor"';
            });
          } else if (pattern.toString().includes("stroke='")) {
            content = content.replace(pattern, (match, color) => {
              if (PRESERVE_COLORS.includes(color)) return match;
              modified = true;
              return "stroke='currentColor'";
            });
          } else if (pattern.toString().includes("fill='")) {
            content = content.replace(pattern, (match, color) => {
              if (PRESERVE_COLORS.includes(color) || color === 'none') return match;
              modified = true;
              return "fill='currentColor'";
            });
          } else if (pattern.toString().includes('stroke:')) {
            content = content.replace(pattern, (match, color) => {
              if (PRESERVE_COLORS.includes(color)) return match;
              modified = true;
              return 'stroke:currentColor';
            });
          } else if (pattern.toString().includes('fill:')) {
            content = content.replace(pattern, (match, color) => {
              if (PRESERVE_COLORS.includes(color) || color === 'none') return match;
              modified = true;
              return 'fill:currentColor';
            });
          }
        }
      }
    }

    // 检查是否有固定的stroke-width和stroke-dasharray属性
    const hasFixedStrokeWidth = /stroke-width="[^"]*"/.test(content) || /stroke-width='[^']*'/.test(content);
    const hasFixedStrokeDasharray = /stroke-dasharray="[^"]*"/.test(content) || /stroke-dasharray='[^']*'/.test(content);
    
    // 如果已经有修改，或有fixed属性，需要写回文件
    const needWriteBack = modified || hasFixedStrokeWidth || hasFixedStrokeDasharray;
    
    if (needWriteBack) {
      await writeFile(filePath, content, 'utf8');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

/**
 * 递归遍历目录处理所有SVG文件
 * @param {string} directory - 要处理的目录
 * @returns {Promise<number>} - 处理成功的文件数量
 */
async function processDirectory(directory) {
  try {
    const files = await readdir(directory);
    let processed = 0;
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const fileStat = await stat(filePath);
      
      if (fileStat.isDirectory()) {
        // 递归处理子目录
        processed += await processDirectory(filePath);
      } else if (file.toLowerCase().endsWith('.svg')) {
        // 处理SVG文件
        const result = await processSvgFile(filePath);
        if (result) processed++;
      }
    }
    
    return processed;
  } catch (error) {
    return 0;
  }
}

/**
 * 将提供的目录路径标准化，支持相对路径和绝对路径
 * @param {string} dirPath - 目录路径
 * @returns {string} - 标准化的绝对路径
 */
function normalizePath(dirPath) {
  if (path.isAbsolute(dirPath)) {
    return dirPath;
  }
  return path.resolve(process.cwd(), dirPath);
}

/**
 * 主函数
 */
async function main() {
  // 获取命令行参数
  const args = process.argv.slice(2);
  
  // 默认目录是项目中的SVG图标文件夹
  let iconsDir = path.resolve(process.cwd(), 'data-room-ui/packages/BasicComponents/SvgIcon/icons');
  
  // 如果提供了目录参数，则使用提供的目录
  if (args.length > 0) {
    iconsDir = normalizePath(args[0]);
  }
  
  
  try {
    // 检查目录是否存在
    await stat(iconsDir);
  } catch (error) {
    process.exit(1);
  }
  
  
  const startTime = Date.now();
  const totalProcessed = await processDirectory(iconsDir);
  const endTime = Date.now();
  
}

// 直接执行主函数
main().catch(error => {
  process.exit(1);
}); 