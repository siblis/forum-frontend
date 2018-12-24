import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import profile from './modules/profile';
import registration from './modules/registration';
import topic from './modules/toptic';

Vue.use(Vuex);

const useStrict = process.env.NODE_ENV !== 'production'; // vuex strict mode

export default new Vuex.Store({
  modules: {
    auth,
    profile,
    registration,
    topic,
  },
  strict: useStrict,
});
