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
    event: {
      image: '',
      _id: '',
      title: 'Загрузка',
      tags: {
        typeTeam: '',
        location: '',
        typeGenre: '',
        typeTime: ''
      },
      dateStartInUTC: ''
    },
    riddle: [
      {
        title: 'Загрузка...'
      }
    ],
    loading: false,
    success: true
  },
  actions: {
    getEvents(context) {
      context.commit('setLoading');
      try {
        questService.getEvents().then(data => {
          context.commit('setEvents', data.data);
        });
      } catch (error) {
        this.state.isLoading = false;
      }
    },
    getEventByID(context, id) {
      context.commit('setLoading');
      try {
        questService.getEventByID(id).then(data => {
          context.commit('setEvent', data.data);
        });
      } catch (error) {
        this.state.isLoading = false;
      }
    },
    getEventByIDAndRiddles(context, id) {
      context.commit('setLoading');
      try {
        questService.getEventByIDAndRiddles(id).then(data => {
          context.commit('setEvent', data.data);
        });
      } catch (error) {
        this.state.isLoading = false;
      }
    },
    getRiddle(context, params) {
      context.commit('setLoading');
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
      context.commit('setLoading');
      let questID = params.questID;
      let riddleID = params.riddleID;
      let answer = params.answer;
      let nextNum = params.nextNum;

      try {
        questService.postAnswer(questID, riddleID, answer).then(data => {
          data.json().then(res => {
            context.commit('setIsSucceed', { res, nextNum });
          });
        });
      } catch (error) {
        this.state.isLoading = false;
      }
    }
  },
  mutations: {
    setLoading(state) {
      state.loading = true;
    },
    setEvents(state, res) {
      state.loading = false;
      state.events = res;
    },
    setEvent(state, res) {
      state.event = res;
      state.loading = false;
    },
    setRiddle(state, res) {
      state.riddle = res;
      state.loading = false;
    },
    setIsSucceed(state, params) {
      if (params.res.success) {
        this.state.success = true;
        router.push(
          '/quest/' +
            router.currentRoute.params.id +
            '/riddle/' +
            params.nextNum
        );
      } else {
        this.state.success = false;
        setTimeout((this.state.success = true), 2000);
      }
      state.loading = false;
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
