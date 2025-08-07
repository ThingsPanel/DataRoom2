/**
 * 处理SVG线条组件的控制点相关功能
 */

/**
 * 清除所有控制点
 * @param {Array} circles - 控制点数组
 * @returns {Array} 空数组
 */
export function clearControlPoints(circles) {
  if (Array.isArray(circles)) {
    circles.forEach(circle => {
      if (circle && typeof circle.remove === 'function') {
        circle.remove();
      }
    });
  }
  return [];
}

/**
 * 创建并更新控制点
 * @param {Array} points - 点数组
 * @param {boolean} selected - 是否选中
 * @param {Object} svgDraw - SVG绘图对象
 * @param {Object} config - 组件配置
 * @param {function} deletePointFn - 删除点的函数
 * @param {function} getRenderComponentFn - 获取渲染组件的函数
 * @param {function} onMouseDownHandlerFn - 鼠标按下事件处理函数
 * @returns {Array} 控制点数组
 */
export function updateControlPoints(points, selected, svgDraw, config, deletePointFn, getRenderComponentFn, onMouseDownHandlerFn) {
  // 检查是否处于预览模式
  const isPreviewMode = isInPreviewMode(getRenderComponentFn);
  
  // 如果是预览模式或未选中，则不显示控制点
  if (isPreviewMode || !selected) return [];
  
  const circles = [];
  
  points.forEach((point, index) => {
    // 创建控制点 (圆形)
    const circle = createControlPoint(svgDraw, point, index, points, deletePointFn, getRenderComponentFn, onMouseDownHandlerFn, config);
    circles.push(circle);
  });
  
  return circles;
}

/**
 * 创建单个控制点
 * @param {Object} svgDraw - SVG绘图对象
 * @param {Object} point - 点坐标
 * @param {number} index - 点索引
 * @param {Array} points - 所有点数组
 * @param {function} deletePointFn - 删除点的函数
 * @param {function} getRenderComponentFn - 获取渲染组件的函数
 * @param {function} onMouseDownHandlerFn - 鼠标按下事件处理函数
 * @param {Object} config - 组件配置
 * @returns {Object} 控制点对象
 */
function createControlPoint(svgDraw, point, index, points, deletePointFn, getRenderComponentFn, onMouseDownHandlerFn, config) {
  // 创建控制点圆形
  const circle = svgDraw.circle(14) // 点尺寸为14
    .center(point.x, point.y)
    .fill('#1890ff')
    .stroke({ color: '#fff', width: 2 })
    .css('cursor', 'move')
    .attr('touch-action', 'none');

  // 添加鼠标按下事件
  circle.on('mousedown', (e) => {
    e.stopPropagation();

    // 检查是否按下了Ctrl键并且有超过2个点
    if (e.ctrlKey && points.length > 2) {
      if (deletePointFn) {
        deletePointFn(index);
      }
      return;
    }

    // 如果传入的config为空，尝试从renderComponent获取
    let componentConfig = config;
    if (!componentConfig) {
      const renderComponent = getRenderComponentFn && getRenderComponentFn();
      componentConfig = renderComponent && renderComponent.activeItemConfig;
    }
    
    // 获取渲染组件并禁用拖拽
    disableDraggableItem(getRenderComponentFn, componentConfig);

    // 调用鼠标按下处理函数
    if (onMouseDownHandlerFn) {
      onMouseDownHandlerFn(e, index);
    }
  });

  return circle;
}

/**
 * 禁用可拖拽项
 * @param {function} getRenderComponentFn - 获取渲染组件的函数
 * @param {Object} config - 组件配置
 */
function disableDraggableItem(getRenderComponentFn, config) {
  const renderComponent = getRenderComponentFn && getRenderComponentFn();
  if (!renderComponent || !renderComponent.$refs.draggableItems) return;

  const currentVdr = renderComponent.$refs.draggableItems.find(
    item => item.id === config.code
  );

  if (currentVdr) {
    currentVdr.enabled = false;
  }
}

/**
 * 启用可拖拽项
 * @param {function} getRenderComponentFn - 获取渲染组件的函数
 * @param {Object} config - 组件配置
 */
export function enableDraggableItem(getRenderComponentFn, config) {
  const renderComponent = getRenderComponentFn && getRenderComponentFn();
  if (!renderComponent || !renderComponent.$refs.draggableItems) return;

  const currentVdr = renderComponent.$refs.draggableItems.find(
    item => item.id === config.code
  );

  if (currentVdr) {
    currentVdr.enabled = true;
  }
}

/**
 * 检查是否在预览模式
 * @param {function} getRenderComponentFn - 获取渲染组件的函数
 * @returns {boolean} 是否在预览模式
 */
function isInPreviewMode(getRenderComponentFn) {
  const component = getRenderComponentFn && getRenderComponentFn();
  if (!component) return false;

  // 向上查找BigScreenRun组件
  let parent = component;
  while (parent) {
    if (parent.$options && parent.$options.name === 'BigScreenRun') {
      return true;
    }
    parent = parent.$parent;
  }
  
  return false;
}

/**
 * 获取渲染组件
 * @param {Object} component - Vue组件实例
 * @returns {Object|null} 渲染组件或null
 */
export function getRenderComponent(component) {
  let renderComponent = component;
  while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
    renderComponent = renderComponent.$parent;
  }
  return renderComponent || null;
}

/**
 * 初始化点配置
 * @param {Object} config - 组件配置
 * @returns {Array} 初始化的点数组
 */
export function initPointsFromConfig(config) {
  try {
    const configPoints = config.customize?.points;
    if (configPoints && Array.isArray(configPoints) && configPoints.length >= 2) {
      return configPoints.map(p => ({
        x: p.x * config.w,
        y: p.y * config.h
      }));
    } else {
      return [
        { x: config.w * 0.2, y: config.h * 0.5 },
        { x: config.w * 0.8, y: config.h * 0.5 }
      ];
    }
  } catch (error) {
    return [
      { x: config.w * 0.2, y: config.h * 0.5 },
      { x: config.w * 0.8, y: config.h * 0.5 }
    ];
  }
}

/**
 * 保存点位置到配置
 * @param {Array} points - 点数组
 * @param {Object} config - 组件配置
 * @param {function} emitUpdateConfig - 发送配置更新的函数
 * @param {function} changeChartConfig - 更改图表配置的函数
 */
export function savePoints(points, config, emitUpdateConfig, changeChartConfig) {
  if (!points || points.length < 2) {
    return;
  }

  try {
    // 计算相对点位置
    const relativePoints = points.map(p => ({
      x: Math.round((p.x / config.w) * 1000) / 1000,
      y: Math.round((p.y / config.h) * 1000) / 1000
    }));

    // 创建新配置
    const newConfig = {
      ...config,
      customize: {
        ...config.customize,
        points: relativePoints
      }
    };

    // 标记来源
    newConfig._fromSvgDrag = true;

    // 发送更新
    if (emitUpdateConfig) {
      emitUpdateConfig(newConfig);
    }

    // 更新图表配置
    if (changeChartConfig) {
      changeChartConfig(newConfig);
    }
  } catch (error) {
  }
} 