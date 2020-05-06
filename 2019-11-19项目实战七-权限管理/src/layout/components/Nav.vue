<template>
    <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item,i) in items" :key="i">
            {{item.meta.title}}
          </el-breadcrumb-item>
      </el-breadcrumb>  

    <!-- 右侧下拉 -->
    <div class="right-dropdown">
      <el-dropdown>
        <span class="el-dropdown-link">
          退出<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
    </div>  
</template>

<script>
export default {
  data () {
    return {
      items:[]
    }
  },
  methods:{
    getRouter(){
      //this.$route.matched  包含当前匹配的路由中所有对应的配置参数对象
      console.log(this.$route.matched);
      // this.items = this.$route.matched;
      var tmp = null;
      this.items = this.$route.matched.filter(v=> {
        if (v.meta && v.meta.title && tmp != v.meta.title){
        tmp = v.meta.title;
          return true;
        }
      });
      console.log(this.items);
    },
     logout(){
       this.$store.dispatch('Logout')
        .then(d=>{
          this.$router.push('/login');
        })
        .catch(error=>{

        })
     }
    
  },
  created(){
    this.getRouter();
  },
  watch:{
    $route(to,from) {  //监听路由变化
      this.getRouter();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.right-dropdown {
  float:right;
}
</style>
