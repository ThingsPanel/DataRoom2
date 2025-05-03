<template>
  <div class="vchart-render-placeholder">
    <span v-if="isLoading">Loading...</span>
    <span v-else>VChart Render Placeholder - Config Received</span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import commonMixins from 'data-room-ui/js/mixins/commonMixins';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';

export default {
  name: 'VchartRender',
  mixins: [commonMixins],
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      internalSpec: null,
      debouncedGenerateSpec: null
    };
  },
  computed: {
    ...mapState('bigScreen', {
      pageInfo: state => state.pageInfo,
      activeCode: state => state.activeCode
    }),
    isPreview() {
      return this.$route.path === (window?.BS_CONFIG?.routers?.previewUrl || '/big-screen/preview');
    }
  },
  created() {
    this.debouncedGenerateSpec = debounce(this.generateVChartSpec, 300);

    this.$on('hook:beforeDestroy', () => {
      if (this.debouncedGenerateSpec) {
        this.debouncedGenerateSpec.cancel();
      }
    });
  },
  mounted() {
    this.chartInit();
    this.generateVChartSpec(this.config);
  },
  watch: {
    config: {
      handler(newConfig, oldConfig) {
        this.debouncedGenerateSpec(newConfig);
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations('bigScreen', [
      'changeChartConfig',
      'changeActiveItemConfig',
      'changeChartLoading'
    ]),

    generateVChartSpec(config) {
       console.log(1);
    },

    chartInit () {
      let config = this.config;
      this.isLoading = true;

      if (this.config.code === this.config.key || this.isPreview) {
        config = this.changeStyle(config);
        config.loading = true;
        this.changeChartLoading(config);
        this.changeDataByCode(config).then((resConfig) => {
          config.loading = false;
          this.changeChartLoading(config);
          this.isLoading = false;
          this.generateVChartSpec(resConfig || config);
        }).catch((err) => {
          config.loading = false;
          this.changeChartLoading(config);
          this.isLoading = false;
          this.generateVChartSpec(config);
        });
      } else {
        config.loading = true;
        this.changeChartLoading(config);
        this.changeData(config).then((resConfig) => {
          config.loading = false;
          this.changeChartLoading(config);
          this.isLoading = false;
          this.generateVChartSpec(resConfig || config);
        }).catch((err) => {
           config.loading = false;
           this.changeChartLoading(config);
           this.isLoading = false;
           this.generateVChartSpec(config);
        });
      }
    },

    changeStyle (config, isUpdateTheme = false) {
      this.changeChartConfig(config);
      if (config.code === this.activeCode) {
        this.changeActiveItemConfig(config);
      }
      return config;
    },

    dataFormatting(config, data) {
      if (data && data.success && data.data) {
        let processedData = cloneDeep(data.data);

        if (config.dataHandler && typeof config.dataHandler === 'string' && config.dataHandler.trim()) {
          try {
            const option = config.option || {};
            const setting = config.setting || [];
            const dataHandlerFn = new Function('data', 'option', 'setting', config.dataHandler);
            const resultFromHandler = dataHandlerFn(processedData, option, setting);
            if (resultFromHandler !== undefined) {
                processedData = resultFromHandler;
            }
          } catch (e) {
             // Handle error silently or log differently if needed
          }
        }

        if (!Array.isArray(processedData)) {
           processedData = [];
        }

        if (!config.option) config.option = {};
        config.option.rawData = processedData;

      } else {
        if (!config.option) config.option = {};
        config.option.rawData = [];
      }
      return config;
    },

    transformSettingToOption (config, type) {
       return config;
    },
  }
}
</script>

<style scoped>
.vchart-render-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  color: #999;
  font-size: 14px;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}
.vchart-render-placeholder span[v-if="isLoading"] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
}
</style>
