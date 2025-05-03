const spec = {
  type: 'common',
  layout: {
    type: 'grid',
    col: 3,
    row: 5,
    elements: [
      {
        modelId: 'legend',
        col: 2,
        row: 0,
        rowSpan: 5
      },
      {
        modelId: 'centralLeftAxis',
        col: 0,
        row: 0
      },
      {
        modelId: 'southLeftAxis',
        col: 0,
        row: 1
      },
      {
        modelId: 'eastLeftAxis',
        col: 0,
        row: 2
      },
      {
        modelId: 'westLeftAxis',
        col: 0,
        row: 3
      },
      {
        modelId: 'central',
        col: 1,
        row: 0
      },
      {
        modelId: 'south',
        col: 1,
        row: 1
      },
      {
        modelId: 'east',
        col: 1,
        row: 2
      },
      {
        modelId: 'west',
        col: 1,
        row: 3
      },
      {
        modelId: 'bottomAxis',
        col: 1,
        row: 4
      }
    ]
  },
  region: [
    {
      id: 'central',
      style: {
        stroke: [defaultColorScheme[0], false, false, false],
        lineWidth: 1
      }
    },
    {
      id: 'south',
      style: {
        stroke: [defaultColorScheme[1], false, false, false],
        lineWidth: 1
      }
    },
    {
      id: 'east',
      style: {
        stroke: [defaultColorScheme[2], false, false, false],
        lineWidth: 1
      }
    },
    {
      id: 'west',
      style: {
        stroke: [defaultColorScheme[3], false, false, false],
        lineWidth: 1
      }
    }
  ],
  legends: {
    visible: true,
    orient: 'right',
    position: 'top',
    id: 'legend',
    regionId: ['central', 'south', 'east', 'west'],
    item: {
      background: {
        visible: false
      },
      label: {
        formatMethod: (label, datum, index) => {
          return ['central', 'south', 'east', 'west'][index];
        }
      }
    },
    interactive: false, // Turn off legend interaction
    padding: {
      top: 0,
      left: 20
    }
  },
  series: [
    {
      id: 'centralSeriesO',
      regionId: 'central',
      type: 'bar',
      data: {
        id: 'central',
        values: centralData
      },
      direction: 'horizontal',
      xField: 'sales',
      yField: 'state'
    },
    {
      id: 'southSeries0',
      regionId: 'south',
      type: 'bar',
      data: {
        id: 'south',
        values: southData
      },
      direction: 'horizontal',
      xField: 'sales',
      yField: 'state'
    },
    {
      id: 'eastSeries0',
      regionId: 'east',
      type: 'bar',
      data: {
        id: 'east',
        values: eastData
      },
      direction: 'horizontal',
      xField: 'sales',
      yField: 'state'
    },
    {
      id: 'westSeries0',
      regionId: 'west',
      type: 'bar',
      data: {
        id: 'west',
        values: westData
      },
      direction: 'horizontal',
      xField: 'sales',
      yField: 'state'
    }
  ],
  axes: [
    {
      grid: {
        visible: 1,
        style: {
          lineDash: [1, 0]
        }
      },
      id: 'centralLeftAxis',
      regionId: 'central',
      seriesId: ['centralSeriesO'],
      orient: 'left',
      type: 'band'
    },
    {
      grid: {
        visible: 1,
        style: {
          lineDash: [1, 0]
        }
      },
      id: 'southLeftAxis',
      regionId: 'south',
      seriesId: ['southSeries0'],
      orient: 'left',
      type: 'band'
    },
    {
      grid: {
        visible: 1,
        style: {
          lineDash: [1, 0]
        }
      },
      id: 'eastLeftAxis',
      regionId: 'east',
      seriesId: ['eastSeries0'],
      orient: 'left',
      type: 'band'
    },
    {
      grid: {
        visible: 1,
        style: {
          lineDash: [1, 0]
        }
      },
      id: 'westLeftAxis',
      regionId: 'west',
      seriesId: ['westSeries0'],
      orient: 'left',
      type: 'band'
    },
    {
      id: 'bottomAxis',
      regionId: ['central', 'south', 'east', 'west'],
      orient: 'bottom',
      type: 'linear',
      tick: {
        visible: false
      },
      grid: {
        visible: true,
        style: {
          lineDash: [0]
        }
      }
    }
  ],
  crosshair: {
    xField: {
      visible: true,
      bindingAxesIndex: [4],
      line: {
        visible: true,
        type: 'line',
        style: {
          opacity: 1,
          lineDash: [2, 2],
          lineWidth: 1,
          stroke: '#000'
        }
      },
      label: {
        visible: true // Default is false
      }
    },
    yField: {
      bindingAxesIndex: [0, 1, 2, 3],
      visible: true,
      line: {
        visible: true,
        type: 'line',
        style: {
          opacity: 1,
          lineDash: [2, 2],
          lineWidth: 1,
          stroke: '#000'
        }
      },
      label: {
        visible: true // Default is false
      }
    }
  }
};