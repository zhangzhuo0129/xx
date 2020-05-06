<template>
  <div id="restaurant">
      <div id="header">
          <img :src="'http://elm.cangdu.org/img/'+data.image_path" alt="">
          <div>
              <h4>{{data.name}}</h4>
              <!-- <p>商家配送/分钟送达/{{data.piecewise_agent_fee.tips}}</p> -->
              <p>公告：{{data.promotion_info}}</p>
          </div>
          <i class="el-icon-arrow-left" id="left" @click="$router.go(-1)"></i>
      </div>
      <div>
          <router-link :to="'/restaurant/commodity?id='+id" tag="p"><span>商品</span> </router-link>
          <router-link :to="'/restaurant/evaluate?id='+id" tag="p"><span>评价</span></router-link>
      </div>
      
      <router-view></router-view>
  </div>
</template>

<script>
import { shopdetails} from '@/router/packaging'
export default {
    name: 'restaurant',
    data(){
        return{
            data:[],
            id:""
        }
    },
    async created() {
        var id = this.$route.query.id
        this.id = id
        const data = await shopdetails({},id)
        // console.log(data)
        this.data = data.data
    },
}
</script>

<style lang="scss" scoped>
    #restaurant{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        >#header{
            width: 100%;
            height: 1.8rem;
            box-sizing: border-box;
            padding: 0.2rem 0 0.2rem 0.2rem;
            background: #555;
            display: flex;
            justify-content: space-between;
            color: white;
            >#left{
                position: absolute;
                font-size: 0.5rem;
            }
            >img{
                width: 1.35rem;
                height: 1.35rem;
            }
            >div{
                width: 78%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                >p{
                    font-size: 0.1rem;
                }
            }
        }
        >div:nth-child(2){
            width: 100%;
            height: 1rem;
            background: white;
            display: flex;
            border-bottom: 0.02rem solid #f1f1f1;
            >p{
                width: 50%;
                height: 100%;
                text-align: center;
                line-height: 1rem;
            }
            >.router-link-active{
                >span{
                    color: #3190e8;
                    padding-bottom: 0.05rem;
                    border-bottom: 0.04rem solid #3190e8;
                }
            }
        }
    }
</style>