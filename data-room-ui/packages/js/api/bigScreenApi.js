import Vue from 'vue'

// 大屏详情

export function getScreenInfo (code) {
  return Vue.prototype.$dataRoomAxios.get(`/bigScreen/design/info/code/${code}`)
}

// 保存更新大屏
export function saveScreen (data) {
  data.chartList.forEach((item) => {
    if (item.type === 'customComponent') {
      // Attempt to parse item.option if it's a string
      let chartOption = {};
      if (typeof item.option === 'string') {
        try {
          chartOption = JSON.parse(item.option);
        } catch (e) {
          console.error('[saveScreen] Failed to parse item.option for', item.code, e);
          chartOption = {}; // Default to empty object on parse error
        }
      } else if (typeof item.option === 'object' && item.option !== null) {
        chartOption = item.option; // Use as is if already an object
      }

      // Clear data from chartOption if it exists, then stringify back
      if (chartOption.data) {
        chartOption.data = [];
      }
      item.option = JSON.stringify(chartOption);

      // Retain full setting structure for 'vchartComponent' and 'threeJs' based on chartType
      if (item.chartType === 'vchartComponent' || item.chartType === 'threeJs') {
        console.log(`[saveScreen] 保留 ${item.name || item.code} 的完整 setting (chartType=${item.chartType})`);
        // No change to item.setting, it remains as is
      } else {
        // For other types, simplify setting to only field and value
        console.log(`[saveScreen] 简化前 ${item.name || item.code} 的 setting:`, item.setting);
        item.setting = item.setting?.map((x) => {
          const { field, value } = x;
          return { field, value };
        }) || []; // Ensure if setting is null/undefined, it becomes an empty array
        console.log(`[saveScreen] 简化后 ${item.name || item.code} 的 setting:`, item.setting);
      }
    }
  });
  return Vue.prototype.$dataRoomAxios.post('/bigScreen/design/update', data);
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
