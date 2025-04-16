<template>
  <div class="three-render-core-simplified">
    <h4>ThreeRenderCore (Simplified)</h4>
    <p>Config received. Click button to copy:</p>
    <button @click="copyConfigToClipboard">
      Copy Config to Clipboard
    </button>
    <!-- Removed <pre> tag for direct display -->
    <p v-if="copyStatus">{{ copyStatus }}</p> <!-- Optional feedback -->
  </div>
</template>

<script>
// Removed * as THREE, GLTFLoader, OrbitControls imports

export default {
  name: 'ThreeRenderCore',
  props: {
    config: {
      type: Object,
      required: true
    },
    theme: { // Keep theme prop in case it's needed later
      type: String,
      default: 'dark'
    }
  },
  data() {
    // Removed all Three.js related state (scene, camera, renderer, model, loading, error, etc.)
    return {
      copyStatus: '' // Optional: For user feedback
    };
  },
  computed: {
    // Helper to format the config for display
    formattedConfig() {
      try {
        // Use JSON.stringify for pretty printing
        return JSON.stringify(this.config, null, 2);
      } catch (e) {
        return "Error formatting config: " + e.message;
      }
    }
  },
  watch: {
    // Removed all watchers related to config properties or theme
    config: {
      handler(newVal) {
          console.log('[ThreeRenderCore Simplified] Config prop updated:', JSON.parse(JSON.stringify(newVal || null)));
       },
       deep: true,
      immediate: true
    }
  },
  mounted() {
    // Removed all Three.js initialization logic
    console.log('[ThreeRenderCore Simplified] Mounted. Initial config:', JSON.parse(JSON.stringify(this.config || null)));
  },
  beforeDestroy() {
    // Removed all Three.js cleanup logic
    console.log('[ThreeRenderCore Simplified] Destroyed.');
  },
  methods: {
    copyConfigToClipboard() {
      try {
        const configString = JSON.stringify(this.config, null, 2);
        navigator.clipboard.writeText(configString)
          .then(() => {
            console.log('[ThreeRenderCore Simplified] Config copied to clipboard.');
            this.copyStatus = 'Config copied!'; // Optional feedback
            setTimeout(() => this.copyStatus = '', 2000); // Clear feedback after 2s
          })
          .catch(err => {
            console.error('[ThreeRenderCore Simplified] Failed to copy config: ', err);
            this.copyStatus = 'Failed to copy.'; // Optional feedback
             setTimeout(() => this.copyStatus = '', 2000);
          });
      } catch (e) {
        console.error('[ThreeRenderCore Simplified] Error stringifying config: ', e);
         this.copyStatus = 'Error preparing config.'; // Optional feedback
         setTimeout(() => this.copyStatus = '', 2000);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.three-render-core-simplified {
  width: 100%;
  height: 100%;
  padding: 15px;
  overflow: auto; // Allow scrolling if config is large
  background-color: #2a2a2a;
    color: #f0f0f0;
  border: 1px solid #444;
  box-sizing: border-box;
  font-family: monospace; // Use monospace font for pre
  font-size: 12px;

  h4 {
    margin-top: 0;
    border-bottom: 1px solid #555;
    padding-bottom: 5px;
  }

  button {
    padding: 8px 15px;
    background-color: var(--bs-el-color-primary);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    font-size: 14px;

    &:hover {
      background-color: var(--bs-el-color-primary-light-3);
    }
  }
  p {
    margin-top: 10px;
    font-size: 12px;
    min-height: 1.2em; // Reserve space for feedback message
  }
}
</style>