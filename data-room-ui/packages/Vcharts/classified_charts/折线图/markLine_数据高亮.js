const spec = {
  type: 'line',
  data: {
    id: 'data2',
    values: [
      { x: 1, y: 80 },
      { x: 2, y: 40 },
      { x: 3, y: 10 },
      { x: 4, y: 20 }
    ]
  },
  xField: 'x',
  yField: 'y',
  markLine: [
    {
      coordinates: [
        { x: 1, y: 80 },
        { x: 2, y: 40 },
        { x: 3, y: 10 }
      ],
      label: {
        text: 'Some data is highlighted',
        autoRotate: true,
        position: 'insideMiddleTop',
        labelBackground: {
          padding: 2,
          style: {
            fill: '#E8346D'
          }
        }
      },
      endSymbol: {
        style: {
          visible: false
        }
      },
      line: {
        style: {
          stroke: '#E8346D',
          lineDash: [],
          lineWidth: 2
        }
      }
    }
  ]
};