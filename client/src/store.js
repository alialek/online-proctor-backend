import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from './store/alert.module';
import { authentication } from './store/authentication.module';
import { users } from './store/users.module';
import { quest } from './store/quest.module';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    alert,
    authentication,
    users,
    quest
  }
});
