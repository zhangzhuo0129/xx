<template>
  <div>
      <el-container>
        <el-aside width="200px">
            <!-- 左侧导航 -->
            <Sidebar />
        </el-aside>
        <el-container>
            <el-header>
                <!-- 面包屑 -->
                <Nav />
            </el-header>
            <el-main>
                <!-- 右侧主内容 -->
                <Main />
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import {Sidebar,Nav,Main} from './components'
// import Sidebar from './components/Sidebar';
// import Nav from './components/Nav';
// import Main from './components/Main';

export default {
  data () {
    return {
      
    }
  },
  components:{
      Sidebar,
      Nav,
      Main
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">

// .el-header, .el-footer {
//     background-color: #B3C0D1;
//     color: #333;
//     text-align: center;
//     line-height: 60px;
//   }
  
//   .el-aside {
//     background-color: #D3DCE6;
//     color: #333;
//     text-align: center;
//     line-height: 200px;
//   }
  
//   .el-main {
//     background-color: #E9EEF3;
//     color: #333;
//     text-align: center;
//     line-height: 160px;
//   }
  
//   body > .el-container {
//     margin-bottom: 40px;
//   }
  
//   .el-container:nth-child(5) .el-aside,
//   .el-container:nth-child(6) .el-aside {
//     line-height: 260px;
//   }
  
//   .el-container:nth-child(7) .el-aside {
//     line-height: 320px;
//   }
</style>
