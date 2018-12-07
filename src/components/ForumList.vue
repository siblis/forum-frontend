<template>
  <div class="row between-md top-xs">
    <div class="col-xs-12 col-md-9 col-lg-9">
      <router-link to="/create-post" tag="button" class="button button-main">Добавить тему +</router-link>
      <h2 class="header-of-list">Список тем</h2>
      <paginate
        name="itemPages"
        :list="items"
        :show-step-links="true"
        :per="7">
        <div v-for="item in paginated('itemPages')" v-bind:key="item.id" class="post_unit row around-xs middle-xs">
          <div class="list-1 list-of-topics col-xs-12 col-sm-8">
            <router-link to="/topic"><h4 class="header-of-topic">{{item.title}}</h4></router-link>
            <div class="topic-params row">
              <span v-if="item.tags" class="tags col-xs-6 col-lg-3"><nobr><i class='icon-label'></i> {{item.tags.join()}}</nobr></span>
              <span v-if="item.commentTime" class="commentTime col-xs-6 col-lg-3"><nobr><i class='icon-clock'></i> {{item.commentTime}} минут назад</nobr></span>
              <span v-if="item.watchCount" class="watchCount col-xs-6 col-lg-3"><nobr><i class='icon-eye'></i> {{item.watchCount}} просмотров</nobr></span>
              <span class="watchCount col-xs-6 col-lg-3"><nobr><i class='icon-speak'></i> Ответить</nobr></span>
            </div>
          </div>
          <div class="list-2 col-xs-6 col-sm-2">
            <span class="watchNewCount"><i class='icon-speak' style="font-size: 1.5em"></i> Ответить</span>
          </div>
          <div class="list-3 col-xs-6 col-sm-2">
            <p v-if="item.commentsCount" class="comments_count">{{item.commentsCount}} </p>
            <p class="comments_count">ответов</p>
          </div>
        </div>
      </paginate>
      <paginate-links :show-step-links="true" :limit="4" for="itemPages">
      </paginate-links>
    </div>
    <div class="topic-block col-xs-12 col-md-3">
      здесь будет контент
    </div>
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
            item.commentTime = 5;
            item.watchCount = 25;
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
  @import "../assets/variables.sass"
  $topic_params_color: #4D4D4D
  $sm: 768px
  $md: 1024px

  .button-main
    margin: 23px 25px

  .header-of-list
    margin-left: 50px

  .post_unit
    line-height: 6px
    border-bottom: 1px solid darkgray
    padding: 1px
    .list-of-topics
      padding-top: 15px
      a
        text-decoration: none
      .header-of-topic
        text-overflow: ellipsis
        overflow: hidden
        width: 100%
        line-height: 18px
        white-space: nowrap
      .topic-params
        margin-bottom: 15px
        .tags
          text-transform: uppercase
      span
        display: flex
        align-items: center
        margin-top: 15px
        color: $topic_params_color
      i
        margin-right: 5px
    .watchNewCount
      color: $base_font_color
      font-size: 16px
      font-weight: 500
    .comments_count
      text-align: center
      font-weight: bold
      font-size: 18px

  .paginate-links
    display: flex
    list-style-type: none
    & /deep/ li
      background-color: $button_default_color
      width: 26px
      line-height: 26px
      margin: 5px
      cursor: pointer
      text-align: center
      border-radius: 5px
      &.active
        background-color: $button_main_big_color
        a
          background-color: $button_main_big_color
          border-color: $base_font_color
      a
        background-color: $button_default_color
        display: block
        text-align: center
        height: 100%
        border: 1px solid $button_default_color
        border-radius: 5px

  .topic-block
    background-color: $topic_block_background
    width: 100%
    padding: 200px 0
    text-align: center

  .list-of-topics,
  .paginate-links
    @media (min-width: 320px) and (max-width: 768px)
      padding-left: 0
    @media (min-width: 769px)
      padding-left: 70px
</style>
