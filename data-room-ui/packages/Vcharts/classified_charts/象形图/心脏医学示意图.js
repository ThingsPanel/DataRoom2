const spec = {
  type: 'pictogram',
  data: {
    id: 'data',
    values: [{ name: 'Aorta' }, { name: 'Vein' }, { name: 'CardiacBase' }, { name: 'PulmonaryArtery' }]
  },
  region: [
    {
      // 允许在空白区域漫游
      roam: { blank: true }
    }
  ],
  seriesField: 'name',
  nameField: 'name',
  valueField: 'value',
  svg: 'heart',
  color: {
    specified: {
      Aorta: '#F0321F',
      Vein: '#1AC6FF',
      CardiacBase: '#FB6747',
      PulmonaryArtery: '#FB8D6C',
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
  title: { text: 'Medical Schematic Diagram of the Heart' },
  legends: { orient: 'top', filter: false }
};