<template>
  <div class="addPostContent">
    <div class="formWrap">
      <h3 class="addPostTitle">Создание темы обсуждения</h3>
      <form action="#" method="#">
        <label for="headline">Заголовок темы</label>
        <input type="text" id="headline" placeholder="Минимум 10 символов">
        <label for="tags">Тэги</label>
        <input type="text" id="tags" placeholder="Через запятую (минимум 3 буквы)">
        <br>
        <label for="message" class="smallLabel">Текст сообщения</label>
        <div class="styleButtons">
          <div class="styleButtonItem" title="Bold (Ctrl-B)">B</div>
          <div class="styleButtonItem" title="Italic (Ctrl-I)">I</div>
          <div class="styleButtonItem" title="Strikethrough">Q</div>
          <div class="separator"></div>
          <div class="styleButtonItem" title="Code (Ctrl-Alt-C)">W</div>
          <div class="styleButtonItem" title="Quote (Ctrl-')">E</div>
          <div class="styleButtonItem" title="Generic List (Ctrl-L)">R</div>
          <div class="separator"></div>
          <div class="styleButtonItem" title="Create Link (Ctrl-K)">T</div>
          <div class="separator"></div>
          <div class="styleButtonItem" title="Toggle Preview (Ctrl-P)">Y</div>
          <div class="styleButtonItem" title="Toggle Side by Side (F9)">U</div>
          <div class="styleButtonItem" title="Toggle Fullscreen (F11)">O</div>
          <div class="separator"></div>
          <div class="styleButtonItem" title="Markdown Guide">P</div>
        </div>
          <textarea id="message" placeholder="Введите текст сообщения" ></textarea>
        <label>
          <input type="checkbox"> Я внимательно ознакомился и обязуюсь соблюдать правила форума.
        </label>
        <label>
          <input type="checkbox">
            Я согласен с тем, что модераторы могут удалять темы и комментарии за
            нарушение правил без объяснения причин.
        </label>
        <label>
          <input type="checkbox">
            Я согласен с тем, что форум нельзя засорять вопросами организационного характера,
            не несущими полезную нагрузку для сообщества. Поэтому мой вопрос никак не связан с техническими
            проблемами, вопросами стажировки и обучения, учебными программами и преподавателями..
        </label>
        <button type="submit" class="submitBtn">Создать тему</button>
      </form>
    </div>
    <div class="instructions">
      <div class="instructionItem">
        <b>Как правильно создать тему обсуждения?</b>
        <p>
          Четко сформулируйте заголовок и придумайте теги, чтобы Ваш вопрос могли легко находить.
          И не забывайте благодарить людей, если они Вам помогают.
        </p>
      </div>
      <div class="instructionItem">
        <b>У Вас вопрос к администрации сайта?</b>
        <p>
          Если Ваш вопрос обращен к администрации сайта, а не к пользователям, то тему создавать не нужно.
          Подобные темы будут удаляться. С администрацией можно связаться через раздел Помощь
        </p>
      </div>
      <div class="instructionItem">
        <b>Ищете команду для совместной разработки IT-проекта?</b>
        <p>
          Специально для таких целей создан Инкубатор GeekBrains. В разделе Карьера нашего портала Вы можете
          публиковать свой проект, разместить информацию о вакансиях и требованиях к соискателям, получать отклики
          от наших выпускников и просто пользоватлей сайта.
        </p>
      </div>
      <div class="instructionItem">
        <b>Есть вопрос по курсу?</b>
        <p>
          Для обсуждения материалов и уроков того или иного курса пользуйтесь комментариями к урокам в разделе
          Обучение, Ваш преподаватель и одногруппники их обязательно увидят и помогут.
        </p>
      </div>
      <div class="instructionItem">
        <b>Хотите пообщаться с кем-то лично?</b>
        <p>
          Найдите его профиль на сайте и напишите ему личное сообщение.
        </p>
      </div>
      <div class="instructionItem">
        <b>Как правильно создать тему обсуждения?</b>
        <p>
          Модераторы могут блокировать пользователей, удалять темы и комментарии, согласно Пользовательскому
          соглашению
        </p>
      </div>
    </div>
  </div>


</template>

<script>
  export default {
    name: 'AddNewPost',
    props: {}
  }
</script>

<style lang="sass" scoped>
  *
    box-sizing: border-box
    margin: 0
    padding: 0

  .addPostContent
    display: flex
    margin: 0 auto
    padding: 24px 16px 0
    font-family: Roboto,San Francisco,Helvetica Neue,Helvetica,Arial,sans-serif
    font-weight: 400
    font-size: 15px
    line-height: 24px
    color: #2c2d30

  .formWrap
    flex: 2
    margin-right: 32px

  .addPostTitle
    font-size: 17px
    line-height: 24px
    margin-bottom: 16px

  label
    display: block
    margin-bottom: 5px
    &.smallLabel
      font-size: 13px
      line-height: 20px

  input
    &[type="text"]
      display: block
      width: 100%
      padding: 10px 16px 4px
      font-size: 17px
      border-radius: 2px
      outline: none
      box-shadow: none
      border: 1px solid #cbd5dd
      min-height: 45px
      line-height: 1.33333
      color: #555
    &[type=checkbox]
      width: 16px
      height: 16px
      margin-right: 5px
    &:focus
      box-shadow: none
       border-color: #3f9dff

  .styleButtons
    display: flex
    padding: 8px 10px
    opacity: .6
    border-top: 1px solid #bbb
    border-left: 1px solid #bbb
    border-right: 1px solid #bbb
    border-top-left-radius: 4px
    border-top-right-radius: 4px
    .styleButtonItem
      text-align: center
      line-height: 30px
      color: #2c3e50
      width: 30px
      height: 30px
      border: 1px solid transparent
      border-radius: 3px
      cursor: pointer
      &:hover
        border-color: #95a5a6
    .separator
      margin: 0 6px
      border-left: 1px solid #d9d9d9;


  textarea
    display: block
    width: 100%
    margin-bottom: 30px
    font: inherit
    min-height: 48px
    cursor: text
    border: 1px solid #ddd
    border-bottom-left-radius: 4px
    border-bottom-right-radius: 4px
    color: #000
    padding: 10px
    &:focus
      outline: #e59700 auto 5px

  .submitBtn
    transition: background-color .2s,opacity .2s
    display: inline-block
    margin-top: 10px
    padding: 6px 12px
    text-align: center
    font-weight: 400
    border: none
    border-radius: 4px
    box-shadow: none
    background: #08d092
    color: #fff
    line-height: 1.42857
    cursor: pointer
    &:hover
      background: #09df9c
      outline: none
    &:active
      background: #07c188
      outline: none
      box-shadow: inset 0 3px 5px rgba(0,0,0,.125)

  .instructions
    flex: 1
    padding: 16px
    background-color: rgba(255,204,128,.25)
    .instructionItem
      margin-bottom: 24px

</style>
