const spec = {
  type: 'line',
  xField: 'x',
  yField: 'y',
  seriesField: 'type',
  markLine: [
    {
      x: 'Wed',
      label: {
        text: 'National holiday',
        position: 'insideEndBottom',
        refY: 10,
        labelBackground: {
          padding: 5,
          style: {
            stroke: '#6690F2',
            fillOpacity: 0
          }
        },
        style: {
          fill: '#6690F2'
        }
      },
      line: {
        style: {
          stroke: '#6690F2',
          lineDash: []
        }
      },
      endSymbol: {
        style: {
          visible: false
        }
      }
    },
    {
      y: 'average',
      label: {
        text: 'Average Visit Num',
        position: 'insideEndBottom',
        refY: -10,
        labelBackground: {
          padding: 2,
          style: {
            fill: '#6690F2'
          }
        },
        style: {
          fontSize: 12
        }
      },
      line: {
        style: {
          stroke: '#6690F2',
          lineDash: []
        }
      },
      endSymbol: {
        style: {
          visible: false
        }
      }
    }
  ],
  line: {
    style: {
      curveType: 'monotone'
    }
  },
  data: {
    id: 'data2',
    values: [
      { x: 'Mon', y: 14000, type: 'A' },
      { x: 'Tue', y: 14500, type: 'A' },
      { x: 'Wed', y: 24000, type: 'A' },
      { x: 'Thu', y: 13000, type: 'A' },
      { x: 'Fri', y: 15000, type: 'A' },
      { x: 'Sat', y: 19000, type: 'A' },
      { x: 'Sun', y: 21000, type: 'A' },
      { x: 'Mon', y: 15000, type: 'B' },
      { x: 'Tue', y: 14800, type: 'B' },
      { x: 'Wed', y: 25000, type: 'B' },
      { x: 'Thu', y: 9000, type: 'B' },
      { x: 'Fri', y: 15000, type: 'B' },
      { x: 'Sat', y: 20000, type: 'B' },
      { x: 'Sun', y: 19000, type: 'B' }
    ]
  }
};