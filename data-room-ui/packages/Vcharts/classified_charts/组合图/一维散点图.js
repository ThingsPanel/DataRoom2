const spec = {
  type: 'common',
  height: 500,
  padding: [220, 20],
  data: [
    {
      id: 'scatter',
      values: data
    }
  ],
  series: [
    {
      type: 'scatter',
      xField: 'height',
      direction: 'horizontal',
      point: {
        style: {
          fillOpacity: 0.25
        }
      }
    }
  ],
  axes: [
    {
      orient: 'left',
      visible: false
    },
    {
      visible: true,
      orient: 'bottom',
      type: 'linear',
      min: Math.min(...data.map(d => d.height)),
      max: Math.max(...data.map(d => d.height)),
      title: {
        visible: true,
        text: 'Height'
      },
      grid: {
        visible: false
      },
      tick: {
        visible: true
      }
    }
  ]
};