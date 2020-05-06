<template>
  <div id="category">
        <div>
            <p>品类管理</p>
            <el-button type="primary" icon="el-icon-plus" @click="tiao()">添加品类</el-button>
        </div>
        <p>当前商品分类：{{length}}</p>
        <template>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="id"
                label="品类ID"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                label="品类名称"
                width="650">
                </el-table-column>
                <el-table-column
                prop="address"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="amend(scope.row.id,scope.row.name)">修改名称</el-button>
                    <el-button type="text" v-show="flag" @click="open(scope.row.id)">查看其子品类</el-button>
                    <!-- <router-link :to="'/home/particulars/'+scope.row.id">修改名称</router-link>
                    <router-link :to="'/home/operation/'+scope.row.id">查看其子品类</router-link> -->
                </template>
                </el-table-column>
            </el-table>
        </template>
  </div>
</template>

<script>
import {category , amend , recursion} from '../router/packaging.js'
import { async } from 'q'
export default {
    name:"category",
    data(){
        return{
            tableData:[],
            length: 0,
            flag:true
        }
    },
    async created(){
        const res = await category()
        // console.log(res.data.data)
        this.tableData=res.data.data
        // this.length=res.data.data.length
    },


    methods: {
       async amend(id,name) {
           
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: name,
        })
        .then(({ value }) => {
            const res =  amend({categoryId:id,categoryName:value})
            console.log(res)
          this.$message({
              
            type: 'success',
            message: '更新品类名字成功'
            
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '修改失败'
          });       
        });

        
      },
      
      async open(id){
          this.length=id
        const res = await category({categoryId:id})  
        console.log(res.data.data)
        this.tableData = res.data.data
        this.flag=false
      },
      tiao(){
          this.$router.push('/home/append')
      }
    },
}
</script>

<style lang="scss">
    #category{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
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
    }
    .cell{
        >a{
            color: #337ab7;
        }
        >a:hover{
            color: black;
        }
    }
</style>