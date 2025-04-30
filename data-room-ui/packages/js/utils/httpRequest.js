import axios from 'axios'
import store from '../store'

/**
 * HTTP请求配置接口
 * @typedef {Object} HttpConfig
 * @property {string} url - 请求URL
 * @property {Object} params - 请求参数
 * @property {Object} headers - 请求头
 * @property {string} method - 请求方法(GET/POST)
 * @property {boolean} [polling] - 是否开启轮询
 * @property {number} [pollingInterval] - 轮询间隔(ms),默认1000ms
 * @property {number} [timeout] - 请求超时时间(ms),默认30000ms
 * @property {number} [retryCount] - 请求失败重试次数,默认0
 * @property {number} [retryDelay] - 请求失败重试延迟(ms),默认1000ms
 * @property {string} [componentId] - 组件ID,用于标识轮询请求所属的组件
 */

// 请求队列管理
const pendingRequests = new Map()

/**
 * 创建请求标识
 * @param {HttpConfig} config - 请求配置
 * @returns {string} 请求标识
 */
const createRequestKey = (config) => {
  const baseKey = `${config.method}_${config.url}_${JSON.stringify(config.params || {})}`
  // 如果有组件ID，将其添加到请求标识中
  return config.componentId ? `${config.componentId}_${baseKey}` : baseKey
}

/**
 * 创建基础axios实例
 * @param {Object} config - axios配置
 */
const createAxiosInstance = (config = {}) => {
  return axios.create({
    timeout: config.timeout || 30000,
    headers: { 'Content-Type': 'application/json', ...config.headers }
  })
}

/**
 * 取消重复的请求
 * @param {string} requestKey - 请求标识
 */
const cancelPendingRequest = (requestKey) => {
  if (pendingRequests.has(requestKey)) {
    const controller = pendingRequests.get(requestKey)
    controller.abort()
    pendingRequests.delete(requestKey)
  }
}

/**
 * 添加请求到队列
 * @param {string} requestKey - 请求标识
 * @param {AbortController} controller - 中断控制器
 */
const addPendingRequest = (requestKey, controller) => {
  pendingRequests.set(requestKey, controller)
}

/**
 * 从队列中移除请求
 * @param {string} requestKey - 请求标识
 */
const removePendingRequest = (requestKey) => {
  pendingRequests.delete(requestKey)
}

/**
 * 请求重试
 * @param {Function} fn - 请求函数
 * @param {number} retryCount - 重试次数
 * @param {number} retryDelay - 重试延迟
 * @returns {Promise} 重试Promise
 */
const retry = async (fn, retryCount, retryDelay) => {
  try {
    return await fn()
  } catch (error) {
    if (retryCount <= 0) {
      throw error
    }
    
    // 延迟指定时间后重试
    await new Promise(resolve => setTimeout(resolve, retryDelay))
    return retry(fn, retryCount - 1, retryDelay)
  }
}

/**
 * 发送单次请求
 * @param {HttpConfig} config - 请求配置
 * @returns {Promise} 请求Promise
 */
export const sendRequest = async (config) => {
  // 生成请求标识
  const requestKey = createRequestKey(config)
  // 如果该请求已经在进行中，取消上一个请求
  cancelPendingRequest(requestKey)
  // 创建新的AbortController
  const controller = new AbortController()
  // 添加到请求队列
  addPendingRequest(requestKey, controller)
  // 请求函数
  const requestFn = async () => {
    try {
      const instance = createAxiosInstance(config)
      
      // 如果是 IoT 数据集，使用固定参数
      let requestParams = config.params
      if (config.datasetType === 'iot') {
        requestParams = {
          device_id: 'db2b6a1a-00e4-5c0d-8154-44edeb441bb4',
          device_name: '虚拟温湿度传感器',
          key: 'humidity',
          data_type: 'telemetry',
          data_mode: 'latest',
          time_range: 'last_1_hour',
          aggregate_window: '1m',
          aggregate_function: 'avg',
          start_ts: null,
          end_ts: null
        }
      }
      
      const response = await instance({
        method: config.method,
        url: config.url,
        params: config.method.toLowerCase() === 'get' ? requestParams : undefined,
        data: config.method.toLowerCase() === 'post' ? requestParams : undefined,
        signal: controller.signal,
        timeout: config.timeout || 30000
      })

      // 请求完成后从队列移除
      removePendingRequest(requestKey)

      return response.data
    } catch (error) {
      // 请求出错后从队列移除
      removePendingRequest(requestKey)

      // 如果是取消的请求，特殊处理
      if (axios.isCancel(error)) {
        const cancelError = new Error('请求已取消')
        cancelError.isCancel = true
        throw cancelError
      }
      throw error
    }
  }
  // 支持请求重试
  const retryCount = config.retryCount || 0
  const retryDelay = config.retryDelay || 1000
  return retry(requestFn, retryCount, retryDelay)
}

/**
 * 开启轮询请求 - 使用组件ID关联
 * @param {HttpConfig} config - 请求配置
 * @param {Function} callback - 成功回调函数
 * @param {Function} errorCallback - 错误回调函数
 * @returns {string} 组件ID
 */
export const startPolling = (config, callback, errorCallback) => {
  // 必须提供组件ID
  if (!config.componentId) {
    console.error('必须提供组件ID来启动轮询')
    return null
  }
  
  
  // 首先检查是否已经有相同组件ID的轮询，如果有先停止
  stopPolling(config.componentId)
  
  // 验证轮询间隔
  const interval = Math.max(config.pollingInterval || 1000, 1000)
  
  // 创建轮询函数
  const poll = async () => {
    try {
      const result = await sendRequest(config)
      if (callback) {
        callback(result)
      }
    } catch (error) {
      if (error.isCancel !== true && errorCallback) {
        errorCallback(error)
      }
    }
  }
  
  // 立即执行一次
  poll()
  
  // 设置定期轮询
  const timerId = setInterval(poll, interval)
  
  // 使用Vuex管理轮询定时器
  if (store && store.commit) {
    store.commit('ADD_POLLING_TIMER', { code: config.componentId, timerId })
  } else {
    // 如果Vuex不可用，使用内存存储
    if (!window._pollingTimers) window._pollingTimers = {}
    window._pollingTimers[config.componentId] = timerId
  }
  
  return config.componentId
}

/**
 * 停止轮询 - 使用组件ID
 * @param {string} componentId - 组件ID
 */
export const stopPolling = (componentId) => {
  if (!componentId) {
    console.error('必须提供组件ID来停止轮询')
    return
  }
  
  
  // 使用Vuex管理的轮询定时器进行清理
  if (store && store.commit && store.state && store.state.pollingTimers) {
    const vuexTimer = store.state.pollingTimers[componentId]
    if (vuexTimer) {
      clearInterval(vuexTimer)
      store.commit('CLEAR_POLLING_TIMER', componentId)
    } 
  } 
  
  // 检查内存中是否有存储的定时器
  if (window._pollingTimers && window._pollingTimers[componentId]) {
    clearInterval(window._pollingTimers[componentId])
    delete window._pollingTimers[componentId]
  }
  
  // 取消该组件的所有进行中的请求
  for (const [key, controller] of pendingRequests.entries()) {
    if (key.startsWith(`${componentId}_`)) {
      controller.abort()
      pendingRequests.delete(key)
    }
  }
}

/**
 * 取消组件的所有请求 (非轮询)
 * @param {string} componentId - 组件ID
 */
export const cancelComponentRequests = (componentId) => {
  if (!componentId) return
  
  for (const [key, controller] of pendingRequests.entries()) {
    if (key.startsWith(`${componentId}_`)) {
      controller.abort()
      pendingRequests.delete(key)
    }
  }
}

/**
 * 取消所有请求
 */
export const cancelAllRequests = () => {
  for (const [key, controller] of pendingRequests.entries()) {
    controller.abort()
    pendingRequests.delete(key)
  }
}

/**
 * 停止所有轮询
 */
export const stopAllPolling = () => {
  if (store && store.state && store.state.pollingTimers) {
    const timers = store.state.pollingTimers
    for (const code in timers) {
      stopPolling(code)
    }
  }
}

// 在页面卸载时取消所有请求和轮询
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    cancelAllRequests()
    stopAllPolling()
  })
} 