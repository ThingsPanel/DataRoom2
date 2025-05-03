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
  color: ['#62CDFF', '#9E4784'],

  legends: {
    visible: true,
    data: data => {
      return data.map(obj => {
        obj.shape.fill = obj.shape.stroke;
        return obj;
      });
    }
  },

  title: {
    visible: true,
    text: 'Global GDP 2021'
  },

  boxPlot: {
    style: {
      // adaptive width if not specified
      // boxWidth: 50,
      // shaftWidth: 60,
      shaftShape: 'line',
      lineWidth: 2
    }
  }
};