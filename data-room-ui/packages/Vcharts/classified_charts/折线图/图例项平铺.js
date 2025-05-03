const spec = {
  type: 'line',
  data: [
    {
      id: 'line',
      values: data
    }
  ],
  xField: 'date',
  yField: 'value',
  seriesField: 'type',
  color: ['#1890ff', '#2fc25b'],
  point: {
    style: {
      size: 0,
      lineWidth: 1,
      stroke: '#fff'
    },
    state: {
      dimension_hover: {
        size: 8,
        lineWidth: 1,
        stroke: '#fff'
      }
    }
  },
  line: {
    style: {
      lineWidth: 2
    }
  },
  axes: [
    { orient: 'bottom' },
    {
      orient: 'left',
      domainLine: { visible: false },
      tick: { visible: false, tickCount: 5 },
      grid: {
        style: {
          lineDash: [0]
        }
      }
    }
  ],
  legends: {
    orient: 'bottom',
    title: {
      visible: true,
      text: 'Total',
      align: 'end',
      space: 4,
      textStyle: {
        fill: '#1890ff',
        fontSize: 14
      }
    },
    autoPage: false, // disable auto page
    item: {
      width: '100%', // The width of the legend item fills the display area
      shape: {
        style: {
          size: 14,
          symbolType:
            'M 4.08 0.62 H 2.55 c -0.23 1.14 -1.23 2 -2.43 2 S -2.09 1.76 -2.32 0.62 H -3.86 c -0.27 0 -0.5 -0.22 -0.5 -0.5 c 0 -0.28 0.22 -0.5 0.5 -0.5 H -2.32 c 0.23 -1.14 1.23 -2 2.43 -2 s 2.2 0.86 2.43 2 H 4.08 c 0.27 0 0.5 0.22 0.5 0.5 c 0 0.28 -0.22 0.5 -0.5 0.5 z M 0.11 -1.38 c -0.82 0 -1.49 0.67 -1.49 1.5 s 0.67 1.5 1.49 1.5 S 1.6 0.95 1.6 0.12 s -0.67 -1.5 -1.49 -1.5 z'
        }
      },
      value: {
        alignRight: true, // value is displayed on the left
        style: {
          fill: '#333'
        },
        state: {
          unselected: {
            fill: '#d8d8d8'
          }
        }
      }
    },
    // If you need the legend item to display value, you need to use the data attribute to customize the content of the legend item
    data: items => {
      return items.map((item, index) => {
        item.value = index === 0 ? '20,000' : '7,000';
        return item;
      });
    }
  },
  crosshair: {
    xField: { visible: true, line: { type: 'line' } }
  }
};