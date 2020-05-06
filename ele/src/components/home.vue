<template>
  <div id="home">
      <Heads>
          <p slot="left">ele.me</p>
          <p slot="cont">  </p>
          <p slot="right">登录|注册</p>
      </Heads>
        <div class="cont">
            <div>
                <p>
                    <span>当前定位城市：</span>
                    <span>定位不时，请在城市列表中选择</span>
                </p>
                <p>
                    <router-link :to="'/detail/?id='+location.id" tag="span">{{location.name}}</router-link>
                    <i class="el-icon-arrow-right"></i>
                </p>
            </div>
            <div class="box">
                <p>热门城市</p>
                <ul>
                    <router-link v-for="(item,key) in hot" :key="key" :to="'/detail/?id='+item.id" tag="li" style="color:#3190e8">{{item.name}}</router-link>
                </ul>
            </div>
            <div class="box" v-for="(item,key) in group" :key="key">
                <p>{{item}}</p>
                <ul>
                    <router-link v-for="(v,key) in data[item]" :key="key" :to="'/detail/?id='+v.id" tag="li">{{v.name}}</router-link>
                </ul>
            </div>
        </div>

  </div>
</template>

<script>
import Heads from '@/components/heads'
import { location , hot , group} from '@/router/packaging.js'
export default {
    name:'home',
    components:{ Heads },
    data(){
        return{
            location:"",
            hot:[],
            group:[],
            data:[]
        }
    },
    async created(){
        const res = await location({type:"guess"})
        // console.log(res)
        this.location = res.data

        const data = await hot({type:"hot"})
        // console.log(data)
        this.hot = data.data

        const data1 = await group({type:"group"})
        // console.log(data1)
        this.data = data1.data
        this.group = Object.keys(data1.data).sort()
        // console.log(this.group)

    }
}
</script>

<style lang="scss">
    #home{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        >.cont{
            flex: 1;
            overflow: auto;
            >div:nth-child(1){
                width: 100%;
                height: 1.65rem;
                background: white;
                margin-bottom: 0.2rem;
                >p{
                    width: 100%;
                    height: 50%;
                    box-sizing: border-box;
                    padding: 0 0.2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #e5e5e5;
                }
                >p:nth-child(1){
                    font-size: 0.25rem;
                    >span:nth-child(1){
                        color: #666;
                    }
                    >span:nth-child(2){
                        color: #9f9f9f;
                    }
                }
                >p:nth-child(2){
                    >span{
                        color: #3190e8;
                        font-size: 0.35rem;
                    }
                }
            }
            >.box{
                background: white;
                border-top: 1px solid #e5e5e5;
                margin-bottom: 0.2rem;
                >p{
                    width: 100%;
                    height: 0.65rem;
                    box-sizing: border-box;
                    padding: 0 0.2rem;
                    line-height: 0.65rem;
                    font-size: 0.25rem;
                    border-bottom: 1px solid #e5e5e5;
                }
                >ul{
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    >li{
                        width: 25%;
                        height: 0.8rem;
                        box-sizing: border-box;
                        border: 1px solid #e5e5e5;
                        text-align: center;
                        padding: 0 0.1rem;
                        line-height: 0.8rem;
                        font-size: 0.25rem;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
</style>