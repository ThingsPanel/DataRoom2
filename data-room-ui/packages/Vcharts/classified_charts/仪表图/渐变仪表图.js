const spec = {
  type: 'gauge',
  data: [
    {
      id: 'id0',
      values: [
        {
          type: '目标A',
          value: 0.6
        }
      ]
    }
  ],
  radiusField: 'type',
  angleField: 'value',
  seriesField: 'type',
  outerRadius: 0.8,
  innerRadius: 0.5,
  startAngle: -225,
  endAngle: 45,
  gauge: {
    type: 'circularProgress',
    progress: {
      style: {
        fill: {
          gradient: 'conical',
          stops: [
            {
              offset: 0,
              color: '#4FC6B4'
            },
            {
              offset: 1,
              color: '#31679E'
            }
          ]
        }
      }
    },
    track: {
      style: {
        fill: '#ccc'
      }
    }
  },
  pointer: {
    width: 0.5,
    height: 0.5,
    style: {
      path: pointerPath,
      fill: '#5A595E'
    }
  },
  pin: {
    style: {
      path: circlePath,
      fill: '#888'
    }
  },
  pinBackground: {
    width: 0.08,
    height: 0.08,
    style: {
      path: circlePath,
      fill: '#ddd'
    }
  }
};