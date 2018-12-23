<template>
  <div class="content row" v-if="isPostLoaded">
    <div class="main-content col-xs-12 col-md-6">
      <router-link to="/" class="arrow-home col-xs-12 start-xs">
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
            <dir class="post-user-block col-xs-6 row bottom-xs">
              <div class="post-user-img">U</div>
              <a href="#" class="post-user-name">{{ author.name }}</a>
            </dir>
            <div class="post-time col-xs-6 end-xs" v-if="post.created_at">
              {{ [post.created_at, "YYYY-MM-DD HH:mm:ss"] | moment("from") }}
            </div>
          </div>
          <div class="post-body col-xs-12 col-sm">
            <div class="post-content">{{ post.content }}</div>
            <div class="post-props row end-xs"  v-if="isAuthor">
              <span class="post-props-delete" @click="delConfirmation">Удалить</span>
            </div>
          </div>
        </div>
      </div>

      <div class="post-card">
        <h2 class="post-title-secondary"  v-if="isCommentsLoaded && hasComments">
          Комментарии ({{ commentsCount }})
        </h2>
        <div class="post-block" v-for="(comment, i) in comments" :key="i">
          <div class='row between-xs bottom-xs'>
            <dir class="post-user-block col-xs-6 row bottom-xs">
              <div class="post-user-img">U</div>
              <a href="#" class="post-user-name">{{ comment.username.name }}</a>
            </dir>
            <div class="post-time col-xs-6 end-xs" v-if="comment.created_at">
              {{ [comment.created_at, "YYYY-MM-DD HH:mm:ss"] | moment("from") }}
            </div>
          </div>
          <div class="post-body col-xs-12 col-sm">
            <div class="post-content">{{ comment.content }}</div>
            <div class="post-props row">
              <div class="post-props-answer">
                <span @click="prepareComment(comment.username.name, comment.username.id)">Ответить</span>
              </div>
              <div class="post-props-like row">
                <a class="like">Спасибо</a>
                <i class="icon-thump-up like-icon"></i>
                <span class="like-counter">{{ comment.like ? comment.like : 0 }}</span>
              </div>
              <div class='post-props-change-comment' v-if="isMyProfileId(comment.username.id)">Редактировать</div>
            </div>
          </div>
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
            <div class="post-user-img">I</div>
            <div class="add-comments-body row col-xs-12 col-sm">
            <textarea
              type="text"
              v-model="myComment"
              class="add-comments-content col-xs-12 col-sm"
              ref="comment">
            </textarea>
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
          <div class="new-topic row">
            <div class="userImg">U</div>
            <a href="#" class="new-topic-name col-xs">Как вы разрабатываете REST API?</a>
            <div class="new-topic-props col-xs-2">3<br/>ответа</div>
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
  export default {
    name: 'ForumItem',
    props: ['postId'],
    data() {
      return {        
        myComment: '',
        showDelConfirmation: false,
       }
    },
    async mounted() {
      this.$store.dispatch(TOPIC_CLEAR);
      await this.$store.dispatch(TOPIC_LOAD, this.postId);
    },
    computed:{
      ...mapGetters({
        isLoggedIn: 'isLoggedIn',
        isMyProfileId: 'isMyProfileId',
        isAdmin: 'isAdmin',
        post: 'currentTopic',
        tags: 'currentTopicTags',
        comments: 'currentTopicComments',
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
      commentsCount() {
        return this.isCommentsLoaded ? this.comments.length : 0;
      }
    },
    methods: {
      prepareComment(name, id) {
        this.$refs.comment.focus(); //фокус на элемент с ref="comment", чтобы не использовать ссылки 
        if (!this.isLoggedIn || this.myComment !== '' || this.isMyProfileId(id)) {
          return;
        }
        this.myComment = `${name}, `;
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
        await this.$store.dispatch(TOPIC_DELETE)
        this.showDelConfirmation = false;
      },
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
      &:not(button),
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
      text-align: center
      line-height: 32px
      margin-right: 8px
    
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

    .post-props
      padding-top: 10px
      font-size: $forun_item_secondary_font_size
      line-height: normal
      color: $base_font_color
      & *
        font-size: inherit
        cursor: default
      &-answer
        padding-left: 15px
        @media screen and ( max-width: 420px )
          padding-left: 0
        span
          text-decoration: none
          color: inherit
      &-change-comment
        margin-left: auto
        color: inherit
      &-answer:hover,
      &-delete:hover,
      &-change-comment:hover,
      .like:hover
        opacity: 0.5
      &-like
        padding-left: 23px
        @media screen and ( max-width: 420px )
          padding-left: 8px
      .like,
      .like-icon
        margin-right: 4px
      .like-counter
        // font-size: inherit
  
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
      border: none
      resize: none // переделать через js
      overflow: auto
      padding: 15px
      border-radius: 4px
      background-color: $comment_background_color
      word-wrap: break-word
      color: $base_font_color
      font-size: $base_font_size
      margin-bottom: 15px
      &:focus
        outline: none
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
