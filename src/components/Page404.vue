<template>
       <div class="main-content row">
           <div class="main-text col-xs-4 col-md-5 ">
               <p class="head ">Ошибка 404</p>
               <p>Похоже,что такой страницы не существует.</p>
               <p>Не расстраивайтесь,сделайте шаг назад.</p>
               <br>
               <a href="Example.vue"><button class="button button-default-big">Назад</button></a>
               <p>Либо воспользуйтесь поиском ниже</p>
               <input type="search" placeholder="Поиск">
           </div>
           <div class="main-img col-xs-12   col-md-5 end-md last-md">
               <img src="../assets/img/cat404.png" alt="">
           </div>
       </div>
</template>

<script>
    export default {
        name: '404',
        props: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

@import "../assets/variables.sass"

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
    margin-left: 137px
    margin-top: 73px

.main-content
    padding-top: 151px
    padding-bottom: 151px

input
    background: url("../assets/img/icons/search.png")no-repeat 4px 2px
    padding-left: 30px

.head
    font-weight: bold
    font-size: 18px


</style>
