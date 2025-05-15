/**
 * 图标列表管理
 * 从iconsManifest.json加载图标数据
 */

// 导入清单文件
let iconManifest = [];
try {
  iconManifest = require('./iconsManifest.json');
  console.log(`成功加载图标清单，包含 ${iconManifest.length} 个图标`);
} catch (e) {
  console.warn('无法加载图标清单，可能需要先运行 scanIcons.js');
  iconManifest = [];
}

// 处理图标数据，生成更友好的结构
const processIconData = (icon) => {
  if (!icon || !icon.id) return null;
  
  // 处理分类路径
  const pathParts = icon.category ? icon.category.split('\\') : ['常用'];
  
  // 生成显示名称
  const displayName = icon.name || '';
  
  return {
    name: displayName,
    path: pathParts,
    id: icon.id,
    category: icon.category || '常用'
  };
};

// 生成图标列表
export const iconList = iconManifest
  .map(processIconData)
  .filter(Boolean);

/**
 * 生成分类树结构
 * @returns {Object} 包含树结构和分类映射的对象
 */
export function generateCategoryTree() {
  const tree = [];
  const categoryMap = {};
  
  // 构建分类树
  iconList.forEach(icon => {
    let currentLevel = tree;
    const path = icon.path || ['常用'];
    
    // 遍历路径创建或查找节点
    for (let i = 0; i < path.length; i++) {
      const categoryName = path[i];
      const isLeaf = i === path.length - 1;
      const fullPath = path.slice(0, i + 1).join('-');
      
      // 如果该层级下没有这个分类，创建它
      let foundCategory = currentLevel.find(item => item.name === categoryName);
      if (!foundCategory) {
        foundCategory = {
          name: categoryName,
          value: fullPath,
          children: [],
          icons: []
        };
        currentLevel.push(foundCategory);
        categoryMap[fullPath] = foundCategory;
      }
      
      // 如果是叶子节点，添加图标到该分类
      if (isLeaf) {
        foundCategory.icons.push(icon);
      }
      
      // 更新当前层级为下一层
      currentLevel = foundCategory.children;
    }
  });
  
  return { tree, categoryMap };
}

// 生成分类树和映射
const { tree: categoryTree, categoryMap } = generateCategoryTree();
export const categoryHierarchy = categoryTree;
export const categoriesMap = categoryMap;

// 导出默认对象
export default {
  iconList,
  categoryHierarchy,
  categoriesMap,
  generateCategoryTree
};
