<template>
  <div class="container-registration">
    <h3>Registration</h3>
    <h3 class="registration-title">Регистрация</h3>
    <div class="social-registration">
      <a class="social-registration-item vkontakte" href="/auth/vkontakte">VK</a>
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
      <div class='feedback'
        v-bind:class="{ invisible: !email }"
      >
        Lorem ipsum dolor sit amet consectetur.
      </div>
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
        <div class='feedback'
          v-bind:class="{ invisible: !password }"
        >
          Errors
        </div>
      </div>
      <div class="form-group">
        <input class="btn-submit-registration" type="submit" value="Зарегистрироваться">
      </div>
    </form>    
  </div>
</template>

<script>
export default {
  name: 'Registration',
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

.container-registration
  max-width: 450px
  font-family: Roboto,San Francisco,Helvetica Neue,Helvetica,Arial
  font-weight: 400
  font-size: 15px
  line-height: 24px
  margin: 0 auto // убрать при встраивании

.registration-title
  font-size: 22px
  line-height: 28px
  text-align: center
  font-weight: 500
  color: #50667b
  margin: 20px 0

.social-registration
  display: flex
  justify-content: center
  align-items: center
  margin: 0 0 15px
  height: 40px
  width: 100%
  &-item
    display: flex
    justify-content: center
    align-items: center
    width: 40px
    height: 40px
    border-radius: 4px
    cursor: pointer

.vkontakte
  text-decoration: none
  font-weight: bold
  font-size: 25px
  background-color: #4d75a3
  color: #ffffff
  &:hover
    background-color: #5982b1

.invisible
      opacity: 0

.form-group
  // margin-bottom: 15px
  label
    font-size: 13px
    font-weight: 400
    color: #50667b
    margin: 0
    // display: inline-block
    max-width: 100%
  .feedback
    font-size: 13px
    font-weight: 400
    margin: 0
    // display: inline-block
    max-width: 100%
    color: #dc3545
    line-height: 15px
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
  
  .btn-submit-registration
    height: 40px
    padding: 10px 16px
    font-size: 15px
    width: 100%
    cursor: pointer
    background-color: #f65121
    color: #ffffff
    transition: background-color .2s,opacity .2s
    display: inline-block
    margin-bottom: 0
    margin-top: 25px
    text-align: center
    font-weight: 400
    border: none
    border-radius: 4px
    box-shadow: none
    &:hover,
    &:focus
      background-color: #f7643a
      outline: none
    &:active
      box-shadow: inset 0 3px 5px rgba(0,0,0,.125)
</style>
