const spec = {
  type: 'common',
  series: [
    {
      type: 'scatter',
      xField: 'GDP',
      yField: 'LifeExpectancy',
      seriesField: 'continent',
      sizeField: 'Population',
      size: d => logScale(d.Population, [0, Math.max(...data.map(d => d.Population))], [1, 20])
    }
  ],
  crosshair: {
    yField: {
      visible: true,
      line: { visible: true, type: 'line' },
      label: {
        visible: true // label 默认关闭
      }
    },
    xField: {
      visible: true,
      line: { visible: true, type: 'line' },
      label: {
        visible: true // label 默认关闭
      }
    }
  },

  data: [
    {
      id: 'data',
      values: data
    }
  ],
  axes: [
    {
      orient: 'left',
      type: 'linear',
      range: {
        min: Math.min(...data.map(d => d.LifeExpectancy)),
        max: Math.max(...data.map(d => d.LifeExpectancy))
      },
      title: {
        visible: true,
        text: 'LifeExpectancy'
      },
      domainLine: {
        visible: true
      }
    },
    {
      orient: 'bottom',
      type: 'linear',
      title: {
        visible: true,
        text: 'GDP'
      },
      domainLine: {
        visible: true
      }
    }
  ],
  legends: [
    {
      visible: true,
      orient: 'right'
    }
  ]
};