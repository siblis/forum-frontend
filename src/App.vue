<template>
  <div id="app">
    <Example v-if="page === 'Example'"/>
    <ForumItem v-if="page === 'ForumItem'"/>
    <ForumList v-if="page === 'ForumList'"/>
    <LogIn v-if="page === 'LogIn'"/>
    <Registration v-if="page === 'Registration'"/>
  </div>
</template>

<script>
  import Example from './components/Example.vue'
  import ForumItem from "@/components/ForumItem";
  import ForumList from "@/components/ForumList";
  import LogIn from "@/components/LogIn";
  import Registration from "@/components/Registration";

  export default {
    name: 'app',
    components: {
      Registration,
      LogIn,
      ForumList,
      ForumItem,
      Example
    },
    data: () => {
      return {
        page: 'ForumList'
      }
    }
  }
</script>

<style>
  #app {
    color: #2c3e50;
  }
</style>
