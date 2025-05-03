const spec = {
  // 图表类型为象形图
  type: 'pictogram',
  data: {
    // 数据的唯一标识符
    id: 'data',
    // 数据的值
    values: mall_data
  },
  color: {
    specified: {
      // 餐饮类别的颜色为棕红色
      food_and_dining: '#A52A2A',
      // 服装鞋类别的颜色为森林绿
      apparel_and_shoes: '#228B22',
      // 娱乐类别的颜色为钢青色
      entertainment: '#4682B4',
      // 珠宝类别的颜色为深紫罗兰
      jewelry: '#9400D3',
      // 电子类别的颜色为金麒麟色
      electronics: '#DAA520',
      // 购物类别的颜色为深青色
      shopping: '#008B8B',
      // 基础设施类别的颜色为暗橄榄绿
      infrastructure: '#556B2F',
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
  // 使用的 SVG 图形名称为 mall
  svg: 'mall',
  pictogram: {
    style: {
      fill: {
        // 填充颜色使用 color 颜色映射，字段为类别
        scale: 'color',
        field: 'category'
      }
    },
    state: {
      // 图例悬停时的填充颜色为灰色
      legend_hover_reverse: {
        fill: '#ccc'
      }
    }
  },
  // 图表标题
  title: {
    text: 'Shopping Mall Tenant Layout'
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