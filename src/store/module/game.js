import Vue from 'vue';

import {send} from '../../websocket';

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
  graph: {},

  lastOrder: null,
  requestedForcedMode: null,
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
    if (!state.stock) {
      state.stock = stocks[0];
    }
  },
  setStock(state, stock) {
    state.stock = stock;
  },
  setAccount(state, account) {
    state.account = account;
  },
  setGraph(state, graph) {
    state.graph = {};
    Object.keys(graph).forEach((key) => {
      Vue.set(state.graph, key, graph[key]);
    });
  },

  setLastOrder(state, order) {
    state.lastOrder = order;
  },
  setRequestedForcedMode(state, value) {
    state.requestedForcedMode = value;
  }
};

const actions = {
  setStock({commit}, stock) {
    commit('setStock', stock);
  },
  setAccount({commit}, account) {
    commit('setAccount', account);
  },
  setOrders({commit}, {personal, generalWTS, generalWTB}) {
    commit('setStockList', Object.keys(generalWTS));
    commit('setOwnOrders', personal);
    commit('setWTSOrders', generalWTS);
    commit('setWTBOrders', generalWTB);
  },
  editOrder({state}, {orderId, ...form}) {
    const currentOrder = state.ownOrders.find((order) => order.orderId === orderId);
    send({
      type: 'order',
      order: {
        ...currentOrder,
        ...form,
      },
    });
  },
  removeOrder(store, {orderId}) {
    send({
      type: 'cancel',
      cancel: {
        orderId,
      },
    });
  },
  buyOrder({commit}, order) {
    const payload = {
      type: 'order',
      order,
    };
    commit('setLastOrder', payload);
    send(payload);
  },
  sellOrder({commit}, order) {
    const payload = {
      type: 'order',
      order,
    };
    commit('setLastOrder', payload);
    send(payload);
  },
  handleResponseStatus({commit, dispatch, state}, {status, message}) {
    let payload;
    if (status < 0) {
      payload = {text: message, type: 'ERROR'};
    } else if (status === 0) {
      payload = {text: message, type: 'INFO'};
    } else if (state.lastOrder) {
      commit('setRequestedForcedMode', message);
      return;
    }
    commit('setLastOrder', null);
    dispatch('app/addNotification', payload, {root: true});
  },
  setGraph({commit}, payload) {
    commit('setGraph', payload);
  },
  onConfirmForced({state, commit}) {
    send({
      ...state.lastOrder,
      order: {
        ...state.lastOrder.order,
        forced: true,
      },
    });
    commit('setRequestedForcedMode', null);
    commit('setLastOrder', null);
  },
  onRejectForced({commit}) {
    commit('setRequestedForcedMode', null);
    commit('setLastOrder', null);
  },
};

const getters = {
  actualWTBOrders: ({WTBOrders, stock}) => WTBOrders[stock] || [],
  actualWTSOrders: ({WTSOrders, stock}) => WTSOrders[stock] || [],
  actualGraph: ({graph, stock}) => {
    console.log('actualGraph: ', graph, stock, graph[stock]);
    return graph[stock] || [];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};