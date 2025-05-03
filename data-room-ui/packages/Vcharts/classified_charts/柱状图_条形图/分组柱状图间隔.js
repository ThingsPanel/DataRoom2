const spec = {
  type: 'bar',
  color: ['#becef3', '#6a8edc', '#77caeb', '#52c93b', '#d3f5e8'],
  data: [
    {
      id: 'barData',
      values: [
        { type: 'A', year: '2000', value: 25 },
        { type: 'A', year: '2010', value: 28 },
        { type: 'A', year: '2018', value: 18 },
        { type: 'B', year: '2000', value: 23 },
        { type: 'B', year: '2010', value: 32 },
        { type: 'B', year: '2018', value: 22 },
        { type: 'C', year: '2000', value: 18 },
        { type: 'C', year: '2010', value: 18 },
        { type: 'C', year: '2018', value: 18 },
        { type: 'D', year: '2000', value: 15 },
        { type: 'D', year: '2010', value: 22 },
        { type: 'D', year: '2018', value: 19 },
        { type: 'E', year: '2000', value: 5 },
        { type: 'E', year: '2010', value: 12 },
        { type: 'E', year: '2018', value: 5 }
      ]
    }
  ],
  xField: ['year', 'type'],
  yField: 'value',
  seriesField: 'type',
  axes: [
    {
      orient: 'bottom',
      paddingInner: 0.3
    }
  ],
  bar: {
    style: {
      fillOpacity: 0.9
    }
  }
};