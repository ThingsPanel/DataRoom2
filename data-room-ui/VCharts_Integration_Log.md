# VChart 集成 - Vcharts 目录文件分析与状态

## 目标

在现有应用中集成 VChart 图表渲染能力，使其模式与已有的 G2Plot 和 Echarts 实现对齐。

## `packages/Vcharts` 目录文件详细分析

1.  **`images/V基础柱状图.png` (文件/资源)**:
    *   **作用**: 作为 "V基础柱状图" 在左侧组件选择面板中显示的预览缩略图。
    *   **关联**: 由 `vchartList.js` 根据 `V基础柱状图.js` 的 `title` 动态加载。
    *   **状态**: 依赖用户手动放置并正确命名此文件。

2.  **`vchartList.js` (文件)**:
    *   **作用**: VChart 图表列表的核心构建器。
        *   **导入**: `cloneDeep`, `vchartListSort`, 以及 `dataConfig`, `settingConfig` (来自 `../VchartRender/settingConfig`)。
        *   **扫描配置**: 使用 `require.context` 扫描 `基础图表/` 等子目录下的 `.js` 配置文件。
        *   **构建与标准化**: 遍历加载的配置，根据 `vchartListSort.js` 排序，并为每个图表创建标准对象，包含元信息 (`name`, `title`, `type: 'vchartComponent'`, `w`, `h` 等)，动态加载预览图 `img`，设置 `className` 等。
        *   **配置合并**: 将图表自身的 `option` (包含图表规格) 与导入的 `settingConfig` 合并到最终对象的 `option` 字段；将 `dataConfig` 合并到根级。
        *   **导出**: 过滤空项后导出有序的图表对象列表。
    *   **状态**: 结构清晰，遵循项目模式。**核心依赖** `../VchartRender/settingConfig` 文件 (待处理)。

3.  **`vchartListSort.js` (文件)**:
    *   **作用**: 提供字符串数组，精确控制 VChart 图表在左侧列表的显示顺序。
    *   **状态**: 当前包含 `'V基础柱状图'`。

4.  **`基础图表/` (目录)**:
    *   **作用**: 存放具体的 VChart 图表配置文件。
    *   **状态**: 当前包含 `V基础柱状图.js`。

5.  **`基础图表/V基础柱状图.js` (文件)**:
    *   **作用**: 定义 "V基础柱状图" 的配置数据。
        *   **元数据**: 导出 `version`, `title`, `name`, `type: 'vchartComponent'`。
        *   **右侧配置 (`setting`)**: (已简化) 包含 "维度"(`xField`), "指标"(`yField`), "柱子宽度"(`seriesCustom_barWidth`) 的定义，`optionField` 指向 `option` 内对应路径。
        *   **图表规格 (`option`)**: (已简化) **核心配置对象 (遵循规定：此字段名为 `option`，但承载 VChart spec)**。包含图表类型、数据映射、基础视觉元素（坐标轴、系列）及项目特定配置 (`seriesCustom.barWidth`)。
        *   **处理器**: 导出空的 `optionHandler`, `dataHandler` 占位符。
    *   **状态**: 配置已简化，`setting` 与 `option` 路径对应。其内容作为通用的图表配置数据，可被 VChart 渲染器解析。

6.  **`settings.js` (文件)**:
    *   **作用**: 聚合所有 VChart 图表的右侧面板配置 (`setting`)。
        *   使用 `require.context` 扫描图表配置。
        *   提取每个图表的 `setting` 和 `name`。
        *   导出包含 `{ setting: config.setting, name: config.name }` 对象的 `vchartSettings` 数组，供右侧设置面板等使用。
    *   **状态**: 代码逻辑正确，能聚合当前所有图表设置。

## 核心规定与注意事项

1.  **配置字段名**: **所有 VChart 图表的规格定义在 `.js` 配置文件中都必须放在名为 `option` 的字段里导出**。(此为项目规定，渲染器需适配)
2.  **渲染时转换**: 渲染组件 (`VchartRender`) 需从配置对象的 `option` 字段读取 VChart 规格，并将其赋给 VChart 实例的 `spec` 属性 (e.g., `vchartInstance.updateSpec(config.option)`)。
3.  **配置联动**: 图表配置中 `setting` 数组里的 `optionField` 必须准确指向 `option` 对象中对应的路径，以保证右侧面板修改生效。

## 当前状态

`packages/Vcharts` 目录的基础配置框架已基本就绪，遵循项目模式，包含一个简化后的 VChart 图表配置实例。数据和配置准备阶段完成。

## 下一步计划

1.  处理 `vchartList.js` 对 `VchartRender/settingConfig` 的依赖。
2.  实现 VChart 渲染组件 `VchartRender/index.vue`，包括处理 `option` 到 `spec` 的读取与应用逻辑。 