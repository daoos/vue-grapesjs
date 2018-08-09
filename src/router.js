import VueRouter from 'vue-router'

import HelloWorld from './components/HelloWorld'
import Grapes from './components/Grapes'
import Vue from 'vue'


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      component: HelloWorld
    },
    {
      path: '/grapes',
      component: Grapes
    }
  ]
})

export default router