const spec = {
  type: 'bar',
  width: 300,
  height: 200,
  xField: 'month',
  yField: 'sales',
  axes: [
    {
      orient: 'left',
      label: {
        autoLimit: true,
        formatMethod: val => `+++++++++_${val}_+++++++++`
      }
    },
    {
      orient: 'bottom',
      maxHeight: '20%', // Limit maximum height to 20% of chart height
      sampling: false,
      label: {
        autoRotate: true,
        autoLimit: true,
        autoRotateAngle: [0, 90]
      }
    }
  ],
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
  ]
};