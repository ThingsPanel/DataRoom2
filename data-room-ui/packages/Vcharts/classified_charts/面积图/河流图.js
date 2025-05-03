const spec = {
  type: 'area',
  data: {
    id: 'data',
    values: data
  },
  color: ['#F7FCFD', '#E0ECF4', '#BFD3E6', '#9EBCDA', '#8C96C5', '#8C6BB1', '#88419D', '#810F7C', '#4D004A'],
  title: {
    visible: true,
    text: 'EVOLUTION OF BABY NAMES IN THE US'
  },

  xField: 'year',
  yField: 'n',
  seriesField: 'name',
  stackOffsetSilhouette: true,
  point: { visible: false },
  area: {
    style: {
      fillOpacity: 0.4
    },
    state: {
      hover: {
        style: {
          fillOpacity: 1
        }
      }
    }
  },
  legends: [{ range: [], visible: true, position: 'middle', orient: 'bottom' }],

  axes: [
    {
      orient: 'left',
      visible: false
    },
    {
      orient: 'bottom',
      label: { visible: true }
    }
  ]
};