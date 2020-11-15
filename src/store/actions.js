export default {
  getDemoStateData({ commit }){
    setTimeout(()=>{
      commit.SET_DEMO_STATE([12,17,19])
    },1000)
  }
}
