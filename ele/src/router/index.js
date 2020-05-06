import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import Detail from '@/components/detail'
import Msite from '@/components/msite'
import Takeout from '@/components/takeout'
import Search from '@/components/search'
import Orderform from '@/components/orderform'
import Restaurant from '@/components/restaurant'
import Commodity from '@/components/commodity'
import Evaluate from '@/components/evaluate'
import Classify from '@/components/classify'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/msite',
      name: 'Msite',
      component: Msite,
      children:[
        {
          path: 'takeout',
          name: 'Takeout',
          component: Takeout,
        },
        {
          path: 'search/:geohash',
          name: 'Search',
          component: Search,
        },
        {
          path: 'orderform',
          name: 'Orderform',
          component: Orderform,
        },
      ]
    },
    {
      path: '/restaurant',
      name: 'Restaurant',
      component: Restaurant,
      children:[
        {
          path: 'commodity',
          name: 'Commodity',
          component: Commodity,
        },
        {
          path: 'evaluate',
          name: 'Evaluate',
          component: Evaluate,
        },
      ]
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify,
    },
  ]
})
