window.ENV = 'production'
var productionConfig = {
  baseURL: '/',
  fileUrlPrefix: '/static'
}
// 必须的
window.CONFIG = {}
window.CONFIG  = configDeepMerge(window.CONFIG , productionConfig)
