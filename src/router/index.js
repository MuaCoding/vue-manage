import Vue from 'vue'
import Router from 'vue-router'

import Index from 'components/index/index'
import System from 'components/system/system'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
    },
    {
      path: '/system',
      name: 'system',
      component: System,
    }
  ]
})
