import 'flexboxgrid/dist/flexboxgrid.css'
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';
import moment from 'moment';
import VueMoment from 'vue-moment';
import VueTextareaAutosize from 'vue-textarea-autosize'
import pluralize from './utils/pluralize';
import ForumItem from '@/pages/ForumItem';
import Rules from '@/pages/Rules';
import ForumList from '@/pages/ForumList';
import LogIn from '@/pages/LogIn';
import Registration from '@/pages/Registration';
import ForumAccount from '@/pages/ForumAccount';
import AddNewPost from '@/pages/AddNewPost';
import UIkit from '@/pages/UI-kit';
import Page404 from '@/pages/Page404';
import EditPost from '@/pages/EditPost';

Vue.use(VueRouter);
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://api.forum.pocketmsg.ru';

moment.locale('ru');
Vue.use(VueMoment, { moment });

Vue.filter('pluralize', pluralize);

Vue.use(VueTextareaAutosize);

const router = new VueRouter({
  routes: [
    {path: '/', name: 'home', component: ForumList},
    {path: '/search/:query', name: 'userSearch', component: ForumList, props: true},
    {path: '/search', redirect: '/' },
    {path: '/profile', component: ForumAccount},
    {path: '/posts/:postId', name: 'posts', component: ForumItem, props: true},
    {path: '/forum', component: ForumList},
    {path: '/signup', component: Registration},
    {path: '/login', component: LogIn},
    {path: '/create-post', component: AddNewPost},
    {path: '/ui-kit', component: UIkit},
    {path: '/404', component: Page404},
    {path: '/rules', component: Rules},
    {path: '/edit-post/:postId', name: 'post', component: EditPost, props: true},



// редирект должен быть в самом низу
    {path: '/*', redirect: '/404' },

  ]
});

const app = new Vue({
  router,
  render: h => h(App),
  store,
});

// если есть токен, то при запросах axios будет включать заголовок Authorization: 'Bearer <токен>'
app.axios.interceptors.request.use(config => {
  if (app.$store.getters.isLoggedIn) {
    config.headers = {
      Authorization: app.$store.getters.authHeaderValue,
    };
  }
  return config;
});

app.$mount('#app');
