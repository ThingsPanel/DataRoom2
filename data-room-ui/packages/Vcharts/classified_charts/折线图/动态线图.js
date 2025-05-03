const spec = {
  type: 'line',
  data: {
    id: 'id0',
    values: data
  },
  xField: 'name',
  yField: 'value',
  line: {
    style: {
      lineWidth: 2
    }
  },
  point: {
    visible: false
  },
  animationAppear: {
    line: {
      duration
    }
  },
  // FIXME: 字符串改为数字（目前会报错）
  markLine: [
    {
      y: '0', // FIXME: 字符串改为数字（目前会报错）
      line: {
        style: {
          lineDash: [0]
        }
      },
      endSymbol: {
        visible: false
      }
    }
  ],
  axes: [
    {
      orient: 'left',
      type: 'linear',
      visible: true,
      min: -50,
      max: 50,
      grid: {
        style: {
          lineDash: [0]
        }
      },
      label: {
        visible: true
      },
      animation: false
    },
    {
      orient: 'bottom',
      type: 'time',
      animation: true,
      nice: false,
      layers: [
        // 双层轴每层的配置
        {
          timeFormat: '%m-%d '
        },
        {
          timeFormat: '%H:%M'
        }
      ],
      label: {
        visible: true
      }
    }
  ]
};