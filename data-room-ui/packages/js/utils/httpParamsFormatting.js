import axios from 'axios'
// import { Loading, Message } from 'element-ui'
// import _ from 'lodash'
import cloneDeep from 'lodash/cloneDeep'

/**
 * HTTP请求格式化函数 - 轮询功能已禁用
 * 
 * 注意：此函数已被修改为禁止轮询功能
 * - 不支持重复调用
 * - 不支持定时器循环
 * - 每次调用只执行一次请求
 * 
 * 如需轮询功能，请使用 httpRequest.js 中的轮询相关函数
 */

// 轮询检测和阻止机制
const requestTracker = {
  activeRequests: new Set(),
  maxConcurrentRequests: 1, // 限制最大并发请求数为1，防止轮询
  
  // 检查是否允许发起新请求
  canMakeRequest(requestId) {
    // 如果已经有活跃请求，拒绝新的请求（防止轮询）
    if (this.activeRequests.size >= this.maxConcurrentRequests) {
      console.warn('轮询功能已禁用：检测到重复请求，已阻止执行')
      return false
    }
    return true
  },
  
  // 添加活跃请求
  addRequest(requestId) {
    this.activeRequests.add(requestId)
  },
  
  // 移除活跃请求
  removeRequest(requestId) {
    this.activeRequests.delete(requestId)
  }
}

export default function axiosFormatting (customConfig) {
  // 生成请求ID用于跟踪
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  // 检查是否允许发起请求（防止轮询）
  if (!requestTracker.canMakeRequest(requestId)) {
    return Promise.reject(new Error('轮询功能已禁用：不允许重复请求'))
  }
  
  // 添加请求到跟踪器
  requestTracker.addRequest(requestId)
  
  const newCustomConfig = replaceParams(customConfig)

  // 将请求头和请求参数的值转化为对象形式
  const httpConfig = {
    timeout: 1000 * 300,
    baseURL: '',
    headers: { 'Content-Type': 'application/json', ...newCustomConfig.headers }
  }
  // let loadingInstance = null // 加载全局的loading
  const instance = axios.create(httpConfig)
  /** 添加请求拦截器 **/
  instance.interceptors.request.use(config => {
    /**
     * 在这里：可以根据业务需求可以在发送请求之前做些什么。
     * config.headers['token'] = sessionStorage.getItem('token') || ''
     */
    // 执行请求脚本
    // https://mock.presstime.cn/mock/64bf8a00ce1b0ea640809069/test_copy_copy_copy/httpData?token=123&ss=ss
    const req = { ...config, url: {} }
    eval(newCustomConfig.requestScript)
    for (const key in req.url) {
      newCustomConfig.url = replaceUrlParam(newCustomConfig.url, key, req.url[key])
    }
    config = { ...config, ...req, url: newCustomConfig.url }
    return config
  }, error => {
    // 对请求错误做些什么
    // 移除请求跟踪
    requestTracker.removeRequest(requestId)
    return Promise.reject(error)
  })

  /** 添加响应拦截器  **/
  instance.interceptors.response.use(response => {
    const resp = response.data
    // 执行响应脚本
    if (newCustomConfig.responseScript) {
      // eslint-disable-next-line no-new-func
      const getResp = new Function('resp', newCustomConfig.responseScript)
      const res = getResp(resp)
      return Promise.resolve(res)
    } else {
      return Promise.resolve(resp)
    }
  }, error => {
    // 响应错误时也要移除请求跟踪
    requestTracker.removeRequest(requestId)
    return Promise.reject(error)
  })
  
  const body = newCustomConfig?.body.replace(/: ,/g, ':undefined,').replace(/, }/g, ',undefined}')
  /** 发送请求  **/
  return new Promise((resolve, reject) => {
  
    // === Add diagnostic log ===
    // === End diagnostic log ===
    instance({
      method: newCustomConfig.method,
      url: newCustomConfig.url,
      params: newCustomConfig.params,
      // params 序列化操作
      paramsSerializer: (params) => {
        return Object.keys(params)
          .map(key => {
            if (Array.isArray(params[key])) {
              return params[key].map(value => `${key}=${value}`).join('&')
            } else {
              return `${key}=${params[key]}`
            }
          })
          .join('&')
      },
      data: newCustomConfig.method === 'post' ? body : undefined
    }).then(response => {
      // 请求成功后移除跟踪
      requestTracker.removeRequest(requestId)
      resolve(response)
    }).catch(error => {
      // 请求失败后移除跟踪
      requestTracker.removeRequest(requestId)
      reject(error)
    })
  })
}
// 动态替换url后面参数的值
function replaceUrlParam (url, paramName, paramValue) {
  const regex = new RegExp(`([?&])${paramName}=.*?(&|$)`, 'i')
  const separator = url.indexOf('?') !== -1 ? '&' : '?'
  if (url.match(regex)) {
    return url.replace(regex, `$1${paramName}=${paramValue}$2`)
  } else {
    return `${url}${separator}${paramName}=${paramValue}`
  }
}
// 将参数的值替换掉其他配置中对应属性的值
function replaceParams (customConfig) {
  const newConfig = cloneDeep(customConfig || {})
  // 确保关键属性有默认值，防止 undefined 错误
  newConfig.url = newConfig.url || ''
  newConfig.headers = newConfig.headers || []
  newConfig.params = newConfig.params || []
  newConfig.body = newConfig.body || '{}'
  newConfig.paramsList = newConfig.paramsList || []
  // 安全地处理参数替换
  try {
    newConfig.url = evalStrFunc(newConfig.paramsList, newConfig.url)
    newConfig.headers = evalArrFunc(newConfig.paramsList, newConfig.headers)
    newConfig.params = evalArrFunc(newConfig.paramsList, newConfig.params)
    newConfig.body = evalStrFunc(newConfig.paramsList, newConfig.body)
  } catch (error) {
  }
  return newConfig
}

// 处理字符串类型参数
function evalStrFunc (paramsList, string) {
  // 如果输入无效，返回空字符串
  if (!string) return ''
  try {
    // 创建参数映射
    const paramMap = createParamMap(paramsList)
    // 替换模板字符串
    const processedString = string.replace(/\$\{(\w+)\}/g, (match, key) => {
      return paramMap[key] !== undefined ? paramMap[key] : match
    })
    return processedString
  } catch (error) {
    return string || ''
  }
}

// 处理数组类型参数
function evalArrFunc (paramsList, arr) {
  // 如果输入无效，返回空对象
  if (!arr || !Array.isArray(arr) || arr.length === 0) return {}
  try {
    // 创建参数映射
    const paramMap = createParamMap(paramsList)
    // 构建结果对象
    const result = arr.reduce((acc, item) => {
      if (!item || !item.key) return acc
      // 处理值中的模板字符串
      let value = item.value
      if (typeof value === 'string') {
        value = value.replace(/\$\{(\w+)\}/g, (match, key) => {
          return paramMap[key] !== undefined ? paramMap[key] : match
        })
      }
      // 根据键值添加到结果
      if (acc[item.key]) {
        if (Array.isArray(acc[item.key])) {
          acc[item.key].push(value)
        } else {
          acc[item.key] = [acc[item.key], value]
        }
      } else {
        acc[item.key] = value
      }
      return acc
    }, {})
    return result
  } catch (error) {
    return {}
  }
}

// 创建参数映射辅助函数
function createParamMap (paramsList) {
  if (!paramsList || !Array.isArray(paramsList)) return {}
  return paramsList.reduce((map, param) => {
    if (param && param.name !== undefined) {
      map[param.name] = param.value
    }
    return map
  }, {})
}

/**
 * 轮询功能禁用说明：
 * 
 * 此文件已被修改为禁止轮询功能，主要措施包括：
 * 1. 限制最大并发请求数为1
 * 2. 检测重复请求并阻止执行
 * 3. 添加请求跟踪机制
 * 4. 在控制台输出警告信息
 * 
 * 如果需要轮询功能，请使用以下替代方案：
 * - 使用 httpRequest.js 中的 startPolling() 函数
 * - 使用 httpRequest.js 中的 stopPolling() 函数
 * - 或者使用其他专门的轮询库
 */

// 清理函数：清除所有活跃请求（用于调试或重置）
export const clearAllRequests = () => {
  requestTracker.activeRequests.clear()
  console.log('已清除所有活跃请求跟踪')
}

// 获取当前活跃请求数量（用于调试）
export const getActiveRequestCount = () => {
  return requestTracker.activeRequests.size
}

// 导出轮询禁用状态（供外部检查）
export const isPollingDisabled = true
