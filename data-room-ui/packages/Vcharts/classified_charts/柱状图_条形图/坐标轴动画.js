const spec = {
  height: 500,
  width: 800,
  type: 'bar',
  padding: {
    top: 12,
    right: 100,
    bottom: 12,
    left: 100
  },
  data: [
    {
      id: 'data0',
      values: []
    }
  ],
  direction: 'horizontal',
  yField: 'country',
  xField: 'max',
  axes: [
    {
      animation: true,
      orient: 'bottom',
      type: 'linear',
      visible: true,
      grid: {
        visible: true
      }
    },
    {
      animation: true,
      id: 'axis-left',
      orient: 'left',
      tick: { visible: false },
      label: { visible: true },
      type: 'band',
      grid: {
        visible: true
      }
    }
  ],
  animationAppear: {
    bar: {
      type: 'growWidthIn',
      duration
    },
    axis: {
      duration,
      easing: 'linear'
    }
  },
  animationUpdate: {
    bar: {
      duration,
      easing: 'linear'
    },
    axis: {
      duration: duration * 0.8,
      easing: 'linear'
    }
  },
  bar: {
    style: {
      texture: 'circle',
      texturePadding: 1,
      textureSize: 5,
      textureColor: 'red'
    }
  }
};