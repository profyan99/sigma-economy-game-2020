import Vue from 'vue';

const state = {
  ownOrders: [],
  WTBOrders: {},
  WTSOrders: {},
  stock: '',
  stockList: [],
  account: {
    items: {},
    blockedItems: {},
    deltaItems: {},
    money: 0,
    blockedMoney: 0,
    deltaMoney: 0,
  },
};

const mutations = {
  setOwnOrders(state, orders) {
    state.ownOrders = orders;
  },
  setWTSOrders(state, orders) {
    Object.keys(orders).forEach((key) => {
      Vue.set(state.WTSOrders, key, orders[key]);
    });
  },
  setWTBOrders(state, orders) {
    Object.keys(orders).forEach((key) => {
      Vue.set(state.WTBOrders, key, orders[key]);
    });
  },
  setStockList(state, stocks) {
    state.stockList = stocks;
  },
  setStock(state, stock) {
    state.stock = stock;
  },
  setAccount(state, account) {
    state.account = account;
  }
};

const actions = {
  setStock({commit}, stock) {
    commit('setStock', stock);
  },
  setAccount({commit}, account) {
    commit('setAccount', account);
  },
  setOrders({commit}, { personal, generalWTS, generalWTB }) {
    commit('setStockList', Object.keys(generalWTS));
    commit('setOwnOrders', personal);
    commit('setWTSOrders', generalWTS);
    commit('setWTBOrders', generalWTB);
  },
};

const getters = {
  actualWTBOrders: ({ WTBOrders, stock }) => WTBOrders[stock] || [],
  actualWTSOrders: ({ WTSOrders, stock }) => WTSOrders[stock] || [],
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};