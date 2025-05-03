const spec = {
  color: [
    '#33ADFF',
    '#FFCF33',
    '#FFA763',
    '#9F97FF',
    '#FF97BC'
  ],
  type: 'common',
  series: [{
    id: 'area1',
    type: 'area',
    dataId: 'areaData1',
    xField: 'time',
    yField: 'value',
    point: {
      visible: false
    },
    area: {
      style: {
        fillOpacity: 0.2,
        lineWidth: 1
      }
    },
    name: '成交订单数'
  }, {
    id: 'area2',
    type: 'area',
    dataId: 'areaData2',
    xField: 'time',
    yField: 'value',
    point: {
      visible: false
    },
    area: {
      style: {
        fillOpacity: 0.2,
        lineWidth: 1
      }
    },
    name: '成交金额'
  }],
  axes: [{
    orient: 'left',
    seriesId: 'area1'
  },{
    orient: 'right',
    seriesId: 'area2'
  },{
    orient: 'bottom',
    type: 'band',
    seriesId: ['area1', 'area2']
  }],
  dataZoom: [
    {
      orient: 'bottom',
      start: 0.95,
      end: 1,
      maxSpan: 0.05,
      tolerance: 4,
      selectedBackgroundChart: {
        area: {
          visible: false,
          style: {
            visible: false
          }
        },
        line: {
          visible: false,
          style: {
            visible: false
          }
        }
      }
    }
  ],
  data: [
    {
      id: 'areaData1',
      values: dataOrder
    },
    {
      id: 'areaData2',
      values: dataProfit
    }
  ]
};