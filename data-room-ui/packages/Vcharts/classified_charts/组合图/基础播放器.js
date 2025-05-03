const spec = {
  type: 'common',
  player: {
    auto: true,
    loop: true,
    alternate: true,
    interval: 500,
    width: 500,
    position: 'middle',
    type: 'discrete',
    specs: specs
  },
  series: [
    {
      type: 'pie',
      data: specs[0].data,
      dataKey: 'browserName',
      outerRadius: 0.81,
      innerRadius: 0.5,
      label: {
        visible: true,
        position: 'outside',
        line: {
          visible: false
        }
      },
      valueField: 'value',
      seriesField: 'browserName'
    }
  ]
};