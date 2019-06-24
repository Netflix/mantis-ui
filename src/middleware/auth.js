import store from '@/store';

export default function(to, _from, next) {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
}
