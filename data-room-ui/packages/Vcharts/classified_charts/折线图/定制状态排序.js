const spec = {
  type: 'line',
  data: [
    {
      id: 'barData',
      values: [
        {
          State: 'WY',
          Age: 'Under 5 Years',
          Population: 25635
        },
        {
          State: 'WY',
          Age: '5 to 13 Years',
          Population: 1890
        },
        {
          State: 'WY',
          Age: '14 to 17 Years',
          Population: 9314
        },
        {
          State: 'DC',
          Age: 'Under 5 Years',
          Population: 30352
        },
        {
          State: 'DC',
          Age: '5 to 13 Years',
          Population: 20439
        },
        {
          State: 'DC',
          Age: '14 to 17 Years',
          Population: 10225
        },
        {
          State: 'VT',
          Age: 'Under 5 Years',
          Population: 38253
        },
        {
          State: 'VT',
          Age: '5 to 13 Years',
          Population: 42538
        },
        {
          State: 'VT',
          Age: '14 to 17 Years',
          Population: 15757
        },
        {
          State: 'ND',
          Age: 'Under 5 Years',
          Population: 51896
        },
        {
          State: 'ND',
          Age: '5 to 13 Years',
          Population: 67358
        },
        {
          State: 'ND',
          Age: '14 to 17 Years',
          Population: 18794
        },
        {
          State: 'AK',
          Age: 'Under 5 Years',
          Population: 72083
        },
        {
          State: 'AK',
          Age: '5 to 13 Years',
          Population: 85640
        },
        {
          State: 'AK',
          Age: '14 to 17 Years',
          Population: 22153
        }
      ]
    }
  ],
  xField: 'State',
  yField: 'Population',
  seriesField: 'Age',
  legends: {
    visible: true
  },
  point: {
    style: {
      size: 0,
      fill: 'white',
      stroke: null,
      lineWidth: 2
    },
    stateSort: (stateA, stateB) => {
      return stateMap[stateA] - stateMap[stateB];
    },
    state: {
      dimension_hover: {
        size: 8
      },

      unHover_line: {
        size: 0
      }
    }
  },
  line: {
    style: {
      lineWidth: 5
    },
    state: {
      hover_line: {
        strokeOpacity: 1
      },
      unHover_line: {
        strokeOpacity: 0.1
      }
    }
  },
  crosshair: {
    xField: {
      line: {
        type: 'line'
      }
    }
  },
  tooltip: false
};