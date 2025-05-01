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
      id="chart-container"
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
      type: Object, // Expecting the chart specification object
      default: null // Default to null if no spec is provided
    }
  },
  data() {
    return {
      isNoData: false, // Variable to control the display of the 'No data' message
      chartInstance: null // !! 存储 VChart 实例 !!
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.renderChart(this.spec);
    });
  },
  beforeDestroy() { // !! 添加 beforeDestroy 钩子释放实例 !!
    if (this.chartInstance) {
      this.chartInstance.release();
      this.chartInstance = null;
    }
  },
  watch: {
    spec: {
      handler(newSpec, oldSpec) { // 传入新旧 spec
        // 避免不必要的更新
        if (JSON.stringify(newSpec) === JSON.stringify(oldSpec)) {
            return;
        }
        this.$nextTick(() => {
          // !! 优先使用 updateSpec !!
          if (this.chartInstance) {
            this.updateChart(newSpec);
          } else {
            this.renderChart(newSpec);
          }
        });
      },
      deep: true // Watch for nested changes within the spec object
    }
  },
  methods: {
    // 初始化渲染图表
    renderChart(spec) {
      // console.log('Initial renderChart called with:', spec);
      if (!spec) {
        this.isNoData = true;
        if (this.chartInstance) { // 如果之前有实例，销毁它
            this.chartInstance.release();
            this.chartInstance = null;
        }
        window.vchart = null; // Clear debug variable
        return;
      }
      this.isNoData = false;

      try {
        const container = this.$refs.chartContainer; // 使用 ref 获取容器
        if (!container) {
          console.error('图表容器DOM元素未找到。');
          this.isNoData = true;
          return;
        }

        // 清理可能存在的旧实例
        if (this.chartInstance) {
          this.chartInstance.release();
        }

        // 创建新实例
        this.chartInstance = new VChart(spec, { dom: container });
        this.chartInstance.renderSync();
        window.vchart = this.chartInstance; // 更新调试变量
      } catch (error) {
        console.error("VChart 首次渲染失败:", error);
        this.isNoData = true;
        this.chartInstance = null; // 出错则清空实例
      }
    },
    // 更新图表
    updateChart(newSpec) {
        // console.log('Updating chart with spec:', newSpec);
        if (!newSpec) {
            this.isNoData = true;
            if (this.chartInstance) {
                this.chartInstance.release();
                this.chartInstance = null;
            }
            window.vchart = null;
            return;
        }
        this.isNoData = false;

        if (!this.chartInstance) {
            console.error("尝试更新图表，但 VChart 实例不存在。");
            this.renderChart(newSpec); // 尝试重新渲染
            return;
        }

        try {
            // !! 使用 updateSpec 方法 !!
            this.chartInstance.updateSpec(newSpec);
        } catch (error) {
            console.error("VChart 更新失败:", error);
            // 尝试完全重新渲染作为后备
            console.warn("尝试完全重新渲染...");
            this.renderChart(newSpec);
            // this.isNoData = true; // 或者在这里显示错误/无数据
            // this.chartInstance = null;
        }
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

