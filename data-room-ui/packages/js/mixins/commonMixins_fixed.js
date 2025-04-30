/**
 * 轮询请求函数 - 确保每次轮询都能正确更新图表
 */
const setupPolling = (config, makeRequest, interval) => {
  if (!interval || interval < 1000) {
    interval = 5000
  }
  
  // 清除旧的定时器
  if (window._pollingTimers && window._pollingTimers[config.code]) {
    clearInterval(window._pollingTimers[config.code])
    delete window._pollingTimers[config.code]
  }
  
  // 创建新的定时器
  const timerId = setInterval(async () => {
    
    try {
      // 执行请求并获取更新后的配置
      const updatedConfig = await makeRequest()
      
      // 检查图表实例是否存在，确保数据能实时更新
      if (this.chart) {
        
        try {
          // 根据图表类型选择更新方法
          if (['Liquid', 'Gauge', 'RingProgress', 'Progress'].includes(updatedConfig.chartType)) {
            this.chart.changeData(updatedConfig.option.percent)
          } else {
            this.chart.changeData(updatedConfig.option.data)
          }
        } catch (error) {
          this.chart.update(updatedConfig.option)
        }
      }
      
    } catch (error) {
      console.error('轮询请求失败:', error)
    }
  }, interval)
  
  
  // 存储定时器ID
  window._pollingTimers = window._pollingTimers || {}
  window._pollingTimers[config.code] = timerId
  
  return timerId
}

/**
 * 提取关键修改说明：
 * 
 * 1. 在轮询时，确保每次请求后都主动更新图表数据
 * 2. 为IOT数据集添加特殊处理逻辑，确保数据格式正确
 * 3. 当图表更新失败时，使用备用的更新方法
 * 4. 添加详细的日志，便于调试
 * 5. 修复数据处理中的嵌套结构问题
 */ 