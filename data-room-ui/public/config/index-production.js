window.ENV = 'production'
var productionConfig = {
  baseURL: '/bigScreenServer',
  fileUrlPrefix: '/bigScreenServer' + '/static'
}
// 必须的
window.CONFIG = {}
window.CONFIG  = configDeepMerge(window.CONFIG , productionConfig)
