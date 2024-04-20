import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './components/LandingPage.vue';
import SignInPage from './components/SignInPage.vue';
import NotesPage from './components/NotesPage.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/signin', component: SignInPage },
  { path: '/notes', component: NotesPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
