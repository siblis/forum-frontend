<template>
  <div class="container">
    <router-link to="/add-new-post" tag="button" class="createNewBtn">Создать тему</router-link>
    <paginate
      name="itemPages"
      :list="items"
      :show-step-links="true"
      :per="5">
      <div v-for="item in paginated('itemPages')" v-bind:key="item.id" class="post_unit">
        <div>
          <router-link to="/forum-item" ><h3>{{item.title}}</h3></router-link>
          <p v-if="item.tags" class="tags">{{item.tags.join()}}</p>
          <p v-if="item.username" class="author">Автор поста: {{item.username}}</p>
        </div>
        <div>
          <p v-if="item.commentsCount" class="comments_count">Всего комментариев: {{item.commentsCount}} </p>
        </div>
      </div>
    </paginate>

    <paginate-links :show-step-links="true" :limit="4"
          for="itemPages"></paginate-links>
  </div>
</template>

<script>
  export default {
    name: 'ForumList',
    data() {
      return {
        paginate: ['itemPages'],
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

  .paginate-links
    display: flex
    list-style-type: none
    & /deep/ li
      display: inline
      padding: 10px
      margin: 5px
      cursor: pointer
      border: 1px solid #666
      &.active
        background-color: gray
        opacity: 0.7

  .createNewBtn
    transition: background-color .2s,opacity .2s
    display: inline-block
    margin-top: 10px
    margin-left: 40px // временно
    padding: 6px 12px
    text-align: center
    font-weight: 400
    border: none
    border-radius: 4px
    box-shadow: none
    background: #08d092
    color: #fff
    line-height: 1.42857
    cursor: pointer
    &:hover
      background: #09df9c
      outline: none
    &:active
      background: #07c188
      outline: none
      box-shadow: inset 0 3px 5px rgba(0,0,0,.125)
</style>
