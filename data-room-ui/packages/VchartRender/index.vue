<template>
  <div
    style="width: 100%;height: 100%; position: relative;"
    class="bs-design-wrap bs-custom-component"
    :class="{'light-theme':customTheme === 'light','auto-theme':customTheme !=='light'}"
  >
    <button
      @click="copyConfig"
      style="position: absolute; top: 5px; right: 5px; z-index: 10;"
    >
      {{ copyButtonText }}
    </button>
    <pre style="color: red; white-space: pre-wrap; word-wrap: break-word; height: 100%; overflow: auto;">{{ config }}</pre>
  </div>
</template>
<script>
// 导入 insert-css 库，可能用于动态插入样式
import 'insert-css'
// 导入 lodash 的 cloneDeep 方法，用于深拷贝对象
import cloneDeep from 'lodash/cloneDeep'
// 导入 linkageMixins，处理组件间数据联动逻辑
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
// 导入 commonMixins，包含一些通用逻辑，如数据获取方法 (changeDataByCode, changeData)
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
// 导入 Vuex 的辅助函数，用于简化 state 和 mutations 的访问
import { mapState, mapMutations } from 'vuex'
// 导入主题格式化工具，用于将配置转换为主题样式
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
// 导入 lodash 库，提供各种工具函数
import _ from 'lodash'

// 导出 Vue 组件定义
export default {
  // 组件名称 (注意：这里应与文件名和期望的功能一致，可能需要改为 VchartRender)
    name: 'VchartCustomComponent',
  // 混入 mixins，继承它们的方法和属性
  mixins: [commonMixins, linkageMixins],
  // 定义组件接收的 props
  props: {
    // config 对象包含了组件的所有配置信息
    config: {
      type: Object, // 类型为对象
      default: () => ({}) // 默认值为空对象
    }
  },
  // 定义组件的响应式数据
  data () {
    return {
      // chart 实例，用于存储图表库（如 Echarts 或 VChart）的实例 (当前未使用)
      chart: null,
      // 标记是否有有效数据，用于控制渲染 (当前未使用)
      hasData: false,
      // 复制按钮的显示文本
      copyButtonText: 'Copy Config'
    }
  },
  // 计算属性
  computed: {
    // 使用 mapState 辅助函数从 Vuex 的 bigScreen 模块中映射 state
    ...mapState('bigScreen', {
      // 映射页面信息
      pageInfo: state => state.pageInfo,
      // 映射当前页面的自定义主题 ('light' 或 'dark')
      customTheme: state => state.pageInfo.pageConfig.customTheme,
      // 映射当前激活组件的 code
      activeCode: state => state.activeCode
    }),
    // chatId 计算属性已被移除
  },
  // 组件实例创建完成后的生命周期钩子
  created () {
    // 此处通常会调用 chartInit 初始化图表，但当前版本中可能被注释或移除
  },
  // 监听器
  watch: {
    // 监听 config 对象中 option.theme 属性的变化
    'config.option.theme': {
      // 处理器函数
      handler (val) {
        // 如果 theme 发生变化
        if (val) {
          // 调用 changeStyle 方法更新样式，并标记这是主题更新 (isUpdateTheme = true)
          this.changeStyle(this.config, true)
        }
      }
    }
    // 对 config 对象的深度监听已被移除
  },
  // 组件挂载到 DOM 后的生命周期钩子
  mounted () {
    // 此处通常会初始化 ECharts 实例并设置 ResizeObserver，但当前版本逻辑已被移除
  },
  // 组件销毁前的生命周期钩子
  // beforeDestroy () {
    // 此处通常会销毁图表实例和移除 ResizeObserver，但当前版本逻辑已被移除
  // },
  // 方法定义
  methods: {
    // 使用 mapMutations 辅助函数从 Vuex 的 bigScreen 模块中映射 mutations
    ...mapMutations('bigScreen', ['changeChartConfig', 'changeActiveItemConfig', 'changeChartLoading']),

    // 异步方法：复制 config 对象到剪贴板
    async copyConfig() {
      try {
        // 将 config 对象格式化为可读的 JSON 字符串 (缩进 2 空格)
        const configString = JSON.stringify(this.config, null, 2);
        // 使用浏览器 Clipboard API 写入文本
        await navigator.clipboard.writeText(configString);
        // 提供成功反馈
        this.copyButtonText = 'Copied!';
        // 1.5 秒后恢复按钮文本
        setTimeout(() => {
          this.copyButtonText = 'Copy Config';
        }, 1500);
      } catch (err) {
        // 捕获并打印错误
        console.error('Failed to copy config: ', err);
        // 提供失败反馈
        this.copyButtonText = 'Copy Failed';
        // 1.5 秒后恢复按钮文本
        setTimeout(() => {
          this.copyButtonText = 'Copy Config';
        }, 1500);
      }
    },

    // 初始化图表及数据的核心方法 (部分逻辑可能已移除)
    chartInit () {
      // 获取当前 config (注意：这里直接引用 this.config，后续修改应使用克隆)
      let config = this.config
      // 判断是首次加载/刷新 (code === key) 还是预览状态
      if (this.config.code === this.config.key || this.isPreview) {
        // 首次加载，先应用样式设置
        config = this.changeStyle(config)
        // 设置加载状态为 true
        config.loading = true
        // 更新 Vuex 中的加载状态
        this.changeChartLoading(config)
        // 调用 mixin 中的方法，根据 code 获取数据 (来自 list 接口)
        this.changeDataByCode(config).then((res) => {
          // 数据返回后，设置加载状态为 false
          config.loading = false
          // 更新 Vuex 中的加载状态
          this.changeChartLoading(config)
          // !! 注意：原有的 newChart(res) 调用已被移除，图表不会在此处初始化或更新 !!
        }).catch(() => {
          // 处理数据获取错误 (当前为空)
        })
      } else {
        // 非首次加载 (通常是配置变更导致 key 变化)，触发数据更新
        // 设置加载状态为 true
        config.loading = true
        // 更新 Vuex 中的加载状态
        this.changeChartLoading(config)
        // 调用 mixin 中的方法，根据当前 config 获取数据 (来自 chart 接口)
        this.changeData(config).then((res) => {
          // 数据返回后，设置加载状态为 false
          config.loading = false
          // 更新 Vuex 中的加载状态
          this.changeChartLoading(config)
           // !! 注意：原有的 newChart(res) 调用已被移除，图表不会在此处初始化或更新 !!
        })
      }
    },

    // 注册图表事件的方法 (依赖 this.chart 实例，当前版本下无法正常工作)
    registerEvent () {
      // 用于存储 tooltip 变化时的数据，可能用于联动
      let formData = {}
      // 监听 tooltip 内容变化事件 (注意: 这是 Echarts 特有事件，VChart 可能需要不同事件名)
      this.chart.on('tooltip:change', (...args) => {
        formData = {}
        // 深拷贝 tooltip 相关数据 (具体数据结构依赖图表库)
        formData = cloneDeep(args[0].data.items[0].data)
      })
      // 监听绘图区域点击事件 (注意: VChart 可能使用不同的事件名或参数结构)
      this.chart.on('plot:click', (...args) => {
        // 调用 linkage mixin 中的方法，触发数据联动
        this.linkage(formData)
      })
    },

    // 将 setting 配置应用到 option 对象的核心方法
    transformSettingToOption (config, type) {
      // option 变量用于临时存储遍历过程中的对象层级 (初始化为 null)
      let option = null
      // 遍历 config.setting 数组 (来自组件配置文件的 setting)
      config.setting.forEach(set => {
        // 只处理定义了 optionField 的设置项
        if (set.optionField) {
          // 将 optionField 字符串按 '.' 分割成路径数组 (e.g., 'series.barColor.label.show' -> ['series', 'barColor', 'label', 'show'])
          const optionField = set.optionField.split('.')
          // 获取 config.option 对象
          option = config.option // !! 注意：此处应确保 config.option 存在且为对象 !!
          // 特殊处理 xAxis 配置 (假设配置目标是 xAxis 数组的第一个元素)
          if (optionField[0] === 'xAxis') {
            optionField.forEach((field, index) => {
              if (index === 0) {
                // 定位到 xAxis 数组的第一个元素
                option = option.xAxis[0] // !! 潜在风险：如果 option.xAxis 不存在或是空数组会报错 !!
              } else if (index === optionField.length - 1) {
                // 到达路径的最后一个字段，准备赋值
                // 检查是否满足赋值条件 (tabName 匹配，且是 'custom' 类型 或 ('data' 类型且有值))
                if ((set.tabName === type && type === 'data' && set.value) || (set.tabName === type && type === 'custom')) {
                  option[field] = set.value // 赋值
                }
              } else {
                // 向下遍历路径
                option = option[field] // !! 潜在风险：如果中间路径不存在会报错 !!
              }
            })
          // 特殊处理 series 配置 (涉及根据 id 过滤和修改数组元素)
          } else if (optionField[0] === 'series') {
            let changeObject = [] // 存储需要修改的 series 项
            let beforeChange = [] // 存储修改前的 series 项副本
            optionField.forEach((field, index) => {
              if (index === 0) {
                // 定位到 series 数组
                option = option[field] // !! 潜在风险：如果 option.series 不存在或不是数组会报错 !!
              } else if (index === 1) {
                // 根据路径第二部分 (通常是 id 的一部分，如 'barColor') 筛选 series 项
                changeObject = option.filter(item => item.id.includes(field)) // !! 潜在风险：如果 item.id 不存在会报错 !!
                beforeChange = [...changeObject] // 复制筛选出的项
                // 从原数组中移除这些项 (这种修改原数组的方式可能不健壮)
                option = option.filter(item => !(item.id.includes(field)))
              } else if (index === optionField.length - 1) {
                 // 到达路径的最后一个字段，准备赋值
                if ((set.tabName === type && type === 'data' && set.value) || (set.tabName === type && type === 'custom')) {
                   // 对筛选出的每个 series 项应用修改
                  changeObject.map(item => {
                    item[field] = set.value // !! 潜在风险：如果 item[field] 的父路径不存在会报错 !!
                  })
                }
              } else {
                // 向下遍历路径 (这里逻辑似乎有问题，修改的是 changeObject 内部结构，而不是直接赋值)
                const changeResult = []
                changeObject.forEach(item => {
                  // 尝试深拷贝下一层级的对象
                  const result = { ...item[field] } // !! 潜在风险：item[field] 可能不存在 !!
                  changeResult.push(result)
                })
                changeObject = [...changeResult] // 替换 changeObject 为下一层级的对象数组
              }
            })
             // 将修改后的 series 对象合并回原数组 (这里逻辑复杂且可能出错)
             // 尝试将 changeObject (可能已变成下一层级的对象) 的属性赋给 beforeChange 对应项的 label?
            changeObject.forEach(
              (item, index) => {
                beforeChange[index].label = _.cloneDeep(item) // ?? 这里的意图可能是修改 label 对象
                option.push(beforeChange[index]) // 将修改后的原始项加回 option 数组
              }
            )
          // 特殊处理 graphic 配置 (假设是修改所有 children 的 style.fill)
          } else if (optionField[0] === 'graphic') {
             // 直接修改 graphic.children 下所有元素的 style.fill
            option.graphic.children.forEach(item => { // !! 潜在风险：option.graphic 或 children 可能不存在 !!
              item.style.fill = set.value // !! 潜在风险：item.style 可能不存在 !!
            })
          } else {
            // 处理通用路径
            optionField.forEach((field, index) => {
              if (index === optionField.length - 1) {
                 // 到达路径末端，赋值
                if ((set.tabName === type && type === 'data' && set.value) || (set.tabName === type && type === 'custom')) {
                  option[field] = set.value // !! 潜在风险：父路径可能不存在 !!
                }
              } else {
                // 向下遍历
                option = option[field] // !! 潜在风险：中间路径可能不存在 !!
              }
            })
          }
        }
      })
      // 返回修改后的 config 对象
      return config
    },

    // 格式化数据并应用到 config (部分逻辑已被移除)
    dataFormatting (config, data) {
      // 假设 data 是包含 success 标志和实际数据的对象
      if (data.success) {
        // 获取实际数据
        data = data.data
        // 如果定义了数据处理脚本
        if (config.dataHandler) {
          try {
            // !! 注意：使用 eval 执行外部脚本存在严重安全风险 !!
            // 应该寻找更安全的替代方案，如 new Function() 或 Web Workers
            eval(config.dataHandler) // data 变量在 eval 的作用域中可用
          } catch (e) {
            // 打印脚本执行错误
            console.error(e)
          }
        }
        // 将原始数据存储到 option 中
        config.option.rawData = data
        // 应用 tabName 为 'data' 的设置项到 option
        config = this.transformSettingToOption(config, 'data')
      }
      // 返回处理后的 config 对象
      return config
    },

    // 当样式设置改变时调用此方法
    changeStyle (config, isUpdateTheme) {
      // 浅拷贝传入的 config 和 this.config 合并 (注意：深层对象仍是引用)
      config = { ...this.config, ...config }
      // 应用 tabName 为 'custom' (样式) 的设置项到 option
      config = this.transformSettingToOption(config, 'custom')
      // 获取 option 和 setting 的引用
      const option = config.option
      const setting = config.setting
      // 如果定义了配置处理脚本
      if (this.config.optionHandler) {
        try {
           // !! 注意：使用 eval 执行外部脚本存在严重安全风险 !!
          eval(this.config.optionHandler) // option 和 setting 变量在 eval 的作用域中可用
        } catch (e) {
          // 打印脚本执行错误
          console.error(e)
        }
      }
      // !! 注意：原有的 seriesStyle 调用已被移除 !!

      // 如果不是主题更新触发的，则生成并保存主题配置
      if (!isUpdateTheme) {
        // 调用主题格式化工具，并将结果存入 config.theme
        config.theme = settingToTheme(_.cloneDeep(config), this.customTheme)
      }
      // 更新 Vuex 中的图表配置 (非激活状态的图表)
      this.changeChartConfig(config)
      // 如果当前组件是激活状态
      if (config.code === this.activeCode) {
        // 更新 Vuex 中激活项的配置
        this.changeActiveItemConfig(config)
      }
      // 如果图表实例存在 (当前版本 chart 通常为 null)
      if (this.chart) {
        // 更新图表实例的 option (注意：VChart 需要调用 updateSpec)
        this.chart.setOption(config.option)
      }
      // 返回修改后的 config 对象
      return config
    }
  }
}
</script>

<style lang="scss" scoped>
.light-theme{
  background-color: #ffffff;
  color: #000000;
}
.auto-theme{
  background-color: transparent;
}

</style>
