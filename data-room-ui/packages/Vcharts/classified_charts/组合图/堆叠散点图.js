const spec = {
  type: 'common',
  data: [
    {
      id: 'scatter',
      values: chartData
    }
  ],
  series: [
    {
      type: 'scatter',
      xField: 'birth',
      yField: 'value',
      seriesField: 'gender',
      stack: true
    }
  ],
  axes: [
    {
      orient: 'bottom',
      domainLine: {
        onZero: true,
        style: {
          stroke: '#212121'
        }
      },
      title: {
        visible: true,
        text: 'Age →'
      }
    },
    {
      orient: 'left',
      domainLine: {
        visible: false
      },
      title: {
        visible: true,
        text: '← Women · Men →'
      },
      grid: {
        style: {
          lineDash: [0]
        }
      },
      tick: {
        inside: true,
        tickStep: 10
      }
    }
  ],
  tooltip: {
    dimension: { visible: false }
  }
};