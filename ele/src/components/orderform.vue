<template>
  <div id="orderform">
      <Heads>
          <p slot="left"><i class="el-icon-arrow-left" style="font-size:0.5rem"></i></p>
          <p slot="cont" style="font-size:0.4rem; font-weight: 700;">订单列表</p>
          <p slot="right" ></p>
      </Heads>
  </div>
</template>

<script>
import Heads from '@/components/heads'
export default {
    name: 'orderform',
    components:{Heads}
}
</script>

<style lang="scss" >
    #orderform{
        width: 100%;
        height: 100%;
    }
</style>