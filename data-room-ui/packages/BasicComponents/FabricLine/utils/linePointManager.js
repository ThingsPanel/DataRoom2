/**
 * FabricLine组件的线条和点管理模块
 * 提供线条和点的添加、删除和更新功能
 */

import { FabricUtils } from './utils';

export const LinePointManager = {
  /**
   * 添加线条
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} fabricModule - fabric.js模块
   * @param {number} x1 - 起点x坐标
   * @param {number} y1 - 起点y坐标
   * @param {number} x2 - 终点x坐标
   * @param {number} y2 - 终点y坐标
   * @param {string} startPointId - 起点ID
   * @param {string} endPointId - 终点ID
   * @param {Object} config - 配置对象
   * @returns {Object} 创建的线条对象和数据
   */
  addLine(canvas, fabricModule, x1, y1, x2, y2, startPointId, endPointId, config) {
    console.log('创建线条', x1, y1, x2, y2);
    
    try {
      const fabric = fabricModule.fabric || fabricModule;
      
      // 创建线条
      const line = FabricUtils.createLine(
        fabric, x1, y1, x2, y2, startPointId, endPointId, config.customize
      );
      
      // 添加到画布
      canvas.add(line);
      
      // 将线条放到底层
      FabricUtils.sendLineToBack(canvas, line);
      
      // 返回线条数据
      return {
        line,
        data: {
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          id: Date.now(),
          startPointId: startPointId,
          endPointId: endPointId
        }
      };
    } catch (error) {
      console.error('创建线条时出错:', error);
      return null;
    }
  },
  
  /**
   * 在线上添加点
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} line - 线条对象
   * @param {Object} fabricModule - fabric.js模块
   * @param {Object} pointer - 鼠标坐标
   * @param {Object} config - 配置项
   * @param {boolean} isAddMode - 是否为添加模式
   * @returns {Object} 添加点的结果
   */
  addPointOnLine(canvas, line, fabricModule, pointer, config, isAddMode) {
    console.log('在线上添加点', pointer.x, pointer.y);
    
    // 使用工具类在线上添加点
    const result = FabricUtils.addPointOnLine(
      canvas, 
      line, 
      fabricModule, 
      pointer, 
      config.customize, 
      !isAddMode
    );
    
    return result;
  },
  
  /**
   * 添加线条点
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} fabricModule - fabric.js模块
   * @param {number} x - x坐标
   * @param {number} y - y坐标
   * @param {Object} config - 配置对象
   * @param {boolean} isAddMode - 是否为添加模式
   * @returns {Object} 创建的点对象和ID
   */
  addLinePoint(canvas, fabricModule, x, y, config, isAddMode) {
    console.log('添加线条点', x, y);
    
    const fabric = fabricModule.fabric || fabricModule;
    
    // 创建点对象
    const { point, id } = FabricUtils.createPoint(fabric, x, y, config.customize, !isAddMode);
    
    // 添加到画布
    canvas.add(point);
    
    // 返回点数据
    return {
      point,
      id,
      data: { x, y, id }
    };
  },
  
  /**
   * 删除点
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} point - 点对象
   * @param {Array} points - 配置中的点数据数组
   * @param {Array} pointObjects - 点对象引用数组
   */
  deletePoint(canvas, point, points, pointObjects) {
    if (!point || !point.data) return { success: false };
    
    // 使用工具类删除点
    const result = FabricUtils.deletePoint(canvas, point, points, pointObjects);
    
    return result;
  },
  
  /**
   * 删除选中对象
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} obj - 选中的对象
   * @param {Function} deletePoint - 删除点的回调函数
   * @param {Function} saveState - 保存状态的回调函数
   */
  deleteSelectedObject(canvas, obj, deletePoint, saveState) {
    if (!canvas) return;
    
    const activeObj = obj || canvas.getActiveObject();
    if (!activeObj) return;
    
    // 如果选中的是点
    if (activeObj.type === 'circle' && activeObj.data && activeObj.data.isPoint) {
      deletePoint(activeObj);
    } else {
      // 其他对象直接删除
      canvas.remove(activeObj);
    }
    
    canvas.discardActiveObject();
    canvas.renderAll();
    saveState();
  },
  
  /**
   * 重新生成所有线条
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} fabricModule - fabric.js模块
   * @param {Array} points - 配置中的点数据数组
   * @param {Function} addLine - 添加线条的回调函数
   */
  regenerateLines(canvas, fabricModule, points, addLine) {
    if (!canvas) return;
    
    // 删除所有线条
    const linesToRemove = canvas.getObjects().filter(obj => 
      obj.type === 'line' || 
      (obj.type === 'path' && obj.data && obj.data.isLine)
    );
    
    linesToRemove.forEach(line => {
      canvas.remove(line);
    });
    
    // 根据点重新生成线条
    if (points.length >= 2) {
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        addLine(p1.x, p1.y, p2.x, p2.y, p1.id, p2.id);
      }
    }
    
    canvas.renderAll();
  },
  
  /**
   * 按线条顺序插入点
   * @param {Array} points - 点数组
   * @param {Object} newPoint - 新点数据
   * @param {string} startPointId - 起点ID
   * @param {string} endPointId - 终点ID
   */
  insertPointInOrder(points, newPoint, startPointId, endPointId) {
    // 找到起点和终点在数组中的位置
    const startIndex = points.findIndex(p => p.id === startPointId);
    const endIndex = points.findIndex(p => p.id === endPointId);
    
    if (startIndex !== -1 && endIndex !== -1) {
      // 确保这两个点是相邻的（直接相连）
      if (Math.abs(startIndex - endIndex) === 1) {
        // 在两点之间插入新点
        const insertIndex = Math.max(startIndex, endIndex);
        points.splice(insertIndex, 0, newPoint);
      } else {
        // 如果不相邻，则简单添加到数组末尾
        points.push(newPoint);
      }
    } else {
      // 找不到起点或终点，添加到末尾
      points.push(newPoint);
    }
  },
  
  /**
   * 处理点移动中
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} point - 正在移动的点
   */
  handlePointMoving(canvas, point) {
    if (!point || !point.data) return;
    
    const pointId = point.data.id;
    const x = point.left;
    const y = point.top;
    
    // 更新连接到这个点的所有线
    FabricUtils.updateConnectedLines(canvas, pointId, x, y);
    
    // 预览效果，无需保存
    canvas.renderAll();
  },
  
  /**
   * 处理点移动完成
   * @param {Object} point - 点对象
   * @param {Array} points - 配置中的点数据数组
   * @param {Function} saveState - 保存状态的回调函数
   */
  handlePointMoved(point, points, saveState) {
    if (!point || !point.data) return;
    
    const pointId = point.data.id;
    const x = point.left;
    const y = point.top;
    
    // 更新点的坐标
    const pointIndex = points.findIndex(p => p.id === pointId);
    if (pointIndex !== -1) {
      points[pointIndex].x = x;
      points[pointIndex].y = y;
    }
    
    // 保存状态
    saveState();
  }
}; 