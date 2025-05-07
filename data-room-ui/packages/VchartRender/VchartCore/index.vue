<template>
    <div :id="chartId" :style="containerStyle"></div>
</template>

<script lang="js">
import { log } from "@antv/g2plot/lib/utils";
import { VChart } from "@visactor/vchart";
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
        height:'100%', // 设置一个默认高度，以便图表能正确显示
    
      };
    },
  
  },
  watch: { 
    config: {
      handler(newVal, oldVal) {
        this.initChart(this.chartData); // initChart will use the new this.config
      },
      deep: true
    },
    chartData: {
      handler(newVal, oldVal) {
        
        this.initChart(newVal); // initChart will use the new this.config
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.debouncedResize = debounce(this.resizeChart, 300); // 防抖处理 resize
    this.initChart(); 
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

    
    // 计算VChart所需的spec配置
    computeSpec(resdata) {
      if(resdata?.length>0){
        console.log('resdata',resdata);
        this.config.option.spec.data[0].values = resdata;
      }
      return  this.config.option.spec||{}; // 返回空对象以避免错误
    },

    // 处理数据配置
    processDataConfig(spec) {
      
    },
    
    // 初始化图表
    initChart(chartData) {
    
    
      this.$nextTick(() => {
        const chartDom = document.getElementById(this.chartId);
        if (!chartDom) {
          console.error(`[VchartCore initChart] 找不到图表容器 #${this.chartId}`);
          return;
        }
        this.disposeChart();
        try {
          const rect = chartDom.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) {
            console.warn(`[VchartCore initChart] 容器 #${this.chartId} 尺寸为零 (${rect.width}x${rect.height})，可能影响渲染。`);
          }
          
          const spec = this.computeSpec(chartData);
          console.log('spec999',spec);
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