window.ENV = 'production'
var productionConfig = {
  baseURL: 'http://127.0.0.1:9081/bigScreenServer',
  fileUrlPrefix: 'http://127.0.0.1:9081/bigScreenServer' + '/static'
}
// 必须的
window.CONFIG = {}
window.CONFIG  = configDeepMerge(window.CONFIG , productionConfig)
