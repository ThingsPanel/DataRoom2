const spec = {
  type: 'bar',
  data: [
    {
      id: 'bar',
      values: data
    }
  ],
  xField: ['year', 'type'],
  yField: 'value',
  seriesField: 'type',
  bar: {
    state: {
      legend_hover_reverse: {
        fill: '#ccc'
      }
    }
  },
  legends: {
    visible: true
  },
  label: { visible: true, interactive: true, showRelatedMarkTooltip: true },
  tooltip: {
    mark: {
      title: {
        value: (datum, { node }) => (node.type === 'text' ? `Label: ${datum['year']}` : datum['type'])
      },
      content: [
        {
          key: datum => datum['type'],
          value: datum => datum['value']
        },
        {
          hasShape: false,
          key: 'Proportion',
          value: (datum, ...args) => Math.round((datum['value'] / aggregation[datum['year']]) * 10000) / 100 + '%'
        }
      ]
    },
    dimension: {
      title: {
        value: datum => `Y${datum['year']} (mouse scrolling available)`
      },
      content: [
        {
          key: datum => datum['type'],
          value: datum => datum['value']
        },
        {
          hasShape: false,
          key: datum => datum['type'] + ' Proportion',
          value: datum => Math.round((datum['value'] / aggregation[datum['year']]) * 10000) / 100 + '%'
        }
      ]
    },
    enterable: true,
    style: {
      maxContentHeight: 120
    }
  }
};