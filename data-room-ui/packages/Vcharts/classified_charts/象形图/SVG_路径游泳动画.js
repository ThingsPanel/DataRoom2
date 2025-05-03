const spec = {
  type: 'pictogram',
  height: 500,
  data: {
    id: 'data',
    values: []
  },
  region: [
    {
      roam: { blank: true }
    }
  ],
  customMark: [
    {
      type: 'symbol',
      parent: 'pictogram',
      name: 'people',
      animation: true,
      style: {
        x: 40,
        y: 20,
        size: 90,
        fill: '#CD853F',
        symbolType: brownPeople1
      }
    },
    {
      type: 'symbol',
      parent: 'pictogram',
      name: 'flippedPeople',
      animation: true,
      style: {
        x: 920,
        y: 40,
        size: 90,
        fill: '#CD853F',
        fillOpacity: 0,
        symbolType: brownPeople2
      }
    },
    {
      type: 'line',
      name: 'route',
      parent: 'pictogram',
      style: {
        points: points1
      }
    },
    {
      type: 'line',
      name: 'flippedRoute',
      parent: 'pictogram',
      style: {
        points: flippedPoints1
      }
    },
    {
      type: 'symbol',
      parent: 'pictogram',
      name: 'people',
      animation: true,
      style: {
        x: 40,
        y: 105,
        size: 90,
        fill: 'green',
        symbolType: whitePeople1
      }
    },
    {
      type: 'symbol',
      parent: 'pictogram',
      name: 'flippedPeople',
      animation: true,
      style: {
        x: 920,
        y: 105,
        size: 90,
        fill: 'red',
        fillOpacity: 0,
        symbolType: whitePeople2
      }
    },
    {
      type: 'line',
      name: 'route',
      parent: 'pictogram',
      style: {
        points: points2
      }
    },
    {
      type: 'line',
      name: 'flippedRoute',
      parent: 'pictogram',
      style: {
        points: flippedPoints2
      }
    },
    {
      type: 'symbol',
      parent: 'pictogram',
      name: 'people',
      animation: true,
      style: {
        x: 40,
        y: 187,
        size: 90,
        fill: 'yellow',
        symbolType: blackPeople2
      }
    },
    {
      type: 'symbol',
      parent: 'pictogram',
      name: 'flippedPeople',
      animation: true,
      style: {
        x: 920,
        y: 187,
        size: 90,
        fill: 'red',
        fillOpacity: 0,
        symbolType: blackPeople1
      }
    },
    {
      type: 'line',
      name: 'route',
      parent: 'pictogram',
      style: {
        points: points3
      }
    },
    {
      type: 'line',
      name: 'flippedRoute',
      parent: 'pictogram',
      style: {
        points: flippedPoints3
      }
    },
    {
      type: 'symbol',
      parent: 'pictogram',
      name: 'people',
      animation: true,
      style: {
        x: 40,
        y: 269,
        size: 90,
        fill: 'coral',
        symbolType: yellowPeople1
      }
    },
    {
      type: 'symbol',
      parent: 'pictogram',
      name: 'flippedPeople',
      animation: true,
      style: {
        x: 920,
        y: 269,
        size: 90,
        fill: 'red',
        fillOpacity: 0,
        symbolType: yellowPeople2
      }
    },
    {
      type: 'line',
      name: 'route',
      parent: 'pictogram',
      style: {
        points: points4
      }
    },
    {
      type: 'line',
      name: 'flippedRoute',
      parent: 'pictogram',
      style: {
        points: flippedPoints4
      }
    },
    {
      type: 'symbol',
      parent: 'pictogram',
      name: 'people',
      animation: true,
      style: {
        x: 40,
        y: 351,
        size: 90,
        fill: 'white',
        symbolType: tanPeople1
      }
    },
    {
      type: 'symbol',
      parent: 'pictogram',
      name: 'flippedPeople',
      animation: true,
      style: {
        x: 920,
        y: 351,
        size: 90,
        fill: 'red',
        fillOpacity: 0,
        symbolType: tanPeople2
      }
    },
    {
      type: 'line',
      name: 'route',
      parent: 'pictogram',
      style: {
        points: points5
      }
    },
    {
      type: 'line',
      name: 'flippedRoute',
      parent: 'pictogram',
      style: {
        points: flippedPoints5
      }
    }
  ],
  svg: 'route',
  nameField: 'name',
  valueField: 'value'
};