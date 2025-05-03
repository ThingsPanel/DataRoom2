const spec = {
  type: 'common',
  series: [
    {
      type: 'scatter',
      xField: 'x',
      yField: 'horsepower',
      seriesField: 'cylinders',
      point: {
        state: {
          hover: {
            scaleX: 1.2,
            scaleY: 1.2
          }
        },
        style: {
          fillOpacity: 0.5
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
        text: 'Cylinders'
      },
      orient: 'bottom',
      label: { visible: true },
      range: { min: 2.5 },
      type: 'linear'
    }
  ],
  data: [
    {
      id: 'data',
      values: jitterData
    }
  ],
  legends: [
    {
      visible: true,
      orient: 'top'
    }
  ]
};