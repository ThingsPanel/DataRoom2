const spec = {
  type: 'scatter',
  data: { values: data },
  xField: 'GDP',
  yField: 'LifeExpectancy',
  zField: 'continent',
  seriesField: 'continent',
  // size
  sizeField: 'Population',
  size: {
    type: 'ordinal',
    range: [10, 15, 30]
  },
  // point
  point: {
    state: {
      hover: {
        fill: 'red'
      }
    },
    style: {}
  },
  axes: [
    { orient: 'right', mode: '3d', range: { min: 0 }, type: 'linear', grid: { visible: true } },
    { orient: 'bottom', mode: '3d', label: { visible: true }, type: 'linear', grid: { visible: true } },
    {
      orient: 'z',
      mode: '3d',
      label: { visible: true },
      type: 'band',
      grid: { visible: true },
      width: 300,
      height: 200,
      depth: 200
    }
  ],
  legends: [
    {
      visible: true,
      orient: 'left',
      position: 'start',
      title: {
        visible: true,
        style: {
          text: 'title'
        }
      },
      item: {
        visible: true
      }
    }
  ],
  direction: 'horizontal'
};