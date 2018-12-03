<template>
  <div class="container-registration">
    <h3>Registration</h3>
    <h3 class="registration-title">Регистрация</h3>
    <div class="social-registration">
      <a class="social-registration-item vkontakte" href="/auth/vkontakte">VK</a>
    </div>
    <form @submit.prevent="sendRegData()">

      <form-input :value="userName"
                  v-model.trim="$v.userName.$model"
                  id="userName"
                  type="text"
                  placeholder="Имя"
                  label-text="Имя"
                  :input-error="userNameError"                                    
      ></form-input>
      <form-input :value="userLastName"
                  v-model.trim="$v.userLastName.$model"
                  id="userLastName"
                  type="text"
                  placeholder="Фамилия"
                  label-text="Фамилия"
                  :input-error="userLastNameError"                                    
      ></form-input>
      <form-input :value="email"
                  v-model.trim="$v.email.$model"
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
      <form-input :value="confirmPassword"
                  v-model.trim="$v.confirmPassword.$model"
                  id="confirmPassword"
                  type="password"
                  placeholder="Подтверждение пароля"
                  label-text="Подтверждение"
                  :input-error="confirmPasswordError"                                    
      ></form-input>

      <div>
        <input  class="btn-submit-registration"
                type="submit"
                value="Зарегистрироваться"
                :disabled="submitStatus === 'PENDING'">
      </div>
    </form>    
  </div>
</template>

<script>
import FormInput from './FormInput.vue';
import { validationMixin } from 'vuelidate';
import { email, required, minLength , sameAs, helpers } from 'vuelidate/lib/validators';

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
    userNameError() {
      if (!this.$v.userName.$error) {
        return '';
      }
      const errors = {
        'required': 'Это поле обязательно для заполнения',
        'alpha': 'Имя может состоять только из букв одного алфавита',
        'minLength': 'Имя должно содержать не менее 4 симолов' 
      };
      const errorKey = Object.keys(errors).find(key => !this.$v.userName[key]);
      return errors[errorKey] || 'Ошибка ввода';
    },
    userLastNameError() {
      return this.$v.userLastName.$error ? 'Фамилия может состоять только из букв одного алфавита' : '';
    },
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
      if (!this.$v.password.$error) {
        return '';
      }
      const errors = {
        'required': 'Это поле обязательно для заполнения',
        'minLength': 'Минимальная длина пароля 8 символов',
      };
      const errorKey = Object.keys(errors).find(key => !this.$v.password[key]);
      return errors[errorKey] || 'Ошибка ввода';
    },
    confirmPasswordError() {
      return this.$v.confirmPassword.$error ? 'Введенные пароли не совпадают' : '';
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

.container-registration
  max-width: 450px
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
