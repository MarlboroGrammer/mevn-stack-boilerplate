// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import sync from 'vuex-router-sync'
import store from '@/store/store'
import VuejsDialog from "vuejs-dialog"
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

Vue.config.productionTip = false
Vue.use(VuejsDialog)
Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyD1_HG5ANhWoLsloCnp2kkbCUp4mWqvzxs', 
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
