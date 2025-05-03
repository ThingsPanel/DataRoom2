const spec = {
  type: 'common',
  region: [
    {
      roam: true,
      coordinate: 'geo',
      longitudeField: 'lng',
      latitudeField: 'lat',
      projection: {
        type: 'equirectangular'
      }
    }
  ],
  title: {
    text: '全球地震数据等级可视化'
  },
  background: 'rgb(240, 248, 255)',
  data: [{ values: earthquakeData.values }],
  series: [
    { type: 'map', map: 'world', tooltip: { visible: false }, defaultFillColor: 'rgb(245,255,250)' },
    {
      type: 'scatter',
      xField: 'time',
      yField: 'level',
      point: {
        style: {
          size: datum => {
            return datum.level > 7 ? +datum.level * 2 : +datum.level;
          },
          fill: 'red',
          fillOpacity: 0.2
        }
      }
    }
  ]
};