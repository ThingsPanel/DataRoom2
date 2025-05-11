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
 * @returns {Object} 拖动处理器对象
 */
export function createPointDragHandler(options) {
  const {
    onDragStart,
    onDrag,
    onDragEnd,
    isOverallEditModeActive,
    getCtrlKeyState,
    updateLine,
    updatePathsData
  } = options;

  let isDragging = false;
  let draggedPointIndex = -1;
  let points = [];
  let svgContainer = null;
  let initialMousePos = { x: 0, y: 0 };
  let initialPointPos = { x: 0, y: 0 };

  /**
   * 处理点的鼠标按下事件
   * @param {Event} event - 鼠标事件
   * @param {number} index - 点的索引
   * @param {Array} currentPoints - 当前所有点
   */
  function handlePointMouseDown(event, index, currentPoints) {
    console.log('PointDragHandler: handlePointMouseDown triggered for point index:', index);

    const editModeActive = typeof isOverallEditModeActive === 'function' && isOverallEditModeActive();
    if (!editModeActive) {
      console.log('PointDragHandler DEBUG: Not in edit mode. Aborting drag.');
      return;
    }

    if (event.button !== 0) {
      console.log('PointDragHandler DEBUG: Not left mouse button. Aborting drag.');
      return;
    }

    let ctrlKeyState = false;
    if (typeof getCtrlKeyState === 'function') {
      ctrlKeyState = getCtrlKeyState();
    }
    
    console.log(
      'PointDragHandler STATE CHECK --- isEditMode:', editModeActive, 
      'ctrlKeyState (from prop):', ctrlKeyState
    );

    console.log('PointDragHandler PRE-CONDITION CHECK for Ctrl: ctrlKeyState is', ctrlKeyState);
    if (ctrlKeyState) { // If true (Ctrl is considered pressed)
      console.log('PointDragHandler DEBUG: Ctrl IS considered pressed (ctrlKeyState=true). Aborting drag.');
      return;
    } else { // If false (Ctrl is considered NOT pressed)
      console.log('PointDragHandler DEBUG: Ctrl IS NOT considered pressed (ctrlKeyState=false). Proceeding with drag.');
      console.log('PointDragHandler INFO: All checks passed. Proceeding with drag setup.');

      if (!svgContainer) {
        const pointElement = currentPoints[index]?.element;
        if (pointElement && pointElement.doc) {
          svgContainer = pointElement.doc();
        } else {
          console.error('PointDragHandler ERROR: Could not find SVG container.');
          return;
        }
      }
      draggedPointIndex = index;
      points = [...currentPoints];
      isDragging = true; 
      initialMousePos = { x: event.clientX, y: event.clientY };
      const currentPoint = points[index];
      const element = currentPoint.element;
      if (element && typeof element.cx === 'function') {
        initialPointPos = { x: element.cx(), y: element.cy() };
      } else if (currentPoint && typeof currentPoint.x === 'number' && typeof currentPoint.y === 'number') {
        initialPointPos = { x: currentPoint.x, y: currentPoint.y };
      } else {
        console.error('PointDragHandler ERROR: Could not get initial point position.');
        isDragging = false;
        return;
      }
      console.log('PointDragHandler INFO: Drag setup complete. Initial mouse:', initialMousePos, 'Initial point:', initialPointPos);
      document.addEventListener('mousemove', handleMouseMove, { capture: true });
      document.addEventListener('mouseup', handleMouseUp, { capture: true });
      if (typeof onDragStart === 'function') {
        onDragStart(index, points[index]);
      }
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * 处理鼠标移动
   * @param {Event} event - 鼠标事件
   */
  function handleMouseMove(event) {
    if (!isDragging || draggedPointIndex === -1) return;
    
    let isCtrlDuringDrag = false;
    if (typeof getCtrlKeyState === 'function') {
      isCtrlDuringDrag = getCtrlKeyState();
    }
    if (isCtrlDuringDrag) {
      console.log('PointDragHandler DEBUG: Ctrl key pressed (getCtrlKeyState) during mouse move. Stopping drag.');
      handleMouseUp(event); 
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    // 计算鼠标移动的绝对位置
    const currentMousePos = {
      x: event.clientX,
      y: event.clientY
    };
    
    // 计算鼠标的总移动距离（相对于拖动开始时的位置）
    const totalDeltaX = currentMousePos.x - initialMousePos.x;
    const totalDeltaY = currentMousePos.y - initialMousePos.y;
    
    console.log('鼠标当前位置:', currentMousePos);
    console.log('鼠标总移动距离:', totalDeltaX, totalDeltaY);

    // 确保点元素存在
    if (!points[draggedPointIndex] || !points[draggedPointIndex].element) {
      console.error('无法找到拖动点元素');
      return;
    }

    try {
      // 获取当前点和元素
      const point = points[draggedPointIndex];
      const element = point.element;
      
      // 计算新的点位置（基于初始位置 + 总移动距离）
      const newX = initialPointPos.x + totalDeltaX;
      const newY = initialPointPos.y + totalDeltaY;
      
      console.log('新位置:', newX, newY);

      // 更新点元素位置
      if (typeof element.center === 'function') {
        // 使用center方法
        element.center(newX, newY);
      } else if (typeof element.cx === 'function') {
        // 使用cx/cy方法
        element.cx(newX).cy(newY);
      } else {
        // 使用move方法（需要计算左上角坐标）
        const radius = element.width() / 2;
        element.move(newX - radius, newY - radius);
      }
      
      // 更新点数据
      point.x = newX;
      point.y = newY;
      
      // 重要：立即更新线段，确保在拖动过程中线段跟随点移动
      if (typeof updateLine === 'function') {
        updateLine();
      }

      // 通知拖动回调
      if (typeof onDrag === 'function') {
        onDrag(draggedPointIndex, point, totalDeltaX, totalDeltaY);
      }
    } catch (err) {
      console.error('拖动点发生错误:', err);
    }
  }

  /**
   * 处理鼠标松开
   * @param {Event} event - 鼠标事件
   */
  function handleMouseUp(event) {
    if (!isDragging) return;

    // 防止事件冒泡
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log('拖动结束 - 索引:', draggedPointIndex);
    
    // 保存当前拖动点的索引
    const index = draggedPointIndex;
    
    // 重置拖动状态
    isDragging = false;
    draggedPointIndex = -1;
    initialMousePos = { x: 0, y: 0 };
    initialPointPos = { x: 0, y: 0 };

    // 移除事件监听
    document.removeEventListener('mousemove', handleMouseMove, { capture: true });
    document.removeEventListener('mouseup', handleMouseUp, { capture: true });

    // 更新路径数据
    if (typeof updatePathsData === 'function') {
      updatePathsData();
    }

    // 调用拖动结束回调
    if (typeof onDragEnd === 'function') {
      onDragEnd(index);
    }
  }

  /**
   * 清理资源
   */
  function destroy() {
    document.removeEventListener('mousemove', handleMouseMove, { capture: true });
    document.removeEventListener('mouseup', handleMouseUp, { capture: true });
    isDragging = false;
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