<template>
  <div
    class="bs-design-wrap bs-bar"
    style="width: 100%; height: 100%"
    @wheel.stop
  >
    <el-button v-if="currentDeep > 0" class="button" type='text' @click.stop="backToPreviousLevel(config)"> 返回上一级</el-button>
    <div
      :id="`chart${config.code}`"
      style="width: 100%; height: 100%"
    />
  </div>
</template>
<script>
import 'insert-css'
import * as echarts from 'echarts'
import commonMixins from 'data-room-ui/js/mixins/commonMixins.js'
import paramsMixins from 'data-room-ui/js/mixins/paramsMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'

export default {
  name: 'MapCharts',
  mixins: [paramsMixins, commonMixins, linkageMixins],
  props: {
    id: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currentDeep: 0,
      mapList: [],
      charts: null,
      hasData: false,
      level: '',
      option: {}
    }
  },
  computed: {
    Data() {
      return JSON.parse(JSON.stringify(this.config))
    }
  },
  watch: {
    Data: {
      handler(newVal, oldVal) {
        if (newVal.w !== oldVal.w || newVal.h !== oldVal.h) {
          this.$nextTick(() => {
            this.charts.resize()
          })
        }
      },
      deep: true
    }
  },
  mounted() {
    this.chartInit()
  },
  beforeDestroy() {
    this.charts?.clear()
  },
  methods: {
    chartInit() {
      const config = this.config
      // key和code相等，说明是一进来刷新，调用list接口
      if (this.config.code === this.config.key || this.isPreview) {
        // 改变数据
        this.changeDataByCode(config).then((res) => {
          // 改变样式
          // config = this.changeStyle(res)
          this.newChart(config)
        }).catch(() => {
        })
      } else {
        // 否则说明是更新，这里的更新只指更新数据（改变样式时是直接调取changeStyle方法），因为更新数据会改变key,调用chart接口
        this.changeData(config).then((res) => {
          // 初始化图表
          this.newChart(res)
        })
      }
    },
    /**
     * 数据格式化
     * 该方法继承自commonMixins
     * @param {*} config
     * @param {Array} data
     */
    dataFormatting(config, data) {
      const dataList = []
      data?.data?.forEach(item => {
        dataList.push({
          name: item[config.customize.name],
          value: [item[config.customize.xaxis], item[config.customize.yaxis], item[config.customize.value]],
          // 原始数据
          originData: item
        })
      })
      config.option = {
        ...config.option,
        data: dataList
      }
      return config
    },
    /**
     * 返回上一级
     * @param {*} config
     */
    async backToPreviousLevel(config) {
      this.currentDeep--
      let map = this.mapList[this.currentDeep]
      // 移除mapList中的最后一个元素
      this.mapList.pop()
      let mapData = JSON.parse(map.geoJson)
      this.option.geo.map = map.name;
      // this.changeData({...config, customize: {...config.customize, level: map.level, scope: map.name}})
      echarts.registerMap(map.name, mapData);
      this.charts.setOption(this.option, true);
    },
    /**
     * 修改地图数据
     * @param {Array} data
     */
    changeMapData(data) {
      this.option.series[0].data = data
      this.charts.setOption(this.option)
    },
    /**
     * 初始化地图
     * 该方法继承自commonMixins
     * @param {*} config
     */
    async newChart(config) {
      this.charts = echarts.init(
        document.getElementById(`chart${this.config.code}`)
      )
      // 处理option，将配置项转换为echarts的option
      this.handleOption(config)
      let hasMapId = !!config.customize.mapId
      // 根据mapId获取地图数据
      let mapInfoUrl = `${window.BS_CONFIG?.httpConfigs?.baseURL}/bigScreen/map/info/${config.customize.mapId}`
      // 如果设置了地图id，就用地图id获取地图数据，否则用默认的中国地图
      if (!hasMapId) {
        // 修改这里,使用本地的中国地图数据
        try {
          const chinaMapJson = require('./json/china.json')
          echarts.registerMap(config.customize.scope, chinaMapJson)
          this.charts.setOption(this.option)
          // 注册点击事件
          this.registerClickEvent(config)
          return
        } catch(e) {
        }
      }

      try {
        const mapResp = await this.$dataRoomAxios.get(decodeURI(mapInfoUrl), {}, true)
        const map = hasMapId ? JSON.parse(mapResp.data.geoJson) : mapResp
        if (hasMapId && mapResp.data.uploadedGeoJson !== 1) {
          // 没有上传过geoJson
          this.$message({
            message: '请先上传地图数据',
            type: 'warning'
          })
          return
        }
        this.mapList.push(mapResp.data)
        echarts.registerMap(config.customize.scope, map)
        this.charts.setOption(this.option)
        // 注册点击事件
        this.registerClickEvent(config)
      } catch(e) {
        this.$message({
          message: '获取地图数据失败',
          type: 'error'
        })
      }
    },
    /**
     * 处理配置项option
     * @param {*} config
     */
    handleOption(config) {
      const { center1 = '50%', center2 = '50%' } = config.customize
      // 散点配置
      const scatterSeries = {
        name: config.customize.tooltipTitle || '',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: config.customize.scatterSymbol || 'pin',
        symbolSize: config.customize.scatterSize || 40,
        label: {
          normal: {
            show: config.customize.showScatterValue || false,
            textStyle: {
              color: config.customize.scatterColor || '#fff',
              fontSize: 9
            }
          }
        },
        itemStyle: {
          normal: {
            color: config.customize.scatterBackgroundColor || '#1B91FF'
          }
        },
        data: config.option.data || []
      }

      // 地图区域配置
      const mapSeries = {
        name: config.customize.tooltipTitle || '',
        type: 'map',
        geoIndex: 0,
        data: config.option.data || [],
        // 添加格式化函数的安全处理
        tooltip: {
          formatter: function(params) {
            if (!params || !params.data) {
              return ''
            }
            const value = params.data.value
            // 确保value存在且是数组
            if (!Array.isArray(value)) {
              return params.name
            }
            return `<div style="padding: 10px">
              <div style="margin-bottom: 5px">${params.name}</div>
              <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>
              <span>${value[2] || 0}</span>
            </div>`
          },
          show: true
        }
      }

      let series = config.customize.scatter ? [ scatterSeries ] : [ mapSeries ]
      this.option = {
        backgroundColor: config.customize.backgroundColor,
        graphic: [],
        geo: {
          map: config.customize.scope,
          zlevel: 9,
          show: true,
          layoutCenter: ['50%', '50%'],
          layoutSize: '95%',
          roam: config.customize.roam ?? true,
          scaleLimit: {
            min: 0.8,
            max: 2
          },
          zoom: config.customize.zoom || 1.2,
          label: {
            normal: {
              show: config.customize.mapName,
              textStyle: {
                color: config.customize.mapNameColor || '#fff',
                fontSize: config.customize.mapNameSize || 12,
                fontWeight: config.customize.mapNameWeight || 500
              }
            },
            emphasis: {
              textStyle: {
                color: config.customize.mapNameColor || '#fff',
                fontSize: config.customize.mapNameSize || 12,
                fontWeight: config.customize.mapNameWeight || 500
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: config.customize.mapLineColor,
              borderWidth: 1,
              areaColor: config.customize.areaColor,
              shadowColor: 'fffff',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10
            },
            emphasis: {
              areaColor: config.customize.emphasisColor ? config.customize.emphasisColor :'#389BB7',
              borderWidth: 0
            }
          }
        },
        tooltip: {
          show: false,
          trigger: 'item',
          alwaysShowContent: false,
          backgroundColor: config.customize.tooltipBackgroundColor,
          borderColor: config.customize.borderColor,
          hideDelay: 100,
          triggerOn: 'mousemove',
          enterable: true,
          textStyle: {
            color: '#DADADA',
            fontSize: '12',
            width: 20,
            height: 30,
            overflow: 'break'
          },
          showDelay: 100
        },
        visualMap: {
          show: !config.customize.scatter,
          calculable: config.customize.visual,
          min: config.customize.range[0],
          max: config.customize.range[1],
          seriesIndex: config.customize.scatter ? -1 : 0,
          inRange: {
            color: config.customize.rangeColor
          },
          textStyle: {
            color: '#fff'
          },
          left: 30,
          bottom: 30,
          itemWidth: 15,
          itemHeight: 100,
          padding: [5, 5],
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderColor: '#ccc',
          borderWidth: 0,
          orient: 'vertical',
          z: 100
        },
        series: series
      }
    },

    /**
     * 注册点击事件
     * @param config 地图组件配置项
     */
    registerClickEvent(config) {
      this.charts.on('click', async (params) => {
        let data = params?.data?.originData
        if (data) {
          this.linkage({...data, clickAreaName: params.name})
        } else {
          this.linkage({clickAreaName: params.name})
        }
        
        // 如果不允许下钻或没有地图名称，直接返回
        if (!config.customize.down || !params.name) {
          return
        }

        // 到达允许下钻的层数，则不再下钻
        if (this.currentDeep >= config.customize.downLevel) {
          return
        }

        // 确保mapList存在且有当前层级的数据
        if (!this.mapList || !this.mapList[this.currentDeep]) {
          return
        }

        try {
          const downMapUrl = `${window.BS_CONFIG?.httpConfigs?.baseURL}/bigScreen/map/data/${this.mapList[this.currentDeep].id}/${params.name}`
          const downMap = await this.$dataRoomAxios.get(decodeURI(downMapUrl), {}, false)
          
          // 地图不可用
          if (!downMap || downMap.available !== 1) {
            this.$message({
              message: '未找到该地图配置',
              type: 'warning'
            })
            return
          }

          let geoJsonObj
          try {
            geoJsonObj = JSON.parse(downMap.geoJson)
          } catch (error) {
            this.$message({
              message: params.name + '地图数据格式错误',
              type: 'warning'
            })
            return
          }

          this.currentDeep++
          this.mapList.push(downMap)
          this.option.geo.map = params.name
          echarts.registerMap(params.name, geoJsonObj)
          this.charts.setOption(this.option, true)
        } catch (error) {
          this.$message({
            message: '下钻操作失败',
            type: 'error'
          })
        }
      })
    },


  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/echartStyle';

.light-theme {
  background-color: #ffffff;
  color: #000000;
}

.auto-theme {
  background-color: rgba(0, 0, 0, 0);
}

.bs-design-wrap {
  position: relative;

  .button {
    position: absolute;
    z-index: 999;
  }
}
</style>
