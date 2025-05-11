/**
 * 键盘事件管理器
 * 管理键盘事件监听和按键状态
 */
class KeyboardManager {
  constructor() {
    // 存储所有按键状态
    this.keysPressed = new Map();
    
    // 事件回调字典
    this.keyCallbacks = {
      keydown: new Map(),
      keyup: new Map(),
      keypress: new Map()
    };
    
    // 组合键回调
    this.combinationCallbacks = new Map();
    
    // 特殊键名映射（处理跨浏览器兼容性）
    this.keyNameMap = {
      'ctrl': ['control', 'ctrl'],
      'shift': ['shift'],
      'alt': ['alt', 'option'],
      'meta': ['meta', 'command', 'cmd', 'win', 'windows']
    };
    
    // 标记是否已初始化
    this.initialized = false;
    
    // 调试模式
    this.debug = true;
    
    // 绑定事件处理器的this
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  
  /**
   * 初始化键盘事件监听
   */
  init() {
    if (this.initialized) return;
    
    // 添加全局键盘事件监听
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    
    this.initialized = true;
    
    if (this.debug) {
      console.log('KeyboardManager 初始化完成');
    }
  }
  
  /**
   * 销毁键盘事件监听
   */
  destroy() {
    if (!this.initialized) return;
    
    // 移除全局键盘事件监听
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    
    // 清空所有状态和回调
    this.keysPressed.clear();
    this.keyCallbacks.keydown.clear();
    this.keyCallbacks.keyup.clear();
    this.keyCallbacks.keypress.clear();
    this.combinationCallbacks.clear();
    
    this.initialized = false;
    
    if (this.debug) {
      console.log('KeyboardManager 已销毁');
    }
  }
  
  /**
   * 处理键盘按下事件
   * @param {KeyboardEvent} event - 键盘事件
   */
  handleKeyDown(event) {
    // 获取键名并转换为小写
    const key = event.key.toLowerCase();
    
    // 特殊处理Ctrl键 (兼容不同浏览器)
    if (event.ctrlKey || key === 'control' || key === 'ctrl') {
      this.keysPressed.set('ctrl', true);
      this.keysPressed.set('control', true);
      
      if (this.debug) {
        console.log('Ctrl键已按下 (特殊处理)');
      }
    }
    
    if (this.debug) {
      console.log(`键盘按下: ${key}`);
    }
    
    // 如果按键状态未改变，不触发事件
    if (this.keysPressed.get(key) && key !== 'ctrl' && key !== 'control') return;
    
    // 更新按键状态
    this.keysPressed.set(key, true);
    
    // 触发对应按键的回调
    if (this.keyCallbacks.keydown.has(key)) {
      this.keyCallbacks.keydown.get(key).forEach(callback => callback(event));
    }
    
    // 检查组合键
    this.checkCombinations();
  }
  
  /**
   * 处理键盘释放事件
   * @param {KeyboardEvent} event - 键盘事件
   */
  handleKeyUp(event) {
    // 获取键名并转换为小写
    const key = event.key.toLowerCase();
    
    // 特殊处理Ctrl键 (兼容不同浏览器)
    if (!event.ctrlKey && (key === 'control' || key === 'ctrl')) {
      this.keysPressed.set('ctrl', false);
      this.keysPressed.set('control', false);
      
      if (this.debug) {
        console.log('Ctrl键已释放 (特殊处理)');
      }
    }
    
    if (this.debug) {
      console.log(`键盘释放: ${key}`);
    }
    
    // 更新按键状态
    this.keysPressed.set(key, false);
    
    // 触发对应按键的回调
    if (this.keyCallbacks.keyup.has(key)) {
      this.keyCallbacks.keyup.get(key).forEach(callback => callback(event));
    }
    
    // 检查组合键
    this.checkCombinations();
  }
  
  /**
   * 检查组合键状态并触发回调
   */
  checkCombinations() {
    this.combinationCallbacks.forEach((callbacks, combination) => {
      const isActive = this.isCombinationActive(combination);
      
      callbacks.forEach(callback => callback(isActive));
      
      if (this.debug) {
        console.log(`组合键 '${combination}' 状态: ${isActive ? '激活' : '未激活'}`);
      }
    });
  }
  
  /**
   * 注册单个按键事件回调
   * @param {string} eventType - 事件类型 (keydown, keyup, keypress)
   * @param {string} key - 按键名称
   * @param {Function} callback - 回调函数
   */
  on(eventType, key, callback) {
    if (!this.keyCallbacks[eventType]) return;
    
    const lowercaseKey = key.toLowerCase();
    
    if (!this.keyCallbacks[eventType].has(lowercaseKey)) {
      this.keyCallbacks[eventType].set(lowercaseKey, []);
    }
    
    this.keyCallbacks[eventType].get(lowercaseKey).push(callback);
    
    if (this.debug) {
      console.log(`已注册 ${eventType} 事件回调: ${lowercaseKey}`);
    }
  }
  
  /**
   * 移除单个按键事件回调
   * @param {string} eventType - 事件类型 (keydown, keyup, keypress)
   * @param {string} key - 按键名称
   * @param {Function} callback - 要移除的回调函数
   */
  off(eventType, key, callback) {
    if (!this.keyCallbacks[eventType]) return;
    
    const lowercaseKey = key.toLowerCase();
    
    if (!this.keyCallbacks[eventType].has(lowercaseKey)) return;
    
    const callbacks = this.keyCallbacks[eventType].get(lowercaseKey);
    const index = callbacks.indexOf(callback);
    
    if (index !== -1) {
      callbacks.splice(index, 1);
      
      if (this.debug) {
        console.log(`已移除 ${eventType} 事件回调: ${lowercaseKey}`);
      }
    }
  }
  
  /**
   * 注册组合键事件回调
   * @param {string} combination - 组合键 (例如: "ctrl+shift")
   * @param {Function} callback - 回调函数，接收isActive参数
   */
  onCombination(combination, callback) {
    const normalizedCombination = combination.toLowerCase();
    
    if (!this.combinationCallbacks.has(normalizedCombination)) {
      this.combinationCallbacks.set(normalizedCombination, []);
    }
    
    this.combinationCallbacks.get(normalizedCombination).push(callback);
    
    if (this.debug) {
      console.log(`已注册组合键回调: ${normalizedCombination}`);
    }
  }
  
  /**
   * 移除组合键事件回调
   * @param {string} combination - 组合键 (例如: "ctrl+shift")
   * @param {Function} callback - 要移除的回调函数
   */
  offCombination(combination, callback) {
    const normalizedCombination = combination.toLowerCase();
    
    if (!this.combinationCallbacks.has(normalizedCombination)) return;
    
    const callbacks = this.combinationCallbacks.get(normalizedCombination);
    const index = callbacks.indexOf(callback);
    
    if (index !== -1) {
      callbacks.splice(index, 1);
      
      if (this.debug) {
        console.log(`已移除组合键回调: ${normalizedCombination}`);
      }
    }
  }
  
  /**
   * 检查按键是否被按下
   * @param {string} key - 按键名称
   * @returns {boolean} 是否按下
   */
  isKeyPressed(key) {
    // 将输入键名转换为小写
    const lowercaseKey = key.toLowerCase();
    
    // 首先直接检查键名
    if (this.keysPressed.get(lowercaseKey)) {
      return true;
    }
    
    // 如果没找到，检查是否是特殊键（如ctrl, shift等）
    if (this.keyNameMap[lowercaseKey]) {
      // 检查所有可能的键名（考虑浏览器兼容性）
      return this.keyNameMap[lowercaseKey].some(alternateKey => 
        this.keysPressed.get(alternateKey)
      );
    }
    
    return false;
  }
  
  /**
   * 检查组合键是否被激活
   * @param {string} combination - 组合键 (例如: "ctrl+shift")
   * @returns {boolean} 是否激活
   */
  isCombinationActive(combination) {
    const keys = combination.toLowerCase().split('+');
    return keys.every(k => this.isKeyPressed(k));
  }
}

// 导出单例实例
const keyboardManager = new KeyboardManager();
export default keyboardManager; 