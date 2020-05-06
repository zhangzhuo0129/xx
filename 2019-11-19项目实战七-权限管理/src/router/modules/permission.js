import Layout from '@/layout/index'

const permissionRouter = {
    path: '/permission',     //权限管理
    component: Layout,
    redirect:'/permission/create',
    meta:{
        title:'权限管理'
      },
    children:[
      {
        path: 'create',  //创建管理员
        name: 'create',
        component: ()=>import('@/views/permission/create'),
        meta:{
          title:'创建管理员'
        }
      },
      {
        path: 'list',  //列表展示
        name: 'list',
        component: ()=>import('@/views/permission/list'),
        meta:{
          title:'列表展示'
        }
      }
    ]
  }
  export default permissionRouter