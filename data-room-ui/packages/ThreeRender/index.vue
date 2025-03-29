<template>
  <div
    style="width: 100%; height: 100%; position: relative;"
    class="bs-design-wrap bs-custom-component"
    :class="{'light-theme':customTheme === 'light','auto-theme':customTheme !=='light'}"
  >
    <div
      :id="chartId"
      ref="container"
      style="width: 100%; height: 100%; position: relative;"
    />
  </div>
</template>

<script>
import 'insert-css'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { mapState, mapMutations } from 'vuex'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import _ from 'lodash'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { log } from '@antv/g2plot/lib/utils'

export default {
  name: 'ThreeRender',
  mixins: [commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      model: null,
      animationFrame: null,
      pm25Value: 38, // 默认PM2.5值
      pm25Canvas: null,
      pm25Context: null,
      pm25Plane: null,
      hasData: false,
      loader: null,
      textureLoader: null,
      displayPanel: null
    }
  },
  computed: {
    ...mapState('bigScreen', {
      pageInfo: state => state.pageInfo,
      customTheme: state => state.pageInfo.pageConfig.customTheme,
      activeCode: state => state.activeCode
    }),
    chartId() {
      let prefix = 'three_'
      if (this.$route.path === window?.BS_CONFIG?.routers?.previewUrl) {
        prefix = 'preview_three_'
      }

      if (this.$route.path === window?.BS_CONFIG?.routers?.designUrl) {
        prefix = 'design_three_'
      }

      if (this.$route.path === window?.BS_CONFIG?.routers?.pageListUrl) {
        prefix = 'management_three_'
      }
      return prefix + this.config.code
    }
  },
  watch: {
    // 监听配置变化
    config: {
      handler(newConfig) {
        console.log('配置变化:', newConfig);
        if (newConfig && newConfig.option && newConfig.option.customize) {
          // 更新 PM2.5 值
          const newValue = newConfig.option.customize.pm25Value;
          if (newValue !== undefined && newValue !== this.pm25Value) {
            console.log('PM2.5 值从配置更新为:', newValue);
            this.pm25Value = newValue;
          }
        }
      },
      deep: true
    },
    
    // 监听 PM2.5 值变化
    pm25Value: {
      handler(val) {
        console.log('PM2.5 值变化为:', val);
        this.updatePM25Display();
      }
    }
  },
  mounted() {
    console.log('ThreeRender mounted');
    // 监听容器大小变化
    const container = this.$refs.container;
    if (!container) {
      console.error('容器元素不存在');
      return;
    }
    
    this.resizeObserver = new ResizeObserver(() => {
      this.onWindowResize();
    });
    this.resizeObserver.observe(container);
    
    console.log('调用 chartInit');
    this.chartInit();
  },
  beforeDestroy() {
    // 停止动画循环
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
      this.animationFrame = null
    }
    
    // 断开 ResizeObserver 连接
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
    
    // 清理资源
    this.cleanupScene()
  },
  methods: {
    ...mapMutations('bigScreen', ['changeChartConfig', 'changeActiveItemConfig', 'changeChartLoading']),
    
    // 初始化Three.js场景
    async initThreeJS(config) {
      console.log('initThreeJS 开始执行', config);
      
      if (!config) {
        console.error('配置对象为空，无法初始化场景');
        this.showErrorMessage('配置对象为空，无法初始化场景');
        return false;
      }
      
      if (!config.option) {
        console.error('配置对象缺少 option 属性，无法初始化场景');
        config.option = {};
      }
      
      if (!config.option.customize) {
        console.error('配置对象缺少 customize 属性，无法初始化场景');
        config.option.customize = {};
      }
      
      // 清理现有场景
      this.cleanupScene();
      
      // 创建场景
      this.scene = new THREE.Scene();
      
      // 设置背景颜色
      const backgroundColor = config.option.customize.backgroundColor || '#111111';
      this.scene.background = new THREE.Color(backgroundColor);
      
      // 创建相机
      const container = this.$refs.container;
      if (!container) {
        console.error('容器元素不存在，无法初始化场景');
        this.showErrorMessage('容器元素不存在，无法初始化场景');
        return false;
      }
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      
      // 设置相机位置
      const cameraPosition = config.option.customize.cameraPosition || { x: 0, y: 3, z: 7 };
      this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
      
      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(width, height);
      this.renderer.shadowMap.enabled = true;
      container.appendChild(this.renderer.domElement);
      
      // 创建控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(0, 2, 0);
      this.controls.update();
      
      // 添加灯光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      this.scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      directionalLight.position.set(5, 10, 7.5);
      directionalLight.castShadow = true;
      this.scene.add(directionalLight);
      
      // 添加地面
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = 0;
      ground.receiveShadow = true;
      this.scene.add(ground);
      
      console.log('准备加载 GLB 模型');
      // 加载GLB模型
      try {
        const modelLoaded = await this.loadGLBModel(config);
        
        if (!modelLoaded) {
          console.error('GLB模型加载失败，无法继续');
          return false;
        }
      } catch (error) {
        console.error('加载 GLB 模型时发生错误:', error);
        this.showErrorMessage('加载 GLB 模型时发生错误: ' + error.message);
        return false;
      }
      
      console.log('开始动画循环');
      // 开始动画循环
      this.animate();
      
      return true;
    },
    
    // 加载GLB模型
    loadGLBModel(config) {
      console.log('loadGLBModel 开始执行', config);
      
      // 创建加载器
      if (!this.loader) {
        this.loader = new GLTFLoader();
      }
      
      // 尝试多种可能的路径
      const possiblePaths = [];
      
      // 首先尝试使用配置中的模型路径
      if (config.option && config.option.customize && config.option.customize.modelPath) {
        console.log('从配置中获取模型路径:', config.option.customize.modelPath);
        possiblePaths.push(config.option.customize.modelPath);
      }
      
      // 添加其他可能的路径作为备选
      possiblePaths.push(
        '../ThreeComponents/3D模型/glbs/PM25_Monitor.glb',
        './packages/ThreeComponents/3D模型/glbs/PM25_Monitor.glb',
        '/packages/ThreeComponents/3D模型/glbs/PM25_Monitor.glb',
        'packages/ThreeComponents/3D模型/glbs/PM25_Monitor.glb',
        './ThreeComponents/3D模型/glbs/PM25_Monitor.glb',
        '/ThreeComponents/3D模型/glbs/PM25_Monitor.glb',
        'ThreeComponents/3D模型/glbs/PM25_Monitor.glb'
      );
      
      console.log('尝试加载模型，可能的路径:', possiblePaths);
      
      // 尝试加载模型
      return new Promise((resolve, reject) => {
        // 递归尝试所有路径
        const tryLoadModel = (pathIndex) => {
          if (pathIndex >= possiblePaths.length) {
            console.error('所有路径都尝试失败，无法加载模型');
            this.showErrorMessage('无法加载模型，所有路径都尝试失败');
            reject(new Error('所有路径都尝试失败'));
            return;
          }
          
          const modelPath = possiblePaths[pathIndex];
          console.log(`尝试路径 ${pathIndex + 1}/${possiblePaths.length}: ${modelPath}`);
          
          this.loader.load(
            modelPath,
            (gltf) => {
              // 模型加载成功
              console.log('模型加载成功:', gltf);
              
              // 清除可能存在的旧模型
              if (this.model) {
                this.scene.remove(this.model);
              }
              
              // 添加新模型到场景
              this.model = gltf.scene;
              
              // 设置模型位置和缩放
              const modelScale = config.option.customize.modelScale || 1;
              const modelPositionY = config.option.customize.modelPositionY || 0;
              
              this.model.position.y = modelPositionY;
              this.model.scale.set(modelScale, modelScale, modelScale);
              
              // 为模型的所有部分启用阴影
              this.model.traverse((node) => {
                if (node.isMesh) {
                  node.castShadow = true;
                  node.receiveShadow = true;
                }
              });
              
              this.scene.add(this.model);
              
              // 创建PM2.5值显示
              this.createPM25Display();
              
              resolve(true);
            },
            (xhr) => {
              // 加载进度
              console.log(`模型加载进度 (${modelPath}):`, (xhr.loaded / xhr.total) * 100 + '%');
            },
            (error) => {
              // 加载失败，尝试下一个路径
              console.warn(`模型加载失败 (${modelPath}):`, error);
              tryLoadModel(pathIndex + 1);
            }
          );
        };
        
        // 开始尝试第一个路径
        tryLoadModel(0);
      }).catch(error => {
        console.error('模型加载过程中发生错误:', error);
        // 直接显示错误信息，不创建替代模型
        this.showErrorMessage('模型加载失败: ' + error.message);
        return false; // 返回 false 表示加载失败
      });
    },
    
    // 显示错误消息
    showErrorMessage(message) {
      // 清理现有场景
      this.cleanupScene();
      
      // 创建新场景
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color('#111111');
      
      // 创建相机
      const container = this.$refs.container;
      const width = container.clientWidth;
      const height = container.clientHeight;
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      this.camera.position.set(0, 0, 5);
      
      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(width, height);
      container.appendChild(this.renderer.domElement);
      
      // 创建错误消息
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      
      // 设置背景
      context.fillStyle = 'rgba(0, 0, 0, 0.7)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // 设置文本样式
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      // 绘制错误消息
      context.fillStyle = '#ff0000';
      context.font = 'bold 24px Arial';
      context.fillText('模型加载失败', canvas.width / 2, 60);
      
      context.fillStyle = '#ffffff';
      context.font = '18px Arial';
      context.fillText(message, canvas.width / 2, 120);
      
      // 创建纹理
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
      });
      
      // 创建平面显示错误消息
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 2),
        material
      );
      this.scene.add(plane);
      
      // 开始渲染
      this.animate();
    },
    
    // 创建PM2.5值显示
    createPM25Display() {
      // 创建PM2.5值显示
      this.pm25Canvas = document.createElement('canvas')
      this.pm25Canvas.width = 256
      this.pm25Canvas.height = 128
      this.pm25Context = this.pm25Canvas.getContext('2d')
      
      // 绘制PM2.5值
      this.updatePM25Display()
      
      const pm25Texture = new THREE.CanvasTexture(this.pm25Canvas)
      const pm25Material = new THREE.MeshBasicMaterial({
        map: pm25Texture,
        transparent: true
      })
      
      this.pm25Plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1.8, 1.3),
        pm25Material
      )
      
      // 将PM2.5显示添加到模型上方
      this.pm25Plane.position.set(0, 2, 0)
      this.scene.add(this.pm25Plane)
    },
    
    // 更新PM2.5显示
    updatePM25Display() {
      if (!this.pm25Context) return
      
      console.log('更新PM2.5显示，当前值:', this.pm25Value);
      
      // 清空画布
      this.pm25Context.clearRect(0, 0, this.pm25Canvas.width, this.pm25Canvas.height)
      
      // 设置背景
      this.pm25Context.fillStyle = 'rgba(0, 0, 0, 0.7)'
      this.pm25Context.fillRect(0, 0, this.pm25Canvas.width, this.pm25Canvas.height)
      
      // 设置文本样式
      this.pm25Context.textAlign = 'center'
      this.pm25Context.textBaseline = 'middle'
      
      // 绘制标题
      this.pm25Context.fillStyle = '#ffffff'
      this.pm25Context.font = '20px Arial'
      this.pm25Context.fillText('PM2.5', this.pm25Canvas.width / 2, 30)
      
      // 根据PM2.5值确定颜色
      let color = '#33cc33' // 绿色 - 优
      if (this.pm25Value > 35) color = '#ffff00' // 黄色 - 良
      if (this.pm25Value > 75) color = '#ff9900' // 橙色 - 轻度污染
      if (this.pm25Value > 115) color = '#ff0000' // 红色 - 中度污染
      if (this.pm25Value > 150) color = '#800080' // 紫色 - 重度污染
      if (this.pm25Value > 250) color = '#8b0000' // 深红 - 严重污染
      
      // 绘制数值
      this.pm25Context.fillStyle = color
      this.pm25Context.font = 'bold 40px Arial'
      this.pm25Context.fillText(this.pm25Value, this.pm25Canvas.width / 2, 80)
      
      // 更新纹理
      if (this.pm25Plane && this.pm25Plane.material && this.pm25Plane.material.map) {
        this.pm25Plane.material.map.needsUpdate = true
      }
    },
    
    // 动画循环
    animate() {
      this.animationFrame = requestAnimationFrame(this.animate)
      
      // 如果有模型，可以根据配置旋转模型
      if (this.model && this.config.option && this.config.option.customize) {
        // 获取旋转速度，如果为0则不旋转
        const rotationSpeed = this.config.option.customize.rotationSpeed || 0
        
        // 只有当旋转速度大于0时才旋转
        if (rotationSpeed > 0) {
          this.model.rotation.y += rotationSpeed
        }
      }
      
      // 更新控制器
      if (this.controls) {
        this.controls.update()
      }
      
      // 渲染场景
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera)
      }
    },
    
    // 窗口大小改变时调整渲染器和相机
    onWindowResize() {
      if (!this.renderer || !this.camera) return;
      
      const container = this.$refs.container;
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      
      this.renderer.setSize(width, height);
    },
    
    // 初始化图表
    chartInit() {
      console.log('chartInit 开始执行');
      this.changeChartLoading(true);
      
      try {
        console.log('准备初始化 Three.js 场景');
        // 初始化Three.js场景
        this.initThreeJS(this.config);
        
        // 如果有数据，则格式化数据
        if (this.config.dataSource && this.config.dataSource.data) {
          console.log('初始化时有数据:', this.config.dataSource.data);
          this.config = this.dataFormatting(this.config, this.config.dataSource);
        } else {
          console.log('初始化时无数据，使用默认值');
          // 使用默认值
          this.pm25Value = this.config.option.customize.pm25Value || 38;
          this.updatePM25Display();
        }
        
        this.hasData = true;
      } catch (e) {
        console.error('初始化图表失败:', e);
      } finally {
        this.changeChartLoading(false);
      }
    },
    
    // 更新传感器数据
    freshSensors(data) {
      if (!this.scene) {
        console.warn('场景未初始化，无法更新传感器数据')
        return
      }
      
      // 获取 PM2.5 值
      if (data && Array.isArray(data)) {
        const pm25Field = this.config.option.customize.pm25Field || 'pm25'
        const pm25Data = data.find(item => item.key === pm25Field || item.name === pm25Field)
        if (pm25Data && pm25Data.value !== undefined) {
          this.pm25Value = pm25Data.value
          this.updatePM25Display()
        }
      }
    },
    
    // 组件的样式改变，返回改变后的config
    changeStyle(config, isUpdateTheme) {
      // 确保 config 有值
      if (!config) {
        console.warn('配置对象为空，无法更新样式')
        return this.config || {}
      }
      
      // 确保 config 有 code 属性
      if (!config.code && this.config && this.config.code) {
        config.code = this.config.code
      }
      
      config = { ...this.config, ...config }
      
      // 确保 config.setting 存在
      if (!config.setting) {
        config.setting = []
      }
      
      config = this.transformSettingToOption(config, 'custom')
      
      // 这里定义了option和setting是为了保证在执行eval时,optionHandler、dataHandler里面可能会用到
      const option = config.option || {}
      const setting = config.setting || []
      
      if (this.config && this.config.optionHandler) {
        try {
          // 此处函数处理config
          eval(this.config.optionHandler)
        } catch (e) {
          console.error('执行optionHandler失败:', e)
        }
      }
      
      // 只有样式改变时更新主题配置，切换主题时不需要保存
      if (!isUpdateTheme) {
        try {
          config.theme = settingToTheme(_.cloneDeep(config), this.customTheme)
        } catch (e) {
          console.error('设置主题失败:', e)
        }
      }
      
      // 确保 config 有 code 属性再调用 changeChartConfig
      if (config.code) {
        try {
          this.changeChartConfig(config)
          if (config.code === this.activeCode) {
            this.changeActiveItemConfig(config)
          }
        } catch (e) {
          console.error('更新配置失败:', e)
        }
      } else {
        console.warn('配置对象缺少 code 属性，无法更新图表配置')
      }
      
      // 如果场景已经初始化，更新场景
      if (this.scene) {
        try {
          // 更新背景颜色
          if (option.customize && option.customize.backgroundColor) {
            this.scene.background = new THREE.Color(option.customize.backgroundColor)
          }
          
          // 更新相机位置
          if (option.customize && option.customize.cameraPosition) {
            this.camera.position.set(
              option.customize.cameraPosition.x,
              option.customize.cameraPosition.y,
              option.customize.cameraPosition.z
            )
          }
          
          // 更新模型缩放和位置
          if (this.model && option.customize) {
            const modelScale = option.customize.modelScale || 1
            const modelPositionY = option.customize.modelPositionY || 0
            
            this.model.position.y = modelPositionY
            this.model.scale.set(modelScale, modelScale, modelScale)
          }
          
          // 更新PM2.5值
          this.pm25Value = option.customize.pm25Value || option.customize.defaultPM25Value || 38
          this.updatePM25Display()
        } catch (e) {
          console.error('更新场景失败:', e)
        }
      }
      
      return config
    },
    
    // 数据格式化
    dataFormatting(config, data) {
      console.log('ThreeRender dataFormatting 接收到数据:', data);
      
      if (!config) {
        console.warn('配置对象为空，无法格式化数据')
        return this.config || {}
      }
      
      // 确保 config.option 存在
      if (!config.option) {
        config.option = {}
      }
      
      // 确保 config.option.customize 存在
      if (!config.option.customize) {
        config.option.customize = {}
      }
      
      // 如果有数据，尝试提取 PM2.5 值
      if (data && data.data && Array.isArray(data.data)) {
        console.log('ThreeRender 处理数据数组:', data.data);
        
        // 尝试直接获取第一个数据项的值
        if (data.data.length > 0 && data.data[0].value !== undefined) {
          console.log('ThreeRender 找到值:', data.data[0].value);
          config.option.customize.pm25Value = data.data[0].value;
          this.pm25Value = data.data[0].value;
        }
      }
      
      return config;
    },
    
    // 转换设置到选项
    transformSettingToOption(config, tabName) {
      if (!config || !config.setting) return config
      
      const setting = config.setting.filter(item => item.tabName === tabName)
      if (!setting.length) return config
      
      const newConfig = _.cloneDeep(config)
      
      setting.forEach(item => {
        if (item.optionField) {
          const fields = item.optionField.split('.')
          let current = newConfig.option
          
          for (let i = 0; i < fields.length - 1; i++) {
            if (!current[fields[i]]) {
              current[fields[i]] = {}
            }
            current = current[fields[i]]
          }
          
          current[fields[fields.length - 1]] = item.value
        }
      })
      
      return newConfig
    },
    
    // 清理场景
    cleanupScene() {
      // 停止动画循环
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame)
        this.animationFrame = null
      }
      
      // 清理渲染器
      if (this.renderer) {
        if (this.renderer.domElement && this.renderer.domElement.parentNode) {
          this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
        }
        this.renderer.dispose()
        this.renderer = null
      }
      
      // 清理控制器
      if (this.controls) {
        this.controls.dispose()
        this.controls = null
      }
      
      // 清理场景中的所有对象
      if (this.scene) {
        while (this.scene.children.length > 0) {
          const object = this.scene.children[0]
          if (object.geometry) {
            object.geometry.dispose()
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose())
            } else {
              object.material.dispose()
            }
          }
          this.scene.remove(object)
        }
        this.scene = null
      }
      
      // 清理相机
      this.camera = null
      
      // 清理模型
      this.model = null
      
      // 清理画布
      if (this.pm25Canvas) {
        this.pm25Canvas = null
        this.pm25Context = null
        this.pm25Plane = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.light-theme {
  background-color: #ffffff;
  color: #000000;
}
.auto-theme {
  background-color: transparent;
}
.bs-design-wrap {
  overflow: hidden;
}
</style>

