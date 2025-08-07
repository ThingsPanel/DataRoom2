<template>
  <div class="three-render-core" ref="container">
    <!-- Small floating copy button -->
    <button class="copy-button" @click="copyConfigToClipboard" title="Copy Config">
      <i class="el-icon-document-copy"></i>
    </button>
    <div class="loading-indicator" v-if="loading">Loading Model...</div>
    <div class="error-message" v-if="error">{{ error }}</div>
    
    <!-- Container for HTML Labels -->
    <div class="html-label-container" ref="htmlLabelContainer"></div>
    
    <!-- Canvas will be appended here by Three.js -->
  </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import _ from 'lodash'; // Import lodash for deep comparison

export default {
  name: 'ThreeRenderCore',
  props: {
    config: {
      type: Object,
      required: true
    },
    theme: {
      type: String,
      default: 'dark'
    }
  },
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      model: null,
      animationId: null,
      loading: false,
      error: null,
      containerWidth: 0,
      containerHeight: 0,
      resizeObserver: null,
      copyStatus: '', // For potential feedback, though button is small
      ambientLight: null,
      directionalLight: null,
      directionalLight2: null,
      htmlLabels: [], // Now holds { id, labelElement, valueContainerElement, descriptionElement, width, height, dataPointRef }
    };
  },
  watch: {
    // Watch the correct path for model changes
    'config.option.customize.modelPath': {
      handler(newPath, oldPath) {
        if (newPath && newPath !== oldPath) {
          this.loadModel();
        }
      },
      // immediate: true // mounted handles initial load
    },
    // Watch for background color changes
    'config.option.customize.backgroundColor': {
        handler() {
            this.updateSceneBackground();
        }
    },
    // Watch for shadow enable/disable changes
    'config.option.customize.enableShadows': {
      handler(newValue) {
        this.updateShadows(newValue);
      }
    },
    // Watchers for light intensity changes
    'config.option.customize.ambientLightIntensity': {
        handler(newValue) {
            if (this.ambientLight) {
                this.ambientLight.intensity = newValue ?? 0.5; // Default fallback
            }
        }
    },
     'config.option.customize.directionalLightIntensity': {
        handler(newValue) {
            if (this.directionalLight) {
                this.directionalLight.intensity = newValue ?? 0.8; // Default fallback
            }
        }
    },
     'config.option.customize.directionalLight2Intensity': {
        handler(newValue) {
            if (this.directionalLight2) {
                this.directionalLight2.intensity = newValue ?? 0.4; // Default fallback
            }
        }
    },
    // Watchers for model transforms
    'config.option.customize.modelScale': {
      handler(newValue) {
        if (this.model && typeof newValue === 'number' && newValue > 0) {
           this.model.scale.set(newValue, newValue, newValue);
        } else if (this.model && typeof newValue !== 'number') {
            this.model.scale.set(1, 1, 1);
        } else if (this.model && newValue <= 0) {
            this.model.scale.set(1, 1, 1);
        }
      }
    },
    'config.option.customize.modelPositionY': {
       handler(newValue) {
          if (this.model && typeof newValue === 'number') {
            this.model.position.y = newValue;
          } else if (this.model) {
            this.model.position.y = 0;
          }
       }
    },
    // Optimized watcher for dataPoints changes
    'config.option.customize.dataPoints': {
        handler(newPoints, oldPoints) {
             // --- GUARD against early execution --- 
             if (!this.model) {
                 return; // Don't do anything if model isn't ready
             }
             // -------------------------------------
            
            if (!this.camera || !this.renderer) return; // Guard against early calls
            
            newPoints = newPoints || [];
            oldPoints = oldPoints || [];

            let needsRecreation = false;
            if (newPoints.length !== oldPoints.length) {
                needsRecreation = true;
            } else {
                 for (let i = 0; i < newPoints.length; i++) {
                     const np = newPoints[i];
                     const op = oldPoints[i];
                     if (!op || np.id !== op.id ||
                         np.position?.x !== op.position?.x ||
                         np.position?.y !== op.position?.y ||
                         np.position?.z !== op.position?.z) // Check only structural changes
                     {
                         needsRecreation = true;
                         break;
                     }
                 }
            }

            if (needsRecreation) {
                 this.createHtmlLabels(); // Recreate labels fully
            } else {
                 // Structure is the same, update only static content (name, description)
                 // Values and status are handled by the config.option.data watcher
                 // Call the new method instead of the deleted one
                 this.updateHtmlLabelStaticContent(newPoints);
            }
        },
       deep: true
    },
    theme() {
      this.updateSceneBackground();
    },
    // Watch container size for label repositioning (alternative to window resize)
    containerWidth() {
        // Trigger position update on container resize
        // This is handled by onWindowResize which calls updateHtmlLabelPositions
    },
    containerHeight() {
        // Trigger position update on container resize
    },
    // Watcher for the actual data updates
    'config.option.data': {
        handler(newData, oldData) {
            if (!this.model || !this.htmlLabels || this.htmlLabels.length === 0 || !newData) {
                return;
            }


            if (!Array.isArray(newData)) {
                return;
            }

            // Create a map for efficient lookup: { bindingKey: value }
            const dataMap = new Map(newData.map(item => item && item.id !== undefined ? [item.id, item.value] : null).filter(Boolean));

            this.htmlLabels.forEach(labelInfo => {
                const pointConfig = labelInfo.dataPointRef;
                const valueContainerElement = labelInfo.valueContainerElement; // Use the container for value items
                const labelElement = labelInfo.labelElement;

                if (!pointConfig || !valueContainerElement || !pointConfig.dataStructure) return;

                let overallWorstStatus = 'normal'; // Track the most severe status for the whole tag

                pointConfig.dataStructure.forEach(structureItem => {
                    const bindingKey = structureItem.bindingKey;
                    if (!bindingKey) return;

                    const itemContainer = valueContainerElement.querySelector(`[data-binding-key="${bindingKey}"]`);
                    const valueTextElement = itemContainer?.querySelector('.value-text');
                    const unitElement = valueContainerElement.querySelector(`[data-binding-key="${bindingKey}"] .unit-text`);

                    if (itemContainer && valueTextElement) {
                        const latestValue = dataMap.has(bindingKey) ? dataMap.get(bindingKey) : structureItem.defaultValue; // Use latest or default
                        const latestValueStr = latestValue === undefined || latestValue === null ? '--' : String(Number(latestValue).toFixed(2)); // Format value

                        // Update value text if changed
                        if (valueTextElement.textContent !== latestValueStr) {
                            valueTextElement.textContent = latestValueStr;
                        }
                        // Update unit text (might not change often, but good practice)
                        if (unitElement && unitElement.textContent !== structureItem.unit) {
                           unitElement.textContent = structureItem.unit || '';
                        }

                        // Calculate status
                        const itemStatus = this.getStatus(latestValue, structureItem.thresholds);

                        // --- Apply status class (for CSS to handle color) ---
                        itemContainer.classList.remove('status-normal', 'status-warning', 'status-danger');
                        itemContainer.classList.add(`status-${itemStatus}`);
                        // ----------------------------------------------------

                        // Determine overall worst status
                        const statusOrder = { 'normal': 0, 'warning': 1, 'danger': 2 };
                        if (statusOrder[itemStatus] > statusOrder[overallWorstStatus]) {
                            overallWorstStatus = itemStatus;
                        }
                    }
                });

                // Update the main label's border based on the overall worst status (only applies class now)
                this.setLabelStatusClass(labelElement, overallWorstStatus);
            });
        },
        deep: true
    }
  },
  mounted() {
    this.initThree();

    // Add ResizeObserver
    this.resizeObserver = new ResizeObserver(this.onWindowResize);
    if (this.$refs.container) {
      this.resizeObserver.observe(this.$refs.container);
    }
    this.onWindowResize(); // Initial size calculation

    // Attempt initial model load
    if (this.config?.option?.customize?.modelPath) {
      this.loadModel(); 
    } else {
      this.error = 'Model path not specified in configuration.';
    }
  },
  beforeDestroy() {
    this.cleanup();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  },
  methods: {
    initThree() {
      try {
        const container = this.$refs.container;
        if (!container) {
           return;
        }
        this.containerWidth = container.clientWidth;
        this.containerHeight = container.clientHeight;

        // Basic Scene
        this.scene = new THREE.Scene();
        this.updateSceneBackground();

        // Camera
        this.camera = new THREE.PerspectiveCamera(50, this.containerWidth / this.containerHeight, 0.1, 1000);
        this.camera.position.set(0, 1.6, 5); // Default position, fitCameraToModel will adjust

        // Renderer - Adjust settings to match example's likely defaults
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.containerWidth, this.containerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.outputEncoding = THREE.sRGBEncoding; // Keep sRGB
        this.renderer.toneMapping = THREE.LinearToneMapping; // Use Linear instead of ACES Filmic
        this.renderer.toneMappingExposure = 1.0; // Default exposure
        
        // Apply initial shadow setting from config
        this.updateShadows(this.config?.option?.customize?.enableShadows ?? true);

        container.appendChild(this.renderer.domElement);

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = this.config?.option?.customize?.enableDamping ?? true;
        this.controls.target.set(0, 1, 0);
        this.controls.update();

        // --- Lighting Setup ---
        // Get intensities from config, provide defaults if missing
        const ambientIntensity = this.config?.option?.customize?.ambientLightIntensity ?? 0.5;
        const dirIntensity = this.config?.option?.customize?.directionalLightIntensity ?? 0.8;
        const dir2Intensity = this.config?.option?.customize?.directionalLight2Intensity ?? 0.4;

        // Ambient Light
        this.ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity);
        this.scene.add(this.ambientLight);
        
        // Directional Light 1 (Main)
        this.directionalLight = new THREE.DirectionalLight(0xffffff, dirIntensity);
        this.directionalLight.position.set(5, 10, 7.5);
        this.directionalLight.castShadow = this.config?.option?.customize?.enableShadows ?? true;
        this.directionalLight.shadow.mapSize.width = 1024;
        this.directionalLight.shadow.mapSize.height = 1024;
        this.directionalLight.shadow.camera.near = 0.5;
        this.directionalLight.shadow.camera.far = 50;
        this.scene.add(this.directionalLight);
        
        // Directional Light 2 (Fill)
        this.directionalLight2 = new THREE.DirectionalLight(0xffffff, dir2Intensity);
        this.directionalLight2.position.set(-5, 8, -7);
        // Fill lights usually don't cast shadows, but could be made configurable
        // this.directionalLight2.castShadow = false; 
        this.scene.add(this.directionalLight2);

        // Start Animation Loop
        this.animate();
      } catch (err) {
        this.error = "Failed to initialize 3D view.";
      }
    },

    updateSceneBackground() {
      if (this.scene) {
        const customBgColor = this.config?.option?.customize?.backgroundColor;
        if (customBgColor) {
             try {
                 this.scene.background = new THREE.Color(customBgColor);
             } catch (e) {
                 // Fallback to theme-based color on error
                 this.scene.background = this.theme === 'light' ? new THREE.Color(0xeeeeee) : new THREE.Color(0x1a1a1a);
             }
        } else {
            // Fallback to theme if no custom color is set
            this.scene.background = this.theme === 'light' ? new THREE.Color(0xeeeeee) : new THREE.Color(0x1a1a1a);
        }
        // Ensure renderer alpha is true if we want background to show or be transparent based on CSS
        if(this.renderer) this.renderer.setClearAlpha(1); // Use 1 to show scene background, 0 for transparent
      }
    },

    // New method to handle shadow updates
    updateShadows(enabled) {
        if (this.renderer) {
            this.renderer.shadowMap.enabled = enabled;
        }
        if (this.directionalLight) { // Check if light exists
            this.directionalLight.castShadow = enabled;
        }
        // Update materials that need shadow changes? Usually not necessary for simple enable/disable
        // If you dynamically add/remove objects that cast/receive shadows, you might need: 
        // this.scene.traverse(child => { if (child.material) child.material.needsUpdate = true; });
    },

    loadModel() {
      if (!this.scene) {
        return;
      }

      // --- Read modelPath from the correct location --- 
      const modelPath = this.config?.option?.customize?.modelPath;

      // Clear previous model if exists
      if (this.model) {
        this.scene.remove(this.model);
        // TODO: Proper disposal of geometry/materials if needed
      }
      this.model = null;
      this.clearHtmlLabels(); // Clear HTML labels before loading new model
      this.error = null;
      this.loading = true;

      if (!modelPath) {
        this.error = 'Model path is not specified in config.option.customize';
        this.loading = false;
        return;
      }

      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          this.model = gltf.scene;
          if (this.scene) {
          this.scene.add(this.model);
        
          if (!this.animationFrameId && this.renderer) {
            this.animate();
        }
          this.applyInitialModelTransforms(); 
          this.setupInitialCameraView(this.model);
          
         
          // ---------------------------------------

          // Create HTML labels after model is ready (this should be the definitive initial creation)
          this.createHtmlLabels();
          }else {
        // 如果 scene 不存在，给出警告并清理
        this.model = null; // 清理模型引用
      }
          this.loading = false;
        },
        (xhr) => {
          // Progress indicator (optional)
        },
        (loadError) => {
          this.error = `Failed to load model: ${loadError.message || 'Unknown error'}`;
          this.loading = false;
          this.clearHtmlLabels(); // Clear any potentially half-created labels on error
        }
      );
    },

    // Helper to apply initial transforms
    applyInitialModelTransforms() {
         if (!this.model) return;
         const initialScale = this.config?.option?.customize?.modelScale;
         const initialPosY = this.config?.option?.customize?.modelPositionY;

         if (typeof initialScale === 'number' && initialScale > 0) {
             this.model.scale.set(initialScale, initialScale, initialScale);
         } else {
             this.model.scale.set(1, 1, 1);
         }
         
         if (typeof initialPosY === 'number') {
              this.model.position.y = initialPosY;
         } else {
              this.model.position.y = 0;
         }
    },

    // Renamed and modified method for setting initial camera view
    setupInitialCameraView(targetModel) {
      if (!this.camera || !this.controls || !targetModel) return;

      const customPos = this.config?.option?.customize?.initialCameraPosition;
      const customTarget = this.config?.option?.customize?.initialCameraTarget;

      // Check if both custom position and target are valid objects with x, y, z
      const useCustomView = 
          customPos && typeof customPos === 'object' && 'x' in customPos && 'y' in customPos && 'z' in customPos &&
          customTarget && typeof customTarget === 'object' && 'x' in customTarget && 'y' in customTarget && 'z' in customTarget;

      if (useCustomView) {
        try {
            this.camera.position.set(customPos.x, customPos.y, customPos.z);
            this.controls.target.set(customTarget.x, customTarget.y, customTarget.z);
            // Optionally adjust near/far based on distance, or use fixed values
            const distance = this.camera.position.distanceTo(this.controls.target);
            this.camera.near = Math.max(0.1, distance / 100); // Ensure near > 0
            this.camera.far = distance * 100;
        } catch (e) {
             // Fallback to default fitting if error occurs
             this.fitCameraToModelFallback(targetModel);
        }
      } else {
         this.fitCameraToModelFallback(targetModel);
      }
      
      this.camera.updateProjectionMatrix();
      this.controls.update(); // IMPORTANT: Update controls after setting position/target
    },

    // Renamed the original fitting logic to be used as a fallback
    fitCameraToModelFallback(targetModel) {
        if (!this.camera || !this.controls || !targetModel) return;

        const box = new THREE.Box3().setFromObject(targetModel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Calculate distance to fit model based on FOV and size
        const maxSize = Math.max(size.x, size.y, size.z);
        const fitHeightDistance = maxSize / (2 * Math.atan(Math.PI * this.camera.fov / 360));
        const fitWidthDistance = fitHeightDistance / this.camera.aspect;
        let distance = Math.max(fitHeightDistance, fitWidthDistance);

        // Apply initialZoomFactor from config if available
        const zoomFactor = this.config?.option?.customize?.initialZoomFactor;
        if (typeof zoomFactor === 'number' && zoomFactor > 0) {
            distance /= zoomFactor; // Divide distance by zoom factor (smaller factor = closer zoom)
        } 
        // Ensure distance is reasonable
        distance = Math.max(distance, 0.1); // Prevent zero or negative distance

        // Calculate new camera position based on current view direction
        const direction = this.controls.target.clone().sub(this.camera.position).normalize().multiplyScalar(-distance);

        // Set controls target to the center of the model
        this.controls.target.copy(center); 

        // Update camera position
        this.camera.position.copy(this.controls.target).add(direction);

        // Update camera near/far planes based on new distance
        this.camera.near = Math.max(0.1, distance / 100); // Ensure near > 0
        this.camera.far = distance * 100;
        
        // Apply maxDistance to controls (optional, could be configurable too)
        // this.controls.maxDistance = distance * 10;

        // Note: controls.update() and camera.updateProjectionMatrix() are called in setupInitialCameraView
    },

    animate() {
      if (!this.renderer || !this.scene || !this.camera) return;
      this.animationId = requestAnimationFrame(this.animate);
      
      // Apply rotation from config if model exists
      const rotationSpeed = this.config?.option?.customize?.rotationSpeed;
      if (this.model && typeof rotationSpeed === 'number' && rotationSpeed !== 0) {
        this.model.rotation.y += rotationSpeed;
      }

      if (this.controls) {
        this.controls.update();
      }

      // Update HTML label positions
      this.updateHtmlLabelPositions(); 

      // Render the scene
      this.renderer.render(this.scene, this.camera);
    },

    onWindowResize() {
      const container = this.$refs.container;
      if (!container || !this.renderer || !this.camera) return;

      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      if (newWidth !== this.containerWidth || newHeight !== this.containerHeight) {
        this.containerWidth = newWidth;
        this.containerHeight = newHeight;

        this.camera.aspect = newWidth / newHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(newWidth, newHeight);
        // No need to explicitly call updateHtmlLabelPositions here, 
        // as it's called every frame in animate()
      }
    },

    cleanup() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      this.clearHtmlLabels(); // Clean up HTML labels
      if (this.renderer) {
        this.renderer.dispose();
         if (this.renderer.domElement && this.$refs.container && this.$refs.container.contains(this.renderer.domElement)) {
             this.$refs.container.removeChild(this.renderer.domElement);
         }
      }
       // Dispose scene resources (geometry, material, textures)
      if (this.scene) {
        this.scene.traverse(object => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
            if (object.texture) object.texture.dispose();
        });
      }
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.controls = null;
      this.model = null;
      // Dispose stored lights if needed
      this.ambientLight = null; 
      this.directionalLight = null;
      this.directionalLight2 = null;
    },

    copyConfigToClipboard() {
       try {
         const configString = JSON.stringify(this.config, null, 2);
         navigator.clipboard.writeText(configString)
        
       } catch (e) {
       }
     },

    // --- Apply styles helper --- 
    applyStyles(element, styleObject) {
        if (!element || !styleObject || typeof styleObject !== 'object') {
            return;
        }
        for (const prop in styleObject) {
            if (Object.prototype.hasOwnProperty.call(styleObject, prop)) {
                try {
                    // Directly assign camelCase or kebab-case (browser handles most)
                    element.style[prop] = styleObject[prop];
                } catch (e) {
                }
            }
        }
    },
    // --- End Apply styles helper ---

    // --- HTML Label Methods ---
    clearHtmlLabels() {
      const container = this.$refs.htmlLabelContainer;
      if (!container) return; // Add guard
      this.htmlLabels.forEach(labelInfo => {
        if (labelInfo.labelElement && labelInfo.labelElement.parentNode === container) {
          container.removeChild(labelInfo.labelElement);
        }
      });
      this.htmlLabels = [];
    },

    createHtmlLabels() {
      this.clearHtmlLabels();
      const container = this.$refs.htmlLabelContainer;
      const dataPoints = this.config?.option?.customize?.dataPoints;

      if (!container || !Array.isArray(dataPoints)) {
        return;
      }

      const initialDataArray = this.config?.option?.data || [];
      const initialDataMap = new Map(initialDataArray.map(item => item && item.id !== undefined ? [item.id, item.value] : null).filter(Boolean));

      dataPoints.forEach((point, index) => {
        if (!point || typeof point.position !== 'object') {
            return;
        }
        const pointId = point.id || `label-${index}`;


        // Create elements
        const labelElement = document.createElement('div');
        labelElement.className = 'data-tag';
        labelElement.style.position = 'absolute';
        labelElement.style.display = 'none';
        labelElement.style.pointerEvents = 'auto';
        labelElement.dataset.pointId = pointId;
        // Apply point-level styles if defined (optional)
        // this.applyStyles(labelElement, point.style); 

        const titleElement = document.createElement('div');
        titleElement.className = 'title';
        titleElement.textContent = point.name || 'N/A';

        const valueContainerElement = document.createElement('div');
        valueContainerElement.className = 'value-container';

        let overallWorstStatus = 'normal';

        if (point.dataStructure && Array.isArray(point.dataStructure)) {
            point.dataStructure.forEach(structureItem => {
                const bindingKey = structureItem.bindingKey;
                if (!bindingKey) return;

                const valueLineElement = document.createElement('div');
                valueLineElement.className = 'value-line';
                valueLineElement.dataset.bindingKey = bindingKey;

                // --- Apply structureItem specific styles --- 
                this.applyStyles(valueLineElement, structureItem.style);
                // ---------------------------------------------

                const labelText = structureItem.label ? `${structureItem.label}: ` : '';
                const valueTextElement = document.createElement('span');
                valueTextElement.className = 'value-text';
                const initialValue = initialDataMap.has(bindingKey) ? initialDataMap.get(bindingKey) : structureItem.defaultValue;
                valueTextElement.textContent = initialValue === undefined || initialValue === null ? '--' : String(Number(initialValue).toFixed(2));

                const unitTextElement = document.createElement('span');
                unitTextElement.className = 'unit-text';
                unitTextElement.textContent = structureItem.unit || '';

                valueLineElement.appendChild(document.createTextNode(labelText));
                valueLineElement.appendChild(valueTextElement);
                valueLineElement.appendChild(unitTextElement);
                valueContainerElement.appendChild(valueLineElement);

                // Calculate initial status and apply color/class
                const itemStatus = this.getStatus(initialValue, structureItem.thresholds);
                valueLineElement.classList.add(`status-${itemStatus}`);
            });
        } else {
            // Fallback if no dataStructure (simple value)
            valueContainerElement.textContent = '--'; // Or use point.value if it exists?
        }

        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'description';
        descriptionElement.textContent = point.description || '';

        labelElement.appendChild(titleElement);
        labelElement.appendChild(valueContainerElement);
        labelElement.appendChild(descriptionElement);

        // Apply initial overall status class AND border color
        this.setLabelStatusClass(labelElement, overallWorstStatus); // This relies on setLabelStatusClass being updated too

        // Measure and Cache Dimensions
        labelElement.style.visibility = 'hidden';
        labelElement.style.display = 'block';
        container.appendChild(labelElement);
        const width = labelElement.offsetWidth;
        const height = labelElement.offsetHeight;
        labelElement.style.display = 'none';
        labelElement.style.visibility = 'visible';

        if (width > 0 && height > 0) {
            this.htmlLabels.push({
                id: pointId,
                labelElement: labelElement,
                valueContainerElement: valueContainerElement, // Store reference to value container
                descriptionElement: descriptionElement,
                width: width,
                height: height,
                dataPointRef: point
            });
        } else {
             if(labelElement.parentNode === container) {
                 container.removeChild(labelElement);
             }
        }
      });
       this.$nextTick(() => {
           if (this.camera && this.renderer) {
             this.updateHtmlLabelPositions();
           }
       });
    },

    // Helper to set status class ONLY on the main tag element
    setLabelStatusClass(element, status) {
        if (!element) return;
        element.classList.remove('status-normal', 'status-warning', 'status-danger');
        const validStatus = ['normal', 'warning', 'danger'].includes(status) ? status : 'normal';
        element.classList.add(`status-${validStatus}`);
    },

     // New helper method to calculate status based on value and thresholds
    getStatus(value, thresholds) {
        if (thresholds === undefined || thresholds === null || value === undefined || value === null) {
            return 'normal'; // Default to normal if no thresholds or value
        }
        const numValue = Number(value);
        if (isNaN(numValue)) {
             return 'normal'; // Treat non-numeric values as normal
        }

        // Check danger thresholds first (more specific)
        if (thresholds.dangerMin !== undefined && numValue >= thresholds.dangerMin) {
            return 'danger';
        }
         if (thresholds.dangerMax !== undefined && numValue <= thresholds.dangerMax) {
            return 'danger';
        }
         if (Array.isArray(thresholds.danger) && thresholds.danger.length === 2 && numValue >= thresholds.danger[0] && numValue <= thresholds.danger[1]) {
             return 'danger';
         }


        // Check warning thresholds
        if (thresholds.warningMin !== undefined && numValue >= thresholds.warningMin) {
            return 'warning';
        }
         if (thresholds.warningMax !== undefined && numValue <= thresholds.warningMax) {
             return 'warning';
         }
        if (Array.isArray(thresholds.warning) && thresholds.warning.length === 2 && numValue >= thresholds.warning[0] && numValue <= thresholds.warning[1]) {
            return 'warning';
        }

        // Check normal thresholds (less common to define explicitly, but possible)
        if (thresholds.normalMin !== undefined && numValue < thresholds.normalMin) {
           // Outside normal range - could be warning/danger handled above, or undefined state
           // Let's assume if it's not danger/warning, it implies normal unless normal range is specified *and* it falls outside
           // If only normal range is specified, maybe return 'warning'? Let's stick to explicit danger/warning first.
        }
        if (thresholds.normalMax !== undefined && numValue > thresholds.normalMax) {
           // Outside normal range
        }
         if (Array.isArray(thresholds.normal) && thresholds.normal.length === 2 && (numValue < thresholds.normal[0] || numValue > thresholds.normal[1])) {
             // Outside explicit normal range - this might imply warning or danger depending on setup
             // It's safer to rely on explicit warning/danger thresholds.
             // If NO warning/danger defined, and outside normal, maybe return 'warning'?
             // For simplicity now: if it's not caught by danger/warning, assume normal.
         }


        // If none of the above matched, assume normal
        return 'normal';
    },

    updateHtmlLabelPositions() {
        if (!this.camera || !this.renderer || this.htmlLabels.length === 0) return;

        const placedLabelRects = [];
        // Read padding and offset from config, provide defaults
        const labelCollisionPadding = this.config?.option?.customize?.labelCollisionPadding ?? 5;
        const labelVerticalOffset = this.config?.option?.customize?.labelVerticalOffset ?? -20;
        
        const vec = new THREE.Vector3(); 
        const canvas = this.renderer.domElement;
        const camera = this.camera;
        const widthHalf = canvas.clientWidth / 2;
        const heightHalf = canvas.clientHeight / 2;

        // --- Projections --- 
        const projections = this.htmlLabels.map(labelInfo => {
           const point = labelInfo.dataPointRef;
           if (!point || !point.position) return null;
           vec.set(point.position.x, point.position.y, point.position.z);
           vec.project(camera);
           if (vec.z > 1) return null;
           return {
               id: labelInfo.id,
               x: (vec.x * widthHalf) + widthHalf,
               y: -(vec.y * heightHalf) + heightHalf,
               z: vec.z
           };
        });
        
        // --- Positioning Loop --- 
        this.htmlLabels.forEach(labelInfo => {
            const labelElement = labelInfo.labelElement;
            const labelWidth = labelInfo.width;
            const labelHeight = labelInfo.height;
            const proj = projections.find(p => p && p.id === labelInfo.id);

            if (!proj) {
                labelElement.style.display = 'none';
                return;
            }

            let targetX = proj.x;
            // Use configured vertical offset
            let targetY = proj.y + labelVerticalOffset; 
            
            // ... Collision Detection & Avoidance ...
            let currentLeft = targetX - labelWidth / 2;
            let currentTop = targetY - labelHeight / 2;
            let currentRight = currentLeft + labelWidth;
            let currentBottom = currentTop + labelHeight;
            let collisionDetected = true;
            let attempts = 0;
            const maxAttempts = 15;

            while (collisionDetected && attempts < maxAttempts) {
                collisionDetected = false;
                for (const placedRect of placedLabelRects) {
                    // ... overlap check ...
                     const overlaps = 
                        currentLeft < placedRect.right &&
                        currentRight > placedRect.left &&
                        currentTop < placedRect.bottom &&
                        currentBottom > placedRect.top;

                    if (overlaps) {
                        collisionDetected = true;
                        // Use configured collision padding
                        currentTop = placedRect.bottom + labelCollisionPadding;
                        currentBottom = currentTop + labelHeight;
                        targetY = currentTop + labelHeight / 2; 
                        currentLeft = targetX - labelWidth / 2;
                        currentRight = currentLeft + labelWidth;
                        break; 
                    }
                }
                attempts++;
            }
            
            // ... Final Placement & Bounds Check ...
            const finalLeft = targetX - labelWidth / 2;
            const finalTop = targetY - labelHeight / 2;
            const finalRight = finalLeft + labelWidth;
            const finalBottom = finalTop + labelHeight;
            const screenWidth = canvas.clientWidth || window.innerWidth;
            const screenHeight = canvas.clientHeight || window.innerHeight;

            if (finalLeft < 0 || finalRight > screenWidth || finalTop < 0 || finalBottom > screenHeight || attempts >= maxAttempts) {
                labelElement.style.display = 'none';
            } else {
                 // ... set style.transform, left, top, display ...
                 labelElement.style.transform = `translate(-50%, -50%)`;
                 labelElement.style.left = `${targetX}px`;
                 labelElement.style.top = `${targetY}px`;
                 labelElement.style.display = 'block';
                 
                 // Add to placed rectangles
                 placedLabelRects.push({
                    left: finalLeft - 2, 
                    top: finalTop - 2,
                    right: finalRight + 2,
                    bottom: finalBottom + 2
                 });
            }
        });
    },

    // Method to update static content AND styles
    updateHtmlLabelStaticContent(newDataPoints) {
        if (!this.htmlLabels || this.htmlLabels.length === 0) {
            return;
        }

        newDataPoints.forEach(point => {
            const pointId = point.id;
            if (!pointId) return;

            const labelInfo = this.htmlLabels.find(l => l.id === pointId);
            if (labelInfo) {
                // Update Title (name)
                const titleElement = labelInfo.labelElement?.querySelector('.title');
                if (titleElement && titleElement.textContent !== (point.name || 'N/A')) {
                    titleElement.textContent = point.name || 'N/A';
                }

                // Update Description
                if (labelInfo.descriptionElement && labelInfo.descriptionElement.textContent !== (point.description || '')) {
                    labelInfo.descriptionElement.textContent = point.description || '';
                }

                // Apply structureItem-level styles
                if (point.dataStructure && Array.isArray(point.dataStructure)) {
                    point.dataStructure.forEach(structureItem => {
                        const bindingKey = structureItem.bindingKey;
                        if (!bindingKey) return;
                        // Find the specific value-line element
                        const valueLineElement = labelInfo.valueContainerElement?.querySelector(`[data-binding-key="${bindingKey}"]`);
                        if (valueLineElement) {
                            // Re-apply styles from the updated point config
                            this.applyStyles(valueLineElement, structureItem.style);
                        }
                    });
                }

                 labelInfo.dataPointRef = point; // Update ref

            } 
        });
    },
    // -------------------------------------------------
  }
}
</script>

<style lang="scss" scoped>
.three-render-core {
  width: 100%;
  height: 100%;
  position: relative; 
  overflow: hidden; // IMPORTANT: This might clip labels if they extend outside bounds

   .copy-button {
      position: absolute;
      top: 5px;
      left: 5px;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      border-radius: 50%; // Make it round
      cursor: pointer;
      width: 28px; // Small size
      height: 28px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px; // Adjust icon size
      opacity: 0.7;
      transition: opacity 0.2s ease;

      &:hover {
         opacity: 1;
      }

      i {
          line-height: 0; // Align icon better
      }
   }

  .loading-indicator, .error-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    z-index: 20;
    text-align: center;
  }
  .error-message {
     background-color: rgba(220, 53, 69, 0.9);
  }
   
   // Container for labels, positioned within the component bounds
   .html-label-container {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       pointer-events: none; // Container doesn't block interactions with canvas
       overflow: hidden; // Clip labels overflowing the container (if not using document.body)
   }

   /* Ensure .value-container and .value-line are styled if needed within scope */
   .three-render-core :deep(.value-container) {
       margin-top: 2px; // Add some space below title
       margin-bottom: 4px; // Add space above description
   }

   .three-render-core :deep(.value-line) {
       line-height: 1.4;
       display: flex; // Arrange label, value, unit horizontally
       justify-content: space-between; // Space out elements
       align-items: baseline;
       margin-bottom: 1px; // Small space between lines
   }

   .three-render-core :deep(.value-line .value-text) {
       font-weight: bold;
       margin: 0 4px; // Add space around value
   }
   .three-render-core :deep(.value-line .unit-text) {
       font-size: 0.8em;
       color: #bbb; // Dimmer unit text
       margin-left: 2px;
   }


   /* Add styles for individual value line status if needed */
   .three-render-core :deep(.value-line.status-warning .value-text) {
       // color: #ffc107; /* Example: Color the value text */
   }
   .three-render-core :deep(.value-line.status-danger .value-text) {
        // color: #f44336; /* Example: Color the value text */
   }
}

/* --- Remove data-tag styles from scoped block --- */
/* :deep(.data-tag) { ... } rules are removed from here */

</style>

<!-- Add a new non-scoped style block for data-tag styles -->
<style lang="scss">
/* --- Global or Non-Scoped Styles for Data Tags --- */

// --- Re-add Base Data Tag Styles ---
.data-tag {
    position: absolute; // Set by JS anyway, but good default
    background: linear-gradient(145deg, rgba(40, 40, 70, 0.85), rgba(60, 60, 90, 0.9));
    color: #f0f0f0; // Base text color
    padding: 8px 12px; // Padding
    border-radius: 6px; // Rounded corners
    font-size: 13px;    // Base font size for the tag
    pointer-events: auto; // Allow interaction
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-left-width: 4px; // Status color indicator width
    transform: translate(-50%, -50%); // Centering
    z-index: 10;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.35);
    min-width: 130px; // Minimum width
    text-align: left;
    white-space: nowrap; // Prevent wrapping by default
}

.data-tag .title {
    font-weight: 600;
    font-size: 11px; // Title font size
    margin-bottom: 4px;
    color: #a0a0a0; // Title color
    display: block;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

// Base style for the value container (if needed)
.data-tag .value-container {
    // font-size: 16px; // Example base size for values, can be overridden
}

.data-tag .description {
    display: none; // Hidden by default
    font-size: 11px;
    line-height: 1.3;
    margin-top: 6px;
    max-width: 180px;
    color: #c0c0c0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 6px;
    white-space: normal; // Allow description to wrap
}

.data-tag:hover {
    background: linear-gradient(145deg, rgba(50, 50, 80, 0.9), rgba(70, 70, 100, 0.95));
    transform: translate(-50%, -50%) scale(1.05);
    z-index: 1000;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.45);
}

.data-tag:hover .description {
    display: block;
}
// --- End Base Data Tag Styles ---

// --- Re-add Status Color CSS Rules ---
/* Status Colors for Tag Border */
.data-tag.status-normal {
    border-left-color: #00f2a1;
}
.data-tag.status-warning {
    border-left-color: #ffc107;
}
.data-tag.status-danger {
    border-left-color: #f44336;
}

/* Status colors for Value Line Text */
.value-line.status-normal .value-text {
    color: inherit; // Use default text color for normal
}
.value-line.status-warning .value-text {
     color: #ffc107;
}
.value-line.status-danger .value-text {
     color: #f44336;
}
// --- End Status Color CSS Rules ---

/* ... Potentially other existing non-scoped styles ... */

</style>
