const spec = {
  type: 'bar',
  xField: 'month',
  yField: 'sales',
  width: 300,
  axes: [
    {
      orient: 'left',
      label: {
        autoWrap: true,
        formatter: `++++++++++++++++++_{label}_++++++++++++++++++`
      }
    },
    {
      orient: 'bottom',
      maxHeight: '20%', // Limit maximum height to 20% of chart height
      sampling: false,
      label: {
        formatter: `{label}_{label}`,
        autoWrap: true,
        autoHide: true,
        style: {
          wordBreak: 'break-word',
          lineClamp: 2
        }
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