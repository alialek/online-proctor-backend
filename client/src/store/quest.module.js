import { questService } from '../helper/questService';
import router from '../router';

export const quest = {
  namespaced: true,
  state: {
    events: [
      {
        image: '',
        _id: '',
        isActual: true
      }
    ],
    event: [
      {
        image: '',
        _id: '',
        title: 'Загрузка',
        tags: {
          typeTeam: ''
        }
      }
    ],
    riddle: [
      {
        title: 'Загрузка...'
      }
    ],
    isLoading: false,
    success: true
  },
  actions: {
    getEvents(context) {
      this.state.isLoading = true;
      try {
        questService.getEvents().then(data => {
          context.commit('setEvents', data.data);
        });
      } catch (error) {
        this.state.isLoading = false;
      }
    },
    getEventByID(context, id) {
      this.state.isLoading = true;
      try {
        questService.getEventByID(id).then(data => {
          context.commit('setEvent', data.data);
        });
      } catch (error) {
        this.state.isLoading = false;
      }
    },
    getEventByIDAndRiddles(context, id) {
      this.state.isLoading = true;
      try {
        questService.getEventByIDAndRiddles(id).then(data => {
          context.commit('setEvent', data.data);
        });
      } catch (error) {
        this.state.isLoading = false;
      }
    },
    getRiddle(context, params) {
      this.state.isLoading = true;
      let questID = params.id;
      let riddleID = params.riddle_id;
      try {
        questService.getRiddle(questID, riddleID).then(data => {
          context.commit('setRiddle', data.data);
        });
      } catch (error) {
        this.state.isLoading = false;
      }
    },
    postAnswer(context, params) {
      this.state.isLoading = true;
      let questID = params.questID;
      let riddleID = params.riddleID;
      let answer = params.answer;
      try {
        questService.postAnswer(questID, riddleID, answer).then(data => {
          data.json().then(res => {
            context.commit('setIsSucceed', res);
          });
        });
      } catch (error) {
        this.state.isLoading = false;
      }
    }
  },
  mutations: {
    setEvents(state, res) {
      this.state.isLoading = false;
      state.events = res;
    },
    setEvent(state, res) {
      state.event = res;
      this.state.isLoading = false;
    },
    setRiddle(state, res) {
      state.riddle = res;
      this.state.isLoading = false;
    },
    setIsSucceed(state, res) {
      if (res.success) {
        this.state.success = true;
        router.push(
          '/quest/' +
            router.currentRoute.params.id +
            '/riddle/' +
            (parseInt(router.currentRoute.params.riddle_id) + 1)
        );
      } else {
        this.state.success = false;
      }
      this.state.isLoading = false;
    }
  },
  getters: {
    event: state => {
      return state.event;
    },
    events: state => {
      return state.events.filter(quest => !quest.isActual);
    },
    actualEvent: state => {
      return state.events.filter(quest => quest.isActual);
    },
    riddle: state => {
      return state.riddle[0];
    }
  }
};
