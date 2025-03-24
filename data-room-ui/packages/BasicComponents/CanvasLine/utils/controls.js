/**
 * 处理Canvas线条组件的控制点相关功能
 */

/**
 * 清除所有控制点
 * @returns {Array} 空数组
 */
export function clearControlPoints() {
  return [];
}

/**
 * 更新控制点
 * @param {Array} points - 路径点
 * @param {Object} ctx - Canvas上下文
 * @returns {Array} 控制点数组
 */
export function updateControlPoints(points, ctx) {
  // Canvas版本中，控制点直接在绘制时处理，不需要单独管理
  return [];
}

/**
 * 获取渲染组件
 * @param {Object} component - 当前组件
 * @returns {Object} 渲染组件
 */
export function getRenderComponent(component) {
  let parent = component.$parent;
  while (parent) {
    if (parent.$options.name === 'BigScreenDesign') {
      return parent;
    }
    parent = parent.$parent;
  }
  return null;
}

/**
 * 从配置中初始化点数组
 * @param {Object} config 组件配置
 * @returns {Array} 点数组
 */
export function initPointsFromConfig(config) {
  // 如果配置中已有点数组，直接使用
  if (config.customize && Array.isArray(config.customize.points) && config.customize.points.length >= 2) {
    // 深拷贝点数组，避免直接修改配置
    return JSON.parse(JSON.stringify(config.customize.points));
  }
  
  // 否则创建默认点数组
  return [
    { x: config.w * 0.2, y: config.h * 0.5 },
    { x: config.w * 0.8, y: config.h * 0.5 }
  ];
}

/**
 * 保存点数组到配置
 * @param {Array} points 点数组
 * @param {Object} config 组件配置
 * @returns {Object} 更新后的配置
 */
export function savePoints(points, config) {
  if (!points || points.length < 2) return config;
  
  // 创建新的配置对象
  const newConfig = { ...config };
  
  // 确保customize对象存在
  if (!newConfig.customize) {
    newConfig.customize = {};
  }
  
  // 保存点数组
  newConfig.customize.points = JSON.parse(JSON.stringify(points));
  
  return newConfig;
}