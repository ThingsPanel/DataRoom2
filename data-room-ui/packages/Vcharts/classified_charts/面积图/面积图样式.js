const spec = {
  type: 'area',
  data: {
    values: [
      {
        time: '2:00',
        value: 15
      },
      {
        time: '4:00',
        value: 12
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
        value: 10
      },
      {
        time: '14:00',
        value: 12
      },
      {
        time: '16:00',
        value: 13
      },
      {
        time: '18:00',
        value: 14
      }
    ]
  },
  xField: 'time',
  yField: 'value',
  axes: [
    {
      orient: 'left',
      visible: false,
      range: {
        min: 0,
        max: 20
      }
    },
    {
      orient: 'bottom',
      visible: false
    }
  ],
  point: {
    visible: false
  },
  area: {
    style: {
      fill: {
        gradient: 'linear',
        x0: 0.5,
        y0: 0,
        x1: 0.5,
        y1: 1,
        stops: [
          {
            offset: 0,
            opacity: 1
          },
          {
            offset: 1,
            opacity: 0.3
          }
        ]
      }
    }
  },
  title: {
    padding: {
      left: 60,
      top: 20
    },
    textStyle: {
      character: [
        {
          text: 'Hive Table Count',
          fontSize: 30,
          fontWeight: 500,
          fill: '#BBB'
        },
        {
          text: '\n345, 239 Records',
          fontSize: 40,
          fill: '#000',
          fontWeight: 500
        }
      ]
    }
  }
};