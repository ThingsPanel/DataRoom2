const spec = {
  type: 'rose',
  data: [
    {
      id: 'rose',
      values: data
    }
  ],
  categoryField: 'country',
  valueField: 'cost',
  seriesField: 'country',
  outerRadius: 0.75, // set the radius
  axes: [
    {
      animation: true,
      orient: 'angle',
      visible: true,
      label: {
        visible: true
      },
      domainLine: {
        visible: true
      },
      grid: {
        visible: true
      },
      sampling: false
    },
    {
      orient: 'radius',
      visible: true,
      domainLine: {
        visible: true
      },
      grid: {
        visible: true
      }
    }
  ],
  legends: {
    visible: true,
    orient: 'right',
    type: 'color',
    field: 'cost',
    title: {
      visible: true,
      text: `country's cost`
    }
  },
  rose: {
    style: {
      fill: {
        field: 'cost',
        scale: 'color'
      },
      // Set the rounded corners of the sector
      cornerRadius: 8
    }
  },
  color: {
    type: 'linear',
    domain: [
      {
        dataId: 'rose',
        fields: ['cost']
      }
    ],
    range: ['#feedde', '#fdbe85', '#fd8d3c', '#e6550d', '#a63603']
  },
  crosshair: {
    categoryField: {
      visible: true,
      line: {
        type: 'rect',
        style: {
          fill: '#91d5ff'
        }
      },
      label: {
        visible: true // default is false
      }
    }
  }
};