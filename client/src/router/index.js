import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Delegate from '@/components/Delegate'
import Visits from '@/components/Visit'
import VisitsAdmin from '@/components/VisitsAdmin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/delegate',
      name: 'Delegate',
      component: Delegate
    },
    {
      path: '/Visits',
      name: 'Visits',
      component: Visits
    },
    {
      path: '/VisitsAdmin',
      name: 'VisitsAdmin',
      component: VisitsAdmin
    }
  ]
})
