const spec = {
  height: 400,
  type: 'bar',
  data: [
    {
      id: 'id0',
      values: [
        { type: '口红', value: 900 },
        { type: '吹风机', value: 613 },
        { type: '化妆刷', value: 329 },
        { type: '洗面仪', value: 500 },
        { type: '手套', value: 400 }
      ]
    }
  ],
  direction: 'horizontal',
  xField: 'value',
  yField: 'type',
  bar: {
    style: {
      fill: '#e8e8e8'
    }
  },
  label: {
    visible: true,
    style: {
      fill: '#000'
    }
  },

  extensionMark: [
    {
      type: 'image',
      dataId: 'id0',
      visible: true,
      zIndex: 10000,
      style: {
        opacity: 0.1,
        x: (datum, ctx, elements, dataView) => {
          return ctx.valueToX([0]);
        },
        y: (datum, ctx, elements, dataView) => {
          return ctx.valueToY([datum.type]);
        },
        width: (datum, ctx, elements, dataView) => {
          const rect = ctx.getRegion().getBoundsInRect();

          return rect.x2 - rect.x1;
        },
        height: (datum, ctx, elements, dataView) => {
          return ctx.yBandwidth();
        },
        image: datum => {
          return icons[datum.type];
        },
        repeatX: 'repeat',
        repeatY: 'repeat'
      }
    },
    {
      type: 'image',
      dataId: 'id0',
      visible: true,
      zIndex: 10000,
      style: {
        x: (datum, ctx, elements, dataView) => {
          return ctx.valueToX([0]);
        },
        y: (datum, ctx, elements, dataView) => {
          return ctx.valueToY([datum.type]);
        },
        width: (datum, ctx, elements, dataView) => {
          return ctx.valueToX([datum.value]);
        },
        height: (datum, ctx, elements, dataView) => {
          return ctx.yBandwidth();
        },
        image: datum => {
          return icons[datum.type];
        },
        repeatX: 'repeat',
        repeatY: 'repeat'
      }
    }
  ],
  axes: [
    {
      orient: 'bottom',
      visible: false
    }
  ]
};