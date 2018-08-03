import Vue from 'vue'
import Router from 'vue-router'

import Index from 'components/pages/index/index'
import System from 'components/pages/system/system'
import Stance from 'components/pages/stance/stance'
import Substance from 'components/pages/substance/substance'
import Login from 'components/pages/login/login'

Vue.use(Router)


export default new Router({
  routes: [{
      path: '/',
      redirect: '/app/stance',
    },
    {
      path: '/app',
      name: 'app',
      component: Index,
      children: [{
        path: '/app/system',
        name: 'system',
        component: System
      }, {
        path: '/app/stance',
        name: 'stance',
        component: Stance,
        children: [{
          path: '/app/stance/substance',
          name: 'substance',
          component: Substance
        }]
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
