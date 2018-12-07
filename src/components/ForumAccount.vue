<template>
    <div>
      <h3>Страница пока без дизайна и адаптива!</h3>
       <div class="user-profile">
           <div class="edited">
              <div class="foto">Фото</div>
               <div class="form-group">
                   <input class="btn-submit" type="submit" value="Редактировать профиль">
               </div>
               <div class="form-group">
                   <input class="btn-submit" type="submit" value="Редактировать резюме">
               </div>
           </div>
           <div class="info">
                   <span>Online</span>
                   <h3>user name</h3>
                   <p>Россия, г. Город</p>
                   <p><a href="#">Добавьте информацию о себе</a></p>
                   <p><a href="#">Добавьте свои интересы</a></p>
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
<style lang="sass"  scoped>
.user-profile
  display: flex
  .edited
   text-align: center
   width: 400px
   padding: 30px

  .foto
   width: 150px
   height: 150px
   background: gray
   border-radius: 100px
   text-align: center
   margin-left: 117px
  .btn-submit
      height: 40px
      padding: 10px 16px
      font-size: 18px
      width: 300px
      cursor: pointer
      background-color: blueviolet
      color: #ffffff
      transition: background-color .2s,opacity .2s
      display: inline-block
      margin-bottom: 0
      margin-top: 20px
      text-align: center
      font-weight: 400
      border: none
      border-radius: 4px
      box-shadow: none
      &:hover,
      &:focus
          border-color: #158b6c
          background-color: #09df9c
          outline: none
      &:active
          box-shadow: inset 0 3px 5px rgba(0,0,0,.125)



h3
 font-size: 40px

.info a
 text-decoration: none
 font-size: 20px
 color: gray
 &:hover
  color: blueviolet


.info p
 font-size: 20px
 color: gray




.info span
 top: 14px
 right: 680px
 font-size: 20px


</style>
