<template>
  <div id="user">
      <p>用户管理</p>
      <template>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="id"
            label="ID"
            width="80">
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户名"
            width="150">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱"
            width="300">
            </el-table-column>
             <el-table-column
            prop="phone"
            label="电话"
            width="150">
            </el-table-column>
             <el-table-column
            prop="moment(createTime).format('YYYY-MM-DD HH:mm:ss') " 
            
            label="注册时间"
            >
            </el-table-column>
        </el-table>
      </template>
    <el-pagination
      @current-change="change"
      :current-page.sync="currentPage3"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="userCount">
    </el-pagination>
  </div>
</template>

<script>
import { user , quantity } from '../router/packaging.js'
import {Request} from '@/router/request.js'
export default {
    name:'user',
    data(){
        return{
            tableData:[],
            currentPage3:1,
            userCount:0,
            time:""
        }
    },
    async created() {
        const res = await user()  
        console.log(res.data.data.list)
        this.tableData = res.data.data.list
        // this.time = moment(res.data.data.list.createTime).format("YYYY-MM-DD HH:mm:ss") 
         
        const data = await quantity()
        console.log(data.data.data)
        this.userCount = data.data.data.userCount
    },
    methods:{
      change(i) {
        Request.getData({
          url:`/api/user/list.do`,
          method:"get",
          data:{pageNum:i}
        }).then(res=>{
            console.log(res)
            this.tableData=res.data.data.list
        })
      }
    }
}
</script>

<style lang="scss">
    #user{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
        >p{
            font-size: 35px;
            margin-bottom: 20px;
        }
    }
</style>