<template>
  <div class="content row">
      <div class="main-content col-xs-12 col-md-6">
        <router-link to="/" class="arrow-home col-xs-12 start-xs">
          <i class='icon-arrow-back'></i>
          <span class='arrow-home-text'>Главная</span>
        </router-link>
        <div class="post-card">

          <h1 class="post-title col-xs-12">{{ post.title }}</h1>

          <div class="post-tags row col-xs-12" v-if="hasTags">
            <i class='post-tags-label icon-label'></i>
            <a href="#" class="post-tag" v-for="(tag, i) in post.tags" :key="i">{{ tag }}</a>
          </div>

          <div class="post-block">
            <div class='row between-xs bottom-xs'>
              <dir class="post-user-block col-xs-8 row bottom-xs">
                <div class="post-user-img">U</div>
                <a href="#" class="post-user-name">{{ authorName }}</a>
              </dir>
              <div class="post-time col-xs-4 end-xs" v-if="post.created_at">{{ [post.created_at, "YYYY-MM-DD HH:mm:ss"] | moment("from") }}</div>
            </div>

            <div class="post-body col-xs-12 col-sm">
              <div class="post-content">{{ post.content }}</div>
              <div class="postProps row between-xs"></div>
              <div class="deletePost row end-xs">
                <button class="button button-main" v-if="post.user_id === my.id"  @click="delConfirm">Удалить</button>
              </div>
            </div>
          </div>

        </div>

        <div class="post-card">
          <h2 class="commentsCount">
            Комментарии ({{commentsCount}})
          </h2>
          <div class="commentBlock" v-for="comment in userComments" :key="comment.id">
            <div class="post row">

              <div class="userImg">U</div>

              <div class="postBody row col-xs-12 col-sm">
                <a href="#" class="postUserName">{{comment.name}}</a>

                <div class="postText">{{comment.body}}</div>

                <!-- Кнопки "ответить" и "спасибо" '.invisible', если пользователь не зарегистрирован  -->
                <div class="commentProps row" :id="`comment-props-${comment.id}`">
                  <p class="answer" @click="openAnswer(comment.id, comment.name)">Ответить</p>
                  <div class="likeBody row">
                    <p class="like">Спасибо</p>
                    <div class="likeIcon">#</div>
                    <div class="likeCounter">0</div>
                  </div>
                </div>
                <!-- -->
              </div>
            </div>

            <div class="my-answer invisible row" :id="`my-answer-${comment.id}`">
              <div class="userImg">I</div>
              <div class="row col-xs-12 col-sm">
              <textarea
                @keyup.enter="addComment"
                :id="`textarea-${comment.id}`"
                v-model="newComment"
                type="text"
                class="postText col-xs-12">
              </textarea>
                <!-- Кнопки '.invisible', пока нет фокуса на textarea -->
                <div class="btnWrap row col-xs-12 center-xs between-sm">
                  <!-- Кнопка не нажмается, пока в textarea нет текста -->
                  <button class="button button-main">Отправить</button>
                  <!-- -->
                  <button class="button button-main esc-btn" @click="closeAnswer(comment.id)">Х</button>
                </div>
                <!-- -->
              </div>
            </div>

          </div>

          <h2>Оставить комментарий</h2>
          <div class="authMessage">
            <a href="#" class="auth">Войдите</a>
            или
            <a href="#" class="auth">зарегистрируйтесь</a>
            чтобы оставить комментарий
          </div>
        </div>

        <!-- div скрывается, если не зарегистрирован :class="{invisible : loggedIn}" -->
        <div  class="post-card" >

          <h2>Оставить комментарий</h2>

          <div  class="myCommentBlock row">
            <div class="userImg">I</div>
            <div class="userCommentBody row col-xs-12 col-sm">
            <textarea
              type="text"
              v-model="newComment"
              class="postText col-xs-12"
              id="comment">
            </textarea>
              <!-- Кнопки '.invisible', пока нет фокуса на textarea -->
              <div class="btnWrap row col-xs-12 center-xs start-sm">
                <!-- Кнопка не нажмается, пока в textarea нет текста -->
                <button class="button button-main" @click="addComment">Отправить</button>
                <!-- -->
              </div>
              <!-- -->
            </div>
          </div>
          <!-- -->
        </div>

        <div class="sameRequest">
          <h2 class="sameRequestTitle">Похожие запросы</h2>
          <div class="sameRequestBody">
            <h2>Как вы разрабатываете REST API?</h2>
            <div class="sameRequestProps row start-xs">
              <div class="#">
                <i class='icon-label'></i>
                <span>RESTFUL API</span>
                <i class='icon-clock'></i>
                <span>5 минут назад</span>
              </div>
              <div class="#">
                <i class='icon-eye'></i>
                <span>25 просмотров</span>
                <a>
                  <i class='icon-speak'></i>
                  Ответить
                </a>
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
      <div class="del-confirm invisible row center-xs col-xs-12 around-sm col-sm-6">
        <p class="col-xs-12">Вы уверены, что хотите удалить пост? Все комментарии тоже будут удалены.</p>
        <button class="button button-main col-xs-12 col-sm-5" @click="delPost">Удалить</button>
        <button class="button button-main col-xs-12 col-sm-5" @click="clsConfirm">Отмена</button>
      </div>
      <div class="after-del-confirm invisible row center-xs col-xs-12 around-sm col-sm-6">
        <p class="col-xs-12">Пост удалён.</p>
        <router-link class="col-xs-12 col-sm-7" to="/forum">
          <button class="button button-main confirm-link">Ок</button>
        </router-link>
      </div>
      <div class="shadow invisible"></div>
  </div>
</template>

<script>
  export default {
    name: 'ForumItem',
    props: ['postId'],
    data: function() {
      return {
        newComment: '',
        comments:[{
          textComment: '',
        }
        ],
        post: '',
        authorId: '',
        authorName: '',
        commentsCount: '',
        userComments: [],
       }
    },
    async mounted() {
      await this.axios
        .get('posts/' + this.postId)
        .then((post) => {
          console.log(post.data);
          this.post = post.data;
          this.authorId = post.data.username.id;
          this.authorName = post.data.username.name;
          // this.commentsCount = post.data.comments.length;
          // this.userName = post.data.username.name;
          // fake
          this.post.title = 'Программирование микроконтроллеров';
          this.post.tags = ['язык программирования', 'обучение', 'микроконтроллеры'];
          this.authorName = 'Ной Кун';
          this.post.content = 'Здравствуйте, хочу научиться программированию микроконтроллеров. Учусь на специальности Автомобилестроение по направлению электроника. Научиться программированию микроконтроллеров будет полезно в работе с автомобилями, в частности с ЭБУ. Знаю, что используют язык Си. Также некоторые начинают учиться этому на Ардуино, как мне говорили. Подскажите, с чего начинать и чем продолжать, пожалуйстапожалуйстапожалуйстапожалуйста';
          // end fake
        })
        .catch(error => console.log(error));
      await this.axios
        .get(`users/${this.userId}`)
        .then((user) => {
          this.user = user.data;
        })
        .catch(error => console.log(error));
      await this.axios
        .get(`posts/${this.userId}/comments`)
        .then((comment) => {
          this.userComments = comment.data;
          // console.log(this.userComments);
        })
        .catch(error => console.log(error));
    },
    computed:{
      my() {
        return this.$store.getters.profile;
      },
      hasTags() {
        return this.post.tags && this.post.tags.length > 0
      },
    },
    methods: {
      async delPost () {
        await this.axios
          .delete(
            `posts/${this.post.id}`,
          )
          .then((response) => {
            document.querySelector('.del-confirm').classList.add('invisible');
            document.querySelector('.after-del-confirm').classList.remove('invisible');
            return response;
          })
          .catch(error => console.log(error));
      },
      delConfirm () {
        document.querySelector('.del-confirm').classList.remove('invisible');
        document.querySelector('.shadow').classList.remove('invisible');
      },
      clsConfirm () {
        document.querySelector('.del-confirm').classList.add('invisible');
        document.querySelector('.shadow').classList.add('invisible');
      },
      openAnswer(id, name) {
        // this.newComment[id] += `${name}, `;
        this.newComment = '';
        document.querySelector(`#my-answer-${id}`).classList.remove('invisible');
        document.querySelector(`#comment-props-${id}`).classList.add('invisible');
        this.newComment += `${name}, `;
        document.querySelector('#comment').focus()
        // console.log(this.newComment);
        // document.querySelector(`#textarea-${id}`).focus();

      },
      closeAnswer(id) {
        document.querySelector(`#my-answer-${id}`).classList.add('invisible');
        document.querySelector(`#comment-props-${id}`).classList.remove('invisible');
        // this.newComment[id] = '';
      },
      addComment: function () {
        this.comments.push({
          textComment: this.newComment,

        });
        this.newComment = "";
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
    .post
      width: 100%

  h3
    color: #b90015

  .main-content
    margin: 0
    padding: 0 15px
    *
      margin: 0
      padding: 0
      &:not(button),
        background-color: $text_background_color

    .post-content
      padding: 15px
      border-radius: 4px
      background-color: $comment_background_color
      word-wrap: break-word

    textarea
      min-height: 88px
      border: none
      resize: none // переделать через js
      overflow: auto
      &:focus
        outline: none
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

  .postProps
    font-size: $tags_font_size
    .postTime
      line-height: 14px
      margin-bottom: 9px

  .my-answer
    margin-top: 28px
    margin-bottom: 42px

  .button
    margin-bottom: 5px

  .esc-btn
    margin-left: 5px

  .commentProps
    margin-bottom: 28px
    font-size: $tags_font_size
    line-height: 14px
    cursor: pointer
    .answer
      margin-right: 27px
      &:hover
        opacity: 0.5
    .likeBody
      &:hover
        opacity: 0.5
      .like
        margin-right: 10px
      .likeCounter
        margin-left: 6px

  .authMessage
    font-size: $medium_font_size
    line-height: 16px
    .auth
      text-decoration: underline
      &:hover
        opacity: 0.5

  .sameRequest
    padding: 13px 14px 24px
    .sameRequestTitle
      margin-bottom: 15px
    .sameRequestBody
      &:not(:last-child)
        margin-bottom: 24px
      .sameRequestProps
        span, i, a
          font-size: $tags_font_size
        span, i
          color: $dark_background_color
        span
          margin-right: 16px
        i
          margin-right: 4px
        a
          cursor: pointer
          &:hover
            opacity: 0.5
        .icon-speak
          color: $base_font_color
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
      font-weight: 500
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
    background: $comment_background_color
    opacity: 0.5

  .invisible
    display: none
    margin-bottom: 0

</style>
