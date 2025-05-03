const spec = {
  type: 'line',
  data: {
    values: [
      {
        time: '2:00',
        value: 8
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
        value: 17
      },
      {
        time: '14:00',
        value: 17
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
  title: {
    visible: true,
    align: 'left',
    verticalAlign: 'top',
    orient: 'top',
    textType: 'rich',
    text: [
      {
        text: 'Chinese Character Test',
        fontSize: 30,
        textAlign: 'center',
        textDecoration: 'underline',
        stroke: '#0f51b5'
      }
    ],
    subtextType: 'rich',
    subtext: [
      {
        text: 'Mapbox',
        fontWeight: 'bold',
        fontSize: 30,
        fill: '#3f51b5'
      },
      {
        text: 'was established in 2010 with the goal of providing an alternative solution',
        fill: '#000'
      },
      {
        text: 'alternative solution',
        fontStyle: 'italic',
        fill: '#3f51b5'
      },
      {
        text: ' to Google Maps. At that time, Google Map',
        fill: '#000'
      },
      {
        text: 'Map',
        textDecoration: 'line-through',
        fill: '#000'
      },
      {
        text: '[1]',
        script: 'super',
        fill: '#000'
      },
      {
        text: 'almost monopolized the online mapping business. However, within Google Maps, there was hardly any possibility for customization, and there were no tools available for map creators to create maps according to their own vision',
        fill: '#000'
      },
      {
        text: '.\n',
        fill: '#30ff05'
      }
    ]
  }
};