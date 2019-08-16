import { userService } from '../helper/userService';

export const users = {
  namespaced: true,
  state: {
    all: {},
    quests: {}
  },
  actions: {
    getUserQuestsByID({ commit }) {
      userService
        .getUserQuestsByID()
        .then(quests => commit('getQuests', quests.data), error => '');
    },
    gameRegister({ commit }, questID) {
      userService
        .gameRegister(questID)
        .then(quests => commit('getQuests', quests.data), error => '');
    }
  },
  getters: {
    quests: state => {
      return state.quests;
    }
  },
  mutations: {
    getQuests(state, quests) {
      state.quests = quests;
    }
  }
};
