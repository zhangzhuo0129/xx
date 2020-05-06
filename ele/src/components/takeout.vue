<template>
  <div id="takeout">
      <Heads>
          <i slot="left" class="el-icon-search" style="font-size:0.4rem"></i>
          <p slot="cont" style="font-size:0.4rem">{{data.name}}</p>
          <p slot="right">登录|注册</p>
      </Heads>
      <div id="cont">
          <!-- 九宫格轮播 -->
          <div>
              <swiper :options="swiperOption" class="lunbo">
            　　<router-link v-for="(item,key) in classify" :key="key" :to="'/classify?title='+item.title" tag="div" class="swiper-slide">
                    <img :src="'https://fuss10.elemecdn.com/'+item.image_url" alt="">
                    <p>{{item.title}}</p>
                </router-link>
            <!-- 　　<swiper-slide>slide2</swiper-slide> -->
            　　<div class="swiper-pagination" slot="pagination"></div>
            <!-- 　　<div class="swiper-button-prev" slot="button-prev"></div>
            　　<div class="swiper-button-next" slot="button-next"></div> -->
            </swiper>
          </div>
          <!-- 附近商家 -->
          <div>
              <p><i class="el-icon-s-shop"></i>附近商家</p>
              <ul>
                  <router-link v-for="(item,key) in list" :key="key" :to="'/restaurant/commodity?id='+item.id" tag="li">
                      <img :src="'http://elm.cangdu.org/img/'+item.image_path" alt="">
                      <div>
                          <div>
                              <div>
                                  <p></p>
                                  <h4>{{item.name}}</h4>
                              </div>
                                  <p>保 准 票</p>
                              
                          </div>
                          <div>
                              <div>
                                <el-rate
                                v-model="item.rating"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                                </el-rate>
                                <p class="dan">月售{{item.recent_order_num}}单</p>
                              </div>
                              <div>
                                  <p class="feng">{{item.delivery_mode.text}}</p>
                                  <p class="da">{{item.supports[1].name}}</p>
                              </div>
                          </div>
                          <div>
                              <div>
                                  <p>
                                      <span>￥{{item.float_minimum_order_amount}}起送</span>/
                                      <span>配送费约￥{{item.float_delivery_fee}}</span>
                                  </p>
                              </div>
                              <p>
                                  <span>{{item.distance}}</span> /
                                  <span>{{item.order_lead_time}}</span>
                              </p>
                          </div>
                      </div>
                  </router-link>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
import { latitude , classify , shop} from '@/router/packaging.js'
import Heads from '@/components/heads'
export default {
    name: 'takeout',
    data(){
        return{
            data:"",
            list:[],
            classify:[],
            swiperOption: {
            　　pagination: {
            　　　　el: '.swiper-pagination',
            　　　　clickable: true // 允许点击小圆点跳转
            　　},
            // 　　autoplay: {
            // 　　　　delay: 3000,
            // 　　　　disableOnInteraction: false // 手动切换之后继续自动轮播
            // 　　},
                slidesPerView:4,
                slidesPerGroup:8,
                slidesPerColumn:2,
            　　loop: true,
            // 　　navigation: {
            // 　　　　nextEl: '.swiper-button-next',
            // 　　　　prevEl: '.swiper-button-prev'
            // 　　}
            },
        }
    },
    components:{Heads},
    
    async created() {
        var geohash = this.$route.query.geohash
        // console.log(geohash)
        const res = await latitude({},geohash)
        console.log(res)
        this.$store.commit("city",res.data)
        this.data = res.data

        const data = await classify()
        console.log(data.data)
        this.classify = data.data

        //商铺列表
        const list = await shop({latitude:this.data.latitude,longitude:this.data.longitude})
        console.log(list.data)
        this.list = list.data
    },
}
</script>

<style lang="scss">
    #takeout{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        >#cont{
            flex: 1;
            overflow: auto;
            >div:nth-child(1){
                width: 100%;
                height: 4rem;
                background: white;
                margin-bottom: 0.2rem;
                >.lunbo{
                    width: 100%;
                    height: 100%;
                    >.swiper-wrapper{
                        width: 100%;
                        height: 90%;
                        >.swiper-slide{
                            width: 25%;
                            height: 50%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            >img{
                                width: 0.8rem;
                                height: 0.8rem;
                                margin-bottom: 0.2rem;
                            }
                            >p{
                                color: #666;
                            }
                        }
                    }
                    
                }
            }
            >div:nth-child(2){
                width: 100%;
                >p{
                    width: 100%;
                    height: 0.72rem;
                    background: white;
                    display: flex;
                    box-sizing: border-box;
                    padding: 0 0.2rem;
                    align-items: center;
                    color: #999;
                    >i{
                        margin-right: 0.1rem;
                    }
                }
                >ul{
                    width: 100%;
                    background: white;
                    >li{
                        width: 100%;
                        height: 2.1rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        box-sizing: border-box;
                        padding: 0.3rem 0.2rem;
                        border-bottom: 0.01rem solid #f1f1f1;
                        >img{
                            width: 1.26rem;
                            height: 1.26rem;
                        }
                        >div{
                            width: 5.7rem;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            >div{
                                display: flex;
                                justify-content: space-between;
                                >div{
                                    display: flex;
                                    >.dan{
                                        font-size: 0.1rem;
                                        color: #999;
                                    }
                                }
                                    >p{
                                        font-size: 0.2rem;
                                        color: #999;
                                }
                                
                            }
                            div:nth-child(3){
                                display: flex;
                                justify-content: space-between;
                                >div{
                                    >p{
                                        color: #666;
                                        font-size: 0.1rem;
                                    }
                                }
                                >p{
                                    color: #666;
                                    font-size: 0.1rem;
                                    // -webkit-transform: scale(0.8);
                                    //  -webkit-text-size-adjust:none; font-size:10px; 
                                    // margin-left: 0.3rem;
                                    >span:nth-child(2){
                                        color: #3190e8;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .el-rate__item{
        width: 0.2rem;
        >i{
            font-size: 0.1rem;
        }
    }
    .el-rate__text{
        font-size: 0.1rem;
    }
    .feng{
        background: #1f86e6;
        color: white;
        // font-size: 0.1rem;
        transform: scale(0.625);
        border-radius: 0.04rem;
    }
    .da{
        font-size: 0.1rem;
        transform: scale(0.625);
        border-radius: 0.04rem;
        border:1px solid #1f86e6;
        color: #1f86e6;
    }
</style>