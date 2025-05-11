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
    updatePathsData,
    onContainerResize
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

      // 确保 currentPoints 和 index 有效
      if (!currentPoints || index < 0 || index >= currentPoints.length) {
        console.error('PointDragHandler ERROR: Invalid currentPoints or index. Index:', index, 'Points length:', currentPoints?.length);
        return;
      }
      const currentPoint = currentPoints[index];
      if (!currentPoint) {
        console.error('PointDragHandler ERROR: currentPoint at index', index, 'is undefined.');
        return;
      }
      const element = currentPoint.element;
      if (!element) {
        console.error('PointDragHandler ERROR: element for currentPoint at index', index, 'is undefined.');
        return;
      }

      console.log('PointDragHandler TRACE: currentPoint and element are valid for index:', index, element);

      if (!svgContainer) {
        console.log('PointDragHandler TRACE: Attempting to get svgContainer from element.root()');
        if (element.root && typeof element.root === 'function') {
          try {
            svgContainer = element.root();
            console.log('PointDragHandler TRACE: element.root() successfully CALLED. Returned:', svgContainer);

            // 修改类型检查：检查 svgContainer.node.nodeName 是否为 'svg'
            // 并确保 svgContainer 和 svgContainer.node 都存在
            if (!svgContainer || !svgContainer.node || typeof svgContainer.node.nodeName !== 'string' || svgContainer.node.nodeName.toLowerCase() !== 'svg') {
              console.error(
                'PointDragHandler ERROR: element.root() did not return a valid SVG Svg wrapper object.',
                'Expected .node.nodeName to be \'svg\'. Got:', svgContainer?.node?.nodeName,
                'Returned object:', svgContainer
              );
              svgContainer = null; // 确保在错误时重置
              return; 
            }
            console.log('PointDragHandler TRACE: svgContainer acquired via element.root() and seems to be a valid SVG wrapper.', svgContainer);
          } catch (e) {
            console.error('PointDragHandler CRITICAL ERROR: Exception during element.root() call.', e);
            console.error('Affected element:', element);
            svgContainer = null;
            return;
          }
        } else {
          console.error('PointDragHandler ERROR: element.root is not a function or does not exist.', element);
          return;
        }
      }

      draggedPointIndex = index;
      points = [...currentPoints]; // 确保 points 是一个有效的数组副本
      isDragging = true; 
      initialMousePos = { x: event.clientX, y: event.clientY };
      
      console.log('PointDragHandler TRACE: Attempting to get initialPointPos. Element:', element);
      if (element.cx && typeof element.cx === 'function' && element.cy && typeof element.cy === 'function') {
        initialPointPos = { x: element.cx(), y: element.cy() };
        console.log('PointDragHandler TRACE: initialPointPos from element.cx/cy:', initialPointPos);
      } else if (typeof currentPoint.x === 'number' && typeof currentPoint.y === 'number') {
        initialPointPos = { x: currentPoint.x, y: currentPoint.y };
        console.log('PointDragHandler TRACE: initialPointPos from currentPoint.x/y data:', initialPointPos);
      } else {
        console.error('PointDragHandler ERROR: Could not get initial point position from element methods or point data.', currentPoint);
        isDragging = false; // 重置状态，因为无法开始拖动
        return;
      }
      
      console.log('PointDragHandler INFO: Drag setup is fully complete. Initial mouse:', initialMousePos, 'Initial point:', initialPointPos);
      
      console.log('PointDragHandler TRACE: Adding mousemove and mouseup listeners to document.');
      document.addEventListener('mousemove', handleMouseMove, { capture: true });
      document.addEventListener('mouseup', handleMouseUp, { capture: true });
      
      if (typeof onDragStart === 'function') {
        console.log('PointDragHandler TRACE: Calling onDragStart callback.');
        onDragStart(index, points[index]); // points[index] 应该是有效的 currentPoint
      }
      
      event.preventDefault();
      event.stopPropagation();
      console.log('PointDragHandler TRACE: handlePointMouseDown finished successfully for drag start.');
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
      
      // ---- 新增：容器尺寸调整逻辑 ----
      if (svgContainer) {
        const currentSvgWidth = svgContainer.width();
        const currentSvgHeight = svgContainer.height();
        let newSvgWidth = currentSvgWidth;
        let newSvgHeight = currentSvgHeight;
        let containerResized = false;

        if (newX > currentSvgWidth) {
          newSvgWidth = newX; // 向右扩展
          containerResized = true;
        }
        if (newY > currentSvgHeight) {
          newSvgHeight = newY; // 向下扩展
          containerResized = true;
        }

        // 注意：目前未处理点被拖到 x < 0 或 y < 0 的情况以进行容器扩展
        // 这需要更复杂的逻辑，例如平移所有SVG元素并调整viewBox

        if (containerResized) {
          svgContainer.size(newSvgWidth, newSvgHeight);
          console.log(`PointDragHandler: Container resized to ${newSvgWidth}x${newSvgHeight}`);
          if (typeof onContainerResize === 'function') {
            onContainerResize(newSvgWidth, newSvgHeight);
          }
        }
      }
      // ---- 结束：容器尺寸调整逻辑 ----

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