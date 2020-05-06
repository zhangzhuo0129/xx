<template>
  <div id="order">
      <p>订单管理</p>
      <div class="examine">
              <el-form  label-width="80px">
                <el-form-item style="margin:0">
                    <el-select v-model="txt" placeholder="按订单号查询" style="margin:0;">
                    <el-option label="按订单号查询" value="id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-input
                style="width:300px;margin-right:20px"
                placeholder="订单号"
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
                prop="orderNo"
                label="订单号"
                width="200">
                </el-table-column>
                <el-table-column
                prop="receiverName"
                label="收件人"
                width="100">
                 <!-- <template slot-scope="scope">
                   <p>{{scope.row.name}}</p> 
                   <p>{{scope.row.subtitle}}</p> 
                </template> -->
                </el-table-column>
                <el-table-column
                prop="paymentTypeDesc"
                label="订单状态"
                width="150">
                </el-table-column>

                <el-table-column
                prop="payment"
                label="订单总价"
                width="150">
                </el-table-column>

                <el-table-column
                prop="createTime"
                label="创建时间"
                width="280">
                </el-table-column>

                <el-table-column
                prop=""
                label="操作">
                <template slot-scope="scope">
                    <router-link :to="'/home/examine/'+scope.row.orderNo">查看</router-link>
                </template>
                </el-table-column>


            </el-table>
        </template>
        <el-pagination
            background
            color
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
  </div>
</template>

<script>
import { order , quantity , ordernumber } from '../router/packaging.js'
export default {
    name: 'order',
    data(){
        return{
            tableData:[],
            txt:"",
            input:"",
            orderCount:0
        }
    },
    async created() {
        const res = await order()
        // console.log(res.data.data.list)
        this.tableData=res.data.data.list

        const data = await quantity()
        // console.log(data.data.data)
        this.orderCount = data.data.data.orderCount
    },
    methods:{
        async handleCurrentChange(i){
            const res = await order({pageNum:i})
            // console.log(res)
            this.tableData=res.data.data.list
        },
        async inquire(){
            const res = await ordernumber({orderNo:this.input})
            console.log(res.data.data.list)
            this.tableData=res.data.data.list
            this.orderCount = res.data.data.list.length
        }
    }
}
</script>

<style lang="scss">
    #order{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
        >p{
            font-size: 35px;
            margin-bottom: 20px;
        }
        >.examine{
            width: 100%;
            display: flex;
            margin-bottom: 20px;
            .el-form{
                margin-right: 20px;
            }
            .el-form-item__content{
                margin: 0 !important;
            }
        }
    }
</style>