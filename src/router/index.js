import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  // path: '/help',
  // name: 'Help',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () =>
  // import(/* webpackChunkName: "about" */ ''),
  // }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({
    x: 0,
    y: 0
  })
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || ''
  next()
})
export default router
