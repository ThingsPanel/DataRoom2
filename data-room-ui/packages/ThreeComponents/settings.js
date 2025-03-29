// 导入所有设置
const files = require.context('./', true, /[\u4e00-\u9fa5]+.js$/)
const threeSettings = []

// 获取three配置
files.keys().forEach((key) => {
  const config = files(key).default
  threeSettings.push({
    setting: config.setting,
    name: config.name
  })
})

export default threeSettings 