<template>
  <div class='container'>
    <div class='registration-card-wrap'>
      <div class='registration-card'>
        <div class='logo-block'>
          <div class='logo-row'>
            <div class='logo-svg-wrap'>
              <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0V25H26V0H0ZM18.0177 6.29679H7.98331L3.46139 1.94977H22.5386L18.0177 6.29679ZM17.4236 8.24657V16.7534H8.57643V8.24657H17.4236ZM6.54867 7.67626V17.3247L2.02776 21.6717V3.32826L6.54867 7.67626ZM7.98331 18.7032H18.0177L22.5386 23.0502H3.46139L7.98331 18.7032ZM19.4513 17.3247V7.67626L23.9722 3.32924V21.6717L19.4513 17.3247Z" fill="black"/>
              </svg>
            </div>
            <span class='logo-text'>IT-room</span>
          </div>
          <span class='logo-description'>Форум для IT-специалистов</span>
        </div>
        <div class="social-registration">
          <h4 class="social-registration-title">Регистрация через соц сеть:</h4>
          <div class='social-registration-list'>
            <a class="social-registration-item google-plus" href="/auth/google-plus">
              <i class='icon-google-plus'></i>
            </a>
            <a class="social-registration-item vkontakte" href="/auth/vkontakte">
              <i class='icon-vkontakte'></i>
            </a>
            <a class="social-registration-item facebook" href="/auth/facebook">
              <i class='icon-facebook'></i>
            </a>
            <a class="social-registration-item twitter" href="/auth/twitter">
              <i class='icon-twitter'></i>
            </a>
          </div>
        </div>
        <form @submit.prevent="sendRegData()">

          <form-input :value="userName"
                      v-model.trim="$v.userName.$model"
                      id="userName"
                      type="text"
                      label-text="Имя"
                      :input-error="getFieldErrorMessage('userName')"                                    
          ></form-input>
          <form-input :value="email"
                      v-model.trim="$v.email.$model"
                      id="email"
                      type="email"
                      label-text="Почта"
                      :input-error="getFieldErrorMessage('email')"                                    
          ></form-input>
          <form-input :value="password"
                      v-model.trim="$v.password.$model"
                      id="password"
                      type="password"
                      label-text="Пароль"
                      :input-error="getFieldErrorMessage('password')"                                    
          ></form-input>
          <form-input :value="confirmPassword"
                      v-model.trim="$v.confirmPassword.$model"
                      id="confirmPassword"
                      type="password"
                      label-text="Подтвердить пароль"
                      :input-error="getFieldErrorMessage('confirmPassword')"                                    
          ></form-input>

          <input  class="button button-main-big"
                  type="submit"
                  value="Зарегистрироваться"
                  :disabled="submitStatus === 'PENDING'">
        </form>    
      </div>
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
@import "../assets/variables"
$social_hover_color: #263238
*
  box-sizing: border-box

.registration-card-wrap
  padding-top: 93px

.registration-card
  max-width: 500px
  margin: 0 auto
  background-color: $text_background_color
  padding: 47px 60px 40px
  @media screen and ( max-width: 480px )
    padding: 30px 10px 10px
  
  & form
    display: flex
    flex-direction: column
    align-items: stretch
    background-color: inherit

.logo
  &-block
    color: $base_font_color
    background-color: $text_background_color
    display: flex
    flex-direction: column
    width: 161px
    padding-bottom: 7px
    margin: 0 auto 30px

  &-row
    display: flex
    justify-content: space-between
    background-color: inherit
    margin-bottom: 5px
  &-svg-wrap
    background-color: inherit
    height: 25px
    &>svg
      background-color: inherit
  &-description
    background-color: inherit
    font-size: 12px
    line-height: 12px
  &-text
    background-color: inherit
    font-size: 32px
    font-weight: bolder
    padding-right: 5px
    line-height: 25px

.social-registration
  background-color: inherit
  margin-bottom: 30px
  &-title
    margin: 0 0 14px
    font-weight: 500
    font-size: 20px
    color: $dark_background_color
    background-color: inherit
  &-list
    display: flex
    align-items: center
    background-color: inherit
  &-item
    color: $light_button_main_color
    text-decoration: none
    background-color: inherit
    cursor: pointer
    &:hover
      color: $social_hover_color
  & .google-plus
    font-size: 1.06rem
  & .vkontakte
    font-size: 0.745rem
    margin-left: 17.4px
  & .facebook
    font-size: 1.25rem
    align-self: flex-start
    margin-left: 28.6px
  & .twitter
    font-size: 0.925rem
    margin-left: 30.6px

input[type="submit"]
  margin-top: 8px
  height: 40px
  padding: 10px 16px
  border-radius: 5px
  font-weight: normal
  font-size: 16px
  font-weight: 400
  line-height: normal
  text-align: center
  color: $text_background_color
  background-color: $light_button_main_color
  cursor: pointer
  margin-bottom: 0
  border: none
  box-shadow: none
  &:hover,
  &:focus
    outline: none
  &:active
    background-color: $social_hover_color
</style>
