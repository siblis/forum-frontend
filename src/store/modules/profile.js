/* eslint-disable no-param-reassign */
import Vue from 'vue';
import { getTokenAuthHeaderValue } from '../../utils/token';
import { PROFILE_LOAD, PROFILE_CLEAR } from '../actions/profile';
import { AUTH_LOGOUT } from '../actions/auth';

const PROFILE_REQUEST_MUT = 'PROFILE_REQUEST_MUT';
const PROFILE_SUCCESS_MUT = 'PROFILE_SUCCESS_MUT';
const PROFILE_ERROR_MUT = 'PROFILE_ERROR_MUT';
const PROFILE_CLEAR_MUT = 'PROFILE_CLEAR_MUT';

const initialState = {
  status: '',
  profile: {},
  errorMessage: '',
};

const mutations = {
  [PROFILE_REQUEST_MUT]: (state) => {
    state.status = 'PENDING';
  },
  [PROFILE_SUCCESS_MUT]: (state, data) => {
    state.status = 'SUCCESS';
    state.profile = { ...data };
  },
  [PROFILE_ERROR_MUT]: (state, message) => {
    state.status = 'ERROR';
    state.errorMessage = message;
  },
  [PROFILE_CLEAR_MUT]: (state) => {
    state.status = '';
    state.errorMessage = '';
    state.profile = {};
  },
};

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name,
};

const actions = {
  [PROFILE_LOAD]: ({ commit, dispatch }) => {
    commit(PROFILE_REQUEST_MUT);
    Vue.axios.post('users/me', {
      // crossDomain: true,
      headers: {
        Authorization: getTokenAuthHeaderValue(),
      },
    })
      .then((response) => {
        commit(PROFILE_SUCCESS_MUT, response.data);
      })
      .catch((err) => {
        commit(PROFILE_ERROR_MUT, err.message);
        dispatch(AUTH_LOGOUT);
      });
  },
  [PROFILE_CLEAR]: ({ commit }) => commit(PROFILE_CLEAR_MUT),
};

export default {
  state: initialState,
  actions,
  mutations,
  getters,
};
