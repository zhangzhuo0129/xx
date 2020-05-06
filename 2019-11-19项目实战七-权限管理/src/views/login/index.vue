<template>
  <div class="login-container">
   <el-form ref="form" :rules="rules" :model="form" label-width="80px">
    <el-form-item label="用户名" prop="account">
      <el-input v-model="form.account" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input  type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">登录</el-button>
    </el-form-item>
  </el-form>

  <!-- <div class="div1">11111
    <div class="div2" >22222
      <div class="div3" >33333</div>
    </div>

    <div class="h1" >22222
      <div class="h2" >33333</div>
    </div>
  </div> -->
  </div>
</template>

<script>
import {login} from '@/api/article'
import {setToken,getToken,removeToken} from '@/utils/cookie'

export default {
  data () {
    return {
      form: {
          account: 'admin',
          password: 'admin@123'
      },
      rules: {   //校验
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('submit!');
            //发送请求
            // this.$http.post("user/login",this.form)
            //   .then(res=>{
            //     console.log(res)
            //     if(res.data.code == '20000'){
            //       this.$router.push('/home')   //跳转
            //       //存储token的值  一种  本地存储    二种 vuex
            //       //cookie
            //       setToken(res.data.data.token);
            //       //storage   localStorage  sessionStorage
            //       //window.sessionStorage.setItem('token',res.data.data.token)
            //     }
            //   }).catch(error=>{

            //   })
            // login(this.form).then(res=>{
            //   console.log(res);
            //   setToken(res.data.token);  //保存token到cookie
            //   this.$router.push('/home')   //跳转
            // })
            this.$store.dispatch('Login',this.form)
              .then(d=>{
                this.$router.push('/home')   //跳转
              })
              .catch(()=>{

              })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
$lightColor:#fff;
$redColor:red;
$darkColor:#000;
$width:600px;
.login-container {
  width:60%;
  margin:0 auto;
  border:1px solid lighten($darkColor,80%);
  padding:20px;
}
.div1 {
  color:lighten($darkColor,80%);
  border:1px solid $darkColor;
  width:$width/2;
  margin-left:10px+10px/2;
  .div2 {
    color:$redColor;
    &.div3 {
      color:$redColor;
    }
  }
  .h1 {
    .h2 {
      
    }
  }
}

</style>
