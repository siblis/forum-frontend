/* eslint-disable no-param-reassign */
import Vue from 'vue';
import { TOPIC_LOAD, TOPIC_CLEAR, TOPIC_ADD_COMMENT } from '../actions';

const TOPIC_POST_REQUEST_MUT = 'TOPIC_POST_REQUEST_MUT';
const TOPIC_POST_SUCCESS_MUT = 'TOPIC_POST_SUCCESS_MUT';
const TOPIC_POST_ERROR_MUT = 'TOPIC_POST_ERROR_MUT';
const TOPIC_COMMENTS_REQUEST_MUT = 'TOPIC_COMMENTS_REQUEST_MUT';
const TOPIC_COMMENTS_SUCCESS_MUT = 'TOPIC_COMMENTS_SUCCESS_MUT';
const TOPIC_COMMENTS_ERROR_MUT = 'TOPIC_COMMENTS_ERROR_MUT';
const TOPIC_CLEAR_MUT = 'TOPIC_CLEAR_MUT';
const TOPIC_ADD_COMMENT_REQUEST_MUT = 'TOPIC_ADD_COMMENT_REQUEST_MUT';
const TOPIC_ADD_COMMENT_SUCCESS_MUT = 'TOPIC_ADD_COMMENT_SUCCESS_MUT';
const TOPIC_ADD_COMMENT_ERROR_MUT = 'TOPIC_ADD_COMMENT_ERROR_MUT';

const initialState = {
  postLoadStatus: '',
  commentsLoadStatus: '',
  addCommentStatus: '',
  post: {},
  author: {},
  comments: [],
  errorMessage: '',
};

const mutations = {
  [TOPIC_POST_REQUEST_MUT]: state => state.postLoadStatus = 'PENDING',
  [TOPIC_COMMENTS_REQUEST_MUT]: state => state.commentsLoadStatus = 'PENDING',
  [TOPIC_ADD_COMMENT_REQUEST_MUT]: state => state.addCommentStatus = 'PENDING',
  [TOPIC_POST_SUCCESS_MUT]: (state, post) => {
    state.postLoadStatus = 'SUCCESS';
    state.post = { ...post };
    state.author = { ...post.username };
  },
  [TOPIC_COMMENTS_SUCCESS_MUT]: (state, comments) => {
    state.commentsLoadStatus = 'SUCCESS';
    state.comments = comments;
  },
  [TOPIC_ADD_COMMENT_SUCCESS_MUT]: (state, comment) => {
    state.addCommentStatus = 'SUCCESS';
    state.comments.push(comment);
  },
  [TOPIC_POST_ERROR_MUT]: (state, message) => {
    state.postLoadStatus = 'ERROR';
    state.errorMessage = message;
  },
  [TOPIC_COMMENTS_ERROR_MUT]: (state, message) => {
    state.commentsLoadStatus = 'ERROR';
    state.errorMessage = message;
  },
  [TOPIC_ADD_COMMENT_ERROR_MUT]: (state, message) => {
    state.addCommentStatus = 'ERROR';
    state.errorMessage = message;
  },
  [TOPIC_CLEAR_MUT]: (state) => {
    state.postLoadStatus = '';
    state.commentsLoadStatus = '';
    state.addCommentStatus = '';
    state.post = {};
    state.author = {};
    state.comments = [];
    state.errorMessage = '';
  }
};

const getters = {
  currentTopic: state => state.post,
  currentTopicComments: state => state.comments,
  currentTopicAuthor: state => state.author,
  currentTopicTags: (state, getters) => {
    const { tags } = state.post;
    if (!getters.isCurrentTopicPostLoaded || (typeof tags !== 'string')) {
      return [];
    }
    return tags.split(',');
  },
  isCurrentTopicPostLoaded: state => state.postLoadStatus === 'SUCCESS' && !!state.post.id,
  isCurrentTopicCommentsLoaded: state => state.commentsLoadStatus === 'SUCCESS',
};

const actions = {
  [TOPIC_LOAD]: async ({ commit }, postId) => {
    try {
      commit(TOPIC_POST_REQUEST_MUT);
      const postResponse = await Vue.axios.get(`posts/${postId}`);
      const { data, status } = postResponse;
      if (status !== 200) {
        throw new Error(`Some netwotk problem, response status: ${status}`);
      }
      commit(TOPIC_POST_SUCCESS_MUT, data);
    } catch (err) {
      commit(TOPIC_POST_ERROR_MUT, err.message);
    }
    try {
      commit(TOPIC_COMMENTS_REQUEST_MUT);
      const commentsResponse = await Vue.axios.get(`posts/${postId}/comments`);
      const { data: { data }, status } = commentsResponse;
      if (status !== 200) {
        throw new Error(`Some netwotk problem, response status: ${commentsResponse.status}`);
      }
      const comments = Object.values(data);
      commit(TOPIC_COMMENTS_SUCCESS_MUT, comments);
    } catch (err) {
      commit(TOPIC_COMMENTS_ERROR_MUT, err.message);
    }
  },
  [TOPIC_ADD_COMMENT]: async ({commit, getters, rootGetters}, content) => {
    if (content === '') {
      return;
    }
    if (!getters.isCurrentTopicPostLoaded || !rootGetters.isLoggedIn) {
      return;
    }
    const { id: postId } = getters.currentTopic;
    try {
      commit(TOPIC_ADD_COMMENT_REQUEST_MUT);
      const commentResponse = await Vue.axios.post(`posts/${postId}/comments`,{ content });
      const { data, status } = commentResponse;
      if (status !== 201) {
        throw new Error(`Some netwotk problem, response status: ${status}`);
      }
      commit(TOPIC_ADD_COMMENT_SUCCESS_MUT, data);
    } catch (err) {
      commit(TOPIC_ADD_COMMENT_ERROR_MUT, err.message);
    }
  },
  [TOPIC_CLEAR]: ({ commit }) => commit(TOPIC_CLEAR_MUT),
};

export default {
  state: initialState,
  actions,
  mutations,
  getters,
};
