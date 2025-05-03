const spec = {
  type: 'bar',
  data: [
    {
      id: 'bar',
      values: data
    }
  ],
  yField: 'city',
  xField: 'rate',
  seriesField: 'trend',
  direction: 'horizontal',
  color: ['#1890FF', '#2FC25B'],
  label: {
    visible: true,
    style: {
      text: obj => obj.rate.toFixed(1) + '%',
      fill: '#333',
      fontWeight: 'bold',
      fontSize: 10
    }
  },
  axes: [
    {
      orient: 'left',
      domainLine: { visible: false },
      tick: { visible: false }
    },
    {
      orient: 'bottom',
      tick: { visible: false, tickCount: 5 },
      label: {
        formatMethod: val => val + '%'
      },
      min: -2,
      max: 2
    }
  ],
  legends: [
    {
      visible: true,
      orient: 'top',
      position: 'start',
      layoutType: 'absolute',
      left: 150,
      top: 100,
      item: {
        shape: {
          style: {
            symbolType: 'square'
          }
        }
      },
      // Configure legend background
      background: {
        visible: true,
        padding: 4,
        style: {
          stroke: '#000',
          lineWidth: 2,
          cornerRadius: 2,
          // shadow configuration
          shadowBlur: 20,
          shadowColor: '#69c0ff',
          shadowOffsetX: 4,
          shadowOffsetY: 4
        }
      }
    }
  ]
};