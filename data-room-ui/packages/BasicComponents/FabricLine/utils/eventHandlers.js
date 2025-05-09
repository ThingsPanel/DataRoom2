/**
 * FabricLine组件的事件处理模块
 * 提供事件监听和处理功能
 */

import { FabricUtils } from './utils';

export const EventHandlers = {
  /**
   * 设置画布事件监听
   * @param {Object} canvas - fabric.js画布实例
   * @param {Object} component - 组件实例，用于访问方法和属性
   */
  setupEvents(canvas, component) {
    console.log('设置事件监听');
    if (!canvas) {
      console.error('画布未初始化，无法设置事件');
      return;
    }
    
    // 移除已有监听器
    canvas.off();
    
    // 点击事件 - 添加点或在线上添加点
    canvas.on('mouse:down', (options) => {
      console.log('鼠标点击 - Alt键状态:', component.isAltKeyDown, '添加模式:', component.isAddMode);
      
      // 优先处理Alt键删除模式
      if (component.isAltKeyDown && !component.isPreview) {
        // Alt键按下时的处理 - 删除点模式
        // 如果点击到点，直接删除
        if (options.target && options.target.data && options.target.data.isPoint) {
          component.deleteSelectedObject(options.target);
        } else {
          // 否则尝试删除附近的点
          component.deleteNearestPoint(options.pointer);
        }
        // 阻止事件传播
        if (options.e) {
          options.e.stopPropagation();
          options.e.preventDefault();
        }
        return;
      }
      
      // 正常模式处理
      if (component.isAddMode && !component.isPreview) {
        // 检查是否点击了线条
        if (options.target && options.target.data && options.target.data.isLine) {
          // 在线上添加点
          component.addPointOnLine(options.target, options.pointer);
          // 阻止事件传播
          if (options.e) {
            options.e.stopPropagation();
          }
        } else {
          // 普通添加点
          component.handleCanvasClick(options);
        }
      } else if (!component.isAddMode && options.target && options.target.data && options.target.data.isPoint) {
        // 如果在编辑模式下点击了点，阻止冒泡
        options.e.stopPropagation();
      }
    });
    
    // 鼠标移动事件 - 显示线条上的十字光标
    canvas.on('mouse:move', (options) => {
      const target = options.target;
      
      // Alt键按下时，专注于删除模式
      if (component.isAltKeyDown) {
        const nearest = component.findNearestPointToCursor(options.pointer);
        if (nearest) {
          canvas.defaultCursor = 'not-allowed'; // 删除光标
          component.highlightNearestPoint(nearest.point);
        } else {
          canvas.defaultCursor = 'default';
          component.unhighlightAllPoints();
        }
      } 
      // 正常添加模式下，在线上显示十字光标
      else if (component.isAddMode && target && target.data && target.data.isLine) {
        canvas.defaultCursor = 'crosshair';
        component.unhighlightAllPoints(); // 确保没有高亮点
      } else {
        canvas.defaultCursor = 'default';
        component.unhighlightAllPoints(); // 确保没有高亮点
      }
    });
    
    // 对象移动前事件 - 阻止传播
    canvas.on('mouse:down:before', (options) => {
      if (!component.isAddMode && options.target && options.target.data && options.target.data.isPoint) {
        options.e.stopPropagation();
        options.e.preventDefault();
      }
    });
    
    // 对象移动事件 - 更新连线
    canvas.on('object:moving', (options) => {
      if (!component.isAddMode && options.target && options.target.data && options.target.data.isPoint) {
        component.handlePointMoving(options.target);
        
        // 阻止事件冒泡
        if (options.e) {
          options.e.stopPropagation();
          options.e.preventDefault();
        }
      }
    });
    
    // 对象移动完成事件 - 保存状态
    canvas.on('object:modified', (options) => {
      if (!component.isAddMode && options.target && options.target.data && options.target.data.isPoint) {
        component.handlePointMoved(options.target);
      }
    });
    
    // 双击事件 - 删除点
    canvas.on('mouse:dblclick', (options) => {
      if (!component.isAddMode && options.target && options.target.data && options.target.data.isPoint) {
        component.deleteSelectedObject(options.target);
      }
    });
  },
  
  /**
   * 处理容器鼠标按下事件
   * @param {Event} e - 鼠标事件
   * @param {Object} component - 组件实例
   */
  handleContainerMouseDown(e, component) {
    // 如果Alt键按下，可能是要删除点
    if (component.isAltKeyDown && !component.isPreview) {
      // 获取光标位置
      const canvas = component.canvas;
      if (canvas) {
        const pointer = canvas.getPointer(e);
        // 尝试查找距离光标最近的点并删除
        component.deleteNearestPoint(pointer);
        e.preventDefault();
        e.stopPropagation();
      }
      return;
    }
    
    // 非Alt键模式下的处理
    // 如果不是添加模式且正在拖动点，则阻止事件冒泡
    if (!component.isAddMode && component.canvas) {
      const target = component.canvas.findTarget(e);
      if (target && target.data && target.data.isPoint) {
        e.stopPropagation();
      }
    }
  },
  
  /**
   * 处理键盘按键按下
   * @param {KeyboardEvent} e - 键盘事件
   * @param {Object} component - 组件实例
   */
  handleKeyDown(e, component) {
    if (!component.selected || component.isPreview || component.isAddMode) return;
    
    // 删除键(Delete)或退格键(Backspace)
    if ((e.keyCode === 46 || e.keyCode === 8)) {
      const activeObj = component.canvas.getActiveObject();
      if (activeObj) {
        e.preventDefault();
        component.deleteSelectedObject(activeObj);
      }
    }
  },
  
  /**
   * 处理键盘按键抬起
   * @param {KeyboardEvent} e - 键盘事件
   * @param {Object} component - 组件实例
   */
  handleKeyUp(e, component) {
    // 检查是否是Alt键被释放
    if (e.key === 'Alt') {
      console.log('Alt键已释放（全局监听）');
      component.isAltKeyDown = false;
      
      // 重置光标和高亮
      if (component.canvas) {
        component.canvas.defaultCursor = 'default';
        component.unhighlightAllPoints();
        component.canvas.renderAll();
      }
    }
  },
  
  /**
   * 临时切换模式
   * @param {boolean} keyDown - 按键是否按下
   * @param {KeyboardEvent} event - 键盘事件
   * @param {Object} component - 组件实例
   */
  toggleTemporaryMode(keyDown, event, component) {
    if (component.isPreview) return;
    
    // 检查按键类型
    const isAltKey = event && event.key === 'Alt';
    const isCtrlKey = event && (event.key === 'Control' || event.key === 'Meta');
    
    // Alt键专门用于删除功能，不改变添加/编辑模式
    if (isAltKey) {
      console.log('Alt键状态变化:', keyDown ? '按下' : '松开');
      component.isAltKeyDown = keyDown;
      
      // 强制更新光标和高亮
      if (!keyDown) {
        component.unhighlightAllPoints();
        if (component.canvas) {
          component.canvas.defaultCursor = 'default';
          component.canvas.renderAll();
        }
      }
    } 
    // Ctrl键用于在添加/编辑模式间切换
    else if (isCtrlKey) {
      component.isAddMode = !keyDown;
      component.updateObjectsSelectability();
    }
  },
  
  /**
   * 重置所有键盘状态
   * @param {Object} component - 组件实例
   */
  resetKeyStates(component) {
    console.log('重置按键状态');
    // 重置Alt键状态
    component.isAltKeyDown = false;
    
    // 重置光标和高亮
    if (component.canvas) {
      component.canvas.defaultCursor = 'default';
      component.unhighlightAllPoints();
      component.canvas.renderAll();
    }
  }
}; 