<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
p,ul,li,a,h4{
  margin: 0;
  padding: 0;
  list-style: none;
}
body,html{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 0.3rem;
}
body {
  background: #f5f5f5;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
