/**
 * 控制手柄拖动处理工具
 */
export function createControlHandleDragHandler(options) {
  const {
    getPointsArray, // 函数，返回 Vue 组件中的 this.points 数组
    getSvgContainer, // 函数，返回 SVG.js 的 draw 对象或其 DOM 节点
    onDragStart,    // (mainPointIndex, handleType) => void
    onDrag,         // (mainPointIndex, handleType, newX, newY) => void
    onDragEnd,      // (mainPointIndex, handleType) => void
    isEditModeActive, // 函数，检查是否处于编辑模式
    getDragBoundaries // <-- Add getDragBoundaries
  } = options;

  let isDragging = false;
  let activeMainPointIndex = -1; // 被拖动手柄所属的主锚点索引
  let activeHandleType = null;   // 'cp1' 或 'cp2'
  
  let initialMousePos = { x: 0, y: 0 }; // 鼠标按下时的位置 (相对于屏幕)
  let initialHandlePos = { x: 0, y: 0 }; // 控制手柄在拖动开始时的位置 (SVG坐标系)
  
  // 记录原始的控制点在主锚点上的相对偏移，或其绝对位置
  // 这取决于我们如何更新。如果直接更新绝对位置，这个可能不需要。

  function handleMouseDown(event, mainPointIndex, handleType) {
    if (event.button !== 0) return; // 只响应左键
    if (!isEditModeActive || !isEditModeActive()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation(); // 非常重要，阻止触发其他如图形点选、画布点击等事件

    const points = getPointsArray ? getPointsArray() : null;
    if (!points || mainPointIndex < 0 || mainPointIndex >= points.length) {
      return;
    }
    const mainPoint = points[mainPointIndex];
    if (!mainPoint) {
        return;
    }

    activeMainPointIndex = mainPointIndex;
    activeHandleType = handleType;
    isDragging = true;

    initialMousePos = { x: event.clientX, y: event.clientY };

    // 获取控制手柄的当前SVG坐标
    if (handleType === 'cp1' && mainPoint.cp1x != null) {
      initialHandlePos = { x: mainPoint.cp1x, y: mainPoint.cp1y };
    } else if (handleType === 'cp2' && mainPoint.cp2x != null) {
      initialHandlePos = { x: mainPoint.cp2x, y: mainPoint.cp2y };
    } else {
      isDragging = false;
      return;
    }
    

    document.addEventListener('mousemove', handleMouseMove, { capture: true });
    document.addEventListener('mouseup', handleMouseUp, { capture: true });

    if (typeof onDragStart === 'function') {
      onDragStart(activeMainPointIndex, activeHandleType);
    }
  }

  function handleMouseMove(event) {
    if (!isDragging) return;

    event.preventDefault();
    event.stopPropagation();

    const dxScreen = event.clientX - initialMousePos.x;
    const dyScreen = event.clientY - initialMousePos.y;

    // 注意：这里的 dxScreen, dyScreen 是屏幕像素的偏移。
    // 如果SVG有缩放或平移，直接将这个偏移加到SVG坐标上是不准确的。
    // 最简单的情况是SVG 1:1 映射到屏幕像素且无平移。
    // 对于更通用的情况，我们需要将屏幕坐标转换回SVG坐标。
    // 暂时假设SVG是1:1且无复杂变换，或者依赖SVG.js的坐标转换（如果能获取到）
    // 一个更健壮的方法是使用SVG的 CTM (Current Transformation Matrix)
    const svgNode = getSvgContainer ? getSvgContainer().node : null;
    if (svgNode) {
      const svgPoint = svgNode.createSVGPoint();
      svgPoint.x = event.clientX;
      svgPoint.y = event.clientY;
      const transformedPoint = svgPoint.matrixTransform(svgNode.getScreenCTM().inverse());
      let newX = transformedPoint.x;
      let newY = transformedPoint.y;

      // --- Apply drag boundaries ---
      if (typeof getDragBoundaries === 'function') {
        const boundaries = getDragBoundaries();
        if (boundaries) {
          newX = Math.max(boundaries.minX, Math.min(boundaries.maxX, newX));
          newY = Math.max(boundaries.minY, Math.min(boundaries.maxY, newY));
        }
      }
      // --- End apply drag boundaries ---

      // Update the handle's visual position (optional, can be handled by parent update)
      // currentHandleElement.center(newX, newY);

      // Call the onDrag callback provided by the parent component
      if (typeof onDrag === 'function') {
        onDrag(activeMainPointIndex, activeHandleType, newX, newY);
      }
    } else {
      // 简化处理：直接用屏幕偏移量，这在简单场景下可能够用
      // 或者，如果 initialHandlePos 是准确的SVG坐标，那么 newX = initialHandlePos.x + dxScreen
      // 这个假设是屏幕上的1px移动等于SVG坐标系中的1单位移动
      const newX = initialHandlePos.x + dxScreen;
      const newY = initialHandlePos.y + dyScreen;

      // --- Apply drag boundaries ---
      if (typeof getDragBoundaries === 'function') {
        const boundaries = getDragBoundaries();
        if (boundaries) {
          newX = Math.max(boundaries.minX, Math.min(boundaries.maxX, newX));
          newY = Math.max(boundaries.minY, Math.min(boundaries.maxY, newY));
        }
      }
      // --- End apply drag boundaries ---

      // Update the handle's visual position (optional, can be handled by parent update)
      // currentHandleElement.center(newX, newY);

      // Call the onDrag callback provided by the parent component
      if (typeof onDrag === 'function') {
        onDrag(activeMainPointIndex, activeHandleType, newX, newY);
      }
    }
  }

  function handleMouseUp(event) {
    if (!isDragging) return;

    event.preventDefault();
    event.stopPropagation();

    document.removeEventListener('mousemove', handleMouseMove, { capture: true });
    document.removeEventListener('mouseup', handleMouseUp, { capture: true });

    if (typeof onDragEnd === 'function') {
      onDragEnd(activeMainPointIndex, activeHandleType);
    }

    isDragging = false;
    activeMainPointIndex = -1;
    activeHandleType = null;
  }

  function destroy() {
    document.removeEventListener('mousemove', handleMouseMove, { capture: true });
    document.removeEventListener('mouseup', handleMouseUp, { capture: true });
    isDragging = false;
  }

  return {
    handleMouseDown,
    isDragging: () => isDragging,
    destroy,
  };
} 