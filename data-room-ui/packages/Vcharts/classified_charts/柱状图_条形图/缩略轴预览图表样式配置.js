const spec = {
  color: ['#1ac7c2', '#6f40aa', '#ccf59a', '#D4ADFC'],
  type: 'bar',
  dataId: 'bar',
  xField: 'Date',
  yField: 'Close',
  seriesField: 'Symbol',
  dataZoom: [
    {
      orient: 'bottom',
      backgroundChart: {
        area: {
          style: {
            lineWidth: 1,
            fill: '#D1DBEE'
          }
        },
        line: {
          style: {
            stroke: '#D1DBEE',
            lineWidth: 1
          }
        }
      },
      selectedBackgroundChart: {
        area: {
          style: {
            lineWidth: 1,
            fill: '#fbb934'
          }
        },
        line: {
          style: {
            stroke: '#fbb934',
            lineWidth: 1
          }
        }
      }
    }
  ],
  legends: {
    visible: true,
    orient: 'top'
  },
  title: {
    text: 'This line chart shows the weekly price of several technology stocks in from 2016 to 2018 relative to each stock’s price on the highlighted date.',
    textStyle: {
      height: 50,
      lineWidth: 3,
      fill: '#333',
      fontSize: 25,
      fontFamily: 'Times New Roman'
    }
  },
  data: [
    {
      id: 'bar',
      values: data
    }
  ]
};