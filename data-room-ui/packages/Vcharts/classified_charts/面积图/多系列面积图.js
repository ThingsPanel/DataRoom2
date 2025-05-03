const spec = {
  type: 'area',
  data: {
    values: [
      {
        time: '0:00',
        value: 0,
        type: 'A'
      },
      {
        time: '1:00',
        value: 1000,
        type: 'A'
      },
      {
        time: '2:00',
        value: 4500,
        type: 'A'
      },
      {
        time: '3:00',
        value: 6000,
        type: 'A'
      },
      {
        time: '4:00',
        value: 4500,
        type: 'A'
      },
      {
        time: '5:00',
        value: 1000,
        type: 'A'
      },
      {
        time: '6:00',
        value: 0,
        type: 'A'
      },
      {
        time: '4:00',
        value: 0,
        type: 'B'
      },
      {
        time: '5:00',
        value: 1000,
        type: 'B'
      },
      {
        time: '6:00',
        value: 7000,
        type: 'B'
      },
      {
        time: '7:00',
        value: 8500,
        type: 'B'
      },
      {
        time: '8:00',
        value: 7000,
        type: 'B'
      },
      {
        time: '9:00',
        value: 1000,
        type: 'B'
      },
      {
        time: '10:00',
        value: 0,
        type: 'B'
      },
      {
        time: '8:00',
        value: 0,
        type: 'C'
      },
      {
        time: '9:00',
        value: 1000,
        type: 'C'
      },
      {
        time: '10:00',
        value: 6500,
        type: 'C'
      },
      {
        time: '11:00',
        value: 8000,
        type: 'C'
      },
      {
        time: '12:00',
        value: 6500,
        type: 'C'
      },
      {
        time: '13:00',
        value: 1000,
        type: 'C'
      },
      {
        time: '14:00',
        value: 0,
        type: 'C'
      }
    ]
  },
  xField: 'time',
  yField: 'value',
  seriesField: 'type',
  stack: false,
  markLine: [
    {
      coordinates: [
        {
          time: '3:00',
          value: 0
        },
        {
          time: '3:00',
          value: 6000
        }
      ],
      ...markLineStyle,
      label: {
        text: '6000',
        ...markLineStyle.label
      }
    },
    {
      coordinates: [
        {
          time: '7:00',
          value: 0
        },
        {
          time: '7:00',
          value: 8500
        }
      ],
      ...markLineStyle,
      label: {
        text: '8500',
        ...markLineStyle.label
      }
    },
    {
      coordinates: [
        {
          time: '11:00',
          value: 0
        },
        {
          time: '11:00',
          value: 8000
        }
      ],
      ...markLineStyle,
      label: {
        text: '8000',
        ...markLineStyle.label
      }
    }
  ],
  point: {
    visible: false
  },
  line: {
    style: {
      curveType: 'monotone'
    }
  },
  area: {
    style: {
      fillOpacity: 0.1
    }
  }
};