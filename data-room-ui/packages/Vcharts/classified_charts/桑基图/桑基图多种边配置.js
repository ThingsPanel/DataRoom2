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
  nodeKey: datum => datum.name,

  label: {
    visible: true,
    style: {
      fontSize: 12,
      fill: '#000000',
      limit: 10000
    }
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
    text: 'From Where in Africa Were the Slaves Who Landed in Va.?',
    subtext: 'Source: https://observablehq.com/@luiztheodoro/sankey-d3',
    subtextStyle: {
      fontSize: 12
    }
  }
};