<template>
  <div class="manage">
    <el-container >
      <el-aside width="260px" style="background-color:#2b2e33;">
        <el-menu :default-openeds="['1','2','3']" :router="true"> 
          <router-link class="sy" to="/home/page"><i class="el-icon-menu"></i>首页</router-link>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>数据管理
            </template>
            <el-menu-item index="/home/commodity">商品管理</el-menu-item>
            <el-menu-item index="/home/category">品类管理</el-menu-item>
          </el-submenu>


          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-plus"></i>订单
            </template>
            <el-menu-item index="/home/order">订单管理</el-menu-item>
          </el-submenu>


          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-star-on"></i>用户
            </template>
            <el-menu-item index="/home/user">用户管理</el-menu-item>
          </el-submenu>


        </el-menu>
      </el-aside>


      <el-container class="cont" style="height:100%;">

        <heads></heads>
        <router-view></router-view>
        
      </el-container>
    </el-container>
  </div>
</template>

<script>
import heads from '@/components/heads'
export default {
  name: "manage",
  components:{heads}
};
</script>

<style lang="scss">
.manage{
    width: 100%;
    height: 100%;
    background: #f3f3f3;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    
  }
.el-aside {
  // height: 100%;
      background: #2b2e33;
    color: #333;
}
.el-submenu__title{
        background: #2b2e33;
    color: #bfcbd9;
}
.el-container{
  border: 0;
  width: 100%;
  height: 100%;
  // flex-direction: column;
}
.cont{
  // width: 100%;
  // height: 100%;
  // display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;

  background: #f3f3f3;
}
.el-submenu__title:hover{
  background: #48576A;
}
// .el-menu-item{
//     background: #324057;
// }
.el-menu-item{
        background: #2b2e33;
    color: #bfcbd9;
}
.el-menu-item:hover{
  background: #48576A;
}
.is-active{
    color: #1f62e0;
        background: #2b2e33;
}
.sy{
    height: 56px;
    font-size: 14px; 
    color: #bfcbd4;
    padding: 0 24px;
    box-sizing: border-box;
    background: #324157;
    display: flex;
    align-items: center;
        background: #2b2e33;
    >i{
      font-size: 18px;
      margin-right: 6px;
    }

}
.sy:hover{
  background: #48576A;
}
.el-submenu__title i{
  color: #bfcbd9;
}
.router-link-active{
  color: #1f62e0;
}
</style>