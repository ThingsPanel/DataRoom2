<template>
  <div style="width: 100%; height: 100%; position: relative;">
    <!-- No Data Message -->
    <div
      v-if="isNoData"
      style="display: flex; justify-content: center; align-items: center; height: 100%; color: grey; font-size: 16px; position: absolute; top: 0; left: 0; width: 100%;"
    >
      暂无数据
    </div>
    <!-- Chart Container -->
    <div
      ref="chartContainer"
      v-show="!isNoData"
      style="width: 100%; height: 100%;"
    ></div>
  </div>
</template>

<script>
import VChart from '@visactor/vchart';

export default {
  name: 'VchartCore',
  props: {
    spec: {
      type: Object,
      default: () => null
    },
    // 新增媒体查询配置
    mediaQuery: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isNoData: false,
      chartInstance: null
    };
  },
  emits: ['chart-ready', 'chart-error', 'chart-click'],
  mounted() {
    this.$nextTick(() => {
      // 避免报错：确保 spec 存在再调用 renderChart
      if (this.spec) {
        this.renderChart(this.spec);
      } else {
        this.isNoData = true;
      }
    });
  },
  beforeUnmount() {
    this.releaseChart();
  },
  watch: {
    spec: {
      handler(newSpec, oldSpec) {
        // 避免不必要的更新，使用深度比较
        if (JSON.stringify(newSpec) === JSON.stringify(oldSpec)) {
          return;
        }
        this.$nextTick(() => {
          if (this.chartInstance && newSpec) {
            this.updateChart(newSpec);
          } else if (newSpec) {
            this.renderChart(newSpec);
          } else {
            this.isNoData = true;
            this.releaseChart();
          }
        });
      },
      deep: true
    }
  },
  methods: {
    // 释放图表资源
    releaseChart() {
      if (this.chartInstance) {
        this.chartInstance.release();
        this.chartInstance = null;
      }
    },
    // 初始化渲染图表
    renderChart(spec) {
      if (!spec) {
        this.isNoData = true;
        this.releaseChart();
        return;
      }
      
      this.isNoData = false;

      try {
        const container = this.$refs.chartContainer;
        if (!container) {
          console.error('图表容器DOM元素未找到');
          this.isNoData = true;
          return;
        }

        // 清理可能存在的旧实例
        this.releaseChart();

        // 创建新实例，添加媒体查询配置
        const chartOptions = { 
          dom: container,
          // 如果有媒体查询配置则添加
          ...(this.mediaQuery && this.mediaQuery.length > 0 ? { mediaQuery: this.mediaQuery } : {})
        };
        
        this.chartInstance = new VChart(spec, chartOptions);
        
        // 添加事件监听
        this.addChartEventListeners();
        
        this.chartInstance.renderSync();
        this.$emit('chart-ready', this.chartInstance);
      } catch (error) {
        console.error("VChart 渲染失败:", error);
        this.isNoData = true;
        this.releaseChart();
        this.$emit('chart-error', error);
      }
    },
    
    // 添加图表事件监听器
    addChartEventListeners() {
      if (!this.chartInstance) return;
      
      // 添加点击事件监听
      this.chartInstance.on('click', (params) => {
        this.$emit('chart-click', params);
      });
    },
    
    // 更新图表
    updateChart(newSpec) {
      if (!newSpec) {
        this.isNoData = true;
        this.releaseChart();
        return;
      }
      
      this.isNoData = false;

      if (!this.chartInstance) {
        this.renderChart(newSpec);
        return;
      }

      try {
        // 使用 updateSpec 方法更新图表
        this.chartInstance.updateSpec(newSpec);
      } catch (error) {
        console.error("VChart 更新失败:", error);
        // 尝试完全重新渲染
        this.renderChart(newSpec);
        this.$emit('chart-error', error);
      }
    },
    
    // 对外暴露获取图表实例的方法
    getChartInstance() {
      return this.chartInstance;
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

