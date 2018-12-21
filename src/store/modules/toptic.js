/* eslint-disable no-param-reassign */
import Vue from 'vue';
import { TOPIC_LOAD, TOPIC_CLEAR } from '../actions';

const TOPIC_POST_REQUEST_MUT = 'TOPIC_POST_REQUEST_MUT';
const TOPIC_COMMENTS_REQUEST_MUT = 'TOPIC_COMMENTS_REQUEST_MUT';
const TOPIC_POST_SUCCESS_MUT = 'TOPIC_POST_SUCCESS_MUT';
const TOPIC_COMMENTS_SUCCESS_MUT = 'TOPIC_COMMENTS_SUCCESS_MUT';
const TOPIC_POST_ERROR_MUT = 'TOPIC_POST_ERROR_MUT';
const TOPIC_COMMENTS_ERROR_MUT = 'TOPIC_COMMENTS_ERROR_MUT';
const TOPIC_CLEAR_MUT = 'TOPIC_CLEAR_MUT';

const initialState = {
  postLoadStatus: '',
  commentsLoadStatus: '',
  post: {},
  author: {},
  comments: [],
  errorMessage: '',
};

const mutations = {
  [TOPIC_POST_REQUEST_MUT]: state => state.postLoadStatus = 'PENDING',
  [TOPIC_COMMENTS_REQUEST_MUT]: state => state.commentsLoadStatus = 'PENDING',
  [TOPIC_POST_SUCCESS_MUT]: (state, post) => {
    state.postLoadStatus = 'SUCCESS';
    state.post = { ...post };
    state.author = { ...post.username };
  },
  [TOPIC_COMMENTS_SUCCESS_MUT]: (state, comments) => {
    state.commentsLoadStatus = 'SUCCESS';
    state.comments = [...comments];
  },
  [TOPIC_POST_ERROR_MUT]: (state, message) => {
    state.postLoadStatus = 'ERROR';
    state.errorMessage = message;
  },
  [TOPIC_COMMENTS_ERROR_MUT]: (state, message) => {
    state.commentsLoadStatus = 'ERROR';
    state.errorMessage = message;
  },
  [TOPIC_CLEAR_MUT]: (state) => {
    state.postLoadStatus = '';
    state.commentsLoadStatus = '';
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
  isCurrentTopicPostLoaded: state => state.postLoadStatus === 'SUCCESS' && !!state.post.id,
  isCurrentTopicCommentsLoaded: state => state.commentsLoadStatus === 'SUCCESS',
};

const actions = {
  [TOPIC_LOAD]: async ({ commit }, postId) => {
    try {
      commit(TOPIC_POST_REQUEST_MUT);
      const postResponse = await Vue.axios.get(`posts/${postId}`);
      if (postResponse.status !== 200) {
        throw new Error(`Some netwotk problem, response status: ${postResponse.status}`);
      }
      // eslint-disable-next-line no-console
      console.log('LOAD POST RESPONSE:', postResponse);
      // fake
      postResponse.data.title = 'Программирование микроконтроллеров';
      postResponse.data.tags = ['язык программирования', 'обучение', 'микроконтроллеры'];
      postResponse.data.username.name = 'Ной Кун';
      postResponse.data.username.id = 1;
      postResponse.data.content = 'Здравствуйте, хочу научиться программированию микроконтроллеров. Учусь на специальности Автомобилестроение по направлению электроника. Научиться программированию микроконтроллеров будет полезно в работе с автомобилями, в частности с ЭБУ. Знаю, что используют язык Си. Также некоторые начинают учиться этому на Ардуино, как мне говорили. Подскажите, с чего начинать и чем продолжать, пожалуйстапожалуйстапожалуйстапожалуйста';
      // end fake
      commit(TOPIC_POST_SUCCESS_MUT, postResponse.data);
    } catch (err) {
      commit(TOPIC_POST_ERROR_MUT, err.message);
    }
    try {
      commit(TOPIC_COMMENTS_REQUEST_MUT);
      const commentsResponse = await Vue.axios.get(`posts/${postId}/comments`);
      if (commentsResponse.status !== 200) {
        throw new Error(`Some netwotk problem, response status: ${commentsResponse.status}`);
      }
      // eslint-disable-next-line no-console
      console.log('LOAD COMMENTS RESPONSE:', commentsResponse);
      commentsResponse.data = [{
        id: 18,
        post_id: 2,
        content:'На Ардуино "нативный" язык это Wiring - "диалект" ANSI C плюс некоторые фичи из плюсов и функции для управления "железом" Ардуино. Плюс - можно будет сразу на практике закреплять пройденные знания (а это очень вдохновляет, когда устройство "оживает" от твоих усилий, выполняет то, что задумано было создать), минус - так очень сложно научиться нормальной микроэлектронике, покупая дорогие готовые модули и умея только соединять пины блоков. Если хочется научиться нормальной микроэлектронике и программированию МК, то очень рекомендую книгу "Искусство схемотехники" Хоровица, также старую-старую, но очень полезную книгу "Юный радиолюбитель" Борисова, по Си книгу "Язык программирования Си" Кернигана и Ритчи.',
        created_at: null,
        username: {
          id: 8,
          name: "KAMIL ZAMALIYEV"
        }
      },{
        id: 19,
        post_id: 2,
        content:'KAMIL, Спасибо большое за такой развернутый ответ. Аж вдохновился вашими словами. Часть того, что написали, уже есть. Осталось начать)',
        created_at: null,
        username: {
          id: 1,
          name: "Ной Кун"
        }
      }];
      commit(TOPIC_COMMENTS_SUCCESS_MUT, commentsResponse.data);
    } catch (err) {
      commit(TOPIC_COMMENTS_ERROR_MUT, err.message);
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
