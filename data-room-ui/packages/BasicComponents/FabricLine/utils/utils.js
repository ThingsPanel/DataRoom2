/**
 * FabricLine组件的工具类
 * 将Fabric.js相关的逻辑和工具方法抽离到这个文件中
 */

// Fabric基础操作
export const FabricUtils = {
  /**
   * 创建点
   * @param {Object} fabric - fabric.js实例
   * @param {number} x - x坐标
   * @param {number} y - y坐标
   * @param {Object} config - 配置项
   * @param {boolean} isSelectable - 是否可选择
   * @returns {Object} 创建的点对象
   */
  createPoint(fabric, x, y, config, isSelectable) {
    const pointId = Date.now();
    return {
      point: new fabric.Circle({
        left: x,
        top: y,
        radius: config.pointRadius || 5,
        fill: config.pointColor || 'red',
        originX: 'center',
        originY: 'center',
        selectable: isSelectable,
        evented: isSelectable,
        hasControls: false,
        hasBorders: isSelectable,
        lockRotation: true,
        perPixelTargetFind: false,  // 不需要精确点击检测，使拖动更容易
        hoverCursor: isSelectable ? 'move' : 'default', // 可选择时显示移动光标
        data: { 
          isPoint: true, 
          id: pointId 
        }
      }),
      id: pointId
    };
  },

  /**
   * 创建连接线
   * @param {Object} fabric - fabric.js实例
   * @param {number} x1 - 起点x坐标
   * @param {number} y1 - 起点y坐标
   * @param {number} x2 - 终点x坐标
   * @param {number} y2 - 终点y坐标
   * @param {string} startPointId - 起点ID
   * @param {string} endPointId - 终点ID
   * @param {Object} config - 配置项
   * @returns {Object} 创建的线对象
   */
  createLine(fabric, x1, y1, x2, y2, startPointId, endPointId, config) {
    // 创建基本线条配置
    const lineOptions = {
      stroke: config.lineColor || '#409EFF',
      strokeWidth: config.lineWidth || 2,
      opacity: config.lineOpacity !== undefined ? config.lineOpacity : 1,
      selectable: false,
      evented: true, // 允许线条接收事件，以便能点击线上添加点
      hoverCursor: 'crosshair', // 线上显示十字光标
      // 线条样式配置
      strokeLineCap: config.lineCap || 'round',
      strokeLineJoin: config.lineJoin || 'round',
      data: {
        isLine: true,
        startPointId: startPointId,
        endPointId: endPointId
      }
    };
    
    // 设置虚线样式
    if (config.lineType && config.lineType !== 'solid') {
      let dashArray;
      
      switch (config.lineType) {
        case 'dashed':
          dashArray = config.dashArray || [3, 3];
          break;
        case 'dotted':
          dashArray = [1, 3];
          break;
        case 'dash-dot':
          dashArray = [6, 3, 1, 3];
          break;
        default:
          dashArray = null;
      }
      
      if (dashArray) {
        lineOptions.strokeDashArray = dashArray;
      }
    }
    
    // 添加阴影效果
    if (config.shadowEnabled) {
      lineOptions.shadow = new fabric.Shadow({
        color: config.shadowColor || 'rgba(0,0,0,0.3)',
        blur: config.shadowBlur || 5,
        offsetX: config.shadowOffsetX || 0,
        offsetY: config.shadowOffsetY || 2
      });
    }
    
    // 创建线条
    const line = new fabric.Line([x1, y1, x2, y2], lineOptions);
    
    // 添加线条交互效果
    line.on('mouseover', () => {
      // 鼠标悬停时加粗线条
      line.set({
        strokeWidth: (config.lineWidth || 2) * 1.5,
        opacity: Math.min((config.lineOpacity || 1) * 1.2, 1)
      });
      line.canvas && line.canvas.renderAll();
    });
    
    line.on('mouseout', () => {
      // 鼠标移出时恢复线条样式
      line.set({
        strokeWidth: config.lineWidth || 2,
        opacity: config.lineOpacity || 1
      });
      line.canvas && line.canvas.renderAll();
    });
    
    // 处理箭头
    if (config.arrowEnabled) {
      line.arrowConfig = {
        direction: config.arrowDirection || 'end',
        size: config.arrowSize || 10,
        color: config.lineColor || '#409EFF'
      };
    }
    
    return line;
  },

  /**
   * 将线条放到底层
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} line - 线条对象
   */
  sendLineToBack(canvas, line) {
    try {
      // 先尝试canvas.sendToBack方法
      if (canvas.sendToBack && typeof canvas.sendToBack === 'function') {
        canvas.sendToBack(line);
      } 
      // 再尝试line.sendToBack方法
      else if (line.sendToBack && typeof line.sendToBack === 'function') {
        line.sendToBack();
      }
    } catch (e) {
      console.warn('无法将线条置于底层:', e);
    }
  },

  /**
   * 更新点的可选择性
   * @param {Array} points - 点对象数组
   * @param {boolean} selectable - 是否可选择
   */
  updatePointsSelectability(points, selectable) {
    points.forEach(point => {
      point.set({
        selectable: selectable,
        evented: selectable,
        hasControls: false,
        hasBorders: selectable,
        lockRotation: true
      });
    });
  },
  
  /**
   * 查找与点相连的所有线
   * @param {Object} canvas - fabric.js画布实例
   * @param {string} pointId - 点ID
   * @returns {Array} 与该点相连的线
   */
  findConnectedLines(canvas, pointId) {
    return canvas.getObjects().filter(obj => {
      return (obj.type === 'line' || obj.type === 'path') && 
             obj.data && 
             (obj.data.startPointId === pointId || obj.data.endPointId === pointId);
    });
  },
  
  /**
   * 更新与点连接的线
   * @param {Object} canvas - fabric.js画布实例
   * @param {string} pointId - 点ID
   * @param {number} x - 新的x坐标
   * @param {number} y - 新的y坐标
   */
  updateConnectedLines(canvas, pointId, x, y) {
    const connectedLines = this.findConnectedLines(canvas, pointId);
    
    connectedLines.forEach(line => {
      if (line.type === 'line') {
        if (line.data.startPointId === pointId) {
          line.set({ x1: x, y1: y });
        } else if (line.data.endPointId === pointId) {
          line.set({ x2: x, y2: y });
        }
      }
    });
  },

  /**
   * 在线上添加点
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} line - 线条对象 
   * @param {Object} fabric - fabric.js实例
   * @param {Object} pointer - 鼠标坐标
   * @param {Object} config - 配置项
   * @param {boolean} isSelectable - 是否可选择
   * @returns {Object} 包含新的点和更新后的线的信息
   */
  addPointOnLine(canvas, line, fabric, pointer, config, isSelectable) {
    if (!line || !line.data || !line.data.isLine) return null;

    // 获取线的起点和终点
    const x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;
    const startPointId = line.data.startPointId;
    const endPointId = line.data.endPointId;

    // 计算点到线的投影点（即线上最近的点）
    // 这比直接使用点击坐标更精确
    let projectionX, projectionY;
    
    // 计算线段长度的平方
    const lineLengthSq = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    
    if (lineLengthSq === 0) {
      // 线段长度为0（起点和终点重合），直接使用起点
      projectionX = x1;
      projectionY = y1;
    } else {
      // 计算从起点到点击位置的向量与线段的点积，除以线段长度的平方得到投影比例
      const t = ((pointer.x - x1) * (x2 - x1) + (pointer.y - y1) * (y2 - y1)) / lineLengthSq;
      
      // 将t限制在[0,1]范围内，确保投影点在线段上
      const clampedT = Math.max(0, Math.min(1, t));
      
      // 计算投影点坐标
      projectionX = x1 + clampedT * (x2 - x1);
      projectionY = y1 + clampedT * (y2 - y1);
    }
    
    // 创建新点（使用投影点坐标）
    const { point: newPoint, id: newPointId } = this.createPoint(
      fabric, projectionX, projectionY, config, isSelectable
    );
    
    // 添加新点到画布
    canvas.add(newPoint);
    
    // 删除原来的线
    canvas.remove(line);
    
    // 创建两条新线
    const line1 = this.createLine(fabric, x1, y1, projectionX, projectionY, startPointId, newPointId, config);
    const line2 = this.createLine(fabric, projectionX, projectionY, x2, y2, newPointId, endPointId, config);
    
    // 添加新线到画布
    canvas.add(line1);
    canvas.add(line2);
    
    // 将线条放到底层
    this.sendLineToBack(canvas, line1);
    this.sendLineToBack(canvas, line2);
    
    return {
      newPoint,
      newPointId,
      newLines: [
        {
          obj: line1,
          data: {
            x1, y1, 
            x2: projectionX, y2: projectionY,
            startPointId, endPointId: newPointId
          }
        },
        {
          obj: line2,
          data: {
            x1: projectionX, y1: projectionY,
            x2, y2, 
            startPointId: newPointId, endPointId
          }
        }
      ],
      position: { x: projectionX, y: projectionY }
    };
  },

  /**
   * 删除点
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} point - 点对象
   * @param {Array} points - 配置中的点数组
   * @param {Array} pointObjects - 点对象引用数组
   * @returns {Object} 包含点ID和是否成功的信息
   */
  deletePoint(canvas, point, points, pointObjects) {
    if (!point || !point.data) return { success: false };
    
    const pointId = point.data.id;
    console.log('删除点:', pointId);
    
    // 从points数组中删除
    const pointIndex = points.findIndex(p => p.id === pointId);
    if (pointIndex !== -1) {
      points.splice(pointIndex, 1);
    }
    
    // 从pointObjects数组中删除
    const objIndex = pointObjects.findIndex(p => p === point);
    if (objIndex !== -1) {
      pointObjects.splice(objIndex, 1);
    }
    
    // 从画布中删除点
    canvas.remove(point);
    
    return { success: true, pointId };
  },
  
  /**
   * 安全销毁canvas
   * @param {Object} canvas - fabric.js画布实例
   */
  disposeCanvas(canvas) {
    if (!canvas) return;
    
    try {
      // 移除所有事件监听
      canvas.off();
      
      // 清空画布
      canvas.clear();
      
      // 使用内置的dispose方法
      canvas.dispose();
    } catch (error) {
      console.error('销毁canvas时出错:', error);
    }
  },

  /**
   * 找到最接近指定位置的点
   * @param {Array} points - 点对象数组
   * @param {Object} position - 位置坐标 {x, y}
   * @param {number} threshold - 距离阈值，超过此值不计算
   * @returns {Object} 最近点信息 {point, distance} 或 null
   */
  findNearestPoint(points, position, threshold = 15) {
    if (!points || !points.length || !position) return null;
    
    let nearestPoint = null;
    let minDistance = threshold;  // 初始值设为阈值，超过阈值的不考虑
    
    for (const point of points) {
      // 计算点到指定位置的欧几里得距离
      const dx = point.left - position.x;
      const dy = point.top - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // 如果距离小于当前最小距离，更新最近点
      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = point;
      }
    }
    
    return nearestPoint ? { point: nearestPoint, distance: minDistance } : null;
  },
}; 