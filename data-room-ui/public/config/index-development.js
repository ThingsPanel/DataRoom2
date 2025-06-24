window.ENV = 'development'
var developmentConfig = {
  baseURL: 'http://47.115.210.16:9083/bigScreenServer',
  fileUrlPrefix: 'http://47.115.210.16:9083/bigScreenServer' + '/static',
  iotBaseURL: 'http://47.115.210.16:9999/api/v1',
}
// 必须的
window.CONFIG={}
window.CONFIG = configDeepMerge(window.CONFIG, developmentConfig)

