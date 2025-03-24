/**
 * CanvasLine 事件处理相关功能
 */

// 这些函数在组件内部直接实现，这里只提供空的接口保持一致性

/**
 * 处理鼠标移动事件
 */
export function handleMouseMove() {
  // 在组件内部实现
}

/**
 * 处理鼠标抬起事件
 */
export function handleMouseUp() {
  // 在组件内部实现
}

/**
 * 处理画布点击事件
 */
export function handleCanvasClick() {
  // 在组件内部实现
}

/**
 * 删除点
 * @param {Number} index - 要删除的点的索引
 * @param {Array} points - 点数组
 * @returns {Array} 更新后的点数组
 */
export function deletePoint(index, points) {
  if (!points || points.length <= 2 || index < 0 || index >= points.length) {
    return points;
  }
  
  const newPoints = [...points];
  newPoints.splice(index, 1);
  return newPoints;
}