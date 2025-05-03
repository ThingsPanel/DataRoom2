const spec = {
  type: 'scatter',
  xField: 'Miles_per_Gallon',
  yField: 'Horsepower',
  seriesField: 'Origin',
  data: [
    {
      id: 'data',
      values: data.filter(d => d['Horsepower'] && d['Miles_per_Gallon'])
    }
  ],
  dataZoom: [
    {
      orient: 'bottom',
      start: 0,
      end: 0.4,
      zoomLock: true,
      filterMode: 'axis'
    }
  ],
  axes: [
    {
      title: {
        visible: true,
        text: 'Horse Power'
      },
      orient: 'left',
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
  legends: [{}]
};