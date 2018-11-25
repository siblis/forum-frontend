<template>
  <div class="container-login">
    <h3>LogIn</h3>
    <div>
      <div class="text-variant-login">Вход через соцсети</div>
      <div class="social-signin">
        <a class="social-signin-item vkontakte" href="/auth/vkontakte">VK</a>
      </div>
      <div class="text-variant-login">или Email</div>
    </div>
    <form action="/" method="post">
      <div class="form-group">
        <label for="user_email"
          v-bind:class="{ invisible: !email }"
        >
          Email
        </label>
        <input autofocus="autofocus" class="form-control" placeholder="E-mail" type="email" id="user_email"   
          v-model="email"
        >
      <!-- <div class='feedback'>Errors</div> -->
      </div>
      <div class="form-group">
        <label for="user_password"
          v-bind:class="{ invisible: !password }"
        >
          Пароль
        </label>
        <input autocomplete="off" class="form-control" placeholder="Пароль" type="password" id="user_password" 
          v-model="password"
        >
      </div>
      <div class="form-group">
        <input type="checkbox" id="user_remember_me"
          v-model="rememberMe"
        >
        <label for="user_remember_me">Запомнить меня</label>
      </div>
      <div class="form-group">
        <input class="btn-submit" type="submit" value="Войти">
      </div>
    </form>    
  </div>
</template>

<script>
export default {
  name: 'LogIn',
  props: {},
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
    }
  },
  computed: {

  },
  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
*
  box-sizing: border-box
h3 
  color: #b90015

.container-login
  max-width: 450px
  font-family: Roboto,San Francisco,Helvetica Neue,Helvetica,Arial
  font-weight: 400
  font-size: 15px
  line-height: 24px
  margin: 0 auto // убрать при встраивании

.text-variant-login
  margin: 1em 0
  color: #aaaaaa
  text-align: center

.social-signin
  display: flex
  justify-content: center
  align-items: center
  margin: 4px 0
  height: 40px
  width: 100%
  &-item
    display: flex
    justify-content: center
    align-items: center
    width: 40px
    height: 40px
    border-radius: 4px
    color: #3c4144
    cursor: pointer

.vkontakte
  text-decoration: none
  font-weight: bold
  font-size: 25px
  background-color: #f4f6fa
  color: #3c4144
  &:hover
    background-color: #4d75a3
    color: #ffffff

.form-group
  margin-bottom: 15px
  label
    font-size: 13px
    font-weight: 400
    color: #50667b
    margin: 0
    display: inline-block
    max-width: 100%
    &.invisible
      opacity: 0
  .feedback
    font-size: 13px
    font-weight: 400
    margin: 0
    display: inline-block
    max-width: 100%
    color: #dc3545
  input:not([type="checkbox"]):not([type="submit"])
    background-color: rgba(164,175,221,.2)
    color: #50667b
    padding: 8px 16px
    width: 100%
    border-radius: 3px
    border: 1px solid transparent
    font-size: 15px
    height: 40px
    box-shadow: none
    &:focus
      background-color: #fff
      outline: none
      border: 1px solid #c6ccd1
      color: #2c2d30
    &.input-error
      border-color: #d74a5c
  input[type="checkbox"]
    opacity: 0
    z-index: 1
    cursor: pointer
    position: relative
    width: 15px
    height: 15px
    &+label
      display: inline-block
      vertical-align: middle
      position: relative
      min-height: 20px
      padding-left: 5px
      margin-bottom: 0
      font-weight: 400
      cursor: pointer
      font-size: 15px
      color: #2c2d30
      &:before
        content: ""
        width: 17px
        height: 17px
        border: 1px solid #ccc
        border-radius: 3px
        background-color: #ffffff
        display: inline-block
        position: absolute
        left: 0
        margin-left: -20px
    &:checked
      &+label
        &:before
          background-color: #6f64e9
          border-color: #6f64e9
        &:after
          content: "v"
          font-weight: bold
          height: 16px
          width: 16px
          color: #ffffff
          top: 0
          padding-left: 5px
          line-height: 1.2
          font-size: 15px
          position: absolute
          left: 0
          margin-left: -20px
  .btn-submit
    height: 40px
    padding: 10px 16px
    font-size: 14px
    width: 100%
    cursor: pointer
    background-color: #08d092
    color: #ffffff
    transition: background-color .2s,opacity .2s
    display: inline-block
    margin-bottom: 0
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
</style>
