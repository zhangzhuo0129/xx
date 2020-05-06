<template>
  <div id="page">
      <!-- <heads></heads> -->
      <div id="sy">
          <p>首页</p>
          <el-row :gutter="20">

            <el-col :span="8" style="padding:10px;">
                <div class="grid-content bg-purple" style="background-color: #f0ad4e;">
                    <p>{{userCount}} </p>
                    <p>用户总数</p>
                </div>
            </el-col>

            <el-col :span="8" style="padding:10px;">
                <div class="grid-content bg-purple" style="background-color: #5cb85c;">
                     <p>{{productCount}} </p>
                    <p>商品总数</p>
                </div>
             </el-col>

            <el-col :span="8" style="padding:10px;">
                <div class="grid-content bg-purple" style="background-color: #4cb1cf;">
                     <p>{{orderCount}} </p>
                    <p>用户总数</p>
                </div>
            </el-col>
            </el-row>
      </div>
  </div>
</template>

<script>
import heads from '@/components/heads'
import {Request} from '@/router/request.js'
import { quantity } from '@/router/packaging.js'
export default {
    name:'page',
    components:{heads},
    data(){
        return{
            userCount:"",
            productCount:"",
            orderCount:""
        }
    },
    methods:{
      // async quantity(){
      //   const res = await quantity({})
      //   console.log(res)
      // }
      
    },
    async created(){
        // this.$axios.post("/api/statistic/base_count.do").then((data)=>{
        //     // console.log(data.data.data)
        //     this.userCount=data.data.data.userCount
        //     this.productCount=data.data.data.productCount
        //     this.orderCount=data.data.data.orderCount
        // })
        
        // this.quantity()

        const res = await quantity({})
        console.log(res)


        Request.getData({
          url:`/api/statistic/base_count.do`,
          method:"post"
        }).then(res=>{
          // console.log(res)
          this.userCount=res.data.data.userCount
          this.productCount=res.data.data.productCount
          this.orderCount=res.data.data.orderCount
        })

    }
}
</script>

<style lang="scss" scoped>
    #page{
        width: 100%;
        // height: 100%;
        // background: #f3f3f3; 
        >#sy{
            width: 100%;
            height: 90%;
            box-sizing: border-box;
            padding: 30px;
            >p{
                font-size: 35px;
                margin-bottom: 20px;
            }
        }
    }
    .el-row {
    margin-bottom: 20px;
    height: 160px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    height: 100%;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    color: white;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    // min-height: 160px;
    // margin: 0 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    
    >p:nth-child(1){
        font-size: 50px;
    }
    >p:nth-child(2){
        font-size: 18px;
    }
  }
  .el-col:hover{
      padding: 0px !important;
      color: black;

  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>