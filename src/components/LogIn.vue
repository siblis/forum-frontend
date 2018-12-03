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
    <form @submit.prevent="sendRegData()">
      <form-input :value="email.value"
                  v-model="$v.email.$model"
                  id="email"
                  type="email"
                  placeholder="Email"
                  label-text="E-mail"
                  :input-error="emailError"                                    
      ></form-input>
      <form-input :value="password"
                  v-model.trim="$v.password.$model"
                  id="password"
                  type="password"
                  placeholder="Пароль"
                  label-text="Пароль"
                  :input-error="passwordError"                                    
      ></form-input>
      <div class="form-group">
        <input  type="checkbox"
                id="user_remember_me"
                v-model="rememberMe">
        <label for="user_remember_me">Запомнить меня</label>
      </div>
      <div class="form-group">
        <input  class="btn-submit"
                type="submit"
                value="Войти"
                :disabled="submitStatus === 'PENDING'">
      </div>
    </form>    
  </div>
</template>

<script>
import FormInput from './FormInput.vue';
import { validationMixin } from 'vuelidate';
import { email, required } from 'vuelidate/lib/validators';

export default {
  name: 'LogIn',
  mixins: [validationMixin],
  components: {
    FormInput,
  },
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      submitStatus: null,
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  computed: {
    emailError() {
      if (!this.$v.email.$error) {
        return '';
      }
      const errors = {
        'required': 'Это поле обязательно для заполнения',
        'email': 'Введте пожалуйста корректный email',
      };
      const errorKey = Object.keys(errors).find(key => !this.$v.email[key]);
      return errors[errorKey] || 'Ошибка ввода';
    },
    passwordError() {
      return this.$v.password.$error ? 'Это поле обязательно для заполнения' : '';
    },
  },
  methods: {
    sendRegData() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
        return;
      }
      const data = {
        email: this.email,
        password: this.password,
      };
      this.submitStatus = 'PENDING';
      // eslint-disable-next-line
      console.log(`Try send: ${JSON.stringify(data)}`);
      setTimeout(() => {
        this.submitStatus = 'OK';
      }, 2000);
    },
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

input[type="checkbox"]
  opacity: 0
  z-index: 1
  cursor: pointer
  position: relative
  width: 15px
  height: 15px
  margin-bottom: 25px
  margin-top: 5px
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
