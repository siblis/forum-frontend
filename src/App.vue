
<template>
  <div class="container-fluid">
    <forum-header></forum-header>
    <router-view></router-view>
    <forum-footer></forum-footer>
  </div>
</template>

<script>
  import FooterForum from "@/components/FooterForum";
  import HeaderForum from "@/components/HeaderForum";
  export default {
    name: 'app',
    components: {
      'forum-footer': FooterForum,
      'forum-header': HeaderForum
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
