import Vue from 'vue'
import Router from 'vue-router'

import Index from 'components/pages/index/index'
import System from 'components/pages/system/system'
import Stance from 'components/pages/stance/stance'
import Substance from 'components/pages/stance/substance/substance'
import Welcome from 'components/pages/stance/welcome/welcome'
import Create from 'components/pages/stance/create/create'
import Login from 'components/pages/login/login'

Vue.use(Router)


export default new Router({
  routes: [{
      path: '/',
      redirect: '/app/stance/welcome',
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
          path: '/app/stance/welcome',
          name: 'welcome',
          component: Welcome
        }, {
          path: '/app/stance/substance/:pid/:cid',
          name: 'substance',
          component: Substance
        }, {
          path: '/app/stance/create/:pid',
          name: 'create',
          component: Create
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
