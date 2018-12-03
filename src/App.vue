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

<style lang="sass">
  @import 'assets/style.sass'
</style>
