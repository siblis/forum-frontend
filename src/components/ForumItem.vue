<template>
  <div class="container">
    <h3>ForumItem</h3>
    <div class="content">
      <h2 class="postName">{{post.title}}</h2>
      <div class="tags">
        <p class="tagIcon">#</p>
        <a href="#" class="postTag">тэг</a>
      </div>

      <div class="post" >
        <div class="userImg">U</div>
        <div class="postBody">
          <div class="postText">{{post.body}}</div>
          <div class="postProps">
            <div class="topicSubscribe">
              <div class="nameIcon"></div>
              <a href="#" class="postUserName">{{user.name}}</a>
            </div>
            <div class="topicSubscribe">
              <div class="postTimeIcon"></div>
              <div class="postTime">0 часов назад</div>
            </div>
          </div>
        </div>
      </div>

      <div class="commentsValue">
        Комментарии • {{userComments.length}}
      </div>
      <!-- div скрывается, если не зарегистрирован :class="{invisible : loggedIn}" -->
      <div  class="myComment" >

        <div  class="userComment">
          <div class="userImg">I</div>
          <div class="userCommentBody">
              <p >  {{comments.textComment}}</p>
            <textarea type="text"  class="inputComment" id="comment"

            ></textarea>
            <!-- Кнопки '.invisible', пока нет фокуса на textarea -->
            <div class="btnWrap">
              <!-- Кнопка не нажмается, пока в textarea нет текста -->
              <button class="sendBtn" @click="addComment">Отправить</button>
              <!-- -->
              <button class="cancelBtn">Х</button>
            </div>
            <!-- -->
          </div>
        </div>
        <!-- -->
      </div>

      <div class="commentsBlock" v-for="comment in userComments" :key="comment.id">
        <div class="comment">
          <div class="userImg">U</div>
          <div class="commentWrap">
            <div class="commentBody">
              <a href="#" class="commentUserName">{{comment.name}}</a>
              <div class="commentText"><p>{{comment.body}}</p></div>
              <!-- Кнопки "ответить" и "спасибо" '.invisible', если пользователь не зарегистрирован  -->
              <div class="commentProps" v-show="!showAnswer">
                <p class="answer" @click="openAnswer">Ответить</p>
                <div class="likeBody">
                  <p class="like">Спасибо</p>
                  <div class="likeIcon">#</div>
                  <div class="likeCounter">0</div>
                </div>
              </div>
              <!-- -->
            </div>
          </div>
        </div>

        <div class="myAnswer" v-show="showAnswer">
          <div class="userComment">
            <div class="userImg">I</div>
            <div class="userCommentBody">
              <textarea @keyup.enter="addComment"   v-model="newComment"   type="text" class="inputComment"></textarea>
              <!-- Кнопки '.invisible', пока нет фокуса на textarea -->
              <div class="btnWrap">
                <!-- Кнопка не нажмается, пока в textarea нет текста -->
                <button class="sendBtn">Отправить</button>
                <!-- -->
                <button class="cancelBtn" @click="openAnswer">Х</button>
              </div>
              <!-- -->
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'ForumItem',
    props: {},
    data: function() {
      return {
          newComment:'',
          comments:[{
              textComment: ''
          }
          ],
          post: '',
          user: '',
          userId: '',
          userComments: [],
          showAnswer: false,
       }
    },
    async mounted() {
      await this.axios
        .get('https://jsonplaceholder.typicode.com/posts/1')
        .then((post) => {
          this.post = post.data;
          this.userId = post.data.userId;
        })
        .catch(error => console.log(error));
      await  this.axios
        .get(`https://jsonplaceholder.typicode.com/users/${this.userId}`)
        .then((user) => {
          this.user = user.data;
        })
        .catch(error => console.log(error));
      await this.axios
        .get(`https://jsonplaceholder.typicode.com/posts/${this.userId}/comments`)
        .then((user) => {
          this.userComments = user.data;
          console.log(this.userComments);
        })
        .catch(error => console.log(error));
    },
    methods: {
      addComment: function () {
        this.comments.push({
          textComment: this.newComment,

        });
        this.newComment = "";
      },
      openAnswer() {
        this.showAnswer = !this.showAnswer;
      }
     },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  *
    margin: 0
    padding: 0
    box-sizing: border-box
    font-family: Roboto, San Francisco, Helvetica Neue, Helvetica, Arial, sans-serif

  .container
    max-width: 80%
    padding: 32px
  h3
    color: #b90015
  h2
    font-size: 34px
    line-height: 44px
    font-weight: 500
    margin-bottom: 8px
    color: #50667b
  .tags
    display: flex
    justify-content: flex-start
    margin-bottom: 16px
    a
      font-size: 12px
      line-height: 16px
      margin-right: 8px
      font-weight: 400
      color: rgba(80,102,123,.5)
      text-decoration: none
      &:hover
        color: #181a1c
    .tagIcon
      color: rgba(80,102,123,.5)
      margin-right: 8px
      font-size: 11px
      font-style: italic
  .userImg // заменить на фото
    height: 34px
    border-radius: 50%
    width: 34px
    background-color: grey
    text-align: center
    line-height: 34px
    margin-right: 16px
  .post
    display: flex
    margin-bottom: 24px
    .postBody
      width: 100%
      .postText
        padding: 8px 16px
        border: 1px solid rgba(164,175,221,.2)
        font-weight: 400
        font-size: 15px
        line-height: 24px
        color: #2c2d30
      .postProps
        display: flex
        font-size: 12px
        line-height: 16px
        font-weight: 400
        margin-top: 8px
        color: rgba(80,102,123,.5)
        .topicSubscribe
          display: flex
          margin-right: 8px
          .postUserName
            text-decoration: none
            font-size: 12px
            line-height: 16px
            font-weight: 400
            color: rgba(80,102,123,.5)
  .commentsValue
    font-size: 17px
    color: #50667b
    font-weight: 500
    line-height: 1.1
    margin-bottom: 30px
  .userComment
    display: flex
    margin-bottom: 40px
    .userCommentBody
      width: 100%
  .inputComment
    width: 100%
    min-height: 42px
    margin-bottom: 8px
    border: 1px solid rgba(164, 175, 221, 0.2)
    border-radius: 4px
    resize: none // переделать через js
    overflow: auto
    &:focus
      outline: none
      min-height: 61px
      padding: 8px
  .btnWrap
    display: flex
    margin: 8px 0
    button
      border: none
      border-radius: 4px
      display: block
      background: #f4f5fa
      color: #797979
      cursor: pointer
      text-transform: uppercase
      font-size: 14px
      font-weight: 400
      &:active
        box-shadow: inset 0 3px 5px rgba(0,0,0,.125)
        outline: none
      &.sendBtn
        width: 100%
      &.cancelBtn
        text-align: center // изенить, когда
        line-height: 48px  // появится картинка
        width: 48px
        height: 48px
        margin-left: 16px
        &:hover
          color: #323232
  .commentWrap
    width: 100%
  .comment
    display: flex
    .commentUserName
      text-decoration: none
      color: #50667b
      font-weight: 500
      font-size: 13px
      line-height: 24px
      &:hover
        color: #6588ab
    .commentText
      margin-bottom: 12px
      margin-top: 4px
      font-weight: 400
      font-size: 15px
      line-height: 24px
      color: #2c2d30
    .commentProps
      margin-bottom: 40px
      display: flex
      margin-top: 5px
      font-size: 13px
      line-height: 20px
      font-weight: 400
      cursor: pointer
      .answer
        color: #6588ab
        &:hover
          color: #6588ab
      .likeBody
        display: flex
        margin-left: 30px
        color: rgba(80,102,123,.5)
        &:hover
          color: #08d092
        *
          margin-right: 6px
  .invisible
    display: none
    margin-bottom: 0

</style>
