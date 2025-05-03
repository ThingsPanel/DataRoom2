const spec = {
  type: 'bar',
  data: [
    {
      id: 'barData',
      values: [
        {
          date: '2019-08-29',
          group: 'A',
          value: 154,
          stack: 'Dessert'
        },
        {
          date: '2019-08-29',
          group: 'B',
          value: 378,
          stack: 'Dessert'
        },
        {
          date: '2019-08-29',
          group: 'A',
          value: 103,
          stack: 'Drink'
        },
        {
          date: '2019-08-29',
          group: 'B',
          value: 310,
          stack: 'Drink'
        },
        {
          date: '2019-08-30',
          group: 'A',
          value: 153,
          stack: 'Dessert'
        },
        {
          date: '2019-08-30',
          group: 'B',
          value: 398,
          stack: 'Dessert'
        },
        {
          date: '2019-08-30',
          group: 'A',
          value: 105,
          stack: 'Drink'
        },
        {
          date: '2019-08-30',
          group: 'B',
          value: 298,
          stack: 'Drink'
        },
        {
          date: '2019-08-31',
          group: 'A',
          value: 151,
          stack: 'Dessert'
        },
        {
          date: '2019-08-31',
          group: 'B',
          value: 408,
          stack: 'Dessert'
        },
        {
          date: '2019-08-31',
          group: 'A',
          value: 110,
          stack: 'Drink'
        },
        {
          date: '2019-08-31',
          group: 'B',
          value: 302,
          stack: 'Drink'
        }
      ]
    }
  ],
  xField: ['date', 'stack', 'group'],
  yField: 'value',
  seriesField: 'group',
  stack: true,
  barBackground: {
    visible: true,
    fieldLevel: 0,
    style: {
      lineWidth: 0,
      fill: 'rgba(255,255,255,0.15)'
    }
  },
  axes: [
    {
      orient: 'left',
      title: {
        visible: true,
        text: 'Week-on-week (sales)'
      },
      tick: {
        tickCount: 10
      }
    },
    {
      orient: 'top',
      showAllGroupLayers: true
    }
  ],
  tooltip: {
    dimension: {
      content: [
        {
          key: datum => `${datum.stack}-${datum.group}`,
          value: datum => datum.value
        }
      ]
    }
  },
  animation: false,
  theme
};