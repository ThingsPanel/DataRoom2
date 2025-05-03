const spec = {
  type: 'pie',
  data: [
    {
      id: 'id0',
      values: [
        { type: 'This is a long Auto-Ellipsis Category Text for Category1', value: 24 },
        { type: 'Category2', value: 20 },
        { type: 'Category3', value: 18 },
        { type: 'Category4', value: 18 },
        { type: 'Category5', value: 16 },
        {
          type: 'This is a long Auto-Ellipsis Category Text for Category6. This is a long Auto-Ellipsis Category Text for Category6',
          value: 14
        }
      ]
    }
  ],
  outerRadius: 0.8,
  innerRadius: 0.5,
  padAngle: 0.6,
  valueField: 'value',
  categoryField: 'type',
  pie: {
    style: {
      cornerRadius: 10
    },
    state: {
      hover: {
        outerRadius: 0.85,
        stroke: '#000',
        lineWidth: 1
      },
      selected: {
        outerRadius: 0.85,
        stroke: '#000',
        lineWidth: 1
      }
    }
  },
  legends: {
    visible: true
  },
  label: {
    visible: true,
    formatMethod: (label, data) => {
      return {
        type: 'rich',
        text: [
          {
            text: `${data.value}%\n`,
            fill: 'rgba(0, 0, 0, 0.92)',
            fontSize: 16,
            fontWeight: 500,
            stroke: false
          },
          {
            text: data.type,
            fill: 'rgba(0, 0, 0, 0.55)',
            fontSize: 12,
            fontWeight: 400,
            stroke: false
          }
        ]
      };
    },
    style: {
      disableAutoWrapLine: true
    }
  },
  tooltip: {
    mark: {
      content: [
        {
          key: datum => datum['type'],
          value: datum => datum['value'] + '%'
        }
      ]
    }
  }
};