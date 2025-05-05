import Vue from 'vue'

// 大屏详情

export function getScreenInfo (code) {
  return Vue.prototype.$dataRoomAxios.get(`/bigScreen/design/info/code/${code}`)
}

// 保存更新大屏
export function saveScreen (data) {
  data.chartList.forEach((item) => {
    if (item.type === 'customComponent') {
      const a = JSON.parse(item.option)
      if (a.data) {
        a.data = []
      }
      item.option = JSON.stringify(a)

      // 保留 comType 以备后用（如果其他地方还需要）
      const optionComType = a.comType;

      // 关键：现在主要用 chartType 判断
      if (item.chartType === 'vchartComponent' || item.chartType === 'threeJs') {
        // 保留完整 setting 结构
        console.log(`[saveScreen] 保留 ${item.name || item.code} 的完整 setting (chartType=${item.chartType})`);
      } else {
        // 打印简化前的完整 setting 结构
        console.log(`[saveScreen] 简化前 ${item.name || item.code} 的 setting:`, item.setting);
        // 只保留 field 和 value
        item.setting = item.setting?.map((x) => {
          const { field, value } = x
          return { field, value }
        }) || [] // 确保如果 setting 不存在或为 null，返回空数组
        // 打印简化后的 setting 结构
        console.log(`[saveScreen] 简化后 ${item.name || item.code} 的 setting:`, item.setting);
      }
    }
  })
  return Vue.prototype.$dataRoomAxios.post('/bigScreen/design/update', data)
}

// 根据数据集获取数据集详情
export function getDataSetDetails (id) {
  return Vue.prototype.$dataRoomAxios.get('/dataset/datasetInfo/' + id)
}

// 根据数据集id获取数据
export function getDataByDataSetId (dataSetId) {
  return Vue.prototype.$dataRoomAxios.post('/dataset/execute', {
    dataSetId,
    params: []
  })
}

// 得到图表详情
export function getChatInfo (params) {
  return Vue.prototype.$dataRoomAxios.post('/bigScreen/chart/data/list', params)
}
// 得到图表的更新数据
export function getUpdateChartInfo (params) {
  return Vue.prototype.$dataRoomAxios.post('/bigScreen/chart/data/chart', params)
}

// 业务组件列表
export function getBizComponentPage (params) {
  return Vue.prototype.$dataRoomAxios.get('/bigScreen/bizComponent/page', params)
}

// 根据code获得业务组件的信息
export function getBizComponentInfo (code) {
  return Vue.prototype.$dataRoomAxios.get(`/bigScreen/bizComponent/info/${code}`)
}

// 更新业务组件
export function updateBizComponent (params) {
  return Vue.prototype.$dataRoomAxios.post('/bigScreen/bizComponent/update', params)
}
