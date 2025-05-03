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
    layout: 'vertical',
    orient: 'right',
    data: items => {
      return new Array(10).fill(0).reduce((res, entry, idx) => {
        items.forEach(item => {
          res.push({
            ...item,
            label: idx === 0 ? item.label : `${item.label}-${idx}`
          });
        });

        return res;
      }, []);
    },
    item: {
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
    },
    pager: {
      type: 'scrollbar',
      railStyle: {
        fill: '#ccc',
        cornerRadius: 5
      }
    }
  }
};