const spec = {
  type: 'liquid',
  valueField: 'value',
  data: {
    id: 'data',
    values: [
      {
        value: 0.8
      }
    ]
  },
  maskShape: 'drop', // 水滴
  // maskShape: 'circle',
  // maskShape: 'star',
  indicatorSmartInvert: true,
  indicator: {
    visible: true,
    title: {
      visible: true,
      style: {
        text: '进度'
      }
    },
    content: [
      {
        visible: true,
        style: {
          fill: 'black',
          text: '80%'
        }
      }
    ]
  },
  liquidBackground: {
    style: {
      fill: 'blue'
    }
  }
};