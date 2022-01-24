import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Groupes',
    component: () => import('../views/Groupes.vue')
  },
  {
    path: '/inventaire',
    name: 'Inventaire',
    component: () => import('../views/Inventaire.vue')
  }
]

const router = new VueRouter({
  mode: 'history', routes
})

export default router
