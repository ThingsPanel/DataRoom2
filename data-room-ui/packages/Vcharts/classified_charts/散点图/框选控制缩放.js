const spec = {
  type: 'scatter',
  data: {
    values: scatterData
  },
  xField: 'GDP',
  yField: 'LifeExpectancy',
  seriesField: 'continent',
  sizeField: 'Population',
  size: d => logScale(d.Population, [0, Math.max(...scatterData.map(d => d.Population))], [1, 40]),
  legends: [
    {
      visible: true,
      orient: 'bottom',
      position: 'middle'
    }
  ],
  axes: [
    {
      type: 'linear',
      orient: 'left',
      id: 'yAxis', // for dataZoom related axis
      // for align range with dataZoom
      max: maxRange, 
      min: minRange,
      zero: false,
      nice: false
    },
    {
      type: 'linear',
      orient: 'bottom',
      // for align range with dataZoom
      zero: false,
      nice: false,
      max: 50000,
      min: 0
    }
  ],
  dataZoom: [
    {
      filterMode: 'axis',
      orient: 'bottom',
      customDomain: [0, 50000]
    },
    {
      filterMode: 'axis',
      orient: 'right',
      axisId: 'yAxis',
      customDomain: [minRange, maxRange]
    }
  ],
  brush: {
    visible: true,
    brushType: 'rect',
    inBrush: {
      colorAlpha: 1
    },
    outOfBrush: {
      colorAlpha: 0.2
    },
    // 开启后默认关联所有axis/dataZoom
    zoomAfterBrush: true
  },
  tooltip: {
    dimension: {
      visible: true
    },
    mark: {
      title: true,
      content: [
        {
          key: d => d.name,
          value: d => d.y
        }
      ]
    }
  },
};