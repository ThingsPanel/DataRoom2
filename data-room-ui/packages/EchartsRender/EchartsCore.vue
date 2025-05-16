<template>
  <div
    :id="chartId"
    style="width: 100%; height: 100%"
  />
</template>

<script>
import * as echarts from 'echarts';
import cloneDeep from 'lodash/cloneDeep';
import _ from 'lodash'; // For seriesStyle potentially

export default {
  name: 'EchartsCore',
  props: {
    // The complete chart configuration object
    config: {
      type: Object,
      required: true,
    },
    // The final processed data ready for ECharts series
    chartData: {
      type: [Array, Object], // Could be array or object depending on chart type/handler
      default: null,
    },
     // Pre-formatted ECharts option (if parent pre-computes parts)
    initialOption: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      chart: null,
      computedOption: null, // Holds the fully computed option
    };
  },
  computed: {
     // Generate a unique ID for the ECharts container within this component
     chartId() {
       // Simple unique ID for the core component instance
       return `echarts-core-${this._uid}`;
     }
  },
  watch: {
    // Watch the combination of config and data changes indirectly
    // We'll use a deep watch on 'config' and a separate watch on 'chartData'
    // to trigger option recalculation.
    config: {
       deep: true,
       handler() {
         this.updateComputedOption();
       }
    },
    chartData: {
      // Might need deep: true if data structure is complex and mutates internally
      // deep: true, 
      handler() {
        this.updateComputedOption();
      }
    },
    // Watch the final computed option and update the chart
    computedOption: {
        handler(newOption) {
            if (this.chart && newOption) {
                try {
                    this.chart.setOption(newOption, true); // Use notMerge = true to avoid unexpected merges
                } catch (e) {
                }
            }
        },
        // deep: true // Deep watching option might be expensive, consider if needed
    }
  },
  mounted() {
    this.initChart();
    this.updateComputedOption(); // Initial computation
  },
  beforeDestroy() {
    this.disposeChart();
  },
  methods: {
    initChart() {
      if (this.chart) {
        this.disposeChart();
      }
      const chartDom = document.getElementById(this.chartId);
      if (chartDom) {
          try {
             this.chart = echarts.init(chartDom);
             // Don't set option here, watcher will handle it after computedOption is ready
             this.registerEvent(); // Register events after init
          } catch(e) {
          }
      } else {
      }
    },
    disposeChart() {
      if (this.chart) {
        try {
            this.chart.dispose();
        } catch (e) {
        }
        this.chart = null;
      }
    },
    resizeChart() {
       if (this.chart) {
           // Check if the component name includes '3D' and apply observeChart logic
           if (this.config.name.includes('3D') && this.$el) {
               const entries = [{ contentRect: this.$el.getBoundingClientRect() }];
               let observedConfig = this.observeChart(entries); // Assuming observeChart logic is moved/adapted here
               // Assuming seriesStyle logic is also moved/adapted here
               observedConfig = this.seriesStyle(observedConfig);
               this.computedOption = observedConfig.option; // Update computed option directly or re-trigger calculation
               // The watcher on computedOption should handle setOption
           }
           this.chart.resize();
       }
    },
    // --- Option Computation Logic ---
    updateComputedOption() {
        if (!this.config || !this.config.option) {
            this.computedOption = null;
            return;
        }

        let baseOption = cloneDeep(this.initialOption || this.config.option);
        let workingConfig = cloneDeep(this.config); // Work on a copy

        // 1. Apply data formatting (if chartData is provided)
        if (this.chartData !== null) {
             // This assumes chartData is already in the final format needed by ECharts series
             // If specific formatting like echartsOptionFormatting is needed, call it here.
             // Example: baseOption = this.echartsOptionFormatting(workingConfig, this.chartData, baseOption);
             // For now, let's assume the parent's dataFormatting prepared it sufficiently
             // or handle specific chart types.
              if(this.config.type === 'echarts-bar') { // Example: Specific formatting for bar charts
                 baseOption = this.echartsOptionFormatting(workingConfig, this.chartData, baseOption);
              } else {
                 // General assignment (might need refinement based on chart types)
                 if(baseOption.series && Array.isArray(baseOption.series) && baseOption.series.length > 0) {
                    // Simple assignment - assumes chartData matches series[0].data structure
                    baseOption.series[0].data = this.chartData; 
                 } else {
                     // Fallback or specific logic for other types
                 }
              }
        } else if (this.config?.option?.series?.[0]?.data) {
            // If no chartData provided, use data already present in config.option
            // This path might be taken during initial style changes before data arrives
             baseOption.series[0].data = this.config.option.series[0].data;
        }


        // 2. Apply settings from 'data' tab
        workingConfig.option = baseOption; // Update working copy
        workingConfig = this.transformSettingToOption(workingConfig, 'data');
        baseOption = workingConfig.option; // Get potentially modified option

        // 3. Apply settings from 'custom' tab
        workingConfig.option = baseOption;
        workingConfig = this.transformSettingToOption(workingConfig, 'custom');
        baseOption = workingConfig.option;

        // 4. Execute optionHandler script
        if (workingConfig.optionHandler) {
          try {
            const handlerFn = new Function('option', 'echarts', workingConfig.optionHandler);
            handlerFn(baseOption, echarts); // Pass echarts object to handler
          } catch (e) {
          }
        }
        
        // 5. Apply series specific styling (like 3D bar shadows/colors)
        workingConfig.option = baseOption; 
        workingConfig = this.seriesStyle(workingConfig); // Apply final styling tweaks
        baseOption = workingConfig.option;


        this.computedOption = baseOption; // Set the final computed option
    },

    // --- ECharts Specific Helper Functions (Moved from Parent) ---

    transformSettingToOption (config, type) {
        // (Copy logic from EchartsRender/index.vue - lines 163-239)
        // Important: Needs careful adaptation to work within this component's context.
        // It should modify and return the 'config' object passed to it.
         let option = null;
          config.setting.forEach(set => {
            if (set.optionField) {
              const optionField = set.optionField.split('.');
              option = config.option;
              // Handle xAxis specific logic
              if (optionField[0] === 'xAxis' && Array.isArray(option.xAxis)) {
                 const axisIndex = optionField[0].includes('[1]') ? 1 : 0; // Basic check for index
                 let currentLevel = option.xAxis[axisIndex];
                 for(let i = 1; i < optionField.length; i++) {
                    const field = optionField[i];
                    if (i === optionField.length - 1) {
                       if ((set.tabName === type && type === 'data' && set.value !== undefined && set.value !== null) || (set.tabName === type && type === 'custom')) {
                         currentLevel[field] = set.value;
                       }
                    } else {
                       if (!currentLevel[field]) currentLevel[field] = {}; // Create path if not exists
                       currentLevel = currentLevel[field];
                    }
                 }
              } else if (optionField[0] === 'series' && Array.isArray(option.series)) {
                 // Simplified series handling - applies to ALL series or based on simple ID check
                 // This might need more sophisticated logic if fine-grained control per series is needed.
                 const seriesIdMatch = optionField[1]; // Assumes structure like 'series.seriesIdPart.property'
                 const propPath = optionField.slice(2); // ['property', 'subProperty']

                 option.series.forEach(seriesItem => {
                     // Apply if ID matches or if no specific ID part provided (apply to all)
                     if (!seriesIdMatch || (seriesItem.id && seriesItem.id.includes(seriesIdMatch))) {
                         let currentLevel = seriesItem;
                         for (let i = 0; i < propPath.length; i++) {
                             const field = propPath[i];
                             if (i === propPath.length - 1) {
                                 if ((set.tabName === type && type === 'data' && set.value !== undefined && set.value !== null) || (set.tabName === type && type === 'custom')) {
                                     currentLevel[field] = set.value;
                                 }
                             } else {
                                 if (!currentLevel[field]) currentLevel[field] = {};
                                 currentLevel = currentLevel[field];
                             }
                         }
                     }
                 });
              } else if (optionField[0] === 'graphic' && option.graphic?.children) {
                 // Handle graphic specific logic (e.g., 3D bar shadow colors)
                  option.graphic.children.forEach(item => {
                     if(item.style && set.tabName === type && type === 'custom') { // Assuming graphic fill is custom
                        item.style.fill = set.value;
                     }
                  });
              } else {
                 // General path setting (e.g., title.text, grid.left)
                 let currentLevel = option;
                 for (let i = 0; i < optionField.length; i++) {
                   const field = optionField[i];
                   if (i === optionField.length - 1) {
                     if ((set.tabName === type && type === 'data' && set.value !== undefined && set.value !== null) || (set.tabName === type && type === 'custom')) {
                       currentLevel[field] = set.value;
                     }
                   } else {
                     if (!currentLevel[field]) currentLevel[field] = {};
                     currentLevel = currentLevel[field];
                   }
                 }
              }
            }
          });
          return config;
    },

    echartsOptionFormatting (config, data, baseOption) {
        // (Copy logic from EchartsRender/index.vue - lines 277-425)
        // Adapt to take baseOption as input and return the modified option
        const option = baseOption; // Work on the passed option
        const xField = config.setting.find(item => item.optionField === 'xField')?.value;
        const yField = config.setting.find(item => item.optionField === 'yField')?.value;
        const hasSeries = config.setting.find(item => item.optionField === 'seriesField' && item.value !== '');
        
        if (!xField || !yField || !data) return option; // Need fields and data

        // Use helper to get xData/yData for non-grouped case
        const { xData, yData } = this.getxDataAndYData(xField, yField, data);
        const maxY = yData.length > 0 ? (Math.max(...yData) + Math.max(...yData) * 0.2) : 0;
        const shadowData = Array.from({ length: xData.length }, () => maxY);

        if (Array.isArray(option.xAxis)) {
             option.xAxis = option.xAxis.map(item => ({ ...item, data: xData }));
        } else if (option.xAxis) {
             option.xAxis.data = xData;
        }


        if (hasSeries) {
            const seriesField = config.setting.find(item => item.optionField === 'seriesField')?.value;
            const seriesFieldList = [...new Set(data.map(item => item[seriesField]))];
            option.series = []; // Reset series for grouped data
            const barWidth = config.option.seriesCustom?.barWidth || 20; // Default width

            // Get label settings (adapt field names if necessary)
             let labelShow = config.setting.find(set => set.field === 'series_barColor_label_show')?.value ?? 0;
             let labelPosition = config.setting.find(set => set.field === 'series_barColor_label_position')?.value ?? 'inside';
             let labelColor = config.setting.find(set => set.field === 'series_barColor_label_color')?.value ?? '#fff';
             let labelSize = config.setting.find(set => set.field === 'series_barColor_label_fontSize')?.value ?? 12;


            // Calculate offsets (simplified logic)
            const numSeries = seriesFieldList.length;
            const groupGap = 0.2; // 20% gap between groups
            const barGap = 0.1;  // 10% gap between bars in a group
            const totalBarWidthRatio = 1 - groupGap;
            const singleBarWidthRatio = (totalBarWidthRatio / numSeries) * (1 - barGap);
            const offsetStart = -totalBarWidthRatio / 2 + singleBarWidthRatio / 2;


             seriesFieldList.forEach((seriesValue, index) => {
                const seriesData = data.filter(item => item[seriesField] === seriesValue).map(item => item[yField]);
                const offset = (offsetStart + index * (singleBarWidthRatio / (1 - barGap))) * 100; // Offset percentage
                
                 const seriesItem = [
                     // PictorialBar Top (adapt colors/IDs if needed)
                     {
                         id: 'barTopColor_' + seriesValue,
                         type: 'pictorialBar',
                         tooltip: { show: false },
                         symbol: 'diamond',
                         symbolSize: [barWidth, barWidth / 2],
                         symbolOffset: [offset + '%', -barWidth / 4],
                         symbolPosition: 'end',
                         z: 15, zlevel: 2,
                         color: '#ffff33', // Example color
                         data: seriesData
                     },
                     // Main Bar
                     {
                         id: 'barColor_' + seriesValue,
                         type: 'bar',
                         barWidth: barWidth,
                         barGap: barGap * 100 + '%', // Echarts uses percentage string for gap
                         itemStyle: { color: '#115ba6' }, // Example color
                         label: { show: !!labelShow, position: labelPosition, color: labelColor, fontSize: labelSize, fontStyle: 'normal' },
                         zlevel: 2, z: 12,
                         symbolOffset: [offset + '%', 0], // Apply offset
                         data: seriesData
                     },
                      // PictorialBar Bottom
                     {
                         id: 'barBottomColor_' + seriesValue,
                         type: 'pictorialBar',
                         tooltip: { show: false },
                         symbol: 'diamond',
                         symbolSize: [barWidth, barWidth / 2],
                         symbolOffset: [offset + '%', barWidth / 4],
                         zlevel: 2, z: 15,
                         color: 'rgb(2, 192, 255)', // Example color
                         data: seriesData
                     },
                     // Shadow Bar (on secondary axis)
                     {
                         id: 'shadowColor_' + seriesValue,
                         type: 'bar',
                         tooltip: { show: false },
                         xAxisIndex: 1, // Assumes secondary X axis exists
                         barWidth: barWidth,
                         barGap: barGap * 100 + '%',
                         itemStyle: { color: 'rgba(9, 44, 76,.8)' }, // Example color
                         zlevel: 1,
                         symbolOffset: [offset + '%', 0], // Apply offset
                         data: Array.from({ length: xData.length }, () => maxY) // Shadow data based on overall max Y
                     },
                      // Shadow PictorialBar Top
                     {
                         id: 'shadowTopColor_' + seriesValue,
                         type: 'pictorialBar',
                         tooltip: { show: false },
                         symbol: 'diamond',
                         symbolSize: [barWidth, barWidth / 2],
                         symbolOffset: [offset + '%', -barWidth / 4],
                         symbolPosition: 'end',
                         z: 15, zlevel: 1,
                         color: 'rgb(15, 69, 133)', // Example color
                         data: Array.from({ length: xData.length }, () => maxY)
                     }
                 ];
                 option.series.push(...seriesItem);
             });

        } else {
             // No grouping, update existing series data
             if (Array.isArray(option.series)) {
                 option.series.forEach(item => {
                     if (item.id && item.id.includes('shadow')) {
                         item.data = shadowData;
                     } else {
                         // Assuming the main data series is the first one without 'shadow' in ID
                         // This might need adjustment based on actual series structure in defaultOption
                         if (!item.id || !item.id.includes('shadow')) {
                            item.data = yData;
                         }
                     }
                 });
             }
        }
        return option; // Return the modified option
    },

     getxDataAndYData (xField, yField, data) {
        // (Copy logic from EchartsRender/index.vue - lines 257-275)
         let xData = [];
         let yData = [];
         if (!data || !xField || !yField) return { xData, yData };

         // Get unique x values preserving original order (if possible)
         const xValueSet = new Set();
         data.forEach(item => {
             if (item.hasOwnProperty(xField)) {
                 if (!xValueSet.has(item[xField])) {
                     xData.push(item[xField]);
                     xValueSet.add(item[xField]);
                 }
             }
         });

         // Get corresponding y values (assuming aggregation is max, adapt if needed)
         xData.forEach(x => {
             let value = 0; // Default to 0 if no match or non-numeric
             let found = false;
             // Find the corresponding y value (simple max aggregation example)
             data.forEach(item => {
                 if (item[xField] === x && item.hasOwnProperty(yField)) {
                      const currentY = parseFloat(item[yField]); // Ensure numeric comparison
                      if (!isNaN(currentY)) {
                          value = Math.max(value, currentY);
                          found = true;
                      }
                 }
             });
             yData.push(value);
         });

         return { xData, yData };
     },

    seriesStyle (config) {
        // (Copy logic from EchartsRender/index.vue - lines 427-468)
        // Adapt to work with internal state/props if needed
        if (!config?.name?.includes('3D')) {
            return config;
        }
        const _config = cloneDeep(config); // Work on a copy
        const seriesCustom = _config.option?.seriesCustom;
        if (!seriesCustom || !_config.option?.series) return config; // Need custom settings and series

        const ids = Object.keys(seriesCustom);
        const isGroup = _config.option.series.length !== 5; // Heuristic for grouping

        _config.option.series.forEach(item => {
             // Width configuration
             if (item.type === 'pictorialBar') {
                item.symbolSize = [seriesCustom.barWidth, seriesCustom.barWidth / 2];
                // Apply offset based on index (if grouped) or default offset
             } else if (item.type === 'bar') {
                item.barWidth = seriesCustom.barWidth;
             }

             // Color configuration
             if (!isGroup) {
                 // Basic chart: Apply color if ID matches in seriesCustom
                 if (ids.includes(item.id)) {
                     // Use itemStyle for standard color setting
                     if (!item.itemStyle) item.itemStyle = {};
                     item.itemStyle.color = seriesCustom[item.id];
                     // PictorialBar uses 'color' directly
                     if(item.type === 'pictorialBar') item.color = seriesCustom[item.id];
                 }
             } else {
                 // Grouped chart: Need to map colors based on series index/ID parts
                 // This requires a predefined mapping or matching logic based on ID structure
                 ids.forEach(idKey => {
                     if (idKey !== 'barWidth' && Array.isArray(seriesCustom[idKey])) {
                          // Example: Match series based on ID containing the key (e.g., 'barColor')
                          if (item.id && item.id.includes(idKey)) {
                              // Determine index - this is complex, needs a robust way
                              // to link seriesCustom array elements to specific series items.
                              // Placeholder: using a simple modulo for demonstration
                              const colorIndex = parseInt(item.id.split('_').pop()) % seriesCustom[idKey].length || 0;
                               if (!item.itemStyle) item.itemStyle = {};
                               item.itemStyle.color = seriesCustom[idKey][colorIndex];
                               if(item.type === 'pictorialBar') item.color = seriesCustom[idKey][colorIndex];
                          }
                     }
                 });
             }
        });
        return _config; // Return the modified config object
    },

     observeChart(entries) {
         // (Copy logic from EchartsRender/index.vue - lines 126-136)
         // Adapt to modify the internal computedOption or trigger recalculation
          const width = entries[0].contentRect.width;
          const height = entries[0].contentRect.height;
          // Modify a working copy of the option
          let workingOption = cloneDeep(this.computedOption || this.config.option);
          
          if (workingOption.graphic?.children?.[0]?.shape) {
             workingOption.graphic.children[0].shape.width = width * 0.9;
          }
          if (workingOption.graphic?.children?.[1]?.shape) {
             workingOption.graphic.children[1].shape.points = [[width / 10, -height / 6], [width - width / 6, -height / 6], [width * 0.9, 0], [0, 0]];
          }
          // Return a config-like object containing the modified option
          return { ...this.config, option: workingOption };
     },


    // --- Event Handling ---
    registerEvent() {
      if (!this.chart) return;
      // Remove previous listeners if any (important for re-init)
      this.chart.off('click'); 
      this.chart.off('mouseover'); // Add other events as needed

      // Register new listeners
      this.chart.on('click', (params) => {
        // Extract relevant data for linkage
        const linkageData = this.extractLinkageData(params);
        if (linkageData) {
          this.$emit('linkage-trigger', linkageData); // Emit event to parent
        }
      });

       // Example: mouseover for tooltip data extraction if needed
       this.chart.on('mouseover', (params) => {
          // Can extract tooltip related data if necessary
       });
    },

    extractLinkageData(params) {
       // Logic to extract data from ECharts event parameters (params)
       // This depends heavily on the chart type and what data is needed for linkage.
       // Example: return params.data; // Simplest case
       // Example: return { category: params.name, value: params.value, seriesName: params.seriesName };
       if (params?.data) {
           // Return a clone to prevent accidental modification
           return cloneDeep(params.data); 
       }
       return null;
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style> 