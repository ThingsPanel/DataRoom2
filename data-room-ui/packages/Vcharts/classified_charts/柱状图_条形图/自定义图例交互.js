const spec = {
  type: 'bar',
  data: [
    {
      id: 'bar',
      values: [
        { year: '2012', type: 'Forest', value: 320 },
        { year: '2012', type: 'Steppe', value: 220 },
        { year: '2012', type: 'Desert', value: 150 },
        { year: '2012', type: 'Wetland', value: 98 },
        { year: '2013', type: 'Forest', value: 332 },
        { year: '2013', type: 'Steppe', value: 182 },
        { year: '2013', type: 'Desert', value: 232 },
        { year: '2013', type: 'Wetland', value: 77 },
        { year: '2014', type: 'Forest', value: 301 },
        { year: '2014', type: 'Steppe', value: 191 },
        { year: '2014', type: 'Desert', value: 201 },
        { year: '2014', type: 'Wetland', value: 101 },
        { year: '2015', type: 'Forest', value: 334 },
        { year: '2015', type: 'Steppe', value: 234 },
        { year: '2015', type: 'Desert', value: 154 },
        { year: '2015', type: 'Wetland', value: 99 },
        { year: '2016', type: 'Forest', value: 390 },
        { year: '2016', type: 'Steppe', value: 290 },
        { year: '2016', type: 'Desert', value: 190 },
        { year: '2016', type: 'Wetland', value: 40 }
      ]
    }
  ],
  xField: ['year', 'type'],
  yField: 'value',
  seriesField: 'type',
  stateDef: {
    legend_hover: {
      filter: datum => {
        return true;
      }
    }
  },
  legends: [
    {
      orient: 'top',
      position: 'middle',
      select: false, // disable legend select interaction
      data: items => {
        return items.map(item => {
          item.shape.outerBorder = {
            stroke: item.shape.fill,
            distance: 2,
            lineWidth: 1
          };

          return item;
        });
      },
      item: {
        shape: {
          space: 8
        },
        background: {
          visible: false
        }
      }
    }
  ],
  bar: {
    state: {
      legend_hover_reverse: {
        fill: '#ccc'
      }
    }
  }
};