/**
 * SvgLine 容器调整相关功能
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
  
  let hasChanges = false;
  const updatedConfig = JSON.parse(JSON.stringify(config));
  let updatedPoints = [...points];
  
  // 检查是否需要向左或向上扩展
  if (minX < 20) {
    const deltaX = 20 - minX;
    // 确保不会将容器推出画布左边缘
    const safeXMove = Math.min(deltaX, updatedConfig.x);
    
    // 更新容器位置和大小
    updatedConfig.x = Math.max(0, updatedConfig.x - safeXMove);
    updatedConfig.w += safeXMove;
    
    // 更新点的位置
    updatedPoints = updatedPoints.map(p => ({
      x: p.x + safeXMove,
      y: p.y
    }));
    
    hasChanges = true;
  }
  
  if (minY < 20) {
    const deltaY = 20 - minY;
    // 确保不会将容器推出画布上边缘
    const safeYMove = Math.min(deltaY, updatedConfig.y);
    
    // 更新容器位置和大小
    updatedConfig.y = Math.max(0, updatedConfig.y - safeYMove);
    updatedConfig.h += safeYMove;
    
    // 更新点的位置
    updatedPoints = updatedPoints.map(p => ({
      x: p.x,
      y: p.y + safeYMove
    }));
    
    hasChanges = true;
  }
  
  // 检查是否需要向右或向下扩展
  if (maxX > updatedConfig.w - 20) {
    // 确保不会将容器推出画布右边缘
    const newWidth = maxX + 20;
    
    // 确保容器不会超出画布
    if (updatedConfig.x + newWidth > canvasWidth) {
      // 如果会超出，调整宽度
      updatedConfig.w = Math.min(newWidth, canvasWidth - updatedConfig.x);
    } else {
      updatedConfig.w = newWidth;
    }
    
    hasChanges = true;
  }
  
  if (maxY > updatedConfig.h - 20) {
    // 确保不会将容器推出画布下边缘
    const newHeight = maxY + 20;
    
    // 确保容器不会超出画布
    if (updatedConfig.y + newHeight > canvasHeight) {
      // 如果会超出，调整高度
      updatedConfig.h = Math.min(newHeight, canvasHeight - updatedConfig.y);
    } else {
      updatedConfig.h = newHeight;
    }
    
    hasChanges = true;
  }
  
  return {
    updatedConfig,
    updatedPoints,
    hasChanges
  };
}

/**
 * 调整容器大小（包括缩小）
 * @param {Array} points - 点集合
 * @param {Object} config - 组件配置
 * @returns {Object} 调整后的配置和点集合
 */
export function adjustContainerSize(points, config) {
  const EDGE_PADDING = 25; // 增加边缘填充，确保点不会太靠近边缘

  // 获取点的最大最小坐标
  const xValues = points.map(p => p.x);
  const yValues = points.map(p => p.y);

  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  // 创建配置副本
  const updatedConfig = JSON.parse(JSON.stringify(config));
  let updatedPoints = [...points];
  let hasChanges = false;

  // 处理左侧和顶部（可能需要移动容器位置）
  // 如果容器已经在画布左边缘，或者点已经靠近容器左边缘，则不调整
  if (minX > EDGE_PADDING && updatedConfig.x > 0 && minX > 5) {
    const deltaX = minX - EDGE_PADDING;
    // 确保不会将容器推出画布左边缘
    const safeXMove = Math.min(deltaX, updatedConfig.x);
    
    if (safeXMove > 0) {
      // 更新点的位置
      updatedPoints = updatedPoints.map(p => ({
        x: p.x - safeXMove,
        y: p.y
      }));

      // 更新容器位置和大小
      updatedConfig.x += safeXMove;
      updatedConfig.w -= safeXMove;
      hasChanges = true;
    }
  }

  // 如果容器已经在画布上边缘，或者点已经靠近容器上边缘，则不调整
  if (minY > EDGE_PADDING && updatedConfig.y > 0 && minY > 5) {
    const deltaY = minY - EDGE_PADDING;
    // 确保不会将容器推出画布上边缘
    const safeYMove = Math.min(deltaY, updatedConfig.y);
    
    if (safeYMove > 0) {
      // 更新点的位置
      updatedPoints = updatedPoints.map(p => ({
        x: p.x,
        y: p.y - safeYMove
      }));

      // 更新容器位置和大小
      updatedConfig.y += safeYMove;
      updatedConfig.h -= safeYMove;
      hasChanges = true;
    }
  }

  // 处理右侧和底部（只需要调整大小）
  // 如果点已经靠近容器右边缘，则不调整
  const rightSpace = updatedConfig.w - maxX - EDGE_PADDING;
  if (rightSpace > 0 && updatedConfig.w - maxX > 5) {
    updatedConfig.w -= rightSpace;
    hasChanges = true;
  }

  // 如果点已经靠近容器下边缘，则不调整
  const bottomSpace = updatedConfig.h - maxY - EDGE_PADDING;
  if (bottomSpace > 0 && updatedConfig.h - maxY > 5) {
    updatedConfig.h -= bottomSpace;
    hasChanges = true;
  }

  return {
    updatedConfig,
    updatedPoints,
    hasChanges
  };
}

/**
 * 节流函数
 * @param {Function} fn - 需要节流的函数
 * @param {Number} delay - 延迟时间（毫秒）
 * @returns {Function} 节流后的函数
 */
export function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
} 