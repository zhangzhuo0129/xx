<template>
  <div id="append">
      <p>品类管理 -- 添加品类</p>
      <div>
          <div>
            所属品类
            <template>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    :value="value">
                    </el-option>
                </el-select>
                </template>
        </div>
        <div>
            品类名称
            <template>
                <el-input
                    placeholder="请输入内容"
                    v-model="input"
                    clearable 
                    style="width:248px">
                    </el-input>
                </template>
        </div>
            <el-button type="primary" @click="present(input)">提交</el-button>
      </div>
    
  </div>
</template>

<script>
import { present } from '../router/packaging.js'
export default {
    name:"append",
    data(){
        return{
            value:"/所有",
            input:""
        }
    },
    methods:{
        async present(inp){
            
            const res = await present({parentId:0,categoryName:inp})
            console.log(res.data)
            if(res.data.status==0){
                this.$alert('添加品类成功', '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                        });
                        this.$router.push('/home/category')
                    }
                });
                
            }else{
                this.$alert('添加品类失败', '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                        });
                    }
                });
            }
        }
    }
}
</script>

<style lang="scss">
    #append{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
        >p{
            font-size: 35px;
        }
        >div{
            box-sizing: border-box;
            padding: 20px 50px;
            >div{
                margin-bottom: 20px;
                .el-input{
                    margin-left: 30px;
                }
            }
        }
    }

</style>