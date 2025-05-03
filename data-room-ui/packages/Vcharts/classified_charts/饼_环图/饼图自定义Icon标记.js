const spec = {
  type: 'pie',
  data: [
    {
      id: 'id0',
      values: [
        {
          Category: 'Bike',
          Value: 38
        },
        {
          Category: 'Walk',
          Value: 32
        },
        {
          Category: 'Car',
          Value: 18
        },
        {
          Category: 'Bus',
          Value: 12
        }
      ]
    }
  ],
  color: ['rgb(109, 182, 214)', 'rgb(68, 103, 168)', 'rgb(251, 220, 120)', 'rgb(239, 174, 117)', 'rgb(182, 78, 67)'],
  outerRadius: 0.8,
  valueField: 'Value',
  categoryField: 'Category',
  title: {
    visible: true,
    text: 'Statistics of Transportation'
  },
  legends: {
    visible: true,
    orient: 'left'
  },
  label: {
    visible: true
  },
  tooltip: {
    mark: {
      content: [
        {
          key: datum => datum['type'],
          value: datum => datum['value'] + '%'
        }
      ]
    }
  },
  animation: false,
  extensionMark: [
    {
      name: 'marker',
      type: 'symbol',
      dataId: 'id0',
      style: {
        symbolType: (...params) => {
          return iconMap[params[0]['Category']];
        },
        fill: (...params) => {
          if (params[0]['Category'] === 'Car') {
            return 'rgb(22, 54, 129)';
          }
          return 'white';
        },
        stroke: 'white',
        visible: true,
        x: (...params) => {
          const radius = (params[1].getLayoutRadius() / 2) * 0.8;
          const posX =
            Math.cos((params[1].startAngleScale(params[0]) + params[1].endAngleScale(params[0])) / 2) * radius;
          const offsetX = params[1].getCenter().x();
          return posX + offsetX - 20;
        },
        y: (...params) => {
          const radius = (params[1].getLayoutRadius() / 2) * 0.8;
          const posY =
            Math.sin((params[1].startAngleScale(params[0]) + params[1].endAngleScale(params[0])) / 2) * radius;
          const offsetY = params[1].getCenter().y();
          return posY + offsetY - 20;
        },
        size: 40
      }
    }
  ]
};