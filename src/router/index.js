import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/components/404'

import Dashboard from '@/components/Dashboard'
// import Orders from '@/components/Orders'
// import Order from '@/components/Order'
// import About from '@/components/About'
// import Customers from '@/components/Customers'
// import Customer from '@/components/Customer'
// import Products from '@/components/Products'
// import Product from '@/components/Product'

// import Login from '@/components/Login'
import ChangePassword from '@/components/ChangePassword'

Vue.use(Router)

import auth from '@/utils/auth'

// function requireAuth (to, from, next) {
//   if (!auth.loggedIn()) {
//     next({
//       path: '/login',
//       query: { redirect: to.fullPath }
//     })
//   } else {
//     next()
//   }
// }

export default new Router({
  base: __dirname,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/404', component: ErrorPage, name: 'ErrorPage' },
    { path: '/dashboard', component: Dashboard, name: 'Dashboard' },
    { path: '/changePassword', component: ChangePassword, name: 'ChangePassword' },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/login')
      }
    },
    { path: '/', redirect: '/dashboard' },
    { path: '*', redirect: '/404' }
  ],
  meta: {
    progress: {
      func: [
        {call: 'color', modifier: 'temp', argument: '#ffb000'},
        {call: 'fail', modifier: 'temp', argument: '#6e0000'},
        {call: 'location', modifier: 'temp', argument: 'top'},
        {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
      ]
    }
  }
})
