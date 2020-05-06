import request from '@/utils/request'

export function login(data){  //登录
    return request({
        url:'/user/login',
        method:'post',
        data
    })
}

export function getInfo(token) {  //获取用户基础信息
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {   //退出
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function loanCreate(data){  //贷款申请
    return request({
        url:'/loan/create',
        method:'post',
        data
    })
}

export function loanList(data){  //申请管理 -查询
    return request({
        url:'/loan/list',
        method:'get',
        params:data
    })
}

export function loanUpdate(data){  //申请管理 -编辑
    return request({
        url:'/loan/update',
        method:'put',
        data
    })
}

export function loanDelete(data){  //申请管理 -删除
    return request({
        url:'/loan/delete/'+data.id,
        method:'delete'
    })
}

export function loanSubmitToApprove(data){  //申请管理 -提交审核
    return request({
        url:'/loan/submitToApprove',
        method:'post',
        data
    })
}

//贷款审批-初审
export function approveFirstList(data) {  //贷款审批-初审-列表数据
    return request({
      url: 'approve/first/list',
      method: 'get',
      params: data
    })
  }
 
  export function loanQuery(data) {  //贷款审批-初审-列表详情
    return request({
      url: 'loan/query',
      method: 'get',
      params: data
    })
  }
  export function approveFirstPass(data) {  //贷款审批-初审-通过
    return request({
      url: 'approve/first/pass',
      method: 'post',
      data
    })
  }
  export function approveFirstReject(data) {  //贷款审批-初审-拒绝
    return request({
      url: 'approve/first/reject',
      method: 'post',
      data
    })
  }

  //标的管理
export function contractList(data) {  //标的管理-列表数据
    return request({
      url: 'contract/list',
      method: 'get',
      params: data
    })
  }
  export function contractCreateFile(data) {  //标的管理-生成合同
    return request({
      url: 'contract/createFile',
      method: 'post',
      data
    })
  }
  export function contractDownload(data) {  //标的管理-下载合同
    return request({
      url: 'contract/download',
      method: 'get',
      params: data
    })
  }

  //创建管理员
export function permissionCreateUser(data) {  //权限管理-创建管理员
    return request({
      url: 'permission/createUser',
      method: 'post',
      data
    })
  }
  
  export function permissionUserlist(data) {  //权限管理-列表展示
    return request({
      url: 'user/list',
      method: 'get',
      params: data
    })
  }