import KeyboardManager from './KeyboardManager';

/**
 * 绘制模式类型
 */
export const DrawModeTypes = {
  NONE: 'none',         // 不绘制
  MANUAL: 'manual',     // 手动控制绘制
  KEY_CTRL: 'key_ctrl', // Ctrl键控制绘制
  ALWAYS: 'always'      // 始终绘制
};

/**
 * 绘制模式管理器
 * 处理各种绘制模式的状态管理和切换
 */
class DrawModeManager {
  /**
   * 构造函数
   */
  constructor() {
    // 当前激活的绘制模式
    this.mode = DrawModeTypes.NONE;
    
    // 绘制状态
    this.isDrawing = false;
    
    // 绘制状态变化回调
    this.onDrawingStateChange = null;
    
    // 调试模式
    this.debug = false;
    
    // 标记是否已初始化
    this.initialized = false;
  }
  
  /**
   * 初始化管理器
   */
  init() {
    if (this.initialized) {
      return;
    }
    
    // 初始化键盘管理器
    this.initKeyboardManager();
    
    this.initialized = true;
  }
  
  /**
   * 初始化键盘管理器
   */
  initKeyboardManager() {
    try {
      // 初始化键盘管理器
      KeyboardManager.init();
      
      // 监听Ctrl键
      KeyboardManager.onCombination('ctrl', this.handleCtrlStateChange.bind(this));
    } catch (err) {
      console.error('初始化键盘管理器失败:', err);
    }
  }
  
  /**
   * 设置绘制模式
   * @param {string} mode - 绘制模式
   */
  setMode(mode) {
    // 如果模式没有变化，不做处理
    if (this.mode === mode) return;
    
    // 更新模式
    this.mode = mode;
    
    // 根据新模式更新绘制状态
    this.updateDrawingState();
  }
  
  /**
   * 处理Ctrl键状态变化
   * @param {boolean} isActive - Ctrl键是否被按下
   */
  handleCtrlStateChange(isActive) {
    // 仅在Ctrl键控制模式下处理
    if (this.mode !== DrawModeTypes.KEY_CTRL) return;
    
    // 更新绘制状态
    this.setDrawing(isActive);
  }
  
  /**
   * 手动开始绘制
   */
  startDrawing() {
    // 手动开始绘制
    if (this.mode === DrawModeTypes.MANUAL) {
      this.setDrawing(true);
    }
  }
  
  /**
   * 手动停止绘制
   */
  stopDrawing() {
    // 手动停止绘制
    if (this.mode === DrawModeTypes.MANUAL) {
      this.setDrawing(false);
    }
  }
  
  /**
   * 强制设置绘制状态，不考虑当前模式
   * @param {boolean} isDrawing - 是否绘制
   */
  forceDrawingState(isDrawing) {
    this.setDrawing(isDrawing);
  }
  
  /**
   * 更新绘制状态
   */
  updateDrawingState() {
    switch (this.mode) {
      case DrawModeTypes.NONE:
        this.setDrawing(false);
        break;
      case DrawModeTypes.ALWAYS:
        this.setDrawing(true);
        break;
      case DrawModeTypes.KEY_CTRL:
        // 检查Ctrl键是否被按下
        const isCtrlPressed = KeyboardManager.isKeyPressed('ctrl');
        this.setDrawing(isCtrlPressed);
        break;
      // 手动模式的绘制状态不会自动变化
      case DrawModeTypes.MANUAL:
      default:
        break;
    }
  }
  
  /**
   * 设置绘制状态
   * @param {boolean} isDrawing - 是否绘制
   */
  setDrawing(isDrawing) {
    // 如果状态没有变化，不做处理
    if (this.isDrawing === isDrawing) return;
    
    // 更新状态
    this.isDrawing = isDrawing;
    
    // 触发回调
    if (typeof this.onDrawingStateChange === 'function') {
      this.onDrawingStateChange(isDrawing);
    }
  }
  
  /**
   * 注册绘制状态变化回调
   * @param {Function} callback - 回调函数
   */
  registerDrawingStateCallback(callback) {
    this.onDrawingStateChange = callback;
  }
  
  /**
   * 获取当前绘制状态
   * @returns {boolean} 是否正在绘制
   */
  getDrawingState() {
    return this.isDrawing;
  }
  
  /**
   * 销毁
   */
  destroy() {
    // 移除Ctrl键监听
    KeyboardManager.offCombination('ctrl', this.handleCtrlStateChange);
    
    // 重置状态
    this.mode = DrawModeTypes.NONE;
    this.isDrawing = false;
    this.onDrawingStateChange = null;
  }
}

// 导出单例实例
const drawModeManager = new DrawModeManager();
export default drawModeManager; 