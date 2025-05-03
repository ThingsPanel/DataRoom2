const spec = {
  type: 'sunburst',
  padding: 30,
  offsetX: 0,
  offsetY: 0,
  categoryField: 'name',
  valueField: 'value',
  innerRadius: [0, 0.4, 0.8],
  outerRadius: [0.3, 0.7, 0.85],
  gap: 0,
  drill: true,
  labelAutoVisible: {
    enable: true,
    circumference: 1
  },
  labelLayout: [
    {
      align: 'center',
      rotate: 'tangential',
      offset: 0
    },
    null,
    {
      align: 'start',
      rotate: 'radial',
      offset: 15
    }
  ],
  sunburst: {
    visible: true,
    style: {
      fillOpacity: datum => {
        return datum.isLeaf ? 0.4 : 0.8;
      }
    }
  },
  label: {
    visible: true
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