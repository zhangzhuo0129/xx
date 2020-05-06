import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Mmall from '@/components/mmall'
import Home from '@/components/home'
import Page from '@/components/page'
import Commodity from '@/components/commodity'
import Particulars from '@/components/Particulars'
import Operation from '@/components/operation'
import Addition from '@/components/addition'
import Category from '@/components/category'
import Append from '@/components/append'
import User from '@/components/user'
import Order from '@/components/order'
import Examine from '@/components/examine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/mmall'
    },
    {
      path: '/mmall',
      name: 'Mmall',
      component: Mmall
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
          path: 'page',
          name: 'Page',
          component: Page
        },
        {
          path: 'commodity',
          name: 'Commodity',
          component: Commodity
        },
        {
          path: 'particulars/:id',
          name: 'Particulars',
          component: Particulars
        },
        {
          path: 'operation/:id',
          name: 'Operation',
          component: Operation
        },
        {
          path: 'addition',
          name: 'Addition',
          component: Addition
        },
        {
          path: 'category',
          name: 'Category',
          component: Category
        },
        {
          path: 'append',
          name: 'Append',
          component: Append
        },
        {
          path: 'user',
          name: 'User',
          component: User
        },
        {
          path: 'order',
          name: 'Order',
          component: Order
        },
        {
          path: 'examine/:orderNo',
          name: 'Examine',
          component: Examine
        }
      ]
    }
  ]
})
