/**
 * SvgLine 路径处理和几何计算相关功能
 */

/**
 * 生成路径数据
 * @param {Array} points - 点集合
 * @param {String} lineType - 线条类型
 * @returns {String} 路径数据
 */
export function generatePathData(points, lineType) {
  if (points.length < 2) return '';
  
  let pathData = '';

  // 根据线型生成不同的路径
  switch (lineType) {
    case 'curved':
      // 曲线实现
      pathData = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cp1x = prev.x + (curr.x - prev.x) / 3;
        const cp1y = prev.y;
        const cp2x = prev.x + (curr.x - prev.x) * 2 / 3;
        const cp2y = curr.y;
        pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      }
      break;

    case 'step':
      // 阶梯线实现
      pathData = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const curr = points[i];
        // 水平线 + 垂直线
        pathData += ` H ${curr.x} V ${curr.y}`;
      }
      break;

    case 'smooth':
      // 平滑曲线实现 (使用基数样条)
      pathData = `M ${points[0].x} ${points[0].y}`;
      if (points.length === 2) {
        // 只有两个点时，使用直线
        pathData += ` L ${points[1].x} ${points[1].y}`;
      } else {
        // 使用基数样条曲线
        pathData += ' T';
        for (let i = 1; i < points.length; i++) {
          pathData += ` ${points[i].x} ${points[i].y}`;
        }
      }
      break;

    case 'bezier':
      // 贝塞尔曲线实现
      pathData = `M ${points[0].x} ${points[0].y}`;
      if (points.length === 2) {
        // 只有两个点时，使用直线
        pathData += ` L ${points[1].x} ${points[1].y}`;
      } else {
        // 对于多个点，使用三次贝塞尔曲线
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const curr = points[i];

          // 计算控制点
          let cp1x, cp1y, cp2x, cp2y;

          if (i === 1) {
            // 第一段曲线的第一个控制点
            cp1x = prev.x + (curr.x - prev.x) / 4;
            cp1y = prev.y + (curr.y - prev.y) / 4;
          } else {
            // 使用前一个点的方向
            const prevPrev = points[i - 2];
            cp1x = prev.x + (curr.x - prevPrev.x) / 4;
            cp1y = prev.y + (curr.y - prevPrev.y) / 4;
          }

          if (i === points.length - 1) {
            // 最后一段曲线的第二个控制点
            cp2x = curr.x - (curr.x - prev.x) / 4;
            cp2y = curr.y - (curr.y - prev.y) / 4;
          } else {
            // 使用下一个点的方向
            const next = points[i + 1];
            cp2x = curr.x - (next.x - prev.x) / 4;
            cp2y = curr.y - (next.y - prev.y) / 4;
          }

          pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
        }
      }
      break;

    case 'straight':
    default:
      // 直线实现
      pathData = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        pathData += ` L ${points[i].x} ${points[i].y}`;
      }
      break;
  }

  return pathData;
}

/**
 * 查找被点击的线段
 * @param {Number} x - 鼠标X坐标
 * @param {Number} y - 鼠标Y坐标
 * @param {Array} points - 点集合
 * @param {Number} threshold - 阈值，默认为8
 * @returns {Number} 线段索引，-1表示未找到
 */
export function findClickedLineSegment(x, y, points, threshold = 8) {

  
  // 防御性检查
  if (!points || !Array.isArray(points) || points.length < 2) {
    return -1;
  }
  
  // 记录最近的线段
  let closestIndex = -1;
  let minDistance = Number.MAX_VALUE;
  
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    
    // 防御性检查
    if (!p1 || typeof p1.x !== 'number' || typeof p1.y !== 'number' ||
        !p2 || typeof p2.x !== 'number' || typeof p2.y !== 'number') {
      continue;
    }
    
    const distance = getDistanceToLineSegment(x, y, p1, p2);
    
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = i;
    }
  }
  
  // 只有当最小距离小于阈值时才返回线段索引
  const result = minDistance < threshold ? closestIndex : -1;
  
  return result;
}

/**
 * 计算点到线段的距离
 * @param {Number} x - 点X坐标
 * @param {Number} y - 点Y坐标
 * @param {Object} p1 - 线段起点
 * @param {Object} p2 - 线段终点
 * @returns {Number} 距离
 */
export function getDistanceToLineSegment(x, y, p1, p2) {
  const A = x - p1.x;
  const B = y - p1.y;
  const C = p2.x - p1.x;
  const D = p2.y - p1.y;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) {
    param = dot / lenSq;
  }

  let xx, yy;

  if (param < 0) {
    xx = p1.x;
    yy = p1.y;
  } else if (param > 1) {
    xx = p2.x;
    yy = p2.y;
  } else {
    xx = p1.x + param * C;
    yy = p1.y + param * D;
  }

  const dx = x - xx;
  const dy = y - yy;

  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * 获取点在线段上的投影点
 * @param {Number} x - 点X坐标
 * @param {Number} y - 点Y坐标
 * @param {Object} p1 - 线段起点
 * @param {Object} p2 - 线段终点
 * @returns {Object} 投影点
 */
export function getProjectionPoint(x, y, p1, p2) {
  const A = x - p1.x;
  const B = y - p1.y;
  const C = p2.x - p1.x;
  const D = p2.y - p1.y;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = 0.5;

  if (lenSq !== 0) {
    param = Math.max(0, Math.min(1, dot / lenSq));
  }

  return {
    x: p1.x + param * C,
    y: p1.y + param * D
  };
} 