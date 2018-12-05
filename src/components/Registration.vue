<template>
  <div class='container'>    
    <div class='registration-card'>
      <div class='logo-block'>
        <div class='logo-row'>
          <div>
            <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0V25H26V0H0ZM18.0177 6.29679H7.98331L3.46139 1.94977H22.5386L18.0177 6.29679ZM17.4236 8.24657V16.7534H8.57643V8.24657H17.4236ZM6.54867 7.67626V17.3247L2.02776 21.6717V3.32826L6.54867 7.67626ZM7.98331 18.7032H18.0177L22.5386 23.0502H3.46139L7.98331 18.7032ZM19.4513 17.3247V7.67626L23.9722 3.32924V21.6717L19.4513 17.3247Z" fill="black"/>
            </svg>
          </div>
          <span class='logo-text'>IT-room</span>
        </div>
        <span class='logo-description'>Форум для IT-специалистов</span>
      </div>
      <h3 class="registration-title">Регистрация</h3>
      <div class="social-registration">
        <a class="social-registration-item vkontakte" href="/auth/vkontakte">
          <svg xmlns="http://www.w3.org/2000/svg" role="img" width="192" height="192" viewBox="0 0 192 192">
            <path fill="#FFFFFF" d="M157.233993,66.1462211 C158.123557,63.1797719 157.233994,61 153.000244,61 L139.000244,  61 C135.440505,61 133.799415,62.8830035 132.909356,64.9593945 C132.909356,64.9593945 125.789878,82.3129373  115.704198,93.5851974 C112.441227,96.8481681 110.957879,97.8863636 109.178009,97.8863636 C108.288198,  97.8863636 107,96.8481681 107,93.8819658 L107,66.1462211 C107,62.586482 105.96694,61 103.000244,61 L81.0002441, 61 C78.7757158,61 77.4378669,62.6521562 77.4378669,64.2179674 C77.4378669,67.5925348 82.4804603,68.3707494   83.0002441,77.8633869 L83.0002441,98.4799003 C83.0002441,103 82.1839388,103.819509 80.4040693,103.819509  C75.6579974,103.819509 64.1131647,86.388441 57.2660122,66.4427426 C55.9241353,62.5659897 54.5782535,61   51.0002441,61 L37.0002441,61 C33.0002441,61 32.2001953,62.8830035 32.2001953,64.9593945 C32.2001953,68.6675178  36.9465141,87.059256 54.2998099,111.383646 C65.8685915,127.995268 82.1682449,137 97.0002441,137 C105.899345, 137 107.000244,135 107.000244,131.555007 L107.000244,119 C107.000244,115 107.843292,114.201711 110.661357, 114.201711 C112.737749,114.201711 116.297488,115.239906 124.603545,123.249196 C134.095936,132.741586   135.660882,137 141.000244,137 L155.000244,137 C159.000244,137 161.000244,135 159.846475,131.053112 C158.583906, 127.119411 154.051802,121.412135 148.038124,114.646617 C144.774906,110.790356 139.88045,106.637574 138.397102, 104.560689 C136.320711,101.891255 136.914001,100.704429 138.397102,98.3315162 C138.397102,98.3315162   155.454123,74.3036478 157.233993,66.1462211 Z"/>
            </svg>
        </a>
      </div>
      <form @submit.prevent="sendRegData()">

        <form-input :value="userName"
                    v-model.trim="$v.userName.$model"
                    id="userName"
                    type="text"
                    placeholder="Имя"
                    label-text="Имя"
                    :input-error="getFieldErrorMessage('userName')"                                    
        ></form-input>
        <form-input :value="userLastName"
                    v-model.trim="$v.userLastName.$model"
                    id="userLastName"
                    type="text"
                    placeholder="Фамилия"
                    label-text="Фамилия"
                    :input-error="getFieldErrorMessage('userLastName')"                                    
        ></form-input>
        <form-input :value="email"
                    v-model.trim="$v.email.$model"
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
        <form-input :value="confirmPassword"
                    v-model.trim="$v.confirmPassword.$model"
                    id="confirmPassword"
                    type="password"
                    placeholder="Подтверждение пароля"
                    label-text="Подтверждение"
                    :input-error="getFieldErrorMessage('confirmPassword')"                                    
        ></form-input>

        <div>
          <input  class="btn-submit-registration"
                  type="submit"
                  value="Зарегистрироваться"
                  :disabled="submitStatus === 'PENDING'">
        </div>
      </form>    
    </div>
  </div>
</template>

<script>
import FormInput from './FormInput.vue';
import { validationMixin } from 'vuelidate';
import { email, required, minLength , sameAs, helpers } from 'vuelidate/lib/validators';

const alpha = helpers.regex('alpha', /^([а-яё -]+|[a-z ]+)$/i);

const errors = {
  userName: {
    required: 'Это поле обязательно для заполнения',
    alpha: 'Имя может состоять только из букв одного алфавита',
    minLength: 'Имя должно содержать не менее 4 симолов', 
  },
  userLastName: {
    alpha: 'Фамилия может состоять только из букв одного алфавита',
  },
  email: {
    required: 'Это поле обязательно для заполнения',
    email: 'Введте пожалуйста корректный email',
  },
  password: {
    required: 'Это поле обязательно для заполнения',
    minLength: 'Минимальная длина пароля 8 символов',
  },
  confirmPassword: {
    sameAsPassword: 'Пароли не совпадают',
  },
};

export default {
  name: 'Registration',
  mixins: [validationMixin],
  components: {
    FormInput,
  },
  props: {},
  data() {
    return {
      userName: '',
      userLastName: '',
      email: '',
      password: '',
      confirmPassword:'',
      submitStatus: null,
    };
  },
  validations: {
    userName: {
      alpha,
      required,
      minLength: minLength(4),
    },
    userLastName: {
      alpha,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    confirmPassword: {
      sameAsPassword: sameAs('password'),
    }
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
        name: this.userName,
        lastName: this.userLastName,
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

.registration-card
  max-width: 500px
  margin: 0 auto // убрать при встраивании

.logo
  color: #000000
  &-block
    display: flex
    flex-direction: column
    width: 161px
    margin: 0 auto
  &-row
    display: flex
    justify-content: space-between
  &-description
    font-size: 12px
  &-text
    font-size: 32px
    font-weight: bolder
    padding-right: 5px
    line-height: 26px


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
