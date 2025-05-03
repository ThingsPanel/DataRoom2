const spec = {
  type: 'bar',
  data: [
    {
      values: [
        { type: 'Category One', min: 76, max: 100, range: 'A', type2: 'p', color: 'A_p' },
        { type: 'Category Two', min: 56, max: 108, range: 'A', type2: 'p', color: 'A_p' },
        { type: 'Category One', min: 56, max: 100, range: 'B', type2: 'p', color: 'B_p' },
        { type: 'Category Two', min: 36, max: 108, range: 'B', type2: 'p', color: 'B_p' },

        { type: 'Category One', min: 76, max: 100, range: 'A', type2: 'k', color: 'A_k' },
        { type: 'Category Two', min: 56, max: 108, range: 'A', type2: 'k', color: 'A_k' },
        { type: 'Category One', min: 56, max: 100, range: 'B', type2: 'k', color: 'B_k' },
        { type: 'Category Two', min: 36, max: 108, range: 'B', type2: 'k', color: 'B_k' }
      ]
    }
  ],
  xField: ['type', 'range', 'type2'],
  yField: 'min',
  seriesField: 'color',
  paddingInner: [0.6, 0.6, 0.6],
  bandPadding: [0.6, 0.6, 0.6],
  label: {
    position: 'bothEnd'
  },
  axes: [
    {
      orient: 'bottom',
      showAllGroupLayers: true,
      sampling: false,
      tick: {
        tickCount: 2
      }
    }
  ],
  legends: {
    visible: true
  }
};