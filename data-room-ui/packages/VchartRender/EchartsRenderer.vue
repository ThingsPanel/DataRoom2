<template>
  <div :id="chartId" style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from 'echarts';
import { debounce } from 'lodash-es'; // Using debounce from lodash-es

export default {
  name: 'EchartsRenderer',
  props: {
    config: {
      type: Object,
      required: true
    },
    chartId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      resizeObserver: null
    };
  },
  watch: {
    // Watch for changes in the option object within config
    'config.option': {
      handler(newOption, oldOption) {
        // Avoid unnecessary re-renders if options are the same
        // Note: Deep comparison can be expensive. Consider optimizing if needed.
        if (this.chart && JSON.stringify(newOption) !== JSON.stringify(oldOption)) {
          this.updateChart();
        }
      },
      deep: true
    },
    // Watch for changes in chartId (though unlikely)
    chartId() {
      this.initChart();
    }
  },
  mounted() {
    this.initChart();
    this.setupResizeObserver();
  },
  beforeDestroy() {
    this.disposeChart();
    this.teardownResizeObserver();
  },
  methods: {
    initChart() {
      // Dispose existing chart before creating a new one
      this.disposeChart();

      const chartDom = document.getElementById(this.chartId);
      if (chartDom) {
        this.chart = echarts.init(chartDom);
        this.updateChart(); // Apply initial options
        this.registerEvents(); // Register ECharts events
      } else {
        console.error(`[EchartsRenderer] Chart DOM element not found: #${this.chartId}`);
      }
    },
    updateChart: debounce(function() { // Debounce updateChart
      if (this.chart && this.config.option) {
        try {
          // Use `true` for the second arg to not merge options, replacing them instead.
          // Use `false` for the third arg for lazy update for better performance.
          this.chart.setOption(this.config.option, true, false);
        } catch (error) {
           console.error('[EchartsRenderer] Error setting chart option:', error, this.config.option);
        }
      }
    }, 300), // 300ms debounce time
    disposeChart() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
    },
    registerEvents() {
      if (!this.chart) return;

      // Example: Listen for click events and emit upwards
      this.chart.on('click', (params) => {
        // You might want to process params before emitting
        this.$emit('chart-click', params);
      });

       // Listen for tooltip changes (useful for linkage)
      let tooltipData = {};
      this.chart.on('updateAxisPointer', (event) => {
          const xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
             const dimension = xAxisInfo.value;
             // Assuming data structure allows finding item by dimension
             // This might need adjustment based on actual data structure in series
             const seriesData = this.config?.option?.series?.[0]?.data; // Example path
             if(Array.isArray(seriesData)) {
                const dataItem = seriesData.find(item => item.name === dimension || item[0] === dimension); // Adjust based on data format
                 if (dataItem) {
                    tooltipData = dataItem; // Store the data for the hovered item
                 }
             }
          }
      });

       // Emit tooltip data on click (or another relevant event like mouseover if needed)
       this.chart.on('click', (params) => {
            // params often contains the relevant data directly
            if (params.data) {
                this.$emit('tooltip-change', params.data);
            } else {
                 // Fallback to stored tooltipData if params.data is not available
                 this.$emit('tooltip-change', tooltipData);
            }
       });


      // Add other necessary event listeners (e.g., 'mouseover', 'legendselectchanged')
    },
    resizeChart: debounce(function() { // Debounce resizeChart
      if (this.chart) {
        this.chart.resize();
      }
     }, 100), // 100ms debounce time
     setupResizeObserver() {
        const chartElement = document.getElementById(this.chartId);
        if (chartElement) {
            this.resizeObserver = new ResizeObserver(this.resizeChart);
            this.resizeObserver.observe(chartElement);
        }
     },
      teardownResizeObserver() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
     }
  }
};
</script>

<style scoped>
/* Add any specific styles for the renderer container if needed */
</style> 