<template>
  <div id="mmall">
        <el-row :gutter="10" style="margin:0">
          <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="24" class="col">
            <div class="grid-content bg-purple-light">
              <p>欢迎登录 - MMALL管理系统</p>
              <div>
                <el-input
                  placeholder="请输入内容"
                  v-model="input"
                  clearable>
                </el-input>
                <el-input placeholder="请输入密码" v-model="input2" show-password></el-input>
                <el-button type="primary" width="100%" @click="login()">登录</el-button>
              </div>
            </div>
            </el-col>
        </el-row>
     <p>{{this.$store.state.userToken}}</p>   
        <!-- {{this.$store.state.name}} -->
  </div>
</template>

<script>
export default {
  name:'mmall',
  data(){
    return{
      input:'',
      input2:''
    }
  },
  methods:{
    login(){
      // console.log(this.input,this.input2)
      this.$axios.post("/api/user/login.do?username="+this.input+"&password="+this.input2).then((data)=>{
        console.log(data.data)
        if(data.data.status==0){
          this.$message({
          message: data.data.msg,
          type: 'success'
        });
        this.$router.push('/home/page')
        }else{
          this.$message.error(data.data.msg);
        }
      })
    }
  } 
}
</script>

<style lang="scss">
  #mmall{
    width: 100%;
    height: 100%;
    background: #f3f3f3;
  }
  .el-row{
    margin: 0;
    padding: 0;
  }
  .col {
    border-radius: 4px;
    // position: relative;
    margin-top: 10%;
    margin-left: 33.33%;
  }
  .grid-content {
    width: 100%;
    // height: 100%;
    border-radius: 4px;
    min-height: 200px;
    background: white;
    >p{
      padding: 15px 0 0 15px;
    }
    >div{
      width: 93.3%;
      min-height: 144px;
      // box-sizing: border-box;
      padding: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .el-button{
        background-color: #337ab7;
        border-color: #2e6da4;
        padding: 10px 16px;
      }
    }
  }
</style>