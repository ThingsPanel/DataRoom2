const spec = {
  type: 'circularProgress',
  data: [
    {
      id: 'id0',
      values: [
        {
          type: 'Tradition Industries',
          value: 0.795,
          text: '79.5%'
        },
        {
          type: 'Business Companies',
          value: 0.25,
          text: '25%'
        },
        {
          type: 'Customer-facing Companies',
          value: 0.065,
          text: '6.5%'
        }
      ]
    }
  ],
  valueField: 'value',
  categoryField: 'type',
  seriesField: 'type',
  radius: 0.8,
  innerRadius: 0.5,
  roundCap: true,
  cornerRadius: 20,
  progress: {
    style: {
      innerPadding: 5,
      outerPadding: 5
    }
  },
  axes: [
    {
      visible: false,
      type: 'linear',
      orient: 'angle'
    },
    {
      visible: false,
      type: 'band',
      orient: 'radius'
    }
  ],
  indicator: {
    visible: true,
    trigger: 'hover',
    title: {
      visible: true,
      field: 'type',
      autoLimit: true,
      style: {
        fontSize: 20,
        fill: 'black'
      }
    },
    content: [
      {
        visible: true,
        field: 'text',
        style: {
          fontSize: 16,
          fill: 'gray'
        }
      }
    ]
  },
  legends: {
    visible: true,
    orient: 'right',
    title: {
      visible: false
    }
  }
};