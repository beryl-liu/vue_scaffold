export default {
  filterDemoState(state, getters) {
    return state.demoState.filter(value => {
      return value > 18
    })
  }
}
