<template>
  <div class="content row" v-if="isPostLoaded">
    <div class="main-content col-xs-12 col-md-6">
      <router-link :to="{name: 'home'}" class="arrow-home col-xs-12 start-xs">
        <i class='icon-arrow-back'></i>
        <span class='arrow-home-text'>Главная</span>
      </router-link>

      <div class="post-card">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-tags row" v-if="hasTags">
          <i class='post-tags-label icon-label'></i>
          <a href="#" class="post-tag" v-for="(tag, i) in tags" :key="i">{{ tag }}</a>
        </div>
        <div class="post-block">
          <div class='row between-xs bottom-xs'>
            <div class="post-user-block col-xs-6 row bottom-xs">

              <div class="post-user-img">{{ firstCharOfAuthorName }}</div>
              <a href="#" class="post-user-name">{{ author.name }}</a>
            </div>
            <div class="post-time col-xs-6 end-xs" v-if="post.created_at">
              {{ [post.created_at, "YYYY-MM-DD HH:mm:ss"] | moment("from") }}
            </div>
          </div>
          <div class="post-body col-xs-12 col-sm">
            <div  class="post-content"
                  :class="{ 'post-content-edited': wasEdited }"
            >
              {{ post.content }}
            </div>
            <div class="post-props row end-xs"  v-if="isAuthor">
              <router-link :to="{ name: 'post', params: { postId } }" v-if="post.canEdit" tag="span" class="post-props-edit">Редактировать</router-link>
              <span class="post-props-delete" @click="delConfirmation">Удалить</span>
            </div>
          </div>
        </div>
      </div>

      <div class="post-card">
        <h2 class="post-title-secondary"  v-if="isCommentsLoaded && hasComments">
          Комментарии ({{ commentsCount }})
        </h2>
        <comment  v-for="comment in comments"
                  :key="comment.id"
                  :comment="comment"
                  @answer="prepareComment"
        />
        <div class='post-comments-load-button'>
          <button class="button button-inverse">Больше комментариев ... </button>
        </div>
        <div class="post-block" v-if="!isLoggedIn">
          <h2 id="comment" class="add-comments-header">Оставить комментарий</h2>
          <div class="post-block-auth">
            <router-link to="/login" class="post-block-auth-link">Войдите</router-link>
            или
            <router-link to="/signup" class="post-block-auth-link">зарегистрируйтесь</router-link>
            чтобы оставить комментарий
          </div>
        </div>

        <div class="post-block" v-else>
          <h2 class="add-comments-header">Оставить комментарий</h2>
          <div  class="row">
            <div class="post-user-img">{{ firstCharOfMyName }}</div>
            <div class="add-comments-body row col-xs-12 col-sm">
              <textarea-autosize  type="text"
                                  class="add-comments-content col-xs-12 col-sm"
                                  ref="comment"
                                  v-model="myComment"
                                  @keydown.native="operateKeyDown"
              ></textarea-autosize>
              <div class="row col-xs-12 center-xs start-sm">
                <button class="button button-main" @click="addComment">Отправить</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="post-card" v-if="false">
        <h2>Похожие запросы</h2>
         <div class='same-request row middle-xs'>
          <div class='col-xs-12 col-sm-6'>
            <h4 class="same-request-header">Как вы разрабатываете REST API?</h4>
            <div class='same-request-props row'>
              <div class='same-request-props-item'>
                <i class='icon-label'></i>
                <span>RESTFUL API</span>
              </div>
              <div class='same-request-props-item'>
                 <i class='icon-clock'></i>
                <span>5 минут назад</span>
              </div>
              <div class='same-request-props-item'>
                 <i class='icon-eye'></i>
                <span>25 просмотров</span>
              </div>
            </div>
          </div>
          <div class='same-request-answer col-xs-6 col-sm-3'>
            <a class="row middle-xs">
              <i class='icon-speak'></i>
              <span>Ответить</span>
            </a>
          </div>
          <div class='col-xs-6 col-sm-3 end-xs'>
            <div class='same-request-count'>
              <span class="same-request-count-number">3</span>
              <span class="same-request-count-word">ответа</span>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="left-content col-md-2 first-md">
        <div class="side-bar">
        </div>
    </div>
    <div class="right-content col-xs-12 col-md-4">
        <div class="new-topic-block">
          <h2>Новые темы</h2>
          <div v-for="lastItem in lastItems" :key="lastItem.id" class="new-topic row">
            <div class="userImg">{{lastItem.username[0].toUpperCase()}}</div>
            <p
              @click="() => linkToTopic(lastItem.id)"
              class="new-topic-name col-xs">
              {{lastItem.title}}
            </p>
            <div class="new-topic-props col-xs-2">
              <p class="comments_count">{{lastItem.comments}} </p>
              <p class="comments_count">{{ lastItem.comments | pluralize( ['ответ', 'ответа', 'ответов']) }}</p>
            </div>
          </div>
        </div>
    </div>
    <div class='shadow' v-if="showDelConfirmation || wasDeleted"></div>
    <div class="del-confirm row center-xs col-xs-12 around-sm col-sm-6" v-if="showDelConfirmation">
        <p class="col-xs-12">Вы уверены, что хотите удалить пост? Все комментарии тоже будут удалены.</p>
        <button class="button button-main col-xs-12 col-sm-5" @click="deletePost">Удалить</button>
        <button class="button button-main col-xs-12 col-sm-5" @click="cancelDelConfirmation">Отмена</button>
    </div>
    <div class="after-del-confirm row center-xs col-xs-12 around-sm col-sm-6" v-if="wasDeleted">
      <p class="col-xs-12">Пост удалён.</p>
      <router-link class="col-xs-12 col-sm-7" to="/forum">
        <button class="button button-main confirm-link">Ок</button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { TOPIC_LOAD, TOPIC_DELETE, TOPIC_ADD_COMMENT, TOPIC_CLEAR } from '../store/actions';
  import Comment from '../components/Comment.vue';
  export default {
    name: 'ForumItem',
    props: ['postId'],
    components: {
      Comment,
    },
    data() {
      return {        
        myComment: '',
        showDelConfirmation: false,
        lastItems: []
       }
    },
    async mounted() {
      this.$store.dispatch(TOPIC_CLEAR);
      await this.$store.dispatch(TOPIC_LOAD, this.postId);
      this.axios.get('http://api.forum.pocketmsg.ru/posts')
        .then(response => {
          this.lastItems = response.data.data.filter((item) => {
            return item.id !== parseInt(this.postId);
          });
          this.lastItems.length = 5;
        })
        .catch(error => alert(error));
    },
    computed:{
      ...mapGetters({
        isLoggedIn: 'isLoggedIn',
        isProfileLoaded: 'isProfileLoaded',
        profile: 'profile',
        isMyProfileId: 'isMyProfileId',
        isAdmin: 'isAdmin',
        post: 'currentTopic',
        tags: 'currentTopicTags',
        comments: 'currentTopicComments',
        commentsCount: 'currentTopicCommentsTotalCount',
        author: 'currentTopicAuthor',
        isPostLoaded: 'isCurrentTopicPostLoaded',
        isCommentsLoaded: 'isCurrentTopicCommentsLoaded',
        wasDeleted: 'isCurrentTopicWasDeleted',
      }),
      isAuthor() {
        return this.isPostLoaded && this.author.id && this.isMyProfileId(this.author.id);
      },
      hasTags() {
        return this.isPostLoaded && this.tags && this.tags.length > 0;
      },
      hasComments() {
        return this.isCommentsLoaded && this.comments.length > 0;
      },
      wasEdited() {
        return this.post.created_at
            && this.post.updated_at
            && this.post.updated_at !== this.post.created_at
      },
      firstCharOfMyName() {
        return (this.isLoggedIn && this.isProfileLoaded) ? this.profile.name[0].toUpperCase() : ''
      },
      firstCharOfAuthorName() {
        return (this.isPostLoaded && this.author) ? this.author.name[0].toUpperCase() : ''
      },
    },
    watch: {
      '$route'(to, from) {
        this.$store.dispatch(TOPIC_LOAD, to.params.postId);
      }
    },
    methods: {
      prepareComment(name, id) {
        this.$refs.comment.$el.focus(); 
        if (!this.isLoggedIn || this.myComment !== '' || this.isMyProfileId(id)) {
          return;
        }
        this.myComment = `${name}, `;
      },
      operateKeyDown(e) {
        if (e.ctrlKey && e.key === "Enter") {
          this.addComment();
        } else if (e.key === "Escape") {
          this.myComment = ""; 
        }
      },
      async addComment() {
        await this.$store.dispatch(TOPIC_ADD_COMMENT, this.myComment);
        this.myComment = "";
      },
      delConfirmation () {
        if (this.isAuthor) {
          this.showDelConfirmation = true;
        }
      },
      cancelDelConfirmation () {
        this.showDelConfirmation = false;
      },
      async deletePost () {
        await this.$store.dispatch(TOPIC_DELETE);
        this.showDelConfirmation = false;
      },
      linkToTopic(postId) {
        this.$router.push({name: 'posts', params: { postId }})
      }
     },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import "../assets/variables"

  .content
    h2
      font-size: $h2_font_size
      font-weight: bolder
      line-height: 23px
      margin-bottom: 15px
      &.add-comments-header
        margin-bottom: 10px

  .main-content
    margin: 0
    padding: 0 15px
    *
      margin: 0
      padding: 0
      &:not(button)
        background-color: $text_background_color

    .arrow-home
      display: flex
      align-items: center
      padding: 10px 0
      font-size: 16px
      text-decoration: none
      background-color: $background-color
      &-text
        display: inline-block
        height: 18px
        font-weight: 500
        line-height: 18px
        background-color: inherit
      &:hover
        opacity: 0.5
      .icon-arrow-back
        opacity: 0.5 
        background-color: inherit
        margin-right: 11px

  .post-card
    padding: 20px
    margin-bottom: 17px
    
  .post-title
    font-size: $forun_item_title_size
    word-wrap: break-word
    line-height: normal
    font-weight: 500
    margin-bottom: 2px
    @media screen and ( max-width: 420px )
      font-size: $forun_item_title_size__samll
    &-secondary
      font-size: $forun_item_title_secondary_size
      @media screen and ( max-width: 420px )
        font-size: $forun_item_title_secondary_size__samll
  
  .post-tags
    margin-bottom: 14px
    &-label
      font-size: 11px
      line-height: 15px
      color: $base_font_color
      opacity: 0.5
      margin-right: 8px
  
  .post-tag
    display: inline-block
    font-size: $forun_item_secondary_font_size
    line-height: 15px
    color: $base_font_color
    opacity: 0.5
    text-decoration: none
    &:hover
      opacity: 1
    &:not(:last-child)
      margin-right: 2px
      &:after
        content: ","

  .post-block
    display: flex
    flex-direction: column
    align-items: stretch
    &:not(:last-child)
      margin-bottom: 10px
    &:nth-last-child(2)
      margin-bottom: 17px
    .post-user-img // заменить на фото
      height: 32px
      width: 32px
      border-radius: 50%
      background-color: $topic_block_background
      margin-right: 8px
      display: flex
      justify-content: center
      align-items: center
      font-weight: 700
      color: #333
    
    .post-user-name
      font-size: $forun_item_secondary_font_size
      text-decoration: none
      margin-bottom: 6px
      &:hover
        opacity: 0.5

    .post-time
      margin-bottom: 6px
      font-size: $forun_item_secondary_font_size

    .post-body
      padding-left: 40px
      @media screen and ( max-width: 420px )
        padding-left: 0
        padding-top: 15px

    .post-content
      padding: 15px
      border-radius: 4px
      background-color: $comment_background_color
      word-wrap: break-word
      color: $base_font_color
      font-size: $base_font_size
      position: relative
    .post-content-edited
      &:before
        content: 'Сообщение отредактировано'
        position: absolute
        top: 2px
        right: 3px
        font-size: 10px
        font-weight: 500
        color: $dark_background_color

    .post-props
      padding-top: 10px
      font-size: $forun_item_secondary_font_size
      line-height: normal
      color: $base_font_color
      & *
        font-size: inherit
        cursor: default
      &-delete:hover
        cursor: default
      &-answer
        padding-left: 15px
        @media screen and ( max-width: 420px )
          padding-left: 0
        span
          text-decoration: none
          color: inherit
      &-edit
        margin-right: 7px
      &-change-comment
        margin-left: auto
        color: inherit
      &-answer:hover,
      &-delete:hover,
      &-change-comment:hover,
      &-edit:hover,
      .like:hover
        opacity: 0.5
  
  .post-comments-load-button
    display: flex
    align-items: center
    justify-content: flex-end
    padding-top: 7px
    padding-bottom: 7px
    // @media screen and ( max-width: 420px )
    //   justify-content: center
    button
      padding: 5px
      cursor: pointer
      font-weight: 400
      font-size: 12px

  .post-block-auth
    font-size: $base_font_size
    line-height: 16px
    &-link
      font-size: inherit
      text-decoration: underline
      &:hover
        opacity: 0.5
  
  .add-comments-body
    @media screen and ( max-width: 768px )
      padding-top: 15px
    .add-comments-content
      min-height: 88px
      border: 1px solid $comment_background_color
      padding: 15px
      border-radius: 4px
      background-color: $comment_background_color
      word-wrap: break-word
      color: $base_font_color
      font-size: $base_font_size
      margin-bottom: 15px
      &:focus
        outline: none
        border-color: $dark_background_color
        background-color: $background-color
    .button
      margin-bottom: 0
  
  .same-request
    &:not(:last-child)
      margin-bottom: 12px
    &-header
      font-size: 20px
      margin-bottom: 5px
    &-props
      display: flex
      justify-content: flex-start
      @media screen and ( max-width: 520px )
        flex-direction: column
        &-item:not(:last-child)
          margin-bottom: 5px
      &-item
        display: flex
        align-items: center
        font-size: 13px
        color: #4D4D4D
        span
          font-size: inherit
          color: inherit
        i
          font-size: 16px
        .icon-label
          font-size: 12px
        &:not(:last-child)
          margin-right: 10px
        span
          margin-left: 4px  
    &-answer
      a
        cursor: default
        &:hover
          opacity: 0.5
        &:active
          opacity: 0.1
      i
        font-size: 24px
      span
        margin-left: 4px
        font-size: 16px
    &-count
      display: inline-flex
      flex-direction: column
      align-items: center

      &-number
        font-weight: bold
        color: #4D4D4D
        font-size: 18px
      &-word
        font-weight: bold
        color: #4D4D4D
        font-size: 15px

  .right-content
    margin: 0
    padding: 38px 0 0
    *
      margin: 0
      padding: 0
      background-color: $aside_background_color
    .new-topic-block
      padding: 13px 12px 30px
      background-color: $aside_background_color
    div, a
      font-size: $medium_font_size
      font-weight: normal
    .new-topic:not(:last-child)
      margin-bottom: 24px
    .userImg // заменить на фото
      height: 32px
      border-radius: 50%
      width: 32px
      background-color: $light_background_color
      text-align: center
      line-height: 32px
      margin-right: 6px
      margin-bottom: 8px
    .new-topic-name
      padding-top: 5px
      text-decoration: none
      &:hover
        opacity: 0.5
        cursor: pointer
    .new-topic-props
      text-align: center

  .left-content
    display: none
    padding: 0
    @media (min-width: 1024px) // не придумал, как скрыть блок через flexboxgrid
      display: block
    .side-bar
      background-color: $aside_background_color
      height: 100%

  .del-confirm, .after-del-confirm
    padding-top: 15px
    padding-bottom: 15px
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    background: $text_background_color
    border-radius: 4px
    min-width: 300px
    z-index: 1100
    max-height: 100%
  .after-del-confirm
    a
      padding: 0
    .confirm-link
      width: 100%
      height: 100%
      margin: 0

  .shadow
    position: fixed
    top: 0
    left: 0
    height: 100%
    width: 100%
    z-index: 1000
    background: #000
    opacity: 0.5

</style>
