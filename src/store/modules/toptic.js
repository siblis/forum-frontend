/* eslint-disable no-param-reassign */
import Vue from 'vue';
import { 
  TOPIC_LOAD, TOPIC_CLEAR, TOPIC_DELETE, TOPIC_ADD_COMMENT, TOPIC_UPD_COMMENT, TOPIC_DEL_COMMENT
} from '../actions';

const TOPIC_COMMENTS_LOAD = 'TOPIC_COMMENTS_LOAD';

const TOPIC_POST_REQUEST_MUT = 'TOPIC_POST_REQUEST_MUT';
const TOPIC_POST_SUCCESS_MUT = 'TOPIC_POST_SUCCESS_MUT';
const TOPIC_POST_ERROR_MUT = 'TOPIC_POST_ERROR_MUT';

const TOPIC_DEL_REQUEST_MUT = 'TOPIC_DEL_REQUEST_MUT';
const TOPIC_DEL_SUCCESS_MUT = 'TOPIC_DEL_SUCCESS_MUT';
const TOPIC_DEL_ERROR_MUT = 'TOPIC_DEL_ERROR_MUT';

const TOPIC_COMMENTS_REQUEST_MUT = 'TOPIC_COMMENTS_REQUEST_MUT';
const TOPIC_COMMENTS_SUCCESS_MUT = 'TOPIC_COMMENTS_SUCCESS_MUT';
const TOPIC_COMMENTS_ERROR_MUT = 'TOPIC_COMMENTS_ERROR_MUT';

const TOPIC_ADD_COMMENT_REQUEST_MUT = 'TOPIC_ADD_COMMENT_REQUEST_MUT';
const TOPIC_ADD_COMMENT_SUCCESS_MUT = 'TOPIC_ADD_COMMENT_SUCCESS_MUT';
const TOPIC_ADD_COMMENT_ERROR_MUT = 'TOPIC_ADD_COMMENT_ERROR_MUT';

const TOPIC_DEL_COMMENT_REQUEST_MUT = 'TOPIC_DEL_COMMENT_REQUEST_MUT';
const TOPIC_DEL_COMMENT_SUCCESS_MUT = 'TOPIC_DEL_COMMENT_SUCCESS_MUT';
const TOPIC_DEL_COMMENT_ERROR_MUT = 'TOPIC_DEL_COMMENT_ERROR_MUT';

const TOPIC_UPD_COMMENT_REQUEST_MUT = 'TOPIC_UPD_COMMENT_REQUEST_MUT';
const TOPIC_UPD_COMMENT_SUCCESS_MUT = 'TOPIC_UPD_COMMENT_SUCCESS_MUT';
const TOPIC_UPD_COMMENT_ERROR_MUT = 'TOPIC_UPD_COMMENT_ERROR_MUT';

const TOPIC_CLEAR_MUT = 'TOPIC_CLEAR_MUT';

const initialState = {
  postLoadStatus: '',
  topicDelStatus: '',
  commentsLoadStatus: '',
  addCommentStatus: '',
  updCommentStatus: '',
  post: {},
  author: {},
  comments: [],
  commentsTotalCount: 0,
  errorMessage: '',
};

const mutations = {
  [TOPIC_POST_REQUEST_MUT]: state => state.postLoadStatus = 'PENDING',
  [TOPIC_POST_SUCCESS_MUT]: (state, post) => {
    state.postLoadStatus = 'SUCCESS';
    state.post = { ...post };
    state.author = { ...post.username };
  },
  [TOPIC_POST_ERROR_MUT]: (state, message) => {
    state.postLoadStatus = 'ERROR';
    state.errorMessage = message;
  },

  [TOPIC_COMMENTS_REQUEST_MUT]: state => state.commentsLoadStatus = 'PENDING',
  [TOPIC_COMMENTS_SUCCESS_MUT]: (state, { comments, total }) => {
    state.commentsLoadStatus = 'SUCCESS';
    state.comments = comments;
    state.commentsTotalCount = total;
  },
  [TOPIC_COMMENTS_ERROR_MUT]: (state, message) => {
    state.commentsLoadStatus = 'ERROR';
    state.errorMessage = message;
  },

  [TOPIC_DEL_REQUEST_MUT]: state => state.topicDelStatus = 'PENDING',
  [TOPIC_DEL_SUCCESS_MUT]: state => state.topicDelStatus = 'SUCCESS',
  [TOPIC_DEL_ERROR_MUT]: (state, message) => {
    state.topicDelStatus = 'ERROR';
    state.errorMessage = message;
  },

  [TOPIC_ADD_COMMENT_SUCCESS_MUT]: state => state.addCommentStatus = 'SUCCESS',
  [TOPIC_ADD_COMMENT_REQUEST_MUT]: state => state.addCommentStatus = 'PENDING',
  [TOPIC_ADD_COMMENT_ERROR_MUT]: (state, message) => {
    state.addCommentStatus = 'ERROR';
    state.errorMessage = message;
  },

  [TOPIC_DEL_COMMENT_SUCCESS_MUT]: (state, commentId) => {
    state.delCommentStatus = 'SUCCESS'
    state.comments = state.comments.filter(comment => comment.id !== commentId);
  },
  [TOPIC_DEL_COMMENT_REQUEST_MUT]: state => state.delCommentStatus = 'PENDING',
  [TOPIC_DEL_COMMENT_ERROR_MUT]: (state, message) => {
    state.delCommentStatus = 'ERROR';
    state.errorMessage = message;
  },

  [TOPIC_UPD_COMMENT_REQUEST_MUT]: state => state.updCommentStatus = 'PENDING',
  [TOPIC_UPD_COMMENT_SUCCESS_MUT]: (state, { id, item }) => {
    state.updCommentStatus = 'SUCCESS';
    const index = state.comments.findIndex(comment => comment.id === id);
    state.comments[index] = item;
    state.comments = [...state.comments]; // иначе vue не раеагирует на изменения объекта в массиве объектов
  },
  [TOPIC_UPD_COMMENT_ERROR_MUT]: (state, message) => {
    state.updCommentStatus = 'ERROR';
    state.errorMessage = message;
  },

  [TOPIC_CLEAR_MUT]: (state) => {
    state.postLoadStatus = '';
    state.topicDelStatus = '';
    state.commentsLoadStatus = '';
    state.addCommentStatus = '';
    state.updCommentStatus = '';
    state.delCommentStatus = '';
    state.post = {};
    state.author = {};
    state.comments = [];
    state.commentsTotalCount = 0;
    state.errorMessage = '';
  }
};

const getters = {
  currentTopicPostId: ({ post: { id } }) => id,
  currentTopic: state => state.post,
  currentTopicComments: state => state.comments,
  currentTopicCommentsTotalCount: state => state.commentsTotalCount,
  currentTopicAuthor: state => state.author,
  currentTopicTags: (state, getters) => {
    const { tags } = state.post;
    if (!getters.isCurrentTopicPostLoaded || (typeof tags !== 'string')) {
      return [];
    }
    return tags.split(',');
  },
  getCurrentTopicCommentById: state => id => state.comments.find(comment => comment.id === id),
  isCurrentTopicPostLoaded: state => state.postLoadStatus === 'SUCCESS' && !!state.post.id,
  isCurrentTopicCommentsLoaded: state => state.commentsLoadStatus === 'SUCCESS',
  isCurrentTopicWasDeleted: state => state.topicDelStatus === 'SUCCESS',
  isCurrentTopicUpdCommentPending: state => state.updCommentStatus === 'PENDING',
};

const actions = {
  [TOPIC_LOAD]: async ({ commit, dispatch }, postId) => {
    try {
      commit(TOPIC_POST_REQUEST_MUT);
      const postResponse = await Vue.axios.get(`posts/${postId}`);
      const { data, status } = postResponse;
      if (status !== 200) {
        throw new Error(`Some netwotk problem, response status: ${status}`);
      }
      commit(TOPIC_POST_SUCCESS_MUT, data);
      dispatch(TOPIC_COMMENTS_LOAD);
    } catch (err) {
      commit(TOPIC_POST_ERROR_MUT, err.message);
    }
  },
  [TOPIC_COMMENTS_LOAD]: async ({ commit, getters }) => {
    try {
      commit(TOPIC_COMMENTS_REQUEST_MUT);
      if (!getters.isCurrentTopicPostLoaded) {
        throw new Error('Some error');
      }
      const commentsResponse = await Vue.axios.get(`posts/${getters.currentTopicPostId}/comments`);
        // current_page: 1
        // data: {} 
        // first_page_url: "http://api.forum.pocketmsg.ru/posts/17/comments?page=1"
        // from: 1
        // last_page: 2
        // last_page_url: "http://api.forum.pocketmsg.ru/posts/17/comments?page=2"
        // next_page_url: "http://api.forum.pocketmsg.ru/posts/17/comments?page=2"
        // path: "http://api.forum.pocketmsg.ru/posts/17/comments"
        // per_page: 10
        // prev_page_url: null
        // to: 10
        // total: 15
      const { data: { data, total }, status } = commentsResponse;
      if (status !== 200) {
        throw new Error(`Some netwotk problem, response status: ${status}`);
      }
      const comments = Object.values(data);
      commit(TOPIC_COMMENTS_SUCCESS_MUT, { comments, total });
    } catch (err) {
      commit(TOPIC_COMMENTS_ERROR_MUT, err.message);
    }
  },
  [TOPIC_ADD_COMMENT]: async ({ commit, getters, rootGetters, dispatch }, content) => {
    try {
      commit(TOPIC_ADD_COMMENT_REQUEST_MUT);
      if (content === '') {
        throw new Error('Empty value');
      }
      if (!getters.isCurrentTopicPostLoaded || !rootGetters.isLoggedIn) {
        throw new Error('Can not add comment');
      }
      const commentResponse = await Vue.axios
        .post(`posts/${getters.currentTopicPostId}/comments`,{ content });
      if (commentResponse.status !== 201) {
        throw new Error(`Some netwotk problem, add comment response status: ${status}`);
      }
      commit(TOPIC_ADD_COMMENT_SUCCESS_MUT);
      dispatch(TOPIC_COMMENTS_LOAD);
    } catch (err) {
      commit(TOPIC_ADD_COMMENT_ERROR_MUT, err.message);
    }
  },
  [TOPIC_UPD_COMMENT]: async ({ commit, getters, rootGetters }, { commentId, content }) => {
    try {
      commit(TOPIC_UPD_COMMENT_REQUEST_MUT);
      if (content === '') {
        throw new Error('Empty value');
      }
      const comment = getters.getCurrentTopicCommentById(commentId);
      if (!getters.isCurrentTopicPostLoaded || !comment) {
        throw new Error('Nothing to change');
      }
      const commentAuthorId = comment.username && comment.username.id;
      if (!commentAuthorId || !rootGetters.isMyProfileId(commentAuthorId)) {
        throw new Error('User can not change comment');
      }
      const { status, data } = await Vue.axios.put(`comments/${commentId}`,{ content });
      if (status !== 200) {
        throw new Error(`Some netwotk problem, upd comment response status: ${status}`);
      }
      commit(TOPIC_UPD_COMMENT_SUCCESS_MUT, { id: commentId, item: data });
      return true;
    } catch (err) {
      commit(TOPIC_UPD_COMMENT_ERROR_MUT, err.message);
      throw new Error(err.message);
    }
  },
  [TOPIC_DELETE]: async ({commit, getters, rootGetters}) => {
    try {
      commit(TOPIC_DEL_REQUEST_MUT);
      if (!getters.isCurrentTopicPostLoaded) {
        throw new Error('Nothing to delete');
      }
      const author = getters.currentTopicAuthor;
      if (!author || !rootGetters.isMyProfileId(author.id)) {
        throw new Error('User can not delete this topic');
      }
      const delResponse = await Vue.axios.delete(`posts/${getters.currentTopicPostId}`);
      if (delResponse.status !== 204) {
        throw new Error(`Some netwotk problem, response status: ${delResponse.status}`);
      }
      commit(TOPIC_DEL_SUCCESS_MUT);
    } catch (err) {
      commit(TOPIC_DEL_ERROR_MUT , err.message);
      throw new Error(err.message);
    }
  },
  [TOPIC_DEL_COMMENT]: async ({commit, getters, rootGetters}, commentId) => {
    try {
      commit(TOPIC_DEL_COMMENT_REQUEST_MUT);
      const comment = getters.getCurrentTopicCommentById(commentId);
      if (!comment) {
        throw new Error('Nothing to delete');
      }
      const commentAuthorId = comment.username && comment.username.id;
      if (!commentAuthorId || !rootGetters.isMyProfileId(commentAuthorId)) {
        throw new Error('User can not delete comment');
      }     
      const delResponse = await Vue.axios.delete(`comments/${commentId}`);
      if (delResponse.status !== 204) {
        throw new Error(`Some netwotk problem, response status: ${delResponse.status}`);
      }
      commit(TOPIC_DEL_COMMENT_SUCCESS_MUT, commentId);
    } catch (err) {
      commit(TOPIC_DEL_COMMENT_ERROR_MUT , err.message);
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
