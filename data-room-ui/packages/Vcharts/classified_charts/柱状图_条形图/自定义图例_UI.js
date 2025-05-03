const spec = {
  type: 'bar',
  data: [
    {
      id: 'bar',
      values: [
        { x: 'Round 1', y: 21, c: 'Role A' },
        { x: 'Round 1', y: 38, c: 'Role B' },
        { x: 'Round 2', y: 28, c: 'Role A' },
        { x: 'Round 2', y: 45, c: 'Role B' },
        { x: 'Round 3', y: 22, c: 'Role A' },
        { x: 'Round 3', y: 56, c: 'Role B' },
        { x: 'Round 4', y: 34, c: 'Role A' },
        { x: 'Round 4', y: 48, c: 'Role B' },
        { x: 'Round 5', y: 34, c: 'Role A' },
        { x: 'Round 5', y: 64, c: 'Role B' },
        { x: 'Round 6', y: 44, c: 'Role A', latest: true },
        { x: 'Round 6', y: 72, c: 'Role B', latest: true },
        { x: 'Round 7', y: 38, c: 'Role A', latest: true },
        { x: 'Round 7', y: 65, c: 'Role B', latest: true },
        { x: 'Round 8', y: 24, c: 'Role A', latest: true },
        { x: 'Round 8', y: 70, c: 'Role B', latest: true },
        { x: 'Round 9', y: 28, c: 'Role A', latest: true },
        { x: 'Round 9', y: 62, c: 'Role B', latest: true }
      ]
    }
  ],
  xField: 'x',
  yField: 'y',
  seriesField: 'c',
  axes: [{ orient: 'left' }, { orient: 'bottom' }],
  legends: {
    visible: false
  }
};