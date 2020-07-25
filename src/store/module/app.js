import axios from 'axios';

const state = {
  notifications: [],
  lastNotificationId: 0,
  isLoggedIn: true,
  isLoading: false,
};

const mutations = {
  addNotification(state, data) {
    state.notifications.push({
      id: state.lastNotificationId++,
      ...data,
    });
  },
  removeNotification(state, id) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== id,
    );
  },
  removeAllNotifications(state) {
    state.notifications = [];
    state.lastNotificationId = 0;
  },
  setLoggedIn(state, logged) {
    state.isLoggedIn = logged;
  },
  setLoading(state, loading) {
    state.isLoading = loading;
  }
};

const actions = {
  addNotification({ commit }, data) {
    commit('addNotification', data);
  },
  removeNotification({ commit }, id) {
    commit('removeNotification', id);
  },
  removeAllNotifications({ commit }) {
    commit('removeAllNotifications');
  },

  login(_store, data) {
    return axios.post('/login', data);
  },
  setLoggedIn({ commit }, loggedIn) {
    commit('setLoggedIn', loggedIn);
  },
  setLoading({ commit }, loading) {
    commit('setLoading', loading);
  },
};

const getters = {
  isLoggedIn: ({ isLoggedIn }) => isLoggedIn,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};