const spec = {
  type: 'gauge',
  data: [
    {
      id: 'id0',
      values: [
        {
          type: '目标A',
          value: 0.7
        }
      ]
    }
  ],
  radiusField: 'type',
  categoryField: 'type',
  valueField: 'value',
  outerRadius: 0.8,
  innerRadius: 0.75,
  startAngle: -240,
  endAngle: 60,
  gauge: {
    type: 'circularProgress',
    cornerRadius: 20,
    progress: {
      style: {
        fill: '#1664ff'
      }
    },
    track: {
      style: {
        fill: '#000'
      }
    }
  },
  pointer: {
    style: {
      fill: '#333'
    }
  },
  indicator: [
    {
      visible: true,
      offsetY: '75%',
      title: {
        style: {
          text: '70%',
          fontSize: 60,
          fontWeight: 800
        }
      }
    }
  ]
};