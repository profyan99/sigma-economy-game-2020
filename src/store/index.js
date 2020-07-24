import Vue from 'vue';
import Vuex from 'vuex';

import app from './module/app';
import game from './module/game';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    app,
    game,
  },
  plugins: [],
});

export default store;