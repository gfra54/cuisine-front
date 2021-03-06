import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueQuagga from "vue-quaggajs";

Vue.use(VueQuagga);
Vue.config.productionTip = false
Vue.prototype.$api = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
