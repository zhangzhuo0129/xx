<template>
  <div id="detail">
      <Heads>
          <i class="el-icon-arrow-left" slot="left" @click="$router.go(-1)" style="font-size:0.5rem"></i>
          <p slot="cont" style="font-size:0.4rem; font-weight: 700">{{city.name}}</p>
          <p slot="right" style="font-size:0.3rem;" @click="$router.go(-1)">切换城市</p>
      </Heads>
      <div>
            <div class="seek">
                <el-input
                placeholder="请输入学校、商务楼、地址"
                v-model="input"
                clearable
                height="0.8rem">
                </el-input>
                <ul v-show="flag3">
                    <li v-for="(item,key) in list2" :key="key">{{item}}</li>
                </ul>
                <el-button type="primary" height="0.65rem" @click="details(city.id)">提交</el-button>
            </div>
            <p v-show="!flag">搜索历史</p>
            <ul v-show="this.list.length>0 && !flag">
                <router-link v-for="(item,key) in list" :key="key" :to="'/msite/takeout?geohash='+item.geohash" tag="li">
                    <p>{{item.name}}</p>
                    <p>{{item.address}}</p>
                </router-link>
                <p @click="empty()">清空所有</p>
            </ul>


            <div v-show="flag2" class="defeat">很抱歉！无搜索结果</div>
            <ul>
                <router-link v-for="(item,key) in data" :key="key" @click.native="add(item)" :to="'/msite/takeout?geohash='+item.geohash" tag="li">
                    <p>{{item.name}}</p>
                    <p>{{item.address}}</p>
                </router-link>
            </ul>
      </div>
      
  </div>
</template>

<script>
import Heads from "@/components/heads"
import { details , city} from "@/router/packaging.js"
export default {
    name: 'detail',
    components:{ Heads },
    data(){
        return{
            city:{},
            input:"",
            flag:false,
            data:[],
            flag2:false,
            list:[],
            list2:[],
            flag3:false
        }
    },
    async created() {
        var id = this.$route.query.id
        // console.log(id)
        const res = await details({},id)
        // console.log(res.data)
        this.city = res.data

        this.list = JSON.parse(localStorage.getItem('data')) || []
    },
    // created(){
    //     this.list = JSON.parse(localStorage.getItem('data')) || []
    // },
    methods:{
        async details(id){
            var index = this.list2.findIndex((v,i)=>{
                return v == this.input
            })
            if(index==-1 && this.input!=""){
                this.list2.push(this.input)
            }
            if(this.input==""){
                this.flag3=true
                return false
            }
            const res = await city({city_id:id,keyword:this.input})
            // console.log(res)
            this.flag=true

            this.data = res.data
                
            if(res.data.length==0){
                this.flag2 = true
            }
        },
        add(item){
            
            // this.$store.commit("add",item)
            console.log("111")
            var index = this.list.findIndex((v,i)=>{
                return  item.name==v.name 
            })
            // console.log(index)
            if(index == -1){
                this.list.push(item)
            }
            localStorage.setItem('data',JSON.stringify(this.list))
        },
        empty(){
            this.list=[]
            localStorage.clear()
        },
    }
}
</script>

<style lang="scss">
    #detail{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        >div:nth-child(2){
            flex: 1;
            overflow: auto;
            >.seek{
                margin-top: 0.2rem;
                width: 100%;
                height: 2rem;
                background: white;
                border-top: 1px solid #e4e4e4;
                border-bottom: 1px solid #e4e4e4;
                box-sizing: border-box;
                padding: 0.2rem 0.4rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: relative;
                >ul{
                    position: absolute;
                    width: calc(100% - 0.8rem);
                    top: 0.8rem;
                    border: 1px solid;
                    // left: 0px;
                    >li{
                        width: 100%;
                        height: 0.6rem;
                        background: white;
                        line-height: 0.6rem;
                        box-sizing: border-box;
                        padding: 0 0.2rem;
                    }
                }
            }
            >p{
                border-top: 1px solid #e4e4e4;
                border-bottom: 1px solid #e4e4e4;
                box-sizing: border-box;
                padding: 0.05rem 0.3rem;
                font-size: 0.25rem;
            }
            >.defeat{
                width: 100%;
                height: 0.8rem;
                background: white;
                line-height: 0.8rem;
                box-sizing: border-box;
                padding: 0 0.4rem;
            }
            >ul{
                width: 100%;
                background: white;
                >li{
                    width: 100%;
                    height: 1.4rem;
                    box-sizing: border-box;
                    padding: 0.3rem 0.4rem 0.25rem 0.4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    border-top: 1px solid #e4e4e4;
                    border-bottom: 1px solid #e4e4e4;
                    >p:nth-child(1){
                        color: #333;
                        font-size: 0.3rem;
                    }
                    >p:nth-child(2){
                        color: #999;
                        font-size: 0.2rem;
                    }
                }
                >p{
                    width: 100%;
                    height: 0.8rem;
                    background: white;
                    color: #666;
                    font-size: 0.3rem;
                    text-align: center;
                    line-height: 0.8rem;
                }
            }
        }
        
    }
    .el-input__inner{
        height: 0.6rem;
    }
    .el-button{
        padding: 0.2rem 0.4rem;
    }
</style>