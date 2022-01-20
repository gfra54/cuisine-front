import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Groupes',
    component: () => import('../views/Groupes.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
