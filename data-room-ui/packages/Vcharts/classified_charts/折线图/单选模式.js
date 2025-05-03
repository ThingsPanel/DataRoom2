const spec = {
  type: 'line',
  data: [
    {
      id: 'line',
      values: data
    }
  ],
  xField: 'year',
  yField: 'value',
  seriesField: 'name',
  legends: {
    orient: 'right',
    selectMode: 'single', // Configure legend selection mode
    defaultSelected: ['Type D'],
    title: {
      visible: true,
      text: 'Single Select'
    }
  },
  axes: [
    {
      orient: 'left',
      label: {
        inside: true,
        space: 2,
        style: {
          textBaseline: 'bottom',
          textAlign: 'start',
          fontWeight: 'bold'
        }
      },
      tick: {
        visible: false
      },
      domainLine: {
        visible: false
      },
      title: {
        visible: true,
        text: 'Axis Title'
      }
    }
  ]
};