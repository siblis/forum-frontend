<template>
  <div class="row between-md top-xs">
    <div class="col-xs-12 col-md-9 col-lg-9">
      <router-link to="/create-post" tag="button" class="button button-main" v-show="isLoggedIn">Добавить тему +</router-link>
      <h2 class="header-of-list">Список тем</h2>
      <div v-for="item in items" :key="item.id" class="post_unit row around-xs middle-xs">
        <div class="list-of-topics col-xs-12 col-sm-8">
          <router-link :to="{name: 'posts', params: {postId:item.id}}"><h4 class="header-of-topic">{{item.title}}</h4>
          </router-link>
          <div class="topic-params row">
            <!--скрыла, пока не приходят теги-->
            <!--<span v-if="item.tags && item.tags.length" class="tags col-xs-6 col-lg-4">-->
            <!--<nobr><i class='icon-label'></i> {{item.tags.join().replace(/,([^\s])/g, ", $1")}}</nobr>-->
            <!--</span>-->
            <span v-if="item.created_at" class="commentTime col-xs-6 col-lg-4">
              <nobr><i class='icon-clock'></i> {{[item.created_at, "YYYY-MM-DD HH:mm:ss"] | moment("from") }} </nobr>
            </span>
            <span class=" col-xs-6 col-lg-4">
              <nobr><i class='icon-eye'></i> {{item.views || 0}} {{ item.views | pluralize( ['просмотр', 'просмотра', 'просмотров']) }}</nobr>
            </span>
            <!--<span class=" col-xs-6 col-lg-3">-->
            <!--<nobr><i class='icon-speak'></i> Ответить</nobr>-->
            <!--</span>-->
          </div>
        </div>
        <!--<div class="col-xs-6 col-sm-2">-->
        <!--<span class="watchNewCount"><i class='icon-speak' style="font-size: 1.5em"></i> Ответить</span>-->
        <!--</div>-->
        <div class="col-xs-12 col-sm-2">
          <!--скрыла, пока не приходят комменты -->
          <!--<p v-if="item.comments" class="comments_count">{{item.comments.length}} </p>-->
          <!--<p class="comments_count">{{ item.comments.length | pluralize( ['ответ', 'ответа', 'ответов']) }}</p>-->
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
        page: 1,
        total: 0,
        items: [],
        userId: '',
        pagesList: [],
        user:''
      }
    },

     mounted  () {
      this.loadPosts();
         this.axios
             .get(`users/me`)
             .then(user => {
                 this.user = user.data.id;
                 console.log(user.data.id);


             })
             .catch(error => console.log(error));
    },

    methods: {
      loadPosts() {
        this.axios.get('http://api.forum.pocketmsg.ru/posts?page=' + this.page)
          .then(response => {
            this.items = response.data.data;
            this.total = response.data.total;
            this.pagination();
          })
          .catch(error => alert(error));


        // для тестов бэкэнда
        this.axios.post('http://api.forum.pocketmsg.ru/posts', {user_id:14,
          category_id:4,
          title: 'weeerr',
          description: 'text23',
          content: 'text45',
          tags_array: ["asd"]})
          .then(response => {
            this.items = response.data.data;
            this.total = response.data.total;
            this.pagination();
          })
        //   .catch(error => alert(error));
        // this.axios.put('http://api.forum.pocketmsg.ru/posts/73', {title: 'text',
        //   description: 'text',
        //   content:'text',
        //   tags: []})
        //   .then(response => {
        //     this.items = response.data.data;
        //     this.total = response.data.total;
        //     this.pagination();
        //   })
        // this.axios.delete('http://api.forum.pocketmsg.ru/posts/70')
        //   .then(response => {
        //     this.items = response.data.data;
        //     this.total = response.data.total;
        //     this.pagination();
        //   })
      },



      nextPage() {
        this.page += 1;
        this.loadPosts();
      },
      prevPage() {
        if (this.page > 1) {
          this.page -= 1;
          this.loadPosts();
        }
      },
      changePage(page) {
        this.page = page;
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

    props: {}
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
        .tags
          text-transform: uppercase
      span
        display: flex
        align-items: center
        margin-top: 15px
        color: $topic_params_color
      i
        margin-right: 5px
    .comments_count
      text-align: center
      font-weight: bold
      font-size: 18px

  .topic-block
    background-color: $topic_block_background
    width: 100%
    padding: 200px 0
    text-align: center

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

  .list-of-topics,
  .post_unit
    @media (min-width: $xs) and (max-width: $sm)
      padding-left: 0
    @media (min-width: $sm + 1px)
      padding-left: 40px

  .invisible
    display: none
    margin-bottom: 0
</style>
