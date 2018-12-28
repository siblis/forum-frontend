<template>
  <div class="add-post-content ">
    <h3 class="add-post-title">Создание новой темы</h3>
    <div class="create-new-post row between-xs">
      <div class="form-wrap col-xs-12 col-md-8">
        <form class="posts row start-xs end-md" action="#" method="post" @submit.prevent="postNewPost">
          <div class="col-xs-12 row">
            <label for="headline" class="headline col-xs-12 col-md-3">Заголовок темы</label>
            <input
              v-model.trim="newPostTitle"
              autocomplete="false"
              type="text"
              id="headline"
              class="col-xs-12 col-md-9"
              placeholder="Введите заголовок"
              v-on:blur="checkForm"
              v-bind:class="{ errorInput: errors.title }">
            <p class="error" v-if="errors.title">Необходимо заполнить заголовок</p>
          </div>
          <div class="col-xs-12 row">
            <label class="headline col-xs-12 col-md-3">Тэги</label>
            <vue-tags-input
              v-model="tag"
              :tags="tags"
              :autocomplete-items="autocompleteItems"
              @tags-changed="newTags => tags = newTags"
              class="col-xs-12 col-md-9"
              placeholder="Введите теги через Ввод"
              v-on:blur="checkForm"
              v-bind:class="{ errorInput: errors.tags, errorTagInput: errors.tagsLength }">
            </vue-tags-input>
            <p class="error" v-if="errors.tags">Необходимо заполнить теги</p>
            <p class="error" v-if="errors.tagsLength">Допустимо только 10 тегов</p>
          </div>
          <div class="col-xs-12 row">
            <label for="message" class="message col-xs-12 col-md-3">Текст сообщения</label>
            <textarea
              v-model="newPostBody"
              id="message"
              rows="10"
              class="textarea col-xs-12 col-md-9"
              placeholder="Введите текст сообщения"
              v-on:blur="checkForm"
              v-bind:class="{ errorInput: errors.content}">
            </textarea>
            <p class="error" v-if="errors.content">Необходимо заполнить поле</p>
          </div>
          <div class="checkbox row start-xs">
            <div>
              <input type="checkbox"
                     id="rules"
                     v-model="isCheckedRules"
                     @change="checkForm">
              <label for="rules"> Я внимательно ознакомился и обязуюсь соблюдать
                <router-link to="/rules" class="rules">
                  правила форума
                </router-link>.
              </label>
            </div>
            <div>
              <input type="checkbox" id="agree" v-model="isCheckedAgree" @change="checkForm">
              <label for="agree">Я согласен с тем, что модераторы могут удалять темы и комментарии за
                нарушение правил без объяснения причин.
              </label>
            </div>
            <p class="error-is-checked" v-if="errors.isChecked">Необходимо принять соглашения</p>
          </div>
          <div class="row center-xs end-sm">
            <button type="submit" formmethod="post" class="button button-default-big button-submit">Опубликовать тему
            </button>
            <router-link to="/" tag="button" class="button button-default-big">Отмена</router-link>
          </div>
        </form>
      </div>
      <div class="instructions col-xs-12 col-md-3">
        <p class="question">
          Как правильно создать тему обсуждения?
        </p>
        <p>
          Четко сформулируйте заголовок и придумайте теги, чтобы Ваш вопрос могли легко находить.
          И не забывайте благодарить людей, если они Вам помогают.
        </p>
        <p class="question">
          У Вас вопрос к администрации сайта?
        </p>
        <p>
          Если Ваш вопрос обращен к администрации сайта, а не к пользователям, то тему создавать не нужно.
          Подобные темы будут удаляться. С администрацией можно связаться через контакты внизу сайта.
        </p>
        <p class="question">
          Хотите пообщаться с кем-то лично?
        </p>
        <p>
          Найдите его профиль на сайте и напишите ему личное сообщение.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import VueTagsInput from '@johmun/vue-tags-input';
  import {AxiosInstance as axios} from "axios";

  export default {
    name: 'AddNewPost',
    components: {
      VueTagsInput,
    },
    props: {},
    data() {
      return {
        tag: '',
        tags: [],
        autocompleteItems: [],
        debounce: null,
        newPostTitle: null,
        newPostBody: null,
        description: '',
        isCheckedRules: null,
        isCheckedAgree: null,
        isDirty: false,
        errors: {
          title: null,
          tags: null,
          tagsLength: null,
          content: null,
          isChecked: null
        }
      };
    },
    methods: {
      postNewPost() {
        this.isDirty = true;
        if (this.checkForm()) {
          return;
        }
        this.axios.post('http://api.forum.pocketmsg.ru/posts', {
          category_id: 1,
          title: this.newPostTitle,
          description: this.description,
          content: this.newPostBody,
          tags: this.tags.map(tag => tag.text)
        })
          .then(response => {
            let postId = response.data.id;
            if(postId) {
              this.$router.push({path: `/posts/${postId}`});
            }
          })
          .catch(error => alert(error));
      },

      checkForm: function () {
        if (!this.isDirty) {
          return false;
        }
        this.errors = {};
        let isError = false;

        if (!this.newPostTitle) {
          this.errors.title = 'Не заполнен заголовок';
          isError = true;
        }
        if (!this.newPostBody) {
          this.errors.content = 'Не заполнено тело поста';
          isError = true;
        }
        if (this.tags.length === 0) {
          this.errors.tags = 'Не заполнены теги';
          isError = true;
        }
        if (this.tags.length > 10) {
          this.errors.tagsLength = 'Только 10 тегов';
          isError = true;
        }
        if (!this.isCheckedRules || !this.isCheckedAgree) {
          this.errors.isChecked = 'Не принято соглашение';
          isError = true;
        }

        console.log(this.errors);
        return isError;
      },
      update(newTags) {
        this.autocompleteItems = [];
        this.tags = newTags;
      },
      initItems() {
        // if (this.tag.length === 0) return;
        // const url = `https://itunes.apple.com/search?term=
        // ${this.tag}&entity=allArtist&attribute=allArtistTerm&limit=6`;
        //
        // clearTimeout(this.debounce);
        // this.debounce = setTimeout(() => {
        //   this.axios.get(url).then(response => {
        //     this.autocompleteItems = response.data.results.map(a => {
        //       return {text: a.artistName};
        //     });
        //   }).catch(() => console.warn('Oh. Something went wrong'));
        // }, 600);
      },
    },
    watch: {
      'tag': 'initItems',
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/variables"
  $input_color: #ddd
  $input_focus_color: black
  $alert_color: red
  $xs: 320px
  $md: 1024px

  .add-post-content
    background-color: $background-color
    padding: 24px 16px 0
    font-weight: 400
    font-size: 15px
    line-height: 24px
    .add-post-title
      margin-top: 34px
      margin-bottom: 13px
    .create-new-post
      margin-bottom: 30px
      .form-wrap
        background-color: $text_background_color
        padding: 38px
        height: 100%
        form
          .headline,
          .tags,
          .message
            font-size: 16px
          input
            &[type="text"]
              width: 100%
              padding: 5px 10px
              font-size: 13px
              outline: none
              box-shadow: none
              border: 1px solid $input_border_color
              line-height: normal
              border-radius: 3px
            &[type=checkbox]
              width: 16px
              height: 16px
              margin-right: 5px
              cursor: pointer
            &:focus
              border: 1px solid $input_focus_color
            &.errorInput
              border-color: $alert_color
          .error,
          .error-is-checked
            text-align: center
            width: 100%
            font-size: 12px
            color: $alert_color
          .vue-tags-input
            width: 100%
            padding: 0
            max-width: none
            outline: none
            border-radius: 3px
            border: 1px solid $input_border_color
            &.errorInput,
            &.errorTagInput
              border-color: $alert_color
            &:focus-within
              border: 1px solid $input_focus_color
            & /deep/ .input
              padding: 0
              border: 0
              .tags
                height: 100%
              .new-tag-input-wrapper
                height: 100%
                margin: 0
                padding: 5px 10px
                .new-tag-input
                  font-size: 13px
                  line-height: normal
              .tag
                padding: 0
                background-color: $input_border_color
                .content
                  font-size: 13px
          textarea
            width: 100%
            border-radius: 3px
            font-size: 13px
            min-height: 48px
            cursor: text
            border: 1px solid $input_border_color
            padding: 10px
            outline: none
            &.errorInput
              border-color: $alert_color
            &:focus
              border: 1px solid $input_focus_color
          .checkbox
            margin-bottom: 15px
          .button
            margin-left: 7px
            cursor: pointer

      .instructions
        padding: 10px
        background-color: $topic_block_background
        p
          margin-bottom: 14px
        .question
          font-weight: 700

  .add-post-title,
  .create-new-post
    @media (min-width: 320px) and (max-width: 768px)
      margin-left: 0
    @media (min-width: 769px)
      margin-left: 64px

  input[type="text"],
  .vue-tags-input,
  label,
  .textarea
    @media (min-width: $xs) and (max-width: $md - 1px)
      margin-bottom: 5px
    @media (min-width: $md)
      margin-bottom: 30px

  .error
    @media (min-width: $xs) and (max-width: $md - 1px)
      margin: -5px 0 0 0
    @media (min-width: $md)
      margin: -25px 0 0 0

  .button-submit
    @media (min-width: $xs) and (max-width: $xs + 100px)
      padding: 10px
</style>
