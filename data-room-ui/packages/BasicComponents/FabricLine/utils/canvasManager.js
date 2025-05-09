/**
 * FabricLine组件的Canvas管理模块
 * 提供Canvas初始化和管理功能
 */

import { FabricUtils } from './utils';
import { EventHandlers } from './eventHandlers';

export const CanvasManager = {
  /**
   * 初始化Canvas
   * @param {Object} fabricModule - fabric.js模块
   * @param {HTMLElement} canvasElement - Canvas DOM元素
   * @param {Object} container - 容器元素
   * @param {boolean} isAddMode - 是否处于添加模式
   * @param {Object} component - 组件实例
   * @returns {Object} 初始化后的Canvas实例
   */
  initCanvas(fabricModule, canvasElement, container, isAddMode, component) {
    console.log('初始化画布');
    
    const fabric = fabricModule.fabric || fabricModule;
    
    if (!fabric) {
      console.error('Fabric未加载，无法初始化画布');
      return null;
    }
    
    try {
      if (!canvasElement) {
        console.error('画布元素未找到');
        return null;
      }
      
      // 使用容器实际大小
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      console.log('容器大小:', containerWidth, containerHeight);
      
      // 设置Canvas容器的z-index
      const canvasContainer = container.querySelector('.canvas-container');
      if (canvasContainer) {
        canvasContainer.style.zIndex = "10";
      }
      
      const canvas = new fabric.Canvas(canvasElement, {
        width: containerWidth,
        height: containerHeight,
        selection: !isAddMode,
        renderOnAddRemove: true,
        // 设置拖动相关选项
        stopContextMenu: true,        // 阻止右键菜单
        fireRightClick: true          // 触发右键点击事件
      });
      
      console.log('画布对象:', canvas);
      
      // 设置事件监听
      EventHandlers.setupEvents(canvas, component);
      
      return canvas;
    } catch (error) {
      console.error('初始化画布时出错:', error);
      return null;
    }
  },
  
  /**
   * 调整Canvas大小
   * @param {Object} canvas - fabric.js画布实例
   * @param {HTMLElement} container - 容器元素
   * @param {number} defaultWidth - 默认宽度
   * @param {number} defaultHeight - 默认高度
   */
  resizeCanvas(canvas, container, defaultWidth, defaultHeight) {
    if (!canvas) return;
    
    const containerWidth = container ? container.clientWidth : defaultWidth;
    const containerHeight = container ? container.clientHeight : defaultHeight;
    
    if (containerWidth > 0 && containerHeight > 0) {
      console.log('调整画布大小:', containerWidth, containerHeight);
      canvas.setWidth(containerWidth);
      canvas.setHeight(containerHeight);
      canvas.renderAll();
    }
  },
  
  /**
   * 从配置加载画布内容
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} fabricModule - fabric.js模块
   * @param {Object} config - 配置对象
   * @param {boolean} isAddMode - 是否为添加模式
   * @param {Function} addLine - 添加线的回调函数
   * @param {Array} pointObjects - 点对象数组引用
   * @param {Array} lines - 线条数组引用
   */
  loadFromConfig(canvas, fabricModule, config, isAddMode, addLine, pointObjects, lines) {
    if (!canvas || !config.customize) {
      console.log('无法从配置加载，画布或配置不存在');
      return;
    }
    
    const fabric = fabricModule.fabric || fabricModule;
    const { points = [] } = config.customize;
    console.log('从配置加载', points.length, '个点');
    
    // 清空画布
    canvas.clear();
    lines.length = 0;
    pointObjects.length = 0;
    
    // 加载所有点
    const loadedPoints = [];
    
    points.forEach(point => {
      try {
        // 创建点对象
        const { point: dot, id } = FabricUtils.createPoint(
          fabric, point.x, point.y, config.customize, !isAddMode
        );
        
        // 使用原始点ID
        dot.data.id = point.id || id;
        
        // 添加到画布
        canvas.add(dot);
        pointObjects.push(dot);
        
        // 保存点用于连线
        loadedPoints.push({ 
          x: point.x, 
          y: point.y, 
          id: point.id || id,
          fabricObject: dot
        });
      } catch (error) {
        console.error('加载点时出错:', error);
      }
    });
    
    // 添加连接线
    if (loadedPoints.length >= 2) {
      for (let i = 0; i < loadedPoints.length - 1; i++) {
        const p1 = loadedPoints[i];
        const p2 = loadedPoints[i + 1];
        
        try {
          // 创建线条
          const line = FabricUtils.createLine(
            fabric, p1.x, p1.y, p2.x, p2.y, p1.id, p2.id, config.customize
          );
          
          // 添加到画布
          canvas.add(line);
          
          // 将线条放到底层
          FabricUtils.sendLineToBack(canvas, line);
          
          // 保存线条数据
          lines.push({
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
            id: Date.now() + i,
            startPointId: p1.id,
            endPointId: p2.id
          });
        } catch (error) {
          console.error('创建线条时出错:', error);
        }
      }
    }
    
    canvas.renderAll();
  }
}; 