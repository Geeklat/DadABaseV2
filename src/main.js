import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VuePapaParse from 'vue-papa-parse'

Vue.config.productionTip = false
Vue.use(VuePapaParse)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
