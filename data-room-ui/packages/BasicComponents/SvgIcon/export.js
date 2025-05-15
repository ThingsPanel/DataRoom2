/**
 * 导出SVG图标列表
 * 自动导入icons目录下的所有SVG文件
 */

// 使用require.context自动导入所有SVG文件
const svgFiles = require.context('./icons', true, /\.svg$/)
const iconList = svgFiles.keys()?.map(item => {
  const icon = svgFiles(item)
  // 提取文件名作为图标名
  const pathParts = item.split('/')
  const fileName = pathParts[pathParts.length - 1]
  const iconName = fileName.replace('.svg', '')
  
  return {
    path: item.substring(2), // 去掉开头的 './'
    name: iconName,
    id: item.substring(2).replace(/\//g, '-').replace('.svg', ''),
    component: icon
  }
})

export default {
  // 获取所有图标名称列表
  getNameList() {
    return iconList?.map(item => item.name) || []
  },
  
  // 获取所有图标详细信息
  getAllIcons() {
    return iconList || []
  },
  
  // 根据索引获取图标名称
  getIconByIndex(index) {
    if (index >= 0 && index < iconList.length) {
      return iconList[index].name
    }
    return null
  },
  
  // 根据名称获取图标信息
  getIconByName(name) {
    return iconList?.find(icon => icon.name === name)
  }
} 