const spec = {
  type: 'bar',
  data: [
    {
      id: 'bar',
      values: data
    }
  ],
  xField: ['city', 'type'],
  yField: 'value',
  seriesField: 'type',
  legends: {
    orient: 'right',
    position: 'start',
    item: {
      focus: true // enable focus
    },
    defaultSelected: ['specialty snacks', 'rice'], // config default selected data
    allowAllCanceled: true, // allow all canceled
    padding: {
      top: 0,
      left: 20
    }
  }
};