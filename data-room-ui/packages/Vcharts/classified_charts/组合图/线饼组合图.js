const spec = {
  type: 'common',
  padding: {
    top: 10
  },
  layout: {
    type: 'grid',
    col: 2,
    row: 4,
    elements: [
      {
        modelId: 'legend',
        col: 0,
        colSpan: 2,
        row: 0
      },
      {
        modelId: 'pie-region',
        col: 0,
        colSpan: 2,
        row: 1
      },
      {
        modelId: 'axis-left',
        col: 0,
        row: 2
      },
      {
        modelId: 'line-region',
        col: 1,
        row: 2
      },
      {
        modelId: 'axis-bottom',
        col: 1,
        row: 3
      }
    ]
  },
  region: [
    {
      id: 'pie-region',
      height: '40%'
    },
    {
      id: 'line-region'
    }
  ],
  legends: {
    visible: true,
    orient: 'top',
    id: 'legend',
    regionId: ['pie-region', 'line-region']
  },
  series: [
    {
      regionId: 'pie-region',
      type: 'pie',
      valueField: 'value',
      categoryField: 'type',
      data: {
        id: 'pie',
        values: [
          { type: 'a', value: 10 },
          { type: 'b', value: 20 }
        ]
      },
      seriesField: 'type'
    },
    {
      regionId: 'line-region',
      type: 'line',
      xField: 'x',
      yField: 'y',
      data: {
        id: 'line',
        values: [
          { x: '1', y: 10, type: 'a' },
          { x: '1', y: 20, type: 'b' },
          { x: '2', y: 30, type: 'a' },
          { x: '2', y: 40, type: 'b' }
        ]
      },
      seriesField: 'type'
    }
  ],
  axes: [
    {
      id: 'axis-left',
      regionId: 'line-region',
      orient: 'left'
    },

    {
      id: 'axis-bottom',
      regionId: 'line-region',
      orient: 'bottom'
    }
  ],
  tooltip: {
    dimension: {
      visible: true
    }
  }
};