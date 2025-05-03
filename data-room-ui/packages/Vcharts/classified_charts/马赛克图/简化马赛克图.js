const spec = {
  type: 'mosaic',
  data: [
    {
      id: 'barData',
      values: [
        { month: 'Monday', sales: 22 },
        { month: 'Tuesday', sales: 13 },
        { month: 'Wednesday', sales: 25 },
        { month: 'Thursday', sales: 29 },
        { month: 'Friday', sales: 38 }
      ]
    }
  ],
  xField: 'month',
  yField: 'sales',
  label: [
    {
      visible: true,
      position: 'bottom',
      style: {
        fill: '#333'
      },
      overlap: false,
      formatMethod: (value, datum, ctx) => {
        return datum['month'];
      }
    },
    {
      visible: true,
      position: 'top',
      style: {
        fill: '#333'
      },
      overlap: false,
      formatMethod: (value, datum, ctx) => {
        return datum['sales'];
      }
    }
  ],
  axes: [
    {
      orient: 'bottom',
      label: {
        visible: false
      }
    }
  ]
};