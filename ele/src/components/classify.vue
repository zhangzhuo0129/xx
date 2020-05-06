<template>
  <div id="classify">
    <div>
      <Heads>
        <p slot="left" style="font-size:0.4rem">
          <i class="el-icon-arrow-left"></i>
        </p>
        <p slot="cont" style="font-size:0.35rem">{{title}}</p>
        <p slot="right"></p>
      </Heads>
      <div id="screen">
        <div v-for="(item,key) in nav" :key="key" @click="alter(item,key)">
          <p :class="{se:key==index}">
            {{item.title}}
            <i class="el-icon-caret-bottom"></i>
          </p>
        </div>
      </div>
      
    </div>
    
    
      <div v-show="index!=-1" id="zhong">
          <transition>
            <div class="float" v-show="index==0">
              <div class="left">
                <p v-for="(item,key) in variety" :key="key" :class="{bai:index2==key}" @click="bian(key)">
                  <span>{{item.name}}</span>
                  <span><span>{{item.count}}</span><i class="el-icon-arrow-right"></i></span>
                </p>
              </div>
              <div class="right">
                <p v-for="(item,key) in variety[index2].sub_categories" :key="key" v-show="key!=0" @click="details(item.id,item.name)">
                  <span>{{item.name}}</span>
                  <span>{{item.count}}</span>
                </p>
              </div>
            </div>
          </transition>
          <div id="sort" v-show="index==1"> 
            <ul>
              <li v-for="(item,key) in nav2" :key="key" @click="index3=key,rank(item.id,item.flag)">
                <i :class="item.class" :style="{color:item.color}"></i>
                <p :class="{lan:index3==key}">{{item.name}}<i class="el-icon-check" v-show="index3==key"></i></p>
                </li>
            </ul>
          </div>
          <div id="filtrate">
            <div>
              <p>配送方式</p>
              <div>
                {{cooperate.text}}
              </div>
            </div>
          </div>
      </div>


    <div id="cont">
      <ul>
        <router-link
          v-for="(item,key) in data"
          :key="key"
          :to="'/restaurant/commodity?id='+item.id"
          tag="li"
        >
          <img :src="'http://elm.cangdu.org/img/'+item.image_path" alt />
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
                  score-template="{value}"
                ></el-rate>
                <p class="dan">月售{{item.recent_order_num}}单</p>
              </div>
              <div>
                <p class="feng" v-if="item.delivery_mode">{{item.delivery_mode.text}}</p>
                <p class="da" v-if="item.supports[1]">{{item.supports[1].name}}</p>
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
</template>

<script>
import Heads from "@/components/heads";
import { shop , variety , classifyDetails , cooperate} from "@/router/packaging";
export default {
  name: "classify",
  components: { Heads },
  data() {
    return {
      title: "",
      data: [],
      nav: [
        { title: "", flag: true },
        { title: "排序", flag: true },
        { title: "筛选", flag: true }
      ],
      nav2:[
        {class:"el-icon-sort",name:"智能排序",color:"#458dca",id:"",flag:0},
        {class:"el-icon-location-outline",name:"距离最近",color:"#458dca",id:"distance",flag:0},
        {class:"el-icon-pear",name:"销量最高",color:"#f06c6c",id:"recent_order_num",flag:1},
        {class:"el-icon-ice-cream",name:"起送价最低",color:"#ecc854",id:"float_minimum_order_amount",flag:0},
        {class:"el-icon-time",name:"配送速度最快",color:"#ecc854",id:"order_lead_time",flag:0},
        {class:"el-icon-star-off",name:"评分最高",color:"#e89b25",id:"rating",flag:1}
      ],
      index: -1,
      variety:[],
      index2:1,
      index3:-1,
      cooperate:""
    };
  },
  async created() {
    // 标题
    var title = this.$route.query.title;
    this.title = title;
    this.nav[0].title = title;
    //  内容
    const res = await shop({
      latitude: this.$store.state.city.latitude,
      longitude: this.$store.state.city.longitude
    });
    // console.log(res.data);
    this.data = res.data;

    //下拉列表
    const data = await variety({latitude: this.$store.state.city.latitude,longitude: this.$store.state.city.longitude})
    console.log(data.data)
    this.variety = data.data

    // 蜂鸟专送
    const send = await cooperate({latitude: this.$store.state.city.latitude,longitude: this.$store.state.city.longitude})
    // console.log(send)
    this.cooperate = send.data
    console.log(this.cooperate)
  },
  methods: {
    alter(v, i) {
      this.index == i ? (this.index = -1) : (this.index = i);
      if (this.index == 0) {
        v.title = "分类";
      } else if (this.index != 0) {
        this.nav[0].title = this.title;
      }
    },
    bian(i){
      this.index2=i
    },
    rank(id,flag){
      if(flag==0){
        function compare(property){
        return function(a,b){
          var value1 = parseInt(a[property]);
          var value2 = parseInt(b[property]);
          return value1-value2
        }
      }

      this.data.sort(compare(id))
      }else{
        function compare(property){
        return function(a,b){
          var value1 = parseInt(a[property]);
          var value2 = parseInt(b[property]);
          return value2-value1
        }
      }

      this.data.sort(compare(id))
      }
      
      this.index=-1
    },
    async details(id,name){
      console.log(id)
      this.index=-1
      this.title = name
      const data = await classifyDetails({
        latitude: this.$store.state.city.latitude,
        longitude: this.$store.state.city.longitude,
        offset:0,
        limit:20,
        "extras[]":"activities",
        "restaurant_category_ids[]":id
      })
      console.log(data.data)
      
      this.data = data.data
      
      console.log(this.title)
      
    }
  }
};
</script>

<style lang="scss">
#classify {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  #zhong{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 1.7rem;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 1;
      >.float {
        width: 100%;
        height: 7.55rem;
        // background: white;
        background-color: rgba(255, 255, 255, 1);
        display: flex;
        > .left {
          flex: 1;
          overflow: auto;
          background: white;
          background: #f1f1f1;
          >p{
            width: 100%;
            height: 0.84rem;
            color: #333;
            font-size: 0.3rem;
            box-sizing: border-box;
            padding: 0 0.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            >span:nth-child(2){
              >span{
                background: #ccc;
                color: #fff;
                border-radius: 35%;
                margin-right: 0.1rem;
              }
              >i{
                color: #ccc;
              }
            }
          }
          >.bai{
            background: white;
          }
        }
        > .right {
          flex: 1;
          overflow: auto;
          background: white;
          box-sizing: border-box;
          padding-left: 0.2rem;
          >p{
            width: 100%;
            height: 0.84rem;
            border-bottom: 0.01rem solid #e4e4e4;
            box-sizing: border-box;
            padding:  0 0.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #333;
          }
        }
      }
    }
  > div:nth-child(1) {
    width: 100%;
    position: fixed;
    z-index: 1;
  }
  > #cont {
    width: 100%;
    padding-top: 1.65rem;

    ul {
      width: 100%;
      background: white;
      > li {
        width: 100%;
        height: 2.1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0.3rem 0.2rem;
        border-bottom: 0.01rem solid #f1f1f1;
        > img {
          width: 1.26rem;
          height: 1.26rem;
        }
        > div {
          width: 5.7rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          > div {
            display: flex;
            justify-content: space-between;
            > div {
              display: flex;
              > .dan {
                font-size: 0.1rem;
                color: #999;
              }
            }
            > p {
              font-size: 0.2rem;
              color: #999;
            }
          }
          div:nth-child(3) {
            display: flex;
            justify-content: space-between;
            > div {
              > p {
                color: #666;
                font-size: 0.1rem;
              }
            }
            > p {
              color: #666;
              font-size: 0.1rem;
              // -webkit-transform: scale(0.8);
              //  -webkit-text-size-adjust:none; font-size:10px;
              // margin-left: 0.3rem;
              > span:nth-child(2) {
                color: #3190e8;
              }
            }
          }
        }
      }
    }
  }
  #screen {
    width: 100%;
    height: 0.75rem;
    background: white;
    border-bottom: 0.01rem solid #f1f1f1;
    display: flex;
    align-items: center;
    > div {
      width: 33.33%;
      height: 0.45rem;
      > p {
        width: 100%;
        height: 100%;
        border-right: 0.01rem solid #e4e4e4;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.25rem;
        color: #666;
        > i {
          transform-origin: center center;
          transform: rotate(0deg);
          transition: all 0.3s;
        }
      }
      > .se {
        color: #3190e8;
        i {
          transform-origin: center center;
          transform: rotate(180deg);
          transition: all 0.3s;
        }
      }
    }
  }
}
.el-rate__item {
  width: 0.2rem;
  > i {
    font-size: 0.1rem;
  }
}
.el-rate__text {
  font-size: 0.1rem;
}
.feng {
  background: #1f86e6;
  color: white;
  // font-size: 0.1rem;
  transform: scale(0.625);
  border-radius: 0.04rem;
}
.da {
  font-size: 0.1rem;
  transform: scale(0.625);
  border-radius: 0.04rem;
  border: 1px solid #1f86e6;
  color: #1f86e6;
}

.v-enter,.v-leave-to{
  height:0%;
  transition:all .3s;
}
.v-enter-to,.v-leave{
  height:100%;
  transition: all .3s;
}
#sort{
  width: 100%;
  background: white;
  >ul{
    width: 100%;
    >li{
      width: 100%;
      height: 1.15rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding-left: 0.4rem;
      >p{
        width: 6.6rem;
        height: 100%;
        border-bottom: 0.01rem solid #e4e4e4;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 0.2rem;
        >i{
          color: rgb(49, 144, 232);
          font-weight: 600;
          font-size: 0.4rem;
        }
      }
      >.lan{
        color: rgb(49, 144, 232);
      }
    }
  }
}
#filtrate{
  width: 100%;
  height: 5.1rem;
  background: #f1f1f1;
  >div:nth-child(1){
    width: 100%;
    height: 4rem;
    background: white;
    border-top: 0.04rem solid #f1f1f1;
    box-sizing: border-box;
    padding: 0.2rem;
    >p{
      margin-bottom: 0.25rem;
    }
  }
}
</style>