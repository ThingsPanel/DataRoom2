const spec = {
  type: 'pie',
  data: {
    id: 'pieData',
    values: [
      {
        name: 'NVDA',
        y: 40.6
      },
      {
        name: 'JAWS',
        y: 40.1
      },
      {
        name: 'VoiceOver',
        y: 12.9
      },
      {
        name: 'ZoomText',
        y: 2
      },
      {
        name: 'Other',
        y: 4.4
      }
    ]
  },
  categoryField: 'name',
  valueField: 'y',
  padAngle: 2, // The angular padding applied to sides of the arc, in degree.
  pie: {
    style: {
      texture: datum => textureMap[datum.name]
    },
    state: {
      hover: {
        centerOffset: 10
      }
    }
  },
  label: {
    visible: true,
    style: {
      text: datum => {
        // return [datum.name, `${datum.y}%`]; // Text wrap
        return `${datum.name}: ${datum.y}%`;
      },
      fontSize: 12
    },
    line: {
      line1MinLength: 30
    }
  },
  legends: {
    visible: true
  }
};