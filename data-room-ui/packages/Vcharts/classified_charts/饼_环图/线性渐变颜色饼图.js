const spec = {
  type: 'pie',
  data: [
    {
      id: 'id0',
      values: pieData
    }
  ],
  outerRadius: 0.8,
  innerRadius: 0.5,
  padAngle: 0.6,
  valueField: 'value',
  categoryField: 'type',
  color: {
    id: 'color',
    type: 'linear',
    range: ['#1664FF', '#B2CFFF', '#1AC6FF', '#94EFFF'],
    domain: [
      {
        dataId: 'id0',
        fields: ['value']
      }
    ]
  },
  pie: {
    style: {
      cornerRadius: 10,
      fill: {
        scale: 'color',
        field: 'value'
      }
    }
  },
  legends: {
    visible: true,
    orient: 'left',
    data: (data, scale) => {
      return data.map(datum => {
        const pickDatum = pieData.find(pieDatum => pieDatum.type === datum.label);

        datum.shape.fill = scale?.scale?.(pickDatum?.value);
        return datum;
      });
    }
  },
  label: {
    visible: true
  }
};