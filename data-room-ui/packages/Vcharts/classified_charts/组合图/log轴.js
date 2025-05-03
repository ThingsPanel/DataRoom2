const spec = {
  type: 'common',
  layout: {
    type: 'grid',
    col: 2,
    row: 6,
    rowHeight: [
      {
        index: 0,
        size: 30
      },
      {
        index: 3,
        size: 20
      }
    ],
    elements: [
      {
        modelId: 'title',
        col: 1,
        row: 0
      },
      {
        modelId: 'line-region-A',
        col: 1,
        row: 1
      },
      {
        modelId: 'axis-left-A',
        col: 0,
        row: 1
      },
      {
        modelId: 'axis-bottom-A',
        col: 1,
        row: 2
      },
      {
        modelId: 'line-region-B',
        col: 1,
        row: 4
      },
      {
        modelId: 'axis-left-B',
        col: 0,
        row: 4
      },
      {
        modelId: 'axis-bottom-B',
        col: 1,
        row: 5
      }
    ]
  },
  region: [
    {
      id: 'line-region-A'
    },
    {
      id: 'line-region-B'
    }
  ],
  series: [
    {
      regionId: 'line-region-A',
      type: 'line',
      xField: 'time',
      yField: 'a',
      data: {
        id: 'line-A',
        values: [
          {
            time: 1,
            a: 0,
            b: 117,
            c: 145
          },
          {
            time: 10,
            a: 1,
            b: 1317,
            c: 2345
          },
          {
            time: 100,
            a: 2,
            b: 2500,
            c: 3100
          },
          {
            time: 1000,
            a: 3,
            b: 7500,
            c: 6100
          },
          {
            time: 10000,
            a: 4,
            b: 7500,
            c: 6100
          },
          {
            time: 100000,
            a: 5,
            b: 7500,
            c: 6100
          },
          {
            time: 1000000,
            a: 6,
            b: 7500,
            c: 6100
          }
        ]
      }
    },
    {
      regionId: 'line-region-B',
      type: 'line',
      xField: 'time',
      yField: 'a',
      data: {
        id: 'line-B',
        values: [
          {
            time: 1,
            a: 0,
            b: 117,
            c: 145
          },
          {
            time: 10,
            a: 1,
            b: 1317,
            c: 2345
          },
          {
            time: 100,
            a: 2,
            b: 2500,
            c: 3100
          },
          {
            time: 1000,
            a: 3,
            b: 7500,
            c: 6100
          },
          {
            time: 10000,
            a: 4,
            b: 7500,
            c: 6100
          },
          {
            time: 100000,
            a: 5,
            b: 7500,
            c: 6100
          },
          {
            time: 1000000,
            a: 6,
            b: 7500,
            c: 6100
          }
        ]
      }
    }
  ],
  title: {
    text: 'the example shows difference of linear axis and log axis',
    id: 'title'
  },
  axes: [
    {
      id: 'axis-left-A',
      regionId: 'line-region-A',
      orient: 'left',
      type: 'linear'
    },

    {
      id: 'axis-bottom-A',
      regionId: 'line-region-A',
      orient: 'bottom',
      type: 'linear',
      title: 'log-axis'
    },
    {
      id: 'axis-left-B',
      regionId: 'line-region-B',
      orient: 'left',
      type: 'linear'
    },

    {
      id: 'axis-bottom-B',
      regionId: 'line-region-B',
      orient: 'bottom',
      type: 'log',
      title: 'log-axis'
    }
  ]
};