const spec = {
  type: 'boxPlot',
  data: data,
  xField: 'x',

  minField: 'y1',
  q1Field: 'y2',
  medianField: 'y3',
  q3Field: 'y4',
  maxField: 'y5',
  direction: 'vertical',
  boxPlot: {
    style: {
      // boxWidth: 50, // 不指定则自适应宽度
      // shaftWidth: 60,
      shaftShape: 'line',
      lineWidth: 2
    }
  }
};