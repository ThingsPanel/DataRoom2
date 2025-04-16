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
      htmlLabels: [], // Holds { id, labelElement, valueElement, descriptionElement, width, height }
    };
  },
  watch: {
    // Watch the correct path for model changes
    'config.option.customize.modelPath': {
      handler(newPath, oldPath) {
        console.log('[ThreeRenderCore] modelPath watcher triggered:', { newPath, oldPath });
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
           console.log(`[ThreeRenderCore] Updating model scale to: ${newValue}`);
           this.model.scale.set(newValue, newValue, newValue);
        } else if (this.model && typeof newValue !== 'number') {
            console.warn(`[ThreeRenderCore] Invalid modelScale received: ${newValue}. Resetting to 1.`);
            this.model.scale.set(1, 1, 1);
        } else if (this.model && newValue <= 0) {
             console.warn(`[ThreeRenderCore] modelScale must be positive: ${newValue}. Resetting to 1.`);
            this.model.scale.set(1, 1, 1);
        }
      }
    },
    'config.option.customize.modelPositionY': {
       handler(newValue) {
          if (this.model && typeof newValue === 'number') {
            console.log(`[ThreeRenderCore] Updating model Y position to: ${newValue}`);
            this.model.position.y = newValue;
          } else if (this.model) {
            console.warn(`[ThreeRenderCore] Invalid modelPositionY received: ${newValue}. Resetting to 0.`);
            this.model.position.y = 0;
          }
       }
    },
    // Optimized watcher for dataPoints changes
    'config.option.customize.dataPoints': {
        handler(newPoints, oldPoints) {
             // --- GUARD against early execution --- 
             if (!this.model) {
                 console.log('[ThreeRenderCore Watcher] Model not loaded yet, skipping dataPoints watch handler.');
                 return; // Don't do anything if model isn't ready
             }
             // -------------------------------------
            
            if (!this.camera || !this.renderer) return; // Guard against early calls
            
            newPoints = newPoints || [];
            oldPoints = oldPoints || [];

            // --- Determine if full recreation is needed --- 
            let needsRecreation = false;
            if (newPoints.length !== oldPoints.length) {
                needsRecreation = true;
                console.log('[ThreeRenderCore Watcher] Label count changed. Recreating.');
            } else {
                 // Check if positions or IDs changed
                 for (let i = 0; i < newPoints.length; i++) {
                     const np = newPoints[i];
                     const op = oldPoints[i]; 
                     if (!op || np.id !== op.id || 
                         np.position?.x !== op.position?.x || 
                         np.position?.y !== op.position?.y || 
                         np.position?.z !== op.position?.z) 
                     {
                         needsRecreation = true;
                         console.log(`[ThreeRenderCore Watcher] Position or ID changed at index ${i}. Recreating.`);
                         break;
                     }
                 }
            }
            // --- End Recreation Check --- 

            if (needsRecreation) {
                 // Recreate only if needed after initial load
                 console.log('[ThreeRenderCore Watcher] Triggering label recreation due to structural change.');
                 this.createHtmlLabels();
            } else {
                 // Only update content if structure seems the same
                 console.log('[ThreeRenderCore Watcher] Triggering label content update.');
                 this.updateHtmlLabelsContent(newPoints); 
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
    }
  },
  mounted() {
    console.log('[ThreeRenderCore] Mounted. Initial config:', JSON.parse(JSON.stringify(this.config || null)));
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
      console.warn('[ThreeRenderCore] No initial modelPath found...');
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
           console.error('[ThreeRenderCore initThree] Container not found.');
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
        console.error("Error initializing Three.js:", err);
        this.error = "Failed to initialize 3D view.";
      }
    },

    updateSceneBackground() {
      if (this.scene) {
        const customBgColor = this.config?.option?.customize?.backgroundColor;
        if (customBgColor) {
             try {
                 this.scene.background = new THREE.Color(customBgColor);
                 console.log(`[ThreeRenderCore] Set background from config: ${customBgColor}`);
             } catch (e) {
                 console.error(`[ThreeRenderCore] Invalid background color in config: ${customBgColor}`, e);
                 // Fallback to theme-based color on error
                 this.scene.background = this.theme === 'light' ? new THREE.Color(0xeeeeee) : new THREE.Color(0x1a1a1a);
             }
        } else {
            // Fallback to theme if no custom color is set
            this.scene.background = this.theme === 'light' ? new THREE.Color(0xeeeeee) : new THREE.Color(0x1a1a1a);
             console.log(`[ThreeRenderCore] Set background from theme: ${this.theme}`);
        }
        // Ensure renderer alpha is true if we want background to show or be transparent based on CSS
        if(this.renderer) this.renderer.setClearAlpha(1); // Use 1 to show scene background, 0 for transparent
      }
    },

    // New method to handle shadow updates
    updateShadows(enabled) {
        console.log(`[ThreeRenderCore] Updating shadows enabled: ${enabled}`);
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
        console.error('[ThreeRenderCore loadModel] Scene not initialized.');
        return;
      }

      // --- Read modelPath from the correct location --- 
      const modelPath = this.config?.option?.customize?.modelPath;
      console.log(`[ThreeRenderCore loadModel] Attempting to load model from: ${modelPath}`);

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
        console.error('[ThreeRenderCore loadModel]', this.error);
        this.loading = false;
        return;
      }

      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          console.log('[ThreeRenderCore loadModel] GLB loaded successfully.');
          this.model = gltf.scene;
          this.scene.add(this.model);
          
          this.applyInitialModelTransforms(); 
          this.setupInitialCameraView(this.model);
          
          // --- Log data before creating labels --- 
          console.log('[ThreeRenderCore loadModel Callback] DataPoints before createHtmlLabels:', 
                       JSON.parse(JSON.stringify(this.config?.option?.customize?.dataPoints || [])));
          // ---------------------------------------

          // Create HTML labels after model is ready (this should be the definitive initial creation)
          this.createHtmlLabels();

          this.loading = false;
        },
        (xhr) => {
          // Progress indicator (optional)
          // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (loadError) => {
          console.error('[ThreeRenderCore loadModel] Error loading GLB:', loadError);
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
      console.log('[ThreeRenderCore] Setting up initial camera view.');

      const customPos = this.config?.option?.customize?.initialCameraPosition;
      const customTarget = this.config?.option?.customize?.initialCameraTarget;

      // Check if both custom position and target are valid objects with x, y, z
      const useCustomView = 
          customPos && typeof customPos === 'object' && 'x' in customPos && 'y' in customPos && 'z' in customPos &&
          customTarget && typeof customTarget === 'object' && 'x' in customTarget && 'y' in customTarget && 'z' in customTarget;

      if (useCustomView) {
        console.log('[ThreeRenderCore] Using custom initialCameraPosition and initialCameraTarget from config.');
        try {
            this.camera.position.set(customPos.x, customPos.y, customPos.z);
            this.controls.target.set(customTarget.x, customTarget.y, customTarget.z);
            // Optionally adjust near/far based on distance, or use fixed values
            const distance = this.camera.position.distanceTo(this.controls.target);
            this.camera.near = Math.max(0.1, distance / 100); // Ensure near > 0
            this.camera.far = distance * 100;
        } catch (e) {
             console.error('[ThreeRenderCore] Error applying custom camera view:', e);
             // Fallback to default fitting if error occurs
             this.fitCameraToModelFallback(targetModel);
        }
      } else {
         console.log('[ThreeRenderCore] No valid custom camera view found in config. Using automatic fitting.');
         this.fitCameraToModelFallback(targetModel);
      }
      
      this.camera.updateProjectionMatrix();
      this.controls.update(); // IMPORTANT: Update controls after setting position/target
      console.log('[ThreeRenderCore] Initial camera view setup complete.');
    },

    // Renamed the original fitting logic to be used as a fallback
    fitCameraToModelFallback(targetModel) {
        if (!this.camera || !this.controls || !targetModel) return;
        console.log('[ThreeRenderCore] Executing fallback camera fitting logic.');

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
            console.log(`[ThreeRenderCore] Applying initialZoomFactor: ${zoomFactor}`);
            distance /= zoomFactor; // Divide distance by zoom factor (smaller factor = closer zoom)
        } else {
             console.log('[ThreeRenderCore] No valid initialZoomFactor found, using default distance.');
             // Apply a default offset multiplier if no zoom factor specified (like original code)
             // distance *= 1.5; // Example default offset
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
        console.log(`[ThreeRenderCore] Resizing from ${this.containerWidth}x${this.containerHeight} to ${newWidth}x${newHeight}`);
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
      console.log('[ThreeRenderCore] Cleaning up...');
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
           .then(() => {
             console.log('[ThreeRenderCore] Config copied to clipboard.');
             // Maybe a small visual temporary feedback?
           })
           .catch(err => {
             console.error('[ThreeRenderCore] Failed to copy config: ', err);
           });
       } catch (e) {
         console.error('[ThreeRenderCore] Error stringifying config: ', e);
       }
     },

    // --- HTML Label Methods ---
    clearHtmlLabels() {
      console.log('[ThreeRenderCore] Clearing HTML labels.');
      const container = this.$refs.htmlLabelContainer;
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
      const statusColors = this.config?.option?.customize?.statusColors || {};

      if (!container || !Array.isArray(dataPoints)) {
        console.warn('[ThreeRenderCore] Label container or dataPoints missing for createHtmlLabels.');
        return;
      }
      console.log(`[ThreeRenderCore] Recreating ${dataPoints.length} HTML labels...`);

      dataPoints.forEach((point, index) => {
        if (!point || typeof point.position !== 'object') {
            console.warn(`[ThreeRenderCore] Skipping invalid dataPoint at index ${index}`);
            return;
        }
        const pointId = point.id || `label-${index}`;

        // --- Logging --- 
        console.log(`[ThreeRenderCore createHtmlLabels] Processing point ${index} (ID: ${pointId}):`, 
                     JSON.parse(JSON.stringify(point)) // Deep copy for logging
                    );
        // ------------- 
        
        // Create elements
        const labelElement = document.createElement('div');
        labelElement.className = 'data-tag';
        labelElement.style.position = 'absolute';
        labelElement.style.display = 'none';
        labelElement.style.pointerEvents = 'auto';
        labelElement.dataset.pointId = pointId;

        const titleElement = document.createElement('div');
        titleElement.className = 'title';
        titleElement.textContent = point.name || 'N/A';

        const valueElement = document.createElement('div');
        valueElement.className = 'value';
        console.log(`[ThreeRenderCore createHtmlLabels] Point ${pointId} - value from config:`, point.value);
        valueElement.textContent = point.value === undefined ? '--' : String(point.value);

        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'description';
        descriptionElement.textContent = point.description || '';

        labelElement.appendChild(titleElement);
        labelElement.appendChild(valueElement);
        labelElement.appendChild(descriptionElement);

        // Apply initial status class
        this.setLabelStatusClass(labelElement, point.status || 'normal');

        // --- Measure and Cache Dimensions --- 
        // Append to container temporarily to measure
        labelElement.style.visibility = 'hidden';
        labelElement.style.display = 'block'; // Make it block to measure correctly
        container.appendChild(labelElement);
        const width = labelElement.offsetWidth;
        const height = labelElement.offsetHeight;
        labelElement.style.display = 'none'; // Hide properly again
        labelElement.style.visibility = 'visible';
        // --- End Measurement --- 

        if (width > 0 && height > 0) {
            this.htmlLabels.push({
                id: pointId,
                labelElement: labelElement,
                valueElement: valueElement,
                descriptionElement: descriptionElement,
                width: width,
                height: height,
                dataPointRef: point // Keep reference to original data point config
            });
        } else {
             console.warn(`[ThreeRenderCore] Label for ${point.name} measured zero size. Hiding.`);
             // Don't add to htmlLabels array, element won't be positioned.
             // Remove from DOM if already appended? Yes.
             if(labelElement.parentNode === container) {
                 container.removeChild(labelElement);
             }
        }
      });
       console.log(`[ThreeRenderCore] Finished recreating ${this.htmlLabels.length} HTML labels.`);
       // Trigger initial position update
       this.$nextTick(() => {
           if (this.camera && this.renderer) { 
             this.updateHtmlLabelPositions();
           }
       });
    },

    // New method to update only content
    updateHtmlLabelsContent(newDataPoints) {
        if (!this.htmlLabels || this.htmlLabels.length === 0) {
           console.warn('[ThreeRenderCore] updateHtmlLabelsContent called but no labels exist.');
           // Maybe trigger recreation if labels should exist? Or just return.
           // this.createHtmlLabels(); 
           return;
        }
        
        newDataPoints.forEach(point => {
            const pointId = point.id;
            if (!pointId) return;
            
            const labelInfo = this.htmlLabels.find(l => l.id === pointId);
            if (labelInfo) {
                // Update text content
                labelInfo.valueElement.textContent = point.value === undefined ? '--' : String(point.value);
                labelInfo.descriptionElement.textContent = point.description || '';
                // Update status class
                this.setLabelStatusClass(labelInfo.labelElement, point.status || 'normal');
            } else {
                 console.warn(`[ThreeRenderCore] updateHtmlLabelsContent: Could not find label info for ID ${pointId}`);
            }
        });
    },

    // Helper to set status class
    setLabelStatusClass(element, status) {
        element.classList.remove('status-normal', 'status-warning', 'status-danger');
        const validStatus = ['normal', 'warning', 'danger'].includes(status) ? status : 'normal';
        element.classList.add(`status-${validStatus}`);
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
    // --------------------------
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
}

/* --- Remove data-tag styles from scoped block --- */
/* :deep(.data-tag) { ... } rules are removed from here */

</style>

<!-- Add a new non-scoped style block for data-tag styles -->
<style lang="scss">
/* --- Global or Non-Scoped Styles for Data Tags --- */
/* Remove :deep() here */

.data-tag {
    position: absolute; // Set by JS anyway, but good default
    background: linear-gradient(145deg, rgba(40, 40, 70, 0.85), rgba(60, 60, 90, 0.9));
    color: #f0f0f0;
    padding: 8px 12px; // Slightly smaller padding
    border-radius: 6px; // Slightly smaller radius
    font-size: 13px;    // Smaller base font size
    pointer-events: auto; // Allow interaction with the tag itself
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid rgba(255, 255, 255, 0.15); // Slightly less visible border
    border-left-width: 4px; // Status color indicator
    transform: translate(-50%, -50%); // Centering is handled by JS setting left/top
    z-index: 10;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.35);
    min-width: 130px; // Adjust min width
    text-align: left;
    white-space: nowrap; // Prevent wrapping which breaks measurement/layout
}

.data-tag .title {
    font-weight: 600;
    font-size: 11px; // Smaller title
    margin-bottom: 4px;
    color: #a0a0a0; // Dimmer title
    display: block;
    text-transform: uppercase; // Example style
    letter-spacing: 0.5px;
}

.data-tag .value {
    font-weight: 700;
    font-size: 16px; // Adjust value size
    margin-bottom: 2px;
    display: block;
    letter-spacing: 0.5px;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.4);
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
    transform: translate(-50%, -50%) scale(1.05); // Slightly less hover scale
    z-index: 1000;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.45);
}

.data-tag:hover .description {
    display: block;
}

/* Status Colors */
.data-tag.status-normal {
    border-left-color: #00f2a1;
}
.data-tag.status-normal .value {
    color: #00f2a1;
}

.data-tag.status-warning {
    border-left-color: #ffc107;
}
.data-tag.status-warning .value {
    color: #ffc107;
}

.data-tag.status-danger {
    border-left-color: #f44336;
}
.data-tag.status-danger .value {
    color: #f44336;
}

</style>
