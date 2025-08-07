/**
 * 处理SVG线条组件的事件相关功能
 * 包括鼠标事件处理、点击处理等
 */

/**
 * 处理鼠标移动事件
 * @param {Object} e - 鼠标事件对象
 * @param {boolean} isDragging - 是否正在拖拽
 * @param {number} draggedPointIndex - 被拖拽点的索引
 * @param {Object} dragStartPos - 拖拽开始位置
 * @param {Array} points - 点集合
 * @param {Object} config - 组件配置
 * @param {function} updatePathFn - 更新路径的函数
 * @param {Array} circles - 控制点集合
 * @param {function} throttledCheckAndAdjustSizeFn - 节流后的调整大小函数
 * @returns {Object} 更新后的状态
 */
export function handleMouseMove(e, isDragging, draggedPointIndex, dragStartPos, points, config, updatePathFn, circles, throttledCheckAndAdjustSizeFn) {
  if (!isDragging || draggedPointIndex === -1) return {
    points,
    dragStartPos
  };

  const dx = e.clientX - dragStartPos.x;
  const dy = e.clientY - dragStartPos.y;

  const newDragStartPos = {
    x: e.clientX,
    y: e.clientY
  };

  const point = points[draggedPointIndex];
  let newX = point.x + dx;
  let newY = point.y + dy;

  // 获取画布边界限制
  const containerX = config.x;
  const containerY = config.y;
  
  // 画布宽高（默认值）
  const canvasWidth = 1920;
  const canvasHeight = 1080;
  
  // 常量定义
  const POINT_RADIUS = 7; // 控制点半径（圆形直径为14，所以半径为7）
  const MIN_PADDING = 20; // 安全边距，确保点不会超出画布边界

  // 计算绝对坐标（相对于画布）
  const absoluteX = containerX + newX;
  const absoluteY = containerY + newY;

  // 限制点不超出画布边界，但允许点超出容器边界以触发容器自动扩大
  if (absoluteX < POINT_RADIUS + MIN_PADDING) {
    // 确保点不会超出画布左边缘
    newX = Math.max(-containerX + MIN_PADDING, 0);
  } 
  // 当点靠近画布右边缘时
  else if (absoluteX > canvasWidth - POINT_RADIUS - MIN_PADDING) {
    // 确保点不会超出画布右边缘
    newX = Math.min(canvasWidth - containerX - POINT_RADIUS - MIN_PADDING, config.w * 2); // 允许超出容器
  }

  // 当点靠近画布上边缘时
  if (absoluteY < POINT_RADIUS + MIN_PADDING) {
    // 确保点不会超出画布上边缘
    newY = Math.max(-containerY + MIN_PADDING, 0);
  } 
  // 当点靠近画布下边缘时
  else if (absoluteY > canvasHeight - POINT_RADIUS - MIN_PADDING) {
    // 确保点不会超出画布下边缘
    newY = Math.min(canvasHeight - containerY - POINT_RADIUS - MIN_PADDING, config.h * 2); // 允许超出容器
  }
  
  // 复制点数组并更新拖拽的点
  const newPoints = [...points];
  newPoints[draggedPointIndex] = { x: newX, y: newY };

  // 更新控制点位置
  if (circles && circles[draggedPointIndex]) {
    circles[draggedPointIndex].center(newX, newY);
  }
  
  // 调用更新路径函数
  if (updatePathFn) {
    updatePathFn();
  }
  
  // 调用节流后的调整大小函数
  if (throttledCheckAndAdjustSizeFn) {
    throttledCheckAndAdjustSizeFn();
  }

  return {
    points: newPoints,
    dragStartPos: newDragStartPos
  };
}

/**
 * 处理鼠标抬起事件
 * @param {boolean} isDragging - 是否正在拖拽
 * @param {Array} points - 点集合
 * @param {Object} config - 组件配置
 * @param {function} adjustContainerSizeFn - 调整容器大小的函数
 * @param {function} savePointsFn - 保存点位置的函数
 * @param {function} updatePathFn - 更新路径的函数
 * @param {function} updateControlPointsFn - 更新控制点的函数
 * @returns {Object} 更新后的状态
 */
export function handleMouseUp(isDragging, points, config, adjustContainerSizeFn, savePointsFn, updatePathFn, updateControlPointsFn) {
  
  if (!isDragging) return {
    isDragging: false,
    draggedPointIndex: -1,
    justFinishedDragging: false
  };

  // 调用实时调整大小的函数
  if (adjustContainerSizeFn) {
    adjustContainerSizeFn();
  }

  // 保存点的位置
  if (savePointsFn) {
    savePointsFn();
  }

  
  // 标记刚刚完成拖拽，但只持续很短时间（50ms）
  const result = {
    isDragging: false,
    draggedPointIndex: -1,
    justFinishedDragging: true
  };
  
  // 设置一个非常短的定时器，以便快速重置justFinishedDragging标志
  const timeoutId = setTimeout(() => {
    result.justFinishedDragging = false;
  }, 50); // 只等待50毫秒而不是300毫秒
  
  // 将timeoutId添加到结果中，以便调用者可以在组件销毁时清除它
  result.timeoutId = timeoutId;

  return result;
}

/**
 * 处理SVG点击事件
 * @param {Object} event - 鼠标事件对象
 * @param {boolean} isEditing - 是否处于编辑状态
 * @param {boolean} isDragging - 是否正在拖拽
 * @param {boolean} justFinishedDragging - 是否刚完成拖拽
 * @param {Object} svgDraw - SVG绘图对象
 * @param {Array} points - 点集合
 * @param {function} findClickedLineSegmentFn - 查找被点击线段的函数
 * @param {function} getProjectionPointFn - 获取投影点的函数
 * @param {function} updatePathFn - 更新路径的函数
 * @param {function} updateControlPointsFn - 更新控制点的函数
 * @param {function} savePointsFn - 保存点位置的函数
 * @param {function} checkAndAdjustSizeFn - 检查并调整大小的函数
 * @param {function} refreshAnimationFn - 刷新动画的函数
 * @returns {Array} 更新后的点集合
 */
export function handleSvgClick(event, isEditing, isDragging, justFinishedDragging, svgDraw, points, 
                             findClickedLineSegmentFn, getProjectionPointFn, 
                             updatePathFn, updateControlPointsFn, savePointsFn, 
                             checkAndAdjustSizeFn, refreshAnimationFn) {
 
  
  // 如果是右键点击，不添加新点
  if (event.button === 2) {
    return points;
  }

  // 如果不是编辑状态或正在拖拽，不添加新点
  if (!isEditing || isDragging || justFinishedDragging) {
    return points;
  }

  event.stopPropagation();

  // 获取点击位置
  const point = svgDraw.point(event.clientX, event.clientY);
  
  // 复制点数组
  const newPoints = [...points];
  
  // 查找被点击的线段
  const clickedSegmentIndex = findClickedLineSegmentFn(point.x, point.y, points);

  if (clickedSegmentIndex !== -1) {
    const p1 = points[clickedSegmentIndex];
    const p2 = points[clickedSegmentIndex + 1];

    // 获取投影点
    const newPoint = getProjectionPointFn(point.x, point.y, p1, p2);

    // 在点击的线段后插入新点
    newPoints.splice(clickedSegmentIndex + 1, 0, newPoint);
  } else {
    // 在末尾添加新点
    newPoints.push({ x: point.x, y: point.y });
  }

  
  // 更新路径
  if (updatePathFn) {
    updatePathFn();
  }
  
  // 更新控制点
  if (updateControlPointsFn) {
    updateControlPointsFn();
  }
  
  // 保存点位置
  if (savePointsFn) {
    savePointsFn();
  }
  
  // 调整大小
  if (checkAndAdjustSizeFn) {
    checkAndAdjustSizeFn();
  }
  
  // 刷新动画
  if (refreshAnimationFn) {
    refreshAnimationFn();
  }

  return newPoints;
}

/**
 * 删除点
 * @param {number} index - 要删除的点的索引
 * @param {Array} points - 点集合
 * @param {function} updatePathFn - 更新路径的函数
 * @param {function} updateControlPointsFn - 更新控制点的函数
 * @param {function} savePointsFn - 保存点位置的函数
 * @param {function} refreshAnimationFn - 刷新动画的函数
 * @returns {Array} 更新后的点集合
 */
export function deletePoint(index, points, updatePathFn, updateControlPointsFn, savePointsFn, refreshAnimationFn) {
  // 如果点数量不足3个，不允许删除
  if (points.length <= 2) return points;

  // 复制点数组
  const newPoints = [...points];
  // 删除指定点
  newPoints.splice(index, 1);

  // 更新路径
  if (updatePathFn) updatePathFn();
  
  // 更新控制点
  if (updateControlPointsFn) updateControlPointsFn();
  
  // 保存点位置
  if (savePointsFn) savePointsFn();
  
  // 刷新动画
  if (refreshAnimationFn) refreshAnimationFn();

  return newPoints;
}

/**
 * 模拟VDR调整大小
 * @param {Object} vdrInstance - VDR实例
 * @param {string} handle - 调整的手柄
 * @param {Object} distance - 距离
 * @returns {boolean} 调整是否成功
 */
export function simulateVdrResize(vdrInstance, handle, distance) {
  const resizeHandleDown = vdrInstance.handleResizeDown;
  const resizeHandleMove = vdrInstance.handleResizeMove;
  const resizeHandleUp = vdrInstance.handleUp;

  if (!resizeHandleDown || !resizeHandleMove || !resizeHandleUp) {
    return false;
  }

  const mouseDownEvent = new MouseEvent('mousedown', {
    clientX: 0,
    clientY: 0,
    bubbles: true
  });

  resizeHandleDown(mouseDownEvent, handle);

  const mouseMoveEvent = new MouseEvent('mousemove', {
    clientX: distance.x,
    clientY: distance.y,
    bubbles: true
  });

  resizeHandleMove(mouseMoveEvent);

  const mouseUpEvent = new MouseEvent('mouseup', {
    bubbles: true
  });

  resizeHandleUp(mouseUpEvent);

  return true;
}

/**
 * 触发容器调整大小
 * @param {string} direction - 调整方向
 * @param {Object} distance - 距离
 * @param {Object} config - 组件配置
 * @param {function} getRenderComponentFn - 获取渲染组件的函数
 * @param {function} simulateVdrResizeFn - 模拟VDR调整大小的函数
 * @returns {boolean} 是否成功触发
 */
export function triggerContainerResize(direction, distance, config, getRenderComponentFn, simulateVdrResizeFn) {
  const renderComponent = getRenderComponentFn();
  if (!renderComponent) return false;

  const vdrInstances = renderComponent.$refs.draggableItems;
  if (!vdrInstances || !vdrInstances.length) return false;

  const currentVdr = vdrInstances.find(item => item.id === config.code);
  if (!currentVdr) return false;

  let handle = '';
  let adjustedDistance = { x: 0, y: 0 };

  switch (direction) {
    case 'left':
      if (distance.x < 0) {
        handle = 'ml';
        adjustedDistance = distance;
      }
      break;
    case 'right':
      if (distance.x > 0) {
        handle = 'mr';
        adjustedDistance = distance;
      }
      break;
    case 'top':
      if (distance.y < 0) {
        handle = 'tm';
        adjustedDistance = distance;
      }
      break;
    case 'bottom':
      if (distance.y > 0) {
        handle = 'bm';
        adjustedDistance = distance;
      }
      break;
    case 'topLeft':
      if (distance.x < 0 || distance.y < 0) {
        handle = 'tl';
        adjustedDistance = {
          x: distance.x < 0 ? distance.x : 0,
          y: distance.y < 0 ? distance.y : 0
        };
      }
      break;
    case 'topRight':
      if (distance.x > 0 || distance.y < 0) {
        handle = 'tr';
        adjustedDistance = {
          x: distance.x > 0 ? distance.x : 0,
          y: distance.y < 0 ? distance.y : 0
        };
      }
      break;
    case 'bottomLeft':
      if (distance.x < 0 || distance.y > 0) {
        handle = 'bl';
        adjustedDistance = {
          x: distance.x < 0 ? distance.x : 0,
          y: distance.y > 0 ? distance.y : 0
        };
      }
      break;
    case 'bottomRight':
      if (distance.x > 0 || distance.y > 0) {
        handle = 'br';
        adjustedDistance = {
          x: distance.x > 0 ? distance.x : 0,
          y: distance.y > 0 ? distance.y : 0
        };
      }
      break;
  }

  if (handle && simulateVdrResizeFn) {
    return simulateVdrResizeFn(currentVdr, handle, adjustedDistance);
  }

  return false;
} 