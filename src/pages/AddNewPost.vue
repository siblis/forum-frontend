<template>
  <div class="add-post-content">
    <h3 class="add-post-title">Создание новой темы</h3>
    <div class="create-new-post row between-xs">
      <div class="form-wrap col-xs-12 col-md-8">
        <form class="posts row start-xs end-md" action="#" method="#">
          <label for="headline" class="headline col-xs-12 col-md-3">Заголовок темы</label>
          <input type="text" id="headline" class="col-xs-12 col-md-9" placeholder="Минимум 10 символов">
          <label for="tags" class="headline col-xs-12 col-md-3">Тэги</label>
          <input type="text" id="tags" class="col-xs-12 col-md-9" placeholder="Через запятую (минимум 3 буквы)">
          <label for="message" class="message col-xs-12 col-md-3">Текст сообщения</label>
          <textarea id="message" rows="10" class="col-xs-12 col-md-9" placeholder="Введите текст сообщения"></textarea>
          <div class="checkbox row start-xs">
            <div>
              <input type="checkbox" id="rules">
              <label for="rules"> Я внимательно ознакомился и обязуюсь соблюдать <a class="rules" href="#">правила
                форума</a>.
              </label>
            </div>
            <div>
              <input type="checkbox" id="agree">
              <label for="agree">Я согласен с тем, что модераторы могут удалять темы и комментарии за
                нарушение правил без объяснения причин.
              </label>
            </div>
          </div>
          <button type="submit" class="button button-default-big">Опубликовать тему</button>
          <button type="submit" class="button button-default-big">Отмена</button>
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
          Подобные темы будут удаляться. С администрацией можно связаться через раздел Помощь
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
  export default {
    name: 'AddNewPost',
    props: {},
  }
</script>

<style lang="sass" scoped>
  @import "../assets/variables"

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
              padding: 10px 16px 4px
              font-size: 13px
              border-radius: 2px
              outline: none
              box-shadow: none
              border: 1px solid #cbd5dd
              line-height: 1.33333
              color: #555
            &[type=checkbox]
              width: 16px
              height: 16px
              margin-right: 5px
            &:focus
              box-shadow: none
          textarea
            width: 100%
            margin-bottom: 30px
            font-size: 13px
            min-height: 48px
            cursor: text
            border: 1px solid #ddd
            border-radius: 4px
            padding: 10px
            &:focus
              outline: auto 5px
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
  label
    @media (min-width: 320px) and (max-width: 768px)
      margin-bottom: 5px
    @media (min-width: 769px)
      margin-bottom: 30px

</style>
