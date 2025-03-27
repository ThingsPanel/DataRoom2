<template>
  <div
    style="width: 100%;height: 100%"
    class="bs-design-wrap bs-custom-component"
    :class="{'light-theme':customTheme === 'light','auto-theme':customTheme !=='light'}"
  >
    <div
      :id="threeId"
      style="width: 100%;height: 100%"
    />
  </div>
</template>
<script>
import 'insert-css'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { mapState, mapMutations } from 'vuex'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'ThreeCustomComponent',
  mixins: [commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      hasData: false,
      externalEngine: null
    }
  },
  computed: {
    ...mapState('bigScreen', {
      pageInfo: state => state.pageInfo,
      customTheme: state => state.pageInfo.pageConfig.customTheme,
      activeCode: state => state.activeCode
    }),
    threeId () {
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
  created () {
  },
  watch: {
    // 监听整个配置的变化
    config: {
      handler(newConfig, oldConfig) {
        if (newConfig && oldConfig) {
          // 判断是否是样式变化
          if (
            JSON.stringify(newConfig.option?.customize) !== 
            JSON.stringify(oldConfig.option?.customize)
          ) {
            console.log('检测到ThreeRender config整体变化，应用新样式')
            this.applyStyleChanges(newConfig)
          }
        }
      },
      deep: true
    },
    // 监听主题变化手动触发组件配置更新
    'config.option.theme': {
      handler(val) {
        if (val) {
          console.log('监测到主题变化:', val)
          this.changeStyle(this.config, true)
        }
      }
    },
    // 监听customize对象变化
    'config.option.customize': {
      handler(val) {
        if (val) {
          console.log('监测到样式配置变化:', val)
          this.applyStyleChanges(this.config)
        }
      },
      deep: true
    }
  },
  mounted () {
    // 初始化Three.js场景
    this.threeInit()
    
    // 监听容器大小变化
    const dragSelect = document.querySelector('#' + this.threeId)
    const resizeObserver = new ResizeObserver(entries => {
      if (this.renderer) {
        const width = entries[0].contentRect.width
        const height = entries[0].contentRect.height
        this.renderer.setSize(width, height)
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
      }
    })
    resizeObserver.observe(dragSelect)
  },
  beforeDestroy () {
    // 销毁外部引擎
    if (this.externalEngine) {
      try {
        if (typeof this.externalEngine.destroy === 'function') {
          console.log('销毁外部引擎')
          this.externalEngine.destroy()
        }
      } catch (e) {
        console.warn('销毁外部引擎时出错:', e)
      }
      this.externalEngine = null
    }
    
    // 销毁Three.js场景
    if (this.renderer) {
      this.renderer.dispose()
      this.scene = null
      this.camera = null
      this.renderer = null
      this.controls = null
    }
    
    // 清除动画
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
      this.animationFrame = null
    }
  },
  methods: {
    ...mapMutations('bigScreen', ['changeChartConfig', 'changeActiveItemConfig', 'changeChartLoading']),
    threeInit () {
      console.log('threeInit方法被调用，组件ID:', this.threeId, '配置:', this.config)
      
      // 检查容器是否存在
      const container = document.getElementById(this.threeId)
      if (!container) {
        console.error('找不到容器元素:', this.threeId)
        return
      }
      
      // 立即使用默认配置创建场景
      const defaultConfig = {
        name: this.config.name, // 确保传递组件名称
        option: {
          customize: {
            fov: 75,
            near: 0.1,
            far: 1000,
            cameraPositionZ: 5,
            backgroundColor: '#000000',
            ambientLightIntensity: 0.5,
            ambientLightColor: '#ffffff',
            directionalLightIntensity: 0.8,
            directionalLightColor: '#ffffff'
          },
          threeData: []
        }
      }
      
      console.log('使用默认配置创建场景，组件名称:', defaultConfig.name)
      
      // 先以默认配置渲染，保证有内容显示
      this.newThreeScene(defaultConfig)
      
      // 确保config存在并且有基础结构
      if (!this.config) {
        console.warn('配置对象不存在，只使用默认配置渲染')
        return
      }
      
      let config = this.config
      // key和code相等，说明是一进来刷新，调用list接口
      if (this.config.code === this.config.key || this.isPreview) {
        try {
          // 改变样式
          config = this.changeStyle(config)
          // 改变数据
          if (config) {
            config.loading = true
            this.changeChartLoading(config)
            this.changeDataByCode(config).then((res) => {
              // 初始化图表
              if (config) {
                config.loading = false
                this.changeChartLoading(config)
              }
              this.newThreeScene(res)
            }).catch((err) => {
              console.error('加载数据失败:', err)
              if (config) {
                config.loading = false
                this.changeChartLoading(config)
              }
            })
          }
        } catch (err) {
          console.error('初始化3D场景时出错:', err)
          if (config) {
            config.loading = false
            this.changeChartLoading(config)
          }
        }
      } else {
        try {
          if (config) {
            config.loading = true
            this.changeChartLoading(config)
            // 否则说明是更新，这里的更新只指更新数据（改变样式时是直接调取changeStyle方法），因为更新数据会改变key,调用chart接口
            this.changeData(config).then((res) => {
              if (config) {
                config.loading = false
                this.changeChartLoading(config)
              }
              // 初始化图表
              this.newThreeScene(res)
            }).catch((err) => {
              console.error('更新数据失败:', err)
              if (config) {
                config.loading = false
                this.changeChartLoading(config)
              }
            })
          }
        } catch (err) {
          console.error('更新3D场景时出错:', err)
          if (config) {
            config.loading = false
            this.changeChartLoading(config)
          }
        }
      }
    },
    /**
     * 初始化三维场景
     */
    newThreeScene (config) {
      console.log('newThreeScene被调用，配置:', config ? config.name : 'undefined')
      const container = document.getElementById(this.threeId)
      if (!container) {
        console.error('找不到容器元素:', this.threeId)
        return
      }
      console.log('初始化Three.js场景，容器尺寸:', container.clientWidth, 'x', container.clientHeight)
      
      // 确保config.option和config.option.customize存在
      if (!config) {
        console.error('配置对象不存在')
        return
      }
      
      // 记录组件类型
      console.log('组件类型:', config.name)
      
      if (!config.option) {
        config.option = {}
      }
      
      if (!config.option.customize) {
        config.option.customize = {}
      }
      
      // 记录配置信息
      if (config && config.option && config.option.customize) {
        console.log('样式配置信息:', {
          背景颜色: config.option.customize.backgroundColor || '#000000',
          环境光颜色: config.option.customize.ambientLightColor || '#ffffff',
          环境光强度: config.option.customize.ambientLightIntensity || 0.5,
          平行光颜色: config.option.customize.directionalLightColor || '#ffffff',
          平行光强度: config.option.customize.directionalLightIntensity || 0.8,
          相机位置: [
            config.option.customize.cameraPositionX || 0,
            config.option.customize.cameraPositionY || 0,
            config.option.customize.cameraPositionZ || 5
          ]
        })
      }
      
      // 第一次创建场景
      if (!this.scene) {
        this.scene = new THREE.Scene()
        
        const width = container.clientWidth
        const height = container.clientHeight
        
        // 创建相机
        this.camera = new THREE.PerspectiveCamera(
          config.option.customize.fov || 75,
          width / height,
          config.option.customize.near || 0.1,
          config.option.customize.far || 1000
        )
        
        // 设置相机位置
        this.camera.position.set(
          config.option.customize.cameraPositionX || 0,
          config.option.customize.cameraPositionY || 0,
          config.option.customize.cameraPositionZ || 5
        )
        
        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        })
        this.renderer.setSize(width, height)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        
        // 清除容器内容并添加渲染器的DOM元素
        container.innerHTML = ''
        container.appendChild(this.renderer.domElement)
        
        // 添加控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
        
        // 注册事件处理器
        this.registerEvent()
        
        // 设置动画循环
        if (!this.animationFrame) {
          const animate = () => {
            this.animationFrame = requestAnimationFrame(animate)
            if (this.controls) {
              this.controls.update()
            }
            
            // 给场景中的所有网格添加旋转动画
            if (this.scene) {
              this.scene.traverse((object) => {
                if (object instanceof THREE.Mesh && object.userData.isDefault) {
                  object.rotation.x += 0.01
                  object.rotation.y += 0.01
                }
              })
            }
            
            if (this.renderer && this.scene && this.camera) {
              this.renderer.render(this.scene, this.camera)
            }
          }
          animate()
        }
      } else {
        // 如果场景已经存在，更新相机参数
        const width = container.clientWidth
        const height = container.clientHeight
        
        this.camera.fov = config.option.customize.fov || 75
        this.camera.aspect = width / height
        this.camera.near = config.option.customize.near || 0.1
        this.camera.far = config.option.customize.far || 1000
        this.camera.position.set(
          config.option.customize.cameraPositionX || 0,
          config.option.customize.cameraPositionY || 0,
          config.option.customize.cameraPositionZ || 5
        )
        this.camera.updateProjectionMatrix()
      }
      
      // 应用样式配置
      this.applyStyleChanges(config)
      
      // 根据配置添加3D对象
      this.createObjects(config)
    },
    
    /**
     * 创建3D对象
     */
    createObjects (config) {
      // 检查配置是否有效
      if (!config || !config.option) {
        console.warn('无效的配置对象，创建默认对象')
        this.createDefaultObject(config)
        return
      }

      console.log('创建3D对象，配置:', 
        config.name, 
        '数据:', 
        config.option?.threeData?.length || 0, 
        '个项目'
      )
      
      // 根据配置和数据创建对象
      if (config.option?.threeData && config.option.threeData.length > 0) {
        // 处理数据并创建对象
        switch (config.name) {
          case '3D基础立方体':
            this.createCubes(config)
            break
          case '3D基础球体':
            this.createSpheres(config)
            break
          default:
            // 默认创建一个示例对象，根据名称判断类型
            console.log('未知的3D类型:', config.name, '创建默认对象')
            this.createDefaultObject(config)
        }
      } else {
        console.log('没有3D数据，创建默认对象')
        this.createDefaultObject(config)
      }
    },
    
    /**
     * 创建默认对象 - 根据配置类型决定创建球体还是立方体
     */
    createDefaultObject (config) {
      console.log('创建默认对象，配置:', config ? config.name : '无')
      
      // 判断是创建什么类型的默认对象
      let createCube = false
      if (config && config.name) {
        // 检查组件名称，确定类型
        console.log('根据组件名称决定创建的对象类型:', config.name)
        if (config.name === '3D基础立方体') {
          createCube = true
          console.log('将创建立方体默认对象')
        } else {
          console.log('将创建球体默认对象')
        }
      } else {
        console.warn('没有有效的config.name，默认创建球体')
      }
      
      // 清除旧对象 - 只清除没有userData标记的对象，避免清除有数据的对象
      if (this.scene) {
        const objectsToRemove = []
        this.scene.traverse((object) => {
          // 只移除没有用户数据的Mesh对象，有数据的对象代表是数据生成的，应该保留
          if (object instanceof THREE.Mesh && !object.userData.data) {
            objectsToRemove.push(object)
          }
        })
        objectsToRemove.forEach(obj => this.scene.remove(obj))
      }
      
      if (createCube) {
        // 创建一个立方体作为默认对象
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshStandardMaterial({ 
          color: 0x0000ff, // 默认蓝色立方体
          metalness: 0.3,
          roughness: 0.4
        })
        const cube = new THREE.Mesh(geometry, material)
        
        // 添加旋转动画以便更容易看到
        cube.rotation.x = Math.PI / 4
        cube.rotation.y = Math.PI / 4
        
        // 标记为默认对象
        cube.userData = {
          isDefault: true,
          objectType: 'defaultCube'
        }
        
        this.scene.add(cube)
        console.log('创建默认立方体完成')
      } else {
        // 创建一个球体作为默认对象
        const geometry = new THREE.SphereGeometry(1, 32, 32)
        const material = new THREE.MeshStandardMaterial({ 
          color: 0xff0000, // 默认红色球体
          metalness: 0.3,
          roughness: 0.4
        })
        const sphere = new THREE.Mesh(geometry, material)
        
        // 添加旋转动画以便更容易看到
        sphere.rotation.x = Math.PI / 4
        sphere.rotation.y = Math.PI / 4
        
        // 标记为默认对象
        sphere.userData = {
          isDefault: true,
          objectType: 'defaultSphere'
        }
        
        this.scene.add(sphere)
        console.log('创建默认球体完成')
      }
      
      // 添加后再次确认场景中的对象
      console.log('场景中的对象数量：', this.scene.children.length)
    },
    
    /**
     * 创建立方体
     */
    createCubes (config) {
      if (!config || !config.option || !config.option.threeData) {
        console.warn('createCubes: 无效的配置或数据')
        this.createDefaultObject(config)
        return
      }

      const data = config.option.threeData
      console.log('创建立方体，数据:', JSON.stringify(data))
      
      // 清除旧对象 - 确保只清除默认对象和立方体，保留其他对象
      if (this.scene) {
        const objectsToRemove = []
        this.scene.traverse((object) => {
          // 移除默认对象和立方体
          if (object instanceof THREE.Mesh && 
              (object.userData.isDefault || 
               (object.geometry instanceof THREE.BoxGeometry))) {
            objectsToRemove.push(object)
          }
        })
        objectsToRemove.forEach(obj => this.scene.remove(obj))
      }
      
      data.forEach((item, index) => {
        // 计算立方体位置，确保多个立方体不重叠
        const x = item.x !== undefined ? Number(item.x) : (index * 2 - (data.length - 1))
        const y = item.y !== undefined ? Number(item.y) : 0
        const z = item.z !== undefined ? Number(item.z) : 0
        
        // 确定立方体尺寸
        const width = item.width !== undefined ? Number(item.width) : 1
        const height = item.height !== undefined ? Number(item.height) : 1
        const depth = item.depth !== undefined ? Number(item.depth) : 1
        
        // 确定颜色
        let color = 0x0000ff // 默认蓝色
        if (item.color !== undefined) {
          color = item.color
        } else if (item.value !== undefined) {
          // 根据值的大小创建从蓝色到红色的渐变色
          const value = Number(item.value)
          const normalizedValue = Math.min(1, Math.max(0, value / 100)) // 归一化到0-1范围
          // 从蓝色(0x0000ff)到红色(0xff0000)的渐变
          const r = Math.floor(normalizedValue * 255)
          const b = Math.floor((1 - normalizedValue) * 255)
          color = (r << 16) | (0 << 8) | b
        }
        
        const geometry = new THREE.BoxGeometry(width, height, depth)
        const material = new THREE.MeshStandardMaterial({
          color: color,
          metalness: 0.3,
          roughness: 0.4
        })
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(x, y, z)
        
        // 保存原始数据用于交互
        cube.userData = {
          data: item,
          index: index,
          originalColor: color,
          originalScale: { x: 1, y: 1, z: 1 },
          originalPosition: { x, y, z },
          objectType: 'cube'
        }
        
        this.scene.add(cube)
        console.log('添加立方体，尺寸:', width, height, depth, '颜色:', color.toString(16), '位置:', x, y, z)
      })
      
      // 注册交互事件
      this.registerEvent()
    },
    
    /**
     * 创建球体
     */
    createSpheres (config) {
      if (!config || !config.option || !config.option.threeData) {
        console.warn('createSpheres: 无效的配置或数据')
        this.createDefaultObject(config)
        return
      }

      const data = config.option.threeData
      console.log('创建球体，数据:', JSON.stringify(data))
      
      // 清除旧对象 - 确保只清除默认对象和球体，保留其他对象
      if (this.scene) {
        const objectsToRemove = []
        this.scene.traverse((object) => {
          // 移除默认对象和球体
          if (object instanceof THREE.Mesh && 
              (object.userData.isDefault || 
               (object.geometry instanceof THREE.SphereGeometry))) {
            objectsToRemove.push(object)
          }
        })
        objectsToRemove.forEach(obj => this.scene.remove(obj))
      }
      
      data.forEach((item, index) => {
        // 计算球体位置，确保多个球体不重叠
        const x = item.x !== undefined ? Number(item.x) : (index * 2 - (data.length - 1))
        const y = item.y !== undefined ? Number(item.y) : 0
        const z = item.z !== undefined ? Number(item.z) : 0
        
        // 从数值计算球体大小
        let radius = 0.5
        if (item.radius !== undefined) {
          radius = Number(item.radius)
        } else if (item.value !== undefined) {
          // 根据数值调整大小，最小0.5，最大2
          radius = Math.max(0.5, Math.min(2, Number(item.value) / 10))
        }
        
        // 从数值计算颜色
        let color = 0xff0000 // 默认红色
        if (item.color !== undefined) {
          color = item.color
        } else if (item.value !== undefined) {
          // 根据值的大小创建从蓝色到红色的渐变色
          const value = Number(item.value)
          const normalizedValue = Math.min(1, Math.max(0, value / 100)) // 归一化到0-1范围
          // 从蓝色(0x0000ff)到红色(0xff0000)的渐变
          const r = Math.floor(normalizedValue * 255)
          const b = Math.floor((1 - normalizedValue) * 255)
          color = (r << 16) | (0 << 8) | b
        }
        
        // 使用SphereGeometry创建球体几何体
        const geometry = new THREE.SphereGeometry(radius, 32, 32)
        const material = new THREE.MeshStandardMaterial({
          color: color,
          metalness: 0.3,
          roughness: 0.4
        })
        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.set(x, y, z)
        
        // 保存原始数据用于交互
        sphere.userData = {
          data: item,
          index: index,
          originalColor: color,
          originalScale: { x: 1, y: 1, z: 1 },
          originalPosition: { x, y, z },
          objectType: 'sphere'
        }
        
        this.scene.add(sphere)
        console.log('添加球体，半径:', radius, '颜色:', color.toString(16), '位置:', x, y, z)
      })
      
      // 注册交互事件
      this.registerEvent()
    },
    
    /**
     * 注册事件处理
     */
    registerEvent () {
      console.log('注册3D对象交互事件')
      
      // 移除旧事件监听器，避免重复
      if (this.renderer && this.renderer.domElement) {
        this.renderer.domElement.removeEventListener('click', this.onClickHandler)
        this.renderer.domElement.removeEventListener('mousemove', this.onMouseMoveHandler)
        
        // 保存事件处理函数引用，以便之后可以删除
        this.onClickHandler = this.onClick.bind(this)
        this.onMouseMoveHandler = this.onMouseMove.bind(this)
        
        // 添加新的事件监听器
        this.renderer.domElement.addEventListener('click', this.onClickHandler, false)
        this.renderer.domElement.addEventListener('mousemove', this.onMouseMoveHandler, false)
        
        console.log('事件注册完成')
      } else {
        console.warn('渲染器未初始化，无法注册事件')
      }
    },
    
    /**
     * 鼠标移动事件处理
     */
    onMouseMove (event) {
      // 计算鼠标位置的标准化坐标
      const rect = this.renderer.domElement.getBoundingClientRect()
      const pointer = new THREE.Vector2()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      
      // 从相机发射射线
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(pointer, this.camera)
      
      // 检测射线与对象相交
      const intersects = raycaster.intersectObjects(this.scene.children)
      
      // 重置所有对象
      this.scene.traverse((object) => {
        if (object instanceof THREE.Mesh && object.userData.originalScale) {
          // 恢复原始颜色和大小
          object.material.color.setHex(object.userData.originalColor)
          object.scale.set(1, 1, 1)
        }
      })
      
      // 高亮悬停对象
      if (intersects.length > 0) {
        const object = intersects[0].object
        if (object instanceof THREE.Mesh) {
          // 高亮颜色 - 变亮
          const color = new THREE.Color(object.userData.originalColor)
          color.multiplyScalar(1.2) // 增加亮度
          object.material.color.set(color)
          
          // 稍微放大
          object.scale.set(1.1, 1.1, 1.1)
          
          // 显示提示信息（可以通过DOM元素实现）
          if (object.userData.data) {
            const data = object.userData.data
            console.log('鼠标悬停数据:', data)
            document.body.style.cursor = 'pointer'
          }
        }
      } else {
        document.body.style.cursor = 'default'
      }
    },
    
    /**
     * 点击事件处理
     */
    onClick (event) {
      console.log('3D对象点击事件触发')
      
      // 计算鼠标位置的标准化坐标
      const rect = this.renderer.domElement.getBoundingClientRect()
      const pointer = new THREE.Vector2()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      
      // 从相机发射射线
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(pointer, this.camera)
      
      // 检测射线与对象相交
      const intersects = raycaster.intersectObjects(this.scene.children)
      
      if (intersects.length > 0) {
        const object = intersects[0].object
        if (object.userData.data) {
          console.log('点击了3D对象，数据:', object.userData.data)
          
          // 提取数据并进行联动
          const formData = object.userData.data
          this.linkage(formData)
          
          // 动画效果 - 跳动
          const jumpAnimation = () => {
            const time = Date.now() * 0.001 // 当前时间(秒)
            const originalY = object.userData.originalPosition.y
            object.position.y = originalY + Math.sin(time * 5) * 0.5 // 上下跳动
            
            // 停止之前的动画
            if (this.clickAnimationId) {
              cancelAnimationFrame(this.clickAnimationId)
            }
            
            // 继续动画
            this.clickAnimationId = requestAnimationFrame(jumpAnimation)
            
            // 3秒后停止动画
            setTimeout(() => {
              if (this.clickAnimationId) {
                cancelAnimationFrame(this.clickAnimationId)
                this.clickAnimationId = null
                object.position.y = originalY // 恢复原位置
              }
            }, 3000)
          }
          
          // 开始动画
          jumpAnimation()
        }
      }
    },
    
    /**
     * 链接数据
     */
    linkage (data) {
      if (!data) {
        console.warn('联动数据为空')
        return
      }
      console.log('3D对象点击事件触发', data)
      
      // 执行自定义联动逻辑
      // 如果需要将联动事件传递给父组件，可以使用this.$emit
      this.$emit('linkage', data)
    },
    
    /**
     * 处理数据
     */
    dataFormatting (config, data) {
      console.log('ThreeRender dataFormatting被调用，数据状态:', data.success, '组件类型:', config.name)
      
      // 数据返回成功则赋值
      if (data.success) {
        // 保存原始数据用于调试
        const originalData = JSON.parse(JSON.stringify(data.data || []))
        
        // 处理数据
        config.option.threeData = data.data || []
        console.log('获取到数据:', config.option.threeData.length, '条记录')
        
        // 执行自定义数据处理函数
        if (config.dataHandler) {
          try {
            console.log('开始执行数据处理脚本')
            // 确保必要的变量在执行eval前已定义
            const setting = config.setting || []
            const option = config.option || {}
            const data = config.option.threeData || []
            
            // 检查维度和指标字段是否设置
            const xField = setting.find(item => item.optionField === 'xField')?.value
            const yField = setting.find(item => item.optionField === 'yField')?.value
            console.log('维度字段:', xField, '指标字段:', yField)
            
            // 执行处理脚本
            eval(config.dataHandler)
            
            // 验证处理后的数据
            console.log('数据处理完成,处理后数据条数:', option.threeData?.length || 0)
          } catch (e) {
            console.error('数据处理脚本执行错误:', e)
          }
        } else {
          console.warn('无数据处理脚本')
        }
      } else {
        console.warn('数据获取失败, 使用空数据', data)
        // 确保threeData存在，即使为空数组
        if (!config.option) {
          config.option = {}
        }
        config.option.threeData = []
      }
      
      return config
    },
    
    /**
     * 应用样式变化
     */
    applyStyleChanges (config) {
      // 检查配置是否有效
      if (!config || !config.option || !config.option.customize) {
        console.warn('无效的样式配置')
        return
      }
      
      const customize = config.option.customize
      
      // 应用背景颜色
      if (this.scene && this.renderer) {
        if (customize.backgroundColor) {
          this.scene.background = new THREE.Color(customize.backgroundColor)
          console.log('更新背景颜色为:', customize.backgroundColor)
        }
      }
      
      // 更新相机参数
      if (this.camera) {
        // 更新视场角
        if (customize.fov) {
          this.camera.fov = customize.fov
          console.log('更新相机视场角为:', customize.fov)
        }
        
        // 更新近裁剪面
        if (customize.near) {
          this.camera.near = customize.near
          console.log('更新相机近裁剪面为:', customize.near)
        }
        
        // 更新远裁剪面
        if (customize.far) {
          this.camera.far = customize.far
          console.log('更新相机远裁剪面为:', customize.far)
        }
        
        // 更新相机位置
        if (
          customize.cameraPositionX !== undefined ||
          customize.cameraPositionY !== undefined ||
          customize.cameraPositionZ !== undefined
        ) {
          const x = customize.cameraPositionX || 0
          const y = customize.cameraPositionY || 0
          const z = customize.cameraPositionZ || 5
          this.camera.position.set(x, y, z)
          console.log('更新相机位置为:', x, y, z)
        }
        
        this.camera.updateProjectionMatrix()
      }
      
      // 清除所有光源
      if (this.scene) {
        const lightsToRemove = []
        this.scene.traverse((object) => {
          if (object instanceof THREE.Light) {
            lightsToRemove.push(object)
          }
        })
        lightsToRemove.forEach(light => this.scene.remove(light))
      }
      
      // 添加环境光
      if (this.scene) {
        // 环境光
        if (customize.ambientLightIntensity > 0) {
          const ambientLight = new THREE.AmbientLight(
            customize.ambientLightColor || 0xffffff,
            customize.ambientLightIntensity || 0.5
          )
          this.scene.add(ambientLight)
          console.log('更新环境光:', customize.ambientLightColor, '强度:', customize.ambientLightIntensity)
        }
        
        // 添加平行光
        if (customize.directionalLightIntensity > 0) {
          const directionalLight = new THREE.DirectionalLight(
            customize.directionalLightColor || 0xffffff,
            customize.directionalLightIntensity || 0.8
          )
          directionalLight.position.set(
            customize.directionalLightPositionX || 1,
            customize.directionalLightPositionY || 1,
            customize.directionalLightPositionZ || 1
          )
          this.scene.add(directionalLight)
          console.log('更新平行光:', customize.directionalLightColor, '强度:', customize.directionalLightIntensity)
        }
        
        // 重新渲染场景
        if (this.renderer && this.scene && this.camera) {
          this.renderer.render(this.scene, this.camera)
        }
      }
    }
  }
}
</script>