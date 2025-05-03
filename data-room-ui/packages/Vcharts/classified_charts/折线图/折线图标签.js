const spec = {
  type: 'line',
  data: {
    values: [
      {
        time: '2:00',
        value: 8,
        lowest: true
      },
      {
        time: '4:00',
        value: 9
      },
      {
        time: '6:00',
        value: 11
      },
      {
        time: '8:00',
        value: 14
      },
      {
        time: '10:00',
        value: 16
      },
      {
        time: '12:00',
        value: 17,
        highest: true
      },
      {
        time: '14:00',
        value: 17,
        highest: true
      },
      {
        time: '16:00',
        value: 16
      },
      {
        time: '18:00',
        value: 15
      }
    ]
  },
  xField: 'time',
  yField: 'value',
  label: {
    visible: true,
    style: {
      visible: datum => !!(datum.highest || datum.lowest),
      fontWeight: 'bold',
      text: datum => `${datum.value}°C`,
      fill: datum => {
        if (datum.highest) {
          return 'red';
        }
        if (datum.lowest) {
          return 'rgb(51, 147, 246)';
        }
      }
    }
  }
};