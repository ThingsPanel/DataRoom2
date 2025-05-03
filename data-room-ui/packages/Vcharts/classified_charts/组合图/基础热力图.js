const spec = {
  type: 'common',
  padding: 12,
  data: [
    {
      id: 'data0',
      values: data
    }
  ],
  series: [
    {
      type: 'heatmap',
      regionId: 'region0',
      xField: 'var1',
      yField: 'var2',
      valueField: 'value',
      cell: {
        style: {
          fill: {
            field: 'value',
            scale: 'color'
          }
        }
      }
    }
  ],
  region: [
    {
      id: 'region0',
      width: 200, // limit the width of the region
      height: 200, // limit the height of the region
      padding: {
        top: 40
      }
    }
  ],
  color: {
    type: 'linear',
    domain: [
      {
        dataId: 'data0',
        fields: ['value']
      }
    ],
    range: ['#feedde', '#fdbe85', '#fd8d3c', '#e6550d', '#a63603']
  },
  axes: [
    {
      orient: 'bottom',
      type: 'band',
      grid: {
        visible: false
      },
      domainLine: {
        visible: false
      },
      label: {
        space: 10,
        style: {
          textAlign: 'left',
          textBaseline: 'middle',
          angle: 90,
          fontSize: 8
        }
      },
      bandPadding: 0,
      height: layoutRect => {
        // canvas height - region height - paddingTop - paddingBottom
        return layoutRect.height - 314;
      }
    },
    {
      orient: 'left',
      type: 'band',
      grid: {
        visible: false
      },
      domainLine: {
        visible: false
      },
      label: {
        space: 10,
        style: {
          fontSize: 8
        }
      },
      bandPadding: 0
    }
  ],
  legends: {
    visible: true,
    orient: 'right',
    position: 'start',
    type: 'color',
    field: 'value'
  },
  title: {
    visible: true,
    text: `Correlation Coefficient`
  }
};