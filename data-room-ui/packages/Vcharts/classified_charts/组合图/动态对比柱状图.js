const spec = {
  type: 'common',
  title: {
    id: 'title',
    visible: true,
    text: 'Congo Population Pyramid 2021'
  },
  layout: {
    type: 'grid',
    col: 4,
    row: 5,
    elements: [
      { modelId: 'title', col: 0, row: 0, colSpan: 4 },

      { modelId: 'legend', col: 0, row: 1, colSpan: 4 },

      { modelId: 'leftAxesCountry', col: 0, row: 2 },
      { modelId: 'leftRegion', col: 1, row: 2 },
      { modelId: 'leftAxesValue', col: 1, row: 3 },

      { modelId: 'rightRegion', col: 2, row: 2 },
      { modelId: 'rightAxesCountry', col: 3, row: 2 },
      { modelId: 'rightAxesValue', col: 2, row: 3 },
      { modelId: 'player', col: 0, row: 4, colSpan: 4 }
    ]
  },
  region: [{ id: 'leftRegion' }, { id: 'rightRegion' }],
  player: {
    id: 'player',
    orient: 'bottom',
    auto: true,
    interval: 300,
    specs: dataSpec
  },
  legends: [
    {
      visible: true,
      orient: 'bottom',
      id: 'legend',
      position: 'start',
      interactive: false
    }
  ],

  data: dataSpec[0].data,
  animationExit: false,
  series: [
    {
      id: 'male',
      regionId: 'leftRegion',
      type: 'bar',
      dataId: 'maleData',
      direction: 'horizontal',
      xField: 'population',
      yField: 'age',
      bar: {
        style: {
          fill: 'steelblue'
        }
      },
      label: {
        visible: true,
        position: 'left',
        overlap: false,
        style: {
          fontSize: 12,
          fill: '#6F6F6F'
        },
        formatMethod: val => `${val.toFixed(1)}`
      },
      tooltip: {
        mark: {
          content: [
            {
              key: datum => datum.age,
              value: datum => `${(datum.population / 100).toFixed(1)}`
            }
          ]
        },
        dimension: {
          content: [
            {
              key: datum => datum.age
            }
          ]
        }
      }
    },
    {
      id: 'female',
      regionId: 'rightRegion',
      type: 'bar',
      dataId: 'femaleData',
      direction: 'horizontal',
      xField: 'population',
      yField: 'age',
      bar: {
        style: {
          fill: '#EE7989'
        }
      },
      label: {
        visible: true,
        overlap: false,
        style: {
          fontSize: 12,
          fill: '#6F6F6F'
        },
        formatMethod: val => `${val.toFixed(1)}`
      },
      tooltip: {
        mark: {
          content: [
            {
              key: datum => datum.age,
              value: datum => `${(datum.population / 100).toFixed(1)}`
            }
          ]
        },
        dimension: {
          content: [
            {
              key: datum => datum.age,
              value: datum => `${(datum.population / 100).toFixed(1)}`
            }
          ]
        }
      }
    }
  ],
  axes: [
    {
      id: 'leftAxesCountry',
      regionId: 'leftRegion',
      seriesId: ['male'],
      orient: 'left',
      type: 'band',
      grid: { visible: true, style: { lineDash: [0] } }
    },
    {
      id: 'rightAxesCountry',
      regionId: 'rightRegion',
      seriesId: ['female'],
      orient: 'right',
      type: 'band',
      grid: { visible: true, style: { lineDash: [0] } }
    },
    {
      id: 'leftAxesValue',
      regionId: 'leftRegion',
      seriesId: ['male'],
      orient: 'bottom',
      type: 'linear',
      inverse: true,
      grid: { visible: true, style: { lineDash: [0] } },
      min: 0,
      max: 2e4,
      label: {
        formatMethod: val => {
          return `${(val / 1000).toFixed(0)}M`;
        }
      }
    },
    {
      id: 'rightAxesValue',
      regionId: 'rightRegion',
      seriesId: ['female'],
      orient: 'bottom',
      type: 'linear',
      grid: { visible: true, style: { lineDash: [0] } },
      min: 0,
      max: 2e4,
      label: {
        animation: { increaseEffect: true },
        formatMethod: val => {
          return `${(val / 1000).toFixed(0)}M`;
        }
      }
    }
  ]
};