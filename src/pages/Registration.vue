<template>
  <div>
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
                      :autofocus="true"
                      :input-error="getFieldErrorMessage('userName')"                                    
          />
          <form-input :value="email"
                      v-model.trim="$v.email.$model"
                      id="email"
                      type="email"
                      label-text="Почта"
                      :input-error="getFieldErrorMessage('email')"                                    
          />
          <form-input :value="password"
                      v-model.trim="$v.password.$model"
                      id="password"
                      type="password"
                      label-text="Пароль"
                      :input-error="getFieldErrorMessage('password')"                                    
          />
          <form-input :value="confirmPassword"
                      v-model.trim="$v.confirmPassword.$model"
                      id="confirmPassword"
                      type="password"
                      label-text="Подтвердить пароль"
                      :input-error="getFieldErrorMessage('confirmPassword')"                                    
          />
          <input  class="button button-main-big"
                  type="submit"
                  value="Зарегистрироваться"
                  :disabled="isFormBlocked"
          />
          <div class="checkbox-wrap">
            <input  type="checkbox"
                    id="isAccepted"
                    v-model="isAccepted">
            <label for="isAccepted">Настоящим подтверждаю, что я ознакомлен и согласен с условиями политики конфиденциальности. <a class='internal-href' href='/agreement'>Узнать больше</a></label>
          </div>
        </form>    
      </div>
    </div>
  </div>
</template>

<script>
import FormInput from '../components/FormInput.vue';
import { validationMixin } from 'vuelidate';
import { email, required, minLength , sameAs, helpers } from 'vuelidate/lib/validators';
import { REG_REQUEST } from '../store/actions';

const alpha = helpers.regex('alpha', /^([а-яё -]+|[a-z ]+)$/i);

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
      isAccepted: false,
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
    },
  },
  computed: {
    isFormBlocked() {
      return this.$store.getters.isAuthBlocked
          || this.$store.getters.isLoadProfileBlocked
          || this.$store.getters.isRegBlocked
          || !this.isAccepted
    },
  },
  methods: {
    getFieldErrorMessage(field) {
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
      if (!this.$v[field].$error) {
        return '';
      }
      const errorKey = Object.keys(errors[field]).find(key => !this.$v[field][key]);
      return errors[field][errorKey] || 'Ошибка ввода';
    },
    sendRegData() {
      this.$v.$touch();
      if (this.$v.$invalid || !this.isAccepted) {
        return;
      }
      const data = {
        name: this.userName,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmPassword,
      };
      this.$store.dispatch(REG_REQUEST, data)
        .then((response) => {
          this.$router.push('/');
        })
        .catch((err) => {
          this.$v.$reset();
        });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../assets/variables"

.registration-card-wrap
  padding: 50px 10px
  @media screen and ( max-width: 540px )
    padding: 10px
.registration-card
  max-width: 500px
  margin: 0 auto
  background-color: $text_background_color
  padding: 47px 60px 40px
  @media screen and ( max-width: 540px )
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
    color: $auth_form_social_title_color
    background-color: inherit
  &-list
    display: flex
    align-items: center
    background-color: inherit
  &-item
    color: $auth_form_social_item_color
    text-decoration: none
    background-color: inherit
    cursor: pointer
    &:hover
      color: $auth_form_social_hover_color
    &:active
      color: $button_hover_color
  & .vkontakte
    margin-left: 17.4px
  & .facebook
    align-self: flex-start
    margin-left: 28.6px
  & .twitter
    margin-left: 30.6px

i.icon
  &-google-plus
    font-size: 1.06rem
  &-vkontakte
    font-size: 0.745rem
  &-facebook
    font-size: 1.25rem
    align-self: flex-start
  &-twitter
    font-size: 0.925rem

input[type="submit"]
  margin-top: 8px
  margin-bottom: 11px
  &:focus
    outline: none
    box-shadow: 0px 2px 3px $auth_form_social_hover_color

.checkbox-wrap
    background-color: inherit
    display: flex

input[type="checkbox"]
  opacity: 0
  z-index: 1
  cursor: pointer
  margin: 1px
  &+label,
    background-color: inherit
    font-size: 9px
    color: $auth_form_label_text_color
    position: relative
    padding-left: 28px
    &:before
      content: "\e90f"
      font-family: 'fp'
      color: $auth_form_checkbox_color
      font-size: 1.05rem
      position: absolute
      left: -15px
  &+label>a
    background-color: inherit
    font-size: 9px
    color: $auth_form_label_text_color
    &:hover
      color: $base_font_color
  &:checked
    &+label:after
      content: "\e910"
      font-family: 'fp'
      color: $auth_form_label_text_color
      font-size: 1rem
      position: absolute
      left: -15px
      top: -1px
  &:focus
    outline: none
    &>+label:before
      color: $auth_form_social_hover_color
</style>
