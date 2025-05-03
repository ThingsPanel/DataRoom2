const spec = {
  type: 'common',
  width: 500,
  height: 500,
  background: 'black',
  theme: {
    colorScheme: {
      default: palette
    }
  },
  data: [
    {
      id: 'pointerData1',
      values: [
        {
          type: 'm',
          value: initM,
          length: 250
        },
        {
          type: 'h',
          value: initH,
          length: 200
        }
      ]
    },
    {
      id: 'pointerData2',
      values: [
        {
          type: 's',
          value: initS,
          length: 300
        }
      ]
    },
    {
      id: 'segmentData',
      values: Array(12)
        .fill(0)
        .map((_, i) => ({
          value: (12 - i) * 5,
          opacity: 0.4
        }))
    },
    {
      id: 'galaxy',
      values: getGalaxyData(initTime)
    }
  ],
  startAngle: -90,
  endAngle: 270,
  color: [palette.lighter, palette.light, palette.dark],
  series: [
    {
      type: 'radar',
      dataIndex: 3,
      valueField: 'value',
      seriesField: 'type',
      categoryField: 'angle',
      outerRadius: 0.8,
      innerRadius: 0,
      point: {
        style: {
          lineWidth: 0,
          size: 10,
          fillOpacity: 0.8
        }
      },
      animation: false
    },
    {
      type: 'gauge',
      dataIndex: 2,
      valueField: 'value',
      seriesField: 'value',
      stack: true,
      outerRadius: 0.78,
      innerRadius: 0.6,
      padAngle: 2.29,
      segment: {
        style: {
          cornerRadius: 4,
          fillOpacity: datum => datum.opacity
        }
      },
      animationAppear: false,
      animationUpdate: {
        segment: [
          {
            channel: ['fillOpacity'],
            duration: 600,
            easing: 'easeInOut'
          }
        ]
      }
    },
    {
      type: 'gaugePointer',
      dataIndex: 0,
      valueField: 'value',
      seriesField: 'type',
      radiusField: 'length',
      pointer: {
        type: 'path',
        width: 0.5
      },
      pin: {
        visible: false
      },
      pinBackground: {
        visible: false
      },
      animationAppear: false,
      animationUpdate: {
        pointer: pointerAnimate
      }
    },
    {
      type: 'gaugePointer',
      dataIndex: 1,
      valueField: 'value',
      seriesField: 'type',
      pointer: {
        type: 'rect',
        width: 0.03,
        height: 0.88,
        center: [0.5, 0.25],
        style: {
          fill: palette.lightest,
          cornerRadius: 100
        }
      },
      pin: {
        width: 0.13,
        height: 0.13,
        style: {
          fill: palette.dark,
          lineWidth: 0,
          fillOpacity: 0.5
        }
      },
      pinBackground: {
        width: 0.16,
        height: 0.16,
        style: {
          fill: palette.darkest
        }
      },
      animationAppear: false,
      animationUpdate: {
        pointer: pointerAnimate
      }
    }
  ],
  axes: [
    {
      visible: true,
      type: 'linear',
      orient: 'angle',
      radius: 0.8,
      min: 0,
      max: 60,
      domain: { visible: true, smooth: false },
      grid: {
        visible: false
      },
      tick: {
        visible: false,
        tickCount: 12
      },
      label: {
        style: {
          fontSize: 24,
          fontFamily: 'Times New Roman',
          fill: palette.axisLabel,
          text: ({ value }) => {
            if (!value) {
              return;
            }
            return ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][value / 5];
          }
        }
      }
    },
    {
      visible: true,
      type: 'linear',
      orient: 'radius',
      min: 0,
      max: 250,
      outerRadius: 0.5,
      innerRadius: 0,
      label: {
        visible: false
      },
      domainLine: {
        visible: false
      },
      grid: {
        style: {
          lineDash: [],
          lineWidth: 18,
          stroke: palette.darkest,
          opacity: 0.65
        }
      },
      tick: {
        visible: false
      }
    }
  ],
  indicator: {
    visible: true,
    fixed: true,
    content: [
      {
        style: {
          fontSize: 18,
          fontFamily: 'Times New Roman',
          text: dateString.split(' ')[0],
          fill: 'white',
          fontWeight: 'bolder'
        }
      },
      {
        style: {
          fontSize: 18,
          fontFamily: 'Times New Roman',
          text: dateString.split(' ')[1],
          fill: 'white',
          fontWeight: 'bolder'
        }
      }
    ]
  },
  tooltip: {
    visible: false
  }
};