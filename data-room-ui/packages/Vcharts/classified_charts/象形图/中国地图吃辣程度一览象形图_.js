const spec = {
  // 图表类型为象形图
  type: 'pictogram',
  padding: 0,
  data: {
    // 数据的唯一标识符
    id: 'data',
    // 数据的值
    values: chinamap_data
  },
  color: {
    specified: {
      // 大师
      MVP: 'rgb(73, 3, 3)',
      // 钻石
      diamond: 'rgb(250, 8, 8)',
      //  黄金
      gold: 'rgb(250, 77, 8)',
      // 白银
      silver: 'rgb(228, 170, 64)',
      // 青铜
      bronze: 'rgb(198, 238, 53)',
      // 未定义类别的颜色为白色
      undefined: 'white'
    },
    // 颜色映射的字段为类别
    field: 'category'
  },
  // 系列字段为类别
  seriesField: 'category',
  // 名称字段为名称
  nameField: 'name',
  //显示辣椒图标
  valueField: 'level',
  // 使用的 SVG 图形名称
  svg: 'chinamap',
  pictogram: {
    style: {
      fill: {
        // 填充颜色使用 color 颜色映射，字段为类别
        scale: 'color',
        field: 'category'
      },
      cursor: 'pointer'
    },
    state: {
      // 图例悬停时的填充颜色为白色
      legend_hover_reverse: {
        fill: 'white'
      },
      hover: {
        lineWidth: 3,
        stroke: 'black',
        shadowBlur: 80,
        shadowColor: 'black'
      },
      // 鼠标非悬停时的效果，地图向外扩散，透明度降低，阴影模糊度增加
      hover_reverse: {
        opacity: 0.1
      }
    }
  },
  // 图表标题
  title: {
    text: '中国地图吃辣程度一览'
  },

  legends: [
    {
      orient: 'top',
      position: 'middle',
      padding: {
        bottom: 12
      },
      visible: true,
      field: 'category',
      filter: false,
      select: false,
      data: items => {
        return items.map(item => {
          item.shape.outerBorder = {
            stroke: item.shape.fill,
            distance: 2,
            lineWidth: 1
          };
          return item;
        });
      }
    }
  ]
};