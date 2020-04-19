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
        color: "error"
      }
    }
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
      state.process.snack.text = data.message;
    },
    SET_SUCCESS(state, data) {
      state.process.snack.enabled = true;
      state.process.snack.color = "success";
      state.process.snack.text = data.message;
    },
    SET_INFO(state, data) {
      state.process.snack.enabled = true;
      state.process.snack.color = "info";
      state.process.snack.text = data.message;
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
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            if (user.isAdmin) {
              localStorage.setItem("ddl-bg-285015", 1584678841912);
            }
            // Можно убрать консоль логи?
            // console.log(`token=${token};expires=Tue, 19 Jan 2038 03:14:07 GMT;secure;`)
            document.cookie = `token=${token};expires=Tue, 19 Jan 2038 03:14:07 GMT;path= ;`;
            // console.log(document.cookie)
            axios.defaults.headers.common["x-auth-token"] = token;
            commit("AUTH_SUCCESS", { token, user });
            resolve(resp);
          })
          .catch(err => {
            commit("SET_ERROR", { message: "Произошла ошибка... Проверьте правильность введенных данных" });
            localStorage.removeItem("token");
            localStorage.removeItem("ddl-bg-285015");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({
          url: "https://app.netquest.ru/api/users",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            document.cookie = `token=${token};expires=Tue, 19 Jan 2038 03:14:07 GMT;samesite=none`;
            axios.defaults.headers.common["x-auth-token"] = token;
            commit("AUTH_SUCCESS", token, user);
            resolve(resp);
          })
          .catch(err => {
            commit("SET_ERROR", { message: "Произошла ошибка... Проверьте корректность введенных данных" });
            commit('LOADING_STOP')
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
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
          .then(resp => {
            commit("SET_SESSION", { session: resp.data });
            commit("SET_SUCCESS", "Сессия успешно создана");
            resolve(resp.data);
          })
          .catch(err => {
            commit("SET_ERROR", { message: "Произошла ошибка... Проверьте правильность введенных данных" });
            reject(err);
          });
      });
    },

    getSessions({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/test")
          .then(resp => {
            commit("SET_SESSIONS", { sessions: resp.data });
            resolve(resp.data);
          })
          .catch(err => {
            commit("SET_ERROR", { message: "Произошла ошибка при получении данных... Обновите страницу" });
            reject(err);
          });
      });
    },
    getSession({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .get("/test/" + id)
          .then(resp => {
            commit("SET_SESSION", { session: resp.data });
            resolve(resp.data);
          })
          .catch(err => {
            commit("SET_ERROR", { message: "Произошла ошибка при получении данных... Обновите страницу" });
            reject(err);
          });
      });
    },
    disableSession({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/test/${id}?stop=true`)
          .then(resp => {
            commit("DISABLE_SESSION");
            resolve(resp.data);
          })
          .catch(err => {
            commit("SET_ERROR", { message: "Произошла ошибка при остановке сессии... Повторите попытку" });
            reject(err);
          });
      });
    },
    registerUserInTest({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        axios
          .post("/test/register/" + id)
          .then(resp => {
            state.userTest = resp.data;
            resolve(resp);
          })
          .catch(err => {
            commit("SET_ERROR", { message: "Произошла ошибка при регистрации пользователя в сессии" });
            reject(err);
          });
      });
    },
    sendAnswer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/test/answer/${payload.id}/${payload.questionId}`, {
            answer: payload.answer
          })
          .then(resp => {
            resolve(resp);
            if (resp.status == 200) {
              commit("SET_SUCCESS", { message: "Вопрос отправлен" });
            } else {
              commit("SET_ERROR", { message: "Ошибка при отправке ответа" });
            }
          })
          .catch(err => {
            commit("SET_ERROR", { message: "Произошла ошибка отправки вопроса" });
            reject(err);
          });
      });
    },
    sendQuestion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/test/${payload.id}`, { question: payload.question })
          .then(resp => {
            resolve(resp);
            if (resp.status == 200) {
              commit("SET_SUCCESS", "Вопрос отправлен");
            } else {
              commit("SET_ERROR", 'Еще нет подключившихся пользователей, либо произошла ошибка');
            }
          })
          .catch(err => {
            commit("SET_ERROR", { message: "Еще нет подключившихся пользователей, либо произошла ошибка" });
            reject(err);
          });
      });
    },
    getQuestionAnswers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/test/${payload.testId}/${payload.id}`)
          .then(resp => {
            resolve(resp);
            if (resp.status == 200) {
              // commit("SET_SUCCESS", { message: "Ответы получены" });
            } else {
              commit("SET_ERROR", { message: "Произошла ошибка при получении ответов на вопросы... Перезагрузите страницу" });
            }
          })
          .catch(err => {
            commit("SET_ERROR", { message: "Ошибка при получении ответов" });
            reject(err);
          });
      });
    },
    rateAnswer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/test/${payload.id}/${payload.questionId}`, { mark: payload.mark, id: payload.answerId })
          .then(resp => {
            resolve(resp);
            commit("SET_SUCCESS", { message: "Ответ успешно оценен" });
          })
          .catch(err => {
            commit("SET_ERROR", { message: "Ошибка при оценивании" });
            reject(err);
          });
      });
    }
  },
  getters: {
    isLoggedIn: state => state.token !== null,
    authStatus: state => state.status,
    isAdmin: state => {
      if (state.user) {
        return state.user.isAdmin
          ? state.user.isAdmin
          : localStorage.getItem("ddl-bg-285015") == 1584678841912;
      } else {
        return false;
      }
    },
    name: state => state.user.name,
    email: state => state.user.email,
    tests: state => state.tests,
    jwtDecoded: state => {
      let token = state.token || null;
      if (token !== null) {
        return jwtDecode(state.token);
      }
    },
    token: state => state.token,
    session: state => state.session,
    sessionActive: state => state.sessionActive
  }
});
