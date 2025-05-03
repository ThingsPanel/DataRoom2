const spec = {
  type: 'line',
  theme: {
    fontFamily: 'serif' // Configure global fonts
  },
  data: [
    {
      id: 'line',
      values: [
        { x: 'Monday', y: 12 },
        { x: 'Tuesday', y: 13 },
        { x: 'Wednesday', y: 11 },
        { x: 'Thursday', y: 10 },
        { x: 'Friday', y: 12 },
        { x: 'Saturday', y: 14 },
        { x: 'Sunday', y: 17 }
      ]
    }
  ],
  xField: 'x',
  yField: 'y',
  axes: [
    {
      orient: 'right',
      title: {
        visible: true,
        space: 12,
        text: 'Right axis title'
      },
      label: {
        formatMethod: val => `${val}°C`,
        style: {
          fill: '#000'
        }
      },
      unit: {
        visible: true,
        text: 'Unit of right axis',
        style: {
          // dx: -18,
          dy: -8
          // textAlign: 'right'
        }
      },
      tick: {
        visible: true,
        tickStep: 2,
        tickSize: 6,
        style: {
          stroke: '#000'
        }
      },
      domainLine: {
        visible: true,
        style: {
          stroke: '#000'
        }
      },
      grid: {
        visible: false
      }
    },
    {
      orient: 'left',
      title: {
        visible: true,
        space: 12,
        text: 'Left axis title'
      },
      unit: {
        visible: true,
        text: 'Unit of left axis',
        style: {
          // dx: -18,
          dy: -8
          // textAlign: 'right'
        }
      },
      label: {
        formatMethod: val => `${val}°C`,
        style: {
          fill: '#000'
        }
      },
      tick: {
        visible: true,
        tickStep: 2,
        tickSize: 6,
        style: {
          stroke: '#000'
        }
      },
      domainLine: {
        visible: true,
        style: {
          stroke: '#000'
        }
      },
      grid: {
        visible: true,
        style: {
          lineDash: [0]
        }
      }
    },
    {
      orient: 'top',
      label: {
        style: {
          fill: '#000'
        }
      },

      tick: {
        inside: true,
        tickSize: 8,
        style: {
          stroke: '#000'
        }
      },
      domainLine: {
        style: {
          stroke: '#000'
        }
      },
      grid: {
        visible: true,
        style: {
          lineDash: [0]
        }
      }
    },
    {
      orient: 'bottom',
      label: {
        inside: true,
        style: {
          fill: '#000'
        }
      },
      domainLine: {
        style: {
          stroke: '#000'
        }
      },
      grid: {
        visible: false
      },
      tick: {
        inside: true,
        tickSize: 8,
        style: {
          stroke: '#000'
        }
      }
    }
  ]
};