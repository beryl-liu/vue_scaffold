import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import createLogger from 'vuex/dist/logger' // 打印logger插件
import createPersistedState from 'vuex-persistedstate' // 数据持久化插件

const isProd = process.env.NODE_ENV === 'production'
Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  strict: !isProd,
  state,
  mutations,
  getters,
  actions,
  modules,
  plugins: [
    ...(isProd ? [] : [createLogger()]),
    createPersistedState()
  ]
})
