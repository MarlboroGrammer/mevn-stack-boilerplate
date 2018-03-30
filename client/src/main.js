// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import sync from 'vuex-router-sync'
import store from '@/store/store'
import DateFilter from '@/filters/datefilter'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  DateFilter,
  components: { App },
  template: '<App/>'
})
