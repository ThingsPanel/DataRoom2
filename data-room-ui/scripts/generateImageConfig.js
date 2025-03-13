const fs = require('fs');
const path = require('path');

// 指定要扫描的目录
const imagesDir = path.resolve(__dirname, '../public/static/images');
// 指定输出文件路径
const outputFile = path.resolve(__dirname, '../packages/BigScreenDesign/LocalSourceDialog/imageConfig.js');

// 存储结果
let options = [];
let list = [];
let id = 1;

// 读取目录
const dirs = fs.readdirSync(imagesDir)
  .filter(file => {
    const stat = fs.statSync(path.join(imagesDir, file));
    return stat.isDirectory() && !file.startsWith('.');  // 排除隐藏文件夹
  });

// 生成分组
options = dirs.map((dir, index) => ({
  id: index + 1,
  name: dir,
  code: dir
}));

// 遍历每个目录下的文件
dirs.forEach(dir => {
  const files = fs.readdirSync(path.join(imagesDir, dir))
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.svg', '.png', '.jpg', '.jpeg'].includes(ext) && !file.startsWith('.');  // 排除隐藏文件
    });

  // 为每个文件创建列表项
  files.forEach(file => {
    list.push({
      id: id++,
      name: path.parse(file).name,
      originalName: file,
      url: `/static/images/${dir}/${file}`,
      type: dir
    });
  });
});

// 生成配置代码
const configCode = `// 此文件由脚本自动生成，请勿手动修改
export const imageOptions = ${JSON.stringify(options, null, 2)};

export const imageList = ${JSON.stringify(list, null, 2)};
`;

// 确保目录存在
const dir = path.dirname(outputFile);
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// 将结果写入文件
fs.writeFileSync(outputFile, configCode);

console.log(`已生成配置：
- ${options.length} 个分组
- ${list.length} 个图片
配置已保存到 ${outputFile}`); 