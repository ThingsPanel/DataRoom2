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
import cloneDeep from 'lodash/cloneDeep'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { mapState, mapMutations } from 'vuex'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import _ from 'lodash'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
    // 监听主题变化手动触发组件配置更新
    'config.option.theme': {
      handler(val) {
        if (val) {
          this.changeStyle(this.config, true)
        }
      }
    },
    // 监听 PM2.5 值变化
    pm25Value: {
      handler(val) {
        this.updatePM25Display()
      }
    }
  },
  mounted() {
    // 监听容器大小变化
    const container = this.$refs.container
    this.resizeObserver = new ResizeObserver(() => {
      this.onWindowResize()
    })
    this.resizeObserver.observe(container)
    
    this.chartInit()
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
    initThreeJS(config) {
      // 清理现有场景
      this.cleanupScene()
      
      // 创建场景
      this.scene = new THREE.Scene()
      
      // 设置背景颜色
      const backgroundColor = config.option.customize.backgroundColor || '#111111'
      this.scene.background = new THREE.Color(backgroundColor)
      
      // 创建相机
      const container = this.$refs.container
      const width = container.clientWidth
      const height = container.clientHeight
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      
      // 设置相机位置
      const cameraPosition = config.option.customize.cameraPosition || { x: 0, y: 3, z: 7 }
      this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
      
      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(width, height)
      this.renderer.shadowMap.enabled = true
      container.appendChild(this.renderer.domElement)
      
      // 创建控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.target.set(0, 2, 0)
      this.controls.update()
      
      // 添加灯光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
      this.scene.add(ambientLight)
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
      directionalLight.position.set(5, 10, 7.5)
      directionalLight.castShadow = true
      this.scene.add(directionalLight)
      
      // 添加地面
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshStandardMaterial({ color: 0x222222 })
      )
      ground.rotation.x = -Math.PI / 2
      ground.receiveShadow = true
      this.scene.add(ground)
      
      // 创建PM2.5监测器模型
      this.createPM25Monitor(config)
      
      // 开始动画循环
      this.animate()
    },
    
    // 创建PM2.5监测器模型
    createPM25Monitor(config) {
      // 创建一个组来包含所有部件
      const monitorGroup = new THREE.Group()
      
      // 创建底座
      const baseGeometry = new THREE.BoxGeometry(3, 0.3, 2)
      const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 })
      const base = new THREE.Mesh(baseGeometry, baseMaterial)
      base.position.y = 0.15
      base.receiveShadow = true
      base.castShadow = true
      monitorGroup.add(base)
      
      // 创建主体
      const bodyGeometry = new THREE.BoxGeometry(2.5, 3, 1.5)
      const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3366cc,
        metalness: 0.5,
        roughness: 0.2
      })
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
      body.position.y = 1.8
      body.receiveShadow = true
      body.castShadow = true
      monitorGroup.add(body)
      
      // 创建显示屏
      const screenGeometry = new THREE.PlaneGeometry(2, 1.5)
      const screenMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x000000,
        emissive: 0x222222,
        metalness: 0.8,
        roughness: 0.2
      })
      const screen = new THREE.Mesh(screenGeometry, screenMaterial)
      screen.position.set(0, 2, 0.76)
      screen.receiveShadow = false
      screen.castShadow = false
      monitorGroup.add(screen)
      
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
      this.pm25Plane.position.set(0, 2, 0.77)
      monitorGroup.add(this.pm25Plane)
      
      // 创建传感器进气口
      const intakeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 16)
      const intakeMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 })
      const intake = new THREE.Mesh(intakeGeometry, intakeMaterial)
      intake.rotation.x = Math.PI / 2
      intake.position.set(0, 3.2, 0.5)
      intake.receiveShadow = true
      intake.castShadow = true
      monitorGroup.add(intake)
      
      // 创建按钮
      const buttonGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 16)
      const buttonMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 })
      const button = new THREE.Mesh(buttonGeometry, buttonMaterial)
      button.rotation.x = Math.PI / 2
      button.position.set(0.8, 1, 0.8)
      button.receiveShadow = true
      button.castShadow = true
      monitorGroup.add(button)
      
      // 添加到场景
      this.scene.add(monitorGroup)
      this.model = monitorGroup
      
      // 设置模型位置和缩放
      const modelScale = config.option.customize.modelScale || 1
      const modelPositionY = config.option.customize.modelPositionY || 0
      
      monitorGroup.position.y = modelPositionY
      monitorGroup.scale.set(modelScale, modelScale, modelScale)
      
      console.log('PM2.5监测器模型创建成功')
      
      // 尝试加载GLB模型
      this.loadGLBModel(config)
    },
    
    // 加载GLB模型
    loadGLBModel(config) {
      // 创建加载器
      if (!this.loader) {
        this.loader = new GLTFLoader()
      }
      
      // 获取模型路径 - 从组件配置中获取
      // 注意：config.option.customize 中应该已经包含了从 PM25监测器.js 合并过来的配置
      const modelPath = config.option.customize.modelPath
      
      // 如果没有指定模型路径，则使用内置的简单模型
      if (!modelPath || modelPath === '') {
        console.log('未指定模型路径，使用内置简单模型')
        return
      }
      
      console.log('尝试加载模型:', modelPath)
      
      // 加载模型
      this.loader.load(
        modelPath,
        (gltf) => {
          // 模型加载成功
          console.log('GLB模型加载成功:', gltf)
          
          // 移除之前的模型
          if (this.model) {
            this.scene.remove(this.model)
          }
          
          // 设置新模型
          this.model = gltf.scene
          
          // 设置模型位置和缩放
          const modelScale = config.option.customize.modelScale || 1
          const modelPositionY = config.option.customize.modelPositionY || 0
          
          this.model.position.y = modelPositionY
          this.model.scale.set(modelScale, modelScale, modelScale)
          
          // 添加到场景
          this.scene.add(this.model)
          
          // 创建PM2.5显示面板
          this.createDisplayPanel()
        },
        (xhr) => {
          // 加载进度
          console.log((xhr.loaded / xhr.total * 100) + '% 已加载')
        },
        (error) => {
          // 加载失败
          console.error('加载GLB模型失败:', error)
        }
      )
    },
    
    // 创建PM2.5显示面板
    createDisplayPanel() {
      // 创建画布
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 128
      const context = canvas.getContext('2d')
      
      // 绘制背景
      context.fillStyle = '#000000'
      context.fillRect(0, 0, 256, 128)
      
      // 绘制PM2.5文本
      context.fillStyle = '#33cc33'
      context.font = 'Bold 36px Arial'
      context.textAlign = 'center'
      context.fillText('PM2.5', 128, 50)
      context.fillText(this.pm25Value.toString(), 128, 100)
      
      // 创建纹理
      const texture = new THREE.CanvasTexture(canvas)
      
      // 创建材质
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
      })
      
      // 创建平面
      const geometry = new THREE.PlaneGeometry(1, 0.5)
      const plane = new THREE.Mesh(geometry, material)
      
      // 设置位置
      plane.position.set(0, 2, 0.77)
      
      // 添加到模型
      this.model.add(plane)
      
      // 保存引用
      this.pm25Canvas = canvas
      this.pm25Context = context
      this.pm25Plane = plane
    },
    
    // 更新PM2.5显示
    updatePM25Display() {
      if (!this.pm25Context) return
      
      // 清除画布
      this.pm25Context.fillStyle = '#000000'
      this.pm25Context.fillRect(0, 0, 256, 128)
      
      // 根据PM2.5值确定颜色
      let color = '#33cc33' // 绿色 - 优
      if (this.pm25Value > 35) color = '#ffff00' // 黄色 - 良
      if (this.pm25Value > 75) color = '#ff9900' // 橙色 - 轻度污染
      if (this.pm25Value > 115) color = '#ff0000' // 红色 - 中度污染
      if (this.pm25Value > 150) color = '#800080' // 紫色 - 重度污染
      if (this.pm25Value > 250) color = '#8b0000' // 深红 - 严重污染
      
      // 绘制PM2.5值
      this.pm25Context.font = 'Bold 36px Arial'
      this.pm25Context.fillStyle = color
      this.pm25Context.textAlign = 'center'
      this.pm25Context.fillText('PM2.5', 128, 50)
      this.pm25Context.fillText(this.pm25Value.toString(), 128, 100)
      
      // 如果有纹理，更新它
      if (this.pm25Plane && this.pm25Plane.material && this.pm25Plane.material.map) {
        this.pm25Plane.material.map.needsUpdate = true
      }
    },
    
    // 动画循环
    animate() {
      // 取消之前的动画循环
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame)
      }
      
      // 创建新的动画循环
      this.animationFrame = requestAnimationFrame(() => this.animate())
      
      // 更新控制器
      if (this.controls) {
        this.controls.update()
      }
      
      // 旋转模型
      if (this.model && this.config.option.customize) {
        const rotationSpeed = this.config.option.customize.rotationSpeed || 0.005
        this.model.rotation.y += rotationSpeed
      }
      
      // 渲染场景
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera)
      }
    },
    
    // 窗口大小调整
    onWindowResize() {
      if (!this.camera || !this.renderer) return
      
      const container = this.$refs.container
      const width = container.clientWidth
      const height = container.clientHeight
      
      // 更新相机
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      
      // 更新渲染器
      this.renderer.setSize(width, height)
    },
    
    // 初始化图表
    chartInit() {
      // 确保 config 有值
      if (!this.config) {
        console.warn('配置对象为空，无法初始化图表')
        return
      }
      
      // 确保 config 有 code 属性
      if (!this.config.code) {
        console.warn('配置对象缺少 code 属性，无法初始化图表')
        return
      }
      
      // 创建一个深拷贝，避免直接修改 this.config
      let config = _.cloneDeep(this.config)
      
      // 确保 config.option 存在
      if (!config.option) {
        config.option = {}
      }
      
      // 确保 config.option.customize 存在
      if (!config.option.customize) {
        config.option.customize = {}
      }
      
      // key和code相等，说明是一进来刷新，调用list接口
      if (config.code === config.key || this.isPreview) {
        try {
          // 改变样式
          config = this.changeStyle(config)
          
          // 确保 config 有值
          if (!config) {
            console.warn('样式更新后配置对象为空，无法初始化图表')
            return
          }
          
          // 改变数据
          config.loading = true
          this.changeChartLoading(config)
          
          this.changeDataByCode(config).then((res) => {
            // 初始化图表
            if (res) {
              res.loading = false
              this.changeChartLoading(res)
              this.initChart(res)
            } else if (config) {
              config.loading = false
              this.changeChartLoading(config)
              this.initChart(config)
            }
          }).catch((error) => {
            console.error('加载数据失败:', error)
            if (config) {
              config.loading = false
              this.changeChartLoading(config)
              this.initChart(config)
            }
          })
        } catch (error) {
          console.error('初始化图表失败:', error)
          this.initChart(config)
        }
      } else {
        // 改变样式
        try {
          config = this.changeStyle(config)
          this.initChart(config)
        } catch (error) {
          console.error('更新样式失败:', error)
          this.initChart(config)
        }
      }
    },
    
    // 初始化图表
    initChart(config) {
      // 设置 PM2.5 值
      this.pm25Value = config.option.customize.pm25Value || config.option.customize.defaultPM25Value || 38
      
      // 初始化Three.js场景
      this.initThreeJS(config)
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
        const pm25Field = config.option.customize.pm25Field || 'pm25'
        const pm25Data = data.data.find(item => item.key === pm25Field || item.name === pm25Field)
        if (pm25Data && pm25Data.value !== undefined) {
          config.option.customize.pm25Value = pm25Data.value
        }
      }
      
      return config
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

