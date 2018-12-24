<template>
   <div class="comment-block">
    <div class='row between-xs bottom-xs'>
      <dir class="comment-user-block col-xs-6 row bottom-xs">
        <div class="comment-user-img">U</div>
        <a href="#" class="comment-user-name">{{ comment ? comment.username.name : '' }}</a>
      </dir>
      <div class="comment-time col-xs-6 end-xs" v-if="comment.created_at">
        {{ [comment.created_at, "YYYY-MM-DD HH:mm:ss"] | moment("from") }}
      </div>
    </div>
    <div class="comment-body col-xs-12 col-sm">
      <div class="comment-content" v-show="!editionMode">{{ comment ? comment.content : '' }}</div>
      <textarea-autosize
        v-show="editionMode"
        type="text"
        class="comment-content"
        rows="1"
        ref="changeRef"
        v-model="value"
        @blur.native="closeEditing"
        @keydown.native="operateKeyDown"
      ></textarea-autosize>
      <div class="comment-props row">
        <div class="comment-props-answer">
          <span @click="$emit('answer', comment.username.name, comment.username.id)">Ответить</span>
        </div>
        <div class="comment-props-like row">
          <a class="like">Спасибо</a>
          <i class="icon-thump-up like-icon"></i>
          <span class="like-counter">{{ (comment && comment.like) ? comment.like : 0 }}</span>
        </div>
        <div  class='comment-props-change-comment'
              v-show="isMyProfileId(comment.username.id) && !editionMode"
              @click="prepareEditing"
        >Редактировать</div>
        <div  class='comment-props-change-comment'
              v-show="isMyProfileId(comment.username.id) && editionMode"
              @mousedown="applyChanges"
        >Сохранить</div>
      </div>
    </div>
  </div> 
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Comment',
  props: ['comment'],
  data() {
    return {
      value: '',
      editionMode: false,
    };
  },
  computed: {
    ...mapGetters({
      isMyProfileId: 'isMyProfileId',
    }),
  },
  methods: {
    prepareEditing() {
      if (this.value === '') {
        this.value = this.comment.content;
      }
      this.editionMode = true;
      setTimeout(() => this.$refs.changeRef.$el.focus());
    },
    closeEditing() {
      this.editionMode = false
    },
    operateKeyDown(e) {
      if (e.ctrlKey && e.key === "Enter") {
        this.applyChanges();
      } else if (e.key === "Escape") {
        this.clearValue();  
      }
    },
    applyChanges() {
      console.log(this.value);
      this.clearValue();
    },
    clearValue() {
      this.editionMode = false;
      this.value = '';
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../assets/variables"
.comment-block
  display: flex
  flex-direction: column
  align-items: stretch
  &:not(:last-child)
    margin-bottom: 10px
  &:nth-last-child(2)
    margin-bottom: 17px
  .comment-user-img // заменить на фото
    height: 32px
    width: 32px
    border-radius: 50%
    background-color: $topic_block_background
    text-align: center
    line-height: 32px
    margin-right: 8px
  
  .comment-user-name
    font-size: $forun_item_secondary_font_size
    text-decoration: none
    margin-bottom: 6px
    &:hover
      opacity: 0.5
  .comment-time
    margin-bottom: 6px
    font-size: $forun_item_secondary_font_size
  .comment-body
    padding-left: 40px
    @media screen and ( max-width: 420px )
      padding-left: 0
      padding-top: 15px

  .comment-content
    padding: 15px
    border-radius: 4px
    background-color: $comment_background_color
    word-wrap: break-word
    color: $base_font_color
    font-size: $base_font_size
    width: 100%
    outline: none
    border: none
  textarea.comment-content
    margin-bottom: -4px // correction
  div.comment-content
    padding-bottom: 16px  // correction
  
  .comment-props
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
</style>
