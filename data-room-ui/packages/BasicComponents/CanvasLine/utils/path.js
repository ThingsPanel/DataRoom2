/**
 * CanvasLine 路径处理和几何计算相关功能
 */

/**
 * 生成路径数据点
 * @param {Array} points - 点集合
 * @param {String} lineType - 线条类型
 * @param {Number} segments - 分段数量
 * @returns {Array} 路径点数组
 */
export function generatePathPoints(points, lineType, segments = 100) {
  if (points.length < 2) return [];
  
  const pathPoints = [];
  
  // 根据线型生成不同的路径点
  switch (lineType) {
    case 'curved':
      // 曲线实现
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const cp1x = p1.x + (p2.x - p1.x) / 3;
        const cp1y = p1.y;
        const cp2x = p1.x + (p2.x - p1.x) * 2 / 3;
        const cp2y = p2.y;
        
        // 为每段曲线生成点
        for (let t = 0; t <= 1; t += 1 / segments) {
          const x = bezierPoint(p1.x, cp1x, cp2x, p2.x, t);
          const y = bezierPoint(p1.y, cp1y, cp2y, p2.y, t);
          pathPoints.push({ x, y });
        }
      }
      break;
      
    case 'step':
      // 阶梯线实现
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        
        // 水平段
        const segmentsHalf = Math.floor(segments / 2);
        for (let t = 0; t <= 1; t += 1 / segmentsHalf) {
          const x = p1.x + (p2.x - p1.x) * t;
          const y = p1.y;
          pathPoints.push({ x, y });
        }
        
        // 垂直段
        for (let t = 0; t <= 1; t += 1 / segmentsHalf) {
          const x = p2.x;
          const y = p1.y + (p2.y - p1.y) * t;
          pathPoints.push({ x, y });
        }
      }
      break;
      
    case 'smooth':
      // 平滑曲线实现
      if (points.length === 2) {
        // 只有两个点时，使用直线
        const p1 = points[0];
        const p2 = points[1];
        for (let t = 0; t <= 1; t += 1 / segments) {
          const x = p1.x + (p2.x - p1.x) * t;
          const y = p1.y + (p2.y - p1.y) * t;
          pathPoints.push({ x, y });
        }
      } else {
        // 使用基数样条曲线
        for (let i = 0; i < points.length - 1; i++) {
          const p0 = i === 0 ? points[0] : points[i - 1];
          const p1 = points[i];
          const p2 = points[i + 1];
          const p3 = i === points.length - 2 ? p2 : points[i + 2];
          
          // 绘制曲线段
          for (let t = 0; t <= 1; t += 1 / segments) {
            const x = catmullRom(p0.x, p1.x, p2.x, p3.x, t);
            const y = catmullRom(p0.y, p1.y, p2.y, p3.y, t);
            pathPoints.push({ x, y });
          }
        }
      }
      break;
      
    case 'bezier':
      // 贝塞尔曲线实现
      if (points.length === 2) {
        // 只有两个点时，使用直线
        const p1 = points[0];
        const p2 = points[1];
        for (let t = 0; t <= 1; t += 1 / segments) {
          const x = p1.x + (p2.x - p1.x) * t;
          const y = p1.y + (p2.y - p1.y) * t;
          pathPoints.push({ x, y });
        }
      } else {
        // 对于多个点，使用三次贝塞尔曲线
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          
          // 计算控制点
          let cp1x, cp1y, cp2x, cp2y;
          
          if (i === 0) {
            // 第一段曲线的第一个控制点
            cp1x = p1.x + (p2.x - p1.x) / 4;
            cp1y = p1.y + (p2.y - p1.y) / 4;
          } else {
            // 使用前一个点的方向
            const p0 = points[i - 1];
            cp1x = p1.x + (p2.x - p0.x) / 4;
            cp1y = p1.y + (p2.y - p0.y) / 4;
          }
          
          if (i === points.length - 2) {
            // 最后一段曲线的第二个控制点
            cp2x = p2.x - (p2.x - p1.x) / 4;
            cp2y = p2.y - (p2.y - p1.y) / 4;
          } else {
            // 使用下一个点的方向
            const p3 = points[i + 2];
            cp2x = p2.x - (p3.x - p1.x) / 4;
            cp2y = p2.y - (p3.y - p1.y) / 4;
          }
          
          // 为每段曲线生成点
          for (let t = 0; t <= 1; t += 1 / segments) {
            const x = bezierPoint(p1.x, cp1x, cp2x, p2.x, t);
            const y = bezierPoint(p1.y, cp1y, cp2y, p2.y, t);
            pathPoints.push({ x, y });
          }
        }
      }
      break;
      
    case 'straight':
    default:
      // 直线实现
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        
        for (let t = 0; t <= 1; t += 1 / segments) {
          const x = p1.x + (p2.x - p1.x) * t;
          const y = p1.y + (p2.y - p1.y) * t;
          pathPoints.push({ x, y });
        }
      }
      break;
  }
  
  return pathPoints;
}

/**
 * 计算贝塞尔曲线上的点
 */
function bezierPoint(p0, p1, p2, p3, t) {
  const t2 = t * t;
  const t3 = t2 * t;
  return (1 - t) * (1 - t) * (1 - t) * p0 + 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t2 * p2 + t3 * p3;
}

/**
 * 计算Catmull-Rom样条曲线上的点
 */
function catmullRom(p0, p1, p2, p3, t) {
  const v0 = (p2 - p0) * 0.5;
  const v1 = (p3 - p1) * 0.5;
  const t2 = t * t;
  const t3 = t * t2;
  return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
}

/**
 * 查找被点击的线段
 * @param {Number} x - 点击位置x坐标
 * @param {Number} y - 点击位置y坐标
 * @param {Array} points - 点集合
 * @param {Number} threshold - 检测阈值
 * @returns {Number} 线段索引，-1表示未找到
 */
export function findClickedLineSegment(x, y, points, threshold = 8) {
  if (!points || points.length < 2) return -1;
  
  // 遍历所有线段
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    
    // 计算点到线段的距离
    const distance = getDistanceToLineSegment(x, y, p1, p2);
    
    // 如果距离小于阈值，返回线段索引
    if (distance <= threshold) {
      return i;
    }
  }
  
  // 未找到符合条件的线段
  return -1;
}

/**
 * 计算点到线段的距离
 * @param {Number} x - 点的x坐标
 * @param {Number} y - 点的y坐标
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
  const len_sq = C * C + D * D;
  let param = -1;
  
  if (len_sq !== 0) {
    param = dot / len_sq;
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
 * 计算点在线段上的投影点
 * @param {Number} x - 点的x坐标
 * @param {Number} y - 点的y坐标
 * @param {Object} p1 - 线段起点
 * @param {Object} p2 - 线段终点
 * @returns {Object} 投影点坐标
 */
export function getProjectionPoint(x, y, p1, p2) {
  const A = x - p1.x;
  const B = y - p1.y;
  const C = p2.x - p1.x;
  const D = p2.y - p1.y;
  
  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  let param = -1;
  
  if (len_sq !== 0) {
    param = dot / len_sq;
  }
  
  // 限制投影点在线段上
  param = Math.max(0, Math.min(1, param));
  
  return {
    x: p1.x + param * C,
    y: p1.y + param * D
  };
}