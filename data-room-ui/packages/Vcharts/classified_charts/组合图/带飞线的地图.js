const spec = {
  type: 'common',
  region: [
    {
      roam: false,
      coordinate: 'geo',
      longitudeField: 'lng',
      latitudeField: 'lat',
      projection: {
        type: 'equirectangular'
      }
    }
  ],
  background: 'rgb(240, 248, 255)',
  data: [{ values: earthquakeData.values }],
  series: [
    {
      type: 'map',
      map: 'world',
      tooltip: { visible: false },
      defaultFillColor: 'rgb(245,255,250)'
    },
    {
      type: 'scatter',
      xField: 'time',
      yField: 'addr',
      point: {
        style: {
          size: datum => Number(datum.depth),
          fill: 'green'
        }
      },
      label: {
        visible: true,
        position: 'right',
        style: {
          fill: '#333',
          fontWeight: 'bold'
        }
      }
    },
    {
      type: 'line',
      seriesField: 'type',
      line: { style: { stroke: 'green' } },
      point: { visible: false },
      data: {
        values: [
          ...earthquakeData.values.map((value, index) => ({
            ...value,
            type: index
          })),
          ...earthquakeData.values.map((_, index) => ({
            ...center,
            type: index
          }))
        ]
      }
    }
  ]
};