import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './axios';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
