const spec = {
  type: 'bar',
  width: 835,
  height: 520,
  data: [
    {
      id: 'barData',
      values: [
        { day: 'Monday', sales: 22 },
        { day: 'Tuesday', sales: 13 },
        { day: 'Wednesday', sales: 25 },
        { day: 'Thursday', sales: 29 },
        { day: 'Friday', sales: 38 }
      ]
    }
  ],
  label: {
    visible: true,
    position: 'top',
    interactive: true,
    id: 'label',
    formatMethod: (value, data) => {
      return {
        type: 'rich',
        text: [
          {
            image: iconMap[data.day],
            width: 18,
            height: 18
          },
          {
            text: ` ${data.day}`,
            fontSize: 12,
            underline: true
          },
          {
            text: `: `,
            fontSize: 12
          },
          {
            text: `${value} `,
            fontSize: 14,
            fontStyle: 'italic',
            fill: 'black',
            fontWeight: 'bold'
          }
        ]
      };
    }
  },
  xField: 'day',
  yField: 'sales',
  seriesField: 'day'
};