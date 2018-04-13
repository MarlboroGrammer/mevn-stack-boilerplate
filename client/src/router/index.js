import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Delegate from '@/components/Delegate'
import Admin from '@/components/Admin'
import Visits from '@/components/Visit'
import VisitsAdmin from '@/components/VisitsAdmin'
import Calendar from '@/components/Calendar'
import Products from '@/components/Products'
import ProductsAjout from '@/components/ProductsAjout'

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
      path: '/admin',
      name: 'Admin',
      component: Admin
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
    },
    {
      path: '/Calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/Products',
      name: 'Products',
      component: Products
    },
    {
      path: '/ProductsAjout',
      name: 'ProductsAjout',
      component: ProductsAjout
    }
  ]
})
