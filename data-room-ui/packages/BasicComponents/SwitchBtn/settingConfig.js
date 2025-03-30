/*
 * @Descripttion: 开关组件配置
 * @Date: 2023-03-30
 */
import { commonConfig, displayOption } from 'data-room-ui/js/config'

export const settingConfig = {
  // text内容
  text: '开关',
  // 设置面板属性的显隐
  displayOption: {
    ...displayOption,
    metricField: {
      // 指标
      label: '数值指标',
      enable: true,
      multiple: false // 是否多选
    },
    dimensionField: {
      // 维度
      label: '维度字段', // 维度/查询字段
      enable: false,
      multiple: false // 是否多选
    },
    dataAllocation: {
      enable: true
    },
    dataSourceType: {
      enable: true
    }
  }
}

const customConfig = {
  type: 'switchBtn',
  // 名称
  root: {
    version: '2023091402',
    expression: 'return ',
    expressionCodes: [],
    rotateX: 0,
    // 绕y轴旋转角度
    rotateY: 0,
    // 绕z轴旋转角度
    rotateZ: 0,
    // 透视距离
    perspective: 0,
    skewX: 0,
    skewY: 0
  },
  // 自定义属性
  customize: {
    // 开关按钮颜色
    activeColor: '#409EFF',
    // 关闭状态颜色
    inactiveColor: '#C0CCDA',
    // 字体大小
    fontSize: 14,
    // 字体颜色
    fontColor: '#ffffff',
    // 开关宽度
    switchWidth: 40,
    // 开关高度
    switchHeight: 20,
    // 开启值
    activeValue: 1,
    // 关闭值
    inactiveValue: 0,
    // 执行指令脚本
    executeScript: '',
    // 是否显示文字描述
    showText: true,
    // 开启时文字
    activeText: '开',
    // 关闭时文字
    inactiveText: '关闭',
    // 切换阈值当数据大于等于此值时开关为开
    thresholdValue: 50
  }
}
export const dataConfig = {
  ...commonConfig(customConfig)
}

