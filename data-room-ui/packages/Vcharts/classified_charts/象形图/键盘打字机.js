const spec = {
  type: 'pictogram',
  data: {
    id: 'data',
    values: [
      {
        name: 'W',
        value: 1
      },
      {
        name: 'A',
        value: 1
      },
      {
        name: 'S',
        value: 1
      },
      {
        name: 'D',
        value: 1
      }
    ]
  },
  region: [
    {
      roam: { blank: true }
    }
  ],
  nameField: 'name',
  valueField: 'value',
  svg: 'keyboard',
  pictogram: {
    style: {
      fill: datum => {
        return datum.data?.value ? 'rgb(190,204,232)' : 'white';
      },
      fillOpacity: 0.5
    },
    state: {
      selected: {
        fill: 'red'
      }
    }
  }
};