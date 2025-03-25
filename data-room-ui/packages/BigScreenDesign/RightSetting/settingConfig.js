export const settingConfig = {
  dynamicData: {
    title: '动态数据',
    icon: 'icon-dynamic-data',
    component: 'DynamicDataConfig',
    slots: [
      {
        field: 'value',
        label: '指标值',
        required: true
      }
    ]
  }
} 