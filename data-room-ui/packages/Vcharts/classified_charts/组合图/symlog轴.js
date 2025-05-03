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
      xField: 'x',
      yField: 'y',
      data: {
        id: 'line-A',
        values: data
      }
    },
    {
      regionId: 'line-region-B',
      type: 'line',
      xField: 'x',
      yField: 'y',
      data: {
        id: 'line-B',
        values: data
      }
    }
  ],
  title: {
    text: 'the example shows difference of linear axis and symlog axis',
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
      type: 'linear'
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
      type: 'symlog'
    }
  ]
};