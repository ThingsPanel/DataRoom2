const spec = {
  type: 'line',
  data: {
    values: [
      {
        time: '2:00',
        value: 8
      },
      {
        time: '4:00',
        value: 9
      },
      {
        time: '6:00',
        value: 11
      },
      {
        time: '8:00',
        value: 14
      },
      {
        time: '10:00',
        value: 16
      },
      {
        time: '12:00',
        value: 17
      },
      {
        time: '14:00',
        value: 17
      },
      {
        time: '16:00',
        value: 16
      },
      {
        time: '18:00',
        value: 15
      }
    ]
  },
  xField: 'time',
  yField: 'value',
  title: {
    visible: true,
    text: 'line chart',
    subtext:
      'The line chart is a simple, two-dimensional chart with an X and Y axis, each point representing a single value.',
    align: 'left',
    verticalAlign: 'top',
    textStyle: {
      stroke: '#333',
      lineWidth: 3,
      fill: '#468DFF',
      fontSize: 24
    },
    subtextStyle: {
      visible: true,
      fontStyle: 'italic',
      underline: 1
    }
  }
};