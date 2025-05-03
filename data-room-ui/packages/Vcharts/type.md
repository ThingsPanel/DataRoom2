


          
# VChart 图表类型及关键配置项

VChart 是一个功能强大的可视化图表库，支持多种图表类型。以下是各种图表类型及其关键配置项的详细说明。

## 目录

1. [组合图 (Combination Chart)](#组合图-combination-chart)
2. [折线图 (Line Chart)](#折线图-line-chart)
3. [面积图 (Area Chart)](#面积图-area-chart)
4. [柱状图/条形图 (Bar Chart/Column Chart)](#柱状图条形图-barchart-column-chart)
5. [饼/环图 (Pie/Ring Chart)](#饼环图-piering-chart)
6. [玫瑰图 (Rose Chart)](#玫瑰图-rose-chart)
7. [直方图 (Histogram)](#直方图-histogram)
8. [散点图 (Scatter Plot)](#散点图-scatter-plot)
9. [热力图 (Heatmap)](#热力图-heatmap)
10. [箱型图 (Box Plot)](#箱型图-box-plot)
11. [瀑布图 (Waterfall Chart)](#瀑布图-waterfall-chart)
12. [漏斗图 (Funnel Chart)](#漏斗图-funnel-chart)
13. [时序图 (Sequence Chart)](#时序图-sequence-chart)
14. [区间柱状图 (Range Column Chart)](#区间柱状图-range-column-chart)
15. [区间面积图 (Range Area Chart)](#区间面积图-range-area-chart)
16. [词云 (Word Cloud)](#词云-word-cloud)
17. [仪表图 (Gauge Chart)](#仪表图-gauge-chart)
18. [矩形树图 (Treemap)](#矩形树图-treemap)
19. [地图 (Map)](#地图-map)
20. [雷达图 (Radar Chart)](#雷达图-radar-chart)
21. [桑基图 (Sankey Diagram)](#桑基图-sankey-diagram)
22. [进度图 (Progress Chart)](#进度图-progress-chart)
23. [Circle Packing](#circle-packing)
24. [旭日图 (Sunburst Chart)](#旭日图-sunburst-chart)
25. [散点相关性图 (Correlation Chart)](#散点相关性图-correlation-chart)
26. [水波图 (Liquid Chart)](#水波图-liquid-chart)
27. [马赛克图 (Mosaic Chart)](#马赛克图-mosaic-chart)
28. [象形图 (Pictogram Chart)](#象形图-pictogram-chart)
29. [3D 图表](#3d-图表)
30. [韦恩图 (Venn Diagram)](#韦恩图-venn-diagram)
23. [Circle Packing](#circle-packing)
24. [旭日图 (Sunburst Chart)](#旭日图-sunburst-chart)
25. [散点相关性图 (Correlation Chart)](#散点相关性图-correlation-chart)
26. [水波图 (Liquid Chart)](#水波图-liquid-chart)
27. [马赛克图 (Mosaic Chart)](#马赛克图-mosaic-chart)
28. [象形图 (Pictogram Chart)](#象形图-pictogram-chart)
29. [3D 图表](#3d-图表)

## 组合图 (Combination Chart)

组合图允许在同一个图表中展示多种不同类型的图表。

**关键配置项**：
```javascript
{
  type: 'common',
  series: [
    {
      type: 'bar',
      // 柱状图配置
    },
    {
      type: 'line',
      // 折线图配置
    }
  ]
}
```

## 折线图 (Line Chart)

折线图用于显示数据在连续时间间隔或时间跨度上的变化趋势。

**关键配置项**：
```javascript
{
  type: 'line',
  data: [...],
  xField: 'x轴字段',
  yField: 'y轴字段',
  seriesField: '分组字段',
  line: {
    style: {
      stroke: '#color',
      lineWidth: 2
    }
  },
  point: {
    visible: true,
    style: {
      size: 5
    }
  }
}
```

## 面积图 (Area Chart)

面积图是在折线图的基础上，将折线与坐标轴之间的区域填充颜色形成的图表。

**关键配置项**：
```javascript
{
  type: 'area',
  data: [...],
  xField: 'x轴字段',
  yField: 'y轴字段',
  seriesField: '分组字段',
  area: {
    style: {
      fill: '#color',
      fillOpacity: 0.5
    }
  },
  line: {
    visible: true
  }
}
```

## 柱状图/条形图 (Bar/Column Chart)

柱状图/条形图用于比较不同类别的数据大小。

**关键配置项**：
```javascript
{
  type: 'bar',  // 或 'column'
  data: [...],
  xField: 'x轴字段',
  yField: 'y轴字段',
  seriesField: '分组字段',
  bar: {
    style: {
      fill: '#color',
      fillOpacity: 0.8
    }
  },
  stack: false,  // 是否堆叠
  group: true    // 是否分组
}
```

## 饼/环图 (Pie/Ring Chart)

饼图/环图用于显示数据的比例关系。

**关键配置项**：
```javascript
{
  type: 'pie',
  data: [...],
  valueField: '数值字段',
  categoryField: '分类字段',
  outerRadius: 0.8,  // 外半径
  innerRadius: 0,    // 内半径，为0时是饼图，大于0时是环图
  label: {
    visible: true,
    type: 'outer'  // 'inner' | 'outer' | 'spider'
  }
}
```

## 玫瑰图 (Rose Chart)

玫瑰图是饼图的变种，每个扇区的半径取决于数据的大小。

**关键配置项**：
```javascript
{
  type: 'rose',
  data: [...],
  valueField: '数值字段',
  categoryField: '分类字段',
  rose: {
    style: {
      fill: '#color'
    }
  },
  label: {
    visible: true
  }
}
```

## 直方图 (Histogram)

直方图用于显示数据的分布情况。

**关键配置项**：
```javascript
{
  type: 'histogram',
  data: [...],
  binField: '分箱字段',
  binWidth: 10,  // 箱宽
  bar: {
    style: {
      fill: '#color'
    }
  }
}
```

## 散点图 (Scatter Plot)

散点图用于显示两个变量之间的关系。

**关键配置项**：
```javascript
{
  type: 'scatter',
  data: [...],
  xField: 'x轴字段',
  yField: 'y轴字段',
  sizeField: '大小字段',  // 可选
  colorField: '颜色字段',  // 可选
  point: {
    style: {
      size: 5,
      fill: '#color',
      fillOpacity: 0.8
    }
  }
}
```

## 热力图 (Heatmap)

热力图用于显示矩阵数据的值的大小。

**关键配置项**：
```javascript
{
  type: 'heatmap',
  data: [...],
  xField: 'x轴字段',
  yField: 'y轴字段',
  colorField: '颜色字段',
  color: {
    range: ['#blue', '#red']  // 颜色范围
  }
}
```

## 箱型图 (Box Plot)

箱型图用于显示数据的分布情况，包括最小值、第一四分位数、中位数、第三四分位数和最大值。

**关键配置项**：
```javascript
{
  type: 'boxplot',
  data: [...],
  categoryField: '分类字段',
  valueField: '数值字段',
  box: {
    style: {
      fill: '#color',
      stroke: '#color'
    }
  }
}
```

## 瀑布图 (Waterfall Chart)

瀑布图用于显示数据的累计效应。

**关键配置项**：
```javascript
{
  type: 'waterfall',
  data: [...],
  categoryField: '分类字段',
  valueField: '数值字段',
  bar: {
    style: {
      fill: '#color'
    }
  },
  total: {
    visible: true,
    label: '总计'
  }
}
```

## 漏斗图 (Funnel Chart)

漏斗图用于显示数据从一个阶段流向另一个阶段的过程。

**关键配置项**：
```javascript
{
  type: 'funnel',
  data: [...],
  categoryField: '分类字段',
  valueField: '数值字段',
  funnel: {
    style: {
      fill: '#color'
    }
  },
  label: {
    visible: true
  }
}
```

## 时序图 (Sequence Chart)

时序图用于显示数据随时间的变化。

**关键配置项**：
```javascript
{
  type: 'timeseries',
  data: [...],
  xField: '时间字段',
  yField: '数值字段',
  seriesField: '分组字段',
  line: {
    style: {
      stroke: '#color'
    }
  }
}
```

## 区间柱状图 (Range Column Chart)

区间柱状图用于显示数据的范围。

**关键配置项**：
```javascript
{
  type: 'rangeColumn',
  data: [...],
  xField: 'x轴字段',
  yField: ['最小值字段', '最大值字段'],
  bar: {
    style: {
      fill: '#color'
    }
  }
}
```

## 区间面积图 (Range Area Chart)

区间面积图用于显示数据的范围区域。

**关键配置项**：
```javascript
{
  type: 'rangeArea',
  data: [...],
  xField: 'x轴字段',
  yField: ['最小值字段', '最大值字段'],
  area: {
    style: {
      fill: '#color',
      fillOpacity: 0.5
    }
  }
}
```

## 词云 (Word Cloud)

词云用于显示文本数据中词语的出现频率。

**关键配置项**：
```javascript
{
  type: 'wordCloud',
  data: [...],
  wordField: '词语字段',
  weightField: '权重字段',
  colorField: '颜色字段',  // 可选
  wordCloud: {
    shape: 'circle',  // 形状
    fontFamily: 'Arial',
    fontWeight: 'normal',
    rotation: {
      from: -90,
      to: 90
    }
  }
}
```

## 仪表图 (Gauge Chart)

仪表图用于显示单个数值相对于指定范围的位置。

**关键配置项**：
```javascript
{
  type: 'gauge',
  data: [...],
  valueField: '数值字段',
  min: 0,
  max: 100,
  gauge: {
    startAngle: -Math.PI / 2,
    endAngle: Math.PI / 2,
    style: {
      fill: '#color'
    }
  },
  indicator: {
    visible: true
  }
}
```

## 矩形树图 (Treemap)

矩形树图用于显示层次结构数据的比例关系。

**关键配置项**：
```javascript
{
  type: 'treemap',
  data: [...],
  valueField: '数值字段',
  colorField: '颜色字段',  // 可选
  hierarchyField: ['层级1', '层级2', ...],
  label: {
    visible: true
  }
}
```

## 地图 (Map)

地图用于显示地理数据。

**关键配置项**：
```javascript
{
  type: 'map',
  geoData: {...},  // GeoJSON 数据
  data: [...],
  geoField: '地理字段',
  valueField: '数值字段',
  color: {
    range: ['#blue', '#red']  // 颜色范围
  },
  label: {
    visible: true
  }
}
```

## 雷达图 (Radar Chart)

雷达图用于显示多变量数据。

**关键配置项**：
```javascript
{
  type: 'radar',
  data: [...],
  categoryField: '分类字段',
  valueField: '数值字段',
  seriesField: '分组字段',  // 可选
  radar: {
    shape: 'polygon',  // 'circle' | 'polygon'
    axis: {
      visible: true
    }
  },
  area: {
    visible: true,
    style: {
      fillOpacity: 0.3
    }
  }
}
```

## 桑基图 (Sankey Diagram)

桑基图用于显示流量数据。

**关键配置项**：
```javascript
{
  type: 'sankey',
  data: {
    nodes: [...],
    links: [...]
  },
  nodeId: 'id字段',
  nodeWidth: 20,
  nodePadding: 10,
  nodeAlign: 'left', // 节点对齐方式(left/right/center)
  link: {
    gradient: true, // 启用链路渐变
    style: {
      opacity: 0.5,
      fill: (datum) => datum.type ? colorMap[datum.type] : '#999' // 根据类型设置颜色
    }
  },
  interactions: [
    {
      type: 'element-hover',
      hover: {
        fill: '#FF6B6B', // 节点悬停颜色
        stroke: '#FF6B6B'
      }
    }
  ]
}
```

## 进度图 (Progress Chart)

进度图用于显示完成进度。

**关键配置项**：
```javascript
{
  type: 'progress',
  data: [...],
  valueField: '数值字段',
  min: 0,
  max: 100,
  progress: {
    style: {
      fill: '#color',
      cornerRadius: 15,
      animation: {
        duration: 1000
      }
    }
  },
  track: {
    visible: true,
    style: {
      fill: 'rgba(0,0,0,0.1)'
    }
  }
},

// 环形进度图配置示例
{
  type: 'circularProgress',
  innerRadius: 0.8,
  outerRadius: 1,
  progress: {
    style: {
      fill: { gradient: 'conical', colors: ['#FFA500', '#FF4500'] }
    }
  },
  indicator: {
    visible: true,
    type: 'circle',
    size: 10
  }
}
```

## Circle Packing

Circle Packing 用于显示层次结构数据。

**关键配置项**：
```javascript
{
  type: 'circlePacking',
  data: [...],
  valueField: '数值字段',
  hierarchyField: ['层级1', '层级2', ...],
  padding: 2,  // 圆之间的间距
  label: {
    visible: true
  }
}
```

## 旭日图 (Sunburst Chart)

旭日图用于显示层次结构数据。

**关键配置项**：
```javascript
{
  type: 'sunburst',
  data: [...],
  valueField: '数值字段',
  hierarchyField: ['层级1', '层级2', ...],
  innerRadius: 0.2,
  label: {
    visible: true
  }
}
```

## 散点相关性图 (Correlation Chart)

散点相关性图用于显示多个变量之间的相关性。

**关键配置项**：
```javascript
{
  type: 'correlation',
  data: [...],
  fields: ['字段1', '字段2', ...],
  point: {
    style: {
      size: 5,
      fill: '#color'
    }
  }
}
```

## 水波图 (Liquid Chart)

水波图用于显示百分比数据。

**关键配置项**：
```javascript
{
  type: 'liquid',
  data: [...],
  valueField: '数值字段',
  min: 0,
  max: 100,
  liquid: {
    style: {
      fill: '#color'
    },
    wave: {
      count: 3,
      length: 192
    }
  }
}
```

## 马赛克图 (Mosaic Chart)

马赛克图用于显示分类数据之间的关系。

**关键配置项**：
```javascript
{
  type: 'mosaic',
  data: [...],
  xField: 'x轴字段',
  yField: 'y轴字段',
  colorField: '颜色字段',
  mosaic: {
    style: {
      stroke: '#color',
      lineWidth: 1
    }
  }
}
```

## 象形图 (Pictogram Chart)

象形图用于使用图标来表示数据。

**关键配置项**：
```javascript
{
  type: 'pictogram',
  data: [...],
  categoryField: '分类字段',
  valueField: '数值字段',
  pictogram: {
    symbol: 'circle',  // 或自定义 SVG 路径
    style: {
      fill: '#color'
    }
  }
}
```

## 3D 图表

VChart 支持多种 3D 图表类型，包括 3D 折线图、3D 面积图、3D 散点图、3D 柱状图、3D 词云图和 3D 漏斗图。

**3D 柱状图关键配置项**：
```javascript
{
  type: 'bar3d',
  data: [...],
  xField: 'x轴字段',
  yField: 'y轴字段',
  zField: 'z轴字段',
  bar3d: {
    style: {
      fill: '#color'
    }
  },
  camera: {
    position: [0, 0, 2]
  }
}
```

**3D 散点图关键配置项**：
```javascript
{
  type: 'scatter3d',
  data: [...],
  xField: 'x轴字段',
  yField: 'y轴字段',
  zField: 'z轴字段',
  sizeField: '大小字段',  // 可选
  colorField: '颜色字段',  // 可选
  point3d: {
    style: {
      size: 5,
      fill: '#color'
    }
  }
}
```

**3D 词云图关键配置项**：
```javascript
{
  type: 'wordCloud3d',
  data: [...],
  wordField: '词语字段',
  weightField: '权重字段',
  colorField: '颜色字段',  // 可选
  wordCloud3d: {
    shape: 'sphere',  // 形状
    fontFamily: 'Arial',
    fontWeight: 'normal'
  }
}
```

## 3D 面积图 (3D Area Chart)

3D 面积图是面积图的三维变种，用于在三维空间中展示数据的变化趋势。

**关键配置项**：
```javascript
{
  type: 'area3d',
  data: [...],
  xField: 'x轴字段',
  yField: 'y轴字段',
  zField: 'z轴字段',  // 3D图表特有的z轴字段
  seriesField: '分组字段',  // 可选
  area3d: {
    style: {
      fill: '#color',
      fillOpacity: 0.5
    }
  },
  line3d: {
    visible: true,
    style: {
      stroke: '#color',
      lineWidth: 2
    }
  },
  camera: {
    position: [0, 0, 2]  // 相机位置
  }
}
```

## 3D 饼图 (3D Pie Chart)

3D 饼图是饼图的三维变种，用于在三维空间中展示数据的比例关系。

**关键配置项**：
```javascript
{
  type: 'pie3d',
  data: [...],
  valueField: '数值字段',
  categoryField: '分类字段',
  outerRadius: 0.8,  // 外半径
  innerRadius: 0,    // 内半径，为0时是饼图，大于0时是环图
  pie3d: {
    style: {
      fill: '#color'
    },
    height: 30,  // 3D饼图的高度
    startAngle: 0,
    endAngle: Math.PI * 2
  },
  label: {
    visible: true,
    type: 'outer'  // 'inner' | 'outer' | 'spider'
  },
  camera: {
    position: [0, 0, 2]  // 相机位置
  }
}
```

## 3D 漏斗图 (3D Funnel Chart)

3D 漏斗图是漏斗图的三维变种，用于在三维空间中展示数据从一个阶段流向另一个阶段的过程。

**关键配置项**：
```javascript
{
  type: 'funnel3d',
  data: [...],
  categoryField: '分类字段',
  valueField: '数值字段',
  funnel3d: {
    style: {
      fill: '#color'
    },
    depth: 30,  // 3D漏斗图的深度
    isTransform: true  // 是否变形，true为漏斗形状，false为柱状
  },
  label: {
    visible: true
  },
  camera: {
    position: [0, 0, 2]  // 相机位置
  }
}
```

## 转化率漏斗图 (Conversion Funnel Chart)

转化率漏斗图是漏斗图的一种变体，专门用于展示用户在各个转化阶段的转化率和流失率。

**关键配置项**：
```javascript
{
  type: 'conversionFunnel',
  data: [...],
  categoryField: '阶段字段',
  valueField: '数值字段',
  conversionField: '转化率字段',  // 转化率数据字段
  funnel: {
    style: {
      fill: '#color'
    },
    isTransform: true  // 是否变形，true为漏斗形状，false为柱状
  },
  label: {
    visible: true,
    formatMethod: (text, datum) => `${text}: ${datum.value} (${datum.conversion}%)`  // 自定义标签格式
  },
  conversion: {
    visible: true,  // 是否显示转化率
    style: {
      fill: '#color',
      fontSize: 12
    }
  }
}
```

## TGI 柱图 (TGI Bar Chart)

TGI柱图是一种特殊的柱状图，用于展示目标群体指数(Target Group Index)，常用于市场分析和用户画像。

**关键配置项**：
```javascript
{
  type: 'tgiBar',
  data: [...],
  xField: 'x轴字段',
  yField: 'y轴字段',  // TGI值字段
  seriesField: '分组字段',  // 可选
  bar: {
    style: {
      fill: (datum) => {
        // 根据TGI值设置不同颜色
        return datum.tgi > 100 ? '#positive' : '#negative';
      },
      fillOpacity: 0.8
    }
  },
  baseline: {
    value: 100,  // TGI基准线，通常为100
    style: {
      stroke: '#color',
      lineWidth: 1,
      lineDash: [4, 4]
    }
  },
  label: {
    visible: true,
    formatMethod: (text, datum) => `${text}: ${datum.tgi}`  // 自定义标签格式
  }
}
```

## 韦恩图 (Venn Diagram)

韦恩图用于展示多个集合之间的交集和并集关系。

**关键配置项**：
```javascript
{
  type: 'venn',
  data: {
    values: [
      { sets: ['A'], value: 8 },
      { sets: ['B'], value: 10 },
      { sets: ['A', 'B'], value: 4 }
    ]
  },
  categoryField: 'sets',
  valueField: 'value',
  seriesField: 'sets',
  venn: {
    style: {
      fill: '#color',
      fillOpacity: 0.5
    }
  },
  legends: {
    visible: true,
    position: 'middle',
    orient: 'bottom'
  }
}
```

根据VChart官方支持的图表类型，现在我们已经列出了35种图表类型及其关键配置项。这些配置项可以帮助你快速上手各种图表的创建和定制。如需更详细的配置说明，建议查阅VChart官方文档。
