const spec = {
  type: 'scatter',
  color: ['#E21818', '#98DFD6'],
  data: [
    {
      id: 'scatter',
      values: chartData
    }
  ],
  xField: 'birth',
  yField: 'value',
  seriesField: 'gender',
  stack: true,
  point: {
    state: {
      hover: {
        lineWidth: 1,
        stroke: '#000'
      }
    }
  },
  axes: [
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
        tickSize: 6,
        tickStep: 5,
        style: {
          stroke: '#000'
        }
      }
    },
    {
      orient: 'bottom',
      domainLine: {
        onZero: true,
        style: {
          stroke: '#000'
        }
      },
      tick: {
        tickSize: 6,
        style: {
          stroke: '#000'
        }
      }
    }
  ],
  tooltip: {
    dimension: { visible: false }
  }
};