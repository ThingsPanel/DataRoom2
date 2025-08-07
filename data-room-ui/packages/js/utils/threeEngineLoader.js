/**
 * Three.js 引擎加载器
 * 用于管理和加载3D引擎文件
 */

/**
 * 获取本地引擎列表
 * @returns {Promise<Array>} 返回本地可用的引擎列表
 */
export async function getLocalEngineList () {
  // 返回默认的本地引擎列表
  const engines = [
    { label: '默认引擎', value: 'engine.js' },
    { label: '基础引擎', value: 'basic-engine.js' }
  ]
  
  return engines
}

/**
 * 加载本地引擎
 * @param {string} engineName 引擎名称
 * @returns {Promise<Object>} 返回引擎对象
 */
export async function loadLocalEngine (engineName) {
  
  // 默认返回一个空对象，因为实际加载过程已在ThreeRender组件中处理
  return {}
}
