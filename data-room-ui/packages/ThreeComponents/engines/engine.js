/**
 * 默认Three.js引擎
 * 提供基本的3D模型加载和渲染功能
 */

// 定义一个全局类
window.Custom3DEngine = class {
  /**
   * 构造函数
   * @param {Object} config 配置对象
   */
  constructor(config) {
    console.log('默认引擎初始化', config)
    this.container = config.container
    this.modelPath = config.modelPath || ''
    this.options = config.options || {}
    this.data = config.data || []
    this.eventListeners = {}
    
    // 记录初始化完成
    console.log('默认引擎初始化完成')
  }
  
  /**
   * 注册事件监听
   * @param {string} eventName 事件名称
   * @param {Function} callback 回调函数
   * @returns {Object} 返回当前引擎实例，支持链式调用
   */
  on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = []
    }
    this.eventListeners[eventName].push(callback)
    return this
  }
  
  /**
   * 触发事件
   * @param {string} eventName 事件名称
   * @param {*} data 事件数据
   */
  trigger(eventName, data) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName].forEach(callback => {
        callback(data)
      })
    }
  }
  
  /**
   * 销毁引擎，释放资源
   */
  destroy() {
    console.log('销毁默认引擎')
    this.eventListeners = {}
  }
}
