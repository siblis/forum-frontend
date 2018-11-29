<template>
  <div class="container-registration">
    <h3>Registration</h3>
    <h3 class="registration-title">Регистрация</h3>
    <div class="social-registration">
      <a class="social-registration-item vkontakte" href="/auth/vkontakte">VK</a>
    </div>
    <form @submit.prevent="sendRegData()">

      <form-input :value="userName.value"
                  v-model="userName.value"
                  id="userName"
                  type="text"
                  placeholder="Имя"
                  label-text="Имя"
                  :input-error="userName.error"                                    
      ></form-input>
      <form-input :value="userLastName.value"
                  v-model="userLastName.value"
                  id="userLastName"
                  type="text"
                  placeholder="Фамилия"
                  label-text="Фамилия"
                  :input-error="userLastName.error"                                    
      ></form-input>
      <form-input :value="email.value"
                  v-model="email.value"
                  id="email"
                  type="email"
                  placeholder="Email"
                  label-text="E-mail"
                  :input-error="email.error"                                    
      ></form-input>
      <form-input :value="password.value"
                  v-model="password.value"
                  id="password"
                  type="password"
                  placeholder="Пароль"
                  label-text="Пароль"
                  :input-error="password.error"                                    
      ></form-input>
      <form-input :value="confirmPassword.value"
                  v-model="confirmPassword.value"
                  id="confirmPassword"
                  type="password"
                  placeholder="Подтверждение пароля"
                  label-text="Подтверждение"
                  :input-error="confirmPassword.error"                                    
      ></form-input>

      <div>
        <input class="btn-submit-registration" type="submit" value="Зарегистрироваться">
      </div>
    </form>    
  </div>
</template>

<script>
import FormInput from './FormInput.vue';
export default {
  name: 'Registration',
  components: {
    FormInput,
  },
  props: {},
  data() {
    return {
      userName: {
        value: '',
        error: '',
      },
      userLastName: {
        value: '',
        error: '',
      },
      email: {
        value: '',
        error: '',
      },
      password: {
        value: '',
        error: '',
      },
      confirmPassword: {
        value: '',
        error: '',
      }
    }
  },
  computed: {

  },
  methods: {
    sendRegData() {
      const data = {
        name: this.userName.value,
        lastName: this.userLastName.value,
        email: this.email.value,
        password: this.password.value,
      }
      // eslint-disable-next-line
      console.log(`Try send: ${JSON.stringify(data)}`);
    }
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
