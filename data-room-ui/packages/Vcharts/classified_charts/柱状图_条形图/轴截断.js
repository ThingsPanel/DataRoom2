const spec = {
  type: 'bar',
  data: {
    values: [
      {
        month: 'Jan',
        value: 44,
        type: 'Attraction 1'
      },
      {
        month: 'Jan',
        value: 64,
        type: 'Attraction 2'
      },
      {
        month: 'Feb',
        value: 128,
        type: 'Attraction 1'
      },
      {
        month: 'Feb',
        value: 138,
        type: 'Attraction 2'
      },
      {
        month: 'Mar',
        value: 180,
        type: 'Attraction 1'
      },
      {
        month: 'Mar',
        value: 164,
        type: 'Attraction 2'
      },
      {
        month: 'Apr',
        value: 345,
        type: 'Attraction 1'
      },
      {
        month: 'Apr',
        value: 408,
        type: 'Attraction 2'
      },
      {
        month: 'May',
        value: 3050,
        type: 'Attraction 1'
      },
      {
        month: 'May',
        value: 3120,
        type: 'Attraction 2'
      },
      {
        month: 'Jun',
        value: 3590,
        type: 'Attraction 1'
      },
      {
        month: 'Jun',
        value: 3540,
        type: 'Attraction 2'
      },
      {
        month: 'Jul',
        value: 3840,
        type: 'Attraction 1'
      },
      {
        month: 'Jul',
        value: 3875,
        type: 'Attraction 2'
      },
      {
        month: 'Aug',
        value: 3630,
        type: 'Attraction 1'
      },
      {
        month: 'Aug',
        value: 3420,
        type: 'Attraction 2'
      },
      {
        month: 'Sep',
        value: 3120,
        type: 'Attraction 1'
      },
      {
        month: 'Sep',
        value: 720,
        type: 'Attraction 2'
      },
      {
        month: 'Oct',
        value: 420,
        type: 'Attraction 1'
      },
      {
        month: 'Oct',
        value: 320,
        type: 'Attraction 2'
      },
      {
        month: 'Nov',
        value: 240,
        type: 'Attraction 1'
      },
      {
        month: 'Nov',
        value: 160,
        type: 'Attraction 2'
      },
      {
        month: 'Dec',
        value: 80,
        type: 'Attraction 1'
      },
      {
        month: 'Dec',
        value: 20,
        type: 'Attraction 2'
      }
    ]
  },
  xField: ['month', 'type'],
  yField: 'value',
  seriesField: 'type',
  axes: [
    {
      orient: 'left',
      breaks: [
        {
          range: [500, 3000],
          breakSymbol: {
            style: {
              stroke: '#D9DDE4'
            }
          }
        }
      ],
      domainLine: {
        visible: true
      }
    }
  ]
};