/**
 * SVG图标扫描工具
 * 此脚本用于扫描icons目录并生成可用图标清单
 * 运行方式: node scanIcons.js
 */

const fs = require('fs');
const path = require('path');

// 图标目录路径
const ICONS_DIR = path.resolve(__dirname, 'icons');
// 输出文件路径
const OUTPUT_FILE = path.resolve(__dirname, 'iconsManifest.json');
// 图标预览HTML生成路径
const PREVIEW_FILE = path.resolve(__dirname, 'iconsPreview.html');

// 递归扫描目录
function scanDirectory(dir) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      // 递归扫描子目录
      const subResults = scanDirectory(fullPath);
      results.push(...subResults);
    } else if (item.isFile() && item.name.endsWith('.svg')) {
      // 读取SVG文件
      try {
        // 使用相对路径
        const relativePath = path.relative(ICONS_DIR, fullPath).replace(/\\/g, '/');
        const category = path.dirname(relativePath) !== '.' ? path.dirname(relativePath) : '';
        const iconName = item.name.replace('.svg', '');
        
        // 简化的数据结构，只保留分类和名称
        results.push({
          category: category || '常用',
          name: iconName
        });
      } catch (err) {
      }
    }
  }
  
  return results;
}

// 生成HTML预览
function generatePreviewHtml(icons) {
  const categorizedIcons = {};
  
  // 按分类组织图标
  icons.forEach(icon => {
    const category = icon.category;
    if (!categorizedIcons[category]) {
      categorizedIcons[category] = [];
    }
    categorizedIcons[category].push(icon);
  });
  
  let html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SVG图标库预览</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
    .category {
      margin-bottom: 30px;
    }
    .category-title {
      font-size: 18px;
      font-weight: bold;
      padding: 10px;
      background-color: #f5f5f5;
      border-radius: 5px;
      margin-bottom: 15px;
    }
    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 15px;
    }
    .icon-item {
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .icon-preview {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
    .icon-preview svg {
      max-width: 100%;
      max-height: 100%;
    }
    .icon-name {
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
    .stats {
      text-align: center;
      margin-bottom: 20px;
      color: #666;
    }
  </style>
</head>
<body>
  <h1>SVG图标库预览</h1>
  <div class="stats">
    共找到 ${icons.length} 个图标，分布在 ${Object.keys(categorizedIcons).length} 个分类中
  </div>
`;

  // 添加每个分类的图标
  Object.entries(categorizedIcons).forEach(([category, categoryIcons]) => {
    html += `
  <div class="category">
    <div class="category-title">${category} (${categoryIcons.length}个)</div>
    <div class="icon-grid">
`;
    
    categoryIcons.forEach(icon => {
      const iconPath = `${icon.category}/${icon.name}.svg`.replace(/^\//, '');
      html += `
      <div class="icon-item">
        <div class="icon-preview">
          <img src="icons/${iconPath}" alt="${icon.name}" style="max-width:100%; max-height:100%;">
        </div>
        <div class="icon-name">${icon.name}</div>
      </div>
`;
    });
    
    html += `
    </div>
  </div>
`;
  });
  
  html += `
</body>
</html>
`;
  
  return html;
}

// 主函数
function main() {
  
  try {
    // 检查图标目录是否存在
    if (!fs.existsSync(ICONS_DIR)) {
      return;
    }
    
    // 扫描图标
    const icons = scanDirectory(ICONS_DIR);
    
    if (icons.length === 0) {
      return;
    }
    
    // 输出JSON清单
    fs.writeFileSync(
      OUTPUT_FILE,
      JSON.stringify(icons, null, 2),
      'utf8'
    );

    // 生成HTML预览
    const previewHtml = generatePreviewHtml(icons);
    fs.writeFileSync(PREVIEW_FILE, previewHtml, 'utf8');
    
    // 输出统计信息
    const categories = [...new Set(icons.map(icon => icon.category))];
    categories.forEach(category => {
      const count = icons.filter(icon => icon.category === category).length;
    });
    
  } catch (error) {
  }
}

// 执行主函数
main(); 