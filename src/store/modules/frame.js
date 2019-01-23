
// state
const state = {
  currentView: null // 门户当前视图
}

// getters
const getters = {
  currentView: (state) => {
    // 优先从store里面取，如果不存在则从localStorage取
    return state.currentView ? state.currentView : localStorage['aidp-current-view']
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  setCurrentView (state, view) {
    state.currentView = view
    localStorage['aidp-current-view'] = view
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
