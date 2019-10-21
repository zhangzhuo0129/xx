<template>
  <div id="commodity">
      <div class="cont">
          <ul class="left">
              <li v-for="(item,key) in data" :key="key" @click="discolor(key)" :class="{discolor:key==index}">
                  {{item.name}}
              </li>
          </ul>
          <div class="right">
                <ul v-for="(item,key) in data" :key="key" :id="'scll'+key">
                    <div>
                        <p><span>{{item.name}}</span><span>{{item.description}}</span></p>
                        <i class="el-icon-more"></i>
                    </div>
                    <li v-for="(v,i) in item.foods" :key="i">
                        <img :src="'http://elm.cangdu.org/img/'+v.image_path" alt="">
                        <div>
                            <h4>{{v.name}}</h4>
                            <p>{{v.description}}</p>
                            <p>月售{{v.month_sales}} 好评率{{v.satisfy_rate}}%</p>
                            <span v-if="v.activity!=null">{{v.activity.image_text}}</span>
                            <div>
                                <p>￥<span>{{v.specfoods[0].price}} </span><span>起</span></p>
                                <p class="select" v-if="v.specfoods.length==2">选择规格</p>
                                <div v-if="v.specfoods.length==1">
                                    <p class="subtract" v-show="v.__v>0" @click="v.__v--">-</p>
                                    <p v-show="v.__v>0">{{v.__v}}</p>
                                    <p class="plus" @click="v.__v++,jia(v)">+</p>
                                </div>
                                
                            </div>
                        </div>
                    </li>
                </ul>
          </div>
          
      </div>
      <div class="footer">
          <span v-show="this.$store.getters.sum>0">{{this.$store.getters.sum}}</span>
          <div class="left">
              <div @click="flag=!flag" :class="{blue:this.$store.getters.sum>0}">
                  <i class="el-icon-shopping-cart-2"></i>
              </div>
              <div>
                  <h4>￥ {{this.$store.getters.price}}</h4>
                  <p>配送费￥5</p>
              </div>
          </div>
          <div class="right">
              <h4 v-show="this.$store.getters.sum==0">
                  还差￥20起送
              </h4>
              <h4 v-show="this.$store.getters.sum>0">
                  去结算
              </h4>
          </div>
      </div>
      <div class="shopping" v-show="flag">
          <p>
              <span>购物车</span>
              <span @click="del()"> <i class="el-icon-deletes"></i> 清空</span>
          </p>
          <ul>
              <li v-for="(item,key) in this.$store.state.list" :key="key" v-show="item.__v>0">
                <p>{{item.name}}</p>
                <div>
                    <p>{{item.specfoods[0].price*item.__v}}</p>
                    <p>
                        <i class="el-icon-remove-outline" style="color:#3190e8" @click="jian2(item,key)"></i>
                        <span>{{item.__v}}</span>
                        <i class="el-icon-circle-plus" style="color:#3190e8" @click="item.__v++"></i>
                    </p>
                </div>
              </li>
          </ul>
      </div>
      <div v-for="(ball,i) in balls" :key="i">
        <transition name="drop"
                    @before-enter="beforeDrop"
                    @enter="dropping"
                    @after-enter="afterDrop">
          <div class="ball"
               v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
  </div>
</template>

<script>
import { particulars} from '@/router/packaging'


export default {
    name: 'commodity',
    data(){
        return{
            data:[],
            index:0,
            flag:false,
            count: 0,
            balls: [ //小球 设为3个
                {
                show: false
                },
                {
                show: false
                },
                {
                show: false
                },
            ],
            dropBalls: [],
        }
    },
    async created() {
        var id = this.$route.query.id
        console.log(id)
        const res = await particulars({restaurant_id:id})
        console.log(res)
        this.data = res.data
    },
    methods:{
        discolor(i){
            document.getElementById('scll'+i).scrollIntoView({ behavior: "smooth" });
            this.index = i
        },
        jia(v){
            this.$store.commit("jia",v)
            this.drop(event.target);
        },
        jian2(v,i){
            var obj = {v:v,i:i}
            this.$store.commit("jian",obj)
        },
        del(){
            this.$store.commit("del")
        },
        drop (el) { //抛物
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop (el) {/* 购物车小球动画实现 */
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect(); //元素相对于视口的位置
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);  //获取y
          el.style.display = '';
          el.style.webkitTransform = 'translateY(' + y + 'px)';  //translateY
          el.style.transform = 'translateY(' + y + 'px)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translateX(' + x + 'px)';
          inner.style.transform = 'translateX(' + x + 'px)';
        }
      }
    },
    dropping (el, done) { /*重置小球数量  样式重置*/
      let rf = el.offsetHeight;
      el.style.webkitTransform = 'translate3d(0,0,0)';
      el.style.transform = 'translate3d(0,0,0)';
      let inner = el.getElementsByClassName('inner-hook')[0];
      inner.style.webkitTransform = 'translate3d(0,0,0)';
      inner.style.transform = 'translate3d(0,0,0)';
      el.addEventListener('transitionend', done);
    },
    afterDrop (el) { /*初始化小球*/
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }


    },
    },
    

}
</script>

<style lang="scss" scoped>

.ball {
  position: fixed;
  left: 32px;
  bottom: 22px;
  z-index: 200;
  transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41); /*贝塞尔曲线*/
}
.inner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgb(0, 160, 220);
  transition: all 0.4s linear;
}
    #commodity{
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: auto;
        >.footer{
            width: 100%;
            height: 0.95rem;
            background: #3d3d3f;
            display: flex;
            justify-content: space-between;
            position: relative;
            >span{
                        display: inline-block;
                        width: 0.4rem;
                        height: 0.4rem;
                        background: red;
                        border-radius: 50%;
                        position: absolute;
                        left: 1rem;
                        top: -0.4rem;
                        color: white;
                        font-size: 0.3rem;
                        text-align: center;
                        align-items: 0.4rem;
                        z-index: 2;
                    }
            >.left{
                width: 70%;
                height: 100%;
                position: relative;
                padding-left: 0.2rem;
                >.blue{
                  background:#3190e8 !important;
                }
                >div:nth-child(1){
                    width: 1rem;
                    height: 100%;
                    background: #3d3d3f;
                    color: white;
                    border: 0.1rem solid #434343;
                    border-radius: 50%;
                    font-size: 0.7rem;
                    position: absolute;
                    text-align: center;
                    line-height: 1rem;
                    bottom: 0.2rem;
                    z-index: 1;
                    
                }
                >div:nth-child(2){
                    width: 2rem;
                    height: 100%;
                    box-sizing: border-box;
                    padding: 0.1rem 0;
                    position: absolute;
                    left: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    >h4:nth-child(1){
                        color: white;
                    }
                    >p:nth-child(2){
                        color: white;
                        font-size: 0.2rem;
                    }
                }
            }
            >.right{
                width: 30%;
                height: 100%;
                line-height: 1rem;
                text-align: center;
                >h4:nth-child(1){
                    width: 100%;
                    height: 100%;
                    background: #535356;
                    color: white;
                }
                >h4:nth-child(2){
                    width: 100%;
                    height: 100%;
                    background: #4cd964;
                    color: white;
                }
            }
        }
        >.cont{
            flex: 1;
            overflow: auto;
            display: flex;
            >.left{
                flex: 1;
                overflow: auto;
                >li{
                    width: 100%;
                    height: 1.3rem;
                    box-sizing: border-box;
                    line-height: 1.3rem;
                    padding-left:0.25rem; 
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                >.discolor{
                    box-sizing: border-box;
                    padding-left:0.2rem; 
                    background: white;
                    border-left: 0.05rem  solid #3190e8;
                }
            }
            >.right{
                flex: 3;
                overflow: auto;
                >ul{
                    width: 100%;
                    >div{
                        width: 100%;
                        height: 1rem;
                        display: flex;
                        justify-content: space-between;
                        box-sizing: border-box;
                        padding: 0.2rem;
                        align-items: center;
                        color: #999;
                        >p{
                            >span:nth-child(1){
                                color: #666;
                                font-weight: 600;
                            }
                            >span:nth-child(2){
                                font-size: 0.1rem;
                                margin-left: 0.1rem;
                            }
                        }
                    }
                    >li{
                        width: 100%;
                        height: 2.5rem;
                        background: white;
                        display: flex;
                        justify-content: space-between;
                        box-sizing: border-box;
                        padding: 0.2rem;
                        >img{
                            width: 0.95rem;
                            height: 0.95rem;
                        }
                        >div{
                            width: 78%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            >p:nth-of-type(1){
                                font-size: 0.1rem;
                                color: #999;
                            }
                            >p:nth-of-type(2){
                                font-size: 0.1rem;
                            }
                            >span:nth-of-type(1){
                                // display: inline-block;
                                align-self: baseline;
                                min-width: 0.01rem;
                                font-size: 0.1rem;
                                border: 0.01rem solid rgb(240, 115, 115);
                                border-radius: 0.6rem;
                                color: rgb(240, 115, 115);
                            }
                            >div{
                                display: flex;
                                justify-content: space-between;
                                >p:nth-child(1){
                                    font-size: 0.1rem;
                                    color: #f60;
                                    >span:nth-child(1){
                                    font-size: 0.3rem;
                                    }
                                    >span:nth-child(2){
                                        font-size: 0.2rem;
                                        color: #666;
                                    }
                                }
                                >.select{
                                    background: #3190e8;
                                    color: white;
                                    font-size: 0.2rem;
                                    padding: 0.1rem;
                                    border-radius: 6px;
                                }
                                >div{
                                    // width: 1.2rem;
                                    display: flex;
                                    justify-content: space-between;
                                    >.plus{
                                        width: 0.4rem;
                                        height: 0.4rem;
                                        background: #3190e8;
                                        color: white;
                                        text-align: center;
                                        line-height: 0.35rem;
                                        // font-size: 0.2rem;
                                        // padding: 0.1rem;
                                        border-radius: 50%;
                                        margin-left: 0.1rem;
                                    }
                                    >.subtract{
                                        width: 0.2rem;
                                        height: 0.2rem;
                                        border: 0.01rem solid #3190e8;
                                        border-radius: 50%;
                                        text-align: center;
                                        line-height: 0.1rem;
                                        font-size: 0.4rem;
                                        padding: 0.1rem;
                                        color:#3190e8;
                                        margin-right: 0.1rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .shopping{
        width: 100%;
        // height: 1rem;
        // background: red;
        position: fixed;
        bottom: 0.9rem;
        >p{
            width: 100%;
            height: 0.9rem;
            background: #eceff1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 0 0.2rem;
        }
        >ul{
            width: 100%;
            background: white;
            >li{
                width: 100%;
                height: 0.9rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                padding: 0 0.2rem;
                >div{
                    width: 40%;
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
    }
</style>