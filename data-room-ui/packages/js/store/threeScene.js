/**
 * Three.js场景渲染仓库
 * 用于管理3D场景的状态和方法
 */

const state = {
  scene: null, // 场景实例
  container: null, // 容器元素
  isLoaded: false // 场景是否已加载
}

const mutations = {
  // 设置场景实例
  SET_SCENE (state, scene) {
    state.scene = scene
  },
  // 设置容器元素
  SET_CONTAINER (state, container) {
    state.container = container
  },
  // 设置加载状态
  SET_LOADED (state, isLoaded) {
    state.isLoaded = isLoaded
  }
}

const actions = {
  /**
   * 创建场景渲染器
   * @param {Object} context - Vuex上下文
   * @param {HTMLElement} container - 容器DOM元素
   */
  createSceneRender ({ commit, state }, container) {
    // 如果已经有场景实例，先销毁
    if (state.scene) {
      state.scene.destroy()
    }
    
    commit('SET_CONTAINER', container)
    
    // 加载引擎脚本
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = '/static/libs/three/engine.js'
      script.async = true
      
      script.onload = () => {
        
        try {
          // 尝试创建场景实例
          let sceneInstance = null
          
          // 尝试使用jm类
          if (typeof window.jm === 'function') {
            sceneInstance = new window.jm(container)
          } 
          // 尝试使用SceneBackstage类
          else if (typeof window.SceneBackstage === 'function') {
            sceneInstance = new window.SceneBackstage(container)
          }
          // 尝试查找其他可能的引擎类
          else {
            const engineClasses = Object.keys(window).filter(key => 
              typeof window[key] === 'function' && 
              /scene|engine|three/i.test(key)
            )
            
            
            if (engineClasses.length > 0) {
              const EngineClass = window[engineClasses[0]]
              sceneInstance = new EngineClass(container)
            } else {
              throw new Error('找不到可用的引擎类')
            }
          }
          
          // 保存场景实例
          commit('SET_SCENE', sceneInstance)
          commit('SET_LOADED', true)
          
          // 注册场景加载完成事件
          if (sceneInstance.addEventListener) {
            sceneInstance.addEventListener('sceneLoaded', () => {
            })
          }
          
          resolve(sceneInstance)
        } catch (error) {
          commit('SET_LOADED', false)
          reject(error)
        }
      }
      
      script.onerror = (err) => {
        commit('SET_LOADED', false)
        reject(new Error('脚本加载失败'))
      }
      
      document.head.appendChild(script)
    })
  },
  
  /**
   * 更新传感器数据
   * @param {Object} context - Vuex上下文
   * @param {Array} sensorData - 传感器数据数组
   */
  freshSensors ({ state }, sensorData) {
    if (!state.scene || !state.isLoaded) {
      return
    }
    
    if (typeof state.scene.freshSensors === 'function') {
      state.scene.freshSensors(sensorData)
    }
  },
  
  /**
   * 更新属性数据
   * @param {Object} context - Vuex上下文
   * @param {Object} attributesObj - 属性数据对象
   */
  freshAttributes ({ state }, attributesObj) {
    if (!state.scene || !state.isLoaded) {
      return
    }
    
    if (typeof state.scene.freshAttributes === 'function') {
      state.scene.freshAttributes(attributesObj)
    } 
  }
}

const getters = {
  // 获取场景实例 - 确保始终返回一个值，即使是null
  getScene: state => {
    return state.scene
  },
  
  // 判断场景是否已加载
  isSceneLoaded: state => {
    return state.isLoaded
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 