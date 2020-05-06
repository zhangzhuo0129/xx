<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入姓名" style="width: 200px;" class="filter-item" 
      @input = "getList" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        搜索
      </el-button>
    </div>

    <el-table
    :data="list"
    style="width: 100%">
    <!-- <el-table-column
      type="index"
      label="序号"
      >
    </el-table-column> -->
    <el-table-column
      prop="loan_name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="loan_card"
      label="身份证号码"
     >
    </el-table-column>
    <el-table-column label="操作" width="300">
      <template slot-scope="{row}">
        <el-button
          size="mini" type="primary" @click="handleDetails(row)"
          >查看</el-button>
        <el-button
          size="mini" type="success" @click="handlePass(row)" :disabled="row.result=='pass'||row.result=='reject'"
          >通过</el-button>
        <el-button
          size="mini"
          type="danger"  @click="handleRefuse(row)" :disabled="row.result=='pass'||row.result=='reject'"
          >拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>

    <!-- 通过弹层功能 -->
    <el-dialog title="贷款审批-初审" :visible.sync="dialogPassVisible">
      <p>是否初审通过？</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPassVisible = false">
          取消
        </el-button>
        <el-button type="success" @click="passData()"> 
          通过
        </el-button>
      </div>
    </el-dialog>

    <!-- 拒绝弹层功能 -->
    <el-dialog title="贷款审批-初审" :visible.sync="dialogRefuseVisible">
      <p>是否初审拒绝？</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRefuseVisible = false">
          取消
        </el-button>
        <el-button type="danger" @click="RefuseData()">
          拒绝
        </el-button>
      </div>
    </el-dialog>
    
    <!-- 详情弹层功能 -->
    <el-dialog title="贷款审批-查看详情" :visible.sync="dialogDetailsVisible">
      <el-form  :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="ID" prop="id" >
              <el-input v-model="temp.id" readonly/>
            </el-form-item>
          <el-form-item label="姓名" prop="name">
              <el-input v-model="temp.name" readonly/>
            </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-input :value="temp.birthday |getDate" readonly/>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input :value="temp.sex |getSex" readonly />
          </el-form-item>
          <el-form-item label="教育程度" prop="education">
            <el-input :value="temp.education |getEducation" readonly />
          </el-form-item>
          <el-form-item label="居住地址" prop="address1">
              <el-input v-model="temp.address1" readonly/>
            </el-form-item>
          <el-form-item label="手机号" prop="mobile_phone">
            <el-input v-model.number="temp.mobile_phone" readonly/>
          </el-form-item>
          <el-form-item label="身份证号" prop="loan_card">
            <el-input v-model="temp.identity_card" readonly/>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailsVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination> 

  </div>
</template>

<script>
import {loanQuery,approveFirstList,approveFirstPass,approveFirstReject} from '@/api/article'

export default {
  name: 'ComplexTable',
  filters: {
    getDate(time){
      var d = new Date(time);
      var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      return times;
    },
    getSex(type){
       switch(type){
          case 'man':
              return '男';
          case 'woman':
              return '女';
          default:
              return '男';
      }
    },
    getEducation(type){
       switch(type){
          case 'college':
              return '大学';
          case 'highschool':
              return '高中';
          default:
              return type;
      }
    },
  },
  data() {
    return {
      list: [],
      total: 0, //总数量
      pages:1,//总页数
      listLoading: true,
      listQuery: {
        pageNo: 1, //当前页码
        pageSize: 10,//条数
        name: '',//查询条件-姓名
      },
      filterName:[],  //姓名筛选
      dialogDetailsVisible: false,//详情弹层
      dialogRefuseVisible: false, //拒绝弹层
      dialogPassVisible:false, //通过弹层
      temp:{
        id:'',
        name:'',//姓名
        birthday:'',//出生日期
        sex:'',//性别
        education:'',//教育程度
        address1:'',//居住地址
        mobile_phone:'',//手机号
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      approveFirstList(this.listQuery).then(res => {
        if(res.code == '20000'){
            this.list = res.data.data.data;  //获取展示的数据
            this.total = res.data.data.rows; //获取总数量
            this.pages = res.data.data.pages; //获取总页数
          }
      })
    },
    //当前条数变化
    handleSizeChange(val) {
      this.listQuery.pageSize = val || this.listQuery.pageSize;
      this.getList();
    },
    //当前页变化
    handleCurrentChange(val) {
      this.listQuery.pageNo = val || this.listQuery.pageNo;
      this.getList();
    },
    //查看详情
    handleDetails(row){
      this.listLoading = true;
      loanQuery({id:row.loan_id}).then(res => {
        this.dialogDetailsVisible = true; //通过弹层的显示
        if(res.code == '20000'){
            this.temp = res.data.data;  //获取展示的数据
          }
          setTimeout(() => {
            this.listLoading = false;
          }, 1.5 * 1000)
      })
    },
    //通过功能
    handlePass(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogPassVisible = true; //通过弹层的显示
    },
    //通过提交
    passData(){
      const tempData = Object.assign({}, this.temp);
      approveFirstPass({appId:tempData.id,loanId:tempData.loan_id}).then(res => {
        if(res.code =='20000'){
          this.dialogPassVisible = false;  //弹层隐藏
          this.getList(); //调用查询接口
          this.$notify({
            title: '初审通过',
            message: '初审通过',
            type: 'success',
            duration: 2000
          })
        }
      })
        
    },
    //拒绝功能
    handleRefuse(row){
      this.temp = Object.assign({}, row) // copy obj
      this.dialogRefuseVisible = true; //弹层的显示
    },
    //拒绝提交
    RefuseData(){
      const tempData = Object.assign({}, this.temp);
        approveFirstReject({appId:tempData.id,loanId:tempData.loan_id}).then(res => {
          if(res.code =='20000'){
            this.getList();//调用查询接口
              this.dialogRefuseVisible = false;  //弹层隐藏
              this.$notify({
                title: '初审拒绝',
                message: '初审拒绝',
                type: 'success',
                duration: 2000
              })
            }
        })
    },
    
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    }
  }
}
</script>
