const spec = {
  type: 'pictogram',
  data: {
    id: 'data',
    values: chosenSeats.map(seat => ({ name: seat, value: 1 }))
  },
  region: [
    {
      roam: true
    }
  ],
  pictogram: {
    style: {
      fill: data => {
        if (data?.data?.value > 0) {
          return 'red';
        }
        return 'lightgrey';
      }
    },
    state: {
      selected: {
        fill: 'green'
      },
      hover: {
        fill: 'lightgreen'
      }
    }
  },
  select: {
    enable: true,
    mode: 'multiple'
  },
  hover: {
    enable: true
  },
  svg: 'cinema',
  nameField: 'name',
  valueField: 'value'
};