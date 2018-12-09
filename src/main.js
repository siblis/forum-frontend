import 'flexboxgrid/dist/flexboxgrid.css'
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
import AddNewPost from "@/components/AddNewPost";
import UIkit from "@/components/UI-kit";
import Page404 from "@/components/Page404";

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(VuePaginate);
Vue.config.productionTip = false;

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
