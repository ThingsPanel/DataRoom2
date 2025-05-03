const spec = {
  type: 'area',
  data: [
    {
      id: 'line',
      values: [
        { x: 'Monday', y: 12 },
        { x: 'Tuesday', y: 13 },
        { x: 'Wednesday', y: 11 },
        { x: 'Thursday', y: 10 },
        { x: 'Friday', y: 12 },
        { x: 'Saturday', y: 14 },
        { x: 'Sunday', y: 17 }
      ]
    }
  ],
  xField: 'x',
  yField: 'y',
  axes: [
    {
      zIndex: 100,
      orient: 'bottom'
    },
    {
      zIndex: 101,
      orient: 'left',
      inverse: true, // inverse the left axis
      domainLine: {
        visible: true,
        // show the endSymbol
        endSymbol: {
          visible: true,
          style: {
            fill: '#000'
          }
        }
      }
    }
  ]
};