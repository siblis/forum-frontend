<template>
   <div class="comment-block">
    <div class='row between-xs bottom-xs'>
      <dir class="comment-user-block col-xs-6 row bottom-xs">
        <div class="comment-user-img">{{ comment ? comment.username.name[0].toUpperCase() : 'U'}}</div>
        <a href="#" class="comment-user-name">{{ comment ? comment.username.name : '' }}</a>
      </dir>
      <div class="comment-time col-xs-6 end-xs" v-if="comment.created_at">
        {{ [comment.created_at, "YYYY-MM-DD HH:mm:ss"] | moment("from") }}
      </div>
    </div>
    <div class="comment-body col-xs-12 col-sm">
      <div  class="comment-content"
            :class="{ 'comment-content-edited': wasEdited }"
            v-show="!editionMode">
        {{ comment ? comment.content : '' }}
      </div>
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
        <div  class='comment-props-control'
              v-show="isMyProfileId(comment.username.id) && !editionMode"
              ref="commentControl"
              tabindex="1"
              @blur="showCommentControl = false"
        >
          <i  class='icon-dots'
              @click="showCommentControl = true">
          </i>
          <div  class='comment-props-control-list'
                v-show="showCommentControl"
                @mouseleave="showCommentControl = false"
          >
            <div  class='comment-props-control-item'
                  v-show="isMyProfileId(comment.username.id) && !editionMode"
                  @click="prepareEditing"
            >
              Редактировать
            </div>
            <span class="comment-props-control-item"
                  @click="delConfirmation"
            >
              Удалить
            </span>
          </div>
        </div>
        <div  class='comment-props-control'
              v-show="isMyProfileId(comment.username.id) && editionMode"
              @mousedown="applyChanges">
          Сохранить
        </div>
      </div>
    </div>
    <div class='shadow' v-if="showDelConfirmation"></div>
    <div class="del-confirm row center-xs col-xs-12 around-sm col-sm-6" v-if="showDelConfirmation">
        <p class="col-xs-12">Вы уверены, что хотите удалить комментарий?</p>
        <button class="button button-main col-xs-12 col-sm-5" @click="deleteComment">Удалить</button>
        <button class="button button-main col-xs-12 col-sm-5" @click="cancelDelConfirmation">Отмена</button>
    </div>
  </div> 
</template>
<script>
import { mapGetters } from 'vuex';
 import { TOPIC_UPD_COMMENT, TOPIC_DEL_COMMENT } from '../store/actions';
export default {
  name: 'Comment',
  props: ['comment'],
  data() {
    return {
      value: '',
      editionMode: false,
      showCommentControl: false,
      showDelConfirmation: false,
    };
  },
  computed: {
    ...mapGetters({
      isMyProfileId: 'isMyProfileId',
      isUpdPending: 'isCurrentTopicUpdCommentPending',
    }),
    wasEdited() {
      return this.comment.created_at
          && this.comment.updated_at
          && this.comment.updated_at !== this.comment.created_at
    }
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
      setTimeout(() => {
        this.editionMode = false;
        this.showCommentControl = false;
      }, 400);
    },
    operateKeyDown(e) {
      if (e.ctrlKey && e.key === "Enter") {
        this.applyChanges();
      } else if (e.key === "Escape") {
        this.clearValue();  
      }
    },
    async applyChanges() {
      const result = await this.$store.dispatch(TOPIC_UPD_COMMENT, { commentId: this.comment.id, content: this.value });
      if (result) {
        this.clearValue();
      }
      this.editionMode = false;  
    },
    clearValue() {
      this.editionMode = false;
      this.value = '';
    },
    delConfirmation () {
      this.showDelConfirmation = true;
    },
    cancelDelConfirmation () {
      this.showDelConfirmation = false;
    },
    async deleteComment () {
      await this.$store.dispatch(TOPIC_DEL_COMMENT, this.comment.id);
      this.showDelConfirmation = false;
    },
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
  .comment-user-block
    padding-right: 0
    padding-left: 0
  .comment-user-img // заменить на фото
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
    margin-left: 40px
    padding-right: 0
    padding-left: 0
    @media screen and ( max-width: 420px )
      margin-left: 0
      margin-top: 15px

  .comment-content
    position: relative
    padding: 15px
    border-radius: 4px
    background-color: $comment_background_color
    word-wrap: break-word
    color: $base_font_color
    font-size: $base_font_size
    width: 100%
    outline: none
    border: 1px solid $comment_background_color
  
  textarea.comment-content
    margin-bottom: -4px // correction
    border-color: $dark_background_color
    background-color: $background-color
  div.comment-content
    padding-bottom: 14px  // correction
  
  .comment-content-edited
    &:before
      content: 'Сообщение отредактировано'
      position: absolute
      top: 2px
      right: 3px
      font-size: 10px
      font-weight: 500
      color: $dark_background_color

  .comment-props
    position: relative
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
    &-control
      margin-left: auto
      color: inherit
      outline: none
      .icon-dots
        padding-right: 7px
    &-control-list
      position: absolute
      right: 0
      top: 2px
      border: 1px solid
      display: inline-flex
      flex-direction: column
      outline: none
      border-color: $dark_background_color
      background-color: $text_background_color
      padding: 10px
      border-radius: 4px
      z-index: 10
    &-control-item
      &:not(:last-child)
        margin-bottom: 5px
      &:last-child
        border-top: 1px solid $dark_background_color
        padding-top: 5px
      &:hover
        color: #4D4D4D
  
  .del-confirm,
  .after-del-confirm
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
