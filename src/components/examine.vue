<template>
  <div id="examine">
      <p>订单详情</p>
      <div>
        <div>订单号：<p>{{data.orderNo}}</p> </div>
        <div>创建时间：<p>{{data.createTime}}</p> </div>
        <div>收件人：<p>{{shippingVo.receiverName}}，{{shippingVo.receiverProvince}}{{shippingVo.receiverCity}}，{{shippingVo.receiverAddress}}，{{shippingVo.receiverMobile}}</p> </div>
        <div>订单状态<p>{{data.statusDesc}}</p> </div>
        <div>支付方式<p>{{data.paymentTypeDesc}}</p> </div>
        <div>订单金额<p>￥{{data.payment}}</p> </div>
      </div>
      <table border="1px" cellspacing="0" style="width:956px">
          <thead>
              <th>商品图片</th>
              <th>商品信息</th>
              <th>单价</th>
              <th>数量</th>
              <th>合计</th>
          </thead>
          <tbody>
              <tr>
                  <td><img :src="'http://img.happymmall.com/'+orderItemVoList.productImage" alt="" width="80px" height="80px"></td>
                  <td>{{orderItemVoList.productName}}</td>
                  <td>￥{{orderItemVoList.currentUnitPrice}}</td>
                  <td>{{orderItemVoList.quantity}}</td>
                  <td>{{orderItemVoList.totalPrice}}</td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import { details } from '../router/packaging.js'
export default {
    name:"examine",
    data(){
        return{
            data:{},
            input:"",
            shippingVo:"",
            orderItemVoList:[]

        }
    },
    async created() {
        var orderNo = this.$route.params.orderNo
        const res = await details({orderNo:orderNo})
        console.log(res.data.data)
        this.data=res.data.data
        this.shippingVo=res.data.data.shippingVo
        this.orderItemVoList=res.data.data.orderItemVoList[0]
        console.log(this.orderItemVoList.productImage)
        console.log(res.data.data.orderItemVoList[0].productImage)
    },
}
</script>

<style lang="scss">
    #examine{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
        >p{
            font-size: 35px;
        }
        >div{
            box-sizing: border-box;
            padding: 50px;
            >div{
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                >p{
                    font-size: 14px;
                    min-width: 385px;
                    min-height: 34px;
                    box-sizing: border-box;
                    padding-top: 7px;
                    padding-bottom: 7px;
                    margin-bottom: 0;
                    background: #fefefe;
                    padding-left: 10px;
                    margin-left: 20px;
                }
            }
        }
    }
</style>