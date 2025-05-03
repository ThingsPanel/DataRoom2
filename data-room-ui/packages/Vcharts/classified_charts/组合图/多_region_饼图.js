const spec = {
  type: 'common',
  padding: {
    top: 10
  },
  layout: {
    type: 'grid',
    col: 1,
    row: 5,
    elements: [
      {
        modelId: 'legend',
        col: 0,
        row: 4
      },
      {
        modelId: 'DAU',
        col: 0,
        row: 0
      },
      {
        modelId: '新增',
        col: 0,
        row: 1
      },
      {
        modelId: 'MAU',
        col: 0,
        row: 2
      },
      {
        modelId: 'DAU/MAU',
        col: 0,
        row: 3
      }
    ]
  },
  region: [
    {
      id: 'DAU'
    },
    {
      id: '新增'
    },
    {
      id: 'MAU'
    },
    {
      id: 'DAU/MAU'
    }
  ],
  legends: {
    visible: true,
    orient: 'bottom',
    id: 'legend',
    regionId: ['DAU', '新增', 'MAU', 'DAU/MAU'],
    item: {
      visible: true,
      background: {
        style: {
          fill: 'transparent'
        }
      }
    }
  },
  series: [
    {
      id: 'DAUseries0',
      regionId: 'DAU',
      type: 'pie',
      valueField: 'value',
      categoryField: 'type',
      data: {
        id: 'DAU',
        values: [
          {
            type: '首页',
            value: 120
          },
          {
            type: '大屏',
            value: 100
          },
          {
            type: '看板',
            value: 200
          }
        ]
      },
      seriesField: 'type',
      label: {
        style: {
          visible: false
        }
      }
    },
    {
      id: '新增series0',
      regionId: '新增',
      type: 'pie',
      valueField: 'value',
      categoryField: 'type',
      data: {
        id: '新增',
        values: [
          {
            type: '首页',
            value: 80
          },
          {
            type: '大屏',
            value: 200
          },
          {
            type: '看板',
            value: 400
          }
        ]
      },
      seriesField: 'type',
      label: {
        style: {
          visible: false
        }
      }
    },
    {
      id: 'MAUseries0',
      regionId: 'MAU',
      type: 'pie',
      valueField: 'value',
      categoryField: 'type',
      data: {
        id: 'MAU',
        values: [
          {
            type: '首页',
            value: 123
          },
          {
            type: '大屏',
            value: 245
          },
          {
            type: '看板',
            value: 367
          }
        ]
      },
      seriesField: 'type',
      label: {
        style: {
          visible: false
        }
      }
    },
    {
      id: 'DAU/MAUseries0',
      regionId: 'DAU/MAU',
      type: 'pie',
      valueField: 'value',
      categoryField: 'type',
      data: {
        id: 'DAU/MAU',
        values: [
          {
            type: '首页',
            value: 10
          },
          {
            type: '大屏',
            value: 18
          },
          {
            type: '看板',
            value: 8
          }
        ]
      },
      seriesField: 'type',
      label: {
        style: {
          visible: false
        }
      }
    }
  ]
};