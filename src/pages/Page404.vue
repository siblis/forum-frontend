<template>
       <div class="main-content row">
           <div class="main-text center-md center-xs">
               <p class="head ">Ошибка 404</p>
               <p>Похоже, что такой страницы не существует.</p>
               <p>Не расстраивайтесь, сделайте шаг назад.</p>
               <br>
               <a href="Example.vue"><button type="submit" class="button button-default-big">Назад</button></a>
               <p>Либо воспользуйтесь поиском ниже</p>
               <input type="search" placeholder="Поиск">
           </div>
           <div class="main-img ">
               <img src="../assets/img/cat404.png" alt="">
           </div>
       </div>
</template>

<script>
    export default {
        name: 'Page404',
        props: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

@import "../assets/variables"

*
  background-color: white
  color: black
  font-size: $medium_font_size

.button
  border-style: solid
  margin-bottom: 15px
  &:hover
      opacity: 0.7



.button-default-big
  padding: 10px 36px
  font-weight: normal
  font-size: 16px
  line-height: normal
  text-align: center
  background: #c4c4c4
  border-color: #c4c4c4
  border-radius: 5px
  cursor: pointer

.main-text

    margin-top: 73px


.main-content
    padding-top: 151px
    padding-bottom: 151px
    display: flex
    justify-content: center

input
    background: url("../assets/img/icons/search.png")no-repeat 4px 2px
    padding-left: 30px

.head
    font-weight: bold
    font-size: 18px

@media only screen and (max-width: 530px)
    .main-img
      display: none
    .main-content
      padding-top: 15px
      padding-bottom: 15px
    .main-text
      margin-top: 0



</style>
