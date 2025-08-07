window.ENV = 'production'
var productionConfig = {
  baseURL: '/bigScreenServer',
  fileUrlPrefix: '/bigScreenServer' + '/static',
  iotBaseURL: '/api/v1',
}
// 必须的
window.CONFIG = {}
window.CONFIG  = configDeepMerge(window.CONFIG , productionConfig)
