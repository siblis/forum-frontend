<template>
  <div>
    <div class='auth-card-wrap'>
      <div class='auth-card'>
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
        <div class="social-auth">
          <h4 class="social-auth-title">Войти через соц сеть:</h4>
          <div class='social-auth-list'>
            <a class="social-auth-item google-plus" href="/auth/google-plus">
              <i class='icon-google-plus'></i>
            </a>
            <a class="social-auth-item vkontakte" href="/auth/vkontakte">
              <i class='icon-vkontakte'></i>
            </a>
            <a class="social-auth-item facebook" href="/auth/facebook">
              <i class='icon-facebook'></i>
            </a>
            <a class="social-auth-item twitter" href="/auth/twitter">
              <i class='icon-twitter'></i>
            </a>
          </div>
        </div>
        <form @submit.prevent="sendAuthData()">
          <form-input :value="email.value"
                      v-model="$v.email.$model"
                      id="email"
                      type="email"
                      label-text="E-mail"
                      :autofocus="true"
                      :input-error="getFieldErrorMessage('email')"                                    
          />
          <form-input :value="password"
                      v-model.trim="$v.password.$model"
                      id="password"
                      type="password"
                      label-text="Пароль"
                      :input-error="getFieldErrorMessage('password')"                                    
          />
          <input  class="button button-main-big"
                  type="submit"
                  value="Войти"
                  :disabled="isFormBlocked"
          />
        </form>
        <a href='/pass/recovery' class='recovery-href'>Забыли пароль?</a>
      </div>
      <aside class='aside-card'>
        Еще нет аккаунта?
        <router-link to="/signup" class="aside-card-link">Зарегистрируйтесь</router-link>
      </aside>
    </div>
  </div>
</template>

<script>
import FormInput from '../components/FormInput.vue';
import { validationMixin } from 'vuelidate';
import { email, required } from 'vuelidate/lib/validators';
import { AUTH_LOGIN } from '../store/actions';

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
    isFormBlocked() {
      return this.$store.getters.isAuthBlocked
          || this.$store.getters.isLoadProfileBlocked
          || this.$store.getters.isRegBlocked
    },
  },
  methods: {
    getFieldErrorMessage(field) {
      const errors = {
        email: {
          required: 'Это поле обязательно для заполнения',
          email: 'Введте пожалуйста корректный email',
        },
        password: {
          required: 'Это поле обязательно для заполнения',
        },
      };

      if (!this.$v[field].$error) {
        return '';
      }

      const errorKey = Object.keys(errors[field]).find(key => !this.$v[field][key]);
      return errors[field][errorKey] || 'Ошибка ввода';
    },
    sendAuthData() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const credentials = {
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch(AUTH_LOGIN, credentials)
        .then(() => {
          this.$router.push('/');
        })
        .catch(() => {
          this.password = '';
          this.$v.$reset();
        });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../assets/variables"

.auth-card-wrap
  padding: 50px 10px
  @media screen and ( max-width: 540px )
    padding: 10px
.auth-card
  max-width: 500px
  margin: 0 auto 29px
  background-color: $text_background_color
  padding: 47px 60px 40px
  @media screen and ( max-width: 540px )
    padding: 30px 10px 10px
    margin-bottom: 10px
  
  & form
    display: flex
    flex-direction: column
    align-items: stretch
    background-color: inherit

.aside-card
  max-width: 500px
  margin: 0 auto
  padding: 21px 0
  background-color: $text_background_color
  font-size: 15px
  text-align: center
  &-link
    background-color: inherit
    color: $auth_form_label_text_color
    text-decoration: none
    &:hover
      color: $base_font_color

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

.social-auth
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

.recovery-href,
.aside-card-link
  background-color: inherit
  font-size: 1rem
  color: $auth_form_label_text_color
  text-decoration: none
  outline: none
  &:hover
    color: $base_font_color
    text-decoration: underline
  &:focus
    text-decoration: underline
</style>
