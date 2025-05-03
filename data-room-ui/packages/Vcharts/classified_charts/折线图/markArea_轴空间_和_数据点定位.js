const spec = {
  width: 800,
  type: 'line',
  xField: 'x',
  yField: 'y',
  markArea: [
    {
      x: 'min',
      x1: 4,
      label: {
        text: '区域: 从 minX 到 x = 4',
        position: 'insideTop'
      }
    },
    {
      y: 20,
      y1: 40,
      label: {
        text: '区域: 从 y = 20 到 y = 40',
        position: 'insideRight'
      }
    },
    {
      coordinates: [
        {
          x: 1,
          y: 10
        },
        {
          x: 2,
          y: 80
        },
        {
          x: 3,
          y: 80
        },
        {
          x: 4,
          y: 50
        }
      ],
      label: {
        text: '区域: 任意数据点连接',
        position: 'middle'
      }
    }
  ],
  data: {
    id: 'data2',
    values: [
      { x: 1, y: 80 },
      { x: 2, y: 40 },
      { x: 3, y: 10 },
      { x: 4, y: 20 }
    ]
  }
};