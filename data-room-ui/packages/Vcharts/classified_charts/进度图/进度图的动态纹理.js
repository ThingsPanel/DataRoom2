const spec = {
  background: 'black',
  type: 'linearProgress',
  data: [
    {
      id: 'id0',
      values: [
        {
          type: 'Tradition Industries',
          value: 0.795,
          text: '79.5%'
        },
        {
          type: 'Business Companies',
          value: 0.25,
          text: '25%'
        },
        {
          type: 'Customer-facing Companies',
          value: 0.065,
          text: '6.5%'
        }
      ]
    }
  ],
  direction: 'horizontal',
  xField: 'value',
  yField: 'type',
  seriesField: 'type',
  track: {
    style: {
      opacity: 0.3
    }
  },
  progress: {
    topPadding: 2,
    bottomPadding: 2,
    style: {
      texture: path,
      textureSize: 30,
      texturePadding: 0,
      textureRatio: 1,
      textureColor: 'orange',
      textureOptions: datum => {
        return {
          // useNewCanvas: true,
          beforeDynamicTexture: (ctx, row, column, rowCount, columnCount, ratio, graphic) => {
            const dx = ratio - 0.5;
            const size = 30;
            ctx.translate(dx * size, 0);
          },
          dynamicTexture: (ctx, row, column, rowCount, columnCount, ratio, graphic) => {
            const dx = ratio - 0.5;
            const size = 30;
            ctx.translate(-dx * size, 0);
            ctx.fillStyle = 'white';
            ctx.globalAlpha = 0.6;
            ctx.fill();
          }
        };
      }
    }
  },
  animationAppear: {
    progress: {
      channel: {
        textureRatio: {
          from: 0,
          to: 1
        }
      },
      easing: 'linear',
      duration: 3000,
      loop: true
    }
  },
  cornerRadius: 20,
  bandWidth: 20,
  axes: [
    {
      orient: 'left',
      label: { visible: false },
      type: 'band',
      domainLine: { visible: false },
      tick: { visible: false }
    },
    { orient: 'bottom', label: { visible: true }, type: 'linear', visible: false }
  ]
};