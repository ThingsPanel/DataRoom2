import { getAvailableIcons, getIconCategory } from './svgLoader';

/**
 * 多级分类结构定义
 * 根据目录结构自动生成图标元数据
 */

// 从文件名和图标目录生成图标元数据
function generateIconMetadataFromFileName(iconFullName) {
  // 解析iconName，格式：category-name
  const parts = iconFullName.split('-');
  if (parts.length < 2) {
    return {
      name: iconFullName,
      path: ['其他'],
      id: iconFullName
    };
  }

  const category = parts[0];
  const iconName = parts.slice(1).join('-');
  
  // 根据目录结构映射中文分类
  let path = [];
  switch(category) {
    case '常用':
      path = ['常用'];
      break;
    case '工程':
      path = ['工程'];
      break;
    case 'IT&互联网':
      path = ['IT&互联网'];
      break;
    case '智慧城市':
      path = ['智慧城市'];
      break;
    case '电力':
      path = ['电力'];
      break;
    case '能源':
      path = ['能源'];
      break;
    case 'actions':
      path = ['操作类'];
      break;
    case 'arrows':
      path = ['箭头类'];
      break;
    default:
      path = ['其他'];
  }

  // 生成更人性化的显示名称
  let displayName = iconName.replace(/-/g, ' ');
  // 首字母大写
  displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

  return {
    name: displayName,
    path: path,
    id: iconFullName
  };
}

// 预定义的图标元数据，可以覆盖自动生成的元数据
const predefinedIconMetadata = {
  // 操作类图标
  'actions-check': {
    name: '勾选',
    path: ['操作类'],
    id: 'actions-check'
  },
  'actions-close': {
    name: '关闭',
    path: ['操作类'],
    id: 'actions-close'
  },
  'actions-edit': {
    name: '编辑',
    path: ['操作类'],
    id: 'actions-edit'
  },
  'actions-delete': {
    name: '删除',
    path: ['操作类'],
    id: 'actions-delete'
  },
  
  // 箭头类图标
  'arrows-left': {
    name: '左箭头',
    path: ['箭头类'],
    id: 'arrows-left'
  },
  'arrows-right': {
    name: '右箭头',
    path: ['箭头类'],
    id: 'arrows-right'
  },
  'arrows-up': {
    name: '上箭头',
    path: ['箭头类'],
    id: 'arrows-up'
  },
  'arrows-down': {
    name: '下箭头',
    path: ['箭头类'],
    id: 'arrows-down'
  },
  
  // 电力类图标示例
  '电力-总览': {
    name: '电力总览',
    path: ['电力', '概览'],
    id: '电力-总览'
  },
  '电力-变压器': {
    name: '变压器',
    path: ['电力', '设备'],
    id: '电力-变压器'
  },
  '电力-火电-发电机': {
    name: '火电发电机',
    path: ['电力', '火电', '设备'],
    id: '电力-火电-发电机'
  },
  
  // 能源类图标示例
  '能源-石油': {
    name: '石油',
    path: ['能源', '化石能源'],
    id: '能源-石油'
  }
};

// 导出图标列表，基于svgLoader中的可用图标和元数据定义
export const iconList = getAvailableIcons().map(iconName => {
  // 如果有预定义的元数据，使用预定义的
  if (predefinedIconMetadata[iconName]) {
    return predefinedIconMetadata[iconName];
  }
  
  // 否则，根据文件名生成元数据
  return generateIconMetadataFromFileName(iconName);
}).filter(icon => !!icon); // 过滤掉无效图标

/**
 * 生成分类树结构
 * @returns {Array} 分类树结构
 */
export function generateCategoryTree() {
  const tree = [];
  const categoryMap = {};
  
  // 构建分类树
  iconList.forEach(icon => {
    let currentLevel = tree;
    const path = icon.path || ['其他'];
    
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

// 导出分类树和分类映射
const { tree: categoryTree, categoryMap } = generateCategoryTree();
export const categoryHierarchy = categoryTree;
export const categoriesMap = categoryMap; 