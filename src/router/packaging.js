import {Request} from './request'

// 登录

export const login = data => Request.getData({
    url:`/api/user/login`,
    method:"post",
    data,
})

// 用户、商品、订单 数量

export const quantity = data => Request.getData({
    url:`/api/statistic/base_count.do`,
    method:"post",
    data,
})

// 商品管理数据

export const commodity = data => Request.getData({
    url:`/api/product/list.do`,
    method:"get",
    data,
}) 

// 品类管理数据

export const category = data => Request.getData({
    url:`/api/category/get_category.do`,
    method:"get",
    data,
})

// 产品上下架
export const updown = data => Request.getData({
    url:`/api/product/set_sale_status.do`,
    method:"get",
    data,
})

export const ab = data => Request.getData({
    url:`/api//product/save.do`,
    method:"get",
    data,
})

//搜索

export const search = data => Request.getData({
    url:`/api/product/search.do`,
    method:"get",
    data,
})

// 详情

export const particulars = data => Request.getData({
    url:`/api/product/detail.do`,
    method:"get",
    data,
})

// 修改商品数据 modification

export const modification = data => Request.getData({
    url:`/api/product/save.do`,
    method:"get",
    data,
})

// 富文本上传图片  上传图片 picture

export const picture = data => Request.getData({
    url:`/api/product/richtext_img_upload.do`,
    method:"get",
    data,
})

//上传图片 photograph

export const photograph = data => Request.getData({
    url:`/api/product/upload.do`,
    method:"post",
    data,
})

// 修改品类名称 amend 

export const amend = data => Request.getData({
    url:`/api/category/set_category_name.do`,
    method:"get",
    data,
})

// 获取当前分类id及递归子节点categoryId

export const recursion = data => Request.getData({
    url:`/api/category/get_deep_category.do`,
    method:"get",
    data,
})

// 添加品类 present

export const present = data => Request.getData({
    url:`/api/category/add_category.do`,
    method:"get",
    data,
})

// 用户列表 user

export const user = data => Request.getData({
    url:`/api/user/list.do`,
    method:"post",
    data,
})

// 订单列表 order

export const order = data => Request.getData({
    url:`/api/order/list.do`,
    method:"get",
    data,
})

// 订单列表 订单号查询

export const ordernumber = data => Request.getData({
    url:`/api/order/search.do`,
    method:"get",
    data
})

// 订单详情

export const details = data => Request.getData({
    url:`/api/order/detail.do`,
    method:"get",
    data
})