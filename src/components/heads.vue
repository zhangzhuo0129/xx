<template>
  <div class="heade">
    <el-header style="text-align: right; font-size: 14px">
        <i class="el-icon-user-solid"></i>
      <el-dropdown>
        <span>欢迎，admin
          <i class="el-icon-caret-bottom el-dropdown-selfdefine">
          </i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item > 
            <span @click="del">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "heade",
  methods: {
      del(){
          this.$router.push("/")
      }
  },
};
</script>

<style lang="scss" scoped>
.heade{
  background: white;
}
.el-header {
    width: 100%;
    background: white;
    .el-icon-user-solid{
        margin: 0px;
    }
}
</style>