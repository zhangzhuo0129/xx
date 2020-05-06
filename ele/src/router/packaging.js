import { Request } from './request'

// 当前定位城市 location

export const location = data => Request.getData({
    url:`/api/v1/cities/`,
    method:"get",
    data,
})

// 热门城市 //hot

export const hot = data => Request.getData({
    url:`/api/v1/cities/`,
    method:"get",
    data,
})

// 所有城市 group

export const group = data => Request.getData({
    url:`/api/v1/cities/`,
    method:"get",
    data,
})

// 城市详情 details

export const details = (data,id) => Request.getData({
    url:`/api/v1/cities/`+id,
    method:"get",
    data,
})

// 搜索地址 city

export const city = data => Request.getData({
    url:`/api/v1/pois`,
    method:"get",
    data,
})

//根据经纬度详细定位 latitude

export const latitude = (data,geohash) => Request.getData({
    url:`/api/v2/pois/`+geohash,
    method:"get",
    data,
})

// 食品分类列表 classify

export const classify = (data) => Request.getData({
    url:`/api/v2/index_entry`,
    method:"get",
    data,
})

//商铺列表 shop

export const shop = (data) => Request.getData({
    url:`/api/shopping/restaurants`,
    method:"get",
    data,
})

// 搜索餐馆 seek

export const seek = (data) => Request.getData({
    url:`/api/v4/restaurants`,
    method:"get",
    data,
})

// 餐馆详情列表 particulars

export const particulars = (data) => Request.getData({
    url:`/api/shopping/v2/menu`,
    method:"get",
    data,
})

// 餐馆详情 shopdetails

export const shopdetails = (data,shopid) => Request.getData({
    url:`/api/shopping/restaurant/`+shopid,
    method:"get",
    data,
})
// 分类列表 variety

export const variety = data => Request.getData({
    url:`/api/shopping/v2/restaurant/category`,
    method:"get",
    data,
})

// 分类详情 classifyDetails

export const classifyDetails = data => Request.getData({
    url:`/api/shopping/restaurants`,
    method:"get",
    data,
})

// 蜂鸟转送 cooperate
export const cooperate = data => Request.getData({
    url:`/api/shopping/v1/restaurants/delivery_modes`,
    method:"get",
    data,
})
// https://elm.cangdu.org/shopping/v1/restaurants/delivery_modes?latitude=39.902026&longitude=116.255593
