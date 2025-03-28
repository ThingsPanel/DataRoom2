import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import threeScene from './threeScene'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    threeScene
  }
}
