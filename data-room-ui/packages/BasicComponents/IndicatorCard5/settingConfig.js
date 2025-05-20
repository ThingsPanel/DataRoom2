import { commonConfig, displayOption } from 'data-room-ui/js/config'

export const settingConfig = {
  padding: [30, 30, 30, 60],
  legend: false,
  isGroup: true,
  header: [],
  columnWidth: [],
  align: [],
  data: 0,
  // 设置面板属性的显隐
  displayOption: {
    ...displayOption,
    params: {
      enable: false
    },
    headerField: {
      enable: false
    },
    metricField: {
      // 指标
      label: '指标',
      enable: false,
      multiple: false // 是否多选
    },
    dimensionField: {
      // 表格列
      label: '展示字段', // 维度/查询字段
      enable: true,
      multiple: false // 是否多选
    },
    dynamicData: {
      enable: true,
      slots: [
        {
          field: 'value',
          label: '指标值',
          required: true
        }
      ]
    }
  }
}
const customConfig = {
  type: 'indicatorCard5',
  root: {
    version: '2023071001',
    contribution: false,
    loading: false,
    // 绕x轴旋转角度
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
  customize: {
    fontColor: '#ffffff', // 整体字体颜色
    fontSize: 16, // 整体字体大小
    secondLine: 'LA,LB,LC,Q,P,COS', // 键名序列，用逗号隔开
    unit: '{"LA":"流量","LB":"电流","LC":"输入电压","Q":"输出电压","P":"功率","COS":"效率"}' // 键名对应的中文说明(JSON字符串)
  }
}
export const dataConfig = {
  ...commonConfig(customConfig)
}
