import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueApexCharts from 'vue-apexcharts'
import Notification from './notification';
import store from './store';

import './axios';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(Notification);

new Vue({
  vuetify,
  render: h => h(App),
  store,
  notification: Notification,
}).$mount('#app')
