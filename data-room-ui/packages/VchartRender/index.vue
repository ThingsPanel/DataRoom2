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
    <VchartCore :spec="internalSpec" />
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
// !! 1. 确保 VchartCore 子组件被引入 !!
import VchartCore from './VchartCore/index.vue'
// 导入 lodash 的 debounce 方法
import debounce from 'lodash/debounce' // 引入 debounce

// 辅助函数：安全地设置深层嵌套对象的值
function setDeepValue (obj, path, value) {
  if (!obj || typeof path !== 'string') {
    // console.error('Invalid arguments for setDeepValue');
    return
  }
  const keys = path.split('.')
  let current = obj

  try { // 添加 try...catch 块增加健壮性
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      const nextKey = keys[i + 1]
      const isNextKeyNumeric = /^\d+$/.test(nextKey) // 检查下一个键是否是数字（数组索引）

      // 如果当前键不存在或不是对象/数组，则创建它
      if (current[key] === undefined || current[key] === null || typeof current[key] !== 'object') {
        current[key] = isNextKeyNumeric ? [] : {}
      }

      current = current[key]

      // 如果路径期望的是数组但实际不是，或反之，尝试修正 (简化)
      if (isNextKeyNumeric && !Array.isArray(current)) {
         // console.warn(`Path expects array at ${key}, but found ${typeof current}. Attempting to correct.`);
         // 尝试从当前对象中找到之前的键来重新创建数组
         // 这个逻辑很复杂，暂时跳过深度修正，依赖于初始 spec 结构基本正确
         // 或者，如果 current 是空对象，可以直接替换为数组
         if (Object.keys(current).length === 0) {
           current = [];
           // 需要将这个新数组重新赋值给上一级
           let parent = obj;
           for(let j = 0; j < i; j++) parent = parent[keys[j]];
           parent[key] = current;
         } else {
            // console.error(`Cannot automatically correct path type mismatch at ${key}`);
             return; // 无法修正，提前退出
         }

      } else if (!isNextKeyNumeric && Array.isArray(current)) {
        // console.warn(`Path expects object at ${key}, but found array. This might lead to errors.`);
        // 同样，自动修正很复杂，暂时跳过
      }
    }

    const lastKey = keys[keys.length - 1]
    if (current && typeof current === 'object') {
       // 特殊处理数字键，确保它们被正确地用作数组索引或对象键
       if (/^\d+$/.test(lastKey) && Array.isArray(current)) {
         current[parseInt(lastKey, 10)] = value;
       } else {
         current[lastKey] = value;
       }
    } else {
       // console.error(`Cannot set property ${lastKey} on non-object target:`, current);
    }
  } catch (error) {
     // console.error(`Error setting deep value for path "${path}":`, error);
  }
}

// 导出 Vue 组件定义
export default {
  // !! 1. 确保组件名称正确 !!
  name: 'VchartRender',
  // !! 1. 确保 VchartCore 组件被注册 !!
  components: {
    VchartCore
  },
  // 混入 mixins，继承它们的方法和属性
  mixins: [commonMixins, linkageMixins],
  // 定义组件接收的 props
  props: {
    // config 对象包含了组件的所有配置信息
    config: {
      type: Object, // 类型为对象
      required: true
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
      copyButtonText: 'Copy Config',
      // !! 将 internalSpec 清空 !!
      internalSpec: null, // 设置为 null
      isNoData: true // 新增 isNoData 标志
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
    // 深度监听 config 对象的变化
    config: {
      handler: debounce(function (newConfig) { // 使用 debounce 防抖
        // 在这里调用处理 config 变化的函数，例如生成新的 spec
        // console.log('Config changed (debounced):', newConfig);
        this.updateInternalSpec(newConfig); // 调用 spec 更新方法
      }, 300), // 300ms 延迟
      deep: true // 深度监听
    }
    // 对 config 对象的深度监听已被移除
  },
  // 组件挂载到 DOM 后的生命周期钩子
  mounted () {
    // !! 打印传入的 config prop !!
    this.updateInternalSpec(this.config)
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

    // 新增：生成 VChart Spec 的核心逻辑
    generateVChartSpec (config) {
      if (!config || !config.option || !config.chartType) { // 添加对 chartType 的检查
        // console.error('Cannot generate spec: config, config.option or config.chartType is missing.')
        return null
      }

      // 1. 深拷贝基础 option 作为 spec 起点
      const spec = cloneDeep(config.option)

      // !! 强制使用 config.chartType 更新 spec 类型 !!
      spec.type = config.chartType;
      if (spec.series && Array.isArray(spec.series) && spec.series.length > 0) {
        // 假设是单系列，更新第一个系列的类型
        spec.series[0].type = config.chartType;
        // 如果是面积图，确保 area 和 line 也存在于 series[0]
        if (config.chartType === 'area' && !spec.series[0].area) {
            spec.series[0].area = { style: {} }; // 初始化 area 结构
        }
        if (config.chartType === 'area' && !spec.series[0].line) {
            spec.series[0].line = { style: {} }; // 初始化 line 结构
        }
         // 如果是柱状图，确保 bar 也存在于 series[0]
         if (config.chartType === 'bar' && !spec.series[0].bar) {
             spec.series[0].bar = { style: {} }; // 初始化 bar 结构
         }
          // 如果是折线图，确保 line 和 point 也存在于 series[0]
         if (config.chartType === 'line' && !spec.series[0].line) {
             spec.series[0].line = { style: {} }; // 初始化 line 结构
         }
         if (config.chartType === 'line' && !spec.series[0].point) {
             spec.series[0].point = { style: {} }; // 初始化 point 结构
         }
      } else {
           // 如果 series 不存在，可能需要根据 chartType 初始化一个基础 series 结构
           spec.series = [{ type: config.chartType, id: 'series0' }];
           // 根据类型添加必要的子结构
           if(config.chartType === 'bar') spec.series[0].bar = { style: {} };
           if(config.chartType === 'line') {
                spec.series[0].line = { style: {} };
                spec.series[0].point = { style: {} };
           }
           if(config.chartType === 'area') {
                spec.series[0].area = { style: {} };
                spec.series[0].line = { style: {} };
                spec.series[0].point = { style: {} };
           }
           // console.warn('spec.series was missing or invalid, initialized based on chartType.');
      }


      // 2. 处理数据
      // a. 确定 xField 和 yField (优先使用 setting 中的值)
      const xFieldSetting = config.setting?.find(s => s.field === 'xField' && s.tabName === 'data');
      const yFieldSetting = config.setting?.find(s => s.field === 'yField' && s.tabName === 'data');
      const finalXField = xFieldSetting?.value || spec.xField;
      const finalYField = yFieldSetting?.value || spec.yField;

      // b. 更新 spec 中的 xField 和 yField
      spec.xField = finalXField;
      spec.yField = finalYField;

      // c. Process data ONLY from config.option.rawData
      let currentDataValues = []; // Initialize as empty
      // Data now *always* comes from rawData (either default or bound)
      if (config.option.rawData && Array.isArray(config.option.rawData) && finalXField && finalYField) {
          // Map data using selected fields
          // Check rawData length
          if (config.option.rawData.length > 0) {
            currentDataValues = config.option.rawData.map(item => ({
                [finalXField]: item[finalXField],
                [finalYField]: item[finalYField]
            }));
          } else {
             // rawData is an empty array, currentDataValues remains []
          }
      } else {
        // rawData is missing, null, or not an array, currentDataValues remains []
        // console.warn('config.option.rawData is missing or invalid. Data values will be empty.');
      }

      // d. Assign processed data back to spec.data
      // Ensure spec.data structure is correct: [{ id: '...', values: [...] }]
      // Get ID from config.option.data (which was set up in vchartList.js)
      const originalDataId = config.option.data?.[0]?.id || 'dataDefault'; // Get the ID

      // Ensure spec.data is an array
      if (!spec.data || !Array.isArray(spec.data)) {
          spec.data = [];
      }
      // Ensure spec.data has at least one element
      if (spec.data.length === 0) {
          spec.data.push({}); // Add an empty object if array is empty
      }

      // Update the first data source object definitively
      spec.data[0].id = originalDataId;
      spec.data[0].values = currentDataValues; // Assign the processed values

      // 3. 应用 setting 中的配置到 spec
      if (config.setting && Array.isArray(config.setting)) {
        config.setting.forEach(settingItem => {
          // 只处理 tabName 为 'custom' 或 'data' 且有 optionField 的设置项
          if (settingItem.optionField && (settingItem.tabName === 'custom' || settingItem.tabName === 'data')) {
             // 对 'data' 类型，只应用 xField 和 yField (因为它们的值直接来自 setting)
             const isDataFieldSetting = settingItem.tabName === 'data' && (settingItem.field === 'xField' || settingItem.field === 'yField');
             // 对 'custom' 类型，或非字段选择的 'data' 类型（如果未来有的话）应用值
             const shouldApplyValue = settingItem.tabName === 'custom' ||
                                      (settingItem.tabName === 'data' && !isDataFieldSetting && settingItem.value !== undefined && settingItem.value !== null && settingItem.value !== '');

             if (isDataFieldSetting) {
                 // xField 和 yField 已经在步骤 2 中处理过，这里跳过，避免覆盖
             } else if (shouldApplyValue) {
                 // 使用辅助函数安全地设置值
                 setDeepValue(spec, settingItem.optionField, settingItem.value)
             }
          }
        })
      } else {
         // console.warn('Config.setting is missing or not an array.');
      }

      // 4. 处理特殊配置
      // a. 主题 - 现在由 setting 和 setDeepValue 处理，移除下面这行
      // spec.theme = config.customize?.theme || this.customTheme || 'light'

      // b. 处理堆叠配置 (VChart spec 中 stack 通常在顶层，但也可能在 series 内)
      const stackSetting = config.setting?.find(s => s.field === 'stack');
      if (stackSetting && stackSetting.optionField === 'stack') { // 确保 optionField 正确
        spec.stack = stackSetting.value;
         // 同步 series 内的 stack (如果 series 存在且是 bar 类型)
         if (Array.isArray(spec.series)) {
             spec.series.forEach(s => {
                 if(s.type === 'bar'){ // 假设仅对 bar series 设置 stack
                     s.stack = stackSetting.value;
                 }
             });
         }
      } else {
          // 如果 setting 中没有 stack 配置，确保 spec 中没有残留的 stack: true/false
          // delete spec.stack; // 或者根据默认 option 决定是否删除
      }

      // c. 修正之前发现的 barCornerRadius 问题
      const cornerRadiusSetting = config.setting?.find(s => s.field === 'barCornerRadius');
      if (cornerRadiusSetting && cornerRadiusSetting.optionField === 'series.0.bar.style.cornerRadius') {
          // 确保 series[0].label.cornerRadius 不存在或被删除 (如果之前误加了)
           if (spec.series && spec.series[0] && spec.series[0].label && spec.series[0].label.cornerRadius !== undefined) {
               delete spec.series[0].label.cornerRadius;
           }
           // 使用 setDeepValue 确保路径存在并赋值
           setDeepValue(spec, 'series.0.bar.style.cornerRadius', cornerRadiusSetting.value);
      }

      // 5. 清理非 VChart spec 属性
      delete spec.displayOption // 这个通常是配置面板使用的
      // delete spec.comType // 这个是我们内部逻辑用的类型标识, 但 setDeepValue 可能需要它？检查一下
      delete spec.rawData // 原始数据，不需要在最终 spec 里

      // !! 确保 series 结构完整性 (补充可能因 clone 或 setDeepValue 丢失的部分) !!
      // 再次检查 series 类型和必要结构 (基于上面强制类型设置后的补充)
      if (spec.series && Array.isArray(spec.series) && spec.series.length > 0) {
          const series0 = spec.series[0];
          if (series0.type === 'area') {
              if (!series0.area) series0.area = { style: {} };
              if (!series0.line) series0.line = { style: {} };
              if (!series0.point) series0.point = { style: {} }; // 面积图也可能有 point
          } else if (series0.type === 'line') {
              if (!series0.line) series0.line = { style: {} };
              if (!series0.point) series0.point = { style: {} };
          } else if (series0.type === 'bar') {
              if (!series0.bar) series0.bar = { style: {} };
          }
      }

      // !! 在返回前打印最终的 spec 对象 (格式化输出) !!
      console.log('Generated VChart Spec:', JSON.stringify(spec, null, 2));
      return spec
    },

    // 更新 internalSpec 的方法
    updateInternalSpec (config) {
      const newSpec = this.generateVChartSpec(config) // 调用 spec 生成函数
      if (newSpec) {
        this.internalSpec = newSpec
        // 根据生成后的 spec 数据更新无数据状态
        this.isNoData = !newSpec.data || !newSpec.data.values || newSpec.data.values.length === 0;
      } else {
        // 处理生成失败的情况
        this.isNoData = true; // 无法生成 spec，标记为无数据
        this.internalSpec = null; // 清空 spec
      }
       // console.log('Update internal spec called with:', config); // 临时打印，待 generateVChartSpec 实现后替换
       // 暂时将原始 option 赋给 internalSpec 用于基础测试
       // if (config && config.option) {
       //     this.internalSpec = cloneDeep(config.option);
       //     // 简单的数据检查
       //     this.isNoData = !this.internalSpec.data || !this.internalSpec.data.values || this.internalSpec.data.values.length === 0;
       // } else {
       //     this.internalSpec = null;
       //     this.isNoData = true;
       // }
    },

    // 初始化图表及数据的核心方法 (需要适配 VChart, 数据加载逻辑待恢复)
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
    },

    // 新增方法：将配置数据转换为图表数据
    makeSpecData(config, data) {
      // 实现将配置数据转换为图表数据的逻辑
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
