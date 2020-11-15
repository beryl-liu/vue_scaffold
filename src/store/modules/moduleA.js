const state = () => ({
  demoMoudleA: []
})

const mutations = {
  SET_DEMO_MOUDLEA (state, payload) {
    state.demoMoudleA = payload
  }
}

const getters = {
  filterDemoModuleA (state, getter) {
    return state.demoMoudleA.filter(value => {
      return value==='beryl'
    })
  }
}

const actions = {
  getDemoModuleA ({ commit }, payload) {
    setTimeout(() => {
      commit('SET_DEMO_MOUDLEA', ['beryl', 'jack'])
    }, 1000)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
