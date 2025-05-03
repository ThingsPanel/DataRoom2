const spec = {
  type: 'common',
  series: [
    {
      type: 'scatter',
      xField: 'milesPerGallon',
      yField: 'horsepower',
      point: {
        state: {
          hover: {
            scaleX: 1.2,
            scaleY: 1.2
          }
        },
        style: {
          fillOpacity: 0.25
        }
      }
    }
  ],
  tooltip: {
    dimension: {
      visible: true
    },
    mark: {
      title: true,
      content: [
        {
          key: d => d.name,
          value: d => d.y
        }
      ]
    }
  },
  crosshair: {
    yField: {
      visible: true,
      line: {
        visible: true,
        type: 'line'
      },
      label: {
        visible: true // label 默认关闭
      }
    },
    xField: {
      visible: true,
      line: {
        visible: true,
        type: 'line'
      },
      label: {
        visible: true // label 默认关闭
      }
    }
  },
  axes: [
    {
      title: {
        visible: true,
        text: 'Horse Power'
      },
      orient: 'left',
      range: { min: 0 },
      type: 'linear'
    },
    {
      title: {
        visible: true,
        text: 'Miles Per Gallon'
      },
      orient: 'bottom',
      label: { visible: true },
      type: 'linear'
    }
  ],
  data: [
    {
      id: 'data',
      values: data.flat()
    }
  ]
};