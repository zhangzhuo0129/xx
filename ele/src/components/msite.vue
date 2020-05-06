<template>
  <div id="msite">
      <router-view></router-view>
      <div id="foot">
          <router-link :to="'/msite/takeout?geohash='+this.$store.state.city.geohash" tag="p"><i class="el-icon-eleme"></i>外卖</router-link>
          <router-link :to="'/msite/search/'+this.$store.state.city.geohash" tag="p"><i class="el-icon-discover"></i>搜索</router-link>
          <router-link to="/msite/orderform" tag="p"><i class="el-icon-tickets"></i>订单</router-link>
          <p><i class="el-icon-user"></i>我的</p>
      </div>

  </div>
</template>

<script>
export default {
    name: 'msite',
    data(){
        return{
            list:""
        }
    },
    created(){
        var geohash = this.$route.query.geohash
        console.log(geohash)
        this.list = geohash
    }
}
</script>

<style lang="scss">
    #msite{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        >#foot{
            width: 100%;
            height: 0.95rem;
            background: white;
            display: flex;
            >p{
                width: 25%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-size: 0.2rem;
                >i{
                    font-size: 0.5rem;
                }
            }
            >.router-link-active{
                >i{
                    color: #008eff;
                }
            }
        }
    }
</style>