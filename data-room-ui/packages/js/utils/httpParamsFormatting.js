import axios from 'axios'
// import { Loading, Message } from 'element-ui'
// import _ from 'lodash'
import cloneDeep from 'lodash/cloneDeep'
export default function axiosFormatting (customConfig) {
  console.log('axiosFormatting 被调用，数据集类型:', customConfig.datasetType)
  const newCustomConfig = replaceParams(customConfig)
  console.log('处理后的请求配置:', {
    url: newCustomConfig.url,
    method: newCustomConfig.method,
    datasetType: newCustomConfig.datasetType
  })
  // 将请求头和请求参数的值转化为对象形式
  const httpConfig = {
    timeout: 1000 * 30,
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
  })
  const body = newCustomConfig?.body.replace(/: ,/g, ':undefined,').replace(/, }/g, ',undefined}')
  /** 发送请求  **/
  return new Promise((resolve, reject) => {
    console.log('准备发送请求:', {
      method: newCustomConfig.method,
      url: newCustomConfig.url,
      params: newCustomConfig.params,
      datasetType: newCustomConfig.datasetType
    })
    // === Add diagnostic log ===
    console.log('axiosFormatting - method value before request:', newCustomConfig.method, 'Type:', typeof newCustomConfig.method);
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
      resolve(response)
    }).catch(error => {
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
    console.error('参数替换错误:', error)
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
    console.error('字符串参数处理错误:', error)
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
    console.error('数组参数处理错误:', error)
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
