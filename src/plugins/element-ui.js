import Vue from 'vue';
import {
  Loading,
  Message,
  MessageBox,
} from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import 'element-ui/lib/theme-chalk/index.css';

export default () => {
  Vue.use(Loading.directive);
  locale.use(lang);

  Vue.prototype.$ELEMENT = {
    size: 'small',
    zIndex: 2000,
  };
  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$message = Message;
};
