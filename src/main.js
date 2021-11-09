import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.headers.common['X-Auth-Token'] = '5936a0c0aeb249f8b1843994c6557920';

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
