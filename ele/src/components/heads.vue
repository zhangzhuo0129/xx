<template>
  <div id="heads">
      <slot name="left"></slot>
      <slot name="cont"></slot>
      <slot name="right"></slot>
  </div>
</template>

<script>
export default {
    name: 'heads'
}
</script>

<style lang="scss">
    #heads{
        width: 100%;
        height: 0.95rem;
        background: #3190e8;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 0.2rem;
        align-items: center;
        color: white;
    }
</style>