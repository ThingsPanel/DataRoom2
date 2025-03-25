import axios from 'axios'

// IoT设备API基础URL
const IOT_API_BASE_URL = 'http://47.115.210.16:9999/api/v1'

// 创建自定义axios实例
const iotAxios = axios.create({
  baseURL: IOT_API_BASE_URL,
  timeout: 30000
})

// 请求拦截器，用于添加票据信息
iotAxios.interceptors.request.use(config => {
  // 从session中获取ticket
  const ticket = sessionStorage.getItem('ticket')
  if (ticket) {
    config.headers['x-api-key'] = ticket
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 获取设备列表
 * @param {Object} params 请求参数
 * @param {number} params.page 页码
 * @param {number} params.page_size 每页数量
 * @param {string} params.search 搜索关键词(可选)
 * @param {string} params.is_online 在线状态过滤(可选)
 * @returns {Promise<Object>} 设备列表数据
 */
export function getDeviceList (params) {
  return iotAxios.get('/device', { params })
}

/**
 * 获取设备的指标数据
 * @param {string} deviceId 设备ID
 * @returns {Promise<Object>} 指标数据列表，包含分类和指标选项
 */
export function getDeviceMetrics (deviceId) {
  return iotAxios.get(`/device/metrics/${deviceId}`)
}

/**
 * 根据设备ID获取设备详情
 * @param {string} deviceId 设备ID
 * @returns {Promise<Object>} 设备详情数据
 */
export function getDeviceDetails (deviceId) {
  return iotAxios.get(`/device/${deviceId}`)
}

/**
 * 获取设备的遥测数据
 * @param {string} deviceId 设备ID
 * @param {Object} params 请求参数
 * @returns {Promise<Object>} 遥测数据
 */
export function getDeviceTelemetry (deviceId, params) {
  return iotAxios.get(`/device/${deviceId}/telemetry`, { params })
}

/**
 * 获取设备的在线状态
 * @param {string} deviceId 设备ID
 * @returns {Promise<Object>} 设备在线状态
 */
export function getDeviceOnlineStatus (deviceId) {
  // 使用查询参数而不是路径参数，避免路由冲突
  return iotAxios.get('/device/status', { params: { device_id: deviceId } })
} 