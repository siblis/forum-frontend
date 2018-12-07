<template>
  <div>
    <h3>all pages</h3>
    <div class="links">
      <router-link to="/forum-account">Перейти к ForumAccount</router-link>
      <router-link to="/forum-item">Перейти к ForumItem</router-link>
      <router-link to="/forum-list">Перейти к ForumList</router-link>
      <router-link to="/registration">Перейти к Registration</router-link>
      <router-link to="/login">Перейти к LogIn</router-link>
      <router-link to="/footer-forum">Перейти к FooterForum</router-link>
      <router-link to="/add-new-post">Перейти к AddNewPost</router-link>
      <router-link to="/ui-kit">Перейти к UI-kit</router-link>
      <router-link to="/header-forum">Перейти к HeaderForum</router-link>
      <router-link to="/page404">Перейти к Page404</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Example',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.links
  display: flex
  flex-direction: column
</style>
