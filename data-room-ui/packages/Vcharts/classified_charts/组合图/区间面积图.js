const spec = {
  type: 'common',
  data: [
    {
      id: 'areaData',
      values: [
        { type: 'Category One', min: 76, max: 100 },
        { type: 'Category Two', min: 56, max: 108 },
        { type: 'Category Three', min: 38, max: 129 },
        { type: 'Category Four', min: 58, max: 155 },
        { type: 'Category Five', min: 45, max: 120 },
        { type: 'Category Six', min: 23, max: 99 },
        { type: 'Category Seven', min: 18, max: 56 },
        { type: 'Category Eight', min: 18, max: 34 }
      ]
    },
    {
      id: 'lineData',
      values: [
        { type: 'Category One', average: 88 },
        { type: 'Category Two', average: 82 },
        { type: 'Category Three', average: 83.5 },
        { type: 'Category Four', average: 106.5 },
        { type: 'Category Five', average: 82.5 },
        { type: 'Category Six', average: 61 },
        { type: 'Category Seven', average: 37 },
        { type: 'Category Eight', average: 26 }
      ]
    }
  ],
  series: [
    {
      type: 'rangeArea',
      dataIndex: 0,
      xField: 'type',
      yField: ['min', 'max'],
      stack: false,
      area: {
        style: {
          fillOpacity: 0.15
        }
      }
    },
    {
      type: 'line',
      dataIndex: 1,
      xField: 'type',
      yField: 'average',
      point: {
        state: {
          hover: {
            fillOpacity: 0.5,
            stroke: 'blue',
            lineWidth: 2
          },
          selected: {
            fill: 'red'
          }
        }
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
    { orient: 'bottom', type: 'band' }
  ]
};