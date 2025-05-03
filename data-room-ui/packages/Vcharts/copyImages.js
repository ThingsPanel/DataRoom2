const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'classified_charts');
const targetDir = path.join(__dirname, 'images');

// 确保目标目录存在
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 遍历源目录
function copyAndRenameImages(dir) {
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 递归处理子目录
      copyAndRenameImages(fullPath);
    } else if (isImageFile(item)) {
      // 处理图片文件
      // 直接在根目录添加V前缀
      const newName = 'V' + item;
      const targetFile = path.join(targetDir, newName);

      // 复制文件
      fs.copyFileSync(fullPath, targetFile);
      console.log(`Copied: ${fullPath} -> ${targetFile}`);
    }
  });
}

// 检查是否是图片文件
function isImageFile(filename) {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

// 执行复制任务
copyAndRenameImages(sourceDir);
console.log('所有图片文件已复制完成！');
