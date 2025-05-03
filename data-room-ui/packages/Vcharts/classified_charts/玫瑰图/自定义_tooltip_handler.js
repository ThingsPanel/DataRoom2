const spec = {
  type: 'rose',
  data: [
    {
      id: 'id0',
      values: data,
      fields: dataFields
    }
  ],
  padding: {
    top: 30
  },
  radius: 0.8,
  innerRadius: 0,
  categoryField: 'month',
  valueField: 'value',
  seriesField: 'type',
  stack: true,
  rose: {
    style: {
      stroke: 'white',
      lineWidth: 1
    }
  },
  legends: {
    visible: true,
    orient: 'top',
    interactive: true
  },
  axes: [
    {
      orient: 'radius',
      visible: true,
      tick: { tickCount: 3 },
      grid: { visible: true, style: { lineDash: [0] } },
      max: 150
    },
    {
      orient: 'angle',
      visible: true,
      domainLine: { visible: true, smooth: false },
      grid: { visible: true, smooth: false },
      label: {
        visible: true,
        style: {
          fill: '#000'
        }
      }
    }
  ]
};