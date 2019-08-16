import { userService } from '../helper/userService';
import router from '../router';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user, loading: false }
  : { status: { loggedIn: false }, user: null, loading: false };

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ dispatch, commit }, { email, password }) {
      commit('loginRequest', { email });

      userService.login(email, password).then(
        user => {
          commit('loginSuccess', user);
          router.push('/');
        },
        error => {
          commit('loginFailure', error);
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    register({ dispatch, commit }, { name, email, password }) {
      commit('loginRequest', { email });
      userService.register(name, email, password).then(
        user => {
          commit('loginSuccess', user);
          router.push('/');
        },
        error => {
          commit('loginFailure', error);
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    logout({ commit }) {
      userService.logout();
      commit('logout');
    }
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
      state.loading = true;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
      state.loading = false;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
      state.loading = false;
    },
    logout(state) {
      state.status = {};
      state.user = null;
    }
  }
};
