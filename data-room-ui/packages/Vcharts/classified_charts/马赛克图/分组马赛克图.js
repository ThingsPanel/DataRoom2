const spec = {
  type: 'mosaic',
  // padding: { right: 60 },
  data: [
    {
      id: 'titanic',
      values: [
        {
          survived: 0,
          pclass: '1',
          sex: 'male',
          count: 77
        },
        {
          survived: 0,
          pclass: '2',
          sex: 'male',
          count: 91
        },
        {
          survived: 0,
          pclass: '3',
          sex: 'male',
          count: 300
        },

        {
          survived: 0,
          pclass: '1',
          sex: 'female',
          count: 3
        },
        {
          survived: 0,
          pclass: '2',
          sex: 'female',
          count: 6
        },
        {
          survived: 0,
          pclass: '3',
          sex: 'female',
          count: 72
        },

        {
          survived: 1,
          pclass: '1',
          sex: 'male',
          count: 45
        },
        {
          survived: 1,
          pclass: '2',
          sex: 'male',
          count: 17
        },
        {
          survived: 1,
          pclass: '3',
          sex: 'male',
          count: 47
        },

        {
          survived: 1,
          pclass: '1',
          sex: 'female',
          count: 91
        },
        {
          survived: 1,
          pclass: '2',
          sex: 'female',
          count: 70
        },
        {
          survived: 1,
          pclass: '3',
          sex: 'female',
          count: 72
        }
      ]
      // fields: {
      //   survived: {
      //     type: 'ordinal'
      //   },
      //   pclass: {
      //     type: 'ordinal'
      //   }
      // }
    }
  ],

  bar: {
    style: {
      fillOpacity: datum => {
        return datum.survived ? 1 : 0.5;
      }
    }
  },

  label: [
    {
      visible: true,
      position: 'bottom',
      style: {
        fill: '#333'
      },
      filterByGroup: {
        field: 'pclass',
        type: 'min'
      },
      overlap: false,
      formatMethod: (value, datum, ctx) => {
        return `pclass: ${datum['pclass']}`;
      }
    },

    {
      visible: true,
      position: 'right',
      style: {
        fill: '#000'
      },
      filterByGroup: {
        field: 'survived',
        type: 'max',
        filter: d => {
          return d.data['pclass'] === '3';
        }
      },
      overlap: {
        strategy: [
          {
            type: 'position',
            position: ['right', 'inside-right']
          }
        ]
      },
      formatMethod: (value, datum, ctx) => {
        return datum['survived'] ? 'Survived' : 'Perished';
      }
    },
    {
      visible: true,
      position: 'center',
      smartInvert: true
    }
  ],
  xField: ['pclass', 'survived'],
  yField: 'count',
  seriesField: 'sex',
  legends: {
    visible: true
  },
  axes: [
    {
      orient: 'left',
      label: {
        formatMethod: val => {
          return `${(val * 100).toFixed(2)}%`;
        }
      }
    },
    {
      orient: 'bottom',
      label: {
        visible: false
      }
    }
  ],
  tooltip: {
    mark: {
      title: {
        visible: false
      },
      content: [
        {
          key: 'survived',
          value: datum => (datum.survived ? 'true' : 'false'),
          hasShape: false
        },
        {
          key: 'sex',
          value: datum => datum.sex,
          hasShape: false
        },
        {
          key: 'pclass',
          value: datum => datum.pclass,
          hasShape: false
        },
        {
          key: 'count',
          value: datum => datum.count
        }
      ]
    }
  }
};