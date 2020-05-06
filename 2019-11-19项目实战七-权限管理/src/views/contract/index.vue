<template>
  <div class="app-container">
    <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      prop="loan_name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="loan_card"
      label="身份证号码"
     >
    </el-table-column>
    <el-table-column
      prop="file_path"
      label="合同状态"
     >
     <template slot-scope="{row}">
          <el-tag  :type="row.file_path |statusTypeFilter" >  
            {{ row.file_path |statusFilter}}
          </el-tag>
        </template>
    </el-table-column>
    <el-table-column label="操作" width="300">
      <template slot-scope="{row}">
        <el-button
          size="mini" type="primary" @click="handleCreate(row)" :disabled="row.file_path"
          >生成合同</el-button>
         <el-button
          size="mini"
          type="danger"  @click="handleDownload(row)" :disabled="!row.file_path"
          >下载合同</el-button>
          
      </template>
    </el-table-column>
  </el-table>

    <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

  </div>
</template>

<script>
import { contractList ,contractCreateFile, contractDownload } from '@/api/article'
import { getToken} from '@/utils/cookie'

export default {
  name: 'ComplexTable',
  data() {
    return {
      list: [],
      total: 0, //总数量
      pages:1,//总页数
      listQuery: {
        pageNo: 1, //当前页码
        pageSize: 10,//条数
        name: '',//查询条件-姓名
      },
      dialogPassVisible:false, //通过弹层
    }
  },
   filters: {
    statusFilter(type) {  //合同状态
        if(type){
          return "已生成合同"
        }else {
          return "未生成合同"
        }
    },
    statusTypeFilter(type) {  //状态样式 
        if(type){
            return "success"
          }else {
            return "primary"
          }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true;
      contractList(this.listQuery).then(res => {
        //console.log(this);
        if(res.code == '20000'){
            this.list = res.data.data.data;  //获取展示的数据
            this.total = res.data.data.rows; //获取总数量
            this.pages = res.data.data.pages; //获取总页数
        }
      })
    },
    //当前条数变化
    handleSizeChange(val) {
      this.listQuery.pageSize = val || this.listQuery.pageSize;
      this.getList();
    },
    //当前页变化
    handleCurrentChange(val) {
      this.listQuery.pageNo = val || this.listQuery.pageNo;
      this.getList();
    },
    //生成合同
    handleCreate(row){
      contractCreateFile({id:row.id}).then(res => {
          //alert(res);
          if(res.code =='20000'){
            this.getList();//调用查询接口
              this.$notify({
                title: '生成合同',
                message: '生成合同提交成功',
                type: 'success',
                duration: 2000
              });
            }
        })
    },
    //下载合同
    handleDownload(row) {
      contractDownload({id:row.id}).then(res => {
          //alert(res);
          if(res.code =='20000'){
              this.$notify({
                title: '下载合同',
                message: '下载合同提交成功',
                type: 'success',
                duration: 2000
              });
              this.downloadUrlFile(this.url+res.data.url);
            }
        })
    },
    downloadUrlFile(url) {
      const xhr = new XMLHttpRequest();  //调用XHR  通过请求获取数据流
      xhr.open('GET', url, true);
      xhr.withCredentials = true;  //允许携带cookie
      xhr.responseType = 'blob';  //响应类型  blob字节流
      xhr.setRequestHeader('token', getToken());  //传入token
      xhr.onload = () => {
        if (xhr.status === 200) {
          // 获取图片blob数据并保存   responseURL
          var filename = xhr.responseURL.substring(xhr.responseURL.lastIndexOf("/")+1);
          this.saveAs(filename, xhr.response);
        }
      };
      xhr.send();  //发送
    },
    saveAs(name, data) {
        var urlObject = window.URL;  //window对象的URL对象是专门用来将blob或者file读取成一个url的。
        var export_blob = new Blob([data]); //代表二进制类型的大对象,就是Blob对象是二进制数据
        var save_link = document.createElement('a');//创建a标签
        save_link.href = urlObject.createObjectURL(export_blob); //通过URL.createObjectURL(blob)可以获取当前文件的一个内存URL
        //download是 HTML5 中<a>标签新增的一个属性，此属性会强制触发下载操作，指示浏览器下载 URL 而不是导航到它，并提示用户将其保存为本地文件
        save_link.download = name;
        save_link.click();//触发a标签单击
    }
  }
}
</script>
