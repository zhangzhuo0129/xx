<template>
  <div id="particulars">
      <p>商品详情</p>
      <div>
          <div>商品名称<p>{{data.name}}</p> </div>
          <div>商品详述<p>{{data.subtitle}}</p> </div>
          <div>当前状态<p v-show="data.status==2">已下架</p> <p v-show="data.status==1">已上架</p></div>
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
            <el-input
            :placeholder="data.price" style="width:300px; margin-left:20px;">
            </el-input>
        </div>
        <div>商品库存
            <el-input
            :placeholder="data.stock" style="width:300px; margin-left:20px;">
            </el-input>
        </div>
        <div>
            商品图片
            <img :src="data.imageHost+data.mainImage" alt="" width="78px" style="margin-left:20px">
        </div>
        <div>
            商品详情
            <div v-html="data.detail"></div>
        </div>
      </div>
  </div>
</template>

<script>
import {particulars} from '@/router/packaging.js'
export default {
    name:'particulars',
    data(){
        return{
            data:""
        }
    },
    async created(){
        var id = this.$route.params.id
        console.log(id)
        const res = await particulars({productId:id})
        console.log(res.data.data)
        this.data= res.data.data
    }
}
</script>

<style lang="scss">
    #particulars{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 20px;
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
    }
</style>