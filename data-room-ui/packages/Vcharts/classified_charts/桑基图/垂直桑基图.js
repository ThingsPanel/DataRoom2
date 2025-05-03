const spec = {
  type: 'sankey',
  data: [
    {
      name: 'data',
      values: data
    }
  ],
  categoryField: 'name',
  valueField: 'value',
  sourceField: 'source',
  targetField: 'target',
  colorField: 'type',

  direction: 'vertical',
  nodeAlign: 'start',
  nodeGap: 2,
  nodeWidth: '10%',
  minNodeHeight: 4,

  label: {
    visible: true,
    style: {
      fontSize: 12
    },
    position: 'inside-middle'
  },

  node: {
    state: {
      hover: {
        fill: 'red'
      },
      blur: {
        fill: '#e8e8e8',
        fillOpacity: 0.15
      }
    }
  },

  link: {
    style: {
      fill: data => {
        if (data.type ?? data.datum.type === 'opex') {
          return 'red';
        }

        if (data.type ?? data.datum.type === 'capex') {
          return 'yellow';
        }

        return 'blue';
      },
      fillOpacity: 0.1
    },
    state: {
      hover: {
        fillOpacity: 0.4
      },
      blur: {
        fill: '#e8e8e8'
      }
    }
  },
  emphasis: {
    enable: true,
    trigger: 'selected',
    effect: 'adjacency'
  },
  title: {
    text: 'Experimental Sankey diagram visualizes expenses flow',
    subtext: 'Source: https://observablehq.com/@leogs0204/sankey-chart',
    subtextStyle: {
      fontSize: 12
    }
  }
};