const spec = {
  type: 'sequenceScatterLink',
  taskType: TASK_TYPE,
  labelColor: label_color_dict,
  scope: scope,
  data: chartData,
  xField: 'x',
  yField: 'y',

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
  }
};