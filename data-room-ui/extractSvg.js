const fs = require('fs');
const path = require('path');

// 提取SVG的函数
function extractSvgFromTxt(inputFilePath) {
  // 读取txt文件内容
  const content = fs.readFileSync(inputFilePath, 'utf8');
  
  // 修改正则表达式来匹配内层div中的title属性
  const regex = /<div[^>]*class="drag_item svg-item-div"[^>]*>[\s\S]*?<div[^>]*title="([^"]*)"[^>]*>[\s\S]*?(<svg[\s\S]*?<\/svg>)[\s\S]*?<\/div>[\s\S]*?<\/div>/g;
  
  let match;
  let count = 0;
  const fileNames = new Set(); // 用于跟踪已使用的文件名
  
  // 创建输出目录
  const outputDir = path.join(path.dirname(inputFilePath), 'extracted_svg');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  
  // 逐个匹配并提取
  while ((match = regex.exec(content)) !== null) {
    count++;
    
    // 提取title和SVG内容
    const title = match[1] || `unknown_${count}`;
    const svg = match[2];
    
    // 处理文件名（移除不合法字符）
    let fileName = title.replace(/[\\/:*?"<>|]/g, '_');
    if (!fileName.trim()) {
      fileName = `untitled_${count}`;
    }
    
    // 检查文件名是否重复，如果重复则添加序号
    let baseName = fileName;
    let counter = 1;
    while (fileNames.has(fileName)) {
      fileName = `${baseName}_${counter}`;
      counter++;
    }
    fileNames.add(fileName);
    
    // 保存SVG文件
    const outputFilePath = path.join(outputDir, `${fileName}.svg`);
    fs.writeFileSync(outputFilePath, svg);
    console.log(`已保存: ${outputFilePath}`);
  }
  
  // 如果没有找到匹配，也尝试直接提取SVG
  if (count === 0) {
    console.log('没有找到匹配的嵌套div结构，尝试直接提取SVG...');
    const svgRegex = /<svg[\s\S]*?<\/svg>/g;
    const svgMatches = content.match(svgRegex);
    
    if (!svgMatches) {
      console.log('没有找到SVG内容');
      return;
    }
    
    svgMatches.forEach((svg, index) => {
      const outputFilePath = path.join(outputDir, `svg_${index + 1}.svg`);
      fs.writeFileSync(outputFilePath, svg);
      console.log(`已保存: ${outputFilePath}`);
    });
    
    console.log(`共提取了 ${svgMatches.length} 个SVG文件，保存到 ${outputDir} 目录`);
    return;
  }
  
  console.log(`共提取了 ${count} 个SVG文件，保存到 ${outputDir} 目录`);
}

// 检查命令行参数
if (process.argv.length < 3) {
  console.log('使用方法: node extractSvg.js <txt文件路径>');
  process.exit(1);
}

const inputFilePath = process.argv[2];
extractSvgFromTxt(inputFilePath); 