const spec = {
  type: 'scatter',
  data: {
    values: data
  },
  xField: 'GDP',
  yField: 'LifeExpectancy',
  sizeField: 'Population',
  size: {
    type: 'linear',
    range: [10, 70]
  },
  seriesField: 'continent',
  point: {
    style: {
      fillOpacity: 0.65
    }
  },
  axes: [
    {
      orient: 'bottom',
      type: 'linear',
      title: {
        visible: true
      },
      label: {
        formatMethod: value => {
          return `${(value / 1000).toFixed(0)}k`;
        }
      }
    },
    {
      orient: 'left',
      type: 'linear',
      min: 30,
      title: {
        visible: true
      }
    }
  ],
  legends: [
    {
      visible: true,
      orient: 'top',
      position: 'start',
      title: {
        visible: true,
        text: 'Continent'
      }
    },
    {
      visible: true,
      type: 'size',
      orient: 'bottom',
      position: 'start',
      field: 'Population',
      title: {
        visible: true,
        text: 'Population'
      }
    }
  ]
};