import axios from 'axios'

/**
 * HTTP请求配置接口
 * @typedef {Object} HttpConfig
 * @property {string} url - 请求URL
 * @property {Object} params - 请求参数
 * @property {Object} headers - 请求头
 * @property {string} method - 请求方法(GET/POST)
 * @property {number} [timeout] - 请求超时时间(ms),默认600000ms
 * @property {number} [retryCount] - 请求失败重试次数,默认0
 * @property {number} [retryDelay] - 请求失败重试延迟(ms),默认1000ms
 */

// 请求队列管理
const pendingRequests = new Map()

/**
 * 创建请求标识
 * @param {HttpConfig} config - 请求配置
 * @returns {string} 请求标识
 */
const createRequestKey = (config) => {
  return `${config.method}_${config.url}_${JSON.stringify(config.params || {})}`
}

/**
 * 创建基础axios实例
 * @param {Object} config - axios配置
 */
const createAxiosInstance = (config = {}) => {
  return axios.create({
    timeout: config.timeout || 600000,
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
      timeout: config.timeout || 600000
    })

    // 请求完成后从队列移除
    removePendingRequest(requestKey)

    return response.data
  }
  
  // 支持请求重试
  const retryCount = config.retryCount || 0
  const retryDelay = config.retryDelay || 1000
  return retry(requestFn, retryCount, retryDelay)
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

// 在页面卸载时取消所有请求
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    cancelAllRequests()
  })
}