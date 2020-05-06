<template>
  <div id="addition">
      <p>商品管理 -- 添加商品</p>
      <div>
          <div>商品名称
          <el-input
            :placeholder="data.name"
            v-model="input"
            :value="data.name"
            clearable style="width:300px; margin-left:20px;">
          </el-input>
          </div>
          <div>商品详述
          <el-input
            :placeholder="data.subtitle"
            v-model="subtitle"
            :value="data.subtitle"
            clearable style="width:300px; margin-left:20px;">
          </el-input></div>
          <div>所属分类 
              <template >
                <el-select placeholder="请选择" value=" " style="margin:0 20px">
                    <el-option value=" " >
                    </el-option>
                </el-select>
                <el-select placeholder="请选择" value=" ">
                    <el-option value=" ">
                    </el-option>
                </el-select>
                </template>
        </div>
        <div>商品价格
          <template style="margin-left:20px">
            <el-input-number v-model="price" controls-position="right" @change="handleChange" :min="1" :max="800"></el-input-number>
          </template>
        </div>
        <div>商品库存
            <template style="margin-left:20px">
            <el-input-number v-model="stock" controls-position="right" @change="handleChange" :min="1" :max="800"></el-input-number>
          </template>
        </div>
        <div>
            商品图片
            <img :src="data.imageHost+data.mainImage" alt="" width="78px" style="margin-left:20px">
            <form name="form2" action="/manage/product/upload.do" method="post"  enctype="multipart/form-data">
                <input type="file" name="upload_file">
            </form>
        </div>
        <div>
            商品详情
            <!-- <div v-html="data.detail"></div> -->
        </div>
        <div>
          <template>
          <quill-editor 
            v-model="content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            >
          </quill-editor>
      </template> 
        </div>
        
        <el-button type="primary" @click="submit()">提交</el-button>
      </div>
  </div>
</template>

<script>
import {modification} from '../router/packaging.js'
export default {
    name:'addition',
    data(){
      return{
        data:"",
        input:"",
        subtitle:"",
        price:"",
        stock:"",
        content:"",
        categoryId:"",
        editorOption:{},
        mainImage:"",
        subImages:""
      }
    },
    methods:{
        handleChange(value) {
        console.log(value);
      },
      async submit(){
        const res = await modification({
            categoryId:1,
            name:this.input,
            subtitle:this.subtitle,
            subImages:this.subImages,
            detail:this.content,
            price:this.price,
            stock:this.stock,
            status:1,
          })
        console.log(res)
        if(res.data.status==0){
            this.$confirm(res.data.data, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            //   this.$router.push("/home/commodity")
            }).then(() => {
                this.$router.push("/home/commodity")
            })
        }else{
            this.$confirm(res.data.data, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
        }
        
      },
    }
}
</script>

<style lang="scss">
    #addition{
        width: 100%;
        height: 100%;
       >p{
            font-size: 35px;
        }
        >div{
            box-sizing: border-box;
            padding: 50px;
            >div{
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                >p{
                    width: 385px;
                    min-height: 34px;
                    box-sizing: border-box;
                    padding-top: 7px;
                    padding-bottom: 7px;
                    margin-bottom: 0;
                    background: #fefefe;
                    padding-left: 10px;
                    margin-left: 20px;
                }
            }
        }

        .quill-editor{
          background: white;
        }
        .ql-container{
          height: 300px;
        }
  }
</style>