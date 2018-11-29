<template>
  <div class="container">
    <div v-for="item in items" v-bind:key="item.id" class="post_unit">
      <div>
        <h3>{{item.title}}</h3>
        <p v-if="item.tags" class="tags">{{item.tags.join()}}</p>
        <p v-if="item.username" class="author">Автор поста: {{item.username}}</p>
      </div>
      <div>
        <p v-if="item.commentsCount" class="comments_count">Всего комментариев: {{item.commentsCount}} </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ForumList',
    data() {
      return {
        items: [],
      }
    },
    mounted() {
      this.axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          this.items = response.data.map(item => {
            item.username = 'name';
            item.tags = ['tag1', 'tag2'];
            item.commentsCount = 10;
            return item;
          });
        });
    },
    props: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  .container
    margin: 0 auto
    color: darkslategray

  .post_unit
    display: flex
    justify-content: space-between
    padding: 15px
    line-height: 6px
    border-top: 1px solid darkgray
    &:last-child
      border-bottom: 1px solid darkgray

  .tags
    color: gray
    opacity: 0.7

  .comments_count
    text-align: center
</style>
