import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import ForumItem from "@/components/ForumItem";
import Example from "@/components/Example";
import ForumList from "@/components/ForumList";
import LogIn from "@/components/LogIn";
import Registration from "@/components/Registration";
import ForumAccount from "@/components/ForumAccount";
import FooterForum from "@/components/FooterForum";


Vue.use(VueRouter);
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




// редирект должен быть в самом низу
    {path: '/*', redirect: '/' },

  ]
});

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app');
