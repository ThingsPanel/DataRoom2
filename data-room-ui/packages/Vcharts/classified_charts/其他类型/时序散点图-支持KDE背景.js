const spec = {
  width: 600,
  height: 400,
  type: 'sequenceScatterKDE',
  data: chartData,
  xField: 'x',
  yField: 'y',
  seriesField: 'label',

  infoLabel: {
    visible: true,
    style: {
      text: datum => {
        return 'iteration: ' + datum.iter;
      }
    }
  },
  player: {
    orient: 'bottom',
    auto: true,
    interval: 2000,
    duration: 2000
  },
  animation: false
};