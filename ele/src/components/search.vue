<template>
  <div id="search">
      <Heads>
          <p slot="left" @click="this.$router.go(-1)"><i class="el-icon-arrow-left" style="font-size:0.5rem"></i></p>
          <p slot="cont" style="font-size:0.4rem; font-weight: 700;">搜索</p>
          <p slot="right"> </p>
      </Heads>
      <div>
          <el-input
            placeholder="请输入商家或美食名称"
            v-model="input"
            clearable>
            </el-input>
            <el-button type="primary" @click="submit()">提交</el-button>
      </div>
      <div v-show="this.input!=''&&this.data.length!=0">
          <h4>商家</h4>
          <ul>
              <li v-for="(item,key) in data" :key="key">
                  <img :src="'http://elm.cangdu.org/img/'+item.image_path" alt="">
                  <div>
                      <p><span>{{item.name}}</span></p>
                      <p>月售 {{item.recent_order_num}} 单</p>
                      <p>{{item.float_minimum_order_amount}}起送 / 距离{{item.distance}}</p>
                  </div>
              </li>
          </ul>
      </div>
      <div class="mistake" v-show="!flag">
          很抱歉！无搜索结果
      </div>
        <div class="history" v-show="this.$store.state.history.length!=0 && this.input==''">
            <h4>历史记录</h4>
            <ul>
                <li v-for="(item,key) in this.$store.state.history" :key="key">
                    <p>{{item}}</p>
                    <h4 @click="del(key)">x</h4>
                </li>
            </ul>
            <p @click="del2()">清空历史记录</p>
        </div>

  </div>
</template>

<script>
import Heads from '@/components/heads'
import { seek } from '@/router/packaging'
export default {
    name:'search',
    components:{Heads},
    data(){
        return{
            input:"",
            data:[],
            flag:true,
            flag2:true
        }
    },
    
    methods:{
        async submit(){
            this.flag2= false
            var geohash = this.$route.params.geohash
            console.log(geohash)
            const res = await seek({geohash:geohash,keyword:this.input})
            console.log(res)
                this.data = res.data
            if(res.data.length==0){
                this.flag = false
            }
            this.$store.commit("add",this.input)
        },
        del(i){
            this.$store.commit("del",i)
        },
        del2(){
            this.$store.commit("del2")
        }
    }
}
</script>

<style lang="scss">
    #search{
        width: 100%;
        height: 100%;
        >div:nth-child(2){
            width: 100%;
            height: 1.15rem;
            box-sizing: border-box;
            padding: 0.2rem 0.25rem;
            background: white;
            display: flex;
            >.el-button{
                margin-left: 0.1rem;
            }
        }
        >div:nth-child(3){
            width: 100%;
            >h4{
                width: 100%;
                height: 0.9rem;
                box-sizing: border-box;
                padding: 0.2rem;
                color: #666;
                line-height: 0.5rem;
            }
            >ul{
                width: 100%;
                >li{
                    width: 100%;
                    height: 1.95rem;
                    background: white;
                    border-bottom: 0.01rem solid #e4e4e4;
                    box-sizing: border-box;
                    padding: 0.2rem;
                    display: flex;
                    justify-content: space-between;
                    >img{
                        width: 0.8rem;
                        height: 0.8rem;
                    }
                    >div{
                        width: 86%;
                        height: 1.35rem;
                        box-sizing: border-box;
                        padding-bottom: 0.14rem;
                        border-bottom: 0.01rem solid #e4e4e4;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        font-size: 0.2rem;
                        color: #333;
                    }
                }
            }
        }
        >.mistake{
            width: 100%;
            height: 0.9rem;
            background: white;
            text-align: center;
            line-height: 0.9rem;
            border-top: 0.01rem solid #e4e4e4;
        }
        >.history{
            width: 100%;
            >h4{
                width: 100%;
                height: 0.9rem;
                box-sizing: border-box;
                padding: 0.2rem;
                color: #666;
                line-height: 0.5rem;
            }
            >ul{
                width: 100%;
                >li{
                    width: 100%;
                    height: 0.9rem;
                    box-sizing: border-box;
                    background: white;
                    padding: 0.2rem;
                    color: #666;
                    border-bottom: 0.01rem solid #e4e4e4;
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.35rem;
                }
            }
            >p{
                width: 100%;
                height: 1rem;
                background: white;
                text-align: center;
                line-height: 1rem;
                font-size: 0.35rem;
                color: #3190e8;
                font-weight: 600;
            }
        }
    }
</style>