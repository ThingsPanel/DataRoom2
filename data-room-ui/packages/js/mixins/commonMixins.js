/*
 * @description: bigScreen公共方法
 * @Date: 2023-03-24 17:10:43
 * @Author: xing.heng
 */
// import _ from 'lodash'
import { mapMutations, mapState } from 'vuex'
import { EventBus } from 'data-room-ui/js/utils/eventBus'
import { getChatInfo, getUpdateChartInfo } from '../api/bigScreenApi'
import axiosFormatting from '../../js/utils/httpParamsFormatting'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import { sendRequest, startPolling, stopPolling } from '../../js/utils/httpRequest'

export default {
  data () {
    return {
      filterList: [],
      treeParentId: 0,
      dataLoading: false
    }
  },
  created() {
    this.debouncedGetDataByExpression = debounce((config) => {
      // Log when debounced function actually executes
      console.log(`[Diag] Executing debouncedGetDataByExpression for ${config?.title || config?.code}`);
      this.getDataByExpression(config);
    }, 1500);

    this.debouncedChangeData = debounce((config, filterList) => {
      // Log when debounced function actually executes
      console.log(`[Diag] Executing debouncedChangeData for ${config?.title || config?.code}`);
      this.changeData(config, filterList);
    }, 1500);
  },
  watch: {
    'config.expression': { // 表达式发生变化
      handler (val) {
        // Log watcher trigger
        console.log(`[Diag] Watcher triggered: config.expression for ${this.config?.title || this.config?.code}`);
        this.debouncedGetDataByExpression(this.config)
      }
    },
    // 标题发生变化时需要及时更新表达式中的数据集库的字段名
    'config.title': {
      handler (val, oldVal) {
        this.updateDataset({ code: this.config.code, title: val, data: [], oldTitle: oldVal, isChangeTitle: true })
        this.updateComputedDatas({ code: this.config.code, title: val, data: [], oldTitle: oldVal, isChangeTitle: true })
      }
    },
    currentDataset: { // 关联的数据发生变化
      handler (val, old) {
        if (val && Object.keys(val).length && JSON.stringify(val) !== JSON.stringify(old)) {
          // Log watcher trigger
          console.log(`[Diag] Watcher triggered: currentDataset for ${this.config?.title || this.config?.code}`);
          this.debouncedGetDataByExpression(this.config)
        }
      },
      deep: true
    },
    currentComputedDatas: { // 关联的数据发生变化
      handler (val, old) {
        if (val && Object.keys(val).length && JSON.stringify(val) !== JSON.stringify(old)) {
          // Log watcher trigger
          console.log(`[Diag] Watcher triggered: currentComputedDatas for ${this.config?.title || this.config?.code}`);
          this.debouncedGetDataByExpression(this.config)
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      pageCode: state => state.bigScreen.pageInfo.code,
      customTheme: state => state.bigScreen.pageInfo.pageConfig.customTheme,
      activeCode: state => state.bigScreen.activeCode
      // dataset: state => state.bigScreen.dataset
    }),
    // 所有组件的数据集合
    dataset () {
      return this.$store.state.bigScreen.dataset
    },
    // 所有组件的数据集合
    computedDatas () {
      return this.$store.state.bigScreen.computedDatas
    },
    // 跟当前组件计算表达式关联的组件的数据集合
    currentDataset () {
      const newDataset = {}
      this.config.expressionCodes?.forEach(item => {
        const code = item.split('_')[1]
        for (const key in this.dataset) {
          const objCode = key.split('_')[1]
          if (objCode === code) {
            newDataset[code] = this.dataset[key]
          }
        }
      })
      return newDataset
    },
    // 跟当前组件计算表达式关联的组件的数据集合
    currentComputedDatas () {
      const newDataset = {}
      this.config.expressionCodes?.forEach(item => {
        const code = item.split('_')[1]
        for (const key in this.computedDatas) {
          const objCode = key.split('_')[1]
          if (objCode === code) {
            newDataset[code] = this.computedDatas[key]
          }
        }
      })
      return newDataset
    },
    isPreview () {
      return (this.$route.path === window?.BS_CONFIG?.routers?.previewUrl) || (this.$route.path === '/big-screen/preview')
    }
  },

  mounted () {
    if (this.config && typeof this.config.type === 'string' && !['tables', 'flyMap', 'map'].includes(this.config.type)) {
      this.chartInit()
    }
    this.watchCacheData()
  },
  beforeDestroy() {
    if (this.debouncedGetDataByExpression && this.debouncedGetDataByExpression.cancel) {
      this.debouncedGetDataByExpression.cancel();
    }
    if (this.debouncedChangeData && this.debouncedChangeData.cancel) {
      this.debouncedChangeData.cancel();
    }
    if (this.config && this.config.code) {
      stopPolling(this.config.code)
    }
  },
  methods: {
    ...mapMutations({
      changeChartConfig: 'bigScreen/changeChartConfig',
      changeActiveItemConfig: 'bigScreen/changeActiveItemConfig',
      updateDataset: 'bigScreen/updateDataset',
      updateComputedDatas: 'bigScreen/updateComputedDatas'
    }),
    /**
     * 初始化组件
     */
    chartInit () {
      // Log chartInit call
      console.log(`[Diag] chartInit called for ${this.config?.title || this.config?.code}`);
      let config = this.config
      // key和code相等，说明是一进来刷新，调用list接口
      if (this.isPreview) {
        // 改变样式
        config = this.changeStyle(config) ? this.changeStyle(config) : config
        // 改变数据 - 预览时直接调用，不防抖
        config = this.changeDataByCode(config)
      } else {
        // 编辑模式下初始化或更新 - 使用防抖版本
        // eslint-disable-next-line no-unused-vars
        config = this.debouncedChangeData(config)
      }
    },
    /**
     * 初始化组件时获取后端返回的数据, 返回数据和当前组件的配置_list
     * @param settingConfig 设置时的配置。不传则为当前组件的配置
     * @returns {Promise<unknown>}
     */
    changeDataByCode (config) {
      let currentPage = 1
      let size = 10
      if (config?.option?.pagination) {
        currentPage = config.option.pagination.currentPage
        size = config.option.pagination.pageSize
      }

      return new Promise((resolve) => {
        config.loading = true
        getChatInfo({
          chartCode: config.code,
          current: currentPage,
          pageCode: this.pageCode,
          size: size,
          type: config.type
        }).then(async res => {
          config.loading = false
          let _res = cloneDeep(res)

          // --- BEGIN: Augment fieldList with binding keys --- 
          try {
            const bindingKeys = Object.keys(config.option?.customize?.binding || {});
            let fieldList = res.fieldList || [];
            const originalFieldCount = fieldList.length;
            const existingNames = new Set(fieldList.map(f => f.fieldName));
            bindingKeys.forEach(key => {
              if (!existingNames.has(key)) {
                const newField = { fieldName: key, fieldDesc: `${key} (绑定)`, required: false };
                fieldList.push(newField);
                existingNames.add(key); // Add to set to prevent duplicates if binding key appears later
              }
            });
            // Update the fieldList in the response object (assuming this is used later)
            res.fieldList = fieldList;
          } catch (e) {
            console.error('[changeDataByCode] Error augmenting fieldList:', e);
          }
          // --- END: Augment fieldList --- 

          // 如果是http数据集或iot数据集的前端代理，则需要调封装的axios请求
          if (res.executionByFrontend) {
            if (res.data.datasetType === 'http' || res.data.datasetType === 'iot') {
              if (res.data.datasetType === 'iot') {
                // 使用 httpRequest.js 中的 sendRequest 方法
                const userConfig = res.data.userDefinedJson || {}
                const requestConfig = {
                  url: userConfig.url,
                  method: userConfig.method,
                  headers: {},
                  params: { ...userConfig.queryParams },
                  componentId: config.code,
                  pollingInterval: 6000 // 设置轮询间隔为6秒
                }
             

                // 如果是最新数据模式，删除历史数据相关参数
                if (requestConfig.params && requestConfig.params.data_mode === 'latest') {
                  delete requestConfig.params.time_range
                  delete requestConfig.params.aggregate_window
                  delete requestConfig.params.aggregate_function
                }

                // 转换headers格式
                if (userConfig.headers && Array.isArray(userConfig.headers)) {
                  const headerObj = {}
                  userConfig.headers.forEach(h => {
                    if (h.key && h.value) {
                      headerObj[h.key] = h.value
                    }
                  })
                  requestConfig.headers = headerObj
                } else {
                  // 确保至少有 x-api-key
                  requestConfig.headers['x-api-key'] = sessionStorage.getItem('ticket')
                }

                // 在预览模式下使用轮询
                if (this.isPreview) {
                  // 先停止之前的轮询
                  stopPolling(config.code)
                  
                  // 启动新的轮询
                  startPolling(requestConfig, 
                    (result) => {
                      if (!result || !result.data) {
                        console.error('IoT数据返回格式错误:', result)
                        return
                      }

                      // 使用与普通请求相同的数据处理流程
                      let responseData = result.data
                      if (userConfig.responseScript && userConfig.responseScript.includes('points')) {
                        responseData = responseData.points
                      }
                      
                      // 使用与普通请求相同的数据格式化方法
                      const formattedData = this.apiDataFormatting({ success: true, columnData: res.columnData }, responseData)

                      // 更新到vuex
                      this.updateDataset({ 
                        code: config.code, 
                        title: config.title, 
                        data: formattedData.data 
                      })

                      // 使用 nextTick 确保在 Vuex 更新后再处理数据
                      this.$nextTick(() => {

                        // 使用最新的 Vuex 数据更新组件配置
                        const newConfig = cloneDeep(config)
                        const updatedConfig = this.dataFormatting(newConfig, formattedData)
                        this.changeChartConfig(updatedConfig)
                        
                        // 强制更新组件
                        if (this.chart) {
                          this.chart.update(updatedConfig.option)
                        }
                      })
                    },
                    (error) => {
                      console.error('IoT数据轮询出错:', error)
                      // 如果是认证错误，尝试更新token
                      if (error.response && error.response.status === 401) {
                        requestConfig.headers['x-api-key'] = sessionStorage.getItem('ticket')
                      }
                    }
                  )
                }

                // 发送请求获取初始数据
                _res = await sendRequest(requestConfig)

                // 根据responseScript处理返回数据
                if (userConfig.responseScript && userConfig.responseScript.includes('points')) {
                  _res = _res.data.points
                } else {
                  _res = _res.data
                }
              } else {
                _res = await axiosFormatting(res.data)
              }
              _res = this.apiDataFormatting(res, _res)
            }
            if (res.data.datasetType === 'js') {
              try {
                const scriptAfterReplacement = res.data.script.replace(/\${(.*?)}/g, (match, p) => {
                  const value = config.dataSource?.params[p]
                  if (value === null || value === undefined || value === '') {
                    return "''"
                  } else if (!isNaN(value)) {
                    return value || p
                  } else {
                    return "'" + value + "' || '" + p + "'"
                  }
                })
                // eslint-disable-next-line no-new-func
                const scriptMethod = new Function(scriptAfterReplacement)
                _res.data = scriptMethod()
              } catch (error) {
                console.info('JS数据集脚本执行失败', error)
              }
            }
          }

          // 将后端返回的数据保存
          if (_res.success) {
            this.updateDataset({ code: config.code, title: config.title, data: _res?.data })
          }
          config = this.dataFormatting(config, _res)

          this.changeChartConfig(config)
          resolve(config)
        }).catch(err => {
          console.info(err)
          config.loading = false
          resolve(config)
        })
      })
    },
    /**
     * @description: 更新chart
     * @param {Object} config
     * @param {Array} filterList
     */
    changeData (config, filterList) {
      const list = config?.paramsList?.map((item) => {
        if (item.value === '$' + '{level}') {
          return { ...item, value: config.customize?.level }
        } else if (item.value === '$' + '{name}') {
          return { ...item, value: config.customize?.scope }
        } else {
          return item
        }
      })

      if (!config.dataSource) {
        config.dataSource = {}
      }

      const params = {
        chart: {
          ...config,
          paramsList: list ? [...list] : [],
          option: undefined
        },
        current: 1,
        pageCode: this.pageCode,
        type: config.type,
        filterList: filterList || this.filterList
      }

      return new Promise((resolve) => {
        config.loading = true
        getUpdateChartInfo(params).then(async res => {
          config.loading = false
          let _res = cloneDeep(res)

          // --- BEGIN: Augment fieldList with binding keys --- 
          try {
            const bindingKeys = Object.keys(config.option?.customize?.binding || {});
            let fieldList = res.fieldList || [];
            const originalFieldCount = fieldList.length;
            const existingNames = new Set(fieldList.map(f => f.fieldName));
            bindingKeys.forEach(key => {
              if (!existingNames.has(key)) {
                const newField = { fieldName: key, fieldDesc: `${key} (绑定)`, required: false };
                fieldList.push(newField);
                existingNames.add(key); // Add to set
              }
            });
            // Update the fieldList in the response object
            res.fieldList = fieldList;
          } catch (e) {
            console.error('[changeData] Error augmenting fieldList:', e);
          }
          // --- END: Augment fieldList --- 

          if (res.executionByFrontend) {
            if (res.data.datasetType === 'http' || res.data.datasetType === 'iot') {
              if (res.data.datasetType === 'iot') {
                // 使用 httpRequest.js 中的 sendRequest 方法
                const userConfig = res.data.userDefinedJson || {}
                const requestConfig = {
                  url: userConfig.url,
                  method: userConfig.method,
                  headers: {},
                  params: { ...userConfig.queryParams },
                  componentId: config.code,
                  pollingInterval: 6000 // 设置轮询间隔为6秒
                }

                // 如果是最新数据模式，删除历史数据相关参数
                if (requestConfig.params && requestConfig.params.data_mode === 'latest') {
                  delete requestConfig.params.time_range
                  delete requestConfig.params.aggregate_window
                  delete requestConfig.params.aggregate_function
                }

                // 转换headers格式
                if (userConfig.headers && Array.isArray(userConfig.headers)) {
                  const headerObj = {}
                  userConfig.headers.forEach(h => {
                    if (h.key && h.value) {
                      headerObj[h.key] = h.value
                    }
                  })
                  requestConfig.headers = headerObj
                } else {
                  // 确保至少有 x-api-key
                  requestConfig.headers['x-api-key'] = sessionStorage.getItem('ticket')
                }

                // 在预览模式下使用轮询
                if (0) {
                  // 先停止之前的轮询
                  stopPolling(config.code)
                  
                  // 启动新的轮询
                  startPolling(requestConfig, 
                    (result) => {
                      if (!result || !result.data) {
                        console.error('IoT数据返回格式错误:', result)
                        return
                      }
                      // 处理返回数据
                      const responseData = userConfig.responseScript?.includes('points') ? 
                        result.data.points : result.data
                      // 更新到vuex
                      this.updateDataset({ 
                        code: config.code, 
                        title: config.title, 
                        data: responseData 
                      })
                      // 更新组件配置
                      config = this.dataFormatting(config, responseData)
                      this.changeChartConfig(config)
                    },
                    (error) => {
                      console.error('IoT数据轮询出错:', error)
                      // 如果是认证错误，尝试更新token
                      if (error.response && error.response.status === 401) {
                        requestConfig.headers['x-api-key'] = sessionStorage.getItem('ticket')
                      }
                    }
                  )
                }

                // 发送请求获取初始数据
                _res = await sendRequest(requestConfig)
                // 根据responseScript处理返回数据
                if (userConfig.responseScript && userConfig.responseScript.includes('points')) {
                  _res = _res.data.points
                } else {
                  _res = _res.data
                }
              } else {
                _res = await axiosFormatting(res.data)
              }
              _res = this.apiDataFormatting(res, _res)
            }
          }

          if (_res.success) {
            this.updateDataset({ code: config.code, title: config.title, data: _res?.data })
          }
          
          config = this.dataFormatting(config, _res)
          
          resolve(config)
        }).catch(err => {
          config.loading = false
          resolve(config)
        })
      })
    },
    // 更新图表数据
    updateChartData () {
      // 子组件实现此方法
    },
    // http前台代理需要对返回的数据进行重新组装
    apiDataFormatting (chartRes, apiRes) {
      // 确保返回的数据是数组格式
      const formattedData = Array.isArray(apiRes) ? apiRes : [apiRes]
      const result = {
        columnData: chartRes.columnData,
        data: formattedData,
        success: chartRes.success
      }
      return result
    },
    dataFormatting (config, data) {
      // 覆盖
    },
    newChart (option) {
      // 各子组件自己实现
    },
    // 通过表达式计算获取组件的值
    getDataByExpression (config) {
      // 各子组件自己实现
    },
    changeStyle (config) {
      config = { ...this.config, ...config }
      // 样式改变时更新主题配置
      config.theme = settingToTheme(cloneDeep(config), this.customTheme)
      this.changeChartConfig(config)
      if (config.code === this.activeCode) {
        this.changeActiveItemConfig(config)
      }
    },
    // 缓存组件数据监听
    watchCacheData () {
      EventBus.$on('cacheDataInit', (data, dataSetId) => {
        // 如果是缓存数据集
        // 且当前组件的businessKey和缓存的dataSetId相等时，更新组件
        if (
          this.config.dataSource.dataSetType === '2' &&
          this.config.dataSource.businessKey === dataSetId
        ) {
          const config = this.dataFormatting(this.config, data)
          config.key = new Date().getTime()
          this.changeChartConfig(config)
          this.newChart(config.option)
        }
      })
    }
  }
}
