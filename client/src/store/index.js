import Vue from "vue";
import Vuex from "vuex";
import axios from "../interceptor";
import jwtDecode from "jwt-decode";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || null,
    user: {},
    tests: [],
    session: {},
    activeSession: {},
    sessions: [],
    userTest: {},
    process: {
      isLoading: false,
      snack: {
        enabled: false,
        text: "",
        color: "error",
      },
    },
  },
  mutations: {
    SET_SESSION(state, payload) {
      state.session = payload.session;
    },
    SET_SESSIONS(state, payload) {
      state.sessions = payload.sessions;
    },
    LOADING_START(state) {
      state.status = "loading";
    },
    LOADING_STOP(state) {
      state.status = "";
    },
    AUTH_SUCCESS(state, payload) {
      state.status = "success";
      state.token = payload.token;
      state.user = payload.user;
    },
    LOGOUT(state) {
      state.status = "";
      state.token = null;
    },
    SET_ERROR(state, data) {
      state.process.snack.enabled = true;
      state.process.snack.color = "error";
      state.process.snack.text = data;
    },
    SET_SUCCESS(state, data) {
      state.process.snack.enabled = true;
      state.process.snack.color = "success";
      state.process.snack.text = data;
    },
    DISABLE_SESSION(state) {
      state.activeSession = {};
    }
  },
  actions: {
    login({ commit }, user) {
      axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded";

      return new Promise((resolve, reject) => {
        axios({
          url: "https://app.netquest.ru/api/auth",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            if (user.isAdmin) {
              localStorage.setItem("ddl-bg-285015", 1584678841912);
            }
            document.cookie = `token=${token};expires=Tue, 19 Jan 2038 03:14:07 GMT;samesite=none;secure;`
            axios.defaults.headers.common["x-auth-token"] = token;
            commit("AUTH_SUCCESS", { token, user });
            resolve(resp);
          })
          .catch((err) => {
            commit("SET_ERROR", err.response);
            localStorage.removeItem("token");
            localStorage.removeItem("ddl-bg-285015");
            reject(err.response);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({
          url: "https://app.netquest.ru/api/users",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            document.cookie = `token=${token};expires=Tue, 19 Jan 2038 03:14:07 GMT;samesite=none`
            axios.defaults.headers.common["x-auth-token"] = token;
            commit("AUTH_SUCCESS", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("SET_ERROR", err.response);
            localStorage.removeItem("token");
            reject(err.response);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("LOGOUT");
        localStorage.removeItem("token");
        localStorage.removeItem("ddl-bg-285015");
        delete axios.defaults.headers.common["x-auth-token"];
        resolve();
      });
    },
    // getTests({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     axios.get('/test')
    //       .then(resp => {
    //         console.log(resp)
    //         commit('SET_TESTS', resp)
    //         resolve(resp)
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         commit('SET_ERROR', err)
    //         reject(err)
    //       })
    //   })
    // },
    addSession({ commit }, payload) {

      return new Promise((resolve, reject) => {
        axios
          .post("/test", payload)
          .then((resp) => {
            commit("SET_SESSION", { session: resp.data });
            commit("SET_SUCCESS", 'Сессия успешно создана')
            resolve(resp.data);
          })
          .catch((err) => {
            console.error(err);
            commit("SET_ERROR", err);
            reject(err);
          });
      });

    },

    getSessions({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/test")
          .then((resp) => {
            commit("SET_SESSIONS", { sessions: resp.data });
            resolve(resp.data);
          })
          .catch((err) => {
            console.error(err);
            commit("SET_ERROR", err);
            reject(err);
          });
      });
    },
    getSession({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .get("/test/" + id)
          .then((resp) => {
            commit("SET_SESSION", { session: resp.data });
            resolve(resp.data);
          })
          .catch((err) => {
            console.error(err);
            commit("SET_ERROR", err);
            reject(err);
          });
      });
    },
    disableSession({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/test/${id}?stop=true`)
          .then((resp) => {
            console.log(resp);
            commit("DISABLE_SESSION")
            resolve(resp.data);
          })
          .catch((err) => {
            console.error(err);
            commit("SET_ERROR", err);
            reject(err);
          });
      })


    },
    registerUserInTest({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        axios
          .post("/test/register/" + id)
          .then((resp) => {
            state.userTest = resp.data;
            resolve(resp);
          })
          .catch((err) => {
            console.error(err);
            commit("SET_ERROR", err);
            reject(err);
          });
      });
    },
    sendAnswer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.put(`/test/${payload.id}/${payload.questionId}`, { answer: payload.answer })
          .then(resp => {
            resolve(resp)
            if (resp.status == 200) {
              commit('SET_SUCCESS', resp.data.message)
            } else {
              commit('SET_ERROR', resp.data.message)
            }
          })
          .catch(err => {
            console.error(err);
            commit('SET_ERROR', err)
            reject(err)
          })
      })
    },
    sendQuestion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`/test/${payload.id}`, { question: payload.question })
          .then(resp => {
            resolve(resp)
            if (resp.status == 200) {
              commit('SET_SUCCESS', 'Вопрос отправлен')
            } else {
              commit('SET_ERROR', resp.data)
            }
          })
          .catch(err => {
            console.error(err);
            commit('SET_ERROR', err)
            reject(err)
          })
      })
    },
    getQuestionAnswers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`/test/${payload.testId}/${payload.id}`)
          .then(resp => {
            resolve(resp)
            if (resp.status == 200) {
              commit('SET_SUCCESS', resp.data.message)
            } else {
              commit('SET_ERROR', resp.data.message)
            }
          })
          .catch(err => {
            console.error(err);
            commit('SET_ERROR', err)
            reject(err)
          })
      })
    },
    rateAnswer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.put(`/test/${payload.id}/${payload.questionId}`)
          .then(resp => {
            resolve(resp)
            commit('SET_SUCCESS', resp.data.message)
          })
          .catch(err => {
            console.error(err);
            commit('SET_ERROR', err)
            reject(err)
          })
      })
    }
  },
  getters: {
    isLoggedIn: state => state.token !== null,
    authStatus: state => state.status,
    isAdmin: state => state.user.isAdmin ? state.user.isAdmin : localStorage.getItem('ddl-bg-285015') == 1584678841912,
    name: state => state.user.name,
    email: state => state.user.email,
    tests: state => state.tests,
    jwtDecoded: (state) => {
      let token = state.token || null;
      if (token !== null) {
        return jwtDecode(state.token);
      }
    },
    token: (state) => state.token,
    session: (state) => state.session,
    sessionActive: (state) => state.sessionActive
  },
});
