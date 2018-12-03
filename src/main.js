import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import axios from 'axios';
import VueAxios from 'vue-axios';
import VuePaginate from 'vue-paginate';
import ForumItem from "@/components/ForumItem";
import Example from "@/components/Example";
import ForumList from "@/components/ForumList";
import LogIn from "@/components/LogIn";
import Registration from "@/components/Registration";
import ForumAccount from "@/components/ForumAccount";
import FooterForum from "@/components/FooterForum";
import AddNewPost from "@/components/AddNewPost";
import UIkit from "@/components/UI-kit";


Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(VuePaginate);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
    {path: '/', component: Example},
    {path: '/forum-account', component: ForumAccount},
    {path: '/forum-item', component: ForumItem},
    {path: '/forum-list', component: ForumList},
    {path: '/registration', component: Registration},
    {path: '/login', component: LogIn},
    {path: '/footer-forum', component: FooterForum},
    {path: '/add-new-post', component: AddNewPost},
    {path: '/ui-kit', component: UIkit},





// редирект должен быть в самом низу
    {path: '/*', redirect: '/' },

  ]
});

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app');
