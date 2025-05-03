const spec = {
  type: 'common',
  height: 300,
  data,
  outerRadius: 0.6,
  innerRadius: 0.2,
  color: ['#2F86FE', '#FE7B1B', '#E90D31'],
  series,
  axes,
  region,
  legends: {
    orient: 'top',
    padding: 0
  },
  customMark: [
    {
      type: 'text',
      dataId: 'date',
      style: {
        text: datum => datum.value,
        x: (datum, ctx) => {
          const region = ctx.vchart.getChart().getRegionsInIndex([datum.value - 1])[0];
          return region.getLayoutStartPoint().x + region.getLayoutRect().width / 2;
        },
        y: () => 84,
        fontWeight: 'bolder',
        fill: 'black'
      }
    }
  ],
  title: {
    visible: true,
    text: 'Weekly Activities',
    padding: 0
  }
};