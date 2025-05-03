const spec = {
  type: 'bar',
  data: [
    {
      id: 'barData',
      values: data
    }
  ],
  xField: 'year',
  yField: 'value',
  label: {
    visible: true,
    dataFilter: items => {
      return [items[0], items[5], items[6]];
    },
    style: {
      fill: '#000'
    },
    formatMethod: val => `$${val}`,
    position: 'top',
    overlap: false,
    offset: 0
  },
  axes: [
    {
      orient: 'left',
      visible: false
    },
    {
      orient: 'bottom',
      domainLine: {
        style: {
          lineWidth: 2,
          stroke: '#000'
        }
      }
    }
  ],
  markLine: {
    coordinates: [data[0], data[5]],
    line: {
      style: {
        lineDash: [0],
        lineWidth: 2,
        stroke: '#000'
      }
    },
    label: {
      position: 'middle',
      text: `${(calculateCAGR(data[5].value, data[0].value, 5) * 100).toFixed(0)}% CARG`,
      labelBackground: {
        padding: 8,
        style: {
          fill: '#fff',
          fillOpacity: 1,
          stroke: '#3CC780',
          lineWidth: 2,
          cornerRadius: 8
        }
      },
      style: {
        fill: '#3CC780'
      }
    },
    endSymbol: {
      size: 12,
      refX: -4
    },
    offsetY: -40
  },
  bar: {
    style: {
      fill: datum => {
        return datum.year === 'Target' ? '#ccc' : '#1664FF';
      }
    }
  }
};