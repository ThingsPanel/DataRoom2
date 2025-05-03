const spec = {
  type: 'common',
  data: [
    {
      id: 'id0',
      values: [
        { type: '飞机', value: 900 },
        { type: '火车', value: 150 },
        { type: '公交车', value: 70 },
        { type: '轮船', value: 27 },
        { type: '出租车', value: 40 },
        { type: '自行车', value: 25 },
        { type: '跑步', value: 5 }
      ]
    }
  ],
  axes: [
    {
      orient: 'left',
      label: {
        visible: false
      }
    },
    {
      orient: 'bottom'
    }
  ],

  series: [
    {
      type: 'bar',
      seriesField: 'type',
      bar: {
        style: { fillOpacity: 0.5 },
        customShape: (data, attrs, path) => {
          const width = attrs.width;
          const deltaY = attrs.height == null ? attrs.y1 - attrs.y : attrs.height;

          path.moveTo(0, deltaY);
          path.quadraticCurveTo(0.45 * width, 0.67 * deltaY, 0.5 * width, 0);
          path.quadraticCurveTo(0.55 * width, 0.67 * deltaY, width, deltaY);
          path.lineTo(0, deltaY);
          path.closePath();
          return path;
        }
      },
      xField: 'type',
      yField: 'value'
    },
    {
      type: 'scatter',
      seriesField: 'type',
      point: {
        style: {
          opacity: 0.5,
          size: 30,
          dy: -40,
          dx: -15,
          stroke: { scale: 'color', field: 'type' },
          symbolType: datum => {
            return images[datum.type];
          }
        }
      },
      xField: 'type',
      yField: 'value'
    }
  ]
};