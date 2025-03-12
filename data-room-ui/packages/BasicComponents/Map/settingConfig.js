import { commonConfig, displayOption } from 'data-room-ui/js/config'
import Icon from 'data-room-ui/assets/images/bigScreenIcon/export'
import cloneDeep from 'lodash/cloneDeep'

export const settingConfig = {
  padding: [30, 30, 50, 80],
  legend: false,
  isGroup: true,
  data: [],
  color: '',
  theme: 'dark',
  displayOption: {
    ...displayOption,
    params: {
      enable: true
    },
    headerField: {
      enable: false
    },
    mapField: {
      enable: true
    },
    metricField: {
      // 指标
      label: '维度',
      enable: false,
      multiple: false // 是否多选
    },
    dimensionField: {
      // 表格列
      label: '展示字段', // 维度/查询字段
      enable: false,
      multiple: false // 是否多选
    },
    dataAllocation: {
      enable: true,
      dataBinding: true
    }
  }
}

const customConfig = {
  type: 'map',
  root: {
    version: '2023071001',
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    perspective: 0,
    skewX: 0,
    skewY: 0
  },
  customize: {
    // 地图基础配置
    scope: 'china', // 默认显示中国地图
    mapId: '', // 地图ID，为空时使用默认中国地图
    down: true, // 是否允许下钻
    downLevel: 2, // 下钻层级
    
    // 地图样式配置
    backgroundColor: 'transparent', // 背景色
    mapName: true, // 是否显示地名
    mapNameColor: '#FFFFFF', // 地名颜色
    mapNameSize: 12, // 地名字体大小
    mapNameWeight: 500, // 地名字体粗细
    mapLineColor: '#1B91FF', // 地图边界线颜色
    areaColor: '#061D3E', // 区域颜色
    emphasisColor: '#389BB7', // 高亮颜色
    center1: 50, // 地图中心点X
    center2: 50, // 地图中心点Y
    zoom: 1, // 缩放比例

    // 散点配置
    scatter: false, // 是否显示散点
    scatterSymbol: 'pin', // 散点形状
    scatterSize: 40, // 散点大小
    scatterColor: '#FFFFFF', // 散点文字颜色
    scatterBackgroundColor: '#1B91FF', // 散点背景色
    showScatterValue: true, // 是否显示散点值

    // 数据映射配置
    visual: true, // 是否启用视觉映射
    range: [0, 1000], // 数据范围
    rangeColor: ['#061D3E', '#1B91FF'], // 数据映射颜色范围

    // 提示框配置
    tooltipBackgroundColor: 'rgba(0,0,0,0.7)', // 提示框背景色
    tooltipTitle: 'GDP', // 提示框标题
    borderColor: '#333333', // 边框颜色

    // 数据配置
    name: 'name', // 名称字段
    xaxis: 'lng', // 经度字段
    yaxis: 'lat', // 纬度字段
    value: 'value' // 值字段
  }
}

export const dataConfig = {
  ...commonConfig(customConfig)
}

export const mapData = {
  name: '地图',
  title: '地图',
  icon: Icon.getNameList()[5],
  border: { type: '', titleHeight: 60, fontSize: 16, isTitle: true, padding: [0, 0, 0, 0] },
  className:
    'com.gccloud.dataroom.core.module.chart.components.ScreenMapChart',
  w: 800,
  h: 700,
  x: 0,
  y: 0,
  type: 'map',
  option: {
    ...cloneDeep(settingConfig)
  },
  setting: undefined, // 右侧面板自定义配置
  dataHandler: {}, // 数据自定义处理js脚本
  ...cloneDeep(dataConfig)
}
