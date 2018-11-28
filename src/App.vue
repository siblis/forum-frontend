<template>
  <div>
    <!--header-->
    <router-view></router-view>
    <!--footer-->
  </div>
</template>

<script>
  export default {
    name: 'app',
    data: () => {
      return {
      }
    }
  }
</script>

<style>
  #app {
    color: #2c3e50;
  }
</style>
