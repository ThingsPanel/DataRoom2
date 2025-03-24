/**
 * CanvasLine 容器调整相关功能
 */

/**
 * 实时调整容器大小（只处理放大）
 * @param {Array} points - 点集合
 * @param {Object} config - 组件配置
 * @param {Number} canvasWidth - 画布宽度
 * @param {Number} canvasHeight - 画布高度
 * @returns {Object} 调整后的配置和点集合
 */
export function realTimeAdjustSize(points, config, canvasWidth = 1920, canvasHeight = 1080) {
  // 获取点的最大最小坐标
  const xValues = points.map(p => p.x);
  const yValues = points.map(p => p.y);
  
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  
  // 计算当前组件的边界
  const currentLeft = config.x;
  const currentTop = config.y;
  const currentRight = config.x + config.w;
  const currentBottom = config.y + config.h;
  
  // 检查是否需要调整大小
  let needAdjust = false;
  let newLeft = currentLeft;
  let newTop = currentTop;
  let newRight = currentRight;
  let newBottom = currentBottom;
  
  // 检查左边界
  if (minX < 0) {
    newLeft = currentLeft + minX;
    needAdjust = true;
  }
  
  // 检查上边界
  if (minY < 0) {
    newTop = currentTop + minY;
    needAdjust = true;
  }
  
  // 检查右边界
  if (maxX > config.w) {
    newRight = currentLeft + maxX;
    needAdjust = true;
  }
  
  // 检查下边界
  if (maxY > config.h) {
    newBottom = currentTop + maxY;
    needAdjust = true;
  }
  
  // 如果不需要调整，直接返回
  if (!needAdjust) {
    return {
      updatedConfig: config,
      updatedPoints: points,
      hasChanges: false
    };
  }
  
  // 计算新的宽高
  const newWidth = newRight - newLeft;
  const newHeight = newBottom - newTop;
  
  // 确保不超出画布边界
  const finalLeft = Math.max(0, newLeft);
  const finalTop = Math.max(0, newTop);
  const finalRight = Math.min(canvasWidth, newRight);
  const finalBottom = Math.min(canvasHeight, newBottom);
  
  // 计算最终宽高
  const finalWidth = finalRight - finalLeft;
  const finalHeight = finalBottom - finalTop;
  
  // 调整点的位置
  const offsetX = finalLeft - currentLeft;
  const offsetY = finalTop - currentTop;
  
  const updatedPoints = points.map(point => ({
    x: point.x - offsetX,
    y: point.y - offsetY
  }));
  
  // 创建更新后的配置
  const updatedConfig = {
    ...config,
    x: finalLeft,
    y: finalTop,
    w: finalWidth,
    h: finalHeight
  };
  
  return {
    updatedConfig,
    updatedPoints,
    hasChanges: true
  };
}

/**
 * 调整容器大小（处理缩小）
 * @param {Array} points - 点集合
 * @param {Object} config - 组件配置
 * @returns {Object} 调整后的配置和点集合
 */
export function adjustContainerSize(points, config) {
  // 获取点的最大最小坐标
  const xValues = points.map(p => p.x);
  const yValues = points.map(p => p.y);
  
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  
  // 添加边距
  const padding = 10;
  const paddedMinX = Math.max(0, minX - padding);
  const paddedMaxX = maxX + padding;
  const paddedMinY = Math.max(0, minY - padding);
  const paddedMaxY = maxY + padding;
  
  // 计算新的宽高
  const newWidth = paddedMaxX - paddedMinX;
  const newHeight = paddedMaxY - paddedMinY;
  
  // 如果新尺寸与当前尺寸相同，不需要调整
  if (Math.abs(newWidth - config.w) < 1 && Math.abs(newHeight - config.h) < 1) {
    return {
      updatedConfig: config,
      updatedPoints: points,
      hasChanges: false
    };
  }
  
  // 计算新的位置
  const newLeft = config.x + paddedMinX;
  const newTop = config.y + paddedMinY;
  
  // 调整点的位置
  const updatedPoints = points.map(point => ({
    x: point.x - paddedMinX,
    y: point.y - paddedMinY
  }));
  
  // 创建更新后的配置
  const updatedConfig = {
    ...config,
    x: newLeft,
    y: newTop,
    w: newWidth,
    h: newHeight
  };
  
  return {
    updatedConfig,
    updatedPoints,
    hasChanges: true
  };
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {Number} wait - 等待时间
 * @returns {Function} 节流后的函数
 */
export function throttle(func, wait) {
  let timeout = null;
  let previous = 0;
  
  return function() {
    const now = Date.now();
    const remaining = wait - (now - previous);
    const context = this;
    const args = arguments;
    
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(context, args);
      }, remaining);
    }
  };
}