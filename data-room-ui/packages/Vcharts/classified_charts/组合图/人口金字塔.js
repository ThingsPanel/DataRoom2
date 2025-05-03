const spec = {
  type: 'common',
  title: {
    id: 'title',
    visible: true,
    text: 'Congo Population Pyramid 2021',
    subtext: 'Data & Design Refer from https://www.populationpyramid.net/'
  },
  layout: {
    type: 'grid',
    col: 4,
    row: 4,
    elements: [
      { modelId: 'title', col: 0, row: 0, colSpan: 4 },

      { modelId: 'legend', col: 0, row: 3, colSpan: 4 },

      { modelId: 'leftAxesCountry', col: 0, row: 1 },
      { modelId: 'leftRegion', col: 1, row: 1 },
      { modelId: 'leftAxesValue', col: 1, row: 2 },

      { modelId: 'rightRegion', col: 2, row: 1 },
      { modelId: 'rightAxesCountry', col: 3, row: 1 },
      { modelId: 'rightAxesValue', col: 2, row: 2 }
    ]
  },
  region: [{ id: 'leftRegion' }, { id: 'rightRegion' }],
  legends: [
    {
      visible: true,
      orient: 'bottom',
      id: 'legend',
      interactive: false
    }
  ],
  series: [
    {
      id: 'male',
      regionId: 'leftRegion',
      type: 'bar',
      data: {
        id: 'maleData',
        values: maleData
      },
      direction: 'horizontal',
      xField: 'ratio',
      yField: 'age',
      bar: {
        style: {
          fill: 'steelblue'
        }
      },
      label: {
        visible: true,
        position: 'left',
        style: {
          fill: '#6F6F6F'
        },
        formatMethod: val => `${(val * 100).toFixed(0)}%`
      },
      tooltip: {
        mark: {
          content: [
            {
              key: datum => datum.age,
              value: datum => datum.population
            }
          ]
        },
        dimension: {
          content: [
            {
              key: datum => datum.age,
              value: datum => datum.population
            }
          ]
        }
      }
    },
    {
      id: 'female',
      regionId: 'rightRegion',
      type: 'bar',
      data: {
        id: 'femaleData',
        values: femaleData
      },
      direction: 'horizontal',
      xField: 'ratio',
      yField: 'age',
      bar: {
        style: {
          fill: '#EE7989'
        }
      },
      label: {
        visible: true,
        style: {
          fill: '#6F6F6F'
        },
        formatMethod: val => `${(val * 100).toFixed(0)}%`
      },
      tooltip: {
        mark: {
          content: [
            {
              key: datum => datum.age,
              value: datum => datum.population
            }
          ]
        },
        dimension: {
          content: [
            {
              key: datum => datum.age,
              value: datum => datum.population
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
      grid: { visible: false }
    },
    {
      id: 'rightAxesCountry',
      regionId: 'rightRegion',
      seriesId: ['female'],
      orient: 'right',
      type: 'band',
      grid: { visible: false }
    },
    {
      id: 'leftAxesValue',
      regionId: 'leftRegion',
      seriesId: ['male'],
      orient: 'bottom',
      type: 'linear',
      inverse: true,
      min: 0,
      max: 0.1,
      label: {
        formatMethod: val => {
          return `${(val * 100).toFixed(0)}%`;
        }
      }
    },
    {
      id: 'rightAxesValue',
      regionId: 'rightRegion',
      seriesId: ['female'],
      orient: 'bottom',
      type: 'linear',
      min: 0,
      max: 0.1,
      label: {
        formatMethod: val => {
          return `${(val * 100).toFixed(0)}%`;
        }
      }
    }
  ]
};