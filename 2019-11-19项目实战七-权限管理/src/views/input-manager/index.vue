<template>
  <div>
    <!-- 模糊查询 -->
      <div>
        <el-input v-model="query.name" placeholder="请输入查询用户名" @input="getList()"></el-input>
        <!-- <el-button type="success" @click="getList()">搜索</el-button> -->
      </div>
      <el-table
        :data="lists"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          fixed
          width="100">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="180">
          <template slot-scope='scope'>
            <span>{{scope.row.birthday |getDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="education"
          label="学历">
          <template slot-scope='scope'>
            <span>{{scope.row.education |getEducation}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
          <template slot-scope='scope'>
            <span>{{scope.row.sex |getSex}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="申请状态"
          width="100">
          <template slot-scope='scope'>
            <el-tag :type="scope.row.status |statusTypeFilter">
              {{scope.row.status |statusFilter}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300">
          <template slot-scope='{row}'> 
            <el-button type="primary" @click="edit(row)" :disabled="row.status!=0&&row.status!=3&&row.status!=6">编辑</el-button>
            <el-button type="danger" @click="del(row)" :disabled="row.status!=0&&row.status!=3&&row.status!=6">删除</el-button>
            <el-button type="success" @click="submitToApprove(row)">提交审核</el-button>
          </template>
        </el-table-column>
      </el-table>

    <!-- 编辑弹层 -->
      <el-dialog title="申请管理-编辑" :visible.sync="dialogEditVisible">
        <el-form :model="form">
          <el-form-item label="id" :label-width="formLabelWidth" v-show="false">
            <el-input v-model="form.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" :label-width="formLabelWidth">
             <el-date-picker type="datetime" v-model="form.birthday" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" class="filter-item" placeholder="Please select">
              <el-option v-for="item in sexOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="update()">确 定</el-button>
        </div>
      </el-dialog>

    <!-- 删除弹层 -->
      <el-dialog title="申请管理-删除" :visible.sync="dialogDelVisible">
        <span>确定删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDelVisible = false">取 消</el-button>
          <el-button type="primary" @click="delData()">确 定</el-button>
        </span>
      </el-dialog>
    <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="rows">
      </el-pagination>
  </div>
</template>

<script>
import {loanList,loanUpdate,loanDelete,loanSubmitToApprove} from '@/api/article'
//性别
const sexOptions = [
  { key: 'man', display_name: '男' },
  { key: 'woman', display_name: '女' }
];

export default {
  data () {
    return {
      lists:[],  //数据
      rows:1, //总数量
      pages:1, //总页数
      query:{    
        pageNo:1,  //页码
        pageSize:10,  //条数
        name:''   //查询
      },
      form: {
          id:'',
          name: '',
          sex:''
        },
      formLabelWidth: '120px',
      sexOptions,
      dialogEditVisible:false , //编辑弹层
      dialogDelVisible:false, //删除弹层
    }
  },
  filters:{  //过滤器
    getDate(time){  //日期
      var d = new Date(time);
      var dates = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
      return dates;
    },
    getEducation(type){  //教育
      switch(type){
        case 'highschool':
          return '高中';
        case 'college':
          return '大学';
        default:
          return type;
      }
    },
    getSex(type){  //性别
      switch(type){
        case 'man':
          return '男';
        case 'woman':
          return '女';
        default:
          return type;
      }
    },
    statusFilter(type){ //状态
    //  - 0-默认值进件状态
    //  - 1-提交初审状态
    //  - 2-初审通过状态
    //  - 3-初审拒绝状态
    //  - 4-提交终审状态
    //  - 5-终审通过状态
    // - 6-终审拒绝状态
    // - 7-生成合同状态
    switch(type){
        case 0:
          return '进件';
        case 1:
          return '提交初审';
        case 2:
          return '初审通过';
        case 3:
          return '初审拒绝';
        case 4:
          return '提交终审';
        case 5:
          return '终审通过';
        case 6:
          return '终审拒绝';
        case 7:
          return '生成合同';
        default:
          return type;
      }
    },
    statusTypeFilter(type){ //状态类型
    switch(type){
        case 0:
          return 'danger';
        case 1:
          return 'success';
        case 2:
          return 'success';
        case 3:
          return 'danger';
        case 4:
          return 'success';
        case 5:
          return 'success';
        case 6:
          return 'danger';
        case 7:
          return 'info';
        default:
          return type;
      }
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    getList(){
      loanList(this.query).then(res=>{
            console.log(res);
            if(res.code =='20000'){
                 this.lists = res.data.data.data;//展示数据
                 this.pages = res.data.data.pages; //总页数
                 this.rows = res.data.data.rows; //总的数量
            }
           
          })
    },
    //编辑数据的获取
    edit(row){
      this.dialogEditVisible = true; //弹层显示
      this.form = Object.assign({},row);
    },
    //编辑提交数据
    update(){
      loanUpdate(this.form).then(res=>{
          console.log(res);
          if(res.code =='20000'){
              this.getList();//重新调用查询接口
                this.dialogEditVisible = false; //弹层隐藏
                this.$notify({
                  title: '编辑成功',
                  message: '编辑成功',
                  type: 'success',
                  duration: 2000
                }) 
          }
        })
    },
    //删除数据
    del(row){
        this.form = Object.assign({},row);
        this.dialogDelVisible = true; //弹层显示
    },
    //删除弹层
    delData(){
      console.log(this.form.id)
      loanDelete({id:this.form.id}).then(res=>{
          console.log(res);
          if(res.code =='20000'){
              this.getList();//重新调用查询接口
                this.dialogDelVisible = false; //弹层隐藏
                this.$notify({
                  title: '删除成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                }) 
          }
        })
    },
    //提交审核 
    submitToApprove(row){
      loanSubmitToApprove({id:row.id}).then(res=>{
          console.log(res);
          if(res.code =='20000'){
              this.getList();//重新调用查询接口
                this.$notify({
                  title: '提交成功',
                  message: '提交成功',
                  type: 'success',
                  duration: 2000
                }) 
          }
        })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.query.pageSize = val ||this.query.pageSize;
      this.getList();//重新调用查询接口
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.query.pageNo = val ||this.query.pageNo;
      this.getList();//重新调用查询接口
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">


</style>
