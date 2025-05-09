/**
 * FabricLine组件的点操作工具模块
 * 提供点的查找、高亮和操作功能
 */

import { FabricUtils } from './utils';

export const PointHelpers = {
  /**
   * 找到距离光标最近的点
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} pointer - 位置坐标 {x, y}
   * @param {number} threshold - 距离阈值，超过此值不计算
   * @returns {Object} 最近点信息 {point, distance} 或 null
   */
  findNearestPointToCursor(canvas, pointer, threshold = 15) {
    if (!canvas || !pointer) return null;
    
    // 只考虑点对象
    const pointObjects = canvas.getObjects().filter(obj => 
      obj.type === 'circle' && obj.data && obj.data.isPoint
    );
    
    return FabricUtils.findNearestPoint(pointObjects, pointer, threshold);
  },
  
  /**
   * 高亮显示最近的点
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} point - 要高亮的点对象
   */
  highlightNearestPoint(canvas, point) {
    if (!point) return;
    
    // 重置所有点的样式
    this.unhighlightAllPoints(canvas);
    
    // 保存原始样式
    if (!point._originalFill) {
      point._originalFill = point.fill;
      point._originalOpacity = point.opacity;
      point._originalStrokeWidth = point.strokeWidth;
    }
    
    // 设置高亮样式
    point.set({
      fill: 'red',
      opacity: 0.8,
      stroke: 'red',
      strokeWidth: 2
    });
    
    canvas.renderAll();
  },
  
  /**
   * 取消所有点的高亮
   * @param {Object} canvas - fabric.js画布实例
   */
  unhighlightAllPoints(canvas) {
    if (!canvas) return;
    
    const points = canvas.getObjects().filter(obj => 
      obj.type === 'circle' && obj.data && obj.data.isPoint
    );
    
    points.forEach(point => {
      if (point._originalFill) {
        point.set({
          fill: point._originalFill,
          opacity: point._originalOpacity || 1,
          stroke: null,
          strokeWidth: point._originalStrokeWidth || 0
        });
      }
    });
    
    canvas.renderAll();
  },
  
  /**
   * 删除最近的点
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} pointer - 位置坐标 {x, y}
   * @param {Function} deletePoint - 删除点的回调函数
   * @param {Function} saveState - 保存状态的回调函数
   */
  deleteNearestPoint(canvas, pointer, deletePoint, saveState) {
    const nearest = this.findNearestPointToCursor(canvas, pointer);
    if (nearest && nearest.point) {
      console.log('删除附近点，距离:', nearest.distance);
      deletePoint(nearest.point);
      canvas.renderAll();
      saveState();
    }
  },
  
  /**
   * 更新对象的可选择性
   * @param {Object} canvas - fabric.js画布实例
   * @param {Array} pointObjects - 点对象数组
   * @param {boolean} isAddMode - 是否为添加模式
   */
  updateObjectsSelectability(canvas, pointObjects, isAddMode) {
    if (!canvas) return;
    
    // 设置画布选择模式
    canvas.selection = !isAddMode;
    
    // 更新所有点的可选择性
    FabricUtils.updatePointsSelectability(pointObjects, !isAddMode);
    
    canvas.renderAll();
  }
}; 