const spec = {
  type: 'pictogram',
  data: {
    id: 'data',
    values: [{ name: 'Yes', value: 'Love This' }, { name: 'So-so' }, { name: 'Forbidden' }, { name: 'Horror' }]
  },
  region: [
    {
      roam: { blank: true }
    }
  ],
  seriesField: 'name',
  nameField: 'name',
  valueField: 'value',
  svg: 'cat',
  color: {
    specified: {
      Yes: '#009A00',
      'So-so': '#FEB202',
      Forbidden: '#FE3E00',
      Horror: '#FE2B09',
      undefined: 'white'
    }
  },
  interactions: [
    {
      type: 'element-active-by-legend',
      filterField: 'name'
    }
  ],
  pictogram: {
    style: {
      fill: {
        scale: 'color',
        field: 'name'
      }
    },
    state: {
      active: {
        fillOpacity: 0.8,
        stroke: {
          scale: 'color',
          field: 'name'
        },
        lineWidth: 2
      },
      hover: {
        fillOpacity: 0.8,
        stroke: {
          scale: 'color',
          field: 'name'
        },
        lineWidth: 2
      }
    }
  },
  title: { text: 'Cat Stroking For Beginners' },
  legends: { orient: 'top', filter: false }
};