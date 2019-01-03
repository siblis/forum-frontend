<template>
  <div class="container">
      <forum-header class="header"></forum-header>
      <router-view class="main-app-content"></router-view>
      <forum-footer class="footer"></forum-footer>
  </div>
</template>

<script>
  import FooterForum from "@/components/FooterForum";
  import HeaderForum from "@/components/HeaderForum";
  import {PROFILE_TRY_TO_LOAD} from './store/actions';

  export default {
    name: 'app',
    components: {
      'forum-footer': FooterForum,
      'forum-header': HeaderForum
    },
    data: () => {
      return {}
    },
    created() {
      // если в хранилище есть токен и профиль отсутствует,
      // будет произведена попытка получить профиль с сервера
      this.$store.dispatch(PROFILE_TRY_TO_LOAD);
    }
  }
</script>

<style lang="sass">
  @import './assets/style.sass'
</style>
