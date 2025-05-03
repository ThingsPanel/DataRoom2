const spec = {
  type: 'common',
  seriesField: 'color',
  data: [
    {
      id: 'id0',
      values: [
        { x: 'Mon-Tue', type: 'a', y: 19 },
        { x: 'Tue-Web', type: 'a', y: 18 },
        { x: 'Wed-Thur', type: 'a', y: 16 },
        { x: 'Thur-Fri', type: 'a', y: 14 },
        { x: 'Fri-Sat', type: 'a', y: 12 },
        { x: 'Sat-Sun', type: 'a', y: 11 }
      ]
    },
    {
      id: 'id1',
      values: [
        { x: 'Mon-Tue', type: 'b', y: 16 },
        { x: 'Tue-Web', type: 'b', y: 17 },
        { x: 'Wed-Thur', type: 'b', y: 18 },
        { x: 'Thur-Fri', type: 'b', y: 20 },
        { x: 'Fri-Sat', type: 'b', y: 24 },
        { x: 'Sat-Sun', type: 'b', y: 26 }
      ]
    }
  ],
  series: [
    {
      type: 'bar',
      dataKey: 'x',
      dataIndex: 0,
      seriesField: 'type',
      dataIndex: 0,
      xField: 'x',
      yField: 'y',

      bar: {
        state: {
          blur: {
            opacity: 0.2
          }
        }
      }
    },
    {
      type: 'line',
      dataKey: 'x',
      dataIndex: 1,
      seriesField: 'type',
      xField: 'x',
      yField: 'y',
      stack: false,

      point: {
        state: {
          blur: {
            opacity: 0.2
          }
        }
      },
      line: {
        state: {
          blur: {
            opacity: 0.2
          }
        }
      }
    }
  ],
  axes: [
    { orient: 'left' },
    {
      orient: 'bottom',
      visible: true,
      domain: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      label: { visible: true },
      type: 'band',
      // bandPadding: 0,
      // paddingInner: 1,
      // paddingOuter: 0
      trimPadding: true
    },
    {
      orient: 'bottom',
      visible: false,
      label: { visible: true },
      type: 'band',
      bandPadding: 0,
      paddingInner: 0,
      paddingOuter: 0
    }
  ],
  interactions: [
    {
      type: 'element-highlight-by-key'
    }
  ]
};