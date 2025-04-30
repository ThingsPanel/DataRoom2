const files = require.context('./', true, /[\u4e00-\u9fa5]+.js$/)
const vchartSettings = []
// 获取 vchart 配置 (这里逻辑和 echarts 一样，扫描当前目录下的图表配置)
files.keys().forEach((key) => {
  const config = files(key).default
  vchartSettings.push({
    setting: config.setting,
    name: config.name
  })
})
export default vchartSettings 