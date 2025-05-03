const spec = {
  type: 'bar',
  padding: {
    top: 12,
    right: 100,
    bottom: 12
  },
  data: dataSpecs[0].data,
  direction: 'horizontal',
  yField: 'country',
  xField: 'value',
  seriesField: 'country',
  bar: {
    style: {
      fill: datum => datum.fill
    }
  },
  axes: [
    {
      animation: true,
      orient: 'bottom',
      type: 'linear',
      visible: true,
      max: 50,
      grid: {
        visible: true
      }
    },
    {
      animation: true,
      id: 'axis-left',
      orient: 'left',
      width: 130,
      tick: { visible: false },
      label: { visible: true },
      type: 'band'
    }
  ],
  title: {
    visible: true,
    text: 'Top 10 Olympic Gold Medals by Country Since 2000'
  },
  animationUpdate: {
    bar: [
      {
        type: 'update',
        options: { excludeChannels: ['y'] },
        easing: 'linear',
        duration
      },
      {
        channel: ['y'],
        easing: 'circInOut',
        duration: exchangeDuration
      }
    ],
    axis: {
      duration: exchangeDuration,
      easing: 'circInOut'
    }
  },
  animationEnter: {
    bar: [
      {
        type: 'moveIn',
        duration: exchangeDuration,
        easing: 'circInOut',
        options: {
          direction: 'y',
          orient: 'negative'
        }
      }
    ]
  },
  animationExit: {
    bar: [
      {
        type: 'fadeOut',
        duration: exchangeDuration
      }
    ]
  },
  customMark: [
    {
      type: 'text',
      dataId: 'year',
      style: {
        textBaseline: 'bottom',
        fontSize: 200,
        textAlign: 'right',
        fontFamily: 'PingFang SC',
        fontWeight: 600,
        text: datum => datum.year,
        x: (datum, ctx) => {
          return ctx.vchart.getChart().getCanvasRect()?.width - 50;
        },
        y: (datum, ctx) => {
          return ctx.vchart.getChart().getCanvasRect()?.height - 50;
        },
        fill: 'grey',
        fillOpacity: 0.5
      }
    }
  ],
  player: {
    type: 'continuous',
    orient: 'bottom',
    auto: true,
    loop: true,
    dx: 80,
    position: 'middle',
    interval: duration,
    specs: dataSpecs,
    slider: {
      railStyle: {
        height: 6
      }
    },
    controller: {
      backward: {
        style: {
          size: 12
        }
      },
      forward: {
        style: {
          size: 12
        }
      },
      start: {
        order: 1,
        position: 'end'
      }
    }
  }
};