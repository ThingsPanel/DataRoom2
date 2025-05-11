/**
 * 拖动状态管理器
 * 管理拖动状态和键盘事件
 */

class DragStateManager {
  constructor() {
    // 初始化状态
    this.isCtrlPressed = false;
    this.isDragging = false;
    this.callbacks = {
      ctrlStateChange: [],
      dragStateChange: []
    };
    
    // 绑定方法到实例
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    
    // 添加事件监听
    this.init();
  }
  
  /**
   * 初始化管理器
   */
  init() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }
  
  /**
   * 处理键盘按下
   * @param {KeyboardEvent} event - 键盘事件
   */
  handleKeyDown(event) {
    if (event.key === 'Control' || event.ctrlKey) {
      const prevState = this.isCtrlPressed;
      this.isCtrlPressed = true;
      
      if (!prevState) {
        this.notifyCtrlStateChange();
      }
    }
  }
  
  /**
   * 处理键盘释放
   * @param {KeyboardEvent} event - 键盘事件
   */
  handleKeyUp(event) {
    if (event.key === 'Control') {
      const prevState = this.isCtrlPressed;
      this.isCtrlPressed = false;
      
      if (prevState) {
        this.notifyCtrlStateChange();
      }
    }
  }
  
  /**
   * 设置拖动状态
   * @param {boolean} dragging - 是否正在拖动
   */
  setDragging(dragging) {
    if (this.isDragging !== dragging) {
      this.isDragging = dragging;
      this.notifyDragStateChange();
    }
  }
  
  /**
   * 通知Ctrl键状态变化
   */
  notifyCtrlStateChange() {
    this.callbacks.ctrlStateChange.forEach(callback => {
      callback(this.isCtrlPressed);
    });
  }
  
  /**
   * 通知拖动状态变化
   */
  notifyDragStateChange() {
    this.callbacks.dragStateChange.forEach(callback => {
      callback(this.isDragging);
    });
  }
  
  /**
   * 注册Ctrl键状态变化回调
   * @param {Function} callback - 回调函数
   */
  onCtrlStateChange(callback) {
    if (typeof callback === 'function') {
      this.callbacks.ctrlStateChange.push(callback);
    }
  }
  
  /**
   * 注册拖动状态变化回调
   * @param {Function} callback - 回调函数
   */
  onDragStateChange(callback) {
    if (typeof callback === 'function') {
      this.callbacks.dragStateChange.push(callback);
    }
  }
  
  /**
   * 获取Ctrl键状态
   * @returns {boolean} Ctrl键是否按下
   */
  isCtrlActive() {
    return this.isCtrlPressed;
  }
  
  /**
   * 获取拖动状态
   * @returns {boolean} 是否正在拖动
   */
  isDraggingActive() {
    return this.isDragging;
  }
  
  /**
   * 销毁管理器，移除事件监听
   */
  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    this.callbacks.ctrlStateChange = [];
    this.callbacks.dragStateChange = [];
  }
}

// 导出单例实例
const dragStateManager = new DragStateManager();
export default dragStateManager; 