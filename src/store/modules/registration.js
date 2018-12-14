/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import { REG_REQUEST, AUTH_LOGIN, AUTH_LOGOUT } from '../actions';

const REG_REQUEST_MUT = 'REG_REQUEST_MUT';
const REG_SUCCESS_MUT = 'REG_SUCCESS_MUT';
const REG_ERROR_MUT = 'REG_ERROR_MUT';

const initialState = {
  status: '',
  errorMessage: '',
};

const mutations = {
  [REG_REQUEST_MUT]: state => state.status = 'PENDING',
  [REG_SUCCESS_MUT]: state => state.status = 'SUCCESS',
  [REG_ERROR_MUT]: (state, message) => {
    state.status = 'ERROR';
    state.errorMessage = message;
  },
};

const getters = {
  isRegBlocked: state => state.status === 'PENDING'
};

const actions = {
  [REG_REQUEST]: ({ commit, dispatch, rootGetters }, data) => {
    if (rootGetters.isLoggedIn) {
      dispatch(AUTH_LOGOUT);
    }

    commit(REG_REQUEST_MUT);

    return Vue.axios.post('users/register', data)
      .then((response) => {
        if (response.status === 503) {
          throw new Error('Поля не должны быть пустыми');
        }
        if (response.status === 404) {
          throw new Error('Запрашиваемая страница отсутствует');
        }
        if (response.status !== 201) {
          throw new Error(`Some netwotk problem, response status: ${response.status}`);
        }
        commit(REG_SUCCESS_MUT);
        const { email, password } = data;
        return dispatch(AUTH_LOGIN, { email, password });
      })
      .catch((err) => {
        commit(REG_ERROR_MUT, err.message);
        throw new Error(err.message);
      });
  },
};

export default {
  state: initialState,
  actions,
  mutations,
  getters,
};
