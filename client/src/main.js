import Vue from 'vue'
import Vuesax from 'vuesax'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vuesax/dist/vuesax.css'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'


Vue.use(Vuesax, {

})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
