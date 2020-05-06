<template>
<div>
  <button @click="childChange()">显示子组件</button>
  <!-- <mychild :show="childshow"  @hidechild="v=>childshow=v"/>  -->
    <!-- 简化了父子组件传参的过程 -->
  <mychild  :show.sync= "childshow"/> 
</div>
</template>

<script>
import mychild from './child' 

export default {
  data(){
    return {
      childshow:false
    }
  },
  components:{
    mychild
  },
  methods:{
    childChange(){
      this.childshow=true;
    },
  }
}
</script>
