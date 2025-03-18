/**
 * SvgLine 动画相关功能
 */

/**
 * 创建流动动画
 * @param {Object} svgDraw - SVG 绘图对象
 * @param {Object} path - 路径对象
 * @param {Object} animation - 动画配置
 * @returns {Object} 包含动画元素和清理函数的对象
 */
export function createFlowAnimation(svgDraw, path, animation) {
  const animationElements = [];
  
  // 使用更小的点来减少渲染负担
  const flowDot = svgDraw.circle(animation.flowLength)
    .fill(animation.flowColor)
    .center(0, 0)
    .opacity(0.8);

  const pathLength = path.length();

  // 优化动画速度计算
  const speedFactor = animation.speed * 0.5; // 增加速度因子
  const baseDuration = Math.max(2000, 10000 / speedFactor); // 降低基础持续时间
  const duration = Math.min(baseDuration, pathLength * 20 / speedFactor); // 限制最大持续时间

  // 使用 requestAnimationFrame 优化动画性能
  let start = null;
  let animationFrameId = null;
  const direction = animation.direction || 'forward';
  let alternateDirection = 1; // 1 表示正向，-1 表示反向
  let lastAlternateTime = 0;

  const animate = (timestamp) => {
    if (!start) start = timestamp;
    // 增加速度因子，使动画更快
    const elapsed = (timestamp - start) * speedFactor;
    
    // 处理交替方向
    if (direction === 'alternate') {
      // 每2秒切换一次方向
      if (timestamp - lastAlternateTime > 2000) {
        alternateDirection *= -1;
        lastAlternateTime = timestamp;
      }
    }
    
    let progress;
    if (direction === 'reverse' || (direction === 'alternate' && alternateDirection === -1)) {
      // 反向动画
      progress = 1 - ((elapsed % duration) / duration);
    } else {
      // 正向动画
      progress = (elapsed % duration) / duration;
    }

    // 计算当前位置
    const point = path.pointAt(progress * pathLength);
    if (point) {
      flowDot.center(point.x, point.y);
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  animationFrameId = requestAnimationFrame(animate);

  // 添加到动画元素数组，并提供清理方法
  animationElements.push({
    remove: () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      flowDot.remove();
    }
  });
  
  return animationElements;
}

/**
 * 创建粒子动画
 * @param {Object} svgDraw - SVG 绘图对象
 * @param {Object} path - 路径对象
 * @param {Object} animation - 动画配置
 * @returns {Object} 包含动画元素和清理函数的对象
 */
export function createParticleAnimation(svgDraw, path, animation) {
  const animationElements = [];
  
  const pathLength = path.length();
  if (pathLength === 0) return animationElements;

  // 根据路径长度计算粒子数量，避免过多粒子
  const particleCount = Math.min(Math.ceil(pathLength / 50), 10);
  const particles = [];

  // 创建粒子
  for (let i = 0; i < particleCount; i++) {
    const particle = svgDraw.circle(animation.particleSize)
      .fill(animation.particleColor)
      .opacity(0.8);

    particles.push(particle);
    animationElements.push(particle);
  }

  // 使用 requestAnimationFrame 优化动画
  let animationFrameId = null;
  // 减小速度因子，使粒子动画更慢
  const speedFactor = animation.speed * 0.05; // 从0.2降低到0.05
  const direction = animation.direction || 'forward';
  let alternateDirection = 1; // 1 表示正向，-1 表示反向
  let lastAlternateTime = 0;

  const animate = (timestamp) => {
    // 处理交替方向
    if (direction === 'alternate') {
      // 每2秒切换一次方向
      if (timestamp - lastAlternateTime > 2000) {
        alternateDirection *= -1;
        lastAlternateTime = timestamp;
      }
    }
    
    particles.forEach((particle, index) => {
      // 计算每个粒子的位置，均匀分布在路径上
      let offset;
      if (direction === 'reverse' || (direction === 'alternate' && alternateDirection === -1)) {
        // 反向动画
        offset = (1 - (index / particleCount + Date.now() * speedFactor / 1000) % 1);
      } else {
        // 正向动画
        offset = (index / particleCount + Date.now() * speedFactor / 1000) % 1;
      }
      
      const point = path.pointAt(offset * pathLength);

      if (point) {
        particle.center(point.x, point.y);
      }
    });

    animationFrameId = requestAnimationFrame(animate);
  };

  animationFrameId = requestAnimationFrame(animate);

  // 添加清理方法
  animationElements.push({
    remove: () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    }
  });
  
  return animationElements;
}

/**
 * 清除动画
 * @param {Array} animationElements - 动画元素列表
 * @param {Object} path - 路径对象
 * @param {String} dashArray - 虚线配置
 */
export function clearAnimation(animationElements, path, dashArray) {
  // 先停止并移除所有动画元素
  if (animationElements && animationElements.length) {
    animationElements.forEach(el => {
      // 安全地调用 remove 方法
      if (typeof el.remove === 'function') {
        el.remove();
      } else if (el && el.animation && typeof el.animation.stop === 'function') {
        el.animation.stop();
      }
    });
  }

  // 恢复原始样式
  if (path) {
    path.attr({
      'stroke-dasharray': dashArray,
      'stroke-dashoffset': 0
    });
  }
} 