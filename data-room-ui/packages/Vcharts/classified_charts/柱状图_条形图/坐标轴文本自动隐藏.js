const spec = {
  type: 'bar',
  xField: 'x',
  yField: 'y',
  axes: [
    {
      orient: 'bottom',
      sampling: false,
      label: {
        autoHide: true,
        autoHideMethod: 'greedy',
        autoHideSeparation: 10
      }
    }
  ],
  data: [
    {
      name: 'bar',
      fields: {
        y: {
          alias: 'sales'
        }
      },
      values: [
        {
          x: '2021-12-21 2:00',
          y: 82
        },
        {
          x: '2021-12-21 4:00',
          y: 50
        },
        {
          x: '2021-12-21 6:00',
          y: 64
        },
        {
          x: '2021-12-21 8:00',
          y: 30
        },
        {
          x: '2021-12-21 10:00',
          y: 40
        },
        {
          x: '2021-12-21 12:00',
          y: 40
        },
        {
          x: '2021-12-21 14:00',
          y: 56
        },
        {
          x: '2021-12-21 16:00',
          y: 40
        },
        {
          x: '2021-12-21 18:00',
          y: 64
        },
        {
          x: '2021-12-21 20:00',
          y: 74
        },
        {
          x: '2021-12-21 22:00',
          y: 98
        }
      ]
    }
  ]
};