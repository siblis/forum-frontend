import 'flexboxgrid/dist/flexboxgrid.css'
import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import axios from 'axios';
import VueAxios from 'vue-axios';
import ForumItem from "@/pages/ForumItem";
import Example from "@/pages/Example";
import ForumList from "@/pages/ForumList";
import LogIn from "@/pages/LogIn";
import Registration from "@/pages/Registration";
import ForumAccount from "@/pages/ForumAccount";
import AddNewPost from "@/pages/AddNewPost";
import UIkit from "@/pages/UI-kit";
import Page404 from "@/pages/Page404";

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.config.productionTip = false;
const moment = require('moment');
require('moment/locale/ru');
Vue.use(require('vue-moment'), {
  moment
});

const router = new VueRouter({
  routes: [
    {path: '/', component: Example},
    {path: '/profile', component: ForumAccount},
    {path: '/post', component: ForumItem},
    {path: '/forum', component: ForumList},
    {path: '/signup', component: Registration},
    {path: '/login', component: LogIn},
    {path: '/create-post', component: AddNewPost},
    {path: '/ui-kit', component: UIkit},
    {path: '/404', component: Page404},



// редирект должен быть в самом низу
    {path: '/*', redirect: '/404' },

  ]
});

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app');
