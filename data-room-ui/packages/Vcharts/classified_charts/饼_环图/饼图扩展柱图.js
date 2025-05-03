const spec = {
  type: 'pie',
  data: [
    {
      id: 'pieData',
      values: pieData
    },
    ...barData.map((entry, index, arr) => {
      return {
        id: `barData-${index}`,
        values: [entry]
      };
    })
  ],
  name: 'pie',
  outerRadius: 0.5,
  innerRadius: 0.2,
  startAngle: 0,
  endAngle: 360,
  valueField: 'value',
  categoryField: 'type',
  pie: {
    state: {
      hover: {
        outerRadius: 0.85,
        stroke: '#000',
        lineWidth: 1
      },
      selected: {
        outerRadius: 0.85,
        stroke: '#000',
        lineWidth: 1
      }
    }
  },
  title: {
    visible: true,
    text: 'Statistics of Surface Element Content'
  },

  extensionMark: [
    ...barData.map((entry, index) => {
      return {
        type: 'rect',
        id: `bar-${index}`,
        dataId: `barData-${index}`,
        visible: true,
        zIndex: 10000,
        key: 'type',
        state: {
          hover: {
            stroke: '#000'
          }
        },
        style: {
          fill: { field: 'type', scale: 'color' },
          x: (datum, ctx, elements, dataView) => {
            const rect = ctx.getRegion().getBoundsInRect();

            return rect.x2 - rect.x1 - 200;
          },
          width: (datum, ctx, elements, dataView) => {
            return 200;
          },
          y: (datum, ctx, elements, dataView) => {
            const rect = ctx.getRegion().getBoundsInRect();
            const totalHeight = rect.y2 - rect.y1;

            return totalHeight * datum.start;
          },
          height: (datum, ctx, elements, dataView) => {
            const rect = ctx.getRegion().getBoundsInRect();
            const totalHeight = rect.y2 - rect.y1;

            return totalHeight * datum.percent;
          }
        }
      };
    }),
    ...barData.map((entry, index) => {
      return {
        type: 'text',
        id: `text-${index}`,
        dataId: `barData-${index}`,
        visible: true,
        zIndex: 10001,
        key: 'type',
        style: {
          fill: 'white',
          x: (datum, ctx, elements, dataView) => {
            const rect = ctx.getRegion().getBoundsInRect();

            return rect.x2 - rect.x1 - 100;
          },

          y: (datum, ctx, elements, dataView) => {
            const rect = ctx.getRegion().getBoundsInRect();
            const totalHeight = rect.y2 - rect.y1;

            return totalHeight * datum.start + 0.5 * totalHeight * datum.percent;
          },
          text: (datum, ctx, elements, dataView) => {
            return `${datum.type}: ${datum.value} (${(datum.percent * 100).toFixed(2)}%) `;
          }
        }
      };
    }),
    {
      type: 'polygon',
      id: 'polygon',
      visible: true,
      zIndex: -1,
      key: 'type',
      style: {
        fill: 'blue',
        fillOpacity: 0.1,
        points: (datum, ctx, elements, dataView) => {
          const rect = ctx.getRegion().getBoundsInRect();
          return [
            { x: 0, y: 0 },
            { x: 0, y: 0 }
          ];
        }
      }
    }
  ],
  legends: {
    visible: true,
    orient: 'top',
    select: false,
    item: {
      shape: {
        style: {
          symbolType: 'circle',
          texture: datum => datum['texture']
        }
      }
    }
  },
  tooltip: {
    mark: {
      content: [
        {
          key: datum => datum['type'],
          value: datum => datum['value'] + '%'
        }
      ]
    }
  }
};