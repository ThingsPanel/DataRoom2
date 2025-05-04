# VChart Spec 结构总结 (基于示例分析)

通过分析 `area`, `bar`, `boxPlot`, `circlePacking`, `circularProgress`, `common`, `conversionFunnel`, `correlation`, `funnel`, `gauge`, `histogram`, `line`, `linearProgress`, `liquid`, `map`, `mosaic`, `pie`, `rose`, `sankey`, `scatter` (包括 3D), `sequence`, `sequenceScatterKDE`, `sunburst`, `treemap`, `venn`, `waterfall`, `wordCloud` 图表示例，可以总结出 VChart `spec` 对象的一些关键结构和配置方式：

## 1. 顶层配置

*   **`type`**: (必需) 定义图表的基本类型。
    *   标准类型示例: `'area'`, `'bar'`, `'boxPlot'`, `'circlePacking'`, `'circularProgress'`, `'funnel'`, `'gauge'`, `'histogram'`, `'line'`, `'linearProgress'`, `'map'`, `'pie'`, `'rose'`, `'sankey'`, `'scatter'`, `'sequence'`, `'sunburst'`, `'treemap'`, `'waterfall'`, `'wordCloud'`, `'heatmap'`, `'common'`。
    *   扩展类型示例: `'conversionFunnel'`, `'correlation'`, `'liquid'`, `'mosaic'`, `'sequenceScatterKDE'`, `'venn'` (通常需要注册)。
*   **`data`**: (必需) 定义图表所需的数据源 (数组形式)。
    *   每个数据源对象有 `id` (可选) 和 `values`。
        *   `id` 用于在系列配置中通过 `dataId` 引用。
        *   `values` 可以是扁平数组, 嵌套结构 (`circlePacking`, `sunburst`, `sankey`, `treemap`), 多维数组 (`player`), 或包含 `x0`, `x1` 的直方图数据, 或单个值 (`liquid`), 或地理空间数据, 或时序事件数据 (`sequence`), 或韦恩图数据 (`venn` - `{sets: [], value: ...}`), 或瀑布图数据 (包含 `total: true` 标记)。
*   **字段映射**: (顶层或系列内部) 根据图表类型映射数据字段。
    *   **顶层快捷方式:**
        *   直角坐标系: `xField`, `yField`。
        *   直方图: `xField`, `x2Field`, `yField`。
        *   极坐标系 (`pie`, `circularProgress`, `gauge`, `correlation`, `rose`, `sunburst`): `categoryField`, `valueField`, `seriesField` (适用时)。
        *   漏斗图: `categoryField`, `valueField`。
        *   瀑布图 (`waterfall`): `xField`, `yField` (增量值)。
        *   水波图: `valueField`。
        *   词云 (`wordCloud`): `nameField`, `valueField`, `seriesField` (可选)。
        *   桑基图: `categoryField` (节点名), `valueField` (链接值)。
        *   马赛克图: `xField`, `yField`, `seriesField`。
        *   韦恩图 (`venn`): `categoryField` (映射到 `sets`), `valueField`。
        *   地图: `nameField`, `valueField`, `nameProperty`。
        *   箱型图: `xField`, `minField`, `q1Field`, `medianField`, `q3Field`, `maxField`。
        *   层次/关系图 (`circlePacking`, `correlation`, `treemap`): `categoryField`, `valueField`, `sizeField` (`correlation`)。
        *   热力图: `xField`, `yField`, `valueField`。
        *   3D 散点图: `xField`, `yField`, `zField`。
    *   **系列内部指定 (适用于 `common`, `sequence`):** 在 `series` 数组内指定。
*   **尺寸映射 (适用于 `correlation`, 3D `scatter` 等):** `sizeField`, `sizeRange`。
*   **`seriesField`**: (顶层或系列内部) 用于区分不同系列。
*   **`direction`**: 控制方向 (`'horizontal'`, `'vertical'`)。
*   **半径与角度 (极坐标系):** `outerRadius`, `innerRadius`, `startAngle`, `endAngle`。
*   **地图特定配置 (`map`):** `map`。
*   **桑基图特定配置 (`sankey`):** `nodeGap`, `nodeWidth`, `nodeAlign`, `iterations`。
*   **旭日图/矩形树图特定配置 (`sunburst`, `treemap`):** `gap`, `drill`。
*   **瀑布图特定配置 (`waterfall`):** `seriesFieldName` (自定义增/减/总计图例名), `total` (配置总计计算方式)。

## 2. 系列与图元配置

通常通过图表类型同名的顶层 key 或 `series` 数组进行配置。

*   **`series` 数组**: 当 `type` 为 `'common'` 或 `'sequence'` 时必需。
    *   `sequence` 类型包含 `bar`, `dot`, `link` 等多种系列类型。
        *   `bar` 系列: `barTitle`。
        *   `dot` 系列: `dataId`, `xField` (`event_time`), `yField` (`id`), `seriesGroupField`, `titleField`, `subTitleField`, `dotTypeField`, `highLightSeriesGroup`, `clipHeight`, `symbol`, `title`, `subTitle` 配置。
        *   `link` 系列: `dataId`, `dotSeriesIndex`, `fromField`, `toField`, `dotTypeField`。
*   **通用系列/图元配置:** `label`, `style`, `state`。
*   **特定图表类型配置:**
    *   **`sankey`**: `node`, `link` 的 `style` 和 `state`。
    *   **`histogram`**: `bar.style`。
    *   **`funnel`, `conversionFunnel`**: `shape`, `funnelAlign`, `maxSize`, `isTransform`, `funnelBackground`, `outerLabel`, `transformLabel`, `conversionArrow`。
    *   **`gauge`**: 段落颜色、指针等。
    *   **`correlation`**: `nodePoint`, `centerPoint`, `centerLabel`。
    *   **`scatter`**: `point.style`, `point.state` (3D 需 `options3d`)。
    *   **`pie`, `circularProgress`, `sunburst`**: `cornerRadius`, `roundCap`, `progress`, `background`, `drill`, `gap`。
    *   **`linearProgress`**: `bandWidth`, `cornerRadius`。
    *   **`liquid`**: 水波颜色、形状、轮廓等。
    *   **`map`**: `area.style.fill`。
    *   **`mosaic`**: `percent`, `label` (多标签, `filterByGroup`, `smartInvert`)。
    *   **`venn`**: `circle`, `overlap` 的 `style` 和 `state`。
    *   **`waterfall`**: `stackLabel` (总计标签)。
    *   **`rose`**: `label.layout.tangentConstraint`。
    *   **`heatmap`**: `cell.style`。

## 3. 组件 (Component) 配置

*   **`axes`**: 常用属性: `orient`, `visible`, `type`, `grid`, `domainLine`, `label`, `title`, `tick`, `seriesId`, `mode` (`'3d'`)。
*   **`legends`**: 常用属性: `visible`, `orient`, `position`, `type`, `field`, `title`, `data` (函数式自定义图例项)。
*   **`tooltip`**: 常用属性: `visible`, `dimension`, `mark.title`, `mark.content`, `mark.updateContent` (函数式更新内容)。
*   **`crosshair`**: `xField`/`yField` 下的 `visible`, `line`, `label`。
*   **`title`**: `visible`, `text`, `subtext`, `padding`, `subtextStyle`。
*   **`player`**: `auto`, `loop`, `alternate`, `interval`, `type`, `specs`。
*   **`indicator`**: `visible`, `trigger`, `title`, `content`。
*   **`dataZoom`**: (数组) `orient`, `xAxisIndex`/`yAxisIndex`, `regionIndex`, `start`/`end`/`startValue`/`endValue`, `startText`/`endText`。
*   **`scrollBar`**: (数组) `visible`, `start`/`end`, `roam`, `filterMode`, `regionIndex`, `axisIndex`。
*   **`infoLabel`**: (`sequenceScatterKDE`) `visible`, `style`。
*   **漏斗图特定**: `funnelBackground`, `outerLabel`, `transformLabel`, `conversionArrow`。

## 4. 区域 (Region) 配置 (`region` 数组)

*   `id`, `width`, `height`, `offsetX`, `offsetY`, `padding`。
*   **地图特定**: `roam`, `projection`。

## 5. 颜色与比例尺 (`color`)

*   `type`, `domain`, `range`, `specified`。

## 6. 布局与动画

*   `layoutPadding`。
*   `animation...`, `duration`, `delay`, `easing`。

## 7. 自定义标记 (`customMark` 数组)

*   `type`, `dataId`, `style` (可为函数)。

## 8. 扩展与注册

*   一些图表类型 (如 `conversionFunnel`, `correlation`, `liquid`, `mosaic`, `sequenceScatterKDE`, `venn`) 可能需要从特定包导入并执行注册函数。
*   地图类型 (`map`) 需要先使用 `VChart.registerMap(name, geoJson)` 注册 GeoJSON 数据。
*   3D 图表需要 `register3DPlugin()`。

## 9. 3D 配置

*   在 `axes` 中设置 `mode: '3d'`。
*   在 VChart 构造函数 `options3d` 中设置 `enable: true`, `enableView3dTransform: true`, `center` 等。

## 总结 (绝对最终版)

VChart spec 提供了从基础图表到复杂、可交互、动态和可扩展可视化的全面配置能力。

*   支持丰富的内置图表类型，并可通过扩展添加新类型。
*   `common` 和 `sequence` 类型结合 `series` 和 `region` 数组提供了强大的组合和布局能力。
*   支持 3D 渲染。
*   细粒度的组件配置允许高度定制化。
*   数据、系列、区域、组件通过 `id` 关联。
*   支持动态计算属性 (函数值) 和自定义绘制。
*   特定图表类型拥有独特的配置项和可能需要注册的步骤。 