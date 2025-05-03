const spec = {
  type: 'rose',
  data,
  categoryField: ['time', 'type'],
  valueField: 'value',
  seriesField: 'type',
  outerRadius: 0.9,
  axes: [
    {
      orient: 'angle',
      domainLine: { visible: true },
      grid: { visible: true, alignWithLabel: false },
      label: {
        visible: true
      }
    },
    {
      orient: 'radius',
      grid: { visible: true, smooth: true }
    }
  ],
  crosshair: {
    categoryField: {
      visible: true,
      line: {
        type: 'rect'
      }
    },
    label: {
      visible: true // label 默认关闭
    }
  }
};