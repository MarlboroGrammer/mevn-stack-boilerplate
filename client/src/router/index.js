import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Delegate from '@/components/Delegate'
import Products from '@/components/Products'
import ProductsAdmin from '@/components/ProductsAdmin'

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
      path: '/Products',
      name: 'Products',
      component: Products
    },
    {
      path: '/ProductsAdmin',
      name: 'ProductsAdmin',
      component: ProductsAdmin
    }
  ]
})
