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
      isNoData: false // Variable to control the display of the 'No data' message
    };
  },
  mounted() {
    this.$nextTick(() => {
      // Pass the initial spec prop to renderChart when mounted
      this.renderChart(this.spec);
    });
  },
  watch: {
    spec: {
      handler(newSpec) {
        // When the spec prop changes, re-render the chart with the new spec
        this.$nextTick(() => {
          this.renderChart(newSpec);
        });
      },
      deep: true // Watch for nested changes within the spec object
    }
  },
  methods: {
    renderChart(spec) {
      // Check if spec is invalid
      console.log('renderChart', spec);
      if (!spec) {
        this.isNoData = true; // Set flag to true if no spec
        window.vchart = null; // Clear debug variable
        return; // Stop further execution
      }

      // If spec is valid, ensure the no data message is hidden
      this.isNoData = false;

      // Proceed with chart rendering only if spec is valid
      try {
        const container = this.$el?.querySelector('#chart-container');
        if (!container) {
          console.error('图表容器DOM元素 "#chart-container" 未找到。');
          // Potentially set isNoData to true here as well or handle differently
          this.isNoData = true;
          return;
        }

        // Clear previous content *only* if we are about to render a new chart
        container.innerHTML = '';

        const vchart = new VChart(spec, { dom: container });
        vchart.renderSync();
        window.vchart = vchart; // 保留调试代码
      } catch (error) {
        console.error("VChart渲染失败:", error);
        // Handle rendering errors, maybe show an error message or set isNoData
        this.isNoData = true; // Show 'No Data' on error as a fallback
      }
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

