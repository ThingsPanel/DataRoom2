const spec = {
  type: 'bar',
  data: [
    {
      id: 'data',
      values: [
        { company: 'Apple', type: 'Total', value: 30 },
        { company: 'Facebook', type: 'Total', value: 35 },
        { company: 'Google', type: 'Total', value: 28 },
        { company: 'Apple', type: 'Non-technical', value: 40 },
        { company: 'Facebook', type: 'Non-technical', value: 65 },
        { company: 'Google', type: 'Non-technical', value: 47 },
        { company: 'Apple', type: 'Technical', value: 23 },
        { company: 'Facebook', type: 'Technical', value: 18 },
        { company: 'Google', type: 'Technical', value: 20 }
      ]
    }
  ],
  xField: ['type', 'company'],
  yField: 'value',
  seriesField: 'company',
  bar: {
    style: {
      texture: {
        field: 'company',
        scale: 'texture'
      }
    }
  },
  scales: [
    {
      id: 'texture',
      type: 'ordinal',
      domain: [
        {
          dataId: 'data',
          fields: ['company']
        }
      ],
      range: ['bias-lr', 'rect', 'grid']
    }
  ],
  label: {
    visible: true,
    style: {
      fill: '#000'
    }
  }
};