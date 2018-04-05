import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Delegate from '@/components/Delegate'
import addClient from '@/components/addClient'
import listClient from '@/components/listClient'
import map from '@/components/map'

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
      path: '/addClient',
      name: 'addClient',
      component: addClient
    },
    {
      path: '/listeClient',
      name: 'listeClient',
      component: listClient
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/map',
      name: 'map',
      component: map
    },
    {
      path: '/delegate',
      name: 'Delegate',
      component: Delegate
    }
  ]
})
