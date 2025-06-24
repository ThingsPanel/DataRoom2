window.ENV = 'production'
var productionConfig = {
  baseURL: '/bigScreenServer',
  fileUrlPrefix: '/bigScreenServer' + '/static',
  iotBaseURL: 'http://47.115.210.16:9999/api/v1',
}
// 必须的
window.CONFIG = {}
window.CONFIG  = configDeepMerge(window.CONFIG , productionConfig)
