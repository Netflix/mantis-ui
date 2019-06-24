import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';
import VueClipboard from 'vue-clipboard2';
import pluginFontAwesome from '@/plugins/font-awesome';
import pluginElementUi from '@/plugins/element-ui';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { ActionTypes } from '@/store/actions';
import '@/assets/index.scss';
import {
  getMantisMasters,
  getMesosUrl,
  getUserEmail,
  getUserName,
} from '@/utils/local-storage';

Vue.config.productionTip = false;

// Add Plugins
pluginFontAwesome();
pluginElementUi();
Vue.use(VueScrollTo, {
  container: 'body',
});
Vue.use(VueClipboard);

(function initializeApp() {
  const userInfo = {
    name: getUserName(),
    email: getUserEmail(),
  };
  store.dispatch(ActionTypes.LoginUser, userInfo);
  store.dispatch(ActionTypes.SetMantisMasters, getMantisMasters());
  store.dispatch(ActionTypes.SetMesosUrl, getMesosUrl());
})();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
