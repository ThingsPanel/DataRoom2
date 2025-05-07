<template>
  <div>
    <div :id="chartId" :style="containerStyle"></div>
    <button @click="generateAndPrintSpec">生成并打印Spec配置</button>
    <button @click="triggerLinkageEvent">模拟触发linkage-trigger事件</button>
  </div>
</template>

<script lang="js">
import { VChart } from "@visactor/vchart";
import { log } from "@visactor/vchart/esm/util";
import { debounce } from 'lodash';
import _ from 'lodash';

export default {
  name: 'VchartCore',
  props: {
    // 配置对象（整体组件配置）
    config: {
      type: Object,
      required: true,
      default: () => ({})
    },
    // 图表处理后的数据
    chartData: {
      type: [Array, Object],
      default: null
    },
    // 初始图表选项
    initialOption: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      chartId: `vchart-${this._uid}`,
      // 图表实例
      chart: null,
      // 图表是否已初始化
      chartInitialized: false,
      // 示例数据（缺省情况下使用）
      sampleData: [
        { category: 'A', value: 150 },
        { category: 'B', value: 230 },
        { category: 'C', value: 220 },
        { category: 'D', value: 270 },
        { category: 'E', value: 130 }
      ],
      resizeObserver: null, // 新增：用于 ResizeObserver 实例
    };
  },
  computed: {
    // 图表容器样式
    containerStyle() {
      return {
        width: '100%',
        height: '300px', // 设置一个默认高度，以便图表能正确显示
        position: 'relative'
      };
    },
  
  },
  watch: {
    // 监听整个配置对象
    config: {
      handler(newConfig) {
        console.log('[VchartCore] 配置变化:', newConfig);
      },
      deep: true
    },
    // 监听初始选项
    initialOption: {
      handler(newInitialOption, oldInitialOption) {
        // 打印更详细的日志，方便追踪
        console.log('[VchartCore watch.initialOption] prop changed.');
        console.log('[VchartCore watch.initialOption] New initialOption:', newInitialOption ? JSON.parse(JSON.stringify(newInitialOption)) : newInitialOption);
        console.log('[VchartCore watch.initialOption] Old initialOption:', oldInitialOption ? JSON.parse(JSON.stringify(oldInitialOption)) : oldInitialOption);
        console.log('[VchartCore watch.initialOption] Current this.chart:', this.chart ? 'Exists' : null);

        // 如果 initialOption 变为有效值，并且图表实例还未创建
        if (newInitialOption && !this.chart) {
          console.log('[VchartCore watch.initialOption] initialOption is now valid and chart not yet created. Triggering initChart().');
          this.initChart();
        } else if (!newInitialOption && this.chart) {
          // 如果 initialOption 变成无效值 (例如 null)，并且图表已存在，则可能需要销毁图表
          console.warn('[VchartCore watch.initialOption] initialOption became null/invalid, and chart exists. Disposing chart.');
          this.disposeChart();
        }
        // 如果 newInitialOption 有值且 this.chart 已存在，则通常是更新逻辑，
        // 但您已经大幅简化了 updateChart，所以这里不主动调用更新，依赖外部流程。
      },
      deep: true
    },
    // 监听数据变化
    chartData: {
      handler(newData) {
        console.log('[VchartCore] 数据变化, 长度:', Array.isArray(newData) ? newData.length : '非数组');
        if(this.chart&&newData.length>0){
          this.chart.updateData(this.initialOption.id,newData)
        }
      
      },
      deep: true
    }
  },
  mounted() {
    
    // 自动生成并打印spec
    this.generateAndPrintSpec();
    
    this.debouncedResize = debounce(this.resizeChart, 300); // 防抖处理 resize

    this.$nextTick(() => {
      // 延迟初始化图表，确保DOM元素可用
      setTimeout(() => {
        this.initChart(); // 初始化图表

        // 初始化图表后，设置 ResizeObserver
        const chartDomElement = document.getElementById(this.chartId);
        if (chartDomElement) {
          this.resizeObserver = new ResizeObserver(this.debouncedResize); // 使用防抖包装后的 resizeChart
          this.resizeObserver.observe(chartDomElement);
          
        } 
      }, 100); 
    });
    
    // 仍然可以保留 window resize 监听，作为一种备用或针对整体窗口变化的响应
    window.addEventListener('resize', this.debouncedResize);
  },
  beforeDestroy() {
    // 销毁 ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      console.log(`[VchartCore] ResizeObserver已从 #${this.chartId} 分离`);
    }
    // 销毁图表实例
    this.disposeChart();
    // 移除事件监听
    window.removeEventListener('resize', this.debouncedResize);
  },
  methods: {
    // 生成并打印Spec配置
    generateAndPrintSpec() {
      try {
        const spec = this.computeSpec();

        console.log('[VchartCore] 生成的VChart Spec配置:');
        console.log(JSON.stringify(spec, null, 2));
        return spec;
      } catch (error) {
        console.error('[VchartCore] 生成spec配置时出错:', error);
        return null;
      }
    },
    
    // 计算VChart所需的spec配置
    computeSpec() {
      console.log('[VchartCore computeSpec] current initialOption:', this.initialOption);
      if (this.initialOption && typeof this.initialOption.spec === 'object' && this.initialOption.spec !== null) {
        return JSON.parse(JSON.stringify(this.initialOption.spec)); // 使用深拷贝
      }
      console.warn('[VchartCore computeSpec] initialOption or initialOption.spec is invalid. Returning empty spec.');
      return {}; // 返回空对象以避免错误
    },

    // 处理数据配置
    processDataConfig(spec) {
      
    },
    
    // 初始化图表
    initChart() {
      if (!this.initialOption) {
        console.warn('[VchartCore initChart] Aborting: this.initialOption is not yet available. Initialization will be triggered by watcher when prop is ready.');
        return; // 如果 initialOption 未就绪，则中止
      }
      // 既然 initialOption 已确认存在，可以安全记录它的值
      console.log('[VchartCore initChart] Proceeding with initialization. initialOption:', JSON.parse(JSON.stringify(this.initialOption)));
      
      this.disposeChart(); // 先释放旧实例
      
      this.$nextTick(() => {
        const chartDom = document.getElementById(this.chartId);
        if (!chartDom) {
          console.error(`[VchartCore initChart] 找不到图表容器 #${this.chartId}`);
          return;
        }
        
        try {
          const rect = chartDom.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) {
            console.warn(`[VchartCore initChart] 容器 #${this.chartId} 尺寸为零 (${rect.width}x${rect.height})，可能影响渲染。`);
          }
          
          const spec = this.computeSpec();
          
          if (!spec || Object.keys(spec).length === 0) {
            console.error('[VchartCore initChart] computeSpec returned an empty or invalid spec. Aborting VChart creation.');
            this.$emit('chart-error', { message: '无法获取有效的spec配置 (computeSpec返回空)' });
            return;
          }
          
          this.chart = new VChart(spec, { dom: chartDom, animation:this.config?.animation ?? true });
          this.registerChartEvents();
          this.chart.renderSync();
          this.$emit('chart-ready', this.chart);

        } catch (e) {
          console.error('[VchartCore initChart] 图表初始化或渲染时出错:', e);
          if (e.message && e.message.includes('Canvas')) {
            console.error('[VchartCore initChart] 错误可能与Canvas上下文有关。请检查环境或图表配置。');
          }
          this.chart = null;
          this.$emit('chart-error', { message: e.message || '图表初始化错误', error: e });
        }
      });
    },

    
    // 注册图表事件
    registerChartEvents() {
      if (!this.chart) return;
      this.chart.off('click'); // 先移除，避免重复绑定
      this.chart.on('click', (params) => {
        // console.log('[VchartCore] 图表点击事件:', params);
        if (params && params.datum) { // VChart 通常将点击的数据放在 params.datum
          this.$emit('linkage-trigger', params.datum); // 使用 params.datum
        } else if (params && params.data) { // 兼容旧的可能结构
           this.$emit('linkage-trigger', params.data);
        }
      });
      // 可以按需添加更多事件监听，例如 'selectelement', 'legendselectchanged' 等
    },
    
    // 调整图表大小
    resizeChart() {
      if (!this.chart || !this.chartInitialized) {
        // console.log('[VchartCore resizeChart] 图表未就绪，跳过resize。');
        return;
      }
      const chartDomElement = document.getElementById(this.chartId);
      if (!chartDomElement) {
        // console.error(`[VchartCore resizeChart] 找不到图表容器 #${this.chartId}。`);
        return;
      }
      const width = chartDomElement.offsetWidth;
      const height = chartDomElement.offsetHeight;
      if (width === 0 || height === 0) {
        // console.warn(`[VchartCore resizeChart] 容器尺寸 (${width}x${height}) 为零或无效。跳过VChart resize。`);
        return; 
      }
      this.$nextTick(() => {
        try {
          // console.log(`[VchartCore resizeChart] 正在为容器 #${this.chartId} (尺寸 ${width}x${height}) 调用 VChart.resize()。`);
          this.chart.resize();
          // console.log('[VchartCore resizeChart] 图表大小已成功调整。');
        } catch (e) {
          console.error(`[VchartCore resizeChart] 调整图表 #${this.chartId} 大小时出错:`, e);
        }
      });
    },
    
    // 释放图表资源
    disposeChart() {
      if (this.chart) {
        try {
          // console.log('[VchartCore] Releasing VChart instance...');
          this.chart.release();
        } catch (e) {
          console.error('[VchartCore] Error releasing VChart instance:', e);
        }
        this.chart = null;
        this.chartInitialized = false;
        // console.log('[VchartCore] VChart instance released.');
      }
    },
    
    // 模拟触发linkage-trigger事件
    triggerLinkageEvent() {
      const mockData = {
        source: 'VchartCore_manual_trigger',
        timestamp: new Date().toISOString(),
        value: Math.floor(Math.random() * 100) + 50, // 模拟一个值
        category: ['A', 'B', 'C', 'D', 'E'][Math.floor(Math.random() * 5)] // 模拟一个类别
      };
      console.log('[VchartCore] 模拟触发linkage-trigger事件，数据:', mockData);
      this.$emit('linkage-trigger', mockData);
    },
    
    // 获取图表实例（可供外部调用）
    getChartInstance() {
      return this.chart;
    }
  }
};
</script>

<style scoped>
/* 图表容器样式 */
</style>