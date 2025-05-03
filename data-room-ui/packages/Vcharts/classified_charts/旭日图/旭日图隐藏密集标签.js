const spec = {
  type: 'sunburst',
  offsetX: 0,
  offsetY: 0,
  categoryField: 'name',
  valueField: 'value',
  outerRadius: 1,
  innerRadius: 0,
  gap: 5,
  drill: true,
  labelAutoVisible: {
    enable: true,
    circumference: 5
  },
  labelLayout: {
    align: 'center',
    rotate: 'radial'
  },
  sunburst: {
    visible: true,
    style: {
      fillOpacity: datum => {
        return datum.isLeaf ? 0.4 : 0.8;
      }
    }
  },
  label: {
    visible: true,
    style: {
      fontSize: 12,
      fillOpacity: datum => {
        return datum.isLeaf ? 0.4 : 0.8;
      }
    }
  },
  tooltip: {
    mark: {
      title: {
        value: val => {
          return val?.datum?.map(data => data.name).join(' / ');
        }
      }
    }
  },
  data: [
    {
      id: 'data',
      values: data
    }
  ],
  animationEnter: {
    label: {
      type: 'fadeIn'
    },
    easing: 'cubicInOut',
    duration: 1000
  },
  animationExit: {
    easing: 'cubicInOut',
    duration: 1000
  },
  animationUpdate: {
    easing: 'cubicInOut',
    duration: 1000
  }
};