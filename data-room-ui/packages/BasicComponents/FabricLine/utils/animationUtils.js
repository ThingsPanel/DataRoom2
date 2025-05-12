import { SVG } from '@svgdotjs/svg.js';

/**
 * 水滴动画实现
 * @param {Object} draw SVG.js绘图实例
 * @param {Object} pathElement 路径元素
 * @param {Object} config 动画配置
 * @returns {Object} 动画元素和运行器
 */
export function startDropletAnimation(draw, pathElement, config) {
  console.log('AnimationUtils: Starting droplet animation with config:', config);
  
  if (!draw || !pathElement) {
    console.warn('AnimationUtils: Droplet - draw or pathElement is null');
    return { elements: [], runners: [] };
  }

  // 检查是否是 SVG Line 元素
  const isLine = pathElement.type === 'line';
  
  // 获取路径长度和坐标
  let pathLength, x1, y1, x2, y2;
  try {
    if (isLine) {
      x1 = parseFloat(pathElement.attr('x1') || 0);
      y1 = parseFloat(pathElement.attr('y1') || 0);
      x2 = parseFloat(pathElement.attr('x2') || 0);
      y2 = parseFloat(pathElement.attr('y2') || 0);
      pathLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    } else if (typeof pathElement.length === 'function') {
      pathLength = pathElement.length();
    } else {
      return { elements: [], runners: [] };
    }
    
    if (pathLength <= 0 || !isFinite(pathLength)) {
      return { elements: [], runners: [] };
    }
  } catch (err) {
    console.error('AnimationUtils: Droplet - Error getting path info:', err);
    return { elements: [], runners: [] };
  }

  // 创建水滴元素
  const dropletSize = Math.max(2, config.dropletSize || 3);
  const droplet = draw.circle(dropletSize * 2)
    .fill(config.dropletColor || '#40a9ff')
    .opacity(0);

  const animationElements = [droplet];
  const animationRunners = [];

  // 计算动画时长
  const speed = Math.max(0.1, config.animationSpeed || 1);
  const duration = Math.max(500, Math.min(3000, 1000 / speed));

  const animateDroplet = () => {
    // 设置起点
    let startX, startY, endX, endY;
    if (isLine) {
      if (config.animationDirection === 'forward') {
        startX = x1; startY = y1;
        endX = x2; endY = y2;
      } else {
        startX = x2; startY = y2;
        endX = x1; endY = y1;
      }
    } else {
      const startPoint = config.animationDirection === 'forward' ? 
        pathElement.pointAt(0) : pathElement.pointAt(pathLength);
      const endPoint = config.animationDirection === 'forward' ? 
        pathElement.pointAt(pathLength) : pathElement.pointAt(0);
      
      startX = startPoint.x; startY = startPoint.y;
      endX = endPoint.x; endY = endPoint.y;
    }

    // 重置水滴位置
    droplet.center(startX, startY).opacity(1);

    // 创建动画
    const runner = droplet.animate(duration)
      .move(endX - dropletSize, endY - dropletSize)
      .after(function() {
        droplet.opacity(0);
        
        // 如果需要循环，重新开始动画
        if (config.animationLoop) {
          setTimeout(() => {
            const newRunner = animateDroplet();
            if (newRunner) {
              const index = animationRunners.indexOf(runner);
              if (index !== -1) animationRunners.splice(index, 1);
              animationRunners.push(newRunner);
            }
          }, 100);
        }
      });
    
    return runner;
  };

  // 开始动画
  const runner = animateDroplet();
  if (runner) animationRunners.push(runner);

  return { elements: animationElements, runners: animationRunners };
}

/**
 * 流水动画实现 - 流畅版
 * @param {Object} draw SVG.js绘图实例
 * @param {Object} pathElement 路径元素
 * @param {Object} config 动画配置
 * @returns {Object} 动画元素和运行器
 */
export function startFlowAnimation(draw, pathElement, config) {
  console.log('AnimationUtils: Starting flow animation with config:', config);
  
  if (!draw || !pathElement) {
    console.warn('AnimationUtils: Flow - draw or pathElement is null');
    return { elements: [], runners: [] };
  }

  // 获取路径信息
  const isLine = pathElement.type === 'line';
  let pathLength, x1, y1, x2, y2;
  
  try {
    if (isLine) {
      x1 = parseFloat(pathElement.attr('x1') || 0);
      y1 = parseFloat(pathElement.attr('y1') || 0);
      x2 = parseFloat(pathElement.attr('x2') || 0);
      y2 = parseFloat(pathElement.attr('y2') || 0);
      pathLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      console.log('AnimationUtils: Flow - Line coordinates:', { x1, y1, x2, y2, pathLength });
    } else {
      pathLength = pathElement.length();
      console.log('AnimationUtils: Flow - Path length:', pathLength);
    }
    
    if (pathLength <= 0) {
      console.warn('AnimationUtils: Flow - Invalid path length:', pathLength);
      return { elements: [], runners: [] };
    }
  } catch (err) {
    console.error('AnimationUtils: Flow - Error getting path info:', err);
    return { elements: [], runners: [] };
  }

  // 使用CSS动画实现完全流畅的流水效果
  try {
    // 创建两条流水线，错开动画，消除停顿感
    const flowLines = [];
    const animationRunners = [];
    
    // 获取配置
    const speed = Math.max(0.1, config.animationSpeed || 1);
    const flowColor = config.flowColor || '#188df0';
    const flowThickness = Math.max(1, config.flowThickness || 4);
    const isForward = config.animationDirection !== 'backward';
    
    console.log('AnimationUtils: Flow - Using continuous CSS animation');
    
    // 创建两条流水线，错开位置
    for (let i = 0; i < 2; i++) {
      const flowLine = isLine ? 
        draw.line(x1, y1, x2, y2) : 
        pathElement.clone();
      
      flowLines.push(flowLine);
      
      // 设置基本样式
      flowLine.fill('none').stroke({
        color: flowColor,
        width: flowThickness
      });
    }
    
    // 设置虚线样式 - 使用较短的虚线和较大的间隙，提高流畅感
    const dashLength = Math.max(5, Math.min(15, pathLength / 20));
    const gapLength = dashLength * 2;
    const dashPattern = `${dashLength},${gapLength}`;
    const dashArrayLength = dashLength + gapLength;
    
    // 为每条线设置不同的虚线偏移，错开位置
    flowLines[0].stroke({ dasharray: dashPattern });
    flowLines[1].stroke({ 
      dasharray: dashPattern,
      dashoffset: dashArrayLength / 2 // 错开一半的距离
    });
    
    // 计算动画时长 - 速度越大，时长越短
    const duration = Math.max(200, Math.min(2000, 1000 / speed));
    console.log('AnimationUtils: Flow - Animation duration:', duration, 'ms');
    
    // 使用CSS动画实现完全流畅的效果
    const styleElement = document.createElement('style');
    const uniqueId = `flow-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // 为每条线创建唯一ID
    flowLines.forEach((line, index) => {
      line.attr('id', `${uniqueId}-${index}`);
    });
    
    // 创建CSS动画
    const startOffset = isForward ? dashArrayLength : 0;
    const endOffset = isForward ? 0 : dashArrayLength;
    
    styleElement.textContent = `
      @keyframes flowAnimation${uniqueId} {
        from { stroke-dashoffset: ${startOffset}; }
        to { stroke-dashoffset: ${endOffset}; }
      }
      
      #${uniqueId}-0, #${uniqueId}-1 {
        animation: flowAnimation${uniqueId} ${duration}ms linear infinite;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    // 创建控制器
    const controller = {
      cancel: () => {
        // 移除CSS动画
        if (styleElement.parentNode) {
          styleElement.parentNode.removeChild(styleElement);
        }
        
        // 移除流水线
        flowLines.forEach(line => {
          if (line && typeof line.remove === 'function') {
            try { line.remove(); } catch (e) {}
          }
        });
      }
    };
    
    animationRunners.push(controller);
    
    return {
      elements: flowLines,
      runners: animationRunners
    };
  } catch (err) {
    console.error('AnimationUtils: Flow - Error creating continuous flow animation:', err);
    return { elements: [], runners: [] };
  }
}