const spec = {
  data: {
    id: 'data1',
    values: [
      {
        x: '2:00',
        y: 82
      },
      {
        x: '4:00',
        y: 50
      },
      {
        x: '6:00',
        y: 64
      },
      {
        x: '8:00',
        y: 30
      },
      {
        x: '10:00',
        y: 40
      },
      {
        x: '12:00',
        y: 40
      },
      {
        x: '14:00',
        y: 56
      },
      {
        x: '16:00',
        y: 40
      },
      {
        x: '18:00',
        y: 64
      },
      {
        x: '20:00',
        y: 74
      },
      {
        x: '22:00',
        y: 98
      }
    ]
  },
  type: 'line',
  xField: 'x',
  yField: 'y',
  point: {
    style: {
      fill: data => {
        if (data.y > 60) {
          return 'green';
        }
        return 'red';
      }
    }
  },
  line: {
    style: {
      stroke: {
        gradient: 'linear',
        x0: 0.5,
        y0: 0,
        x1: 0.5,
        y1: 1,
        stops: [
          {
            offset: 0,
            color: 'green'
          },
          {
            offset: 0.5588235294117647,
            color: 'green'
          },
          {
            offset: 0.5588235294117647,
            color: 'red'
          },
          {
            offset: 1,
            color: 'red'
          }
        ]
      }
    }
  }
};