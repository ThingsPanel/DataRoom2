const spec = {
  type: 'pie',
  data: [
    {
      id: 'pie',
      values: data
    }
  ],
  categoryField: 'category',
  valueField: 'value',
  legends: {
    visible: true,
    orient: 'right',
    data: items => {
      return items.map(item => {
        item.value = map[item.label];
        return item;
      });
    },
    item: {
      width: '15%',
      value: {
        alignRight: true,
        style: {
          fill: '#333',
          fillOpacity: 0.8,
          fontSize: 10
        },
        state: {
          unselected: {
            fill: '#d8d8d8'
          }
        }
      }
    }
  }
};