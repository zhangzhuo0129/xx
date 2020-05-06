<template>
  <div id="commodity">
      <!-- <heads></heads> -->
      <div class="commo">
          <div>
              <p>商品管理</p>
              <el-button type="primary" icon="el-icon-plus" @click="tiao()">添加商品</el-button>
          </div>
          <div>
              <el-form  label-width="80px">
                <el-form-item style="margin:0">
                    <el-select v-model="txt" placeholder="按商品id查询" style="margin:0;">
                    <el-option label="按商品id查询" value="id"></el-option>
                    <el-option label="按商品名称查询" value="name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-input
                style="width:300px;margin-right:20px"
                placeholder="请输入内容"
                v-model="input"
                clearable>
                </el-input>
                <!-- <el-button @click="inquire()" >查询</el-button> -->
                <el-button type="button" @click="inquire()">查询</el-button>
          </div>
          <template :stripe="true">
            <el-table
                :data="tableData"
                :stripe="true"
                border
                style="width: 100%">
                <el-table-column
                prop="id"
                label="id"
                width="50">
                </el-table-column>
                <el-table-column
                label="信息"
                width="600">
                 <template slot-scope="scope">
                   <p>{{scope.row.name}}</p> 
                   <p>{{scope.row.subtitle}}</p> 
                </template>
                </el-table-column>
                <el-table-column
                prop="price"
                label="价格">
                </el-table-column>
                <el-table-column
                label="状态">
                <template slot-scope="scope">
                    <p v-show="scope.row.status==1">在售<el-button type="warning" size="mini" @click="updow(scope.row.id,scope.row.status,scope.$index)">下架</el-button></p>
                    <p v-show="scope.row.status==2">已下架<el-button type="warning" size="mini" @click="updow(scope.row.id,scope.row.status,scope.$index)">上架</el-button></p>
                </template>
                </el-table-column>
                
                <el-table-column
                prop=""
                label="操作">

                <template slot-scope="scope">
                    
                    <router-link :to="'/home/particulars/'+scope.row.id">查看</router-link>
                    <router-link :to="'/home/operation/'+scope.row.id">编辑</router-link>
                </template>

                </el-table-column>
            </el-table>
        </template>
        <el-pagination
        @current-change="change"
        :page-sizes="[10, 20, 20, 20]"
        :page-size="10"
        :total="productCount"  >
        </el-pagination>
      </div>
  </div>
</template>

<script>
import heads from '@/components/heads'
import {Request} from '@/router/request.js'
import {updown , ab , search} from '@/router/packaging.js'
export default {
    name:'commodity',
    components:{heads},
    data(){
        return{
            txt:"",
            input:'',
            tableData:[],
            productCount: 0
        }
    },
    created(){
        this.$axios.get(`/api/product/list.do`).then((data)=>{
            // console.log(data.data.data.list)
            this.tableData=data.data.data.list
        })
        Request.getData({
          url:`/api/statistic/base_count.do`,
          method:"post"
        }).then(res=>{
        //   console.log(res)
          this.productCount=res.data.data.productCount
        //   console.log(this.productCount)
        })
    },
    methods:{
       change(i){
        Request.getData({
          url:`/api/product/list.do`,
          method:"get",
          data:{pageNum:i}
        }).then(res=>{
            this.tableData=res.data.data.list
        })
       },

       // 点击切换上下架
       async updow(id,status,key){
        //    console.log(status)
            status==2?status=1:status=2
            const res = await updown({productId:id,status:status})
            // console.log(res)
            // console.log(status)
            this.tableData[key].status=status
       },

       async inquire(){
            if(this.txt==""&&this.input==""){
                this.$confirm('查询条件不能为空?', '提示', {
              confirmButtonText: '确定',
            //   cancelButtonText: '取消',
              type: 'warning'
            })
                return false
            }
           if(this.txt=="id"){
               const res = await search({pageNum:1,productId:this.input})
                this.tableData  =res.data.data.list
                console.log(this.tableData)
                this.productCount=res.data.data.list.length
           }else if(this.txt=="name"){
               const res = await search({pageNum:1,productName:this.input})
               this.tableData = res.data.data.list
               this.productCount=res.data.data.list.length
           }
       },
       tiao(){
           this.$router.push("/home/addition")
       }
    }
}
</script>

<style lang="scss" scoped>
    #commodity{
        width: 100%;
        // height: 100%;;
        background: #f3f3f3;
        >.commo{
            width: 100%;
            // height: 100%;
            box-sizing: border-box;
            padding: 20px;
            >div:nth-child(1){
                width: 100%;
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
                >p{
                    font-size: 35px;
                }
            }
            >div:nth-child(2){
                width: 100%;
                display: flex;
                .el-form{
                    margin-right: 20px;
                }
                .el-form-item__content{
                    margin: 0 !important;
                    
                }
            }
        }
    }
</style>