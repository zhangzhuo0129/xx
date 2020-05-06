<template>
<div v-show="show">
  我是子组件
  <button @click="childhanlde">隐藏</button>
</div>
</template>

<script>

export default {
  data(){
    return {
      
    }
  },
  props:['show'],
  methods:{
    childhanlde(){
      //emit 函数名的格式   'update:show'  update事件的类型   show 父传子props的值
      this.$emit('update:show',false)
    }
  }
}
</script>
