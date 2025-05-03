const spec = {
  type: 'gauge',
  data: [
    {
      id: 'pointer',
      values: [
        {
          type: 'A',
          value: 0.6
        }
      ]
    },
    {
      id: 'segment',
      values: [
        {
          type: 'Level 1',
          color: '#07A35A',
          value: 0.3
        },
        {
          type: 'Level 2',
          color: '#FFC528',
          value: 0.5
        },
        {
          type: 'Level 3',
          color: '#E33232',
          value: 1
        }
      ]
    }
  ],
  gauge: {
    type: 'gauge',
    dataIndex: gaugeDataIndex,
    categoryField: 'type',
    valueField,
    seriesField: 'type',
    segment: {
      style: {
        fill: datum => datum['color']
      }
    },
    label: {
      visible: true,
      position: 'inside-outer',
      offsetRadius: 15,
      style: {
        text: datum => datum['type']
      }
    }
  },
  pointer: {
    style: {
      fill: '#666666'
    }
  },
  categoryField: 'type',
  valueField: 'value',
  outerRadius,
  innerRadius,
  startAngle,
  endAngle,
  axes: [{ type: 'linear', orient: 'angle', label: { visible: false } }],
  extensionMark: [
    // 添加区间 tick
    ...getTicks({
      stroke: 'blue',
      lineWidth: 2
    }),
    // 添加区间 tick 标签
    ...getLabels({}),
    // 添加目标值高亮组
    ...getTargetMarks(
      0.38,
      {
        stroke: 'red',
        lineWidth: 2
      },
      {
        fill: 'white',
        fontSize: 14
      },
      {
        fill: 'orange',
        cornerRadius: 3
      }
    )
  ]
};