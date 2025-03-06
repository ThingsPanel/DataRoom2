window.ENV = 'production'
var productionConfig = {
  baseURL: 'http://47.104.235.67:9081/bigScreenServer',
  fileUrlPrefix: 'http://47.104.235.67:9081/bigScreenServer' + '/static'
}
// 必须的
window.CONFIG = {}
window.CONFIG  = configDeepMerge(window.CONFIG , productionConfig)
