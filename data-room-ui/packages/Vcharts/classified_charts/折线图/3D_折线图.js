const spec = {
  type: 'line',
  data: {
    values: latestData,
    transforms: [
      {
        type: 'fold',
        options: {
          key: 'name',
          value: 'value',
          fields: [
            'Austria',
            'Canada',
            'France',
            'Germany',
            'Japan',
            'Netherlands',
            'New Zealand',
            'Spain',
            'Sweden',
            'Switzerland',
            'United Kingdom',
            'United States'
          ]
        }
      }
    ]
  },
  xField: 'country',
  yField: 'value',
  zField: 'name',
  seriesField: 'name',
  point: {
    style: {
      size: 0
    },
    state: {
      dimension_hover: {
        size: datum => {
          if (datum.name === 'United States') {
            return 8;
          }
          if (datum.name === 'Germany') {
            return 8;
          }

          if (datum.name === 'France') {
            return 8;
          }
          return 0;
        },
        fill: datum => {
          if (datum.name === 'United States') {
            return '#c02d24';
          }
          if (datum.name === 'Germany') {
            return '#15607a';
          }

          if (datum.name === 'France') {
            return '#008cb7';
          }
          return 'rgb(204, 204, 204)';
        }
      }
    }
  },
  line: {
    style: {
      lineWidth: datum => {
        if (datum.name === 'United States') {
          return 3;
        }
        if (datum.name === 'Germany') {
          return 3;
        }

        if (datum.name === 'France') {
          return 3;
        }
        return 1;
      },
      stroke: datum => {
        if (datum.name === 'United States') {
          return '#c02d24';
        }
        if (datum.name === 'Germany') {
          return '#15607a';
        }

        if (datum.name === 'France') {
          return '#008cb7';
        }
        return 'rgb(204, 204, 204)';
      },
      zIndex: datum => {
        if (datum.name === 'United States') {
          return 1;
        }
        if (datum.name === 'Germany') {
          return 1;
        }

        if (datum.name === 'France') {
          return 1;
        }
        return 0;
      }
    }
  },
  axes: [
    {
      orient: 'bottom',
      mode: '3d',
      domainLine: { style: { stroke: '#000' } },
      tick: {
        style: { stroke: '#000' }
      }
    },
    {
      orient: 'left',
      mode: '3d',
      domainLine: { visible: false },
      tick: { visible: false },
      label: {
        style: {
          fill: 'rgb(162, 162, 162)'
        }
      },
      grid: {
        style: {
          lineDash: [0],
          stroke: 'rgb(231, 231, 231)'
        }
      }
    },
    {
      orient: 'z',
      mode: '3d',
      label: { visible: true },
      type: 'band',
      grid: { visible: true },
      width: 600,
      height: 200,
      depth: 200
    }
  ],
  title: {
    visible: true,
    text: 'The rise and fall of cigarette consumption in developed countries',
    subtext: `Sales of cigarettes per adult per day, in selected countries. Figures include manufactured cigarettes,
as well as an estimated number of hand-rolled cigarettes, per adult (ages 15+) per day.`,
    subtextStyle: {
      fontSize: 12
    }
  },
  crosshair: {
    xField: {
      visible: false
    }
  }
};