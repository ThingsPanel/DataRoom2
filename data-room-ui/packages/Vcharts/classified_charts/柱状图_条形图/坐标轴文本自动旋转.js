const spec = {
  type: 'bar',
  width: 350,
  xField: 'month',
  yField: 'sales',
  axes: [
    {
      orient: 'bottom',
      sampling: false,
      label: {
        autoRotate: true,
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