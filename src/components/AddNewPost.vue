<template>
  <div class="addPostContent row">
    <h3 class="addPostTitle">Создание новой темы</h3>

    <div class="formWrap ">


      <form class="posts" action="#" method="#">
        <label for="headline">Заголовок темы</label>

          <input type="text" id="headline" placeholder="Минимум 10 символов">

        <label for="tags">Тэги</label>
         <input type="text" id="tags" placeholder="Через запятую (минимум 3 буквы)">

        <label for="message" class="smallLabel">Текст сообщения</label>

          <textarea id="message" rows="10" placeholder="Введите текст сообщения" ></textarea>
        <label>
          <input type="checkbox"> Я внимательно ознакомился и обязуюсь соблюдать <a class="rules" href="#">правила форума</a>.
        </label><br>
        <label>
          <input type="checkbox">
            Я согласен с тем, что модераторы могут удалять темы и комментарии за
            нарушение правил без объяснения причин.
        </label><br>

        <button type="submit" class="button button-default-big">Опубликовать тему</button>
        <button type="submit" class="button button-default-big">Отмена</button>
      </form>
    </div>
    <div class="instructions  ">
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

    props: {},

  }


</script>

<style lang="sass" scoped>

  @import "../assets/variables.sass"

  *

    margin: 0 auto

  .posts
      background-color: white

  .addPostTitle
      color: black
      font-size: 26px
      font-weight: bold




  .addPostContent
    display: flex
    margin: 0 auto
    padding: 24px 16px 0
    font-weight: 400
    font-size: 15px
    line-height: 24px
    color: #2c2d30


  .formWrap
    flex: 2
    margin-right: 32px
    background-color: white
    margin-top: 58px
    height: 561px
    padding: 38px 38px



  label
    font-size: 16px
    margin-bottom: 5px
    background-color: white


    &.smallLabel
      font-size: 16px
      line-height: 20px

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
      background-color: white
    &[type=checkbox]
      width: 16px
      height: 16px
      margin-right: 5px
      background-color: white

    &:focus
      box-shadow: none





  textarea

    width: 100%
    margin-bottom: 30px
    font-size: 13px
    min-height: 48px
    cursor: text
    border: 1px solid #ddd
    border-bottom-left-radius: 4px
    border-bottom-right-radius: 4px
    color: #000
    padding: 10px
    background-color: white
    &:focus
      outline: #e59700 auto 5px


  .instructions
    flex: 1
    padding: 16px
    background-color: #959595
    .instructionItem
       margin-bottom: 24px
  .button
    float: right
    margin-left: 7px
    margin-top: 25px
    cursor: pointer
    &:hover
      opacity: 0.7


  .rules
    color: black
    background-color: white
    font-size: 16px


</style>
