<template>
  <div
    style="width: 100%;height: 100%"
    class="gc-border-17"
  >
    <!-- Title Element - Positioned outside the clipped box -->
    <div 
      v-if="config.border.isTitle"
      class="border-title-element"
      ref="titleElement" 
      :style="titleStyle" 
    >
      <!-- Text First -->
      <span
        class="border-title-text"
        :style="`
          color:${fontColor};
          font-size:${fontSize}px;
        `"
      >
        {{config.title}}
      </span>
      <!-- Decoration Below -->
      <div class="title-decoration">
        <div class="stripe-1" :style="`background-color: ${decorColor1};`"></div>
        <div class="stripe-2" :style="`background-color: ${decorColor1};`"></div>
        <div class="stripe-3" :style="`background-color: ${decorColor1};`"></div>
        <div class="stripe-4" :style="`background-color: ${decorColor1};`"></div>
      </div>
    </div>

    <!-- Clipped Border Box -->
    <div
      :key="updateKey"
      class="custom-border-box"
      :style="customBorderStyle"
    >
      <!-- Inner fill for background, also clipped -->
      <div 
        class="inner-fill"
        :style="innerFillStyle"
      >
        <!-- Content Slot -->
        <div 
          class="border-content-wrap"
          :style="contentWrapStyle"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { refreshComponentMixin } from 'data-room-ui/js/mixins/refreshComponent'

export default {
  name: 'GcBorder17',
  components: {
  },
  mixins: [refreshComponentMixin],
  props: {
    config: {
      type: Object,
      default: () => ({
        border: {
          borderWidth: 1,
          borderColor: '#001C89', 
          bgColor: 'transparent',
          cutWidth: 120, 
          cutHeight: 25,  
          slopeWidth: 20, 
          isTitle: true,
          fontColor: '#FFFFFF',
          fontSize: 14,
          decorColor1: '#FFAD2C' // Added default decor color
        },
        title: '测试标题'
      })
    }
  },
  data () {
    return {
      customBorderStyle: {},
      innerFillStyle: {},
      contentWrapStyle: {},
      titleStyle: {} 
    }
  },
  computed: {
    bgColor () {
      return this.config.border.bgColor || 'transparent'
    },
    borderColor () {
      return this.config.border.borderColor || '#001C89'
    },
    borderWidth () {
      const width = Number(this.config.border.borderWidth);
      return !isNaN(width) && width >= 0 ? width : 1;
    },
    cutWidth() {
      const width = Number(this.config.border.cutWidth);
      return !isNaN(width) && width >= 0 ? width : 120; 
    },
    cutHeight() {
      const height = Number(this.config.border.cutHeight);
      return !isNaN(height) && height >= 0 ? height : 25; 
    },
    slopeWidth() {
        const width = Number(this.config.border.slopeWidth);
        return !isNaN(width) && width >= 0 ? width : 20; 
    },
    fontColor() {
        return this.config.border.fontColor || '#FFFFFF';
    },
    fontSize() {
        const size = Number(this.config.border.fontSize);
        return !isNaN(size) && size > 0 ? size : 14;
    },
    decorColor1() { // Added computed for decor color
        return this.config.border.decorColor1 || '#FFAD2C';
    }
  },
  watch: {
    'config.border': {
      handler() {
        this.updateStyles();
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
  },
  methods: {
    updateStyles() {
      const clipPath = `polygon(
          0 ${this.cutHeight}px, 
          ${this.cutWidth}px ${this.cutHeight}px, 
          ${this.cutWidth + this.slopeWidth}px 0, 
          100% 0, 
          100% 100%, 
          0 100%
        )`;
      
      this.customBorderStyle = {
        border: `${this.borderWidth}px solid ${this.borderColor}`,
        clipPath: clipPath
      };

      this.innerFillStyle = {
        background: this.bgColor,
        clipPath: clipPath
      };

      this.contentWrapStyle = {
        paddingTop: `${this.cutHeight + 15}px`,
        paddingLeft: '15px',
        paddingRight: '15px',
        paddingBottom: '15px'
      };

      // Update title style object - Simplified for positioning and max-width
      this.titleStyle = {
          position: 'absolute',
          top: '0px',
          left: '0px',
          zIndex: 9999,
          maxWidth: `${this.cutWidth - 10}px`, 
          // height, display, alignItems, lineHeight are now handled by CSS class
      };
    }
  }
}
</script>

<style lang="scss" scoped>
.gc-border-17 {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.custom-border-box {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box; 
}

.inner-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: inherit;
  z-index: 1;
}

/* Styles for title element */
.border-title-element {
  position: absolute; /* Keep positioning */
  top: 0px; 
  left: 0px; 
  display: flex; /* Use flexbox */
  flex-direction: column; /* Stack items vertically */
  align-items: flex-start; /* Align items to the start (left) */
  padding: 2px 5px; 
  box-sizing: border-box;
  z-index: 2; 
  overflow: hidden; 
  white-space: nowrap;
  /* Remove fixed height, let content determine height */
}

.title-decoration {
  position: relative;
  display: flex; /* Use flex to align stripes horizontally */
  align-items: center; /* Vertically center stripes if needed */
  width: auto; /* Let content determine width */
  height: 6px; /* Adjust height for the stripes */
  margin-top: 3px; /* Adjust spacing */
  
  /* Remove absolute positioning styles from stripes */
  /* Apply common styles to all stripes */
  .stripe-1, .stripe-2, .stripe-3, .stripe-4 {
    width: 10px;      /* Set width for each stripe */
    height: 4px;      /* Set height for each stripe */
    margin-right: 3px; /* Space between stripes */
    background-color: inherit; /* Inherit color from parent style binding */
    transform: skewX(-30deg); /* Apply skew */
    /* Removed position: absolute, left, top */
  }
  
  /* Remove individual stripe positioning/sizing */
  /* .stripe-1 { ... } */
  /* .stripe-2 { ... } */
  /* .stripe-3 { ... } */
  /* .stripe-4 { ... } */
  /* Removed .stripe-5 styles */
}

.border-title-text {
  display: block; /* Ensure it takes full width in flex column */
  font-weight: bold;
  white-space: nowrap;
  margin-left: 0;
  overflow: hidden; 
  text-overflow: ellipsis; 
}
/* End of title styles */

.border-content-wrap {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}

/* Optional: Scrollbar styles */
::v-deep ::-webkit-scrollbar {
  width: 4px;
  border-radius: 4px;
  height: 4px;
}

::v-deep ::-webkit-scrollbar-thumb {
  background: #dddddd !important;
  border-radius: 10px;
}
</style> 