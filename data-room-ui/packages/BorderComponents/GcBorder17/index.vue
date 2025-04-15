<template>
  <div
    style="width: 100%;height: 100%"
    class="gc-border-17"
  >
    <!-- Title Element - Positioned outside the clipped box -->
    <div 
      v-if="config.border.isTitle && config.title"
      class="border-title-element"
      ref="titleElement" 
      :style="titleStyle" 
    >
      <!-- Text First -->
      <span
        class="border-title-text"
        ref="titleTextSpan"
        :style="`
          color:${fontColor};
          font-size:${fontSize}px;
        `"
      >
        {{config.title}}
      </span>
      <!-- Decoration Below - Container width matches text width -->
      <div 
        class="title-decoration"
        :style="decorationContainerStyle"
      >
        <div 
          v-for="(_, index) in 20"
          :key="index" 
          class="stripe"
          :style="stripeStyle"
        ></div>
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
import { nextTick } from 'vue'

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
      titleStyle: {}, 
      decorationContainerWidth: 'auto'
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
    decorColor1() { 
        return this.config.border.decorColor1 || '#FFAD2C';
    },
    stripeStyle() {
        return {
            backgroundColor: this.decorColor1
        };
    },
    decorationContainerStyle() {
      return {
        width: this.decorationContainerWidth
      }
    }
  },
  watch: {
    'config.border': {
      async handler() {
        this.updateStyles();
        await nextTick();
        this.measureAndUpdateDecoration();
      },
      deep: true,
      immediate: true
    },
    'config.title': {
       async handler() {
        await nextTick();
        this.measureAndUpdateDecoration();
      },
      immediate: true
    }
  },
  mounted () {
      this.$nextTick(() => {
          this.measureAndUpdateDecoration();
      });
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

      this.titleStyle = {
          position: 'absolute',
          top: '0px',
          left: '0px',
          zIndex: 9999,
          maxWidth: `${this.cutWidth - 10}px`, 
      };
    },
    measureAndUpdateDecoration() {
        if (this.$refs.titleTextSpan) {
            const titleWidth = this.$refs.titleTextSpan.offsetWidth;
            this.decorationContainerWidth = `${titleWidth}px`; 
        } else {
            this.decorationContainerWidth = 'auto';
        }
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
  /* width is now controlled by :style="decorationContainerStyle" */
  height: 6px; /* Adjust height for the stripes */
  margin-top: 3px; /* Adjust spacing */
  overflow: hidden; /* Hide stripes that overflow the container */
  white-space: nowrap; /* Prevent wrapping inside the container */

  /* Apply common styles to the dynamically generated stripe class */
  .stripe {
    flex-shrink: 0; /* Prevent stripes from shrinking */
    width: 10px;      /* Set width for each stripe */
    height: 4px;      /* Set height for each stripe */
    margin-right: 3px; /* Space between stripes */
    /* background-color is now set via :style binding */
    transform: skewX(-30deg); /* Apply skew */
  }
  
  /* Remove individual stripe selectors */
  /* .stripe-1, .stripe-2, .stripe-3, .stripe-4 { ... } */
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