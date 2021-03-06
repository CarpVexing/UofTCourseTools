/* eslint-disable */

import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import { createProvider } from './vue-apollo'
import ToggleButton from 'vue-js-toggle-button'
import VueMobileDetection from "vue-mobile-detection";

Vue.config.productionTip = false

Vue.use(ToggleButton)
Vue.use(VueMobileDetection);

new Vue({
  router,
  store,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
