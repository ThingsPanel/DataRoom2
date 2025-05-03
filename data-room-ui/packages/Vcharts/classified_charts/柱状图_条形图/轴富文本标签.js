const spec = {
  type: 'bar',
  height: 300,
  data: [
    {
      id: 'barData',
      values: [
        { name: 'Top 1', value: 990 },
        { name: 'Top 2', value: 680 },
        { name: 'Top 3', value: 255 }
      ]
    }
  ],
  barWidth: 20,
  yField: 'name',
  xField: 'value',
  bar: {
    style: {
      cornerRadius: [0, 10, 10, 0],
      fill: {
        gradient: 'linear',
        x0: 0,
        y0: 0.5,
        x1: 1,
        y1: 0.5,
        stops: [
          { offset: 0, color: 'rgb(255,163,1)' },
          { offset: 1, color: 'rgb(255,4,0)' }
        ]
      }
    }
  },
  barBackground: {
    visible: true
  },
  label: {
    visible: true,
    position: 'center',
    style: {
      fill: 'white',
      stroke: false
    }
  },
  direction: 'horizontal',
  seriesField: 'type',
  padding: { left: 50 },
  axes: [
    {
      orient: 'left',
      minWidth: 50,
      label: {
        formatMethod: label => {
          return {
            type: 'rich',
            text: [
              { image: rankIcon[label], width: 40, height: 40 },
              {
                text: `${label}`,
                fontSize: 16,
                fontWeight: 'bold',
                fontStyle: 'italic'
              }
            ]
          };
        }
      }
    }
  ]
};