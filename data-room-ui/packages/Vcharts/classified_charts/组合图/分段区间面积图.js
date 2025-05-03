const spec = {
  type: 'common',
  data: [
    {
      id: 'areaData',
      values: [
        { year: 1700, exports: 35, imports: 70 },
        { year: 1710, exports: 59, imports: 81 },
        { year: 1720, exports: 76, imports: 96 },
        { year: 1730, exports: 65, imports: 97 },
        { year: 1740, exports: 67, imports: 93 },
        { year: 1750, exports: 79, imports: 90 },
        { year: 1753, exports: 87, imports: 87 },
        { year: 1760, exports: 115, imports: 79 },
        { year: 1770, exports: 163, imports: 85 },
        { year: 1780, exports: 185, imports: 93 }
      ]
    }
  ],
  series: [
    {
      type: 'rangeArea',
      xField: 'year',
      yField: ['exports', 'imports'],
      area: {
        style: {
          curveType: 'monotone',
          fill: data => {
            if (data.year <= 1755) {
              return '#F5222D';
            }
            return '#FAAD14';
          }
        }
      }
    },
    {
      type: 'line',
      xField: 'year',
      yField: 'exports',
      point: {
        style: {
          size: 0
        }
      },
      line: {
        style: {
          curveType: 'monotone',
          stroke: '#F5222D'
        }
      }
    },
    {
      type: 'line',
      xField: 'year',
      yField: 'imports',
      point: {
        style: {
          size: 0
        }
      },
      line: {
        style: {
          curveType: 'monotone',
          stroke: '#FAAD14'
        }
      }
    }
  ],
  markPoint: [
    {
      coordinate: {
        year: 1730,
        exports: 50
      },
      itemContent: {
        type: 'text',
        autoRotate: false,
        text: {
          text: 'BALANCE AGAINST',
          style: {
            fontSize: 14,
            fontWeight: 'bold',
            fill: 'rgba(0,0,0,0.45)',
            textAlign: 'center',
            textBaseline: 'middle'
          }
        }
      },
      itemLine: {
        visible: false
      }
    },
    {
      coordinate: {
        year: 1765,
        exports: 75
      },
      itemContent: {
        offsetX: -40,
        type: 'text',
        autoRotate: false,
        text: {
          text: ['BALANCE in', 'FAVOUR of ENGLAND'],
          style: {
            fontSize: 14,
            fontWeight: 'bold',
            fill: 'rgba(0,0,0,0.45)',
            textAlign: 'left',
            textBaseline: 'middle'
          }
        }
      },
      itemLine: {
        visible: false
      }
    }
  ],
  axes: [
    {
      orient: 'left',
      label: {
        visible: true
      },
      type: 'linear'
    },
    { orient: 'bottom', type: 'linear', min: '1700', max: '1780' }
  ],
  crosshair: {
    xField: {
      line: {
        type: 'line'
      },
      label: {
        visible: true
      }
    }
  }
};