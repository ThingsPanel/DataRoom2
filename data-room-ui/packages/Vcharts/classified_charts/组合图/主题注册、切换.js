const spec = {
  type: 'common',
  data: [
    {
      id: 'id0',
      values: [
        {
          time: '2:00',
          value: 8,
          type: 'Douyin'
        },
        {
          time: '4:00',
          value: 9,
          type: 'Douyin'
        },
        {
          time: '6:00',
          value: 11,
          type: 'Douyin'
        },
        {
          time: '8:00',
          value: 14,
          type: 'Douyin'
        },
        {
          time: '10:00',
          value: 16,
          type: 'Douyin'
        },
        {
          time: '12:00',
          value: 17,
          type: 'Douyin'
        },
        {
          time: '14:00',
          value: 17,
          type: 'Douyin'
        },
        {
          time: '16:00',
          value: 16,
          type: 'Douyin'
        },
        {
          time: '18:00',
          value: 15,
          type: 'Douyin'
        },

        {
          time: '2:00',
          value: 7,
          type: 'Bilibili'
        },
        {
          time: '4:00',
          value: 8,
          type: 'Bilibili'
        },
        {
          time: '6:00',
          value: 9,
          type: 'Bilibili'
        },
        {
          time: '8:00',
          value: 10,
          type: 'Bilibili'
        },
        {
          time: '10:00',
          value: 9,
          type: 'Bilibili'
        },
        {
          time: '12:00',
          value: 12,
          type: 'Bilibili'
        },
        {
          time: '14:00',
          value: 14,
          type: 'Bilibili'
        },
        {
          time: '16:00',
          value: 12,
          type: 'Bilibili'
        },
        {
          time: '18:00',
          value: 14,
          type: 'Bilibili'
        }
      ]
    },
    {
      id: 'id1',
      values: [
        {
          time: '2:00',
          value: 15,
          type: 'Total'
        },
        {
          time: '4:00',
          value: 17,
          type: 'Total'
        },
        {
          time: '6:00',
          value: 20,
          type: 'Total'
        },
        {
          time: '8:00',
          value: 24,
          type: 'Total'
        },
        {
          time: '10:00',
          value: 25,
          type: 'Total'
        },
        {
          time: '12:00',
          value: 29,
          type: 'Total'
        },
        {
          time: '14:00',
          value: 31,
          type: 'Total'
        },
        {
          time: '16:00',
          value: 28,
          type: 'Total'
        },
        {
          time: '18:00',
          value: 29,
          type: 'Total'
        }
      ]
    }
  ],
  series: [
    {
      type: 'bar',
      dataIndex: 0,
      xField: ['time', 'type'],
      yField: 'value',
      seriesField: 'type'
    },
    {
      type: 'line',
      dataIndex: 1,
      xField: 'time',
      yField: 'value',
      seriesField: 'type'
    }
  ],
  legends: {
    visible: true,
    orient: 'right'
  },
  axes: [
    {
      orient: 'bottom',
      type: 'band'
    },
    {
      orient: 'left',
      type: 'linear'
    }
  ]
};