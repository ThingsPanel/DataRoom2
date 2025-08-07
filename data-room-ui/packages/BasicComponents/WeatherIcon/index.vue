<template>
  <div 
    class="bs-weather-icon-wrap" 
    :style="{
      width: '100%', height: '100%',
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: customize.backgroundColor
    }"
  >
    <div class="icons">
      <div class="icon">
        <!-- Bind class dynamically using customize.iconCode -->
        <i 
          :class="'qi-' + customize.iconCode" 
          :style="{ 
            fontSize: customize.iconSize + 'px',
            color: customize.iconColor
          }"
         ></i>
      </div>
    </div>
  </div>
</template>

<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins';

export default {
  name: 'WeatherIcon',
  mixins: [commonMixins],
  props: {
    config: { 
      type: Object, 
      required: true, 
      default: () => ({ customize: {}, option: {}, dataSource: {} })
    }
  },
  computed: {
    customize() {
      const defaults = {
        iconCode: '100',
        iconSize: 36,
        iconColor: '#666',
        backgroundColor: 'transparent'
      };
      return { ...defaults, ...(this.config?.customize ?? {}) };
    }
  },
  methods: {
    dataFormatting (config, data) {
      const metricField = config?.dataSource?.metricField;
      let newIconCode = config.customize.iconCode;

      if (config.dataSource?.source === 'dataset' && metricField && data.success) {
        if (data.data && data.data.length > 0) {
          const fetchedCode = data.data[0][metricField];
          if (fetchedCode != null) {
             newIconCode = String(fetchedCode);
          }
        } 
      } 

      this.$set(config.customize, 'iconCode', newIconCode);
      
      config.option = {
        ...(config.option || {}),
        data: data?.data ?? []
      };

      return config;
    }
  }
};
</script>

<style lang="scss" scoped>
/* Basic styles for the wrapper and icon */
.bs-weather-icon-wrap {
  /* Styles applied via inline binding */
}

.icons {
  /* Container for icon if needed */
}

.icon {
  i { /* Style the icon element */
    display: inline-block; /* Ensures font-size and color apply correctly */
    line-height: 1; /* Prevent extra spacing */
    /* Font-size and color are applied via inline styles from config */
  }
}
</style> 