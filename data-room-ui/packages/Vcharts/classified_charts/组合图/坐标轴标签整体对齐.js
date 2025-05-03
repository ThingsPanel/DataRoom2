const spec = {
  type: 'common',
  series: [
    {
      id: 'mainSeries',
      type: 'bar',
      direction: 'horizontal',
      yField: 'type',
      xField: 'value',
      regionId: 'mainRegion',
      seriesField: 'category',
      data: {
        id: 'mainSeriesData',
        values: [
          {
            value: '19173',
            category: 'count',
            type: 'consumer'
          },
          {
            value: '11581',
            category: 'count',
            type: 'company'
          },
          {
            value: '6780',
            category: 'count',
            type: 'small company'
          }
        ],
        fields: {
          value: {
            alias: 'Index value (principal axis)'
          },
          category: {
            alias: 'legend item',
            domain: ['count', 'profit']
          },
          type: {
            alias: 'detail',
            domain: ['company', 'consumer', 'small company']
          }
        }
      }
    },
    {
      id: 'subSeries',
      type: 'bar',
      direction: 'horizontal',
      yField: 'type',
      xField: 'value',
      regionId: 'subRegion',
      seriesField: 'category',
      data: {
        id: 'subSeriesData',
        values: [
          {
            value: '1053092.6314019188',
            category: 'profit',
            type: 'consumer'
          },
          {
            value: '681967.6347733513',
            category: 'profit',
            type: 'company'
          },
          {
            value: '412478.6609529555',
            category: 'profit',
            type: 'small company'
          }
        ],
        fields: {
          value: {
            alias: 'Indicator value (secondary axis)'
          },
          category: {
            alias: 'legend item',
            domain: ['count', 'profit']
          },
          type: {
            alias: 'detail',
            domain: ['company', 'consumer', 'small company']
          }
        }
      }
    }
  ],
  region: [
    {
      id: 'mainRegion'
    },
    {
      id: 'subRegion'
    }
  ],
  layout: {
    type: 'grid',
    row: 2,
    col: 4,
    elements: [
      {
        modelId: 'legend',
        col: 0,
        row: 0,
        rowSpan: 2
      },
      {
        modelId: 'mainRegion',
        col: 1,
        row: 0
      },
      {
        modelId: 'dimensionAxis',
        col: 2,
        row: 0
      },
      {
        modelId: 'subRegion',
        col: 3,
        row: 0
      },
      {
        modelId: 'measureAxisLeft',
        col: 1,
        row: 1
      },
      {
        modelId: 'measureAxisRight',
        col: 3,
        row: 1
      }
    ]
  },
  axes: [
    {
      id: 'dimensionAxis',
      type: 'band',
      orient: 'left',
      label: {
        flush: true,
        containerAlign: 'center',
        space: 0
      },
      hover: true,
      background: {
        visible: true,
        state: {
          hover: {
            fillOpacity: 0.08,
            fill: '#141414'
          },
          hover_reverse: {
            fillOpacity: 0.08,
            fill: '#141414'
          }
        }
      },
      minWidth: 150, // Configure minimum width
      maxWidth: 500,
      regionId: ['mainRegion', 'subRegion'],
      seriesId: ['mainSeries', 'subSeries']
    },
    {
      id: 'measureAxisLeft',
      type: 'linear',
      orient: 'bottom',
      regionId: 'mainRegion',
      seriesId: 'mainSeries',
      inverse: true,
      label: {
        flush: true
      }
    },
    {
      id: 'measureAxisRight',
      type: 'linear',
      orient: 'bottom',
      regionId: 'subRegion',
      seriesId: 'subSeries',
      label: {
        flush: true
      }
    }
  ],
  seriesField: 'category',
  legends: [
    {
      visible: true,
      id: 'legend',
      orient: 'left',
      position: 'middle'
    }
  ]
};