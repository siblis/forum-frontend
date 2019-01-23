<template>
  <div id="main">
    <div id="left-main-block"></div>
    <div id="right-main-block">
      <div id="nav-panel">
        <router-link :to="{name: 'home'}">
          <svg viewBox="4 0 16 16" fill="none">
            <path d="M7.44645 9.35355L12.6929 14.6L12 15.2929L4.70711 8L12 0.707107L12.6929 1.4L7.44645 6.64645L6.59289 7.5H7.8H19.5V8.5H7.8H6.59289L7.44645 9.35355Z" fill="black" fill-opacity="0.5" stroke="black"/>
          </svg>Главная
        </router-link>
      </div>
      <div id="main-content">
        <div id="left-main-content">
          <h1>Личный кабинет</h1>
          
          <div id="user-personal">
            <div id="personal-user-img">
              <a href="#" id="edit-user-img">
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.8255 4.99216L11.674 0.840659C11.557 0.723665 11.4035 0.666672 11.25 0.666672C11.0965 0.666672 10.943 0.723665 10.826 0.841182L0 11.6667V16.6667H5L15.8255 5.84118C15.943 5.72367 16 5.57018 16 5.41669C16 5.26267 15.943 5.10968 15.8255 4.99216ZM1.5 15.1667V12.7272L3.9395 15.1667H1.5ZM5.2805 14.3867L2.2805 11.3867L9.22 4.44667L12.22 7.44667L5.2805 14.3867ZM13.2805 6.38667L10.2805 3.38667L11.25 2.41666L14.25 5.41666L13.2805 6.38667Z" fill="white"/></svg>
              </a>
            </div>
            <div id="user-name">
              <h2>Гриша Гикбрейнов</h2>
              <div id="communion">
                <div class="questions">3 вопроса</div>
                <div class="answers">2 ответа</div>
              </div>
            </div>
          </div>
          <div id="tabs-block">
            <div class="tabs-list">
              <input id="tab1" type="radio" name="tabs">
              <label for="tab1" class="tabs checked">Анкета</label>
              <input id="tab2" type="radio" name="tabs">
              <label for="tab2" class="tabs">Настройки</label>
              <input id="tab3" type="radio" name="tabs">
              <label for="tab3" class="tabs">Ответы</label>
              <input id="tab4" type="radio" name="tabs">
              <label for="tab4" class="tabs">Вопросы</label>
              <input id="tab5" type="radio" name="tabs">
              <label for="tab5" class="tabs">Нравится</label>
            </div>
            
            <section id="tab-content">
              <form name="user-info">
                <label for="user-name">Имя</label>
                <input id="user-name-field" name="user-name">
                
                <label for="user-surname">Фамилия</label>
                <input id="user-surname-field" name="user-surname">
                
                <label for="user-about">О себе</label>
                <div><textarea id="user-about-field" name="user-about"></textarea></div>
                
                <label for="user-contacts">Контакты</label>
                <div>
                  <select name="user-contacts" class="user-contacts-list">
                    <option selected>Email</option>
                    <option>Телефон</option>
                    <option>Skype</option>
                  </select>
                  <input name="user-contacts" class="user-contacts-field">
                </div>
                <a href="#" class="add-contact">Добавить</a>
                
                
                <label for="user-location">Местоположение</label>
                <div>
                  <select name="user-location" class="user-location-list">
                    <option disabled selected>Страна</option>
                    <option>Москва</option>
                    <option>Санкт-Петербург</option>
                    <option>Екатеринбург</option>
                    <option>Нижний Новгород</option>
                    <option>Казань</option>
                    <option>Челябинск</option>
                    <option>Омск</option>
                    <option>Самара</option>
                    <option>Ростов-на-Дону</option>
                  </select>
                </div>
                
                <div id="button-wrapper">
                  <button class="button button-main">Сохранить</button>
                  <button class="button button-main">Отмена</button>
                </div>
              </form>
            </section>
          </div>

        </div>
        <div class="new-topic-block">
          <h2>Новые темы</h2>
          <div class="new-topic">
            <div class="userImg">U</div>
            <a href="#" class="new-topic-name col-xs">Как вы разрабатываете REST API?</a>
            <div class="new-topic-props col-xs-2">3<br/>ответа</div>
          </div>
          <div class="new-topic">
            <div class="userImg">U</div>
            <a href="#" class="new-topic-name col-xs">Как вы разрабатываете REST API?</a>
            <div class="new-topic-props col-xs-2">3<br/>ответа</div>
          </div>
          <div class="new-topic">
            <div class="userImg">U</div>
            <a href="#" class="new-topic-name col-xs">Как вы разрабатываете REST API?</a>
            <div class="new-topic-props col-xs-2">3<br/>ответа</div>
          </div>
          <div class="new-topic">
            <div class="userImg">U</div>
            <a href="#" class="new-topic-name col-xs">Как вы разрабатываете REST API?</a>
            <div class="new-topic-props col-xs-2">3<br/>ответа</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'ForumAccount',
        props: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../assets/variables"

#main
  display: grid
  grid-template-columns: 15% 85%
  min-height: 450px
  
#left-main-block
  background-color: $aside_background_color
  margin-right: 15px
  
#right-main-block
  background-color: $background-color
  display: flex
  flex-direction: column
  
#nav-panel
  margin: 12px 0 15px 0
#nav-panel a
  text-decoration: none
  color: inherit
  display: inline-flex
  align-items: center
  font-family: Roboto
  font-style: normal
  font-weight: 500
  line-height: normal
  font-size: 16px
  color: #000000
#nav-panel svg
  width: 16px
  height: 16px
  margin-right: 11px

#main-content
  display: flex
  align-items: flex-start

#left-main-content
  background-color: $text_background_color
  margin-right: 15px
  min-height: 600px
  width: 68%
  padding: 16px 19px
  h1
    font-family: Roboto
    font-style: normal
    font-weight: 500
    line-height: normal
    font-size: 26px
    color: #000000
    margin-bottom: 17px

#user-personal
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: flex-start
  align-items: center
  align-content: stretch
  margin-bottom: 23px
#personal-user-img
  width: 104px
  height: 104px
  border-radius: 50%
  margin-right: 19px
  background-color: $button_default_color
  position: relative
#edit-user-img
  border-radius: 50%
  position: absolute
  display: flex
  justify-content: center
  align-items: center
  width: 32px
  height: 32px
  cursor: pointer
  background: $dark_background_color
  top: 70px
  left: 70px

#user-name h2
  margin-bottom: 10px
  font-family: Roboto
  font-style: normal
  font-weight: 500
  line-height: normal
  font-size: 20px
  color: #000000
#communion
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: flex-start
  align-items: baseline
  align-content: stretch
.questions, .answers
  font-family: Roboto
  font-size: 13px
  text-align: center
  color: #000000
.questions
  margin-right: 15px

#tabs-block
  padding-left: 10px
  .tabs-list
    display: block
  input
    display: none
  .tabs
    cursor: pointer
  .tabs:not(:first-child)
    margin-left: 27px
  .checked
    text-decoration: underline
  section
    margin-top: 14px
#tab-content
  label
    font-family: Roboto
    font-weight: 500
    font-size: 16px
    color: #4D4D4D
    display: block
    margin-bottom: 6px
  input, textarea, select
    display: block
    background: #FFFFFF
    border: 1px solid #C4C4C4
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1)
    border-radius: 4px
    height: 40px
    margin-bottom: 14px
  #user-name-field, #user-surname-field, #user-about-field
    width: 561px
  textarea
    height: 125px
  .user-contacts-list
    display: inline-block
    width: 138px
    margin: 0 22px 0 0
  .user-contacts-field
    display: inline-block
    width: 407px
  .add-contact
    display: block
    font-family: Roboto
    font-size: 15px
    color: #757575
    text-decoration: none
    margin: 6px 0 12px 10px
  .user-location-list
    width: 383px
    
.button
  margin: 0 34px 14px 0

.new-topic-block
  background-color: $topic_block_background
  width: 32%
  padding: 13px 37px 30px 12px
  display: flex
  flex-direction: column
  h2
    font-size: $h2_font_size
    font-weight: bolder
    line-height: 23px
    margin-bottom: 30px
    
.new-topic
  display: flex
  align-items: center
  margin-bottom: 25px 
  a
    text-decoration: none
    font-size: 14px
    font-weight: 500
    
.userImg
  line-height: 32px
  width: 32px
  border-radius: 50%
  background-color: #EEEEEE
  text-align: center
  font-size: 14px
  font-weight: 500
  
.new-topic-props
  text-align: center
  font-size: 14px
  font-weight: 500
  
@media screen and (max-width: 1100px)
  .user-contacts-field
    margin: 10px 0 0 0
  input, textarea, select
    min-width: 100%
  #user-name-field, #user-surname-field, #user-about-field
    max-width: 100%
    
@media screen and (max-width: 1000px)
  #main
    grid-template-columns: 100%
    padding: 0 15px 0
  #main-content
    flex-direction: column
  #left-main-content
    width: 100%
  .new-topic-block
    width: 100%
    margin-top: 15px
  #left-main-block
    display: none
    
@media screen and (max-width: 525px)
  #personal-user-img
    min-width: 104px
  .user-contacts-field, .user-location-list
    max-width: 100%
  .tabs
    display: inline-block
  #button-wrapper
    display: flex
    justify-content: center
    flex-wrap: wrap
    
@media screen and (max-width: 335px)
  #user-personal
    justify-content: center
    flex-wrap: wrap
    
</style>
