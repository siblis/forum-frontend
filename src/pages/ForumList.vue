<template>
  <div class="row between-md top-xs">
    <div class="col-xs-12 col-md-8">
      <router-link to="/create-post" tag="button" class="button button-main" v-show="isLoggedIn">Добавить тему +
      </router-link>
      <h2 class="header-of-list">Список тем</h2>
      <div v-for="item in items" :key="item.id" class="post_unit row around-xs middle-xs">
        <div class="list-of-topics col-xs-9 col-sm-10">
          <router-link :to="{name: 'posts', params: {postId:item.id}}"><h4 class="header-of-topic">{{item.title}}</h4>
          </router-link>
          <div class="topic-params row">
            <div v-if="item.tags" class="col-xs-12">
              <div class="row tags-row">
                <i class='icon-label'></i>
                <a href="#" class="tags" v-for="(tag, i) in item.tags.split(',')" :key="i">{{ tag }}</a>
              </div>
            </div>
            <div v-if="item.created_at" class="commentTime col-xs-12 col-sm-6 col-lg-4">
              <i class='icon-clock'></i> {{[item.created_at, "YYYY-MM-DD HH:mm:ss"] | moment("from") }}
            </div>
            <div class=" col-xs-12 col-sm-6 col-lg-4">
              <i class='icon-eye'></i> {{item.views || 0}} {{ item.views | pluralize( ['просмотр', 'просмотра',
              'просмотров']) }}
            </div>
          </div>
        </div>
        <div class="col-xs-3 col-sm-2">
          <p class="comments_count">{{item.comments}} </p>
          <p class="comments_count">{{ item.comments | pluralize( ['ответ', 'ответа', 'ответов']) }}</p>
        </div>
      </div>
      <div class="paginator">
        <button class="button paginate-links" v-on:click="prevPage" :disabled="page === 1">
          <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.18333 1.175L2.35833 5L6.18333 8.825L5 10L0 5L5 0L6.18333 1.175Z" fill="#4D4D4D"/>
          </svg>
        </button>
        <button class="button paginate-links" v-for="(pageNumber,index) in pagesList"
                :key="index" v-on:click="changePage(pageNumber)"
                v-bind:class="{ active: page === pageNumber }"
                :disabled="pageNumber === '...' || page === pageNumber">{{pageNumber}}
        </button>
        <button class="button paginate-links" v-on:click="nextPage" :disabled="page >= numberOfPage">
          <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.816667 1.175L4.64167 5L0.816667 8.825L2 10L7 5L2 0L0.816667 1.175Z" fill="#4D4D4D"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="topic-block col-xs-12 col-md-4">
      <h2 class="header-of-best-topics">Лучшие темы</h2>
      <div v-for="bestItem in bestItems" :key="bestItem.id">
        <div class="best-topic row">
          <div class="userImg">{{bestItem.username[0].toUpperCase()}}</div>
          <p
            @click="() => linkToTopic(bestItem.id)"
            class="new-topic-name col-xs">
            {{bestItem.title}}
          </p>
          <div class="best-topic-props col-xs-2">
            <p>{{bestItem.comments}}</p>
            <p>{{ bestItem.comments | pluralize( ['ответ', 'ответа', 'ответов']) }}</p>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'ForumList',
    props: ['query'],
    data() {
      return {
        userSearch: '',
        page: 1,
        total: 0,
        items: [],
        bestItems: [],
        userId: '',
        pagesList: [],
        user: '',
        comments: '',
        tags: ''
      }
    },
    mounted: function () {
      this.page = parseInt(this.$route.query.page || 1);
      this.loadPosts();
    },
    watch: {
      '$route'(to, from) {
        this.userSearch = to.params.query;
        this.loadPosts();
        this.$store.dispatch(TOPIC_LOAD, to.params.postId);
      }
    },
    methods: {
      loadPosts() {
        if (this.userSearch) {
          this.axios.get('http://api.forum.pocketmsg.ru/search/' + this.userSearch)
            .then(response => {
              this.items = response.data.Posts.data;
              this.total = response.data.Posts.total;
              this.pagination();
            })
            .catch(error => alert(error));
        } else {
          this.axios.get('http://api.forum.pocketmsg.ru/posts?page=' + this.page)
            .then(response => {
              this.items = response.data.data;
              this.total = response.data.total;
              this.pagination();
            })
            .catch(error => alert(error));
        }

        this.axios.get('http://api.forum.pocketmsg.ru/best-posts')
          .then(response => {
            this.bestItems = response.data.data.filter((item) => {
              return item.id !== parseInt(this.postId);
            });
            this.bestItems.sort(this.bestItems.comments);
            this.bestItems.length = 15;
            console.log(response)
          })
          .catch(error => alert(error));
      },

      changePageUrl(newPage) {
        this.$router.push({name: 'home', query: {page: newPage}});
      },
      nextPage() {
        this.page += 1;
        this.changePageUrl(this.page);
        this.loadPosts();

      },
      prevPage() {
        if (this.page > 1) {
          this.page -= 1;
          this.changePageUrl(this.page);
          this.loadPosts();
        }
      },
      changePage(page) {
        this.page = page;
        this.changePageUrl(this.page);
        this.loadPosts();
      },
      pagination() {
        let current = this.page,
          last = this.numberOfPage,
          delta = 2,
          left = current - delta,
          right = current + delta + 1,
          range = [],
          rangeWithDots = [],
          l;

        for (let i = 1; i <= last; i++) {
          if (i === 1 || i === last || i >= left && i < right) {
            range.push(i);
          }
        }

        for (let i of range) {
          if (l) {
            if (i - l === 2) {
              rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
              rangeWithDots.push('...');
            }
          }
          rangeWithDots.push(i);
          l = i;
        }
        this.pagesList = rangeWithDots;
      },

      linkToTopic(postId) {
        this.$router.push({name: 'posts', params: { postId }})
      }
    },
    computed: {
      numberOfPage: function () {
        return Math.ceil(this.total / 15);
      },
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      },
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import "../assets/variables"
  $topic_params_color: #4D4D4D
  $xs: 320px
  $sm: 768px
  $md: 1024px

  .button-main
    margin: 25px 25px 0 25px

  .header-of-list
    margin-left: 50px
    margin-top: 25px

  .post_unit
    line-height: 6px
    border-bottom: 1px solid darkgray
    padding: 1px
    .list-of-topics
      padding-top: 15px
      padding-left: 40px
      a
        text-decoration: none
      .header-of-topic
        text-overflow: ellipsis
        overflow: hidden
        width: 100%
        line-height: 22px
        white-space: nowrap
      .topic-params
        margin-bottom: 15px
        margin-top: 0
        .tags-row
          margin-top: 0
          .tags
            text-transform: uppercase
            opacity: 1
            line-height: 120%
            &:hover
              opacity: 0.5
            &:not(:last-child)
              margin-right: 1px
              &:after
                content: ","
      div
        display: flex
        align-items: center
        margin-top: 15px
        color: $topic_params_color
      i
        margin-right: 5px
        vertical-align: middle
        opacity: 1
    .comments_count
      text-align: center
      font-weight: bold
      font-size: 18px

  .paginator
    margin: 35px 20px 40px 50px
    .paginate-links
      background-color: $button_default_color
      margin-right: 5px
      cursor: pointer
      border-radius: 5px
      border-color: $button_default_color
      width: 30px
      height: 30px
      &:disabled
        background-color: $button_default_color
        opacity: 0.7
      &.active
        background-color: $button_main_big_color
        border-color: $topic_params_color
        cursor: default

  .list-of-topics,
  .post_unit
    @media (min-width: $xs) and (max-width: $sm)
      padding-left: 7px
    @media (min-width: $sm + 1px)
      padding-left: 25px

  .invisible
    display: none
    margin-bottom: 0

  .topic-block
    padding: 13px 12px 0 12px
    background-color: $topic_block_background
    .header-of-best-topics
      font-size: 20px
      font-weight: bold
      line-height: 23px
      padding-bottom: 15px

    *
      margin: 0
      padding: 0
      background-color: $aside_background_color

    div, a
      font-size: $medium_font_size
      font-weight: normal
    .best-topic
      margin-bottom: 24px
    .userImg
      height: 32px
      border-radius: 50%
      width: 32px
      background-color: $light_background_color
      text-align: center
      line-height: 32px
      margin-right: 6px
      margin-bottom: 8px

    .best-topic-name
      padding-top: 5px
      text-decoration: none
      &:hover
        opacity: 0.5
    .best-topic-props
      text-align: center
      margin-right: 10px


</style>
