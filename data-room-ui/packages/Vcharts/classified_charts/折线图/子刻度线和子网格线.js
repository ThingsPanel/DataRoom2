const spec = {
  type: 'line',
  data: [
    {
      id: 'line',
      values: data
    }
  ],
  xField: 'x',
  yField: 'y',
  point: {
    visible: false
  },
  axes: [
    {
      orient: 'bottom',
      type: 'linear',
      min: -100,
      max: 100,
      label: {
        formatMethod: val => parseInt(val),
        style: {
          fill: '#000'
        }
      },
      tick: {
        visible: true,
        tickCount: 10,
        tickSize: 10,
        style: {
          stroke: '#000'
        }
      },
      subTick: {
        visible: true, // enable subTick
        tickSize: 6,
        style: {
          stroke: '#000'
        }
      },
      grid: {
        visible: true,
        style: {
          lineDash: [0]
        }
      },
      subGrid: {
        visible: true, // enable subGrid
        style: {
          lineDash: [0]
        }
      },
      domainLine: {
        visible: true,
        style: {
          stroke: '#000'
        }
      }
    },
    {
      orient: 'left',
      type: 'linear',
      min: -50,
      max: 50,
      tick: {
        visible: true,
        tickSize: 10,
        style: {
          stroke: '#000'
        }
      },
      label: {
        style: {
          fill: '#000'
        }
      },
      subTick: {
        visible: true,
        tickSize: 6,
        style: {
          stroke: '#000'
        }
      },
      grid: {
        visible: true,
        style: {
          lineDash: [0]
        }
      },
      subGrid: {
        visible: true,
        style: {
          lineDash: [0]
        }
      },
      domainLine: {
        visible: true,
        style: {
          stroke: '#000'
        }
      }
    }
  ]
};