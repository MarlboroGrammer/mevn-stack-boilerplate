// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import sync from 'vuex-router-sync'
import store from '@/store/store'
import DateFilter from '@/filters/datefilter'
import VModal from 'vue-js-modal'
import VuePaginate from 'vue-paginate'
import VuejsDialog from "vuejs-dialog"
import Notifications from 'vue-notification'

Vue.config.productionTip = false

Vue.use(VModal, { dialog: true })
Vue.use(VuePaginate)
Vue.use(Notifications)
Vue.use(VuejsDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  DateFilter,
  components: { App },
  template: '<App/>'
})
