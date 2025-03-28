// 导入所有设置
const files = require.context('./', true, /[\u4e00-\u9fa5]+.js$/)
const threeSettings = new Map()

files.keys().forEach((key) => {
  // 取到模型名称
  const configName = key.split('/')[2].replace('.js', '')
  threeSettings.set(configName, files(key).default)
})

export default threeSettings 