<template>
  <div class="container-login">
    <h3>LogIn</h3>
    <div>
      <div class="text-variant-login">Вход через соцсети</div>
      <div class="social-signin">
        <a class="social-signin-item vkontakte" href="/auth/vkontakte">
          <svg xmlns="http://www.w3.org/2000/svg" role="img" width="192" height="192" viewBox="0 0 192 192">
            <path fill="#FFFFFF" d="M157.233993,66.1462211 C158.123557,63.1797719 157.233994,61 153.000244,61 L139.000244,61 C135.440505,61 133.799415,62.8830035 132.909356,64.9593945 C132.909356,64.9593945 125.789878,82.3129373 115.704198,93.5851974 C112.441227,96.8481681 110.957879,97.8863636 109.178009,97.8863636 C108.288198,97.8863636 107,96.8481681 107,93.8819658 L107,66.1462211 C107,62.586482 105.96694,61 103.000244,61 L81.0002441,61 C78.7757158,61 77.4378669,62.6521562 77.4378669,64.2179674 C77.4378669,67.5925348 82.4804603,68.3707494 83.0002441,77.8633869 L83.0002441,98.4799003 C83.0002441,103 82.1839388,103.819509 80.4040693,103.819509 C75.6579974,103.819509 64.1131647,86.388441 57.2660122,66.4427426 C55.9241353,62.5659897 54.5782535,61 51.0002441,61 L37.0002441,61 C33.0002441,61 32.2001953,62.8830035 32.2001953,64.9593945 C32.2001953,68.6675178 36.9465141,87.059256 54.2998099,111.383646 C65.8685915,127.995268 82.1682449,137 97.0002441,137 C105.899345,137 107.000244,135 107.000244,131.555007 L107.000244,119 C107.000244,115 107.843292,114.201711 110.661357,114.201711 C112.737749,114.201711 116.297488,115.239906 124.603545,123.249196 C134.095936,132.741586 135.660882,137 141.000244,137 L155.000244,137 C159.000244,137 161.000244,135 159.846475,131.053112 C158.583906,127.119411 154.051802,121.412135 148.038124,114.646617 C144.774906,110.790356 139.88045,106.637574 138.397102,104.560689 C136.320711,101.891255 136.914001,100.704429 138.397102,98.3315162 C138.397102,98.3315162 155.454123,74.3036478 157.233993,66.1462211 Z"/>
          </svg>
        </a>
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
                  :input-error="getFieldErrorMessage('email')"                                    
      ></form-input>
      <form-input :value="password"
                  v-model.trim="$v.password.$model"
                  id="password"
                  type="password"
                  placeholder="Пароль"
                  label-text="Пароль"
                  :input-error="getFieldErrorMessage('password')"                                    
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

const errors = {
  email: {
    required: 'Это поле обязательно для заполнения',
    email: 'Введте пожалуйста корректный email',
  },
  password: {
    required: 'Это поле обязательно для заполнения',
  },
};

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
  },
  methods: {
    getFieldErrorMessage(field) {
      if (!this.$v[field].$error) {
        return '';
      }
      const errorKey = Object.keys(errors[field]).find(key => !this.$v[field][key]);
      return errors[field][errorKey] || 'Ошибка ввода';
    },
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
  overflow: hidden
  svg
    path
      fill: #3c4144
  &:hover
    background-color: #4d75a3
    svg
      path
        fill: #ffffff

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
