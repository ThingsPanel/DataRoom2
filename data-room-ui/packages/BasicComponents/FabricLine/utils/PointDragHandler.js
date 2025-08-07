/**
 * 点拖动处理工具
 * 处理点的拖动相关功能
 */

/**
 * 创建点拖动处理器
 * @param {Object} options - 配置项
 * @param {Function} options.onDragStart - 拖动开始回调
 * @param {Function} options.onDrag - 拖动中回调
 * @param {Function} options.onDragEnd - 拖动结束回调
 * @param {Function} options.isOverallEditModeActive - 检查组件是否处于整体编辑模式
 * @param {Function} options.getCtrlKeyState - 新增：获取Ctrl键是否按下的状态函数
 * @param {Function} options.updateLine - 更新线段的函数
 * @param {Function} options.updatePathsData - 更新路径数据的函数
 * @param {Function} options.onContainerResize - 新增：容器尺寸变化时的回调函数
 * @param {Function} [options.onPointClick] - 新增：点被点击时的回调函数 (index)
 * @param {number} [options.dragThreshold=5] - 新增：拖动阈值（像素）
 * @param {Function} options.getDragBoundaries - 新增：获取拖动边界条件的函数
 * @returns {Object} 拖动处理器对象
 */
export function createPointDragHandler(options) {
  const {
    onDragStart,
    onDrag,
    onDragEnd,
    onPointClick,
    isOverallEditModeActive,
    getCtrlKeyState,
    updateLine,
    onContainerResize,
    dragThreshold = 5,
    getDragBoundaries
  } = options;

  let isDragging = false;
  let draggedPointIndex = -1;
  let points = [];
  let svgContainer = null;
  let initialMousePos = { x: 0, y: 0 };
  let initialPointPos = { x: 0, y: 0 };

  let mouseDownPos = { x: 0, y: 0 };
  let mouseDownTime = 0;
  let potentialDrag = false;

  /**
   * 处理点的鼠标按下事件
   * @param {Event} event - 鼠标事件
   * @param {number} index - 点的索引
   * @param {Array} currentPoints - 当前所有点
   */
  function handlePointMouseDown(event, index, currentPoints) {

    const editModeActive = typeof isOverallEditModeActive === 'function' && isOverallEditModeActive();
    if (!editModeActive) {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    let ctrlKeyState = false;
    if (typeof getCtrlKeyState === 'function') {
      ctrlKeyState = getCtrlKeyState();
    }
    
    if (ctrlKeyState) { // If true (Ctrl is considered pressed)
      return;
    } else { // If false (Ctrl is considered NOT pressed)

      // 确保 currentPoints 和 index 有效
      if (!currentPoints || index < 0 || index >= currentPoints.length) {
        return;
      }
      const currentPoint = currentPoints[index];
      if (!currentPoint) {
        return;
      }
      const element = currentPoint.element;
      if (!element) {
        return;
      }


      if (!svgContainer) {
        if (element.root && typeof element.root === 'function') {
          try {
            svgContainer = element.root();

            // 修改类型检查：检查 svgContainer.node.nodeName 是否为 'svg'
            // 并确保 svgContainer 和 svgContainer.node 都存在
            if (!svgContainer || !svgContainer.node || typeof svgContainer.node.nodeName !== 'string' || svgContainer.node.nodeName.toLowerCase() !== 'svg') {
           
              svgContainer = null; // 确保在错误时重置
              return; 
            }
          } catch (e) {
            svgContainer = null;
            return;
          }
        } else {
          return;
        }
      }

      draggedPointIndex = index;
      points = [...currentPoints]; // 确保 points 是一个有效的数组副本
      potentialDrag = true;
      mouseDownPos = { x: event.clientX, y: event.clientY };
      mouseDownTime = Date.now();
      initialMousePos = { x: event.clientX, y: event.clientY };
      
      if (element.cx && typeof element.cx === 'function' && element.cy && typeof element.cy === 'function') {
        initialPointPos = { x: element.cx(), y: element.cy() };
      } else if (typeof currentPoint.x === 'number' && typeof currentPoint.y === 'number') {
        initialPointPos = { x: currentPoint.x, y: currentPoint.y };
      } else {
        isDragging = false; // 重置状态，因为无法开始拖动
        return;
      }
      
      
      document.addEventListener('mousemove', handleMouseMove, { capture: true });
      document.addEventListener('mouseup', handleMouseUp, { capture: true });
      
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * 处理鼠标移动
   * @param {Event} event - 鼠标事件
   */
  function handleMouseMove(event) {
    if (!potentialDrag || draggedPointIndex === -1) return;
    
    let isCtrlDuringDrag = false;
    if (typeof getCtrlKeyState === 'function') {
      isCtrlDuringDrag = getCtrlKeyState();
    }
    if (isCtrlDuringDrag) {
      handleMouseUp(event, true);
      return;
    }

    if (!isDragging) {
      const deltaX = event.clientX - mouseDownPos.x;
      const deltaY = event.clientY - mouseDownPos.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance >= dragThreshold) {
        isDragging = true;
        
        if (typeof onDragStart === 'function') {
          onDragStart(draggedPointIndex, points[draggedPointIndex]);
        }
      } else {
        return; 
      }
    }

    if (!isDragging) return;

    event.preventDefault();
    event.stopPropagation();

    const currentMousePos = {
      x: event.clientX,
      y: event.clientY
    };
    
    const totalDeltaX = currentMousePos.x - initialMousePos.x;
    const totalDeltaY = currentMousePos.y - initialMousePos.y;
    

    if (!points[draggedPointIndex] || !points[draggedPointIndex].element) {
      return;
    }

    try {
      const point = points[draggedPointIndex];
      const element = point.element;
      
      const newX = initialPointPos.x + totalDeltaX;
      const newY = initialPointPos.y + totalDeltaY;
      
      // --- Apply drag boundaries ---
      if (typeof getDragBoundaries === 'function') {
        const boundaries = getDragBoundaries();
        if (boundaries) {
          const clampedX = Math.max(boundaries.minX, Math.min(boundaries.maxX, newX));
          const clampedY = Math.max(boundaries.minY, Math.min(boundaries.maxY, newY));
          point.x = clampedX;
          point.y = clampedY;
        }
      }
      // --- End apply drag boundaries ---
      
      if (typeof element.center === 'function') {
        element.center(point.x, point.y);
      } else if (typeof element.cx === 'function') {
        element.cx(point.x).cy(point.y);
      } else {
        const radius = element.width() / 2;
        element.move(point.x - radius, point.y - radius);
      }
      
      if (svgContainer) {
        const currentSvgWidth = svgContainer.width();
        const currentSvgHeight = svgContainer.height();
        let newSvgWidth = currentSvgWidth;
        let newSvgHeight = currentSvgHeight;
        let containerResized = false;

        if (point.x > currentSvgWidth) {
          newSvgWidth = point.x;
          containerResized = true;
        }
        if (point.y > currentSvgHeight) {
          newSvgHeight = point.y;
          containerResized = true;
        }

        if (containerResized) {
          svgContainer.size(newSvgWidth, newSvgHeight);
          if (typeof onContainerResize === 'function') {
            onContainerResize(newSvgWidth, newSvgHeight);
          }
        }
      }

      if (typeof onDrag === 'function') {
        onDrag(draggedPointIndex, point, totalDeltaX, totalDeltaY);
      }
    } catch (err) {
    }
  }

  /**
   * 处理鼠标松开
   * @param {Event} event - 鼠标事件
   */
  function handleMouseUp(event, isCancel = false) {
    if (!potentialDrag) return;

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const upTime = Date.now();
    const downDuration = upTime - mouseDownTime;
    const deltaX = event ? event.clientX - mouseDownPos.x : 0;
    const deltaY = event ? event.clientY - mouseDownPos.y : 0;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    document.removeEventListener('mousemove', handleMouseMove, { capture: true });
    document.removeEventListener('mouseup', handleMouseUp, { capture: true });

    if (isDragging) {
      if (typeof updatePathsData === 'function') {
        updatePathsData();
      }
      if (typeof onDragEnd === 'function') {
        onDragEnd(draggedPointIndex);
      }
    } else {
      if (distance < dragThreshold && downDuration < 300) {
        if (typeof onPointClick === 'function') {
          onPointClick(draggedPointIndex);
        }
      } else {
      }
    }
    
    isDragging = false;
    potentialDrag = false;
    draggedPointIndex = -1;
    initialMousePos = { x: 0, y: 0 };
    initialPointPos = { x: 0, y: 0 };
    mouseDownPos = { x: 0, y: 0 };
    mouseDownTime = 0;
  }

  /**
   * 清理资源
   */
  function destroy() {
    document.removeEventListener('mousemove', handleMouseMove, { capture: true });
    document.removeEventListener('mouseup', handleMouseUp, { capture: true });
    isDragging = false;
    potentialDrag = false;
    draggedPointIndex = -1;
    points = [];
    svgContainer = null;
  }

  return {
    handlePointMouseDown,
    destroy,
    isDragging: () => isDragging,
    getDraggedPointIndex: () => draggedPointIndex
  };
} 