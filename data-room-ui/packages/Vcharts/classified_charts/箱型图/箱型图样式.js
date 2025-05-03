const spec = {
  type: 'boxPlot',
  data: data,
  xField: ['x', 'group'],

  minField: 'y1',
  q1Field: 'y2',
  medianField: 'y3',
  q3Field: 'y4',
  maxField: 'y5',
  seriesField: 'group',

  direction: 'vertical',
  color: ['#BBD6B8', '#EA5455'],

  legends: [{ visible: true }],

  title: {
    visible: true,
    text: 'Global GDP 2021'
  },

  boxPlot: {
    style: {
      boxWidth: 50,
      shaftWidth: 30,
      shaftShape: 'bar',
      lineWidth: 2,
      shaftOpacity: 0.3
    }
  }
};