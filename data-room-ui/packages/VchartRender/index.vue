<template>
  <div
    style="width: 100%;height: 100%"
    class="bs-design-wrap bs-custom-component"
    :class="{'light-theme':customTheme === 'light','auto-theme':customTheme !=='light'}"
  >
    <EchartsRenderer
       v-if="hasData"
      :config="config"
      :chart-id="chatId"
      @chart-click="handleChartClick"
      @tooltip-change="handleTooltipChange"
    />
    <div v-else>
      <!-- Add loading indicator or 'No Data' message here -->
    </div>
  </div>
</template>
<script>
import 'insert-css'
import cloneDeep from 'lodash/cloneDeep'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { mapState, mapMutations } from 'vuex'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import _ from 'lodash'
import CloneDeep from 'lodash-es/cloneDeep'
import isEqual from 'lodash/isEqual'

import EchartsRenderer from './EchartsRenderer.vue';

export default {
  name: 'VchartCustomComponent',
  components: { EchartsRenderer },
  mixins: [commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      hasData: false,
      resizeObserver: null
    }
  },
  computed: {
    ...mapState('bigScreen', {
      pageInfo: state => state.pageInfo,
      customTheme: state => state.pageInfo.pageConfig.customTheme,
      activeCode: state => state.activeCode
    }),
    chatId () {
      let prefix = 'chart_'
      if (this.$route.path === window?.BS_CONFIG?.routers?.previewUrl) {
        prefix = 'preview_chart_'
      }

      if (this.$route.path === window?.BS_CONFIG?.routers?.designUrl) {
        prefix = 'design_chart_'
      }

      if (this.$route.path === window?.BS_CONFIG?.routers?.pageListUrl) {
        prefix = 'management_chart_'
      }
      return prefix + this.config.code
    }
  },
  created () {
    this.chartInit();
  },
  watch: {
    config: {
        handler(newConfig, oldConfig) {
            if (newConfig.key !== oldConfig.key) {
                 this.chartInit();
            } else {
                this.changeStyle(newConfig);
            }
        },
        deep: true
    },
    'config.option.theme': {
      handler (val) {
        if (val) {
          this.changeStyle(this.config, true)
        }
      }
    }
  },
  mounted () {
    this.setupParentResizeObserver();
  },
  beforeDestroy () {
    this.teardownParentResizeObserver();
  },
  methods: {
    ...mapMutations('bigScreen', ['changeChartConfig', 'changeActiveItemConfig', 'changeChartLoading']),

    setupParentResizeObserver() {
        if(this.config.name.includes('3D')) {
            const dragSelect = document.querySelector('.bs-design-wrap');
            if (dragSelect) {
                this.resizeObserver = new ResizeObserver(entries => {
                     if (this.config.name.includes('3D')){
                        let updatedConfig = this.observeChart(entries, cloneDeep(this.config));
                        updatedConfig = this.seriesStyle(updatedConfig);
                         if (updatedConfig.code === this.activeCode) {
                            this.changeActiveItemConfig(updatedConfig);
                        } else {
                            this.changeChartConfig(updatedConfig);
                        }
                    }
                });
                this.resizeObserver.observe(dragSelect);
            }
        }
    },
    teardownParentResizeObserver() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    },

    chartInit () {
      let config = cloneDeep(this.config);
      this.hasData = false;
      if (config.code === config.key || this.isPreview) {
        config = this.changeStyle(config);
        config.loading = true;
        this.changeChartLoading(config);
        this.changeDataByCode(config).then((res) => {
          config.loading = false;
          this.changeChartLoading(config);
          const finalConfig = this.dataFormatting(res, res.data);
          this.updateComponentConfig(finalConfig);
          this.hasData = true;
        }).catch((err) => {
           console.error("Error fetching data: ", err);
           config.loading = false;
           this.changeChartLoading(config);
           this.hasData = false; 
        });
      } else {
        config.loading = true;
        this.changeChartLoading(config);
        this.changeData(config).then((res) => {
          config.loading = false;
          this.changeChartLoading(config);
          const finalConfig = this.dataFormatting(res, res.data);
          this.updateComponentConfig(finalConfig);
          this.hasData = true;
        }).catch((err) => {
           console.error("Error updating data: ", err);
           config.loading = false;
           this.changeChartLoading(config);
           this.hasData = false; 
        });
      }
    },

    observeChart (entries, config) {
      const width = entries[0].contentRect.width;
      const height = entries[0].contentRect.height;
      const option = config.option;
      if (option.graphic?.children?.length >= 2) {
          if (option.graphic.children[0]?.shape) {
             option.graphic.children[0].shape.width = width * 0.9;
          }
          if (option.graphic.children[1]?.shape) {
             option.graphic.children[1].shape.points = [[width / 10, -height / 6], [width - width / 6, -height / 6], [width * 0.9, 0], [0, 0]];
          }
      }
      return config;
    },

    handleChartClick(params) {
        // Process params if needed
        // console.log('Chart clicked:', params);
        // If using linkage mixin, data might need to be prepared/found first
        // This depends on what handleTooltipChange provides
    },

    handleTooltipChange(tooltipData) {
        // tooltipData should be the data associated with the hovered/clicked item
        // console.log('Tooltip change / item data:', tooltipData);
        if (tooltipData) {
            this.linkage(tooltipData); // Trigger linkage with the item data
        }
    },

    transformSettingToOption (config, type) {
      let option = null
      let _config = cloneDeep(config);

      _config.setting.forEach(set => {
        if (set.optionField) {
          const optionField = set.optionField.split('.')
          let target = _config.option;

          if (optionField[0] === 'xAxis' && Array.isArray(target.xAxis)) {
              target = target.xAxis[0];
              for (let i = 1; i < optionField.length - 1; i++) {
                 if (target[optionField[i]] === undefined) target[optionField[i]] = {};
                 target = target[optionField[i]];
              }
          } else if (optionField[0] === 'series' && Array.isArray(target.series)) {
              const seriesIdPart = optionField[1];
              const fieldPath = optionField.slice(2);

               _config.option.series.forEach(seriesItem => {
                  if (seriesItem.id?.includes(seriesIdPart)) {
                      let seriesTarget = seriesItem;
                      for (let i = 0; i < fieldPath.length - 1; i++) {
                          if (seriesTarget[fieldPath[i]] === undefined) seriesTarget[fieldPath[i]] = {};
                          seriesTarget = seriesTarget[fieldPath[i]];
                      }
                       if ((set.tabName === type && type === 'data' && set.value !== undefined && set.value !== '') || (set.tabName === type && type === 'custom')) {
                           seriesTarget[fieldPath[fieldPath.length - 1]] = set.value;
                       }
                  }
               });
              return;
          } else if (optionField[0] === 'graphic' && target.graphic?.children) {
              if (optionField.join('.') === 'graphic.children.style.fill') {
                  _config.option.graphic.children.forEach(item => {
                      if(!item.style) item.style = {};
                      item.style.fill = set.value;
                  });
                  return;
              } else {
                   for (let i = 0; i < optionField.length - 1; i++) {
                        if (target[optionField[i]] === undefined) target[optionField[i]] = {};
                        target = target[optionField[i]];
                   }
              }
          } else {
              for (let i = 0; i < optionField.length - 1; i++) {
                if (target[optionField[i]] === undefined) target[optionField[i]] = {};
                target = target[optionField[i]];
              }
          }

          const finalField = optionField[optionField.length - 1];
           if ((set.tabName === type && type === 'data' && set.value !== undefined && set.value !== '') || (set.tabName === type && type === 'custom')) {
             target[finalField] = set.value;
          }
        }
      });
      return _config;
    },

    dataFormatting (config, data) {
       let _config = cloneDeep(config);
      if (!data) {
           _config.option.series = [];
          return _config;
      }

      if (_config.dataHandler) {
        try {
           const dataHandlerFn = new Function('data', _config.dataHandler);
           data = dataHandlerFn(data) ?? data;
        } catch (e) {
          console.error("Error executing dataHandler:", e);
        }
      }

      // Format options specifically for ECharts based on data
      // Store the formatted option separately
      const formattedOption = this.echartsOptionFormatting(_config, data);
      // Safely update _config.option, ensuring it's always an object
      // Fallback to existing option or an empty object if formatting fails
      _config.option = formattedOption || _config.option || {};

      // Apply settings with tabName 'data' after formatting based on data
      _config = this.transformSettingToOption(_config, 'data');

      _config = this.seriesStyle(_config);

      return _config;
    },

    getxDataAndYData (xField, yField, data) {
      let xData = []
      let yData = []
      if (!xField || !yField || !Array.isArray(data)) {
          return { xData, yData };
      }

      data.forEach(item => {
        if (item[xField] !== undefined) {
           xData.push(item[xField]);
        }
      });
      xData = [...new Set(xData)];

      xData.forEach(x => {
        let value = null;
        data.forEach(item => {
          if (item[xField] === x && item[yField] !== undefined) {
            value = item[yField];
          }
        });
        yData.push(value);
      });

      return { xData, yData }
    },

    echartsOptionFormatting (config, data) {
        let _config = cloneDeep(config);
        let option = _config.option;
        const setting = _config.setting;

        const xField = setting.find(item => item.optionField === 'xField')?.value;
        const yField = setting.find(item => item.optionField === 'yField')?.value;
        const seriesFieldSetting = setting.find(item => item.optionField === 'seriesField');
        const seriesField = seriesFieldSetting?.value;
        const hasSeries = seriesFieldSetting?.enable && !!seriesField;

        if (!xField || !yField) {
            option.xAxis = option.xAxis?.map(axis => ({ ...axis, data: [] })) || [];
            option.series = option.series?.map(series => ({ ...series, data: [] })) || [];
            return option;
        }

        if (!Array.isArray(data)) {
             option.xAxis = option.xAxis?.map(axis => ({ ...axis, data: [] })) || [];
             option.series = option.series?.map(series => ({ ...series, data: [] })) || [];
             return option;
        }

        if (!hasSeries) {
            const { xData, yData } = this.getxDataAndYData(xField, yField, data);
            const maxY = yData.length > 0 ? Math.max(...yData.filter(y => y !== null)) : 0;
            const shadowData = Array.from({ length: xData.length }, () => maxY + maxY * 0.2);

             option.xAxis = option.xAxis?.map(item => ({ ...item, data: xData })) || [];

            option.series = option.series?.map(item => {
                let seriesItemData = item.id?.includes('shadow') ? shadowData : yData;
                return { ...item, data: seriesItemData };
            }) || [];
        } else {
            const seriesFieldList = [...new Set(data.map(item => item[seriesField]).filter(Boolean))];
            const xDataOverall = [...new Set(data.map(item => item[xField]))];
            const barWidth = option.seriesCustom?.barWidth || 30;

            const labelShow = setting.find(s => s.field === 'series_barColor_label_show')?.value ?? 1;
            const labelPosition = setting.find(s => s.field === 'series_barColor_label_position')?.value ?? 'inside';
            const labelColor = setting.find(s => s.field === 'series_barColor_label_color')?.value ?? '#ffffff';
            const labelSize = setting.find(s => s.field === 'series_barColor_label_fontSize')?.value ?? 12;

            const groupCount = seriesFieldList.length;
            const groupOffsets = seriesFieldList.map((_, index) => {
                const centerOffset = index - (groupCount - 1) / 2;
                return `${centerOffset * 100 / groupCount}%`;
            });

            let newSeries = [];
            let globalMaxY = 0;

             seriesFieldList.forEach(seriesName => {
                 xDataOverall.forEach(xValue => {
                    const item = data.find(d => d[seriesField] === seriesName && d[xField] === xValue);
                    if (item && item[yField] > globalMaxY) {
                       globalMaxY = item[yField];
                    }
                 });
             });
             const shadowValue = globalMaxY + globalMaxY * 0.2;

            seriesFieldList.forEach((seriesName, index) => {
                const seriesData = xDataOverall.map(xValue => {
                    const item = data.find(d => d[seriesField] === seriesName && d[xField] === xValue);
                    return item ? item[yField] : null;
                });
                const shadowData = Array.from({ length: xDataOverall.length }, () => shadowValue);
                const offset = groupOffsets[index];
                const colors = option.seriesCustom;

                 newSeries.push(
                    {
                        id: `barTopColor_${seriesName}`,
                        type: 'pictorialBar',
                        tooltip: { show: false },
                        symbol: 'diamond',
                        symbolSize: [barWidth, barWidth / 2],
                        symbolOffset: [offset, -barWidth / 4],
                        symbolPosition: 'end',
                        z: 15, zlevel: 2,
                        color: colors?.barTopColor,
                        data: seriesData
                    },
                    {
                        id: `barColor_${seriesName}`,
                        type: 'bar',
                        barGap: '20%',
                        barWidth: barWidth,
                        color: colors?.barColor,
                        label: {
                            fontStyle: 'normal',
                            show: labelShow,
                            position: labelPosition,
                            color: labelColor,
                            fontSize: labelSize
                        },
                        zlevel: 2, z: 12,
                        data: seriesData
                    },
                    {
                        id: `barBottomColor_${seriesName}`,
                        type: 'pictorialBar',
                        tooltip: { show: false },
                        symbol: 'diamond',
                        symbolSize: [barWidth, barWidth / 2],
                        symbolOffset: [offset, barWidth / 4],
                        zlevel: 2, z: 15,
                        color: colors?.barBottomColor,
                        data: seriesData
                    },
                    {
                        id: `shadowColor_${seriesName}`,
                        type: 'bar',
                        tooltip: { show: false },
                        xAxisIndex: 1,
                        barGap: '20%',
                        data: shadowData,
                        zlevel: 1,
                        barWidth: barWidth,
                        color: colors?.shadowColor
                    },
                    {
                        id: `shadowTopColor_${seriesName}`,
                        type: 'pictorialBar',
                        tooltip: { show: false },
                        symbol: 'diamond',
                        symbolSize: [barWidth, barWidth / 2],
                        symbolOffset: [offset, -barWidth / 4],
                        symbolPosition: 'end',
                        z: 15,
                        color: colors?.shadowTopColor,
                        zlevel: 1,
                        data: shadowData
                    }
                );
            });

            option.series = newSeries;
            option.xAxis = option.xAxis?.map(item => ({ ...item, data: xDataOverall })) || [];
        }

      return option;
    },

    seriesStyle (config) {
      if(!config.name.includes('3D')){
        return config;
      }
      const _config = CloneDeep(config);
      const seriesCustom = _config.option.seriesCustom;
      const ids = Object.keys(seriesCustom || {});
      const isGroup = _config.option.series?.length > 5;

      if (!_config.option.series) return _config;

      _config.option.series.forEach(item => {
          const barWidth = seriesCustom?.barWidth || 30;
          if (item.type === 'pictorialBar') {
             item.symbolSize = [barWidth, barWidth / 2];
          } else if (item.type === 'bar') {
             item.barWidth = barWidth;
          }

          if (seriesCustom) {
             const baseId = item.id?.split('_')[0];
             if (baseId && seriesCustom[baseId]) {
                 item.color = seriesCustom[baseId];
             }
          }
      });
      return _config;
    },

    changeStyle (config, isUpdateTheme) {
       let _config = cloneDeep(config);
      _config = this.transformSettingToOption(_config, 'custom');

      if (_config.optionHandler) {
        try {
           const optionHandlerFn = new Function('option', 'setting', _config.optionHandler);
           let handlerOption = cloneDeep(_config.option);
           let handlerSetting = cloneDeep(_config.setting);
           optionHandlerFn(handlerOption, handlerSetting);
        } catch (e) {
          console.error("Error executing optionHandler:", e);
        }
      }

      _config = this.seriesStyle(_config);

      if (!isUpdateTheme) {
        _config.theme = settingToTheme(cloneDeep(_config), this.customTheme);
      }

      this.updateComponentConfig(_config);

      return _config;
    },

    updateComponentConfig(newConfig) {
        let currentConfigInStore;
        if (newConfig.code === this.activeCode) {
            currentConfigInStore = this.$store.state.bigScreen.activeItemConfig;
            if (!isEqual(newConfig, currentConfigInStore)) {
                this.changeActiveItemConfig(newConfig);
            }
        } else {
            currentConfigInStore = this.$store.state.bigScreen.pageInfo.chartList.find(chart => chart.code === newConfig.code);
            if (currentConfigInStore && !isEqual(newConfig, currentConfigInStore)) {
                 this.changeChartConfig(newConfig);
            } else if (!currentConfigInStore) {
                this.changeChartConfig(newConfig);
            }
        }
    }

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/echartStyle';
.light-theme{
  background-color: #ffffff;
  color: #000000;
}
.auto-theme{
  background-color: transparent;
}

</style>
