const spec = {
  data: [
    {
      id: 'data',
      values: data
    }
  ],
  type: 'circlePacking',
  categoryField: 'name',
  valueField: 'value',
  drill: true,
  circlePacking: {
    style: {
      fillOpacity: d => (d.isLeaf ? 0.75 : 0.25)
    }
  },
  layoutPadding: [0, 10, 10],
  label: {
    style: {
      fontSize: 10,
      visible: d => {
        return d.depth === 1;
      }
    }
  },
  animationEnter: {
    easing: 'cubicInOut'
  },
  animationExit: {
    easing: 'cubicInOut'
  },
  animationUpdate: {
    easing: 'cubicInOut'
  },
  tooltip: {
    mark: {
      title: {
        value: val => {
          return val?.datum?.map(data => data.name).join(' / ');
        }
      }
    }
  }
};