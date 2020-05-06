import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index'

Vue.use(Router)
import permissionRouter from './modules/permission'  //导入权限管理

export default new Router({
  linkActiveClass:'active',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: ()=>import('@/views/login/index'),
    },
    {
      path: '/',     //首页
      component: Layout,
      redirect:'/home',
      children:[
        {
          path: 'home',
          name: 'home',
          component: ()=>import('@/views/home/index'),
          meta:{
            title:'首页'
          }
        }
      ]
    },
    {
      path: '/loan-input',     //贷款申请
      component: Layout,
      redirect:'/loan-input/index',
      children:[
        {
          path: 'index',
          name: 'loan-input',
          component: ()=>import('@/views/loan-input/index'),
          meta:{
            title:'贷款申请'
          }
        }
      ]
    },
    {
      path: '/input-manager',     //申请管理
      component: Layout,
      redirect:'/input-manager/index',
      children:[
        {
          path: 'index',
          name: 'input-manager',
          component: ()=>import('@/views/input-manager/index'),
          meta:{
            title:'申请管理'
          }
        }
      ]
    },
    {
      path: '/loan-approve',     //贷款审批
      component: Layout,
      redirect:'/loan-approve/first',
      meta:{
        title:'贷款审批'
      },
      children:[
        {
          path: 'first',  //初审
          name: 'first',
          component: ()=>import('@/views/loan-approve/first'),
          meta:{
            title:'初审'
          }
        },
        {
          path: 'end',  //终审
          name: 'end',
          component: ()=>import('@/views/loan-approve/end'),
          meta:{
            title:'终审'
          }
        }
      ]
    },
    {
      path: '/contract',     //标的管理
      component: Layout,
      redirect:'/contract/index',
      children:[
        {
          path: 'index',  
          component: ()=>import('@/views/contract/index'),
          meta:{
            title:'标的管理'
          }
        }
      ]
    },
    permissionRouter
    // {
    //   path: '/permission',     //权限管理
    //   component: Layout,
    //   redirect:'/permission/create',
    //   children:[
    //     {
    //       path: 'create',  //创建管理员
    //       name: 'create',
    //       component: ()=>import('@/views/permission/create'),
    //       meta:{
    //         title:'创建管理员'
    //       }
    //     },
    //     {
    //       path: 'list',  //列表展示
    //       name: 'list',
    //       component: ()=>import('@/views/permission/list'),
    //       meta:{
    //         title:'列表展示'
    //       }
    //     }
    //   ]
    // },
  ]
})
