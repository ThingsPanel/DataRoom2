<template>
  <div class="three-render-core" ref="container" :class="{'light-theme': theme === 'light', 'auto-theme': theme !== 'light'}">
    <div class="loading-indicator" v-if="loading">加载中...</div>
    <div class="error-message" v-if="error">{{ error }}</div>
    <div class="config-display" v-if="showInfo && config && config.option">
      <div class="config-item">
        <span class="label">3D模型路径:</span>
        <span class="value">{{config && config.option && config.option.customize && config.option.customize.customize && config.option.customize.customize.modelPath || '未指定'}}</span>
      </div>
      <div class="config-item">
        <span class="label">PM2.5值:</span>
        <span class="value" :class="getPM25Class(config.option.customize && config.option.customize.pm25Value)">
          {{ config.option.customize && config.option.customize.pm25Value || 0 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
      showInfo: true,
      containerWidth: 0,
      containerHeight: 0,
      resizeObserver: null,
      pm25DisplayObject: null,
      aqiDisplayObject: null,
      timeDisplayObject: null,
      aqiState: {
        value: "--",
        level: "--"
      }
    }
  },
  watch: {
    config: {
      handler(newVal) {
        if (newVal?.option?.customize?.customize?.modelPath) {
          console.log('配置变化，模型路径:', newVal.option.customize.customize.modelPath)
          this.loadModel()
        }
      },
      immediate: true,
      deep: true
    },
    'config.option.customize': {
      handler(newVal, oldVal) {
        if (newVal && oldVal) {
          // 检查模型路径是否变化
          if (newVal.modelPath !== oldVal.modelPath) {
            this.loadModel()
          }
        }
      },
      deep: true
    },
    theme() {
      // 主题变化时更新场景背景色
      this.updateSceneBackground()
    },
    'config.option.customize.pm25Value': {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          console.log('PM2.5值变化:', newVal)
          this.updatePM25Display(newVal)
          
          // 模拟计算AQI值，或者这里也可以从config.option中获取
          this.calculateAQI(newVal)
        }
      },
      immediate: true
    },
    'config.option.customize.aqiValue': {
      handler(newVal) {
        if (newVal) {
          this.aqiState.value = newVal
          // 更新AQI显示
          this.updateAQIDisplay()
        }
      },
      immediate: true
    },
    'config.option.customize.aqiLevel': {
      handler(newVal) {
        if (newVal) {
          this.aqiState.level = newVal
          // 可能需要更新AQI显示以反映新的等级
          this.updateAQIDisplay()
        }
      },
      immediate: true
    }
  },
  mounted() {
    // 初始化3D场景
    this.initThree()
    
    // 设置窗口大小调整监听器
    window.addEventListener('resize', this.onWindowResize)
    
    // 添加ResizeObserver监听容器大小变化
    this.resizeObserver = new ResizeObserver(() => {
      this.onWindowResize()
    })
    
    const container = this.$refs.container
    if (container) {
      this.resizeObserver.observe(container)
    }
    
    // 立即加载模型，不等待nextTick
    this.loadModel()
  },
  beforeDestroy() {
    // 清理资源，停止动画循环
    this.cleanup()
    window.removeEventListener('resize', this.onWindowResize)
    
    // 断开ResizeObserver连接
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
  },
  methods: {
    // 根据PM2.5值确定CSS类名
    getPM25Class(value) {
      value = Number(value || 0)
      if (value <= 35) return 'pm25-good'
      if (value <= 75) return 'pm25-moderate'
      if (value <= 115) return 'pm25-unhealthy-sensitive'
      if (value <= 150) return 'pm25-unhealthy'
      if (value <= 250) return 'pm25-very-unhealthy'
      return 'pm25-hazardous'
    },
    
    // 初始化Three.js
    initThree() {
      try {
        const container = this.$refs.container
        
        // 获取容器尺寸
        this.containerWidth = container.clientWidth
        this.containerHeight = container.clientHeight
        
        // 创建场景
        this.scene = new THREE.Scene()
        
        // 设置背景色
        this.updateSceneBackground()
        
        // 创建相机
        this.camera = new THREE.PerspectiveCamera(
          75, // 视角
          this.containerWidth / this.containerHeight, // 宽高比
          0.1, // 近裁剪面
          1000 // 远裁剪面
        )
        this.camera.position.set(0, 1, 5)
        
        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(this.containerWidth, this.containerHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.shadowMap.enabled = true
        container.appendChild(this.renderer.domElement)
        
        // 创建轨道控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.05
        
        // 添加灯光
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        this.scene.add(ambientLight)
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(5, 10, 7.5)
        directionalLight.castShadow = true
        this.scene.add(directionalLight)
        
        // 开始渲染
        this.animate()
      } catch (error) {
        console.error('初始化Three.js失败:', error)
        this.error = '初始化3D渲染器失败: ' + error.message
      }
    },
    
    // 根据主题更新场景背景色
    updateSceneBackground() {
      if (!this.scene) return
      
      if (this.theme === 'light') {
        this.scene.background = new THREE.Color(0xf0f0f0)
      } else {
        this.scene.background = new THREE.Color(0x1a1a1a)
      }
    },
    
    // 加载3D模型
    loadModel() {
      if (!this.scene) return
      
      // 清除旧模型和相关对象
      if (this.model) {
        this.scene.remove(this.model)
        this.model = null
        this.pm25DisplayObject = null
        this.aqiDisplayObject = null
        this.timeDisplayObject = null
      }
      
      const modelPath = this?.config?.option?.customize?.customize?.modelPath
      
      if (!modelPath) {
        console.warn('未指定模型路径')
        return
      }
      
      this.loading = true
      this.error = null
      
      console.log('开始加载模型:', modelPath)
      
      const loader = new GLTFLoader()
      
      loader.load(
        modelPath,
        (gltf) => {
          this.model = gltf.scene
          console.log('模型加载成功')
          
          // 查找PM2.5值显示对象
          this.model.traverse((child) => {
            if (child.name === 'PM25_Value') {
              this.pm25DisplayObject = child
              console.log('找到PM25_Value对象')
            } else if (child.name === 'AQI_Value') {
              this.aqiDisplayObject = child
              console.log('找到AQI_Value对象')
            } else if (child.name === 'Time_Value') {
              this.timeDisplayObject = child
              console.log('找到Time_Value对象')
            }
          })
          
          // 自动调整模型大小和位置以适应视图
          this.centerAndScaleModel(this.model)
          
          this.scene.add(this.model)
          this.loading = false
          
          // 自动调整相机位置
          this.fitCameraToModel()
          
          // 初始化PM2.5显示
          if (this.config?.option?.customize?.pm25Value) {
            this.updatePM25Display(this.config.option.customize.pm25Value)
          }
        },
        (xhr) => {
          // 加载进度
          console.log((xhr.loaded / xhr.total * 100) + '% 已加载')
        },
        (error) => {
          console.error('加载模型失败:', error)
          this.error = '加载模型失败: ' + error.message
          this.loading = false
        }
      )
    },
    
    // 使模型居中并缩放到合适大小
    centerAndScaleModel(model) {
      if (!model) return
      
      // 计算模型边界
      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      
      // 将模型移至中心
      model.position.x = -center.x
      model.position.y = -center.y
      model.position.z = -center.z
      
      // 缩放模型
      const maxDim = Math.max(size.x, size.y, size.z)
      if (maxDim > 0) {
        const scale = 2 / maxDim
        model.scale.set(scale, scale, scale)
      }
    },
    
    // 调整相机位置以适合模型
    fitCameraToModel() {
      if (!this.model) return
      
      const box = new THREE.Box3().setFromObject(this.model)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      
      // 设置相机位置
      const maxDim = Math.max(size.x, size.y, size.z)
      const fov = this.camera.fov * (Math.PI / 180)
      let cameraZ = Math.abs(maxDim / Math.sin(fov / 2))
      
      // 将相机位置设置为模型后方
      this.camera.position.set(center.x, center.y, center.z + cameraZ * 0.5)
      
      // 更新相机朝向
      this.camera.lookAt(center)
      
      // 更新控制器
      this.controls.target.set(center.x, center.y, center.z)
      this.controls.update()
    },
    
    // 窗口大小调整处理
    onWindowResize() {
      if (!this.renderer || !this.camera) return
      
      const container = this.$refs.container
      const width = container.clientWidth
      const height = container.clientHeight
      
      // 检查容器尺寸是否变化
      if (width !== this.containerWidth || height !== this.containerHeight) {
        this.containerWidth = width
        this.containerHeight = height
        
        // 更新相机宽高比
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
        
        // 更新渲染器尺寸
        this.renderer.setSize(width, height)
      }
    },
    
    // 动画循环
    animate() {
      if (!this.renderer) return
      
      this.animationId = requestAnimationFrame(this.animate)
      
      // 更新轨道控制器
      if (this.controls) {
        this.controls.update()
      }
      
      // 渲染场景
      this.renderer.render(this.scene, this.camera)
    },
    
    // 清理资源
    cleanup() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
        this.animationId = null
      }
      
      if (this.renderer && this.renderer.domElement) {
        if (this.$refs.container && this.$refs.container.contains(this.renderer.domElement)) {
          this.$refs.container.removeChild(this.renderer.domElement)
        }
        this.renderer.dispose()
        this.renderer = null
      }
      
      // 清除场景中的所有对象
      if (this.scene) {
        while (this.scene.children.length > 0) {
          const object = this.scene.children[0]
          this.scene.remove(object)
        }
      }
      
      this.scene = null
      this.camera = null
      this.controls = null
      this.model = null
    },
    
    // 计算AQI值
    calculateAQI(pm25Value) {
      // 这是一个简化的AQI计算方法，实际上AQI的计算更复杂
      // 如果项目中有真实的AQI值，可以直接使用而不是计算
      pm25Value = Number(pm25Value || 0)
      
      let aqi
      let level
      
      if (pm25Value <= 35) {
        aqi = Math.round(pm25Value * 50 / 35)
        level = "优"
      } else if (pm25Value <= 75) {
        aqi = Math.round((pm25Value - 35) * 50 / 40 + 50)
        level = "良"
      } else if (pm25Value <= 115) {
        aqi = Math.round((pm25Value - 75) * 50 / 40 + 100)
        level = "轻度污染"
      } else if (pm25Value <= 150) {
        aqi = Math.round((pm25Value - 115) * 50 / 35 + 150)
        level = "中度污染"
      } else if (pm25Value <= 250) {
        aqi = Math.round((pm25Value - 150) * 100 / 100 + 200)
        level = "重度污染"
      } else {
        aqi = Math.round((pm25Value - 250) * 100 / 100 + 300)
        level = "严重污染"
      }
      
      // 更新AQI状态
      this.aqiState.value = aqi
      this.aqiState.level = level
      
      // 更新AQI显示
      this.updateAQIDisplay()
      
      return { aqi, level }
    },
    
    // 更新PM2.5显示
    updatePM25Display(value) {
      if (!this.pm25DisplayObject || !this.model) return
      
      value = parseInt(value) || 0
      console.log('更新PM2.5显示值:', value)
      
      // 创建画布纹理显示值
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.width = 256
      canvas.height = 128
      
      // 清空画布
      context.clearRect(0, 0, canvas.width, canvas.height)
      
      // 根据PM2.5值确定颜色和级别
      let color
      let level
      if (value <= 35) {
        color = '#33cc33' // 绿色 - 优
        level = '优'
      } else if (value <= 75) {
        color = '#ffff00' // 黄色 - 良
        level = '良'
      } else if (value <= 115) {
        color = '#ff9900' // 橙色 - 轻度污染
        level = '轻度污染'
      } else if (value <= 150) {
        color = '#ff0000' // 红色 - 中度污染
        level = '中度污染'
      } else if (value <= 250) {
        color = '#800080' // 紫色 - 重度污染
        level = '重度污染'
      } else {
        color = '#8b0000' // 深红 - 严重污染
        level = '严重污染'
      }
      
      // 设置文本样式
      context.font = 'Bold 70px Arial'
      context.fillStyle = color
      
      // 根据数字长度调整对齐方式
      const valueStr = value.toString()
      if (valueStr.length >= 3) {
        context.textAlign = 'right'
        context.fillText(valueStr, canvas.width - 20, canvas.height / 2)
      } else {
        context.textAlign = 'center'
        context.fillText(valueStr, canvas.width / 2, canvas.height / 2)
      }
      
      // 创建纹理
      const texture = new THREE.CanvasTexture(canvas)
      
      // 更新材质
      if (!this.pm25DisplayObject.userData.textureInitialized) {
        // 首次创建材质
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide
        })
        
        // 保存原始材质
        this.pm25DisplayObject.userData.originalMaterial = this.pm25DisplayObject.material
        this.pm25DisplayObject.material = material
        this.pm25DisplayObject.userData.textureInitialized = true
      } else {
        // 更新现有材质的纹理
        this.pm25DisplayObject.material.map = texture
        this.pm25DisplayObject.material.needsUpdate = true
      }
      
      // 更新时间显示
      this.updateTimeDisplay()
    },
    
    // 更新AQI显示
    updateAQIDisplay() {
      if (!this.aqiDisplayObject || !this.model) return
      
      const value = this.aqiState.value
      console.log('更新AQI显示值:', value)
      
      // 创建画布纹理显示值
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.width = 256
      canvas.height = 128
      
      // 清空画布
      context.clearRect(0, 0, canvas.width, canvas.height)
      
      // 设置AQI文本样式 (使用橙色)
      context.font = 'Bold 70px Arial'
      context.fillStyle = '#ffa500' // 橙色
      
      // 根据数字长度调整对齐方式
      const valueStr = value.toString()
      if (valueStr.length >= 3) {
        context.textAlign = 'right'
        context.fillText(valueStr, canvas.width - 20, canvas.height / 2)
      } else {
        context.textAlign = 'center'
        context.fillText(valueStr, canvas.width / 2, canvas.height / 2)
      }
      
      // 创建纹理
      const texture = new THREE.CanvasTexture(canvas)
      
      // 更新材质
      if (!this.aqiDisplayObject.userData.textureInitialized) {
        // 首次创建材质
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide
        })
        
        // 保存原始材质
        this.aqiDisplayObject.userData.originalMaterial = this.aqiDisplayObject.material
        this.aqiDisplayObject.material = material
        this.aqiDisplayObject.userData.textureInitialized = true
      } else {
        // 更新现有材质的纹理
        this.aqiDisplayObject.material.map = texture
        this.aqiDisplayObject.material.needsUpdate = true
      }
    },
    
    // 更新时间显示
    updateTimeDisplay() {
      if (!this.timeDisplayObject) return
      
      // 初始化时间显示对象的userData
      if (!this.timeDisplayObject.userData.canvas) {
        this.timeDisplayObject.userData.canvas = document.createElement('canvas')
        this.timeDisplayObject.userData.context = this.timeDisplayObject.userData.canvas.getContext('2d')
        this.timeDisplayObject.userData.canvas.width = 512
        this.timeDisplayObject.userData.canvas.height = 64
      }
      
      const canvas = this.timeDisplayObject.userData.canvas
      const context = this.timeDisplayObject.userData.context
      
      // 清除画布
      context.clearRect(0, 0, canvas.width, canvas.height)
      
      // 设置样式
      context.fillStyle = '#3399ff'
      context.font = '28px Arial'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      
      // 获取当前时间
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      const timeText = `更新时间: ${hours}:${minutes}:${seconds}`
      
      // 绘制文本
      context.fillText(timeText, canvas.width/2, canvas.height/2)
      
      // 创建纹理
      if (!this.timeDisplayObject.userData.textureInitialized) {
        const texture = new THREE.CanvasTexture(canvas)
        
        // 创建新材质
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide
        })
        
        // 保存原始材质
        this.timeDisplayObject.userData.originalMaterial = this.timeDisplayObject.material
        this.timeDisplayObject.material = material
        this.timeDisplayObject.userData.textureInitialized = true
      } else {
        // 更新现有材质的纹理
        this.timeDisplayObject.material.map.needsUpdate = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.three-render-core {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  
  &.light-theme {
    background-color: #ffffff;
    color: #333333;
    
    .config-display {
      background-color: rgba(255, 255, 255, 0.8);
      border: 1px solid #e0e0e0;
    }
  }
  
  &.auto-theme {
    background-color: #1e1e1e;
    color: #f0f0f0;
    
    .config-display {
      background-color: rgba(30, 30, 30, 0.8);
      border: 1px solid #444444;
    }
  }
  
  .config-display {
    position: absolute;
    top: 10px;
    left: 10px;
    width: auto;
    max-width: 300px;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 10;
    
    .config-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 1px dashed rgba(125, 125, 125, 0.3);
      
      &:last-child {
        margin-bottom: 0;
        border-bottom: none;
      }
      
      .label {
        font-weight: bold;
        margin-right: 10px;
      }
      
      .value {
        max-width: 60%;
        word-break: break-all;
        
        &.pm25-good {
          color: #33cc33;
        }
        
        &.pm25-moderate {
          color: #ffff00;
        }
        
        &.pm25-unhealthy-sensitive {
          color: #ff9900;
        }
        
        &.pm25-unhealthy {
          color: #ff0000;
        }
        
        &.pm25-very-unhealthy {
          color: #800080;
        }
        
        &.pm25-hazardous {
          color: #8b0000;
        }
      }
    }
  }
  
  .loading-indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    z-index: 20;
  }
  
  .error-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(220, 53, 69, 0.9);
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    max-width: 80%;
    text-align: center;
    z-index: 20;
  }
}
</style>
