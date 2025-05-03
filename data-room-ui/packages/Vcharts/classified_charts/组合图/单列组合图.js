const spec = {
  type: 'common',
  layout: {
    type: 'grid',
    col: 2,
    row: 6,
    elements: [
      {
        modelId: 'legend',
        col: 0,
        colSpan: 2,
        row: 5
      },
      {
        modelId: 'Social Penetration',
        col: 1,
        row: 0
      },
      {
        modelId: 'Engagement - Socialization',
        col: 1,
        row: 1
      },
      {
        modelId: 'Penetration of Private Messages',
        col: 1,
        row: 2
      },
      {
        modelId: 'Number of Private Messages per User',
        col: 1,
        row: 3
      },
      {
        modelId: 'Social Penetrationleft',
        col: 0,
        row: 0
      },
      {
        modelId: 'Engagement - Socialization-left',
        col: 0,
        row: 1
      },
      {
        modelId: 'Penetration of Private Messagesleft',
        col: 0,
        row: 2
      },
      {
        modelId: 'Number of Private Messages per Userleft',
        col: 0,
        row: 3
      },
      {
        modelId: 'Number of Private Messages per User-bottom',
        col: 1,
        row: 4
      }
    ]
  },
  region: [
    {
      id: 'Social Penetration',
      style: {
        ...regionStyle,
        strokeTop: false
      }
    },
    {
      id: 'Engagement - Socialization',
      style: regionStyle
    },
    {
      id: 'Penetration of Private Messages',
      style: regionStyle
    },
    {
      id: 'Number of Private Messages per User',
      style: regionStyle
    }
  ],
  legends: {
    padding: {
      top: 10
    },
    visible: true,
    orient: 'bottom',
    id: 'legend',
    regionId: [
      'Social Penetration',
      'Engagement - Socialization',
      'Penetration of Private Messages',
      'Number of Private Messages per User'
    ]
  },
  seriesField: 'type',
  tooltip: {
    dimension: {
      title: {
        value: datum => {
          return `第 ${datum.x} 天`;
        }
      },
      content: [
        {
          key: datum => datum.type,
          value: datum => datum.y
        }
      ]
    }
  },
  series: [
    {
      id: 'Social Penetrationseries0',
      regionId: 'Social Penetration',
      type: 'line',
      data: { id: 'Social Penetration' },
      xField: 'x',
      yField: 'y'
    },
    {
      id: 'Engagement - Socialization-series0',
      regionId: 'Engagement - Socialization',
      type: 'line',
      data: { id: 'Engagement - Socialization' },
      xField: 'x',
      yField: 'y'
    },
    {
      id: 'Penetration of Private Messagesseries0',
      regionId: 'Penetration of Private Messages',
      type: 'line',
      data: { id: 'Penetration of Private Messages' },
      xField: 'x',
      yField: 'y'
    },
    {
      id: 'Number of Private Messages per Userseries0',
      regionId: 'Number of Private Messages per User',
      type: 'line',
      data: { id: 'Number of Private Messages per User' },
      xField: 'x',
      yField: 'y'
    }
  ],
  axes: [
    {
      id: 'Social Penetrationleft',
      regionId: 'Social Penetration',
      orient: 'left',
      title: { visible: true, text: 'SP' },
      ...leftAxesCommonSpec
    },
    {
      id: 'Engagement - Socialization-left',
      regionId: 'Engagement - Socialization',
      orient: 'left',
      title: { visible: true, text: 'ES' },
      ...leftAxesCommonSpec
    },
    {
      id: 'Penetration of Private Messagesleft',
      regionId: 'Penetration of Private Messages',
      orient: 'left',
      title: { visible: true, text: 'Penetration of PM' },
      ...leftAxesCommonSpec
    },
    {
      id: 'Number of Private Messages per Userleft',
      regionId: 'Number of Private Messages per User',
      orient: 'left',
      title: { visible: true, text: 'PM per User' },
      ...leftAxesCommonSpec
    },
    {
      id: 'Number of Private Messages per User-bottom',
      regionId: [
        'Social Penetration',
        'Engagement - Socialization',
        'Penetration of Private Messages',
        'Number of Private Messages per User'
      ],
      orient: 'bottom',
      label: {
        firstVisible: true,
        lastVisible: true,
        visible: true
      },
      tick: { visible: false },
      paddingInner: 0.99,
      paddingOuter: 0
    }
  ]
};