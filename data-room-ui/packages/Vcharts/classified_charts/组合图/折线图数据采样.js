const spec = {
  type: 'common',
  // seriesField: 'color',
  data: [
    {
      id: 'id0',
      values: data
    },
    {
      id: 'id1',
      values: data
    },
    {
      id: 'id2',
      values: data
    }
  ],
  series: [
    {
      type: 'line',
      id: 'no sampling',
      dataIndex: 0,
      xField: 'x',
      yField: 'y',
      point: {
        style: {
          fill: '#1664FF'
        }
      },
      line: {
        style: {
          stroke: '#1664FF'
        }
      }
    },
    {
      type: 'line',
      id: 'lttb sampling',
      dataIndex: 1,
      xField: 'x',
      yField: 'y',
      sampling: 'lttb',
      samplingFactor: 0.1,
      point: {
        style: {
          fill: '#FF8A00'
        }
      },
      line: {
        style: {
          stroke: '#FF8A00'
        }
      }
    },
    {
      type: 'line',
      id: 'average sampling',
      dataIndex: 2,
      xField: 'x',
      yField: 'y',
      sampling: 'average',
      samplingFactor: 0.1,
      point: {
        style: {
          fill: '#FFC400'
        }
      },
      line: {
        style: {
          stroke: '#FFC400'
        }
      }
    }
  ],
  axes: [
    { orient: 'left', seriesIndex: [0, 1, 2, 3, 4, 5] },
    // { orient: 'right', seriesId: ['line'], grid: { visible: false } },
    { orient: 'bottom', label: { visible: true }, type: 'band' }
  ],
  legends: {
    visible: true,
    orient: 'bottom'
  }
};