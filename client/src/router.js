import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Events from './views/Events.vue';
import Teams from './views/Teams.vue';
import User from './views/User.vue';
import Event from './views/Event.vue';
import Quest from './views/Quest.vue';
import Riddle from './views/Riddle.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: User
    },
    {
      path: '/teams',
      name: 'teams',
      component: Teams
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'events',
      component: Events
    },
    {
      path: '/event/:id',
      name: 'event',
      component: Event
    },
    {
      path: '/quest/:id',
      name: 'quest',
      component: Quest
    },
    {
      path: '/quest/:id/riddle/:riddle_id',
      name: 'Riddle',
      component: Riddle
    },
    { path: '*', redirect: '/' }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;
