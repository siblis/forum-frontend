<template>
  <div>
    <h3>all pages</h3>
    <div class="links">
      <router-link to="/profile">Перейти к ForumAccount</router-link>
      <!--<router-link to="/posts/70">Перейти к ForumItem</router-link>-->
      <router-link to="/forum">Перейти к ForumList</router-link>
      <router-link to="/signup">Перейти к Registration</router-link>
      <router-link to="/login">Перейти к LogIn</router-link>
      <router-link to="/create-post">Перейти к AddNewPost</router-link>
      <router-link to="/ui-kit">Перейти к UI-kit</router-link>
      <router-link to="/404">Перейти к Page404</router-link>
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
