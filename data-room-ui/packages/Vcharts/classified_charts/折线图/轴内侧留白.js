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
        value: 20
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
  padding: 0,
  point: {
    style: {
      size: 20
    }
  },
  axes: [
    {
      orient: 'bottom',
      trimPadding: true,
      innerOffset: {
        left: 10,
        right: 10
      }
    },
    {
      orient: 'left',
      innerOffset: {
        top: 10
      }
    }
  ]
};