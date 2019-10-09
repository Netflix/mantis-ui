import Vue from 'vue';
import Router from 'vue-router';
import { auth, pageTitle } from '@/middleware';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'clusters' },
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: 'Mantis - Login' },
      component: () =>
        import(/* webpackChunkName: "login" */ '@/pages/LoginPage.vue'),
    },
    {
      path: '/jobs',
      name: 'jobs',
      meta: { requiresAuth: true, title: 'Mantis - Jobs' },
      component: () =>
        import(/* webpackChunkName: "jobs" */ '@/pages/JobsPage.vue'),
    },
    {
      path: '/jobs/:jobId',
      name: 'jobDetail',
      meta: { requiresAuth: true, title: 'Mantis - Job Detail' },
      component: () =>
        import(/* webpackChunkName: 'jobs' */ '@/pages/JobDetailPage.vue'),
    },
    {
      path: '/clusters',
      name: 'clusters',
      meta: { requiresAuth: true, title: 'Mantis - Clusters' },
      component: () =>
        import(/* webpackChunkName: "clusters" */ '@/pages/JobClustersPage.vue'),
    },
    {
      path: '/clusters/create',
      name: 'clusterCreatePage',
      meta: { requiresAuth: true, title: 'Mantis - Create Cluster' },
      component: () =>
        import(
          /* webpackChunkName: "clusters" */ '@/pages/JobClusterCreatePage.vue'
        ),
    },
    {
      path: '/clusters/:clusterId',
      name: 'clusterDetail',
      meta: { requiresAuth: true, title: 'Mantis - Cluster Detail' },
      component: () =>
        import(
          /* webpackChunkName: "clusters" */ '@/pages/JobClusterDetailPage.vue'
        ),
    },
    {
      path: '/clusters/:clusterId/update',
      name: 'clusterUpdate',
      meta: { requiresAuth: true, title: 'Mantis - Cluster Update' },
      component: () =>
        import(
          /* webpackChunkName: "clusters" */ '@/pages/JobClusterUpdatePage.vue'
        ),
    },
    {
      path: '/clusters/:clusterId/submit',
      name: 'clusterJobSubmit',
      meta: { requiresAuth: true, title: 'Mantis - Job Cluster Submit Job' },
      component: () =>
        import(
          /* webpackChunkName: "clusters" */ '@/pages/JobClusterSubmitJobPage.vue'
        ),
    },
    {
      path: '/summary',
      name: 'summary',
      meta: { requiresAuth: true, title: 'Mantis - Summary' },
      component: () =>
        import(/* webpackChunkName: "summary" */ '@/pages/SummaryPage.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true, title: 'Mantis - Admin' },
      component: () =>
        import(/* webpackChunkName: "admin" */ '@/pages/AdminPage.vue'),
    },
    {
      path: '/help',
      name: 'help',
      meta: { requiresAuth: false, title: 'Mantis - Help' },
      component: () =>
        import(/* webpackChunkName: "help" */ '@/pages/HelpPage.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () =>
        import(/* webpackChunkName: "404" */ '@/pages/NotFoundPage.vue'),
    },
    {
      path: '*',
      redirect: { name: '404' },
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
});

router.beforeEach((to, from, next) => {
  auth(to, from, next);
  pageTitle(to, from, next);
});

export default router;
