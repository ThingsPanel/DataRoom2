import axios from 'axios'

/**
 * 创建设备监控API实例
 * @param {string} baseURL - API基础URL
 * @param {string} apiKey - API密钥，留空则从存储空间获取
 * @returns {Object} 设备监控API对象
 */
export function createDeviceMonitorApi(baseURL = 'http://47.92.253.145:9102/api/v1', apiKey = '') {
  // 确保baseURL有效，防止null或空值
  const validBaseURL = (baseURL && baseURL.trim()) ? baseURL.trim() : 'http://47.92.253.145:9102/api/v1'
  
  // 确保apiKey有效
  const validApiKey = (apiKey && apiKey.trim()) ? apiKey.trim() : ''

  // 创建独立的axios实例
  const apiClient = axios.create({
    baseURL: validBaseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  // 请求拦截器
  apiClient.interceptors.request.use(
    config => {
      // 添加API认证密钥，优先使用传入的apiKey，作为降级从存储空间获取
      const finalApiKey = validApiKey || sessionStorage.getItem('ticket') || localStorage.getItem('ticket')
      if (finalApiKey) {
        config.headers['x-api-key'] = finalApiKey
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  apiClient.interceptors.response.use(
    response => {
      const result = response.data
      // 检查API响应格式
      if (result && result.code === 200) {
        return result.data
      } else {
        const errorMsg = result?.message || '请求失败'
        console.error('API响应错误:', errorMsg, result)
        throw new Error(errorMsg)
      }
    },
    error => {
      console.error('API请求错误:', error)
      // 处理网络错误或其他错误
      const errorMsg = error.response?.data?.message || error.message || '网络请求失败'
      return Promise.reject(new Error(errorMsg))
    }
  )

  return {
    /**
     * 获取设备汇总统计
     * @returns {Promise} API响应
     */
    getDeviceSummary() {
      return apiClient.get('/monitor/device_summary')
    },

    /**
     * 获取设备详细信息
     * @param {string} deviceId - 设备ID
     * @returns {Promise} API响应
     */
    getDeviceInfo(deviceId) {
      return apiClient.get(`/monitor/device_info/${deviceId}`)
    },

    /**
     * 获取产量曲线数据
     * @param {string} deviceId - 设备ID
     * @param {string} timeType - 时间类型: hour/day/month/year
     * @param {number} limit - 限制条数，默认10，最大100
     * @returns {Promise} API响应
     */
    getProductionCurve(deviceId, timeType = 'hour', limit = 24) {
      return apiClient.get('/monitor/production_curve', {
        params: {
          device_id: deviceId,
          time_type: timeType,
          limit: limit
        }
      })
    },

    /**
     * 获取设备实时遥测数据
     * @param {string} deviceId - 设备ID
     * @returns {Promise} API响应
     */
    getCurrentTelemetry(deviceId) {
      return apiClient.get(`/monitor/current_telemetry/${deviceId}`)
    },

    /**
     * 获取告警历史记录
     * @param {number} page - 页码，从1开始
     * @param {number} pageSize - 每页条数，最大100
     * @param {string} keyword - 搜索关键词(设备名称或编号)
     * @param {number} time - 时间范围，单位秒
     * @returns {Promise} API响应
     */
    getAlarmHistory(page = 1, pageSize = 20, keyword = '', time = null) {
      const params = {
        page: page,
        page_size: pageSize
      }

      if (keyword) {
        params.keyword = keyword
      }

      if (time) {
        params.time = time
      }

      return apiClient.get('/monitor/alarm_history', {
        params: params
      })
    }
  }
}

/**
 * 默认设备监控API实例
 * 使用默认的基础URL
 */
export const deviceMonitorApi = createDeviceMonitorApi()

/**
 * 设备监控API错误处理工具
 */
export const apiErrorHandler = {
  /**
   * 处理API错误并返回标准化的错误信息
   * @param {Error} error - 错误对象
   * @returns {Object} 标准化的错误信息
   */
  handleError(error) {
    if (error.response) {
      // 服务器响应了错误状态码
      const { status, data } = error.response
      return {
        isError: true,
        errorMessage: data?.message || `请求失败 (${status})`,
        errorCode: status
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      return {
        isError: true,
        errorMessage: '网络连接失败，请检查网络设置',
        errorCode: 'NETWORK_ERROR'
      }
    } else {
      // 其他错误
      return {
        isError: true,
        errorMessage: error.message || '未知错误',
        errorCode: 'UNKNOWN_ERROR'
      }
    }
  },

  /**
   * 创建空状态对象
   * @param {string} message - 空状态消息
   * @returns {Object} 空状态对象
   */
  createEmptyState(message = '数据不存在') {
    return {
      isEmpty: true,
      message: message
    }
  }
}
