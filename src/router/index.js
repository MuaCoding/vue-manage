import Vue from 'vue'
import Router from 'vue-router'

import Index from 'pages/index/index'
import System from 'pages/system/system'
import Stance from 'pages/stance/stance'
import Substance from 'pages/substance/substance'

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
    }

  ]
})
