import axios from 'axios'
import qs from 'qs'
// import _ from 'lodash'
import merge from 'lodash/merge'
import { Message, MessageBox } from 'element-ui'
import { globalConfig } from 'data-room-ui/js/config' // 引入全局配置
/**
 * 统一进行异常输出
 * 如果异常只是弹框显示即可，可使用该实例
 */

// 添加请求缓存，用于截流和取消
const pendingRequests = new Map() // Stores { requestKey: { promise, controller } }

// 生成请求的唯一标识
const generateRequestKey = (config) => {
  const { url, method, params, data } = config
  return `${method}:${url}:${JSON.stringify(params)}:${JSON.stringify(data)}`
}

// 检查是否有相同请求正在进行中
const checkPendingRequest = (config) => {
  const requestKey = generateRequestKey(config)
  if (pendingRequests.has(requestKey)) {
    // 如果请求已经在进行中，返回一个已存在的Promise
    const pending = pendingRequests.get(requestKey)
    return {
      isPending: true,
      promise: pending.promise,
      controller: pending.controller // Return existing controller
    }
  }
  return { isPending: false }
}

// 添加请求到缓存
const addPendingRequest = (config, promise, controller) => {
  const requestKey = generateRequestKey(config)
  pendingRequests.set(requestKey, { promise, controller })
  return requestKey
}

// 从缓存中移除请求
const removePendingRequest = (requestKey) => {
  pendingRequests.delete(requestKey)
}

const httpConfig = {
  timeout: 1000 * 300,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
}

const httpCustom = axios.create(httpConfig)
/**
 *对于出现异常时还需要做其他操作，可使用该实例
 */
const http = axios.create(httpConfig)

/**
 * 封装的异常对象
 * @param message
 * @param code
 * @constructor
 *
 */
function EipException (message, code) {
  this.msg = message
  this.code = code
}
/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  // 从session中获取ticket
  const ticket = sessionStorage.getItem('ticket')
  // 如果ticket存在，则添加到请求头
  if (ticket) {
    if (!config.headers) {
      config.headers = {}
    }
    config.headers['x-api-key'] = ticket
  }
  // 修复配置合并问题，确保不会覆盖原始配置
  const mergedConfig = merge({}, config, merge(httpConfig, window.BS_CONFIG?.httpConfigs))
  return mergedConfig
}, error => {
  return Promise.reject(error)
})

/**
 * 自定义请求拦截
 */
httpCustom.interceptors.request.use(config => {
  // 从session中获取ticket
  const ticket = sessionStorage.getItem('ticket')
  // 如果ticket存在，则添加到请求头
  if (ticket) {
    if (!config.headers) {
      config.headers = {}
    }
    config.headers['x-api-key'] = ticket
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  // 检查请求是否已被取消，如果是，则不进行后续处理
  if (response.config && response.config.signal && response.config.signal.aborted) {
    // 可以选择静默处理或抛出一个特定的取消错误
    // console.log('Request was cancelled, response ignored.');
    // return Promise.reject(new axios.Cancel('Request cancelled by client.'));
    // 或者根据业务需求，如果取消的请求不应视为错误，则返回一个标记
    return { __CANCELLED__: true, requestConfig: response.config }; 
  }

  // 验证请求头是否包含x-api-key


  if (response?.data?.msg?.includes("租户ID为空")) {
    MessageBox.confirm(
      '检测到您的租户ID为空，请前往 ThingsPanel 登录。',
      '提示',
      {
        confirmButtonText: '前往登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      // 用户点击确认按钮，跳转到 ThingsPanel 登录页
      window.location.href = globalConfig.urls.thingsPanelLogin;
    }).catch(() => {
      // 用户点击取消按钮，不做任何操作
    });
  }

  const res = response.data
  // 异常拦截
  // eslint-disable-next-line no-empty
  if (res && res.code === 401) {
  } else if (res && res.code !== 200) {
    // return Promise.reject(response.data.msg)
    Message({
      message: response.data.msg,
      type: 'error'
    })
    throw new EipException(response.data.msg, response.data.code)
  } else {
    return res
  }
}, error => {
  // 处理请求取消
  if (axios.isCancel(error)) {
    // console.log('Request canceled', error.message);
    return Promise.reject(error); // 或者根据业务需求返回特定格式
  }

  if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
    Message({
      message: '请求超时，请稍后重试',
      type: 'error'
    });
    return Promise.reject(new EipException('请求超时', 'TIMEOUT'));
  } else if (error.message && error.message === 'Network Error') {
    Message({
      message: '网络错误，请检查您的网络连接',
      type: 'error'
    });
    return Promise.reject(new EipException('网络错误', 'NETWORK_ERROR'));
  } else {
    Message({
      message: error.response?.data?.msg || '服务异常',
      type: 'error'
    });
  }
  return Promise.reject(error);
})

/**
 * 响应拦截
 */
httpCustom.interceptors.response.use(response => {
  // 验证请求头是否包含x-api-key
  const res = response.data
  return res
}, error => {
  if (error.message && error.message === 'Network Error') {
    return Promise.reject(error)
  // eslint-disable-next-line no-empty
  } else {
  }
  Message({
    message: '服务异常',
    type: 'error'
  })
  return Promise.reject(error)
})

/**
 * get请求
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function get (url, params = {}, customHandlerException = false, axiosRequestConfig = {}) {
  if (!url.startsWith('http')) {
    const baseURL = window.BS_CONFIG?.httpConfigs?.baseURL
    if (baseURL && baseURL.trim()) {
      url = baseURL + url
    } else {
      console.warn('BaseURL is not configured properly, using relative URL:', url)
    }
  }
  // 如果是ie浏览器要添加个时间戳，解决浏览器缓存问题
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    params._t = new Date().getTime()
  }
  const axiosInstance = customHandlerException ? httpCustom : http
  
  // 创建请求配置
  const config = {
    url,
    method: 'get',
    params,
    data: {}
  }
  
  // 检查是否有相同请求正在进行
  const { isPending, promise, controller: existingController } = checkPendingRequest(config)
  if (isPending && !config.ignoreThrottle) {
    // 如果有相同请求正在进行，直接返回已存在的promise
    // 如果需要，可以提供一种方式来取消这个正在进行的请求，但这会改变原有逻辑
    // 例如: if (axiosRequestConfig.signal) { existingController.abort(); /* then proceed with new request or error */ }
    return promise
  }
  
  const controller = axiosRequestConfig.signal ? null : new AbortController();
  const signal = axiosRequestConfig.signal || controller?.signal;

  const requestPromise = new Promise((resolve, reject) => {
    axiosInstance.get(url, {
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
      },
      signal: signal, // 添加 signal
      ...axiosRequestConfig // 合并用户传入的其余axios配置
    }).then(response => {
      if (customHandlerException) {
        resolve(response)
      } else {
        resolve(response.data)
      }
      // 请求完成后，从缓存中移除
      removePendingRequest(generateRequestKey(config))
    }).catch(err => {
      reject(err)
      // 请求失败后，也要从缓存中移除
    }).finally(() => {
      // 无论成功或失败，都从缓存中移除
      removePendingRequest(generateRequestKey(config))
    })
  })
  
  // 将请求和controller添加到缓存中
  // 只缓存由这个函数内部创建的controller
  if (controller) {
    addPendingRequest(config, requestPromise, controller)
  } else if (!axiosRequestConfig.signal) {
    // 如果外部没有传入signal，且内部也没有创建（理论上不应发生），创建一个以保持一致性
    const internalController = new AbortController();
    addPendingRequest(config, requestPromise, internalController);
  }
  
  return requestPromise
}

/**
 * Post 请求
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function post (url, data = {}, customHandlerException = false, axiosRequestConfig = {}) {
  if (!url.startsWith('http')) {
    const baseURL = window.BS_CONFIG?.httpConfigs?.baseURL
    if (baseURL && baseURL.trim()) {
      url = baseURL + url
    } else {
      console.warn('BaseURL is not configured properly, using relative URL:', url)
    }
  }
  const axiosInstance = customHandlerException ? httpCustom : http
  const jsonData = JSON.stringify(data)
  
  // 创建请求配置
  const config = {
    url,
    method: 'post',
    params: {},
    data
  }
  
  // 检查是否有相同请求正在进行
  const { isPending, promise, controller: existingController } = checkPendingRequest(config)
  if (isPending && !config.ignoreThrottle) {
    // 如果有相同请求正在进行，直接返回已存在的promise
    return promise
  }
  
  const controller = axiosRequestConfig.signal ? null : new AbortController();
  const signal = axiosRequestConfig.signal || controller?.signal;

  const requestPromise = new Promise((resolve, reject) => {
    axiosInstance.post(url, jsonData, {
      signal: signal, // 添加 signal
      ...axiosRequestConfig // 合并用户传入的其余axios配置
    }).then(response => {
      if (customHandlerException) {
        resolve(response)
      } else {
        resolve(response.data)
      }
      // 请求完成后，从缓存中移除
      removePendingRequest(generateRequestKey(config))
    }).catch(err => {
      reject(err)
    }).finally(() => {
      // 无论成功或失败，都从缓存中移除
      removePendingRequest(generateRequestKey(config))
    })
  })
  
  // 将请求和controller添加到缓存中
  if (controller) {
    addPendingRequest(config, requestPromise, controller)
  } else if (!axiosRequestConfig.signal) {
    const internalController = new AbortController();
    addPendingRequest(config, requestPromise, internalController);
  }
  
  return requestPromise
}
/**
 * download 请求
 * @returns {Promise<any>}
 */

export function download (url, headers = {}, params = {}, body = {}) {
  if (!url.startsWith('http')) {
    const baseURL = window.BS_CONFIG?.httpConfigs?.baseURL
    if (baseURL && baseURL.trim()) {
      url = baseURL + url
    } else {
      console.warn('BaseURL is not configured properly, using relative URL:', url)
    }
  }
  // 如果是ie浏览器要添加个时间戳，解决浏览器缓存问题
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    params._t = new Date().getTime()
  }

  // 从session中获取ticket
  const ticket = sessionStorage.getItem('ticket')
  // 如果ticket存在，则添加到请求头
  if (ticket) {
    headers['x-api-key'] = ticket
  
  }
  
  // 创建请求配置
  const config = {
    url,
    method: 'post',
    params,
    data: body
  }
  
  // 检查是否有相同请求正在进行
  const { isPending, promise } = checkPendingRequest(config)
  if (isPending) {
    // 对于下载请求，也应用截流
    return promise
  }

  const requestPromise = new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      headers: headers,
      params: params,
      data: body,
      withCredentials: false,
      responseType: 'arraybuffer'
    }).then(res => {
      // IE10,11采用自带下载文件流方法
      if ((!!window.ActiveXObject || 'ActiveXObject' in window) && window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(new Blob([res.data]), res.headers.filename)
        removePendingRequest(generateRequestKey(config))
        return
      }
      const fileUrl = window.URL.createObjectURL(new Blob([res.data]))
      // 创建超链接
      const fileLink = document.createElement('a')
      fileLink.href = fileUrl
      // 设置下载文件名
      let responseFileName = res.headers.filename
      // 解决中文乱码
      responseFileName = window.decodeURI(responseFileName)
      fileLink.setAttribute('download', responseFileName)
      document.body.appendChild(fileLink)
      // 模拟人工点击下载超链接
      fileLink.click()
      // 释放资源
      document.body.removeChild(fileLink)
      window.URL.revokeObjectURL(fileUrl)
      
      // 请求完成后，从缓存中移除
      removePendingRequest(generateRequestKey(config))
      resolve()
    }).catch(e => {
      const status = e?.response?.status
      if (status === 404) {
        Message({
          message: '文件不存在或已被删除',
          type: 'error'
        })
      } else {
        Message({
          message: '服务异常',
          type: 'error'
        })
      }
      // 请求失败后，也要从缓存中移除
      removePendingRequest(generateRequestKey(config))
      reject(e)
    })
  })
  
  // 将请求添加到缓存中
  addPendingRequest(config, requestPromise)
  
  return requestPromise
}
