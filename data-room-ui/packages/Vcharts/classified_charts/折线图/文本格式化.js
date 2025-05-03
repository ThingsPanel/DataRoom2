const spec = {
  type: 'line',
  legends: {
    item: {
      label: {
        formatter: `Type-{label}`
      }
    }
  },
  data: [{ id: 'lineData', values: data }],
  xField: 'time',
  yField: 'count',
  seriesField: 'type',
  axes: [
    {
      orient: 'bottom',
      type: 'time',
      layers: [
        {
          timeFormat: `%Y-%m-%d`
        }
      ]
    },
    {
      orient: 'left',
      label: {
        formatter: `{label:~s}`
      }
    }
  ],
  crosshair: {
    xField: {
      visible: true,
      defaultSelect: {
        axisIndex: 0,
        datum: base
      },
      label: {
        visible: true,
        formatter: `{label:%d-%m-%Y}`
      }
    },
    yField: {
      visible: true,
      defaultSelect: {
        axisIndex: 1,
        datum: 4321
      },
      line: {
        style: {
          lineWidth: 1,
          opacity: 1,
          stroke: '#000',
          lineDash: [2, 2]
        }
      },
      label: {
        visible: true,
        formatter: `{label:.2s}`
      }
    }
  },

  tooltip: {
    dimension: {
      title: {
        valueFormatter: `{time:%Y-%m-%d}`
      },
      content: [
        {
          keyFormatter: `{time:%B %d,%Y}`,
          valueFormatter: `{count:~s}`
        }
      ]
    }
  },
  dataZoom: [
    {
      orient: 'bottom',
      startText: { formatter: 'StartTime: {label:%Y-%m-%d}' },
      endText: { formatter: 'EndTime: {label:%Y-%m-%d}' }
    }
  ],
  label: {
    visible: true,
    formatter: `{count:,.2z}`,
    offset: 8,
    line: { visible: true },
    overlap: {
      strategy: [
        {
          type: 'position',
          position: ['left', 'bottom', 'top-right']
        }
      ]
    }
  }
};