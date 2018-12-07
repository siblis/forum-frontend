
<template>
  <div>
    <!--header-->
    <router-view></router-view>
    <forum-footer></forum-footer>
  </div>
</template>

<script>
  import FooterForum from "@/components/FooterForum";
  export default {
    name: 'app',
    components: {
      'forum-footer': FooterForum
    },
    data: () => {
      return {
      }
    }
  }
</script>

<style lang="sass">
  @import './assets/style.sass'
</style>
