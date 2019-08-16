import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  Vuetify,
  render: h => h(App)
}).$mount('#app');