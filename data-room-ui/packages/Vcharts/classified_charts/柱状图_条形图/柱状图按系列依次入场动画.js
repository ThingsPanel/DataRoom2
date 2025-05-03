const spec = {
  type: 'bar',
  data: {
    values
  },
  xField: ['type', 'country'],
  yField: 'value',
  seriesField: 'country',
  animationAppear: {
    duration: 500, // 每个柱子的动画时长为 500ms
    delay: (datum, element, ctx, params) => {
      const seriesIndex = series.findIndex(s => s === datum.country);
      return seriesIndex * (500 + 50); // 柱子延迟为 500ms（之前柱子的动画时长）+ 50ms（动画间隔时间）
    }
  },
  legends: [{ visible: true, position: 'middle', orient: 'bottom' }],
  axes: [
    {
      orient: 'left',
      label: {
        formatMethod(val) {
          return `${(val * 100).toFixed(2)}%`;
        }
      }
    }
  ]
};